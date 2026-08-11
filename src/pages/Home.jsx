import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "../components/BookingForm";
import OurFleet from "../components/OurFleet";
import OurTariff from "../components/OurTariff";
import PopularRoutes from "../components/PopularRoutes";
import VehicleComparisonTable from "../components/VehicleComparisonTable";
import TrustBar from "../components/TrustBar";
import ServiceCoverageMap from "../components/ServiceCoverageMap";
import FAQSection from "../components/FAQSection";
import FloatingBottomBar from "../components/FloatingBottomBar";
import LiveChat from "../components/LiveChat";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import WhyChooseUs from "../components/WhyChooseUs";
import SEOHead from "../components/SEOHead";
import AnimatedCounter from "../components/AnimatedCounter";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  Car,
  PhoneCall,
  CheckCircle,
  Quote,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Plane,
  Users,
  Compass,
  MapPin,
} from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import { blogPostsData } from "./blog/BlogList";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Hero visual tab state
  const [activeHeroTab, setActiveHeroTab] = useState(0);

  const heroVisuals = [
    {
      id: "highway",
      label: "Highway Cabs",
      tagline: "Express Tamil Nadu Highways",
      badge: "Smooth Intercity Rides",
      desc: "Travel stress-free across Tamil Nadu expressways in clean, high-performance Sedans & SUVs.",
      image: "/images/hero_highway_taxi.webp",
      fallbackImage: "/images/hero_highway_taxi.png",
      icon: Compass,
    },
    {
      id: "family",
      label: "Family Trips",
      tagline: "Comfortable Outstation Journeys",
      badge: "Spacious & Air-Conditioned",
      desc: "Enjoy quiet, safe travel with spacious seating, clean interiors, and experienced family-friendly drivers.",
      image: "/images/hero_family_travel.webp",
      fallbackImage: "/images/hero_family_travel.png",
      icon: Users,
    },
    {
      id: "airport",
      label: "Airport Pickup",
      tagline: "24/7 Gate & Terminal Pickup",
      badge: "Zero Flight Delay Fees",
      desc: "Direct transfers to MAA Chennai, BLR Bangalore, CJB Coimbatore & IXM Madurai airports.",
      image: "/images/hero_airport_pickup.webp",
      fallbackImage: "/images/hero_airport_pickup.png",
      icon: Plane,
    },
    {
      id: "drone",
      label: "TN Expressways",
      tagline: "Scenic South India Routes",
      badge: "No Return Km Charges",
      desc: "Connecting 100+ South Indian cities with transparent per-kilometer distance billing.",
      image: "/images/hero_drone_highway.webp",
      fallbackImage: "/images/hero_drone_highway.png",
      icon: MapPin,
    },
  ];

  // Auto rotate hero visuals every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroTab((prev) => (prev + 1) % heroVisuals.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroVisuals.length]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      {/* Comprehensive SEO Head */}
      <SEOHead
        title="Pranav Drop Taxi – South India's Trusted One-Way Taxi Service"
        description="South India's trusted one-way taxi service. Pay only for the distance you travel across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh. 24/7 doorstep pickup."
        canonicalUrl="https://pranavdroptaxi.com/"
        imageUrl="https://pranavdroptaxi.com/images/hero_highway_taxi.png"
      />

      <PWAInstallPrompt />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 scale-105 bg-center bg-no-repeat bg-cover opacity-25 blur-[2px] transition-all duration-1000"
          style={{ backgroundImage: `url('${heroVisuals[activeHeroTab].image}')` }}
          role="img"
          aria-label="Pranav Drop Taxi dynamic background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40" />
      </div>

      <main className="relative z-10">
        {/* =========================================================================
            1. HERO SECTION (ENHANCED VISUALS & ROTATING SHOWCASE)
           ========================================================================= */}
        <header className="relative min-h-[95vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_20px_rgba(244,180,0,0.3)]">
                <Sparkles className="w-3.5 h-3.5" /> South India's #1 One-Way Taxi
              </div>

              <h1 className="mb-6 text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
                One Way Taxi <br />
                <span className="gradient-text-yellow">Across South India</span>
              </h1>

              {/* Stronger Typography Hierarchy Pills */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl bg-[#0F4C81]/50 text-sky-100 border border-[#0F4C81] backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-taxi-yellow" /> Safe.
                </span>
                <span className="px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl bg-[#2E7D32]/50 text-emerald-100 border border-[#2E7D32] backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-taxi-yellow" /> Affordable.
                </span>
                <span className="px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-taxi-yellow" /> Always On Time.
                </span>
              </div>

              <p className="mb-8 text-sm font-medium text-gray-300 leading-relaxed max-w-xl">
                Transparent per-kilometer billing with zero return charges. Enjoy 24/7 doorstep pickup across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#booking"
                  className="flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider text-black transition-all rounded-full bg-taxi-yellow hover:bg-white hover:scale-105 shadow-[0_0_25px_rgba(255,193,7,0.4)]"
                >
                  <Car className="w-4 h-4" /> Book Ride Now
                </a>

                <a
                  href="tel:+919884949171"
                  aria-label="Call Pranav Drop Taxi"
                  className="flex items-center gap-2 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all border border-white/15 rounded-full bg-white/5 hover:bg-white hover:text-black hover:scale-102 backdrop-blur-md"
                >
                  <PhoneCall className="w-4 h-4 text-taxi-yellow" /> Call +91 98849 49171
                </a>

                <a
                  href="https://wa.me/919884949171"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                  className="flex items-center gap-2 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all border border-green-500/30 bg-green-600/15 rounded-full hover:bg-green-600 hover:scale-102 backdrop-blur-md"
                >
                  <FaWhatsapp className="w-4 h-4 text-green-400" /> WhatsApp
                </a>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    <AnimatedCounter value="100%" />
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">One-Way Billing</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-taxi-yellow block">24/7</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Doorstep Pickup</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    <AnimatedCounter value="500+" />
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Happy Trips</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Interactive Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              {/* Tab Selectors */}
              <div className="flex flex-wrap gap-2 mb-4">
                {heroVisuals.map((vis, idx) => {
                  const Icon = vis.icon;
                  const isActive = activeHeroTab === idx;
                  return (
                    <button
                      key={vis.id}
                      onClick={() => setActiveHeroTab(idx)}
                      aria-label={`Showcase ${vis.label}`}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${isActive
                          ? "bg-taxi-yellow text-black font-black shadow-lg shadow-taxi-yellow/20 scale-105"
                          : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {vis.label}
                    </button>
                  );
                })}
              </div>

              {/* Image Frame Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900/90 shadow-2xl backdrop-blur-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroTab}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-[16/10] overflow-hidden"
                  >
                    <img
                      src={heroVisuals[activeHeroTab].image}
                      onError={(e) => { e.currentTarget.src = heroVisuals[activeHeroTab].fallbackImage; }}
                      alt={heroVisuals[activeHeroTab].tagline}
                      width="600"
                      height="375"
                      fetchPriority="high"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-wider text-taxi-yellow flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-taxi-yellow animate-ping" />
                      {heroVisuals[activeHeroTab].badge}
                    </div>

                    {/* Bottom Card Text Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 text-left">
                      <p className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-1">
                        {heroVisuals[activeHeroTab].tagline}
                      </p>
                      <p className="text-xs text-gray-300 font-medium leading-relaxed max-w-lg">
                        {heroVisuals[activeHeroTab].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </header>

        {/* TRUST BAR */}
        <section className="bg-neutral-950 border-y border-white/10">
          <TrustBar />
        </section>

        {/* =========================================================================
            2. BOOKING SECTION
           ========================================================================= */}
        <section
          id="booking"
          aria-label="Book a Taxi"
          className="px-4 py-24 sm:py-32 bg-gradient-to-b from-black via-neutral-950 to-black relative"
        >
          <div className="max-w-5xl p-6 sm:p-12 mx-auto border border-white/10 shadow-2xl bg-black/90 backdrop-blur-2xl rounded-3xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-taxi-yellow/10 rounded-full blur-3xl pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-block px-3.5 py-1 mb-3 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
                Instant Fare Estimation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Calculate Fare & <span className="text-taxi-yellow">Book Ride</span>
              </h2>
            </motion.div>
            <BookingForm />
          </div>
        </section>

        {/* =========================================================================
            4. WHY CHOOSE US SECTION
           ========================================================================= */}
        <WhyChooseUs />

        {/* =========================================================================
            POPULAR ROUTES SECTION
           ========================================================================= */}
        <section className="px-4 py-24 sm:py-32 bg-black border-t border-white/5">
          <PopularRoutes />
        </section>

        {/* =========================================================================
            VEHICLE COMPARISON MATRIX
           ========================================================================= */}
        <section className="px-4 py-24 sm:py-32 bg-neutral-950 border-t border-white/10">
          <VehicleComparisonTable />
        </section>

        {/* =========================================================================
            SERVICE COVERAGE MAP
           ========================================================================= */}
        <section className="px-4 py-24 sm:py-32 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 border-t border-white/5">
          <ServiceCoverageMap />
        </section>


        {/* =========================================================================
            BLOG HIGHLIGHTS SECTION
           ========================================================================= */}
        <section className="px-4 py-24 sm:py-32 bg-neutral-950 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
                  <BookOpen className="w-3 h-3" /> Latest Articles
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  Outstation <span className="text-taxi-yellow">Travel Guides</span>
                </h2>
              </div>
              <Link
                to="/blog"
                className="mt-4 md:mt-0 text-xs font-black text-taxi-yellow uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
              >
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {blogPostsData.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="p-6 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-md hover:border-taxi-yellow/40 hover:bg-white/10 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="px-2.5 py-0.5 text-[8px] font-black text-black bg-taxi-yellow rounded uppercase">
                      {post.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mt-3 mb-2 group-hover:text-taxi-yellow transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="mt-4 text-[10px] font-bold text-taxi-yellow flex items-center gap-1 uppercase">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DYNAMIC TARIFF & FLEET COMPONENTS */}
        <section id="tariff" className="py-24 sm:py-32 border-t border-white/5 bg-black">
          <OurTariff />
        </section>
        <section id="fleet" className="py-24 sm:py-32 border-t border-white/5 bg-neutral-950">
          <OurFleet />
        </section>

        {/* =========================================================================
            3. CUSTOMER REVIEWS (PRESERVED UNCHANGED)
           ========================================================================= */}
        <section
          className="px-4 py-24 sm:py-32 border-t border-white/10 bg-black"
          aria-label="Customer Reviews"
        >
          <h2 className="mb-16 text-3xl sm:text-5xl font-black text-center text-white uppercase tracking-tight">
            What Our Customers Say
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="w-10 h-10 border-2 rounded-full border-taxi-yellow border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center max-w-6xl mx-auto">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous review"
                className="absolute left-0 z-10 hidden p-3.5 text-black transition-all rounded-full bg-taxi-yellow sm:block disabled:opacity-10 hover:bg-white active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: direction * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -50 }}
                    className="flex flex-col items-stretch justify-center gap-8 px-4 sm:flex-row"
                  >
                    {reviews
                      .slice(currentIndex, currentIndex + (isMobile ? 1 : 2))
                      .map((review, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col w-full max-w-md p-8 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-md relative"
                        >
                          <Quote className="w-8 h-8 mb-6 text-taxi-yellow/20" />

                          <div className="flex items-center gap-1 mb-4 text-taxi-yellow">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current animate-pulse-glow" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                          </div>

                          <p className="flex-1 mb-6 text-sm italic text-gray-300 leading-relaxed">
                            "{review.review}"
                          </p>
                          <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                            <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-black rounded-xl bg-taxi-yellow">
                              {review.name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white uppercase tracking-wider">
                                {review.name || "Happy Customer"}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                                <CheckCircle className="w-3 h-3" /> Verified Customer
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex >= reviews.length - (isMobile ? 1 : 2)}
                aria-label="Next review"
                className="absolute right-0 z-10 hidden p-3.5 text-black transition-all rounded-full bg-taxi-yellow sm:block disabled:opacity-10 hover:bg-white active:scale-95"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </section>

        {/* =========================================================================
            FAQ SECTION (PLACED AT THE LAST POSITION)
           ========================================================================= */}
        <section className="px-4 py-24 sm:py-32 border-t border-white/10 bg-neutral-950">
          <FAQSection />
        </section>
      </main>

      {/* FLOATING ACTION BUTTONS & WIDGETS (PRESERVED UNCHANGED) */}
      <LiveChat />
      <FloatingBottomBar />
    </div>
  );
}
