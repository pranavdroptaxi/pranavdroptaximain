import { motion } from "framer-motion";
import { Car, Route, Repeat, Info } from "lucide-react";
import { useState } from "react";

export default function Tariff() {
  const [tab, setTab] = useState("oneway");

  const tariff = [
    { type: "Sedan", oneway: 14, roundtrip: 13 },
    { type: "Etios", oneway: 14, roundtrip: 13 },
    { type: "SUV", oneway: 19, roundtrip: 18 },
    { type: "Innova", oneway: 20, roundtrip: 18 },
    { type: "Innova Crysta", oneway: 25, roundtrip: 23 },
  ];

  const descriptions = {
    oneway: [
      "Quick rides offered at best affordable rates",
      "Ideal choice for seamless single way travel now"
    ],
    roundtrip: [
      "Lowest fares guaranteed for full return trips",
      "Perfect option for long comfortable travel plans"
    ]
  };

  const box =
    "p-6 bg-gray-900/40 border border-gray-700 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]";

  return (
    <section className="px-4 py-16 text-white bg-transparent sm:py-20">
      <h2 className="mb-6 text-3xl font-bold text-center text-yellow-300 sm:text-4xl">
        Tariff Details
      </h2>

      {/* Dynamic description */}
      <div className="mb-10 text-lg leading-relaxed text-center text-gray-300">
        <p>{descriptions[tab][0]}</p>
        <p>{descriptions[tab][1]}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setTab("oneway")}
          className={`px-7 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300 hover:scale-105 ${
            tab === "oneway"
              ? "bg-yellow-300 text-black"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          One Way
        </button>

        <button
          onClick={() => setTab("roundtrip")}
          className={`px-7 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300 hover:scale-105 ${
            tab === "roundtrip"
              ? "bg-yellow-300 text-black"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          Round Trip
        </button>
      </div>

      {/* Tariff Table */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto mb-12 overflow-x-auto bg-transparent border border-gray-700 rounded-2xl backdrop-blur-sm"
      >
        <table className="w-full text-base text-left text-gray-300">
          <thead className="text-yellow-300 bg-gray-800/30">
            <tr>
              <th className="p-3">Car Type</th>
              <th className="p-3">
                <div className="flex items-center gap-2">
                  {tab === "oneway" ? (
                    <>
                      <Route className="w-4 h-4" /> One Way Tariff
                    </>
                  ) : (
                    <>
                      <Repeat className="w-4 h-4" /> Round Trip Tariff
                    </>
                  )}
                </div>
              </th>
              <th className="p-3">Driver Bata</th>
              <th className="w-32 p-3">Toll / Parking / Hill Charges</th>
            </tr>
          </thead>

          <tbody>
            {tariff.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="flex items-center gap-2 p-3 font-semibold text-yellow-300">
                  <Car className="w-4 h-4" /> {item.type}
                </td>

                <td className="p-3">
                  ₹{tab === "oneway" ? item.oneway : item.roundtrip}/km
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-semibold text-black bg-yellow-300 rounded-lg">
                    ₹400
                  </span>
                </td>

                {/* Toll Column FIXED */}
                <td className="w-32 p-3">
                  {tab === "oneway" ? (
                    <span className="inline-flex flex-col items-center justify-center px-2 py-1 text-[10px] leading-tight text-blue-200 border border-blue-500 rounded-lg bg-blue-600/40 w-fit">
                      One Way<br />Toll
                    </span>
                  ) : (
                    <span className="inline-flex flex-col items-center justify-center px-2 py-1 text-[10px] leading-tight text-green-200 border border-green-500 rounded-lg bg-green-600/40 w-fit">
                      Up & Down<br />Toll
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Terms Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mt-12 md:grid-cols-2"
      >
        <div className={box}>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-300">
            <Route className="w-5 h-5" /> Drop Trip Terms
          </h4>
          <ul className="pl-6 mt-3 space-y-1 text-sm text-gray-300 list-disc">
            <li>Driver Bata: ₹400</li>
            <li>Waiting Charges: ₹120 per hour</li>
            <li>Minimum billing: 130 KM</li>
            <li>Hill station charges: ₹300</li>
          </ul>
        </div>

        <div className={box}>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-300">
            <Repeat className="w-5 h-5" /> Round Trip Terms
          </h4>
          <ul className="pl-6 mt-3 space-y-1 text-sm text-gray-300 list-disc">
            <li>Driver Bata: ₹400 per day</li>
            <li>Minimum billing: 250 KM</li>
            <li>Bangalore pickup: 300kms minimum</li>
            <li>Any other state: 250kms minimum</li>
          </ul>
        </div>

        <div className={box}>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-300">
            <Car className="w-5 h-5" /> Extra Charges
          </h4>
          <ul className="pl-6 mt-3 space-y-1 text-sm text-gray-300 list-disc">
            <li>Toll fees (as applicable)</li>
            <li>Inter-State Permit charges</li>
            <li>GST charges (if any)</li>
          </ul>
        </div>

        <div className={box}>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-300">
            <Info className="w-5 h-5" /> Important Notes
          </h4>
          <ul className="pl-6 mt-3 space-y-1 text-sm text-gray-300 list-disc">
            <li>1 day = 1 calendar day (12 AM to 12 AM)</li>
            <li>Luggage policy at driver’s discretion</li>
            <li>Taxis are passenger vehicles only</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
