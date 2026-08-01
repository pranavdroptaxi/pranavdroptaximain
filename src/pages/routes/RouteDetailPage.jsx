import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import BookingForm from "../../components/BookingForm";
import FAQSection from "../../components/FAQSection";
import VehicleComparisonTable from "../../components/VehicleComparisonTable";
import { popularRoutesList } from "../../components/PopularRoutes";
import LiveChat from "../../components/LiveChat";
import FloatingBottomBar from "../../components/FloatingBottomBar";

export const routeDetailsData = {
  "chennai-to-bangalore-taxi": {
    title: "Chennai to Bangalore One-Way Drop Taxi",
    metaTitle: "Chennai to Bangalore Taxi - Instant Fare ₹4,799 | Pranav Drop Taxi",
    metaDesc: "Book reliable Chennai to Bangalore one way taxi starting at ₹4,799. 346 KM driving distance, 6.5 hours travel time. Clean sedan, SUV & Innova available 24/7 with zero return charges.",
    from: "Chennai",
    to: "Bangalore",
    distance: "346 KM",
    time: "6.5 Hours",
    minFare: 4799,
    highlights: [
      "No return fare charges – Pay strictly for Chennai → Bangalore",
      "Doorstep pickup anywhere in Chennai & drop anywhere in Bengaluru",
      "Safe driving via NH44 highway with planned refreshment stops",
      "Transparent bill with breakdown of distance and driver bata",
    ],
  },
  "chennai-to-trichy-taxi": {
    title: "Chennai to Trichy One-Way Drop Taxi",
    metaTitle: "Chennai to Trichy Drop Taxi - Fare from ₹3,899 | Pranav Drop Taxi",
    metaDesc: "Cheapest Chennai to Trichy drop taxi service. Distance 330 KM, ~5.5 hours via NH38. Clean cabs with professional outstation drivers available 24 hours.",
    from: "Chennai",
    to: "Trichy (Tiruchirappalli)",
    distance: "330 KM",
    time: "5.5 Hours",
    minFare: 3899,
    highlights: [
      "Direct drop to Srirangam, Rockfort, airport or residential areas",
      "On-time pickup from Chennai Central, Egmore, or Chennai Airport",
      "Fixed rate starting from ₹14/km for Sedans",
    ],
  },
  "chennai-to-coimbatore-taxi": {
    title: "Chennai to Coimbatore One-Way Drop Taxi",
    metaTitle: "Chennai to Coimbatore Taxi - Fare from ₹5,499 | Pranav Drop Taxi",
    metaDesc: "Book Chennai to Coimbatore one-way taxi for ₹5,499. Distance 505 KM, 8.5 hours. Comfortable Sedans, SUVs, and Innova Crysta with experienced drivers.",
    from: "Chennai",
    to: "Coimbatore",
    distance: "505 KM",
    time: "8.5 Hours",
    minFare: 5499,
    highlights: [
      "Comfortable long-distance ride with spacious air-conditioned cabs",
      "Drops to Gandhipuram, Peelamedu, Railway Station, or Airport",
      "Driver bata included in transparent fare calculations",
    ],
  },
  "chennai-to-madurai-taxi": {
    title: "Chennai to Madurai One-Way Drop Taxi",
    metaTitle: "Chennai to Madurai Drop Taxi - Fare from ₹5,199 | Pranav Drop Taxi",
    metaDesc: "Affordable Chennai to Madurai drop taxi service starting at ₹5,199. 460 KM distance. Reliable outstation cabs for temple trips & family travel.",
    from: "Chennai",
    to: "Madurai",
    distance: "460 KM",
    time: "7.5 Hours",
    minFare: 5199,
    highlights: [
      "Express Highway trip via NH44",
      "Drop to Meenakshi Temple, Mattuthavani, or Madurai Airport",
      "24/7 customer service and live driver tracking",
    ],
  },
  "chennai-to-pondicherry-taxi": {
    title: "Chennai to Pondicherry One-Way Drop Taxi",
    metaTitle: "Chennai to Pondicherry Taxi - Fare from ₹2,199 | Pranav Drop Taxi",
    metaDesc: "Book Chennai to Pondicherry one-way drop taxi starting from ₹2,199. 165 KM distance via ECR / OMR. Enjoy coastal views and comfortable travel.",
    from: "Chennai",
    to: "Pondicherry",
    distance: "165 KM",
    time: "3.5 Hours",
    minFare: 2199,
    highlights: [
      "Scenic ride along East Coast Road (ECR)",
      "Drop off at White Town, Auroville, Promenade Beach, or hotels",
      "Quick 3.5 hour weekend gateway transport",
    ],
  },
};

export default function RouteDetailPage() {
  const { routeSlug } = useParams();
  const rawSlug = routeSlug || "outstation";
  const cleanTitle = rawSlug
    .replace(/-taxi$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const routeInfo = routeDetailsData[routeSlug] || {
    title: `${cleanTitle} One-Way Drop Taxi`,
    metaTitle: `${cleanTitle} Drop Taxi | Pranav Drop Taxi`,
    metaDesc: `Book one-way and outstation drop taxi for ${cleanTitle}. Safe drivers, best rates per km.`,
    from: cleanTitle.split(" To ")[0] || "Chennai",
    to: cleanTitle.split(" To ")[1] || "Outstation",
    distance: "300 KM",
    time: "5.0 Hours",
    minFare: 4200,
    highlights: [
      "No return charges – Pay only one-way",
      "Clean sanitized Sedan, SUV & Innova cars",
      "Professional outstation drivers",
    ],
  };

  return (
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black">
      <Helmet>
        <title>{routeInfo.metaTitle}</title>
        <meta name="description" content={routeInfo.metaDesc} />
        <link rel="canonical" href={`https://pranavdroptaxi.com/${rawSlug}`} />
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

          {/* Hero Header */}
          <div className="p-8 sm:p-12 border border-white/10 shadow-2xl bg-black/80 backdrop-blur-2xl rounded-3xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-taxi-yellow/10 rounded-full blur-3xl" />
            <span className="inline-block px-3.5 py-1 mb-4 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
              Verified Route
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              {routeInfo.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed mb-8">
              Pay only for one-way distance from {routeInfo.from} to {routeInfo.to}. No return km charges, transparent pricing, and 24/7 doorstep pickup.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black transition-all rounded-full bg-taxi-yellow hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(255,193,7,0.3)] cursor-pointer"
              >
                Book This Ride
              </button>

              <a
                href="tel:+919884949171"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black"
              >
                Call Desk
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-black/60 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Distance</span>
                <span className="text-xl font-black text-white font-mono">{routeInfo.distance}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Est. Time</span>
                <span className="text-xl font-black text-white font-mono">{routeInfo.time}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Starting Fare</span>
                <span className="text-xl font-black text-taxi-yellow font-mono">₹{routeInfo.minFare.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Driver Bata</span>
                <span className="text-xl font-black text-green-400 font-mono">₹400</span>
              </div>
            </div>
          </div>

          {/* Booking Form Integration */}
          <div className="mb-16 p-6 sm:p-10 border border-white/10 bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl" id="booking">
            <h2 className="text-2xl font-black text-center text-white uppercase tracking-wider mb-8">
              Book <span className="text-taxi-yellow">{routeInfo.from} → {routeInfo.to}</span> Ride
            </h2>
            <BookingForm />
          </div>

          {/* Highlights */}
          <div className="mb-16 p-8 border border-white/10 bg-white/5 rounded-3xl">
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-taxi-yellow" /> Why Travel {routeInfo.from} to {routeInfo.to} with Pranav Taxi?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {routeInfo.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-taxi-yellow shrink-0" />
                  <span className="text-sm font-semibold text-gray-200">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Matrix */}
          <VehicleComparisonTable />

          {/* FAQ */}
          <FAQSection />

          {/* Related Routes */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider mb-6">
              Other Popular Routes from {routeInfo.from}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularRoutesList
                .filter((r) => r.slug !== routeSlug)
                .slice(0, 4)
                .map((r) => (
                  <Link
                    key={r.id}
                    to={`/${r.slug}`}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-taxi-yellow transition-all flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-white uppercase">{r.from} → {r.to}</span>
                    <span className="text-sm font-extrabold text-taxi-yellow mt-2">From ₹{r.price}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <LiveChat />
      <FloatingBottomBar />
    </div>
  );
}
