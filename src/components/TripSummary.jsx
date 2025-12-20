import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Timer,
  RefreshCw,
  UserCheck,
  BadgeIndianRupee,
  Info,
  AlertCircle
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

  // Helper for consistent card styling
  const CardItem = ({ icon: Icon, label, value, subtext }) => (
    <div className="flex items-start gap-3 p-4 transition-colors border shadow-lg border-white/10 bg-white/5 rounded-2xl hover:border-taxi-yellow/30 hover:bg-white/10">
      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-taxi-yellow/10 text-taxi-yellow">
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">{label}</p>
        <p className="text-sm font-bold text-white capitalize">{value}</p>
        {subtext && <p className="text-[10px] text-gray-500 font-medium">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <motion.section
      aria-label="Trip Summary"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-8 overflow-hidden border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-white/10"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <h3 className="text-lg font-extrabold text-white">
          Trip <span className="text-taxi-yellow">Summary</span>
        </h3>
        <span className="px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider bg-taxi-yellow rounded-full shadow-[0_0_10px_rgba(255,193,7,0.4)]">
          Instant Estimate
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <CardItem 
            icon={RefreshCw} 
            label="Trip Type" 
            value={tripType} 
            subtext={tripType === "round" ? "Distance, time & cost shown for *one-way*" : null}
          />

          <CardItem 
            icon={Car} 
            label="Est. Distance" 
            value={
              <>
                {distance.toFixed(1)} km
                {tripType === "round" && returnDistance ? ` + ${returnDistance.toFixed(1)} km` : ""}
              </>
            } 
            subtext="(Approximated)"
          />

          <CardItem 
            icon={Timer} 
            label="Est. Duration" 
            value={
              <>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes}m
              </>
            }
            subtext="(Traffic dependent)"
          />

          <div className="flex items-start gap-3 p-4 transition-colors border shadow-lg border-taxi-yellow/30 bg-taxi-yellow/5 rounded-2xl">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-taxi-yellow text-black shadow-[0_0_10px_rgba(255,193,7,0.3)]">
                <BadgeIndianRupee className="w-5 h-5" />
            </div>
            <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider uppercase text-taxi-yellow">Est. Cost</p>
                <p className="text-lg font-extrabold text-white">{formatRupees(cost)}</p>
                <p className="text-[10px] text-gray-400 font-medium">(Base Fare)</p>
            </div>
          </div>

        </div>

        {/* Extra Info Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            
            {/* Driver Bata */}
            <div className="flex items-center gap-3 p-4 border border-white/10 rounded-2xl bg-white/5">
                <div className="p-2 rounded-full bg-white/10 text-taxi-yellow">
                    <UserCheck className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Driver Bata</p>
                    <p className="text-sm font-bold text-white">₹400 <span className="text-xs font-normal text-gray-500">/ day (Extra)</span></p>
                </div>
            </div>

            {/* Important Info */}
            <div className="col-span-1 p-4 border sm:col-span-2 border-white/10 rounded-2xl bg-white/5">
                <h4 className="flex items-center gap-2 mb-2 text-xs font-bold tracking-wider uppercase text-taxi-yellow">
                    <Info className="w-3 h-3" /> Important Information
                </h4>
                <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                    <li>Rates are based on approximate distance & duration.</li>
                    <li>Final fare may change depending on actual distance.</li>
                    <li>Night charges (if applicable) are added separately.</li>
                </ul>
            </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-start gap-2 p-3 text-xs text-red-300 border border-red-500/20 bg-red-500/10 rounded-xl">
            <AlertCircle className="flex-shrink-0 w-4 h-4 mt-0.5" />
            <p>
                <span className="font-bold">Note:</span> Toll, Parking, Permit & Hill Charges are <span className="underline decoration-red-400/50">not included</span> in this estimate and must be paid by the customer.
            </p>
        </div>
      </div>
    </motion.section>
  );
};

export default TripSummary;