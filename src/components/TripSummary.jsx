import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Timer,
  RefreshCw,
  UserCheck,
  BadgeIndianRupee,
} from "lucide-react";

const formatRupees = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TripSummary = ({
  distance,
  duration,
  cost,
  tripType,
  returnDistance,
}) => {
  const isValid =
    typeof distance === "number" &&
    typeof duration === "number" &&
    typeof cost === "number" &&
    distance > 0 &&
    duration > 0 &&
    cost >= 0;

  if (!isValid) return null;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <motion.section
      aria-label="Trip Summary"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.4 }}
      className="max-w-3xl p-4 mx-auto mt-6 text-sm text-gray-200 bg-transparent border border-gray-700 shadow-lg rounded-2xl backdrop-blur-sm sm:p-5"
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-2 mb-4 sm:flex-row sm:items-center">
        <h3 className="text-lg font-bold text-yellow-300 sm:text-xl">
          Trip Summary
        </h3>
        <span className="px-3 py-1 text-xs font-semibold text-black rounded-full bg-yellow-300/90">
          Instant Estimate
        </span>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Trip Type */}
        <div className="flex items-start gap-3 p-3 border border-gray-700 rounded-xl bg-black/30">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-700 rounded-lg bg-yellow-300/10">
            <RefreshCw className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Trip Type</p>
            <p className="text-sm font-semibold text-yellow-200 capitalize">
              {tripType}
            </p>
            {tripType === "round" && (
              <p className="text-[11px] text-gray-500">
                Distance, time &amp; cost shown for *one-way*
              </p>
            )}
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-start gap-3 p-3 border border-gray-700 rounded-xl bg-black/30">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-700 rounded-lg bg-yellow-300/10">
            <Car className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">
              Estimated Distance
            </p>
            {/* value + (may vary) inline */}
            <p className="flex flex-wrap items-baseline gap-1 text-sm font-semibold text-yellow-200">
              <span>
                {distance.toFixed(1)} km
                {tripType === "round" && returnDistance
                  ? ` + ${returnDistance.toFixed(1)} km (return)`
                  : ""}
              </span>
              <span className="text-[11px] font-normal text-gray-400">
                (may vary)
              </span>
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start gap-3 p-3 border border-gray-700 rounded-xl bg-black/30">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-700 rounded-lg bg-yellow-300/10">
            <Timer className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">
              Estimated Duration
            </p>
            {/* value + (may vary) inline */}
            <p className="flex flex-wrap items-baseline gap-1 text-sm font-semibold text-yellow-200">
              <span>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes}m
              </span>
              <span className="text-[11px] font-normal text-gray-400">
                (may vary)
              </span>
            </p>
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-start gap-3 p-3 border border-gray-700 rounded-xl bg-black/30">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-700 rounded-lg bg-yellow-300/10">
            <BadgeIndianRupee className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">
              Estimated Cost
            </p>
            {/* value + (may vary) inline */}
            <p className="flex flex-wrap items-baseline gap-1 text-sm font-semibold text-yellow-200">
              <span>{formatRupees(cost)}</span>
              <span className="text-[11px] font-normal text-gray-400">
                (may vary)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Extra info row */}
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Notes */}
        <div className="p-3 border border-gray-700 rounded-xl bg-black/40">
          <h4 className="mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            Important Information
          </h4>
          <ul className="space-y-1 text-[12px] leading-relaxed text-gray-300">
            <li>• Rates are based on approximate distance &amp; duration.</li>
            <li>• Final fare may change depending on actual distance.</li>
            <li>• Night charges, if applicable, will be added separately.</li>
          </ul>
        </div>

        {/* Driver Bata */}
        <div className="flex items-start gap-3 p-3 border border-gray-700 rounded-xl bg-black/40">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-700 rounded-lg bg-yellow-300/10">
            <UserCheck className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Driver Bata</p>
            <p className="text-sm font-semibold text-yellow-200">₹400 / day</p>
            <p className="text-[11px] text-gray-500">
              Not included in the above cost (extra).
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-4 text-[11px] text-red-400">
        * Toll, Parking, Permit &amp; Hill Charges are not included in this
        estimate.
      </p>
    </motion.section>
  );
};

export default TripSummary;
