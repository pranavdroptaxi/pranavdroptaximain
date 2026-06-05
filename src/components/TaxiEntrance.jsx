import React from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

const TaxiEntrance = ({ onComplete }) => {
  // Container variants with slower transition times
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.5 } // Slower staggering
    },
    exit: { 
      y: "-100%", 
      transition: { duration: 1.5, ease: "easeInOut" } // Slower exit
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={onComplete}
    >
      {/* Road line effect */}
      <motion.div 
        className="absolute w-full h-1 bottom-1/3 bg-white/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.0, ease: "easeInOut" }} // Slower road reveal
      />

      <motion.div
        className="flex items-center gap-6"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        // Slower, smoother spring
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
      >
        {/* Animated Taxi */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} // Slower bounce
        >
          <Car className="w-20 h-20 text-taxi-yellow drop-shadow-[0_0_15px_rgba(255,200,0,0.5)]" />
        </motion.div>
        
        {/* Text Reveal */}
        <div className="overflow-hidden">
          <motion.h1 
            className="text-5xl font-extrabold tracking-tighter text-white sm:text-7xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }} // Slower text slide
          >
            Pranav <span className="text-taxi-yellow">Drop Taxi</span>
          </motion.h1>
          
          <motion.div 
            className="h-1 mt-2 bg-taxi-yellow"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.2 }} // Slower underline
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaxiEntrance;