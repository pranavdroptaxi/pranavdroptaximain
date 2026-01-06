import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  ShieldCheck,
  Clock,
  Globe2,
  PhoneCall,
  UserCheck,
  Home,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // 1. Import Helmet

export default function AboutUs() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. Define Schema Data for "About Page" (Reinforcing Organization/Service)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Pranav Drop Taxi",
    "alternateName": "Pranav Cabs",
    "logo": "https://pranavdroptaxi.com/public/favicon.ico",
    "image": "https://pranavdroptaxi.com/images/taxi.jpg",
    "description": "Pranav Drop Taxi provides safe, reliable, and affordable taxi services across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.",
    "url": "https://pranavdroptaxi.com/about", // specific URL for this page
    "telephone": "+918778143908",
    "email": "droptaxipranav@gmail.com",
    "areaServed": [
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "State", "name": "Kerala" },
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Andhra Pradesh" }
    ],
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "TN",
      "addressCountry": "IN"
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-gray-200 bg-black">
      
      {/* --- 3. SEO HEADER IMPLEMENTATION --- */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Pranav Drop Taxi | Best Outstation Cab Service in South India</title>
        <meta name="description" content="Learn about Pranav Drop Taxi, the most reliable drop taxi service covering Tamil Nadu, Bangalore, and Kerala. We offer 24/7 support, verified drivers, and affordable one-way fares." />
        <meta name="keywords" content="About Pranav Drop Taxi, safe taxi service tamilnadu, best outstation cabs chennai, drop taxi company profile, intercity taxi south india, reliable cab service kerala" />
        <link rel="canonical" href="https://pranavdroptaxi.com/about" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#F7C948" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Pranav Drop Taxi - Safe & Reliable Travels" />
        <meta property="og:description" content="Traveling across South India? Discover why thousands trust Pranav Drop Taxi for their one-way and round trips. Safe drivers, clean cars, best prices." />
        <meta property="og:url" content="https://pranavdroptaxi.com/about" />
        <meta property="og:image" content="https://pranavdroptaxi.com/images/taxi.jpg" />
        <meta property="og:site_name" content="Pranav Drop Taxi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Pranav Drop Taxi | Your Travel Partner" />
        <meta name="twitter:description" content="Reliable outstation taxi service in South India. Read our story and book your ride today." />
        <meta name="twitter:image" content="https://pranavdroptaxi.com/images/taxi.jpg" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* --- GLOBAL FIXED BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-100"
            style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* Navigation Header */}
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

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-taxi-yellow to-yellow-200">Pranav Drop Taxi</span>
          </h1>
          <div className="w-24 h-1 mx-auto mb-8 rounded bg-taxi-yellow shadow-[0_0_10px_#FFC107]"></div>
          <p className="max-w-3xl p-6 mx-auto text-lg leading-relaxed text-gray-200 border shadow-2xl md:text-xl bg-black/40 backdrop-blur-md rounded-2xl border-white/10">
            At <span className="font-bold text-taxi-yellow">Pranav Drop Taxi</span>, we provide safe, reliable, and affordable taxi services across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Whether you're booking a one-way ride or a round-trip, we make travel seamless with punctual drivers and well-maintained vehicles.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 mb-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: <Car className="w-10 h-10 text-black" />,
              title: "Comfortable Rides",
              desc: "Clean and well-maintained vehicles for a smooth journey.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-black" />,
              title: "Safety First",
              desc: "Trusted drivers with verified backgrounds and safe driving.",
            },
            {
              icon: <Clock className="w-10 h-10 text-black" />,
              title: "On-Time Pickup",
              desc: "Punctual pickups every time. Your time matters.",
            },
            {
              icon: <PhoneCall className="w-10 h-10 text-black" />,
              title: "24/7 Support",
              desc: "We’re here to assist you anytime, anywhere.",
            },
            {
              icon: <Globe2 className="w-10 h-10 text-black" />,
              title: "Wide Coverage",
              desc: "We cover major cities, towns, and districts across South India.",
            },
            {
              icon: <UserCheck className="w-10 h-10 text-black" />,
              title: "Easy Booking",
              desc: "Book online in minutes — no hassle, no delays.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative p-1 group"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-taxi-yellow/20 to-transparent rounded-2xl blur-xl group-hover:opacity-100" />
              
              {/* Card Content */}
              <div className="relative h-full p-8 transition-colors border shadow-2xl bg-black/60 backdrop-blur-md rounded-2xl border-white/10 group-hover:border-taxi-yellow/50">
                <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform rounded-full shadow-lg bg-taxi-yellow group-hover:scale-110">
                  {icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-taxi-yellow">
                  {title}
                </h3>
                <p className="leading-relaxed text-gray-300">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative p-10 overflow-hidden text-center border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 rounded-full opacity-10 bg-taxi-yellow blur-3xl translate-x-1/3" />

          <h2 className="relative mb-4 text-3xl font-bold text-white">Why Choose Us?</h2>
          <p className="relative max-w-2xl mx-auto mb-8 text-gray-300">
            We’ve helped countless customers reach their destinations safely and comfortably. Whether you're traveling for business or leisure, Pranav Drop Taxi is your go-to ride.
          </p>
          <Link to="/" className="relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-black transition-all duration-300 rounded-full bg-taxi-yellow hover:bg-white hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]">
            Book Your Ride Now
          </Link>
        </motion.div>

        {/* Back to Top Button */}
        {showTopButton && (
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