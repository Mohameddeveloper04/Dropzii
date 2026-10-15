import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Users, Briefcase, Snowflake, ChevronDown, ChevronUp, AlertCircle, ArrowLeft, CheckCircle2, MessageCircle, X, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import { calculateEstimates } from "../utils/fareCalculator";

const WHATSAPP_NUMBER = "919442059952";

function buildWhatsAppMessage(data, isRoutine, estData) {
    const pickupText = data.pickupLink
        ? `${data.pickup}\nPickup Map: ${data.pickupLink}`
        : data.pickup;

    let msg = `Hello Dropzii! I'd like to book a ${isRoutine ? "Routine Trip" : "taxi"}.\n\n`;
    msg += `Name: ${data.name}\nPhone: ${data.phone}\n`;
    msg += `Pickup: ${pickupText}\nDrop: ${data.drop}\n`;
    msg += `Start Date & Time: ${data.date ? data.date + (data.time ? " at " + data.time : "") : ""}\n`;
    if (isRoutine) {
        msg += `Return Date: ${data.returnDate || "N/A"}\n`;
        if (data.days) msg += `Number of Days: ${data.days}\n`;
    }
    if (estData) {
        msg += `\n--- Estimate Details ---\n`;
        msg += `Distance: ${estData.distanceText}\n`;
        msg += `Vehicle: ${estData.vehicleName}\n`;
        msg += `Estimated Fare: ₹${estData.totalEstimate}\n`;
    }
    if (data.additionalNeeds && data.additionalNeeds.trim() !== "") {
        msg += `\n--- Additional Requirements ---\n`;
        msg += `${data.additionalNeeds.trim()}\n`;
    }
    msg += `\nPlease confirm my booking.`;
    return encodeURIComponent(msg);
}

export default function FareEstimate() {
    const location = useLocation();
    const navigate = useNavigate();

    // Make sure we have the required data, else return to home
    const [formData, setFormData] = useState(location.state?.formData || null);
    const [distanceData, setDistanceData] = useState(location.state?.distanceData || null);
    const [tripType, setTripType] = useState(location.state?.tripType || null);
    const [days, setDays] = useState(location.state?.days || 1);
    const [estimates, setEstimates] = useState([]);

    const [expandedId, setExpandedId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [additionalNeeds, setAdditionalNeeds] = useState("");

    useEffect(() => {
        // If no state exists (user refreshed or visited directly), redirect to home
        if (!formData || !distanceData) {
            navigate("/", { replace: true });
            return;
        }

        // Calculate estimates on mount
        const calculatedEstimates = calculateEstimates(distanceData.distanceKm, tripType, days);
        setEstimates(calculatedEstimates);
        if (calculatedEstimates.length > 0) {
            setExpandedId(calculatedEstimates[0].vehicle.id);
        }
    }, [formData, distanceData, tripType, days, navigate]);

    if (!formData || !distanceData) return null; // Redirecting

    const handleConfirmEstimate = async (estimate) => {
        setIsSubmitting(true);
        const isRoutine = tripType === "routine";

        const estimateData = {
            distanceText: distanceData.distanceText,
            vehicleName: estimate.vehicle.name,
            totalEstimate: estimate.totalEstimate
        };

        const finalData = {
            ...formData,
            isRoutine,
            days,
            estimateData,
            additionalNeeds
        };

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
            vehicle_selected: estimate.vehicle.name,
            estimated_fare: estimate.totalEstimate,
            distance: distanceData.distanceText,
            from_name: "Dropzii Booking",
            to: "dropziitaxi@gmail.com",
            subject: `New ${isRoutine ? "Routine Trip" : "Taxi"} Booking from ${formData.name}`,
            additional_requirements: additionalNeeds,
        };

        try {
            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(submissionData),
            });

            const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
            if (scriptUrl) {
                fetch(scriptUrl, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submissionData),
                }).catch(err => console.warn("Google Sheets failed:", err));
            }

            setSubmittedData(finalData);
            setShowPopup(true);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error sending booking request. Please try again via WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background text-white">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-6">

                {/* Header & Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            Select Your Vehicle
                        </h1>
                        <p className="text-white/50 text-sm mt-1">
                            Distance: <strong className="text-accent">{distanceData.distanceText}</strong> ({distanceData.durationText}) •
                            {tripType === "oneway" ? " One-Way Trip" : " Round Trip"}
                        </p>
                    </div>
                </div>

                {/* Note block - Hidden on Mobile, Shown on Desktop */}
                <div className="hidden lg:flex mb-8 p-5 rounded-2xl bg-accent/10 border-2 border-accent/40 gap-4 items-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-accent shrink-0" />
                    <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                        The fares below are estimated based on your distance. <strong className="text-accent font-bold drop-shadow-sm">Toll, parking, permit, and hills charges (if applicable) are extra.</strong>
                    </p>
                </div>

                {/* Master-Detail Layout */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

                    {/* Left: Vehicle List */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-4">
                        {estimates.map((est) => {
                            const isSelected = expandedId === est.vehicle.id;

                            return (
                                <div
                                    key={est.vehicle.id}
                                    onClick={() => setExpandedId(est.vehicle.id)}
                                    className={cn(
                                        "rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-sm cursor-pointer p-4 md:p-5 flex items-center gap-4 relative",
                                        isSelected
                                            ? "bg-white/[0.04] border-accent/40 shadow-[0_0_30px_rgba(250,204,21,0.05)] scale-[1.02]"
                                            : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                                    )}
                                >
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 text-accent animate-in fade-in zoom-in duration-300">
                                            <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                                        </div>
                                    )}

                                    {/* Car Image (Hidden on very small screens to save space) */}
                                    <div className="w-24 h-16 shrink-0 bg-white/5 rounded-[14px] flex items-center justify-center p-2 hidden sm:flex">
                                        <img
                                            src={est.vehicle.img}
                                            alt={est.vehicle.name}
                                            className="w-full h-full object-contain mix-blend-screen drop-shadow-lg"
                                        />
                                    </div>

                                    {/* Vehicle Info */}
                                    <div className="flex-1 min-w-0 pr-6">
                                        <h4 className="text-lg md:text-xl font-bold text-white leading-tight">
                                            {est.vehicle.name}
                                        </h4>
                                        <p className="text-[11px] text-white/50 mt-1 truncate hidden sm:block">
                                            {est.vehicle.subtitle}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
                                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                <Users className="w-3 h-3 text-white/50" />
                                                <span className="text-[10px] font-semibold text-white/80">{est.vehicle.seating}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                <Briefcase className="w-3 h-3 text-white/50" />
                                                <span className="text-[10px] font-semibold text-white/80">{est.vehicle.luggage}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-[#0ea5e9]/10 px-2 py-0.5 rounded border border-[#0ea5e9]/20 text-[#0ea5e9]">
                                                <Snowflake className="w-3 h-3" />
                                                <span className="text-[10px] font-semibold">AC</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price Display */}
                                    <div className="text-right pl-2 shrink-0 relative z-10">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5 hidden sm:block">Total Fare</p>
                                        <div className="flex flex-col items-end">
                                            <p className="text-sm text-white/70 line-through mb-0.5 font-semibold">₹{est.totalEstimate.toLocaleString()}</p>
                                            <p className="text-xl md:text-2xl font-extrabold text-accent drop-shadow-sm">₹{(est.totalEstimate - 100).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Breakdown Details Panel */}
                    <div className="w-full lg:w-5/12">
                        {(() => {
                            // Find the currently selected estimate
                            const selectedEst = estimates.find(e => e.vehicle.id === expandedId) || estimates[0];
                            if (!selectedEst) return null;
                            const data = selectedEst.breakdown;

                            return (
                                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 lg:sticky lg:top-32 shadow-2xl backdrop-blur-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                            Fare Breakdown
                                        </h3>
                                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                                            <img src={selectedEst.vehicle.img} className="w-8 h-5 object-contain mix-blend-screen" alt="" />
                                            <span className="text-xs font-bold text-white/80 tracking-wide">{selectedEst.vehicle.name}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Minimum rules notification */}
                                        {data.minimumApplied && (
                                            <div className="flex gap-3 text-accent/90 mb-4 bg-accent/5 p-4 rounded-xl border border-accent/20 items-start">
                                                <AlertCircle className="w-5 h-5 shrink-0" />
                                                <p className="text-xs md:text-sm font-medium leading-relaxed">
                                                    Calculated using minimum <span className="font-bold">{tripType === "oneway" ? "130km" : "250km/day"}</span> rule as driving distance is shorter.
                                                </p>
                                            </div>
                                        )}

                                        {/* Distance breakdown */}
                                        <div className="flex justify-between items-center text-sm md:text-base">
                                            <span className="text-white/70 flex flex-col">
                                                <span>Distance Charge</span>
                                                <span className="text-[11px] text-white/30 font-medium tracking-wide mt-0.5 uppercase">{data.chargeableKm} km × ₹{data.rate} {data.days > 1 ? `(${data.days} days)` : ""}</span>
                                            </span>
                                            <span className="text-white font-medium">₹{data.baseFare.toLocaleString()}</span>
                                        </div>

                                        {/* Driver Batta total */}
                                        <div className="flex justify-between items-center text-sm md:text-base">
                                            <span className="text-white/70">Driver Allowance</span>
                                            <span className="text-white font-medium">₹{data.batta.toLocaleString()}</span>
                                        </div>

                                        <div className="h-[1px] w-full bg-white/10 my-5" />

                                        {/* Total */}
                                        <div className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                                            <span className="text-white/90 font-bold text-lg">Total Estimate</span>
                                            <div className="flex flex-col items-end">
                                                <span className="text-base text-white/70 line-through mb-0.5 font-semibold">₹{selectedEst.totalEstimate.toLocaleString()}</span>
                                                <span className="text-accent font-black text-3xl drop-shadow-md">₹{(selectedEst.totalEstimate - 100).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Note block - Mobile Only */}
                                        <div className="flex lg:hidden mt-2 mb-2 p-4 rounded-xl bg-accent/10 border-2 border-accent/40 gap-3 items-center shadow-md">
                                            <AlertCircle className="w-6 h-6 text-accent shrink-0" />
                                            <p className="text-sm text-white font-medium leading-snug">
                                                Fares are estimated based on your distance. <strong className="text-accent font-bold drop-shadow-sm">Toll, parking, permit & hills charges are extra.</strong>
                                            </p>
                                        </div>

                                        {/* Additional Needs Textarea */}
                                        <div className="mt-4 mb-6">
                                            <label htmlFor="additionalNeeds" className="block text-xs md:text-sm font-medium text-white/70 mb-2">
                                                Any specific requirements? (Optional)
                                            </label>
                                            <textarea
                                                id="additionalNeeds"
                                                value={additionalNeeds}
                                                onChange={(e) => setAdditionalNeeds(e.target.value)}
                                                placeholder="e.g. Extra luggage, child seat, or any other special request..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none h-20"
                                            />
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => handleConfirmEstimate(selectedEst)}
                                            disabled={isSubmitting}
                                            className={cn(
                                                "w-full mt-6 py-4 md:py-5 bg-accent text-luxury-charcoal font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm md:text-base uppercase tracking-widest shadow-[0_0_30px_rgba(250,204,21,0.25)] flex items-center justify-center gap-3",
                                                isSubmitting ? "opacity-70 cursor-not-allowed" : "group/btn hover:shadow-[0_0_40px_rgba(250,204,21,0.4)]"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-luxury-charcoal/30 border-t-luxury-charcoal rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Confirm Booking
                                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* WhatsApp Confirmation Popup */}
            {showPopup && submittedData && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowPopup(false)}
                    />
                    <div className="relative bg-luxury-charcoal border border-white/10 rounded-[2rem] p-8 max-w-sm w-full shadow-luxury z-10">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shadow-inner">
                                <MessageCircle className="text-[#25D366] w-10 h-10 drop-shadow-sm" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-center text-white">Almost Done!</h3>
                        <p className="text-white/60 text-center text-[13px] md:text-sm leading-relaxed mb-6">
                            Click the button below to send your booking request via WhatsApp. We will reply instantly with confirmation!
                        </p>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(submittedData, submittedData.isRoutine, submittedData.estimateData)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 px-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 w-full text-[13px] md:text-sm uppercase tracking-wide relative overflow-hidden group/btn white-space-nowrap flex-nowrap"
                            onClick={() => setShowPopup(false)}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Connect on WhatsApp <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        </a>
                        <div className="mt-4 flex items-center justify-center gap-2 text-white/40">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                            <span className="text-xs">We typically reply in 5 minutes</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
