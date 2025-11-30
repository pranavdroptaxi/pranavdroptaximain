import {
  Users,
  UsersRound,
  Briefcase,
  PhoneCall,
  CheckCircle,
  Car,
  Sparkles,
  Gauge,
  Sofa,
  MountainSnow,
  Crown,
} from "lucide-react";

import { motion } from "framer-motion";

export default function OurFleet() {
  const fleet = [
    {
      name: "Sedan",
      icon: Car,
      img: "/images/sedan.png",
      passengers: "4 Passengers",
      bags: "2 Bags",
      features: [
        { text: "Best for small families", icon: Users },
        { text: "Budget friendly", icon: Gauge },
        { text: "Smooth long rides", icon: Car },
        { text: "Comfortable seating", icon: Sparkles },
      ],
      pricing: { oneway: 14, roundtrip: 13 },
      minKm: { oneway: 150, roundtrip: 250 },
    },
    {
      name: "Etios",
      icon: Car,
      img: "/images/sedan.png",
      passengers: "4 Passengers",
      bags: "2 Bags",
      features: [
        { text: "Budget friendly", icon: Users },
        { text: "Comfortable seating", icon: Car },
        { text: "Smooth long rides", icon: Sparkles },
        { text: "Reliable for tours", icon: CheckCircle },
      ],
      pricing: { oneway: 14, roundtrip: 13 },
      minKm: { oneway: 150, roundtrip: 250 },
    },
    {
      name: "SUV",
      icon: Gauge,
      img: "/images/muv.png",
      passengers: "6 – 7 Passengers",
      bags: "4 Bags",
      features: [
        { text: "Premium comfort", icon: Sparkles },
        { text: "Perfect for hills", icon: Car },
        { text: "Smoothest long rides", icon: Gauge },
        { text: "Luxury family travel", icon: CheckCircle },
      ],
      pricing: { oneway: 19, roundtrip: 18 },
      minKm: { oneway: 150, roundtrip: 250 },
    },
    {
      name: "Innova",
      icon: UsersRound,
      img: "/images/innova.png",
      passengers: "7 – 8 Passengers",
      bags: "3 Bags",
      features: [
        { text: "Comfortable seating", icon: Sofa },
        { text: "Great for hill drives", icon: MountainSnow },
        { text: "Smooth long-drive ride", icon: Gauge },
        { text: "Ideal for families", icon: UsersRound },
      ],
      pricing: { oneway: 20, roundtrip: 18 },
      minKm: { oneway: 150, roundtrip: 250 },
    },
    {
      name: "Innova Crysta",
      icon: Crown,
      img: "/images/innova.png",
      passengers: "7 – 8 Passengers",
      bags: "3 Bags",
      features: [
        { text: "Luxury interiors", icon: Sparkles },
        { text: "Powerful hill performance", icon: MountainSnow },
        { text: "Superior suspension", icon: Gauge },
        { text: "Premium family choice", icon: Crown },
      ],
      pricing: { oneway: 25, roundtrip: 23 },
      minKm: { oneway: 150, roundtrip: 250 },
    },
  ];

  return (
    <section className="px-4 py-16 text-white bg-transparent sm:py-20">
      <h2 className="mb-10 text-3xl font-bold text-center text-yellow-300 sm:text-4xl">
        Our Fleet
      </h2>

      {/* Comparison Table (Icons Instead of Images) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto mb-12 overflow-x-auto bg-transparent border border-gray-700 rounded-2xl backdrop-blur-sm"
      >
        <table className="w-full text-sm text-left text-gray-300 border-separate border-spacing-y-2">

          <thead className="text-yellow-300 bg-gray-800/30">
            <tr>
              <th className="p-3">Vehicle Type</th>
              <th className="p-3">Passengers</th>
              <th className="p-3">Bags</th>
              <th className="p-3">One Way</th>
              <th className="p-3">Round Trip</th>
            </tr>
          </thead>

          <tbody>
            {fleet.map((car, idx) => (
              <tr key={idx} className="border-t border-gray-700">

                {/* Icon + Name */}
                <td className="flex items-center gap-3 p-3 font-semibold text-yellow-300">
                  <car.icon className="w-8 h-8 p-1 text-yellow-300 border border-gray-700 rounded-lg bg-black/20" />
                  {car.name}
                </td>

                <td className="p-3">{car.passengers}</td>
                <td className="p-3">{car.bags}</td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-semibold text-black bg-yellow-300 rounded-lg">
                    ₹{car.pricing.oneway}/km
                  </span>
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-semibold text-black bg-yellow-300 rounded-lg">
                    ₹{car.pricing.roundtrip}/km
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </motion.div>

      {/* Fleet Cards (Images kept here for good UI look) */}
      <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-3">
        {fleet.map((car, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, translateY: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-6 transition bg-transparent border border-gray-700 shadow-lg rounded-2xl backdrop-blur-sm hover:border-yellow-300 hover:shadow-yellow-300/20"
          >
            <img
              src={car.img}
              alt={car.name}
              className="object-contain w-full h-40 mb-4"
            />

            <h3 className="mb-3 text-2xl font-semibold text-center text-yellow-300">
              {car.name}
            </h3>

            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-300" />
                <span>{car.passengers}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-yellow-300" />
                <span>{car.bags}</span>
              </div>
            </div>

            <h4 className="mb-2 text-sm font-semibold text-yellow-300">
              Features:
            </h4>

            <ul className="mb-4 space-y-2 text-sm">
              {car.features.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-yellow-300" />
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="mt-4 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-yellow-300">One Way:</span>{" "}
                ₹{car.pricing.oneway}/km (Min {car.minKm.oneway} km)
              </p>
              <p>
                <span className="font-semibold text-yellow-300">Round Trip:</span>{" "}
                ₹{car.pricing.roundtrip}/km (Min {car.minKm.roundtrip} km)
              </p>
            </div>

            <a
              href="tel:9884609789"
              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 font-semibold text-black transition bg-yellow-300 rounded-xl hover:bg-yellow-400"
            >
              <PhoneCall className="w-5 h-5" /> Call Now
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
