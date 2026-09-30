import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, User, LogIn, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarVariants } from "../utils/animations";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Popular Routes", path: "/popular-routes" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/best-one-way-taxi-in-chennai" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-[100] transition-all duration-700 font-urbanist ${scrolled
        ? "py-4 bg-background/80 backdrop-blur-2xl border-b border-white/5 shadow-premium"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group relative">
          <div className="absolute -inset-4 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img
            src="/assets/logo1.png"
            alt="Dropzii"
            className="h-16 md:h-20 object-contain drop-shadow-accent-glow group-hover:scale-105 transition-transform duration-500"
          />
          <div className="flex items-baseline">
            <span className="text-2xl md:text-3xl font-black tracking-widest text-white">DROPZ</span>
            <span className="text-2xl md:text-3xl font-black tracking-widest text-accent">II</span>
          </div>

        </Link>
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-2xl border border-white/5 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 relative py-2 block ${location.pathname === link.path
                  ? "text-accent"
                  : "text-white/40 hover:text-white"
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent shadow-accent-glow"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919442059952"
              className="bg-accent text-luxury-charcoal px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-accent-glow flex items-center gap-2 text-xs uppercase tracking-widest"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 bg-white/5 border border-white/5 rounded-xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-bold uppercase tracking-[0.2em] ${location.pathname === link.path ? "text-accent" : "text-white/40"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5">
                <a
                  href="tel:+919442059952"
                  className="w-full bg-accent text-luxury-charcoal font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-wider shadow-accent-glow"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
