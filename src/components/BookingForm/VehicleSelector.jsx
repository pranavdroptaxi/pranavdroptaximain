import React from 'react';
import clsx from 'clsx';

const vehicleOptions = [
  {
    type: 'sedan',
    label: 'Sedan (4+1)',
    image: '/images/sedan.png',
    pricing: { oneway: 14, roundtrip: 13 },
    minKm: { oneway: 150, roundtrip: 250 },
  },
  {
    type: 'etios',
    label: 'Etios (4+1)',
    image: '/images/sedan.png',
    pricing: { oneway: 14, roundtrip: 13 },
    minKm: { oneway: 150, roundtrip: 250 },
  },
  {
    type: 'suv',
    label: 'SUV (6+1)',
    image: '/images/muv.png',
    pricing: { oneway: 19, roundtrip: 18 },
    minKm: { oneway: 150, roundtrip: 250 },
  },
  {
    type: 'innova',
    label: 'Innova (7+1)',
    image: '/images/innova.png',
    pricing: { oneway: 20, roundtrip: 18 },
    minKm: { oneway: 150, roundtrip: 250 },
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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
      {vehicleOptions.map((v) => {
        const isSelected = vehicleType === v.type;
        const rate = v.pricing[tripType] ?? v.pricing.oneway;
        const minKm = v.minKm[tripType] ?? v.minKm.oneway;

        return (
          <div
            key={v.type}
            onClick={() => setVehicleType(v.type)}
            className={clsx(
              "cursor-pointer rounded-lg p-3 bg-gray-800 text-white flex flex-col items-center justify-center shadow-md transition hover:shadow-lg",
              "border",
              isSelected
                ? "border-yellow-400 ring-2 ring-yellow-400"
                : "border-gray-700"
            )}
          >
            <img
              src={v.image}
              alt={v.label}
              className="object-contain mb-2 h-14 sm:h-16"
            />

            <h3 className="text-sm font-semibold text-center text-yellow-300">
              {v.label}
            </h3>

            <p className="mt-1 text-xs text-center text-gray-300">
              ₹{rate}/km ({tripType === "roundtrip" ? "Round Trip" : "One Way"})
            </p>

            <p className="text-xs text-gray-400 mt-0.5 text-center">
              Min {minKm} km
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleSelector;
