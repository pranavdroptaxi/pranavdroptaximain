import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Plane,
  Headphones,
  Zap,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      id: "sanitized",
      title: "Sanitized Vehicles",
      tagline: "Deep Cleaned After Every Trip",
      desc: "Fresh, hygienic interiors with vacuum cleaning, disinfected seats, and pristine air conditioning for maximum comfort.",
      icon: Sparkles,
      badge: "HYGIENE VERIFIED",
      badgeColor: "bg-taxi-yellow/20 text-taxi-yellow border-taxi-yellow/30",
      accentGlow: "from-taxi-yellow/10 to-transparent",
      borderHover: "hover:border-taxi-yellow/40",
      highlight: "Fresh linen & odor-free cabin",
    },
    {
      id: "airport",
      title: "Airport Specialists",
      tagline: "Terminal Pickups & Flight Tracking",
      desc: "Zero delay penalties. We monitor flight arrivals at Chennai (MAA), Bangalore (BLR), Coimbatore (CJB), & Madurai (IXM).",
      icon: Plane,
      badge: "FLIGHT MONITORED",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      accentGlow: "from-amber-500/10 to-transparent",
      borderHover: "hover:border-amber-500/40",
      highlight: "Doorstep pickup at arrival gate",
    },
    {
      id: "support",
      title: "24×7 Customer Support",
      tagline: "Instant Phone & WhatsApp Help",
      desc: "Round-the-clock dedicated customer care desk ready to answer booking queries, change routes, or assist mid-trip.",
      icon: Headphones,
      badge: "ALWAYS ONLINE",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      accentGlow: "from-amber-500/10 to-transparent",
      borderHover: "hover:border-amber-500/40",
      highlight: "< 30 sec response time",
    },
    {
      id: "instant",
      title: "Instant Confirmation",
      tagline: "Driver Details in 60 Seconds",
      desc: "Receive booking confirmation, vehicle number, and driver contact directly on your WhatsApp immediately after booking.",
      icon: Zap,
      badge: "EXPRESS BOOKING",
      badgeColor: "bg-taxi-yellow/20 text-taxi-yellow border-taxi-yellow/30",
      accentGlow: "from-taxi-yellow/10 to-transparent",
      borderHover: "hover:border-taxi-yellow/40",
      highlight: "SMS & WhatsApp booking receipt",
    },
    {
      id: "no-hidden",
      title: "No Hidden Charges",
      tagline: "100% Transparent Per-KM Fare",
      desc: "Pay only for one-way distance with fixed driver bata. No surprise toll add-ons, no return fare charges ever.",
      icon: ShieldCheck,
      badge: "ZERO RETURN FARE",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      accentGlow: "from-emerald-500/10 to-transparent",
      borderHover: "hover:border-emerald-500/40",
      highlight: "Itemized digital bill provided",
    },
    {
      id: "drivers",
      title: "Experienced Drivers",
      tagline: "Verified Outstation Highway Masters",
      desc: "Commercial-licensed drivers with minimum 5+ years of highway experience across South India's major routes.",
      icon: Award,
      badge: "VERIFIED DRIVERS",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      accentGlow: "from-amber-500/10 to-transparent",
      borderHover: "hover:border-amber-500/40",
      highlight: "Background verified & polite",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-neutral-950 text-white overflow-hidden border-y border-white/10">
      {/* Background Decorative Gold & Emerald Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-taxi-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-[11px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_20px_rgba(255,193,7,0.3)]"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> The Pranav Guarantee
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-4"
          >
            Why Choose <span className="gradient-text-yellow">Pranav Drop Taxi</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-400 font-medium max-w-2xl mx-auto"
          >
            Engineered for comfortable outstation travel across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh with unmatched reliability.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-[#1E293B]/70 border border-[#0F4C81]/30 ${item.borderHover} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle Card Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow group-hover:scale-110 group-hover:bg-taxi-yellow group-hover:text-black transition-all duration-300 shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 text-[9px] font-black tracking-wider uppercase border rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wider mb-1 group-hover:text-taxi-yellow transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-taxi-yellow/90 uppercase tracking-widest mb-3">
                    {item.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-gray-300 font-normal mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Highlight Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-bold text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
