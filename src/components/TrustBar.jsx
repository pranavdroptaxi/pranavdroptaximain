import React from "react";
import { ShieldCheck, MapPin, Sparkles, Clock, BadgePercent } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    { icon: ShieldCheck, title: "Verified Drivers", desc: "Background Checked" },
    { icon: MapPin, title: "GPS Tracking", desc: "Live Location Safety" },
    { icon: Sparkles, title: "Sanitized Cars", desc: "Clean & Fresh Cab" },
    { icon: Clock, title: "24×7 Support", desc: "Instant Dispatch" },
    { icon: BadgePercent, title: "No Hidden Charges", desc: "Transparent Billing" },
  ];

  return (
    <div className="w-full py-8 my-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center p-2">
                <div className="w-12 h-12 mb-3 rounded-2xl flex items-center justify-center text-taxi-yellow">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">
                  ✔ {item.title}
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
