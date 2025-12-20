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
        <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Select Vehicle
        </label>
        <span className="flex items-center gap-1 text-[10px] text-taxi-yellow bg-yellow-500/10 px-2 py-1 rounded-full">
          <Info className="w-3 h-3" /> Rates depend on trip type
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
                relative flex flex-col items-center justify-between p-3 cursor-pointer transition-all duration-300 rounded-2xl border group
                ${isSelected 
                  ? "bg-taxi-yellow/10 border-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.2)] scale-[1.02]" 
                  : "bg-black/50 border-white/10 hover:border-taxi-yellow/50 hover:bg-white/5"
                }
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-taxi-yellow fill-black" />
                </div>
              )}

              {/* Image */}
              <div className="flex items-center justify-center w-full h-16 mb-2">
                <img
                  src={v.image}
                  alt={v.label}
                  className={`object-contain w-full h-full transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
                />
              </div>

              {/* Content */}
              <div className="w-full text-center">
                <h3 className={`text-sm font-bold truncate transition-colors ${isSelected ? 'text-taxi-yellow' : 'text-white'}`}>
                  {v.label}
                </h3>

                <div className="flex flex-col items-center justify-center gap-1 mt-2">
                  {/* Price Tag */}
                  <span className="px-2 py-0.5 text-xs font-bold text-black rounded-md bg-taxi-yellow">
                    ₹{rate}<span className="text-[9px] font-medium opacity-80">/km</span>
                  </span>
                  
                  {/* Trip Type Label */}
                  <span className="text-[10px] font-medium text-gray-300">
                    {tripLabel}
                  </span>
                  
                  {/* Min KM */}
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
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