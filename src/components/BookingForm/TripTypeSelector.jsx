import React from 'react';
import { ArrowRight, Repeat, MapPin } from 'lucide-react';

const TripTypeSelector = ({ tripType, setTripType }) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Segmented Toggle Switch */}
      <div className="relative flex p-1 border rounded-full shadow-inner bg-black/50 border-white/10 backdrop-blur-md">
        {['oneway', 'roundtrip'].map((type) => {
          const isActive = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold tracking-wide uppercase rounded-full transition-all duration-300
                ${isActive 
                  ? 'bg-taxi-yellow text-black shadow-[0_0_15px_rgba(255,193,7,0.4)] scale-100' 
                  : 'text-gray-400 hover:text-white scale-95 hover:scale-100'
                }
              `}
            >
              {type === 'oneway' ? (
                <>
                  <ArrowRight className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                  One Way
                </>
              ) : (
                <>
                  <Repeat className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                  Round Trip
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Availability Note */}
      <div className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-900/10 rounded-2xl">
        <MapPin className="flex-shrink-0 w-5 h-5 mt-0.5 text-red-400" />
        <p className="text-xs font-medium leading-relaxed text-red-200/80">
          <span className="font-bold text-red-400 uppercase">Service Area:</span> We currently provide pickup & drop services exclusively within <span className="text-white">Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka</span>.
        </p>
      </div>

    </div>
  );
};

export default TripTypeSelector;