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
import { Helmet } from "react-helmet";
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
} from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import { blogPostsData } from "./blog/BlogList";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black pb-16 md:pb-0">
      <Helmet defer={false}>
        <title>
          Pranav Drop Taxi – South India's Trusted One-Way Taxi Service
        </title>
        <meta
          name="description"
          content="South India's trusted one-way taxi service. Pay only for the distance you travel across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh. 24/7 doorstep pickup."
        />
        <meta
          name="keywords"
          content="drop taxi chennai, one way taxi chennai, outstation taxi chennai, airport taxi chennai, chennai to bangalore drop taxi, chennai to pondicherry taxi, cheapest drop taxi tamil nadu, one way cab chennai, intercity taxi chennai, outstation cabs tamil nadu, pranav drop taxi, chennai airport taxi service"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pranav Drop Taxi" />
        <link rel="canonical" href="https://pranavdroptaxi.com/" />
      </Helmet>

      <PWAInstallPrompt />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-center bg-no-repeat bg-cover opacity-40 blur-[1px]"
          style={{ backgroundImage: "url('/taxi.webp')" }}
          role="img"
          aria-label="Pranav Drop Taxi background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40 pointer-events-none" />
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <header className="flex flex-col items-center justify-center min-h-[92vh] px-4 text-center pt-24 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl p-4 sm:p-6"
          >
            <span className="inline-block px-3.5 py-1 mb-5 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.3)]">
              Pranav Drop Taxi
            </span>
            <h1 className="mb-4 text-3xl font-black text-white sm:text-6xl tracking-tight leading-tight uppercase">
              South India's <span className="gradient-text-yellow">Trusted</span> One-Way Taxi Service
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-base font-extrabold leading-relaxed text-taxi-yellow sm:text-xl uppercase tracking-wider">
              Pay Only for the Distance You Travel
            </p>
            <p className="max-w-2xl mx-auto mb-10 text-xs font-medium text-gray-400 sm:text-sm">
              No return charges. Transparent per kilometer billing. 24/7 doorstep pickup across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#booking"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black transition-all rounded-full bg-taxi-yellow hover:bg-white hover:scale-105 shadow-[0_0_25px_rgba(255,193,7,0.3)]"
              >
                <Car className="w-4 h-4" /> Book Ride Now
              </a>

              <a
                href="tel:+919884949171"
                aria-label="Call Pranav Drop Taxi"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black hover:scale-102"
              >
                <PhoneCall className="w-4 h-4 text-taxi-yellow" /> Call +91 98849 49171
              </a>

              <a
                href="https://wa.me/919884949171"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all border border-green-500/20 bg-green-600/10 rounded-full hover:bg-green-600 hover:scale-102"
              >
                <FaWhatsapp className="w-4 h-4 text-green-500" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </header>

        {/* TRUST BAR */}
        <TrustBar />

        {/* BOOKING SECTION */}
        <section
          id="booking"
          aria-label="Book a Taxi"
          className="px-4 py-12 sm:py-20"
        >
          <div className="max-w-5xl p-6 mx-auto border border-white/10 shadow-2xl bg-black/90 backdrop-blur-2xl rounded-3xl sm:p-10">
            <h2 className="mb-8 text-2xl font-black text-center text-white sm:text-3xl uppercase tracking-wider">
              Instant <span className="text-taxi-yellow">Fare Calculator & Booking</span>
            </h2>
            <BookingForm />
          </div>
        </section>

        {/* POPULAR ROUTES SECTION */}
        <PopularRoutes />

        {/* VEHICLE COMPARISON MATRIX */}
        <VehicleComparisonTable />

        {/* SERVICE COVERAGE MAP */}
        <ServiceCoverageMap />

        {/* FAQ SECTION */}
        <FAQSection />

        {/* BLOG HIGHLIGHTS SECTION */}
        <section className="px-4 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
                  <BookOpen className="w-3 h-3" /> Latest Articles
                </span>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
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
                  className="p-6 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md hover:border-taxi-yellow/40 hover:bg-white/10 transition-all flex flex-col justify-between group"
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

        {/* DYNAMIC COMPONENTS */}
        <section id="tariff" className="py-12 border-t border-white/5 bg-transparent">
          <OurTariff />
        </section>
        <section id="fleet" className="py-12 border-t border-white/5 bg-transparent">
          <OurFleet />
        </section>

        {/* REVIEWS */}
        <section
          className="px-4 py-24 border-t border-white/5 bg-transparent"
          aria-label="Customer Reviews"
        >
          <h2 className="mb-16 text-3xl font-extrabold text-center text-white sm:text-4xl uppercase tracking-wider">
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
                          className="flex flex-col w-full max-w-md p-8 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md relative"
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
      </main>

      {/* FLOATING ACTION BUTTONS & WIDGETS */}
      <LiveChat />
      <FloatingBottomBar />
    </div>
  );
}

export default Home;

