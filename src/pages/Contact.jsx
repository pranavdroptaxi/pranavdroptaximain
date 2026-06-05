import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  LocateFixed,
  ChevronUp,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

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

      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.ico"
            alt="Pranav Drop Taxi Logo"
            className="object-contain w-10 h-10"
          />
          <span className="text-xl font-bold text-white">Pranav Drop Taxi</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black rounded-full bg-taxi-yellow hover:bg-white"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-2 text-sm font-bold tracking-widest uppercase text-taxi-yellow">
            Get in Touch
          </h1>
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Contact <span className="text-taxi-yellow">Pranav Drop Taxi</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 border bg-black/60 rounded-3xl border-white/10"
          >
            <h3 className="mb-8 text-2xl font-bold text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-taxi-yellow" />
                <p>
                  MGR Nagar, Nehru Street,
                  <br />
                  Pallikaranai, Chennai – 600100
                </p>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-taxi-yellow" />
                <a href="tel:+919884949171" className="hover:text-taxi-yellow">
                  +91 9884949171
                </a>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-taxi-yellow" />
                <a
                  href="mailto:droptaxipranav@gmail.com"
                  className="hover:text-taxi-yellow"
                >
                  droptaxipranav@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-3 border bg-black/60 rounded-3xl border-white/10"
          >
            <iframe
              title="Pranav Drop Taxi Location"
              src="https://www.google.com/maps?q=Pranav+Drop+Taxi,+Pallikaranai,+Chennai&output=embed"
              className="w-full border-0 h-96 rounded-2xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <a
              href="https://www.google.com/maps/place/Pranav+Drop+Taxi/@12.9254481,80.197137,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 mt-4 font-bold text-black bg-taxi-yellow rounded-xl hover:bg-white"
            >
              <LocateFixed className="w-5 h-5" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>

      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 text-black rounded-full bottom-6 right-6 bg-taxi-yellow"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
}
