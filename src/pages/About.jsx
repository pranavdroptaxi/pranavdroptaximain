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

  return (
    <div className="relative w-full min-h-screen text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-sm brightness-75 -z-10"
        style={{ backgroundImage: "url('/images/taxi.jpg')" }}
      />

      {/* Home Button */}
      <div className="flex justify-end px-4 pt-6 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-300"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>

      {/* Main Content Wrapper */}
      <div className="px-4 py-12 mx-auto max-w-7xl">

        {/* Glassmorphic About Header Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl p-8 mx-auto mb-12 text-center transition border shadow-lg bg-black/40 backdrop-blur-md rounded-2xl border-white/10 hover:shadow-yellow-500/20"
        >
          <h1 className="mb-4 text-3xl font-bold text-yellow-400 sm:text-4xl drop-shadow">
            About Pranav Drop Taxi
          </h1>
          <p className="max-w-3xl mx-auto text-base leading-relaxed text-gray-200 sm:text-lg">
            At{" "}
            <span className="font-semibold text-white">
              Pranav Drop Taxi
            </span>, we provide safe, reliable, and affordable taxi services across
            Tamil Nadu and beyond. Whether you're booking a one-way ride or a
            round-trip, we make travel seamless with punctual drivers and
            well-maintained vehicles.
          </p>
        </motion.div>

        {/* Glass Container for Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid gap-6 p-6 transition border shadow-lg rounded-2xl bg-black/30 backdrop-blur-md border-white/10 sm:grid-cols-2 md:grid-cols-3 hover:shadow-yellow-500/20"
        >
          {[
            {
              icon: <Car className="w-8 h-8 text-yellow-400" />,
              title: "Comfortable Rides",
              desc: "Clean and well-maintained vehicles for a smooth journey.",
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
              title: "Safety First",
              desc: "Trusted drivers with verified backgrounds and safe driving.",
            },
            {
              icon: <Clock className="w-8 h-8 text-yellow-400" />,
              title: "On-Time Pickup",
              desc: "Punctual pickups every time. Your time matters.",
            },
            {
              icon: <PhoneCall className="w-8 h-8 text-yellow-400" />,
              title: "24/7 Support",
              desc: "We’re here to assist you anytime, anywhere.",
            },
            {
              icon: <Globe2 className="w-8 h-8 text-yellow-400" />,
              title: "Wide Coverage",
              desc: "We cover major cities, towns, and districts across South India.",
            },
            {
              icon: <UserCheck className="w-8 h-8 text-yellow-400" />,
              title: "Easy Booking",
              desc: "Book online in minutes — no hassle, no delays.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="p-6 transition border shadow-lg bg-black/40 backdrop-blur-md rounded-xl border-white/10 hover:shadow-yellow-500/20"
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                {title}
              </h3>
              <p className="text-sm text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl p-8 mx-auto mt-16 text-center transition border shadow-lg bg-black/40 backdrop-blur-md rounded-2xl border-white/10 hover:shadow-yellow-500/20"
        >
          <h2 className="mb-4 text-2xl font-bold text-yellow-400 sm:text-3xl">
            Why Choose Us?
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-200 sm:text-base">
            We’ve helped countless customers reach their destinations safely and
            comfortably. Whether you're traveling for business or leisure,
            Pranav Drop Taxi is your go-to ride.
          </p>
        </motion.div>

        {/* Back to Top Button */}
        {showTopButton && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300"
            >
              <ChevronUp className="w-4 h-4" />
              Back to Top
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
