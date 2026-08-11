import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Navigation, Sparkles } from "lucide-react";

export const popularRoutesList = [
  {
    id: "chennai-to-bangalore",
    from: "Chennai",
    to: "Bangalore",
    price: 4799,
    distance: "346 KM",
    time: "6.5 Hrs",
    slug: "chennai-to-bangalore-taxi",
  },
  {
    id: "chennai-to-pondicherry",
    from: "Chennai",
    to: "Pondicherry",
    price: 2199,
    distance: "165 KM",
    time: "3.5 Hrs",
    slug: "chennai-to-pondicherry-taxi",
  },
  {
    id: "chennai-to-trichy",
    from: "Chennai",
    to: "Trichy",
    price: 3899,
    distance: "330 KM",
    time: "5.5 Hrs",
    slug: "chennai-to-trichy-taxi",
  },
  {
    id: "chennai-to-coimbatore",
    from: "Chennai",
    to: "Coimbatore",
    price: 5499,
    distance: "505 KM",
    time: "8.5 Hrs",
    slug: "chennai-to-coimbatore-taxi",
  },
  {
    id: "chennai-to-madurai",
    from: "Chennai",
    to: "Madurai",
    price: 5199,
    distance: "460 KM",
    time: "7.5 Hrs",
    slug: "chennai-to-madurai-taxi",
  },
  {
    id: "chennai-to-salem",
    from: "Chennai",
    to: "Salem",
    price: 4299,
    distance: "340 KM",
    time: "6.0 Hrs",
    slug: "chennai-to-salem-taxi",
  },
];

export default function PopularRoutes() {
  const handleQuickBook = (route) => {
    const bookingElem = document.getElementById("booking");
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-4 py-20 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
              <Sparkles className="w-3 h-3" /> High Demand Routes
            </span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
              Popular <span className="text-taxi-yellow">One-Way Routes</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-gray-400">
            Fixed transparent fares • Instant driver dispatch
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutesList.map((route) => (
            <div
              key={route.id}
              className="p-6 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md transition-all duration-300 hover:border-taxi-yellow/30 hover:bg-white/10 hover:shadow-2xl group flex flex-col justify-between"
            >
              <div>
                {/* Route Flow */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-taxi-yellow shrink-0" />
                    <span className="font-extrabold text-white text-base">{route.from}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-taxi-yellow transition-colors" />
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-taxi-yellow shrink-0" />
                    <span className="font-extrabold text-white text-base">{route.to}</span>
                  </div>
                </div>

                {/* Distance & Time Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-6 font-medium">
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/5 font-mono">
                    📏 {route.distance}
                  </span>
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/5 font-mono">
                    ⏱️ ~{route.time}
                  </span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Starting From
                  </span>
                  <span className="text-xl font-black text-taxi-yellow">
                    ₹{route.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/${route.slug}`}
                    aria-label={`View details and fares for ${route.from} to ${route.to} Taxi`}
                    className="px-3.5 py-2 text-[10px] font-bold text-gray-300 uppercase tracking-wider border border-white/10 rounded-xl hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => handleQuickBook(route)}
                    aria-label={`Book taxi ride from ${route.from} to ${route.to}`}
                    className="px-4 py-2 text-[10px] font-extrabold text-black uppercase tracking-wider bg-taxi-yellow rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-[0_0_15px_rgba(255,193,7,0.2)] cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
