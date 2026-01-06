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
import { Helmet } from "react-helmet"; // 1. Import Helmet

export default function OurFleet() {
  const fleet = [
    {
      name: "Sedan",
      icon: Car,
      img: "/images/sedan.png",
      passengers: "4 + 1",
      bags: "2",
      features: [
        { text: "Best for small families", icon: Users },
        { text: "Budget friendly", icon: Gauge },
        { text: "Smooth long rides", icon: Car },
        { text: "Comfortable seating", icon: Sparkles },
      ],
      pricing: { oneway: 14, roundtrip: 13 },
      minKm: { oneway: 130, roundtrip: 250 },
    },
    {
      name: "Etios",
      icon: Car,
      img: "/images/sedan.png",
      passengers: "4 + 1",
      bags: "2",
      features: [
        { text: "Budget friendly", icon: Users },
        { text: "Comfortable seating", icon: Car },
        { text: "Smooth long rides", icon: Sparkles },
        { text: "Reliable for tours", icon: CheckCircle },
      ],
      pricing: { oneway: 14, roundtrip: 13 },
      minKm: { oneway: 130, roundtrip: 250 },
    },
    {
      name: "SUV",
      icon: Gauge,
      img: "/images/muv.png",
      passengers: "7 + 1",
      bags: "4",
      features: [
        { text: "Premium comfort", icon: Sparkles },
        { text: "Perfect for hills", icon: Car },
        { text: "Smoothest long rides", icon: Gauge },
        { text: "Luxury family travel", icon: CheckCircle },
      ],
      pricing: { oneway: 19, roundtrip: 18 },
      minKm: { oneway: 130, roundtrip: 250 },
    },
    {
      name: "Innova",
      icon: UsersRound,
      img: "/images/innova.png",
      passengers: "7 + 1",
      bags: "3",
      features: [
        { text: "Comfortable seating", icon: Sofa },
        { text: "Great for hill drives", icon: MountainSnow },
        { text: "Smooth long-drive ride", icon: Gauge },
        { text: "Ideal for families", icon: UsersRound },
      ],
      pricing: { oneway: 20, roundtrip: 18 },
      minKm: { oneway: 130, roundtrip: 250 },
    },
    {
      name: "Innova Crysta",
      icon: Crown,
      img: "/images/innova.png",
      passengers: "7 + 1",
      bags: "3",
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

  // 2. Generate Structured Data for the Fleet
  const fleetSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": fleet.map((car, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `${car.name} - Pranav Drop Taxi`,
        "image": `https://pranavdroptaxi.com${car.img}`,
        "description": `Book a ${car.name} for ${car.passengers} passengers. Ideal for ${car.features[0].text}.`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": car.pricing.oneway,
          "description": "Price per kilometer for one-way trips"
        }
      }
    }))
  };

  return (
    <section className="px-4 py-16 text-white bg-transparent sm:py-20">
      {/* --- SEO HEADER --- */}
      <Helmet>
        <title>Our Fleet | Sedan, SUV & Innova Crysta | Pranav Drop Taxi</title>
        <meta name="description" content="Explore our wide range of vehicles: Sedans, SUVs, and Innova Crysta. Best rates per km for one-way and round trips in Chennai and Tamil Nadu." />
        <meta name="keywords" content="taxi fleet chennai, innova crysta rental chennai, sedan drop taxi, suv taxi tamilnadu, innova per km rate, pranav drop taxi fleet" />
        <link rel="canonical" href="https://pranavdroptaxi.com/fleet" />
        
        {/* OG Tags */}
        <meta property="og:title" content="Our Fleet - Choose Your Perfect Ride | Pranav Drop Taxi" />
        <meta property="og:description" content="From budget-friendly Sedans to luxury Innova Crysta, view our fleet and transparent pricing per KM." />
        <meta property="og:url" content="https://pranavdroptaxi.com/fleet" />
        
        <script type="application/ld+json">
          {JSON.stringify(fleetSchema)}
        </script>
      </Helmet>

      <h2 className="mb-10 text-3xl font-extrabold text-center text-white sm:text-5xl drop-shadow-lg">
        Our <span className="text-taxi-yellow">Fleet</span>
      </h2>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16 overflow-hidden border shadow-2xl bg-black/30 backdrop-blur-md rounded-3xl border-white/10"
      >
        <table className="w-full text-left text-gray-300 border-separate border-spacing-0">
          <thead>
            <tr className="text-[10px] sm:text-sm font-bold tracking-wider text-taxi-yellow uppercase bg-white/5">
              <th className="p-2 border-b sm:p-5 border-white/10">Vehicle</th>
              <th className="hidden p-5 border-b sm:table-cell border-white/10">Passengers</th>
              <th className="hidden p-5 border-b sm:table-cell border-white/10">Bags</th>
              <th className="p-2 border-b sm:hidden border-white/10">Capacity</th>
              <th className="p-2 border-b sm:p-5 border-white/10">One Way</th>
              <th className="p-2 border-b sm:p-5 border-white/10">Round Trip</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((car, idx) => (
              <tr key={idx} className="text-[10px] sm:text-sm transition-colors hover:bg-white/5">
                <td className="p-2 font-bold text-white border-b sm:p-5 border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="items-center justify-center hidden w-10 h-10 rounded-full sm:flex bg-taxi-yellow/10 text-taxi-yellow">
                      <car.icon className="w-5 h-5" />
                    </div>
                    <span>{car.name}</span>
                  </div>
                </td>
                <td className="hidden p-5 border-b sm:table-cell border-white/10">{car.passengers}</td>
                <td className="hidden p-5 border-b sm:table-cell border-white/10">{car.bags}</td>
                <td className="p-2 border-b sm:hidden border-white/10">
                    <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3 text-gray-500"/> {car.passengers}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-gray-500"/> {car.bags}</span>
                    </div>
                </td>
                <td className="p-2 border-b sm:p-5 border-white/10">
                  <span className="px-2 py-1 font-bold text-black rounded sm:px-3 sm:rounded-full bg-taxi-yellow">
                    ₹{car.pricing.oneway}
                  </span>
                  <span className="ml-1 text-gray-500">/km</span>
                </td>
                <td className="p-2 border-b sm:p-5 border-white/10">
                  <span className="px-2 py-1 font-bold text-black rounded sm:px-3 sm:rounded-full bg-taxi-yellow">
                    ₹{car.pricing.roundtrip}
                  </span>
                  <span className="ml-1 text-gray-500">/km</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Fleet Cards */}
      <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map((car, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="relative p-6 overflow-hidden border shadow-2xl bg-black/30 backdrop-blur-md rounded-3xl border-white/10 group hover:border-taxi-yellow/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 transition-opacity duration-500 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 bg-taxi-yellow blur-3xl group-hover:opacity-20" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-center p-4 mb-6 rounded-2xl bg-white/5">
                    <img
                    src={car.img}
                    alt={`${car.name} vehicle - Pranav Drop Taxi`}
                    className="object-contain w-full h-32 transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-center text-white transition-colors group-hover:text-taxi-yellow">
                {car.name}
                </h3>

                <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-taxi-yellow" />
                        <span>{car.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-taxi-yellow" />
                        <span>{car.bags} Bags</span>
                    </div>
                </div>

                <div className="mb-6 space-y-3">
                    {car.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <div className="p-1 rounded-full bg-taxi-yellow/10 text-taxi-yellow">
                                <item.icon className="w-3 h-3" />
                            </div>
                            {item.text}
                        </div>
                    ))}
                </div>

                <div className="pt-6 mt-auto border-t border-white/10">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-400">One Way</span>
                        <span className="font-bold text-white">₹{car.pricing.oneway}/km</span>
                    </div>
                    <div className="flex justify-between mb-6 text-sm">
                        <span className="text-gray-400">Round Trip</span>
                        <span className="font-bold text-white">₹{car.pricing.roundtrip}/km</span>
                    </div>

                    <a
                    href="tel:9884609789"
                    className="flex items-center justify-center w-full gap-2 py-3 text-sm font-bold text-black transition-all transform rounded-xl bg-taxi-yellow hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,193,7,0.3)]"
                    >
                    <PhoneCall className="w-4 h-4" /> Book Now
                    </a>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}