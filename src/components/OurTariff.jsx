import { motion } from "framer-motion";
import { Car, Route, Repeat, Info, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";

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
      "Quick rides offered at best affordable rates.",
      "Ideal choice for seamless single-way travel.",
    ],
    roundtrip: [
      "Lowest fares guaranteed for return trips.",
      "Perfect option for long, comfortable travel plans.",
    ],
  };

  const boxStyle =
    "p-6 bg-black/60 border border-white/10 rounded-3xl backdrop-blur-md transition-all duration-300 hover:bg-black/80 hover:border-taxi-yellow/40 hover:shadow-[0_0_20px_rgba(255,193,7,0.15)] group";

  return (
    <section className="relative z-10 px-4 py-16 text-white bg-transparent sm:py-20">
      {/* --- SEO HEADER (TITLE REMOVED TO PREVENT OVERRIDE) --- */}
      <Helmet>
        {/* META DESCRIPTION – HIGH INTENT */}
        <meta
          name="description"
          content="Check Pranav Drop Taxi tariff details with transparent per km pricing. Sedan starts from ₹13/km, SUV and Innova available for one-way and round-trip outstation travel from Chennai across Tamil Nadu, Bangalore, and South India. No hidden charges."
        />

        {/* STRONG KEYWORDS */}
        <meta
          name="keywords"
          content="
      taxi tariff chennai,
      drop taxi tariff,
      one way taxi price per km,
      outstation taxi rates chennai,
      sedan taxi fare chennai,
      suv taxi fare tamil nadu,
      innova taxi per km rate,
      innova crysta tariff chennai,
      cheapest drop taxi rates,
      pranav drop taxi tariff
    "
        />

        {/* CANONICAL */}
        <link rel="canonical" href="https://pranavdroptaxi.com/tariff" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pranav Drop Taxi" />
        <meta property="og:url" content="https://pranavdroptaxi.com/tariff" />
        <meta
          property="og:description"
          content="View Pranav Drop Taxi tariff with best per km rates for one-way and round-trip travel. Sedan, SUV, Innova, and Innova Crysta available."
        />
        <meta
          property="og:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Affordable taxi tariff starting from ₹13/km. Check Pranav Drop Taxi rates for one-way and outstation trips."
        />
        <meta
          name="twitter:image"
          content="https://pranavdroptaxi.com/taxi.jpg"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-extrabold text-center text-white sm:text-5xl drop-shadow-lg">
          Tariff <span className="text-taxi-yellow">Details</span>
        </h2>

        {/* Dynamic Description */}
        <div className="flex flex-col items-center justify-center gap-2 mb-10 text-lg text-gray-300 sm:flex-row">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-taxi-yellow" />{" "}
            {descriptions[tab][0]}
          </p>
          <span className="hidden w-1.5 h-1.5 rounded-full bg-gray-600 sm:block" />
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-taxi-yellow" />{" "}
            {descriptions[tab][1]}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setTab("oneway")}
            aria-label="View One Way Taxi Rates"
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform ${
              tab === "oneway"
                ? "bg-taxi-yellow text-black scale-105 shadow-[0_0_20px_rgba(255,193,7,0.4)]"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
            }`}
          >
            One Way
          </button>

          <button
            onClick={() => setTab("roundtrip")}
            aria-label="View Round Trip Taxi Rates"
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform ${
              tab === "roundtrip"
                ? "bg-taxi-yellow text-black scale-105 shadow-[0_0_20px_rgba(255,193,7,0.4)]"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
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
          className="mb-16 overflow-hidden border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300 border-separate border-spacing-0">
              <caption className="sr-only">
                Detailed taxi tariff for various vehicle types
              </caption>
              <thead>
                <tr className="bg-white/5">
                  <th
                    scope="col"
                    className="p-5 font-bold tracking-wider uppercase border-b border-white/10 text-taxi-yellow"
                  >
                    Vehicle
                  </th>
                  <th
                    scope="col"
                    className="p-5 font-bold tracking-wider uppercase border-b border-white/10 text-taxi-yellow"
                  >
                    <div className="flex items-center gap-2">
                      {tab === "oneway" ? (
                        <Route className="w-4 h-4" />
                      ) : (
                        <Repeat className="w-4 h-4" />
                      )}
                      Rate
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="p-5 font-bold tracking-wider uppercase border-b border-white/10 text-taxi-yellow"
                  >
                    Driver Bata
                  </th>
                  <th
                    scope="col"
                    className="w-48 p-5 font-bold tracking-wider uppercase border-b border-white/10 text-taxi-yellow"
                  >
                    Note
                  </th>
                </tr>
              </thead>

              <tbody>
                {tariff.map((item, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/5">
                    <td className="flex items-center gap-3 p-5 font-bold text-white border-b border-white/10">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-taxi-yellow/10 text-taxi-yellow">
                        <Car className="w-5 h-5" />
                      </div>
                      {item.type}
                    </td>

                    <td className="p-5 font-mono text-lg font-bold text-white border-b border-white/10">
                      ₹{tab === "oneway" ? item.oneway : item.roundtrip}
                      <span className="text-sm font-normal text-gray-500">
                        /km
                      </span>
                    </td>

                    <td className="p-5 border-b border-white/10">
                      <span className="px-3 py-1 text-xs font-bold text-black rounded-full bg-taxi-yellow shadow-[0_0_10px_rgba(255,193,7,0.3)]">
                        ₹400
                      </span>
                    </td>

                    <td className="p-5 border-b border-white/10">
                      {tab === "oneway" ? (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-wide text-blue-300 uppercase border border-blue-500/30 rounded bg-blue-500/10">
                          One Way Toll Extra
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-wide text-green-300 uppercase border border-green-500/30 rounded bg-green-500/10">
                          Up & Down Toll Extra
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Terms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className={boxStyle}>
            <h4 className="flex items-center gap-3 mb-4 text-lg font-bold text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-taxi-yellow text-black shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                <Route className="w-5 h-5" />
              </div>
              Drop Trip Terms
            </h4>
            <ul className="pl-2 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Driver Bata: ₹400
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Waiting Charges: ₹120 per hour
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Minimum billing: 130 KM
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Hill station charges: ₹300
              </li>
            </ul>
          </div>

          <div className={boxStyle}>
            <h4 className="flex items-center gap-3 mb-4 text-lg font-bold text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-taxi-yellow text-black shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                <Repeat className="w-5 h-5" />
              </div>
              Round Trip Terms
            </h4>
            <ul className="pl-2 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Driver Bata: ₹400 per day
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Minimum billing: 250 KM
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Bangalore pickup: 300kms min
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Other states: 250kms min
              </li>
            </ul>
          </div>

          <div className={boxStyle}>
            <h4 className="flex items-center gap-3 mb-4 text-lg font-bold text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-taxi-yellow text-black shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                <Car className="w-5 h-5" />
              </div>
              Extra Charges
            </h4>
            <ul className="pl-2 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Toll fees (as applicable)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Inter-State Permit charges
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                GST charges (if any)
              </li>
            </ul>
          </div>

          <div className={boxStyle}>
            <h4 className="flex items-center gap-3 mb-4 text-lg font-bold text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-taxi-yellow text-black shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                <Info className="w-5 h-5" />
              </div>
              Important Notes
            </h4>
            <ul className="pl-2 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                1 day = 1 calendar day (12 AM to 12 AM)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Luggage policy at driver’s discretion
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0"></span>{" "}
                Taxis are passenger vehicles only
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
