import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BookOpen, ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import LiveChat from "../../components/LiveChat";

export const blogPostsData = [
  {
    id: "chennai-to-bangalore-taxi-fare",
    title: "Chennai to Bangalore Taxi Fare Guide 2026: One-Way vs Round Trip Rates",
    slug: "chennai-to-bangalore-taxi-fare",
    category: "Fare Breakdown",
    readTime: "4 min read",
    date: "Aug 1, 2026",
    author: "Pranav Travel Team",
    excerpt:
      "Planning a road trip from Chennai to Bangalore? Learn complete toll costs, per kilometer vehicle rates, distance metrics, and why one-way drop taxis save up to 40%.",
    content: `
      ## Chennai to Bangalore Travel Overview
      Traveling between Chennai and Bengaluru is one of the busiest highway corridors in South India. Covering approximately 346 kilometers via National Highway 44 (NH44) or NH48, the journey takes around 6.5 hours depending on traffic and toll clearance.

      ### Vehicle Fare Breakdown
      - **Sedan (Etios / Dzire)**: ₹14/km (Total ~₹4,844 for 346 KM)
      - **SUV (Ertiga / MUV)**: ₹19/km (Total ~₹6,574 for 346 KM)
      - **Innova (7 Seater)**: ₹20/km (Total ~₹6,920 for 346 KM)
      - **Innova Crysta**: ₹25/km (Total ~₹8,650 for 346 KM)

      ### Driver Bata & Toll Charges
      A flat driver bata of ₹400 applies for single drop trips. Toll gate charges across the route total around ₹520 and are paid as per actual FASTag receipts.

      ### Why Choose One-Way Drop Taxi over Round Trip?
      Traditional taxi operators charge for 700 KM (up and down distance) even if you only need a drop in Bangalore. With Pranav Drop Taxi, you pay strictly for 346 KM, saving over ₹4,000 on a single trip!
    `,
  },
  {
    id: "best-time-to-travel-to-ooty",
    title: "Best Time to Travel to Ooty: Weather, Routes & Outstation Taxi Tips",
    slug: "best-time-to-travel-to-ooty",
    category: "Travel Guide",
    readTime: "5 min read",
    date: "Jul 28, 2026",
    author: "Pranav Travel Team",
    excerpt:
      "Discover the ideal season to visit Ooty, hairpin curve driving advice, scenic routes from Coimbatore & Chennai, and how to book outstation cabs with experienced mountain drivers.",
    content: `
      ## The Queen of Hill Stations
      Ooty (Udhagamandalam) nestled in the Nilgiri Hills is Tamil Nadu’s premier hill resort. Situated at 2,240 meters above sea level, driving to Ooty offers breathtaking tea garden landscapes and misty mountain passes.

      ### Best Months to Visit
      - **Peak Season (October to May)**: Cool, pleasant weather ideal for sightseeing, botanical gardens, and boat rides on Ooty Lake.
      - **Monsoon (June to September)**: Lush greenery, misty hills, but driving requires expert hill-certified drivers due to hairpin curves.

      ### Scenic Driving Routes
      1. **Coimbatore to Ooty (86 KM / ~3 Hrs)**: Via Mettupalayam and Coonoor with 36 hairpin bends.
      2. **Chennai to Ooty (555 KM / ~10.5 Hrs)**: Via Salem and Avinashi highway.

      ### Mountain Taxi Tips
      When hiring a taxi for hill station trips, ensure the vehicle is in peak mechanical condition with an experienced hill driver. Pranav Drop Taxi provides mountain-certified drivers with hill station charge of just ₹300.
    `,
  },
  {
    id: "one-way-taxi-vs-round-trip",
    title: "One-Way Taxi vs Round Trip: Which Saves More Money?",
    slug: "one-way-taxi-vs-round-trip",
    category: "Cost Comparison",
    readTime: "3 min read",
    date: "Jul 20, 2026",
    author: "Pranav Travel Team",
    excerpt:
      "Uncover how traditional round-trip billing works versus true one-way drop taxis. Stop paying for return empty mileage and save up to 50% on intercity cabs.",
    content: `
      ## Demystifying Outstation Taxi Pricing
      For decades, intercity travel required paying for up-and-down mileage. If you traveled 300 KM to your destination, operators billed you for 600 KM plus 2 days of driver bata.

      ### The One-Way Revolution
      Pranav Drop Taxi changed this model by matching intercity routes across Tamil Nadu, Puducherry, and Karnataka. 

      ### Price Comparison Matrix
      - **Chennai to Pondicherry (165 KM)**:
        - *Traditional Round Trip*: 330 KM × ₹13 = ₹4,290 + ₹800 Bata = **₹5,090**
        - *Pranav One-Way*: 165 KM × ₹14 = ₹2,310 + ₹400 Bata = **₹2,710** (Save ~₹2,380!)

      ### When to Choose Which Option?
      - **Choose One-Way**: If you are relocating, staying multiple days, catching a flight, or returning via train/flight.
      - **Choose Round Trip**: If you are making a same-day return trip or multi-city tourist circuit.
    `,
  },
  {
    id: "airport-travel-guide",
    title: "South India Airport Travel Guide: Stress-Free Pickups & Drops",
    slug: "airport-travel-guide",
    category: "Airport Tips",
    readTime: "4 min read",
    date: "Jul 15, 2026",
    author: "Pranav Travel Team",
    excerpt:
      "Essential guide for smooth airport transfers at Chennai (MAA), Bangalore (BLR), and Coimbatore (CJB). Flight tracking, luggage capacity, and doorstep pickups.",
    content: `
      ## Seamless Airport Connections
      Catching a flight or arriving after a long journey requires punctual, hassle-free transportation. Here are expert tips for airport transfers in South India.

      ### Essential Airport Transfer Advice
      1. **Buffer Time**: Always schedule your pickup at least 3.5 hours prior to domestic flight departure and 4.5 hours for international flights.
      2. **Flight Tracking**: Provide your flight number when booking so your cab driver monitors delays and adjusts terminal pickup time automatically.
      3. **Luggage Selection**:
         - *Sedan (Etios/Dzire)*: Fits 2 large suitcases + 2 cabin bags.
         - *SUV/Innova*: Fits 4-5 large suitcases effortlessly.

      ### 24/7 Airport Support
      Pranav Drop Taxi operates round the clock with zero night surcharges. Call our 24/7 airport desk at +91 98849 49171 for doorstep pickups.
    `,
  },
];

export default function BlogList() {
  return (
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black">
      <Helmet>
        <title>Taxi & Travel Blog - Outstation Travel Tips & Fares | Pranav Drop Taxi</title>
        <meta
          name="description"
          content="Read latest outstation taxi fare guides, travel tips for Ooty, Chennai to Bangalore rates, and airport transfer guides from Pranav Drop Taxi."
        />
        <link rel="canonical" href="https://pranavdroptaxi.com/blog" />
      </Helmet>

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-center bg-no-repeat bg-cover opacity-40 blur-[1px]"
          style={{ backgroundImage: "url('/taxi.webp')" }}
          role="img"
          aria-label="Pranav Drop Taxi background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40 pointer-events-none" />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-taxi-yellow mb-8 uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
              <BookOpen className="w-3 h-3" /> Travel & Taxi Insights
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-wider">
              Pranav Taxi <span className="text-taxi-yellow">Blog</span>
            </h1>
            <p className="mt-4 text-sm font-medium text-gray-400 max-w-xl mx-auto">
              Expert outstation travel guides, route fare comparisons, and intercity travel tips for South India.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {blogPostsData.map((post) => (
              <div
                key={post.id}
                className="p-8 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:border-taxi-yellow/40 hover:bg-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 text-[9px] font-black text-black bg-taxi-yellow rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-white uppercase tracking-wider mb-3 group-hover:text-taxi-yellow transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-taxi-yellow" /> {post.date}
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-taxi-yellow uppercase tracking-wider hover:text-white transition-colors"
                  >
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
