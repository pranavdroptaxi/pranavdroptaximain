import React from 'react';
import { CheckCircle2, Gauge, Info } from 'lucide-react';

const vehicleOptions = [
  {
    type: 'sedan',
    label: 'Sedan (4+1)',
    image: '/images/sedan.png',
    pricing: { oneway: 14, roundtrip: 13 },
    minKm: { oneway: 130, roundtrip: 250 },
  },
  {
    type: 'etios',
    label: 'Etios (4+1)',
    image: '/images/sedan.png',
    pricing: { oneway: 14, roundtrip: 13 },
    minKm: { oneway: 130, roundtrip: 250 },
  },
  {
    type: 'suv',
    label: 'SUV (7+1)',
    image: '/images/muv.png',
    pricing: { oneway: 19, roundtrip: 18 },
    minKm: { oneway: 130, roundtrip: 250 },
  },
  {
    type: 'innova',
    label: 'Innova (7+1)',
    image: '/images/innova.png',
    pricing: { oneway: 20, roundtrip: 18 },
    minKm: { oneway: 130, roundtrip: 250 },
  },
  {
    type: 'innovacrysta',
    label: 'Innova Crysta (7+1)',
    image: '/images/innova.png',
    pricing: { oneway: 25, roundtrip: 23 },
    minKm: { oneway: 150, roundtrip: 250 },
  },
];

const VehicleSelector = ({ vehicleType, setVehicleType, tripType }) => {
  return (
    <div className="space-y-4">
      
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          Select Vehicle
        </label>
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-taxi-yellow bg-taxi-yellow/10 border border-taxi-yellow/10 px-2.5 py-1 rounded-full">
          <Info className="w-3 h-3 animate-pulse-glow" /> Rates depend on trip type
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {vehicleOptions.map((v) => {
          const isSelected = vehicleType === v.type;
          const rate = v.pricing[tripType] ?? v.pricing.oneway;
          const minKm = v.minKm[tripType] ?? v.minKm.oneway;
          const tripLabel = tripType === "roundtrip" ? "Round Trip" : "One Way";

          return (
            <div
              key={v.type}
              onClick={() => setVehicleType(v.type)}
              className={`
                relative flex flex-col items-center justify-between p-4 cursor-pointer transition-all duration-300 rounded-2xl border group
                ${isSelected 
                  ? "bg-taxi-yellow/10 border-taxi-yellow/40 shadow-[0_0_20px_rgba(255,193,7,0.15)] scale-[1.02]" 
                  : "bg-white/5 border-white/5 hover:border-taxi-yellow/20 hover:bg-white/10"
                }
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-4 h-4 text-taxi-yellow fill-black" />
                </div>
              )}

              {/* Image */}
              <div className="flex items-center justify-center w-full h-14 mb-2">
                <img
                  src={v.image}
                  alt={v.label}
                  className={`object-contain w-full h-full transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-102'}`}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="w-full text-center mt-2">
                <h3 className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-taxi-yellow' : 'text-white'}`}>
                  {v.label}
                </h3>

                <div className="flex flex-col items-center justify-center gap-1 mt-3">
                  {/* Price Tag */}
                  <span className="px-2 py-0.5 text-[10px] font-bold text-black rounded bg-taxi-yellow">
                    ₹{rate}<span className="text-[8px] font-medium opacity-80">/km</span>
                  </span>
                  
                  {/* Trip Type Label */}
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                    {tripLabel}
                  </span>
                  
                  {/* Min KM */}
                  <div className="flex items-center gap-1 text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">
                    <Gauge className="w-3 h-3" /> Min {minKm}km
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleSelector;