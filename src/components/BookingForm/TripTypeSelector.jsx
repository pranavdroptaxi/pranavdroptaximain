import React from 'react';
import { ArrowRight, Repeat, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const TripTypeSelector = ({ tripType, setTripType }) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Segmented Toggle Switch */}
      <div className="relative flex p-1 rounded-full shadow-inner bg-black/60 border border-white/5 backdrop-blur-md">
        {['oneway', 'roundtrip'].map((type) => {
          const isActive = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className="relative flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 z-10 text-center"
            >
              {type === 'oneway' ? (
                <>
                  <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                  <span className={isActive ? 'text-black' : 'text-gray-400'}>One Way</span>
                </>
              ) : (
                <>
                  <Repeat className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                  <span className={isActive ? 'text-black' : 'text-gray-400'}>Round Trip</span>
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
      <div className="flex items-start gap-3 p-4 border border-red-500/20 bg-red-950/15 rounded-2xl">
        <MapPin className="flex-shrink-0 w-4 h-4 mt-0.5 text-red-500" />
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-red-200/80">
          <span className="text-red-400">Service Area:</span> Pickup & drop services exclusively within <span className="text-white">Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka</span>.
        </p>
      </div>

    </div>
  );
};

export default TripTypeSelector;