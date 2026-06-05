import React, { useEffect, useState } from "react";
import {
  PhoneCall,
  CheckCircle,
  Car,
  Gauge,
  MountainSnow,
  Crown,
  ChevronUp,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

/* ================================
   SEO ONLY – NO SCHEMA
================================ */
const AboutSEO = () => (
  <Helmet>
    <title>
      About Pranav Drop Taxi | Trusted One Way & Outstation Taxi Service
    </title>

    <meta
      name="description"
      content="Learn about Pranav Drop Taxi, a trusted one-way and outstation taxi service based in Chennai. We offer safe, affordable, and reliable intercity cab services across Tamil Nadu, Bangalore, Kerala, and South India."
    />

    <meta
      name="keywords"
      content="
        about pranav drop taxi,
        best drop taxi chennai,
        one way taxi service,
        outstation taxi chennai,
        intercity cab service south india,
        reliable taxi service tamil nadu,
        affordable outstation cabs,
        trusted taxi company chennai
      "
    />

    <link rel="canonical" href="https://pranavdroptaxi.com/about" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Pranav Drop Taxi" />
    <meta property="og:url" content="https://pranavdroptaxi.com/about" />
    <meta
      property="og:description"
      content="Discover why Pranav Drop Taxi is a preferred choice for one-way and outstation taxi services across South India."
    />
    <meta property="og:image" content="https://pranavdroptaxi.com/taxi.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:description"
      content="Trusted one-way and outstation taxi service from Chennai across South India."
    />
    <meta name="twitter:image" content="https://pranavdroptaxi.com/taxi.jpg" />
  </Helmet>
);

/* ================================
   Animation Variants (FIXED)
================================ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutUs() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-black">
      <AboutSEO />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">Pranav Drop Taxi</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black rounded-full bg-taxi-yellow hover:bg-white"
        >
          <Home className="w-4 h-4" /> Home
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
            About <span className="text-taxi-yellow">Pranav Drop Taxi</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            We provide safe, reliable, and affordable one-way and outstation taxi
            services from Chennai across Tamil Nadu, Bangalore, Kerala, and South
            India.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: <Car />,
              title: "Comfortable Rides",
              desc: "Clean, well-maintained vehicles for long journeys.",
            },
            {
              icon: <CheckCircle />,
              title: "Verified Drivers",
              desc: "Experienced and background-verified drivers.",
            },
            {
              icon: <Gauge />,
              title: "On-Time Pickup",
              desc: "Punctual service every time you book.",
            },
            {
              icon: <PhoneCall />,
              title: "24/7 Support",
              desc: "Available anytime for bookings and assistance.",
            },
            {
              icon: <MountainSnow />,
              title: "Outstation Specialists",
              desc: "Perfect for hills and long-distance travel.",
            },
            {
              icon: <Crown />,
              title: "Premium Experience",
              desc: "Comfort-focused travel for families and business.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 border bg-black/60 rounded-2xl border-white/10"
            >
              <div className="flex items-center justify-center mb-4 text-black rounded-full w-14 h-14 bg-taxi-yellow">
                {item.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Back to Top */}
      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed z-50 p-3 text-black rounded-full bottom-6 right-6 bg-taxi-yellow"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
}
