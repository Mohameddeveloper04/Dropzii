import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig
} from "../utils/animations";
import BookingForm from "../components/BookingForm";
import { Shield, Clock, IndianRupee, Star, ChevronRight, UserCheck, MapPin } from "lucide-react";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <SEO 
        title="Premium One-Way & Outstation Taxi" 
        description="Book affordable, safe, and luxury one-way outstation taxis across South India. Serving Chennai, Madurai, Coimbatore, and Bangalore with verified drivers." 
      />
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-20 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
          <img
            src="/assets/hero_taxi_highway.png"
            alt="Taxi background"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="hero-content space-y-10 flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full text-accent text-[11px] font-bold uppercase tracking-widest self-center lg:self-start mb-4 backdrop-blur-md pulse-accent"
            >
              <MapPin size={14} className="fill-accent/20" />
              South India's #1 Taxi Service
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl"
            >
              <span className="block">Book One-Way Taxi</span>
              <span className="opacity-90 block mt-2">in South India</span>
              <span className="text-accent italic block mt-2">Fast & Affordable</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Airport Pickup • Outstation • One-Way Rides — <span className="text-white/70">Transparent pricing, verified drivers, and 24/7 service across South India (TN, KL, KA, AP).</span>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent text-luxury-charcoal font-bold py-3 px-6 rounded-xl transition-all duration-700 hover:scale-[1.05] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 group relative overflow-hidden text-sm uppercase tracking-wider"
              >
                <span className="relative z-10">Book Now</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <Link to="/services" className="bg-white/5 backdrop-blur-xl text-white font-bold py-3 px-6 rounded-xl border border-white/10 transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] text-sm flex items-center">
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            id="booking"
            initial="initial"
            animate="animate"
            variants={scaleIn}
            className="hero-form flex justify-center lg:justify-end items-center relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <BookingForm />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="text-center mb-16 section-header"
          >
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Why Choose Us</h3>
            <p className="text-white/60 text-lg font-medium">We provide the best taxi experience in South India (TN, KL, KA, AP)</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Fully Insured", desc: "Your safety is our top priority with comprehensive insurance coverage." },
              { icon: <Clock className="w-8 h-8" />, title: "On-time Policy", desc: "Professional drivers who respect your time for every single trip." },
              { icon: <IndianRupee className="w-8 h-8" />, title: "Best Price", desc: "Transparent pricing with zero hidden charges or extra baggage fees." },
              { icon: <Star className="w-8 h-8" />, title: "Top Rated", desc: "Highly experienced drivers maintaining 5-star service standards." }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-8px] group feature-card"
              >
                <div className="bg-accent/10 p-4 rounded-2xl w-fit mb-6 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Routes */}
      <section id="pricing" className="py-24 px-6 bg-glass">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 section-header"
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Popular Routes</h3>
              <p className="text-white/60 text-lg font-medium">One-way taxi at the best prices across South India</p>
            </div>
            <Link to="/popular-routes" className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest hover:text-white transition-colors whitespace-nowrap border-b border-accent/0 hover:border-white pb-1 self-start md:self-auto">
              View All <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { from: "Chennai", to: "Pondicherry", price: "2310", time: "3h", dist: "165km" },
              { from: "Madurai", to: "Chennai", price: "6399", time: "8h", dist: "456km" },
              { from: "Bangalore", to: "Chennai", price: "4859", time: "6h", dist: "347km" },
              { from: "Coimbatore", to: "Madurai", price: "3039", time: "4h", dist: "217km" }
            ].map((route, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] group relative overflow-hidden route-card"
              >
                <div className="absolute top-0 right-0 p-4">
                  <ChevronRight className="text-accent/20 group-hover:text-accent transition-colors" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Top Route</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{route.from} → {route.to}</h4>
                <p className="text-white/50 text-sm mb-6">{route.dist} • {route.time} travel</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">₹{route.price}</span>
                  <Link to={`/popular-routes`} className="text-accent text-sm font-bold border-b border-accent/0 hover:border-accent transition-all">Select</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Our Fleet</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Choose Your Comfort</h3>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { type: "Sedan", seats: "4+1", price: "₹15/km", img: "/assets/Cars/sedan.jpeg" },
              { type: "Etios", seats: "4+1", price: "₹15/km", img: "/assets/Cars/Etios.jpeg" },
              { type: "SUV", seats: "7+1", price: "₹20/km", img: "/assets/Cars/Suv.jpeg" },
              { type: "MUV (Innova)", seats: "7+1", price: "₹21/km", img: "/assets/Cars/Innova.jpeg" },
            ].map((v, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="vehicle-card bg-white/[0.03] backdrop-blur-xl border border-white/5 shadow-premium rounded-[2.5rem] p-0 overflow-hidden group transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px]"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
                  <img src={v.img} alt={v.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-extrabold tracking-tight text-white">{v.type}</h4>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-accent/20 whitespace-nowrap">{v.seats} Seats</span>
                  </div>
                  <p className="text-white/30 mb-8 italic text-xs leading-relaxed font-medium">Perfectly curated for discerning travelers and luxury outstation experiences.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-extrabold tracking-tight text-white">{v.price} <span className="text-[10px] font-bold text-white/20 uppercase">/ km</span></span>
                    <button
                      onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-accent text-xs font-bold flex items-center gap-1 group/btn hover:text-white transition-colors uppercase tracking-widest"
                    >
                      Reserve <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-glass/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Seamless Journey</h3>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {[
              { step: "01", title: "Instant Booking", desc: "Digital form with exact location intelligence." },
              { step: "02", title: "Direct Connect", desc: "Immediate WhatsApp confirmation from our team." },
              { step: "03", title: "Premium Pickup", desc: "Punctual arrival with professional driver protocol." },
              { step: "04", title: "Secure Arrival", desc: "Safe destination reach with multiple payment options." },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center space-y-6 group"
              >
                <div className="text-7xl font-bold text-white/10 group-hover:text-accent/30 transition-all duration-500 leading-none">
                  {s.step}
                </div>
                <h4 className="text-2xl font-bold tracking-tight">{s.title}</h4>
                <p className="text-white/30 text-sm leading-relaxed font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Feedback</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-20 font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Trusted by Connoisseurs</h3>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            {[
              { name: "Rajesh Kumar", role: "Chennai Airport", initial: "RK" },
              { name: "Priya Sharma", role: "Madurai Business Traveler", initial: "PS" },
              { name: "Arun V.", role: "Outstation Client", initial: "AV" },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="testimonial-card bg-white/[0.03] backdrop-blur-xl border border-white/5 shadow-premium rounded-[2.5rem] p-10 space-y-6 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] hover:bg-white/[0.05]"
              >
                <div className="flex text-accent gap-1">
                  {[1, 2, 3, 4, 5].map(v => <Star key={v} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/50 italic leading-relaxed text-lg font-medium">
                  "The most sophisticated one-way taxi service in South India. Professional protocol, impeccable vehicles, and absolute reliability."
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center font-bold text-accent text-lg">{t.initial}</div>
                  <div>
                    <h5 className="font-bold text-lg tracking-tight text-white">{t.name}</h5>
                    <p className="text-xs text-white/20 uppercase font-bold tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          variants={scaleIn}
          className="max-w-6xl mx-auto rounded-[3rem] bg-accent p-10 md:p-16 text-luxury-charcoal text-center space-y-8 relative overflow-hidden group shadow-accent-glow"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px]" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">Ready to Begin Your Journey?</h2>
          <p className="text-xl md:text-2xl font-bold opacity-80 max-w-2xl mx-auto leading-relaxed">
            Reserve your premium one-way experience now. Impeccable service, guaranteed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-luxury-charcoal text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-2xl whitespace-nowrap text-lg"
            >
              Book Journey Now <ChevronRight />
            </button>
            <Link to="/contact" className="border-2 border-luxury-charcoal/20 font-bold px-8 py-4 rounded-2xl hover:bg-luxury-charcoal/5 transition-all text-lg whitespace-nowrap">
              Connect with us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
