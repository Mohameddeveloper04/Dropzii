import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, User, Phone, Navigation, Locate, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";
import { getDistance } from "../utils/distanceService";

export default function BookingForm({ isSticky = false }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("oneway");

  const emptyForm = {
    name: "",
    phone: "",
    pickup: "",
    pickupLink: "",
    drop: "",
    date: "",
    time: "",
    returnDate: "",
    days: "1",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);

  // Autocomplete state
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);
  const pickupTimerRef = useRef(null);
  const dropTimerRef = useRef(null);
  const pickupWrapperRef = useRef(null);
  const dropWrapperRef = useRef(null);

  // Fetch suggestions using the new Places API
  const fetchSuggestions = async (input, setSuggestions, setShow) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      setShow(false);
      return;
    }
    try {
      const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
      const request = {
        input,
        includedRegionCodes: ["in"],
        language: "en",
      };
      const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
      const results = suggestions
        .map((s) => s.placePrediction)
        .filter(Boolean)
        .slice(0, 5)
        .map((p) => ({
          mainText: p.mainText?.text || "",
          secondaryText: p.secondaryText?.text || "",
          fullText: p.text?.text || "",
          placeId: p.placeId,
        }));
      setSuggestions(results);
      setShow(results.length > 0);
    } catch {
      setSuggestions([]);
      setShow(false);
    }
  };

  // Debounced pickup input handler
  const handlePickupChange = (val) => {
    setFormData((prev) => ({ ...prev, pickup: val, pickupLink: "" }));
    clearTimeout(pickupTimerRef.current);
    pickupTimerRef.current = setTimeout(() => fetchSuggestions(val, setPickupSuggestions, setShowPickupDropdown), 300);
  };

  // Debounced drop input handler
  const handleDropChange = (val) => {
    setFormData((prev) => ({ ...prev, drop: val }));
    clearTimeout(dropTimerRef.current);
    dropTimerRef.current = setTimeout(() => fetchSuggestions(val, setDropSuggestions, setShowDropDropdown), 300);
  };

  // Select a suggestion
  const selectPickupSuggestion = (suggestion) => {
    setFormData((prev) => ({ ...prev, pickup: suggestion.fullText, pickupLink: "" }));
    setShowPickupDropdown(false);
    setPickupSuggestions([]);
  };

  const selectDropSuggestion = (suggestion) => {
    setFormData((prev) => ({ ...prev, drop: suggestion.fullText }));
    setShowDropDropdown(false);
    setDropSuggestions([]);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickupWrapperRef.current && !pickupWrapperRef.current.contains(e.target)) {
        setShowPickupDropdown(false);
      }
      if (dropWrapperRef.current && !dropWrapperRef.current.contains(e.target)) {
        setShowDropDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const p = searchParams.get("pickup");
    const d = searchParams.get("drop");
    if (p || d) {
      setFormData(prev => ({
        ...prev,
        ...(p && { pickup: p }),
        ...(d && { drop: d })
      }));
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchParams]);

  const handleUseCurrentLocation = (field) => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const address =
              data.display_name ||
              `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            setFormData((prev) => ({
              ...prev,
              [field]: address,
              ...(field === "pickup" && { pickupLink: googleMapsLink }),
            }));
          } catch {
            setFormData((prev) => ({
              ...prev,
              [field]: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
              ...(field === "pickup" && { pickupLink: googleMapsLink }),
            }));
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
          showToast("Unable to retrieve location. Please enter manually.", "error");
        },
        { timeout: 10000 }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pickup || !formData.drop) {
      showToast("Please enter pickup and drop locations.", "error");
      return;
    }

    setIsSubmitting(true);
    const isRoutine = activeTab === "routine";

    try {
      const distData = await getDistance(formData.pickup, formData.drop);
      const days = isRoutine ? parseInt(formData.days || "1", 10) : 1;

      // Send early lead notification mail
      const submissionData = {
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "94152d23-0038-4451-bd19-93dddae345f5",
        name: formData.name,
        phone: formData.phone,
        pickup: formData.pickup,
        pickup_map_link: formData.pickupLink || "",
        drop: formData.drop,
        date: formData.date,
        time: formData.time,
        trip_type: isRoutine ? "Routine Trip" : "One Way / Airport",
        ...(isRoutine && { return_date: formData.returnDate, days }),
        distance: distData.distanceText,
        status: "Estimate Requested (Lead)",
        from_name: "Dropzii Leads",
        to: "dropziitaxi@gmail.com",
        subject: `New Lead: ${isRoutine ? "Routine Trip" : "Taxi"} Inquiry from ${formData.name}`,
      };

      // Fire and forget (does not block navigation)
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submissionData),
      }).catch(err => console.warn("Mail error:", err));

      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (scriptUrl) {
        fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }).catch(err => console.warn("Google Sheets failed:", err));
      }

      navigate("/fare-estimate", {
        state: {
          formData,
          distanceData: distData,
          tripType: activeTab,
          days,
        },
      });
    } catch (err) {
      console.error("Distance Error:", err);
      showToast("Unable to calculate distance. Please try again or book directly via WhatsApp.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRoutine = activeTab === "routine";

  return (
    <>
      <div
        ref={formRef}
        className={cn(
          "bg-luxury-charcoal/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-luxury max-w-md w-full relative overflow-hidden group/form hover:shadow-accent-glow hover:border-accent/20 transition-all duration-700",
          isSticky ? "hidden lg:block sticky top-24" : ""
        )}
      >
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-[60px] group-hover/form:bg-accent/10 transition-colors duration-700" />

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-3 tracking-tight leading-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">
            <Navigation className="text-accent animate-float w-6 h-6" />
            Book Your Journey
          </h3>

          {/* Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 md:mb-8 gap-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("oneway")}
              className={cn(
                "flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                activeTab === "oneway"
                  ? "bg-accent text-luxury-charcoal shadow-lg shadow-accent/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("routine")}
              className={cn(
                "flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-1",
                activeTab === "routine"
                  ? "bg-accent text-luxury-charcoal shadow-lg shadow-accent/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              <RotateCcw size={12} className={cn(activeTab === "routine" ? "animate-spin-slow" : "")} />
              Routine Trip
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="text"
                    placeholder="Enter Full Name"
                    className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/30 pl-11 text-sm font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/30 pl-11 text-sm font-medium"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Pickup & Drop */}
            <div className="space-y-2 pt-1">
              {/* Pickup */}
              <div ref={pickupWrapperRef} className="relative">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="text"
                    placeholder="Pickup Location"
                    autoComplete="off"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/50 pl-11 text-sm font-medium"
                    value={formData.pickup}
                    onChange={(e) => handlePickupChange(e.target.value)}
                    onFocus={() => pickupSuggestions.length > 0 && setShowPickupDropdown(true)}
                  />
                </div>
                {showPickupDropdown && pickupSuggestions.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#0F172A] border border-white/8 rounded-xl shadow-luxury max-h-56 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10">
                    {pickupSuggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-accent/10 transition-colors cursor-pointer border-t border-white/[0.03] first:border-t-0"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectPickupSuggestion(s)}
                      >
                        <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-white text-sm font-semibold block truncate">{s.mainText}</span>
                          {s.secondaryText && (
                            <span className="text-white/30 text-xs block truncate">{s.secondaryText}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Use current location link */}
              <p
                onClick={() => handleUseCurrentLocation("pickup")}
                className={cn(
                  "text-[11px] text-accent hover:text-white cursor-pointer flex items-center gap-1 ml-1 w-fit transition-colors select-none pb-1 font-bold",
                  isLocating ? "opacity-60 pointer-events-none" : ""
                )}
              >
                <Locate size={11} className={isLocating ? "animate-spin" : ""} />
                {isLocating ? "Detecting location..." : "Use current location"}
                {formData.pickupLink && !isLocating && (
                  <span className="text-green-400 ml-1">✓ GPS saved</span>
                )}
              </p>

              {/* Drop */}
              <div ref={dropWrapperRef} className="relative">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="text"
                    placeholder="Drop Location"
                    autoComplete="off"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/50 pl-11 text-sm font-medium"
                    value={formData.drop}
                    onChange={(e) => handleDropChange(e.target.value)}
                    onFocus={() => dropSuggestions.length > 0 && setShowDropDropdown(true)}
                  />
                </div>
                {showDropDropdown && dropSuggestions.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#0F172A] border border-white/8 rounded-xl shadow-luxury max-h-56 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10">
                    {dropSuggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-accent/10 transition-colors cursor-pointer border-t border-white/[0.03] first:border-t-0"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectDropSuggestion(s)}
                      >
                        <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-white text-sm font-semibold block truncate">{s.mainText}</span>
                          {s.secondaryText && (
                            <span className="text-white/30 text-xs block truncate">{s.secondaryText}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date / Time */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1 text-[9px] md:text-[10px]">Pickup Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-all duration-300 pointer-events-none" />
                  <input
                    required
                    type="date"
                    className="bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-3 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-300 w-full text-white placeholder:text-white/20 text-sm appearance-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1 text-[9px] md:text-[10px]">Pickup Time</label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-all duration-300 pointer-events-none" />
                  <input
                    required
                    type="time"
                    className="bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-3 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-300 w-full text-white placeholder:text-white/20 text-sm appearance-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* Return Date & Days — only for Routine Trip */}
            {isRoutine && (
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-accent/60 font-bold uppercase tracking-widest ml-1">Return Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/60 w-4 h-4 group-focus-within:text-accent transition-all duration-300 pointer-events-none" />
                    <input
                      required
                      type="date"
                      placeholder="Select Return Date"
                      className="bg-white/[0.02] border border-accent/20 rounded-xl px-5 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/20 pl-11 text-sm font-medium appearance-none"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-accent/60 font-bold uppercase tracking-widest ml-1">Number of Days</label>
                  <div className="relative group">
                    <input
                      required
                      type="number"
                      min="1"
                      className="bg-white/[0.02] border border-accent/20 rounded-xl px-5 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-500 w-full text-white text-sm font-medium"
                      value={formData.days}
                      onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-accent text-luxury-charcoal font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-3 w-full mt-4 text-sm md:text-base uppercase tracking-wider overflow-hidden relative",
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-luxury-charcoal/30 border-t-luxury-charcoal rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  Get Estimate
                  <ChevronRight className="w-5 h-5 group-hover/form:translate-x-1 transition-transform" />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
