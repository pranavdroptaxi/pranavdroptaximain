import React, { useEffect, useState } from "react";
import {
  PhoneCall,
  CheckCircle,
  Car,
  Gauge,
  MountainSnow,
  Crown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function AboutUs() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-transparent">
      <AboutSEO />

      {/* Background (Optimized WebP) */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-40 blur-[1px]"
          style={{ backgroundImage: "url('/taxi.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-3.5 py-1 mb-5 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.25)]">
            Our Journey
          </span>
          <h1 className="mb-6 text-3xl font-extrabold uppercase tracking-wider md:text-5xl">
            About <span className="text-taxi-yellow">Pranav Drop Taxi</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-gray-400 leading-relaxed">
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
              icon: <Car className="w-6 h-6" />,
              title: "Comfortable Rides",
              desc: "Clean, well-maintained vehicles for long journeys.",
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: "Verified Drivers",
              desc: "Experienced and background-verified drivers.",
            },
            {
              icon: <Gauge className="w-6 h-6" />,
              title: "On-Time Pickup",
              desc: "Punctual service every time you book.",
            },
            {
              icon: <PhoneCall className="w-6 h-6" />,
              title: "24/7 Support",
              desc: "Available anytime for bookings and assistance.",
            },
            {
              icon: <MountainSnow className="w-6 h-6" />,
              title: "Outstation Specialists",
              desc: "Perfect for hills and long-distance travel.",
            },
            {
              icon: <Crown className="w-6 h-6" />,
              title: "Premium Experience",
              desc: "Comfort-focused travel for families and business.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl hover:border-taxi-yellow/25 transition-all duration-300 hover:bg-black/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-6 text-black rounded-2xl w-13 h-13 bg-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.2)]">
                {item.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wider text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Back to Top */}
      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed z-50 p-3.5 text-black rounded-full bottom-6 right-6 bg-taxi-yellow hover:bg-white active:scale-95 transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
