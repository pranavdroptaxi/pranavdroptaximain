// Home.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "../components/BookingForm";
import OurFleet from "../components/OurFleet";
import OurTariff from "../components/OurTariff";
import { Helmet } from "react-helmet";  

import {
  Car,
  ClipboardList,
  PhoneCall,
  CheckCircle,
  Quote,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Phone, MessageCircle } from "lucide-react";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  // Scroll to top button state
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

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
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
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('taxi.jpg')" }}
    >
      <div className="min-h-screen bg-black/70">
        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl p-6 mx-auto bg-black/80 rounded-xl sm:p-10"
          >
            <h1 className="mb-6 text-3xl font-extrabold text-yellow-300 sm:text-5xl drop-shadow-lg">
              Welcome to Pranav Drop Taxi
            </h1>
            <p className="mb-6 text-base text-gray-100 sm:text-xl">
              Wherever the road takes you, we bring comfort, convenience, and confidence to your outstation travel needs!
            </p>
            <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto sm:gap-4 no-scrollbar">
              {/* Call Enquiry Button */}
              <a
                href="tel:9884609789"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-black transition bg-yellow-400 rounded-full shadow hover:bg-yellow-300 whitespace-nowrap sm:text-sm md:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call
              </a>

              {/* Book Now */}
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-black transition bg-yellow-400 rounded-full shadow hover:bg-yellow-300 whitespace-nowrap sm:text-sm md:text-base"
              >
                Book Now
              </a>

              {/* WhatsApp Enquiry */}
              <a
                href="https://wa.me/9884609789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-black transition bg-yellow-400 rounded-full shadow hover:bg-yellow-300 whitespace-nowrap sm:text-sm md:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Booking Section */}
        <section id="booking" className="px-4 py-16 sm:py-20">
          <div className="max-w-4xl p-6 mx-auto shadow-lg bg-black/80 rounded-xl sm:p-10">
            <h2 className="mb-6 text-3xl font-bold text-center text-yellow-300 sm:text-4xl">
              Book Your Ride
            </h2>
            <BookingForm />
          </div>
        </section>

        {/* Our Tariff Section */}
        <section id="tariff"></section>
        <OurTariff />

        {/* Our Fleet Section */}
        <section id="fleet"></section>
        <OurFleet />

        {/* How It Works */}
        <section className="px-4 py-16 text-white sm:py-20">
          <h2 className="mb-10 text-3xl font-bold text-center sm:text-4xl">
            How It Works
          </h2>
          <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-3">
            {[
              {
                Icon: Car,
                title: "Choose Your Ride",
                description:
                  "Select from a range of clean and comfortable vehicles.",
              },
              {
                Icon: ClipboardList,
                title: "Enter Trip Details",
                description:
                  "Fill in pickup and drop locations, trip type, and schedule.",
              },
              {
                Icon: CheckCircle,
                title: "Confirm & Go",
                description: "Get instant confirmation and ride stress-free.",
              },
            ].map(({ Icon, title, description }, idx) => (
              <div
                key={idx}
                className="text-center transition hover:text-yellow-300"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-sm sm:text-base">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-4 py-16 text-white sm:py-20">
          <h2 className="mb-10 text-3xl font-bold text-center sm:text-4xl">
            Why Choose Pranav Drop Taxi?
          </h2>
          <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-3">
            {[
              {
                Icon: Car,
                title: "Reliable Rides",
                description:
                  "On-time pickups and clean vehicles ensure smooth travel.",
              },
              {
                Icon: ClipboardList,
                title: "Transparent Pricing",
                description: "No hidden fees. Know your fare upfront.",
              },
              {
                Icon: PhoneCall,
                title: "24/7 Support",
                description:
                  "Always here to help before, during, and after your trip.",
              },
            ].map(({ Icon, title, description }, idx) => (
              <div
                key={idx}
                className="text-center transition hover:text-yellow-300"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-sm sm:text-base">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="px-4 py-16 text-white sm:py-20">
          <h2 className="mb-10 text-3xl font-bold text-center text-yellow-300 sm:text-4xl">
            What Our Customers Say
          </h2>

          {loading ? (
            <p className="text-center text-gray-300">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-300">No reviews yet.</p>
          ) : (
            <div className="relative flex flex-col items-center max-w-6xl mx-auto">
              {/* Mobile Arrows */}
              <div className="flex items-center justify-between w-full mb-4 sm:hidden">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 text-yellow-300 rounded-full hover:bg-yellow-300/20 disabled:opacity-30"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= reviews.length - 1}
                  className="p-2 text-yellow-300 rounded-full hover:bg-yellow-300/20 disabled:opacity-30"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Review Slider */}
              <div className="relative flex items-center justify-center w-full">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 z-10 hidden p-3 text-yellow-300 rounded-full sm:block hover:bg-yellow-300/20 disabled:opacity-30"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ x: direction > 0 ? 150 : -150, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -150 : 150, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
                    >
                      {reviews
                        .slice(currentIndex, currentIndex + (isMobile ? 1 : 2))
                        .map((review, idx) => (
                          <blockquote
                            key={idx}
                            className="w-full max-w-sm p-6 mx-4 border border-yellow-400 rounded-lg bg-black/20"
                          >
                            <Quote className="w-5 h-5 mb-2 text-yellow-400" />
                            <p className="text-base italic text-gray-100">
                              "{review.review || "No review text"}"
                            </p>
                            <footer className="mt-4 text-sm font-semibold text-yellow-300">
                              – {review.name || "Anonymous"}
                            </footer>
                          </blockquote>
                        ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIndex >= reviews.length - (isMobile ? 1 : 2)}
                  className="absolute right-0 z-10 hidden p-3 text-yellow-300 rounded-full sm:block hover:bg-yellow-300/20 disabled:opacity-30"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Floating WhatsApp + Scroll To Top Buttons */}
      <div className="fixed z-[999] bottom-6 right-6 flex flex-col items-end gap-4">
        {/* WhatsApp Floating Button */}
        <motion.a
          href="https://wa.me/919884609789?text=Hi%20Pranav%20DropTaxi%20Team%2C%0A%0AI%20would%20like%20to%20enquire%20about%20my%20booking.%0AName%3A%0ABooking%20ID%3A%0A%0AKindly%20check%20and%20update%20me%20on%20the%20status.%0AThank%20you!"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.15, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center text-white transition-all duration-300 bg-green-500 rounded-full shadow-xl w-14 h-14 sm:w-16 sm:h-16 hover:bg-green-600"
          style={{ boxShadow: "0 6px 14px rgba(0,0,0,0.45)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-7 h-7 sm:w-9 sm:h-9"
          >
            <path d="M16.001 3.2c-7.062 0-12.8 5.738-12.8 12.8 0 2.259.589 4.462 1.708 6.41L3.2 28.8l6.55-1.683c1.883.994 3.991 1.517 6.251 1.517 7.062 0 12.8-5.738 12.8-12.8s-5.738-12.8-12.8-12.8zm0 23.467c-2.02 0-3.984-.54-5.703-1.563l-.409-.241-3.887.999 1.034-3.787-.266-.389a10.96 10.96 0 0 1-1.721-5.895c0-6.06 4.94-11 11-11s11 4.94 11 11-4.94 11-11 11zm6.138-8.262c-.337-.169-1.985-.981-2.292-1.091-.307-.113-.531-.169-.754.169-.224.337-.865 1.091-1.06 1.315-.194.224-.389.252-.726.084-.337-.169-1.424-.525-2.71-1.676-1.002-.893-1.677-1.994-1.871-2.331-.194-.337-.021-.518.148-.686.153-.152.337-.389.506-.584.169-.194.224-.337.337-.56.113-.224.056-.419-.028-.587-.084-.169-.754-1.82-1.034-2.49-.271-.65-.547-.562-.754-.573l-.643-.011c-.224 0-.587.084-.895.419-.307.337-1.184 1.157-1.184 2.824s1.212 3.276 1.381 3.501c.169.224 2.381 3.63 5.77 5.08.806.348 1.435.557 1.926.714.81.258 1.548.222 2.133.135.651-.097 1.985-.812 2.267-1.596.28-.784.28-1.459.196-1.596-.084-.135-.306-.224-.643-.392z" />
          </svg>
        </motion.a>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showTopButton && (
            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center w-12 h-12 text-black transition-all duration-300 bg-yellow-400 rounded-full shadow-xl sm:w-14 sm:h-14 hover:bg-yellow-300"
              style={{ boxShadow: "0 6px 14px rgba(0,0,0,0.45)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;
