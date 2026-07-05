import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "../components/BookingForm";
import OurFleet from "../components/OurFleet";
import OurTariff from "../components/OurTariff";
import { Helmet } from "react-helmet";
import { FaWhatsapp } from "react-icons/fa";

import {
  Car,
  ClipboardList,
  PhoneCall,
  CheckCircle,
  Quote,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black">
      <Helmet defer={false}>
        <title>
          Pranav Drop Taxi – Cheapest One Way & Outstation Taxi in Chennai
        </title>
        <meta
          name="description"
          content="Pranav Drop Taxi offers the cheapest one-way and outstation taxi services in Chennai with 24/7 airport pickups, safe professional drivers, clean cabs, transparent pricing, and reliable Chennai to Bangalore, Coimbatore, Trichy & Pondicherry drop taxi services."
        />
        <meta
          name="keywords"
          content="drop taxi chennai, one way taxi chennai, outstation taxi chennai, airport taxi chennai, chennai to bangalore drop taxi, chennai to pondicherry taxi, cheapest drop taxi tamil nadu, one way cab chennai, intercity taxi chennai, outstation cabs tamil nadu, pranav drop taxi, chennai airport taxi service"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pranav Drop Taxi" />
        <link rel="canonical" href="https://pranavdroptaxi.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pranav Drop Taxi" />
        <meta property="og:url" content="https://pranavdroptaxi.com/" />
        <meta
          property="og:title"
          content="Pranav Drop Taxi – Cheapest One Way & Outstation Taxi in Chennai"
        />
        <meta
          property="og:description"
          content="Book affordable one-way drop taxi and outstation cabs from Chennai. Safe drivers, transparent pricing, 24/7 availability."
        />
        <meta
          property="og:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pranav Drop Taxi – Cheapest One Way & Outstation Taxi in Chennai"
        />
        <meta
          name="twitter:description"
          content="Affordable outstation and one-way drop taxi services from Chennai with professional drivers."
        />
        <meta
          name="twitter:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />
      </Helmet>

      {/* --- BACKGROUND LAYER (Optimized to WebP for fast load) --- */}
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
        <header className="flex flex-col items-center justify-center min-h-[92vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl p-8 border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl rounded-3xl sm:p-12"
          >
            <span className="inline-block px-3.5 py-1 mb-5 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.25)]">
              Pranav Drop Taxi
            </span>
            <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-7xl tracking-tight leading-tight">
              Reliable <span className="gradient-text-yellow">One Way</span> Drop
              Taxi
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-base font-medium leading-relaxed text-gray-400 sm:text-lg">
              Safe, affordable, and professional outstation travel. We
              specialize in intercity drops across Tamil Nadu with transparent
              pricing.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919884949171"
                aria-label="Call Pranav Drop Taxi"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black hover:scale-102"
              >
                <PhoneCall className="w-4 h-4 text-taxi-yellow" /> Call Now
              </a>

              <a
                href="#booking"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all rounded-full bg-taxi-yellow hover:bg-white hover:scale-102 shadow-[0_0_20px_rgba(255,193,7,0.25)]"
              >
                Book Your Ride
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

            {/* Trust Bar Strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="text-taxi-yellow">5000+</span> Trips Completed
              </div>
              <span className="hidden sm:block opacity-20">|</span>
              <div className="flex items-center gap-2">
                <span className="text-taxi-yellow">4.8★</span> Rating
              </div>
              <span className="hidden sm:block opacity-20">|</span>
              <div className="flex items-center gap-2">
                <span className="text-taxi-yellow">24/7</span> Dispatch Available
              </div>
            </div>
          </motion.div>
        </header>

        {/* BOOKING SECTION */}
        <section
          id="booking"
          aria-label="Book a Taxi"
          className="px-4 py-12 -mt-20 sm:py-20"
        >
          <div className="max-w-5xl p-6 mx-auto border border-white/5 shadow-2xl bg-black/85 backdrop-blur-xl rounded-3xl sm:p-10">
            <h2 className="mb-8 text-2xl font-extrabold text-center text-white sm:text-3xl uppercase tracking-wider">
              Instant <span className="text-taxi-yellow">Online Booking</span>
            </h2>
            <BookingForm />
          </div>
        </section>

        {/* SERVICES / HOW IT WORKS */}
        <section className="px-4 py-20 bg-transparent" id="how-it-works">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
              How to Book Your Taxi
            </h2>
            <p className="mb-16 text-xs font-bold uppercase tracking-widest text-gray-500">
              Simple three-step process for a stress-free journey.
            </p>
            <div className="grid gap-8 sm:grid-cols-3 relative">
              {[
                {
                  Icon: MapPin,
                  title: "Set Route",
                  desc: "Select pickup and drop location within Tamil Nadu or Pondicherry.",
                },
                {
                  Icon: Car,
                  title: "Choose Vehicle",
                  desc: "Choose from Hatchback, Sedan, or SUV based on your comfort.",
                },
                {
                  Icon: CheckCircle,
                  title: "Enjoy Trip",
                  desc: "Our professional driver arrives on time for a safe journey.",
                },
              ].map(({ Icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl relative transition-all duration-300 hover:border-taxi-yellow/20 hover:bg-white/10 group shadow-lg"
                >
                  <span className="absolute top-4 right-6 font-mono text-5xl font-black text-white/5 group-hover:text-taxi-yellow/10 transition-colors">
                    0{idx + 1}
                  </span>
                  
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-black rounded-2xl bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.2)]">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white uppercase tracking-wider">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
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

        {/* WHY CHOOSE US */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-16 text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
              Why Choose <span className="text-taxi-yellow">Pranav?</span>
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Verified Drivers",
                  desc: "Safe and background-checked professional drivers.",
                },
                {
                  Icon: Clock,
                  title: "24/7 Availability",
                  desc: "Mid-night airport drops or early morning intercity travel.",
                },
                {
                  Icon: ClipboardList,
                  title: "Transparent Bill",
                  desc: "No hidden charges. Toll and parking are as per actuals.",
                },
              ].map(({ Icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="p-8 transition-all duration-300 border bg-white/5 border-white/5 rounded-3xl hover:border-taxi-yellow/30 hover:bg-white/10 hover:shadow-xl text-center"
                >
                  <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6 rounded-2xl bg-taxi-yellow/5 border border-taxi-yellow/15 text-taxi-yellow shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white uppercase tracking-wider">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
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
                          
                          {/* Premium Stars Display */}
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

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed z-[999] bottom-6 right-6 flex flex-col items-end gap-3.5">
        <motion.a
          href="https://wa.me/919884949171"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center text-white bg-green-500 rounded-full shadow-2xl w-13 h-13 hover:bg-green-600 shadow-green-500/20"
        >
          <FaWhatsapp className="w-7 h-7" />
        </motion.a>

        <AnimatePresence>
          {showTopButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center text-black rounded-full shadow-2xl bg-taxi-yellow w-13 h-13 hover:bg-white"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;
