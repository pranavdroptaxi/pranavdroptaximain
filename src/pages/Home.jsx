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
  ShieldCheck
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
    window.addEventListener("scroll", handleScroll);
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
    <div className="relative min-h-screen text-gray-200 bg-black selection:bg-taxi-yellow selection:text-black">
      <Helmet defer={false}>
        {/* PRIMARY LOCKED TITLE */}
        <title key="main-title">Pranav Drop Taxi | Outstation Taxi Service</title>
        
        <meta name="title" content="Pranav Drop Taxi | Outstation Taxi Service" />
        <meta
          name="description"
          content="Book the cheapest one-way drop taxi in Chennai. Pranav Drop Taxi offers premium outstation cabs, 24/7 airport transfers, and intercity travel across Tamil Nadu & Pondicherry."
        />
        <meta
          name="keywords"
          content="drop taxi chennai, one way taxi chennai, outstation taxi chennai, airport taxi chennai, chennai to bangalore drop taxi, cheapest drop taxi tamil nadu, pranav drop taxi booking"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="canonical" href="https://pranavdroptaxi.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pranavdroptaxi.com/" />
        <meta property="og:title" content="Pranav Drop Taxi | Outstation Taxi Service" />
        <meta property="og:description" content="Safe, professional, and affordable one-way drop taxi services from Chennai." />
        <meta property="og:image" content="https://pranavdroptaxi.com/taxi.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "TaxiService",
            "name": "Pranav Drop Taxi",
            "url": "https://pranavdroptaxi.com/",
            "telephone": "+918778143908",
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chennai",
              "addressRegion": "TN",
              "addressCountry": "IN"
            },
            "areaServed": ["Chennai", "Tamil Nadu", "Pondicherry", "Bangalore"]
          }
          `}
        </script>
      </Helmet>

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
          <div 
              className="absolute inset-0 scale-105 bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: "url('/taxi.jpg')" }}
              role="img"
              aria-label="Pranav Drop Taxi background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </div>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <header className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl p-8 border shadow-2xl bg-black/40 backdrop-blur-xl rounded-3xl border-white/20 sm:p-12"
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
              Pranav Drop Taxi
            </span>
            <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-7xl drop-shadow-2xl">
              Reliable <span className="text-taxi-yellow">One Way</span> Drop Taxi
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg font-medium leading-relaxed text-gray-100 sm:text-xl">
              Safe, affordable, and professional outstation travel. We specialize in intercity drops across Tamil Nadu with transparent pricing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918778143908"
                aria-label="Call Pranav Drop Taxi"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black transition-all bg-white rounded-full hover:bg-taxi-yellow hover:scale-105"
              >
                <PhoneCall className="w-5 h-5" /> Call Now
              </a>

              <a
                href="#booking"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black transition-all rounded-full shadow-lg bg-taxi-yellow hover:bg-white hover:scale-105 shadow-taxi-yellow/20"
              >
                Book Your Ride
              </a>

              <a
                href="https://wa.me/918778143908"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white transition-all bg-green-600 rounded-full hover:bg-green-500 hover:scale-105"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </header>

        {/* BOOKING SECTION */}
        <section id="booking" aria-label="Book a Taxi" className="px-4 py-12 -mt-20 sm:py-20">
          <div className="max-w-5xl p-6 mx-auto border shadow-2xl bg-black/80 backdrop-blur-lg rounded-3xl border-white/10 sm:p-10">
            <h2 className="mb-8 text-3xl font-bold text-center text-white sm:text-4xl">
              Instant <span className="text-taxi-yellow">Online Booking</span>
            </h2>
            <BookingForm />
          </div>
        </section>

        {/* SERVICES / HOW IT WORKS */}
        <section className="px-4 py-20 bg-transparent" id="how-it-works">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-5xl">How to Book Your Taxi</h2>
              <p className="mb-16 text-gray-400">Simple three-step process for a stress-free journey.</p>
              <div className="grid gap-8 sm:grid-cols-3">
                  {[
                    { Icon: MapPin, title: "Set Route", desc: "Select pickup and drop location within Tamil Nadu or Pondicherry." },
                    { Icon: Car, title: "Choose Vehicle", desc: "Choose from Hatchback, Sedan, or SUV based on your comfort." },
                    { Icon: CheckCircle, title: "Enjoy Trip", desc: "Our professional driver arrives on time for a safe journey." }
                  ].map(({ Icon, title, desc }, idx) => (
                  <div key={idx} className="p-8 transition-all border shadow-xl border-white/10 bg-black/50 backdrop-blur-md rounded-3xl hover:-translate-y-2">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-black rounded-full bg-taxi-yellow">
                          <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
                      <p className="text-gray-400">{desc}</p>
                  </div>
                  ))}
              </div>
          </div>
        </section>

        {/* DYNAMIC COMPONENTS */}
        <section id="tariff" className="py-16"><OurTariff /></section>
        <section id="fleet" className="py-16"><OurFleet /></section>

        {/* WHY CHOOSE US */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="mb-16 text-3xl font-bold text-white sm:text-5xl">Why Choose <span className="text-taxi-yellow">Pranav?</span></h2>
              <div className="grid gap-8 sm:grid-cols-3">
                  {[
                    { Icon: ShieldCheck, title: "Verified Drivers", desc: "Safe and background-checked professional drivers." },
                    { Icon: Clock, title: "24/7 Availability", desc: "Mid-night airport drops or early morning intercity travel." },
                    { Icon: ClipboardList, title: "Transparent Bill", desc: "No hidden charges. Toll and parking are as per actuals." }
                  ].map(({ Icon, title, desc }, idx) => (
                  <div key={idx} className="p-8 transition-colors border bg-black/40 border-white/5 rounded-3xl hover:border-taxi-yellow/50">
                      <Icon className="w-12 h-12 mx-auto mb-6 text-taxi-yellow" />
                      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                      <p className="text-gray-400">{desc}</p>
                  </div>
                  ))}
              </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="px-4 py-24 bg-transparent" aria-label="Customer Reviews">
          <h2 className="mb-16 text-3xl font-bold text-center text-white sm:text-5xl">What Our Customers Say</h2>

          {loading ? (
            <div className="flex justify-center"><div className="w-10 h-10 border-4 rounded-full border-taxi-yellow border-t-transparent animate-spin"></div></div>
          ) : (
            <div className="relative flex flex-col items-center max-w-6xl mx-auto">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous review"
                className="absolute left-0 z-10 hidden p-4 text-black transition-all rounded-full bg-taxi-yellow sm:block disabled:opacity-20"
              >
                <ArrowLeft className="w-6 h-6" />
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
                    {reviews.slice(currentIndex, currentIndex + (isMobile ? 1 : 2)).map((review, idx) => (
                        <div key={idx} className="flex flex-col w-full max-w-md p-8 border bg-black/60 rounded-3xl border-white/10 backdrop-blur-md">
                          <Quote className="w-10 h-10 mb-6 text-taxi-yellow/30" />
                          <p className="flex-1 mb-6 text-lg italic text-gray-300">"{review.review}"</p>
                          <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/10">
                              <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-black rounded-full bg-taxi-yellow">
                                  {review.name?.charAt(0) || 'U'}
                              </div>
                              <div>
                                  <p className="font-bold text-white">{review.name || "Happy Customer"}</p>
                                  <div className="flex items-center gap-1 text-xs text-green-400">
                                      <CheckCircle className="w-3 h-3" /> Verified User
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
                className="absolute right-0 z-10 hidden p-4 text-black transition-all rounded-full bg-taxi-yellow sm:block disabled:opacity-20"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed z-[999] bottom-6 right-6 flex flex-col items-end gap-4">
        <motion.a
          href="https://wa.me/918778143908"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center text-white bg-green-500 rounded-full shadow-2xl w-14 h-14 hover:bg-green-600 shadow-green-500/20"
        >
          <FaWhatsapp className="w-8 h-8" />
        </motion.a>

        <AnimatePresence>
          {showTopButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center text-black rounded-full shadow-2xl bg-taxi-yellow w-14 h-14 hover:bg-white"
            >
              <ChevronUp className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;