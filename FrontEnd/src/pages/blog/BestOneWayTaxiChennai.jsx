import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    fadeInUp,
    staggerContainer,
    scaleIn,
    viewportConfig,
} from "../../utils/animations";
import SEO from "../../components/SEO";
import {
    ChevronRight,
    ChevronDown,
    Shield,
    IndianRupee,
    Clock,
    Car,
    MapPin,
    Phone,
    CheckCircle,
    AlertTriangle,
    Star,
    Users,
    Plane,
    Heart,
} from "lucide-react";

/* ───── FAQ Data ───── */
const faqs = [
    {
        q: "What is a one way taxi service?",
        a: "A one-way taxi service allows customers to pay only for the distance traveled instead of round-trip charges. You book a cab for a single journey from your pickup point to your destination, making it significantly more affordable than traditional round-trip taxi bookings.",
    },
    {
        q: "Is one way taxi cheaper than round trip taxi booking?",
        a: "Yes. One-way taxis are usually much more affordable because customers only pay for one side of the journey. This means you save up to 50% compared to round-trip fares where you'd be paying for the driver's return trip as well.",
    },
    {
        q: "Can I book a Chennai airport one way taxi online?",
        a: "Yes. Dropzii.in offers convenient online booking options for airport and outstation travel. You can book through our website, select your vehicle type, and receive instant confirmation with driver details.",
    },
    {
        q: "Which is the best one way taxi in Chennai?",
        a: "The best taxi service depends on pricing transparency, vehicle quality, driver professionalism, and customer support. Dropzii.in focuses on affordable and reliable one-way cab services in Chennai with verified drivers, clean vehicles, and 24/7 availability.",
    },
    {
        q: "Are one-way taxis safe for long-distance travel?",
        a: "Yes, provided you choose a trusted taxi service with experienced drivers and maintained vehicles. Dropzii.in ensures all drivers are verified, vehicles are GPS-enabled, and emergency support is available throughout your journey.",
    },
];

/* ───── Popular Routes Data ───── */
const popularRoutes = [
    {
        from: "Chennai",
        to: "Pondicherry",
        icon: <Heart size={18} />,
        tags: ["Weekend vacations", "Beach trips", "Couple getaways"],
        desc: "Travelers prefer cabs because of the scenic East Coast Road experience.",
    },
    {
        from: "Chennai",
        to: "Bangalore",
        icon: <Users size={18} />,
        tags: ["IT professionals", "Business travelers", "Corporate employees"],
        desc: "One-way taxis offer flexibility compared to flights and buses.",
    },
    {
        from: "Chennai",
        to: "Tirupati",
        icon: <Star size={18} />,
        tags: ["Comfortable temple visits", "Family travel", "Flexible timings"],
        desc: "This route sees high demand throughout the year.",
    },
    {
        from: "Chennai",
        to: "Airport",
        icon: <Plane size={18} />,
        tags: ["On-time pickup", "Comfortable luggage handling", "Reliable transport"],
        desc: "Especially after long flights, a private cab feels much more convenient.",
    },
];

/* ───── FAQ Accordion Item ───── */
function FAQItem({ faq, index }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            variants={fadeInUp}
            className="border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/20"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left group cursor-pointer"
                aria-expanded={open}
                aria-controls={`faq-answer-${index}`}
            >
                <span className="text-base md:text-lg font-semibold text-white/90 pr-4 group-hover:text-accent transition-colors">
                    {faq.q}
                </span>
                <ChevronDown
                    size={20}
                    className={`text-accent shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <p className="px-6 pb-6 text-white/50 leading-relaxed text-sm md:text-base">
                    {faq.a}
                </p>
            </div>
        </motion.div>
    );
}

/* ───── Main Blog Page ───── */
export default function BestOneWayTaxiChennai() {
    return (
        <article className="overflow-hidden" itemScope itemType="https://schema.org/Article">
            <SEO
                title="Best One Way Taxi in Chennai | Affordable Outstation Cabs"
                description="Looking for the best one way taxi in Chennai? Book affordable, safe, and reliable one-way cabs with professional drivers and transparent pricing at Dropzii.in."
            />

            {/* ───── JSON-LD: Article Schema ───── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Best One Way Taxi in Chennai for Affordable & Hassle-Free Travel",
                    "description": "Looking for the best one way taxi in Chennai? Book affordable, safe, and reliable one-way cabs with professional drivers and transparent pricing at Dropzii.in.",
                    "author": { "@type": "Organization", "name": "Dropzii Taxi Service", "url": "https://dropzii.in" },
                    "publisher": { "@type": "Organization", "name": "Dropzii Taxi Service", "logo": { "@type": "ImageObject", "url": "https://dropzii.in/assets/logo1.png" } },
                    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dropzii.in/best-one-way-taxi-in-chennai" },
                    "datePublished": "2025-01-15",
                    "dateModified": "2025-01-15",
                    "keywords": "best one way taxi in Chennai, one way taxi Chennai, Chennai one way cab, affordable one way taxi Chennai, outstation taxi Chennai"
                })
            }} />

            {/* ───── JSON-LD: FAQ Schema ───── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(f => ({
                        "@type": "Question",
                        "name": f.q,
                        "acceptedAnswer": { "@type": "Answer", "text": f.a }
                    }))
                })
            }} />

            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background z-10" />
                    <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />
                </div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto relative z-10 text-center"
                >
                    <motion.div variants={fadeInUp} className="flex justify-center items-center gap-4 mb-8">
                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full text-accent text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
                            <MapPin size={14} className="fill-accent/20" />
                            Travel Guide
                        </div>
                        <span className="text-white/20">•</span>
                        <span className="text-white/50 text-[13px] font-medium tracking-wide uppercase">5 Min Read</span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8"
                        itemProp="headline"
                    >
                        Best One Way Taxi in Chennai for{" "}
                        <span className="text-accent underline decoration-accent/30 underline-offset-8">Affordable & Hassle-Free</span> Travel
                    </motion.h1>

                    <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 text-white/50 text-sm mb-12">
                        <div className="flex items-center gap-3 bg-white/5 pr-4 pl-1.5 py-1.5 rounded-full border border-white/5 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <img src="/assets/logo1.png" alt="Dropzii" className="w-5 object-contain" />
                            </div>
                            <span className="font-bold text-white/90">Dropzii Editorial Team</span>
                        </div>
                        <span className="text-white/20">—</span>
                        <time dateTime="2025-01-15" className="font-medium text-white/60">January 15, 2025</time>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6 text-left">
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-white/80 leading-relaxed font-medium"
                            itemProp="description"
                        >
                            Traveling out of Chennai has become easier than ever. Whether you're heading to Pondicherry for a weekend getaway, Bangalore for a business trip, or Tirupati for a spiritual visit, finding a reliable <strong className="text-white">one way taxi in Chennai</strong> can completely change your travel experience.
                        </motion.p>

                        <motion.p variants={fadeInUp} className="text-base text-white/60 leading-relaxed">
                            Most travelers today are looking for affordable pricing, professional drivers, comfortable rides, and transparent billing. Unfortunately, many taxi services still charge round-trip fares even when passengers only need a one-way drop. That's where modern <strong className="text-white/80">one way cab services</strong> are transforming travel.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-accent/5 border-l-4 border-accent text-white/80 italic text-lg shadow-sm">
                            At <Link to="/" className="text-accent font-bold hover:underline not-italic">Dropzii.in</Link>, travelers can book dependable one-way taxi services in Chennai without overpaying or dealing with hidden charges.
                        </motion.div>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto mt-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* ═══════════════════ WHY ONE WAY TAXIS ARE GROWING ═══════════════════ */}
            <section className="py-20 px-6 bg-glass/40">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
                            Why One Way Taxi Services Are Growing Rapidly in <span className="text-accent">Chennai</span>
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-6">
                            Chennai is one of India's busiest metropolitan cities, with thousands of people traveling daily for work, tourism, family visits, and airport transfers. In the past, booking outstation taxis meant paying for both onward and return journeys — even if you didn't need the cab back. Today, <strong className="text-white/70">one way taxi services</strong> solve that problem.
                        </motion.p>

                        <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-8">
                            Instead of paying double fares, customers only pay for the distance they actually travel. This simple pricing model has made one-way cabs extremely popular among:
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {["Business travelers", "Families", "College students", "Tourists", "Couples", "Solo travelers", "Airport passengers", "Pilgrims"].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                                    <CheckCircle size={14} className="text-accent shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ COMMON PROBLEMS ═══════════════════ */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-10">
                            Common Problems with <span className="text-accent">Traditional Taxi Services</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Hidden Charges",
                                    icon: <IndianRupee size={24} />,
                                    items: ["Toll charges", "Driver allowance", "Waiting charges", "Night charges", "Extra kilometer fees"],
                                },
                                {
                                    title: "Poor Vehicle Quality",
                                    icon: <AlertTriangle size={24} />,
                                    items: ["Unclean vehicles", "Non-AC cars", "Unprofessional drivers", "Delayed pickups"],
                                },
                                {
                                    title: "Unreliable Booking",
                                    icon: <Clock size={24} />,
                                    items: ["No real-time confirmation", "Lack of customer support", "Poor driver communication", "No online booking"],
                                },
                            ].map((card) => (
                                <div key={card.title} className="bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8 transition-all duration-500 hover:border-red-500/20 group">
                                    <div className="bg-red-500/10 p-3 rounded-2xl w-fit mb-5 text-red-400 group-hover:bg-red-500/20 transition-colors">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 text-white">{card.title}</h3>
                                    <ul className="space-y-2">
                                        {card.items.map((item) => (
                                            <li key={item} className="text-white/40 text-sm flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ BENEFITS ═══════════════════ */}
            <section className="py-20 px-6 bg-glass/40">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-12">
                            Benefits of Choosing a <span className="text-accent">One Way Taxi</span> in Chennai
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Cost-Effective Travel",
                                    icon: <IndianRupee size={24} />,
                                    desc: "You only pay for the distance you travel. Routes like Chennai to Pondicherry, Chennai to Bangalore, and Chennai to Tirupati become much more economical with one-way pricing.",
                                },
                                {
                                    title: "Comfortable Long-Distance Travel",
                                    icon: <Car size={24} />,
                                    desc: "A private one-way taxi offers doorstep pickup, flexible departure timing, comfortable seating, privacy, and better luggage space — especially useful for families and senior citizens.",
                                },
                                {
                                    title: "Professional Drivers",
                                    icon: <Shield size={24} />,
                                    desc: "Experienced drivers ensure safer highway travel, better route navigation, timely arrival, and a smooth driving experience throughout your journey.",
                                },
                                {
                                    title: "Time-Saving Convenience",
                                    icon: <Clock size={24} />,
                                    desc: "With online booking and instant confirmations, simply book online, confirm trip details, and get picked up directly from home — creating a stress-free travel experience.",
                                },
                            ].map((item) => (
                                <div key={item.title} className="bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8 transition-all duration-500 hover:border-accent/30 hover:translate-y-[-4px] group">
                                    <div className="bg-accent/10 p-3 rounded-2xl w-fit mb-5 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ WHY DROPZII ═══════════════════ */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                            What Makes Dropzii.in the <span className="text-accent">Best One Way Taxi</span> in Chennai
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-white/50 mb-12 leading-relaxed">
                            Choosing the right taxi provider can make all the difference during your journey. Here's why many travelers prefer Dropzii.in for <strong className="text-white/70">one-way cab booking in Chennai</strong>.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="space-y-6">
                            {[
                                {
                                    title: "Transparent Pricing",
                                    desc: "No one likes surprise charges. Dropzii.in focuses on transparent fare structures, helping customers clearly understand base fare, toll charges, driver allowance, and total trip cost.",
                                },
                                {
                                    title: "Wide Range of Vehicles",
                                    desc: "Whether you need sedan cars, SUVs, hatchbacks, or spacious family vehicles — there are multiple options available based on budget and comfort preferences.",
                                },
                                {
                                    title: "24/7 Availability",
                                    desc: "Travel plans don't always happen during business hours. Late-night airport transfer? Early morning outstation ride? Reliable taxi availability around the clock makes travel easier.",
                                },
                                {
                                    title: "Clean & Comfortable Cabs",
                                    desc: "Well-maintained AC vehicles ensure better travel experience, reduced fatigue, comfortable seating, and cleaner interiors throughout your journey.",
                                },
                                {
                                    title: "Easy Online Booking",
                                    desc: "Choose destination, select vehicle, confirm travel schedule, and receive booking details instantly. Quick digital booking systems improve convenience and reduce hassles.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={item.title}
                                    className="flex gap-6 items-start bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-accent/20 transition-all duration-500 group"
                                >
                                    <div className="bg-accent/10 text-accent font-extrabold text-lg w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ POPULAR ROUTES ═══════════════════ */}
            <section className="py-20 px-6 bg-glass/40">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-12">
                            Popular One Way Taxi Routes from <span className="text-accent">Chennai</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {popularRoutes.map((route) => (
                                <div
                                    key={route.to}
                                    className="bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8 transition-all duration-500 hover:border-accent/30 hover:translate-y-[-4px] group"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-accent/10 p-2.5 rounded-xl text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                                            {route.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            {route.from} → {route.to}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {route.tags.map((tag) => (
                                            <span key={tag} className="bg-accent/5 text-accent/80 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-accent/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-white/40 text-sm leading-relaxed">{route.desc}</p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8 text-center">
                            <Link
                                to="/popular-routes"
                                className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest hover:text-white transition-colors border-b border-accent/0 hover:border-white pb-1"
                            >
                                View All Routes & Pricing <ChevronRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ HOW TO CHOOSE ═══════════════════ */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-10">
                            How to Choose the Right <span className="text-accent">One Way Taxi Service</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Check Customer Reviews",
                                    items: ["Service quality", "Driver behavior", "Punctuality", "Vehicle condition"],
                                },
                                {
                                    title: "Compare Pricing Carefully",
                                    items: ["Transparent pricing", "No hidden fees", "Clear billing structure", "Value for money"],
                                },
                                {
                                    title: "Verify Safety Standards",
                                    items: ["Verified drivers", "GPS-enabled tracking", "Emergency support", "Vehicle maintenance"],
                                },
                            ].map((card) => (
                                <div key={card.title} className="bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8 transition-all duration-500 hover:border-accent/30 group">
                                    <h3 className="text-base font-bold mb-5 text-white">{card.title}</h3>
                                    <ul className="space-y-3">
                                        {card.items.map((item) => (
                                            <li key={item} className="text-white/40 text-sm flex items-center gap-3">
                                                <CheckCircle size={14} className="text-accent shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ TIPS TO SAVE MONEY ═══════════════════ */}
            <section className="py-20 px-6 bg-glass/40">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-10">
                            Tips to Save Money on <span className="text-accent">One Way Cab Booking</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Book Early", desc: "Advance booking often helps secure lower fares and guarantees vehicle availability." },
                                { title: "Avoid Peak Timing", desc: "Weekend and holiday demand may increase pricing. Plan mid-week trips when possible." },
                                { title: "Choose the Right Vehicle", desc: "Avoid oversized vehicles if traveling solo or with fewer passengers to save costs." },
                                { title: "Compare Service Quality", desc: "Low-cost services may compromise comfort and reliability. Choose trusted providers." },
                            ].map((tip, i) => (
                                <div key={tip.title} className="flex gap-4 items-start">
                                    <div className="bg-accent/10 text-accent font-extrabold text-sm w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-1">{tip.title}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ SAFETY ═══════════════════ */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
                            Why Safety Matters During <span className="text-accent">Outstation Travel</span>
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-6">
                            Outstation travel involves long hours on highways and unfamiliar routes. A professional taxi service ensures trained drivers, better route planning, safe driving practices, and reduced travel stress.
                        </motion.p>

                        <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-8">
                            For families, women travelers, and elderly passengers, safety becomes one of the biggest decision-making factors. Reliable one-way taxi providers understand this responsibility and focus on delivering secure travel experiences.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Trained Drivers", "Route Planning", "Safe Driving", "Reduced Stress"].map((item) => (
                                <div key={item} className="bg-accent/5 border border-accent/10 rounded-2xl p-4 text-center">
                                    <Shield size={20} className="text-accent mx-auto mb-2" />
                                    <span className="text-white/60 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ FAQ ═══════════════════ */}
            <section className="py-20 px-6 bg-glass/40">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="initial" whileInView="animate" viewport={viewportConfig} variants={staggerContainer}>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-bold tracking-tight mb-10">
                            Frequently Asked <span className="text-accent">Questions</span>
                        </motion.h2>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} faq={faq} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════ CTA ═══════════════════ */}
            <section className="py-20 px-6">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={viewportConfig}
                    variants={scaleIn}
                    className="max-w-4xl mx-auto rounded-[3rem] bg-accent p-10 md:p-16 text-luxury-charcoal text-center space-y-8 relative overflow-hidden group shadow-accent-glow"
                >
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px]" />
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] relative z-10">
                        Book Your One Way Taxi in Chennai Now
                    </h2>
                    <p className="text-lg md:text-xl font-bold opacity-80 max-w-2xl mx-auto leading-relaxed relative z-10">
                        Affordable pricing. Professional drivers. Comfortable rides. Book your next trip with Dropzii.in and travel stress-free.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center pt-4 relative z-10">
                        <a
                            href="https://wa.me/919442059952?text=Hi%2C%20I%20want%20to%20book%20a%20one-way%20taxi%20from%20Chennai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-luxury-charcoal text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-2xl whitespace-nowrap text-lg"
                        >
                            Book via WhatsApp <ChevronRight />
                        </a>
                        <Link
                            to="/contact"
                            className="border-2 border-luxury-charcoal/20 font-bold px-8 py-4 rounded-2xl hover:bg-luxury-charcoal/5 transition-all text-lg whitespace-nowrap"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </section>
        </article>
    );
}
