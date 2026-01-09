import React from "react";
import {
  Users,
  UsersRound,
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
import { Helmet } from "react-helmet";

/* ================================
   SEO ONLY – NO SCHEMA
================================ */
const FleetSEO = () => (
  <Helmet>
    <meta
      name="description"
      content="Explore Pranav Drop Taxi’s fleet including Sedan, Etios, SUV, Innova, and Innova Crysta. Affordable per km rates for one-way and outstation taxi services from Chennai across Tamil Nadu, Bangalore, and South India."
    />

    <meta
      name="keywords"
      content="
        taxi fleet chennai,
        sedan taxi chennai,
        etios drop taxi,
        suv taxi tamil nadu,
        innova taxi chennai,
        innova crysta rental chennai,
        one way taxi per km rate,
        outstation cab fleet,
        pranav drop taxi vehicles,
        best taxi service chennai
      "
    />

    <link rel="canonical" href="https://pranavdroptaxi.com/fleet" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Pranav Drop Taxi" />
    <meta property="og:url" content="https://pranavdroptaxi.com/fleet" />
    <meta
      property="og:description"
      content="View our taxi fleet with transparent per km pricing. Choose from Sedan, SUV, Innova, and Innova Crysta for one-way and outstation travel."
    />
    <meta property="og:image" content="https://pranavdroptaxi.com/taxi.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:description"
      content="Browse Pranav Drop Taxi’s fleet and book the best vehicle for your one-way or outstation journey."
    />
    <meta name="twitter:image" content="https://pranavdroptaxi.com/taxi.jpg" />
  </Helmet>
);

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
    },
  ];

  return (
    <section className="px-4 py-16 text-white bg-transparent sm:py-20">
      <FleetSEO />

      <h2 className="mb-10 text-3xl font-extrabold text-center text-white sm:text-5xl drop-shadow-lg">
        Our <span className="text-taxi-yellow">Fleet</span>
      </h2>

      {/* Fleet Cards */}
      <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map((car, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative p-6 overflow-hidden border shadow-2xl bg-black/30 backdrop-blur-md rounded-3xl border-white/10 hover:border-taxi-yellow/50"
          >
            <div className="flex items-center justify-center p-4 mb-6 rounded-2xl bg-white/5">
              <img
                src={car.img}
                alt={`${car.name} taxi`}
                className="object-contain w-full h-32"
                loading="lazy"
              />
            </div>

            <h3 className="mb-2 text-2xl font-bold text-center text-white">
              {car.name}
            </h3>

            <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-400">
              <span>{car.passengers} Passengers</span>
              <span>{car.bags} Bags</span>
            </div>

            <div className="mb-6 space-y-2">
              {car.features.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <item.icon className="w-4 h-4 text-taxi-yellow" />
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
                href="tel:+918778143908"
                className="flex items-center justify-center w-full gap-2 py-3 text-sm font-bold text-black transition-all rounded-xl bg-taxi-yellow hover:bg-white"
              >
                <PhoneCall className="w-4 h-4" /> Book Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
