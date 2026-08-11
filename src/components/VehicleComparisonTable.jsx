import React from "react";
import { Users, Briefcase, CheckCircle, ShieldCheck } from "lucide-react";

export const vehicleComparisonData = [
  {
    type: "Sedan",
    tag: "Most Popular",
    seats: 4,
    bags: 2,
    oneway: "₹14/km",
    roundtrip: "₹13/km",
    minKm: "130 KM",
    models: "Dzire, Etios, Xcent",
    highlight: true,
  },
  {
    type: "SUV",
    tag: "Family Choice",
    seats: 7,
    bags: 4,
    oneway: "₹19/km",
    roundtrip: "₹18/km",
    minKm: "130 KM",
    models: "Ertiga, Triber, Lodgy",
    highlight: false,
  },
  {
    type: "Innova",
    tag: "Comfort Travel",
    seats: 7,
    bags: 3,
    oneway: "₹20/km",
    roundtrip: "₹18/km",
    minKm: "130 KM",
    models: "Toyota Innova",
    highlight: false,
  },
  {
    type: "Crysta",
    tag: "Premium Executive",
    seats: 7,
    bags: 3,
    oneway: "₹25/km",
    roundtrip: "₹23/km",
    minKm: "150 KM",
    models: "Innova Crysta Luxury",
    highlight: false,
  },
];

export default function VehicleComparisonTable() {
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-4 py-20 bg-transparent" id="comparison">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
            Fleet Rate Comparison
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
            Vehicle <span className="text-taxi-yellow">Comparison Matrix</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Compare passenger capacity, luggage space, and per kilometer pricing
          </p>
        </div>

        {/* MOBILE CARD VIEW (block sm:hidden) */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {vehicleComparisonData.map((v, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${
                v.highlight
                  ? "bg-taxi-yellow/10 border-taxi-yellow shadow-[0_0_20px_rgba(255,193,7,0.15)]"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{v.type}</h3>
                    {v.tag && (
                      <span className="px-2 py-0.5 text-[9px] font-black text-black bg-taxi-yellow rounded-full uppercase tracking-wider">
                        {v.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">{v.models}</p>
                </div>
                <button
                  onClick={scrollToBooking}
                  aria-label={`Select ${v.type} for booking`}
                  className="px-4 py-2 text-[10px] font-black text-black uppercase tracking-wider bg-taxi-yellow rounded-xl active:scale-95 shadow-md cursor-pointer"
                >
                  Select
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest block">One Way Rate</span>
                  <span className="text-base font-black text-white font-mono">{v.oneway}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest block">Round Trip Rate</span>
                  <span className="text-base font-black text-taxi-yellow font-mono">{v.roundtrip}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest block">Capacity</span>
                  <span className="text-xs font-bold text-gray-200">{v.seats} Seats | {v.bags} Bags</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest block">Min Billing</span>
                  <span className="text-xs font-bold text-gray-300">{v.minKm}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE VIEW (hidden sm:block) */}
        <div className="hidden sm:block overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-white/10 text-taxi-yellow text-[10px] font-extrabold uppercase tracking-widest border-b border-white/10">
                  <th className="p-5">Vehicle</th>
                  <th className="p-5 text-center">Seats</th>
                  <th className="p-5 text-center">Bags</th>
                  <th className="p-5">One Way</th>
                  <th className="p-5">Round Trip</th>
                  <th className="p-5">Min Billing</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-200">
                {vehicleComparisonData.map((v, i) => (
                  <tr
                    key={i}
                    className={`transition-colors hover:bg-white/10 ${
                      v.highlight ? "bg-taxi-yellow/5" : ""
                    }`}
                  >
                    <td className="p-5">
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base">
                            {v.type}
                          </span>
                          {v.tag && (
                            <span className="px-2 py-0.5 text-[8px] font-extrabold text-black bg-taxi-yellow rounded uppercase whitespace-nowrap">
                              {v.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {v.models}
                        </span>
                      </div>
                    </td>

                    <td className="p-5 text-center font-bold">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs text-white">
                        <Users className="w-3.5 h-3.5 text-taxi-yellow" /> {v.seats}
                      </span>
                    </td>

                    <td className="p-5 text-center font-bold">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs text-white">
                        <Briefcase className="w-3.5 h-3.5 text-taxi-yellow" /> {v.bags}
                      </span>
                    </td>

                    <td className="p-5 font-mono font-black text-white text-base">
                      {v.oneway}
                    </td>

                    <td className="p-5 font-mono font-black text-white text-base">
                      {v.roundtrip}
                    </td>

                    <td className="p-5 text-xs font-bold text-gray-400">
                      {v.minKm}
                    </td>

                    <td className="p-5 text-right">
                      <button
                        onClick={scrollToBooking}
                        aria-label={`Select ${v.type} for booking`}
                        className="px-4 py-2 text-[10px] font-extrabold text-black uppercase tracking-wider bg-taxi-yellow rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-[0_0_15px_rgba(255,193,7,0.2)] cursor-pointer"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-taxi-yellow" /> Driver Bata ₹400
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-taxi-yellow" /> Toll & Parking As Actuals
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-taxi-yellow" /> No Hidden Cancellation Charges
          </span>
        </div>
      </div>
    </section>
  );
}
