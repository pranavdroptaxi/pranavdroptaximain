import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, LocateFixed, ChevronUp, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Contact() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-gray-200 bg-black">
      
      {/* --- GLOBAL FIXED BACKGROUND (Full Page & Brighter) --- */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-100"
            style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        {/* Lighter gradient to let the image shine through, darker at top/bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* 2. Navigation Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
            <img 
              src="/favicon.ico" 
              alt="Logo" 
              className="object-contain w-10 h-10"
            />
            <span className="text-xl font-bold tracking-tighter text-white">Pranav Drop Taxi</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black transition-all transform rounded-full shadow-lg bg-taxi-yellow hover:bg-white hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full mb-16 text-center"
        >
          <h1 className="mb-2 text-sm font-bold tracking-[0.2em] text-taxi-yellow uppercase">
            Get in Touch
          </h1>
          <h2 className="text-4xl font-extrabold text-white md:text-5xl drop-shadow-xl">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-taxi-yellow to-yellow-200">Pranav Drop Taxi</span>
          </h2>
          <div className="w-24 h-1 mt-6 rounded bg-taxi-yellow shadow-[0_0_10px_#FFC107]"></div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid items-start w-full gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left Column: Contact Info Box */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 transition-colors border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10 hover:border-taxi-yellow/30"
          >
            <h3 className="pl-4 mb-8 text-2xl font-bold text-white border-l-4 border-taxi-yellow">
              Contact Information
            </h3>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-5 group">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform rounded-full bg-taxi-yellow/10 text-taxi-yellow group-hover:scale-110">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-gray-400 uppercase">Our Office</p>
                  <p className="text-lg leading-relaxed text-white">
                    28A, Karmel St, opposite V Cure Hospital,
                    <br />
                    Pallikaranai, Chennai, Tamil Nadu 600100
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform rounded-full bg-taxi-yellow/10 text-taxi-yellow group-hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-gray-400 uppercase">Phone Number</p>
                  <a
                    href="tel:+919884609789"
                    className="text-lg font-medium text-white transition-colors hover:text-taxi-yellow"
                  >
                    +91 9884609789
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform rounded-full bg-taxi-yellow/10 text-taxi-yellow group-hover:scale-110">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-gray-400 uppercase">Email Address</p>
                  <a
                    href="mailto:droptaxipravan@gmail.com"
                    className="text-lg font-medium text-white transition-colors hover:text-taxi-yellow"
                  >
                    droptaxipravan@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-3 border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10"
          >
            <div className="w-full overflow-hidden shadow-inner bg-black/50 rounded-2xl">
              <iframe
                title="Pranav Drop Taxi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.3162371084387!2d80.19787147595075!3d12.929278287378076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c3add581025%3A0x5afe35915936ea80!2s28A%2C%20Karmel%20St%2C%20opposite%20V%20Cure%20Hospital%2C%20Pallikaranai%2C%20Chennai%2C%20Tamil%20Nadu%20600100!5e0!3m2!1sen!2sin!4v1721902800000!5m2!1sen!2sin"
                className="w-full transition-opacity border-0 h-96 opacity-90 hover:opacity-100"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-4 mt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=28A,+Karmel+St,+Pallikaranai,+Chennai,+Tamil+Nadu+600100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 py-4 text-base font-bold text-black transition-all transform rounded-xl bg-taxi-yellow hover:bg-white hover:shadow-lg hover:scale-[1.02]"
              >
                <LocateFixed className="w-5 h-5" />
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>

        {/* Back To Top Button */}
        {showTopBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 bottom-8 right-8"
          >
            <button
              onClick={scrollToTop}
              className="p-3 text-black transition-all shadow-lg bg-taxi-yellow rounded-xl hover:bg-white hover:scale-110 focus:outline-none"
              title="Back to Top"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}