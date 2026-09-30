import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import { MessageCircle, Phone } from "lucide-react";

// Lazy Load Pages for Production Performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const PopularRoutes = lazy(() => import("./pages/PopularRoutes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BestOneWayTaxiChennai = lazy(() => import("./pages/blog/BestOneWayTaxiChennai"));
const FareEstimate = lazy(() => import("./pages/FareEstimate"));

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// WhatsApp Redirect Component for Ads
function WhatsAppRedirect() {
  useEffect(() => {
    window.location.href = "https://wa.me/919442059952?text=Hello%20Dropzii!%20I%20have%20an%20inquiry.";
  }, []);
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm font-medium">Redirecting to WhatsApp...</p>
      </div>
    </div>
  );
}

import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-background">
            <Navbar />

            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/popular-routes" element={<PopularRoutes />} />
                  <Route path="/best-one-way-taxi-in-chennai" element={<BestOneWayTaxiChennai />} />
                  <Route path="/fare-estimate" element={<FareEstimate />} />
                  <Route path="/whatsapp" element={<WhatsAppRedirect />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>


            <footer className="bg-primary/50 py-12 px-6 border-t border-white/5">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="space-y-4 col-span-1 md:col-span-2">
                  <Link to="/" className="block">
                    <img src="/assets/logo1.png" alt="Dropzii" className="h-20 md:h-24 object-contain -ml-2" />
                  </Link>
                  <p className="text-white/50 max-w-sm">
                    Premium one-way taxi service across South India (TN, KL, KA, AP). Safe, reliable, and affordable rides for all your travel needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-white/50 text-sm">
                    <li><Link to="/" className="hover:text-accent">Home</Link></li>
                    <li><Link to="/popular-routes" className="hover:text-accent">Popular Routes</Link></li>
                    <li><Link to="/services" className="hover:text-accent">Services</Link></li>
                    <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
                    <li><Link to="/best-one-way-taxi-in-chennai" className="hover:text-accent">Blog</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Coverage</h4>
                  <ul className="space-y-2 text-white/50 text-sm">
                    <li>Chennai • Madurai</li>
                    <li>Coimbatore • Trichy</li>
                    <li>Bangalore • Kochi</li>
                    <li>Hyderabad • Pondicherry</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
                © {new Date().getFullYear()} Dropzii Taxi Service. All rights reserved.
              </div>
            </footer>

            {/* Global Floating Actions */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
              <a
                href="https://wa.me/919442059952"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="tel:+919442059952"
                className="bg-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
              >
                <Phone className="text-background w-6 h-6" />
              </a>
            </div>
          </div>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
