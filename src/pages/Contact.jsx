import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  LocateFixed,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-gray-200 bg-transparent">
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          Contact Pranav Drop Taxi | One Way & Outstation Taxi Chennai – 24/7
          Support
        </title>

        <meta
          name="description"
          content="Contact Pranav Drop Taxi for affordable one-way drop taxi and outstation cab services in Chennai. Call now for 24/7 airport taxi, intercity travel across Tamil Nadu including Bangalore, Coimbatore, Trichy, Madurai, and Pondicherry with transparent pricing."
        />

        <meta
          name="keywords"
          content="pranav drop taxi contact, drop taxi chennai contact number, one way taxi chennai phone number, outstation taxi chennai contact, airport taxi chennai number, call taxi pallikaranai, chennai to bangalore drop taxi contact, cheapest drop taxi tamil nadu, intercity taxi chennai, taxi booking number chennai"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pranav Drop Taxi" />
        <link rel="canonical" href="https://pranavdroptaxi.com/contact" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pranav Drop Taxi" />
        <meta property="og:url" content="https://pranavdroptaxi.com/contact" />
        <meta
          property="og:title"
          content="Contact Pranav Drop Taxi | 24/7 One Way & Outstation Taxi in Chennai"
        />
        <meta
          property="og:description"
          content="Need a reliable taxi? Contact Pranav Drop Taxi for one-way drop taxi, airport transfers, and outstation cab services from Chennai across Tamil Nadu."
        />
        <meta
          property="og:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Pranav Drop Taxi | Best Drop Taxi in Chennai"
        />
        <meta
          name="twitter:description"
          content="Call Pranav Drop Taxi for affordable one-way and outstation taxi services in Chennai. Available 24/7."
        />
        <meta
          name="twitter:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />
      </Helmet>

      {/* ================= BACKGROUND (WebP) ================= */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-40 blur-[1px]"
          style={{ backgroundImage: "url('/taxi.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40 pointer-events-none" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:py-24 animate-fade-in">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-3.5 py-1 mb-5 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.25)]">
            Get in Touch
          </span>
          <h1 className="text-3xl font-extrabold uppercase tracking-wider text-white md:text-5xl">
            Contact <span className="text-taxi-yellow">Pranav Drop Taxi</span>
          </h1>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl"
          >
            <h2 className="mb-8 text-xl font-extrabold text-white uppercase tracking-wider">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Address</p>
                  <p className="text-sm font-bold text-white leading-relaxed">
                    MGR Nagar, Nehru Street,
                    <br />
                    Pallikaranai, Chennai – 600100
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Phone</p>
                  <a href="tel:+919884949171" className="text-sm font-bold text-white hover:text-taxi-yellow transition-colors">
                    +91 9884949171
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Email</p>
                  <a
                    href="mailto:droptaxipranav@gmail.com"
                    className="text-sm font-bold text-white hover:text-taxi-yellow transition-colors"
                  >
                    droptaxipranav@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-3.5 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl"
          >
            <iframe
              title="Pranav Drop Taxi Location"
              src="https://www.google.com/maps?q=Pranav+Drop+Taxi,+Pallikaranai,+Chennai&output=embed"
              className="w-full border-0 h-80 rounded-2xl filter invert brightness-90 contrast-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <a
              href="https://www.google.com/maps/place/Pranav+Drop+Taxi/@12.9254481,80.197137,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 mt-4 font-extrabold text-xs uppercase tracking-widest text-black bg-taxi-yellow rounded-2xl hover:bg-white active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(255,193,7,0.2)]"
            >
              <LocateFixed className="w-4 h-4 animate-float" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>

      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed z-50 p-3.5 text-black rounded-full bottom-6 right-6 bg-taxi-yellow hover:bg-white active:scale-95 transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
