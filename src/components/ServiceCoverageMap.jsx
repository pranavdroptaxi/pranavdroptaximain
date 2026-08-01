import React, { useState } from "react";
import { MapPin, CheckCircle2, Globe } from "lucide-react";

export const coverageData = {
  "Tamil Nadu": {
    color: "bg-taxi-yellow text-black",
    tag: "Main Operating Hub",
    cities: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli (Trichy)",
      "Salem",
      "Tirunelveli",
      "Vellore",
      "Erode",
      "Thanjavur",
      "Dindigul",
      "Kanchipuram",
      "Hosur",
      "Nagercoil",
      "Tiruppur",
    ],
  },
  Karnataka: {
    color: "bg-amber-400 text-black",
    tag: "Interstate Route Specialist",
    cities: [
      "Bengaluru (Bangalore)",
      "Mysuru (Mysore)",
      "Mangaluru",
      "Hubballi",
      "Belagavi",
      "Tumakuru",
      "Hosur Border",
    ],
  },
  Kerala: {
    color: "bg-emerald-400 text-black",
    tag: "Tourist & Pilgrimage Drops",
    cities: [
      "Palakkad",
      "Kochi (Cochin)",
      "Thiruvananthapuram",
      "Kozhikode",
      "Thrissur",
      "Munnar",
      "Wayanad",
    ],
  },
  "Andhra Pradesh": {
    color: "bg-sky-400 text-black",
    tag: "Pilgrimage & Coastal Corridors",
    cities: [
      "Tirupati",
      "Nellore",
      "Chittoor",
      "Vijayawada",
      "Visakhapatnam",
      "Guntur",
      "Kadaapa",
    ],
  },
  Puducherry: {
    color: "bg-purple-400 text-black",
    tag: "Union Territory Express",
    cities: ["Pondicherry Town", "Karaikal", "Auroville", "Yanam"],
  },
};

export default function ServiceCoverageMap() {
  const [activeState, setActiveState] = useState("Tamil Nadu");

  return (
    <section className="px-4 py-20 bg-transparent" id="coverage">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
            <Globe className="w-3 h-3" /> South India Reach
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
            Interactive <span className="text-taxi-yellow">Coverage Map</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Seamless drop taxi service across 5 South Indian States & UTs
          </p>
        </div>

        {/* State Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {Object.keys(coverageData).map((state) => {
            const isActive = activeState === state;
            return (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 transform ${
                  isActive
                    ? "bg-taxi-yellow text-black scale-105 shadow-[0_0_20px_rgba(255,193,7,0.3)]"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {state}
              </button>
            );
          })}
        </div>

        {/* Active State View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl p-8 rounded-3xl">
          {/* Real Google Map Embed Container */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center p-3 bg-black/60 rounded-2xl border border-white/10 relative overflow-hidden min-h-[320px]">
            <iframe
              title={`Pranav Drop Taxi Coverage Map - ${activeState}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(activeState + ', India')}&output=embed`}
              className="w-full h-[280px] border-0 rounded-xl filter invert contrast-100 brightness-90 shadow-inner"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <span className="mt-3 px-3.5 py-1 text-[10px] font-black uppercase text-black bg-taxi-yellow rounded-full shadow-md">
              {coverageData[activeState].tag}
            </span>
          </div>

          {/* Cities List */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-taxi-yellow" /> Operating Cities in {activeState}
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                24/7 pickup and drop services available across all major hubs in {activeState}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {coverageData[activeState].cities.map((city, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-taxi-yellow/30 hover:bg-white/10 transition-all text-xs font-bold text-gray-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-taxi-yellow shrink-0" />
                  <span className="truncate">{city}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Need drop to an unlisted village or town?
              </span>
              <a
                href="#booking"
                className="px-5 py-2.5 text-xs font-black text-black bg-taxi-yellow rounded-xl uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(255,193,7,0.2)]"
              >
                Book Custom Route
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
