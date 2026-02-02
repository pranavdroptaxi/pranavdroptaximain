import React from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

/* ================================
   Animation
================================ */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================================
   Component
================================ */
export default function PageBlocked() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 text-white bg-black">
      <div className="absolute inset-0 bg-black/90" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl p-10 text-center border bg-black/60 backdrop-blur-md rounded-3xl border-white/10"
      >
        {/* Icon */}
        <motion.div
          variants={item}
          className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-black rounded-full bg-taxi-yellow"
        >
          <Shield size={40} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="mb-4 text-4xl font-extrabold md:text-5xl"
        >
          Page <span className="text-taxi-yellow">Temporarily Restricted</span>
        </motion.h1>

        {/* Message */}
        <motion.p variants={item} className="mb-6 text-lg text-gray-300">
          This page is currently under development and will be available once
          it is fully built. We’re working to bring this section live soon.
        </motion.p>

        {/* Notice Box */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 p-4 mb-8 text-sm text-yellow-300 border rounded-xl bg-yellow-500/10 border-yellow-400/30"
        >
          <AlertTriangle />
          Please check back later for updates.
        </motion.div>

        {/* Button */}
        <motion.div variants={item}>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-black transition rounded-full bg-taxi-yellow hover:bg-white"
          >
            <Home size={18} /> Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
