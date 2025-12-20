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
  ChevronUp
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
    <div className="relative min-h-screen text-gray-200 bg-black">
      <Helmet>
        
        <title>Pranav Drop Taxi | Airport & Outstation Taxi Service in Chennai</title>
        <meta
          name="description"
          content="Book safe and affordable airport, local and outstation drop taxi service in Chennai. 24/7 availability, professional drivers, clean cabs, and transparent pricing. Call or WhatsApp to book your ride instantly."
        />
        <meta
          name="keywords"
          content="drop taxi chennai, pranav drop taxi, one way cab chennai, airport taxi chennai, outstation taxi service, chennai drop taxi, taxi booking chennai, cab service tamil nadu"
        />

        
        <link rel="canonical" href="https://pranavdroptaxi.com/" />

        
        <meta property="og:title" content="Pranav Drop Taxi | Chennai Outstation & Airport Taxi" />
        <meta
          property="og:description"
          content="Affordable one-way drop taxi & airport taxi service in Chennai. 24/7 support, clean vehicles, professional drivers. Book instantly!"
        />
        <meta property="og:url" content="https://pranavdroptaxi.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pranavdroptaxi.com/taxi.jpg" />

      
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pranav Drop Taxi | Chennai Airport & Outstation Taxi" />
        <meta
          name="twitter:description"
          content="Book safe and affordable outstation/airport taxi service in Chennai. 24/7 availability."
        />
        <meta name="twitter:image" content="https://pranavdroptaxi.com/taxi.jpg" />

        
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "TaxiService",
            "name": "Pranav Drop Taxi",
            "url": "https://pranavdroptaxi.com/",
            "description": "Airport taxi and outstation drop taxi service in Chennai. 24/7 professional cab service across Tamil Nadu.",
            "telephone": "+919884609789",
            "areaServed": "Chennai, Tamil Nadu, India",
            "image": "https://pranavdroptaxi.com/taxi.jpg",
            "priceRange": "₹₹",
            "sameAs": [
              "https://wa.me/919884609789"
            ]
          }
          `}
        </script>
      </Helmet>

      {/* --- GLOBAL FIXED BACKGROUND (Full Page) --- */}
      <div className="fixed inset-0 z-0">
          {/* Image Layer: Full Opacity for Brightness */}
          <div 
              className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-100"
              style={{ backgroundImage: "url('/taxi.jpg')" }}
          />
          {/* Overlay Layer: Very light gradient to keep image bright but readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      {/* --- CONTENT SCROLLABLE AREA --- */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl p-8 border shadow-2xl bg-black/40 backdrop-blur-md rounded-3xl border-white/20 sm:p-12"
          >
            <h1 className="mb-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-taxi-yellow to-white sm:text-6xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Welcome to Pranav Drop Taxi
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg font-medium leading-relaxed text-white drop-shadow-md sm:text-xl">
              Wherever the road takes you, we bring comfort, convenience, and confidence to your outstation travel needs!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:9884609789"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black transition-all duration-300 transform bg-white rounded-full shadow-lg hover:bg-taxi-yellow hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>

              <a
                href="#booking"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-black transition-all duration-300 transform rounded-full bg-taxi-yellow hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,193,7,0.6)]"
              >
                Book Your Ride
              </a>

              <a
                href="https://wa.me/919884609789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white transition-all duration-300 transform bg-green-600 rounded-full shadow-lg hover:bg-green-500 hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Booking Section */}
        <section id="booking" className="px-4 py-12 -mt-20 sm:py-16">
          {/* Transparent container, only inner form has glass effect */}
          <div className="max-w-5xl p-6 mx-auto border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10 sm:p-10">
            <h2 className="mb-8 text-3xl font-bold text-center text-white sm:text-4xl">
              Book Your Ride <span className="text-taxi-yellow">Instantly</span>
            </h2>
            <BookingForm />
          </div>
        </section>

        {/* Tariff & Fleet Components 
            Removed solid backgrounds, now purely transparent
        */}
        <section id="tariff" className="py-16 bg-transparent">
           <OurTariff />
        </section>
        
        <section id="fleet" className="py-16 bg-transparent">
           <OurFleet />
        </section>

        {/* How It Works */}
        <section className="px-4 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="mb-16 text-3xl font-bold text-white sm:text-5xl drop-shadow-md">
                  How It Works
              </h2>
              <div className="grid gap-8 sm:grid-cols-3">
                  {[
                  {
                      Icon: Car,
                      title: "Choose Your Ride",
                      desc: "Select from a range of clean and comfortable vehicles.",
                  },
                  {
                      Icon: ClipboardList,
                      title: "Enter Trip Details",
                      desc: "Fill in pickup and drop locations, trip type, and schedule.",
                  },
                  {
                      Icon: CheckCircle,
                      title: "Confirm & Go",
                      desc: "Get instant confirmation and ride stress-free.",
                  },
                  ].map(({ Icon, title, desc }, idx) => (
                  <div key={idx} className="relative p-8 transition-all duration-300 border shadow-xl border-white/10 group bg-black/50 backdrop-blur-md rounded-3xl hover:bg-black/70 hover:border-taxi-yellow/30 hover:-translate-y-2">
                      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform rounded-full bg-taxi-yellow/10 text-taxi-yellow group-hover:scale-110 group-hover:bg-taxi-yellow group-hover:text-black">
                          <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
                      <p className="leading-relaxed text-gray-300">{desc}</p>
                  </div>
                  ))}
              </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-4 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto text-center">
              <h2 className="mb-16 text-3xl font-bold text-white sm:text-5xl drop-shadow-md">
                  Why Choose <span className="text-taxi-yellow">Pranav Drop Taxi?</span>
              </h2>
              <div className="grid gap-8 sm:grid-cols-3">
                  {[
                  {
                      Icon: Car,
                      title: "Reliable Rides",
                      desc: "On-time pickups and clean vehicles ensure smooth travel.",
                  },
                  {
                      Icon: ClipboardList,
                      title: "Transparent Pricing",
                      desc: "No hidden fees. Know your fare upfront.",
                  },
                  {
                      Icon: PhoneCall,
                      title: "24/7 Support",
                      desc: "Always here to help before, during, and after your trip.",
                  },
                  ].map(({ Icon, title, desc }, idx) => (
                  <div key={idx} className="p-8 transition-all duration-300 border shadow-lg group bg-black/50 backdrop-blur-md border-white/10 rounded-3xl hover:border-taxi-yellow hover:shadow-[0_0_25px_rgba(255,193,7,0.1)]">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-black transition-transform duration-500 rounded-full bg-taxi-yellow group-hover:rotate-12">
                          <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                      <p className="text-gray-400">{desc}</p>
                  </div>
                  ))}
              </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="px-4 py-24 bg-transparent">
          <h2 className="mb-16 text-3xl font-bold text-center text-white sm:text-5xl drop-shadow-md">
            What Our Customers Say
          </h2>

          {loading ? (
            <p className="text-center text-gray-400 animate-pulse">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-400">No reviews yet.</p>
          ) : (
            <div className="relative flex flex-col items-center max-w-6xl mx-auto">
              {/* Desktop Navigation Arrows */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-0 z-10 hidden p-4 text-black transition-all transform rounded-full bg-taxi-yellow sm:block hover:bg-white disabled:opacity-30 hover:scale-110 hover:shadow-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <div className="w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col items-stretch justify-center gap-8 px-4 sm:flex-row"
                  >
                    {reviews
                      .slice(currentIndex, currentIndex + (isMobile ? 1 : 2))
                      .map((review, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col w-full max-w-md p-8 border shadow-2xl bg-black/60 rounded-3xl border-white/10 backdrop-blur-md"
                        >
                          <Quote className="w-10 h-10 mb-6 text-taxi-yellow opacity-40" />
                          <p className="flex-1 mb-6 text-lg italic leading-relaxed text-gray-300">
                            "{review.review || "No review text"}"
                          </p>
                          <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/10">
                              <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-black rounded-full bg-taxi-yellow">
                                  {review.name ? review.name.charAt(0).toUpperCase() : 'A'}
                              </div>
                              <div>
                                  <p className="font-bold text-white text-md">{review.name || "Anonymous"}</p>
                                  <div className="flex items-center gap-1 text-xs text-green-400">
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
                className="absolute right-0 z-10 hidden p-4 text-black transition-all transform rounded-full bg-taxi-yellow sm:block hover:bg-white disabled:opacity-30 hover:scale-110 hover:shadow-lg"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
              
              {/* Mobile Nav */}
              <div className="flex gap-6 mt-10 sm:hidden">
                  <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 text-black rounded-full bg-taxi-yellow disabled:opacity-50"><ArrowLeft/></button>
                  <button onClick={handleNext} disabled={currentIndex >= reviews.length - 1} className="p-4 text-black rounded-full bg-taxi-yellow disabled:opacity-50"><ArrowRight/></button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Floating Buttons */}
      <div className="fixed z-[999] bottom-6 right-6 flex flex-col items-end gap-4">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/919884609789"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center text-white transition-all duration-300 bg-green-500 rounded-full shadow-lg w-14 h-14 hover:bg-green-600 hover:shadow-green-500/40"
        >
          <FaWhatsapp className="w-8 h-8" />
        </motion.a>

        {/* Scroll To Top */}
        <AnimatePresence>
          {showTopButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center text-black transition-all duration-300 rounded-full shadow-lg w-14 h-14 bg-taxi-yellow hover:bg-white hover:scale-110"
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