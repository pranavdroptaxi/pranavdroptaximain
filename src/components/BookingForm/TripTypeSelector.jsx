import React from 'react';
import { ArrowRight, Repeat, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const TripTypeSelector = ({ tripType, setTripType }) => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Segmented Toggle Switch */}
      <div className="relative flex p-1 rounded-full bg-black/80 border border-white/10 shadow-lg max-w-xs w-full mx-auto">
        {['oneway', 'roundtrip'].map((type) => {
          const isActive = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className="relative flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 z-10 text-center"
            >
              {type === 'oneway' ? (
                <>
                  <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  <span className={isActive ? 'text-black font-black' : 'text-gray-300'}>One Way</span>
                </>
              ) : (
                <>
                  <Repeat className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  <span className={isActive ? 'text-black font-black' : 'text-gray-300'}>Round Trip</span>
                </>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeTripTypePill"
                  className="absolute inset-0 bg-taxi-yellow rounded-full -z-10 shadow-[0_0_15px_rgba(255,193,7,0.3)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Availability Note */}
      <div className="flex items-center gap-3 p-3.5 border border-red-500/30 bg-red-950/20 rounded-2xl max-w-md w-full mx-auto">
        <MapPin className="flex-shrink-0 w-4 h-4 text-red-500" />
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-red-200">
          <span className="text-red-400">Service Area:</span> Pickup & drop services exclusively within <span className="text-white font-extrabold">Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka</span>.
        </p>
      </div>

    </div>
  );
};

export default TripTypeSelector;