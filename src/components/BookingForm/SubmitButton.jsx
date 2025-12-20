import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SubmitButton = ({ submitting }) => {
  return (
    <motion.button
      type="submit"
      disabled={submitting}
      aria-busy={submitting}
      whileHover={{ scale: submitting ? 1 : 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-full py-4 text-sm font-extrabold uppercase tracking-widest text-black
        transition-all duration-300 transform rounded-xl
        bg-taxi-yellow shadow-[0_0_20px_rgba(255,193,7,0.4)]
        hover:bg-white hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale disabled:shadow-none
        flex items-center justify-center gap-3
      `}
    >
      {submitting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing Booking...</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-5 h-5" />
          <span>Confirm Booking</span>
        </>
      )}
    </motion.button>
  );
};

export default SubmitButton;