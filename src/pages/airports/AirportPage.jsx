import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plane, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import BookingForm from "../../components/BookingForm";
import FAQSection from "../../components/FAQSection";
import VehicleComparisonTable from "../../components/VehicleComparisonTable";
import LiveChat from "../../components/LiveChat";
import FloatingBottomBar from "../../components/FloatingBottomBar";
import SEOHead from "../../components/SEOHead";

export const airportData = {
  "chennai-airport-taxi": {
    name: "Chennai International Airport (MAA)",
    title: "Chennai Airport Taxi Service - 24/7 Pickup & Drop",
    metaTitle: "Chennai Airport Taxi Service - Doorstep Pickups & Drops | Pranav Drop Taxi",
    metaDesc: "Book 24/7 Chennai Airport (MAA) taxi service with guaranteed zero waiting time. Affordable one-way cabs to Puducherry, Vellore, Bangalore, Trichy and all Tamil Nadu districts.",
    code: "MAA",
    city: "Chennai",
    highlights: [
      "24/7 Gate pickup & terminal drop at T1, T2 & T4",
      "Zero flight delay penalties – We track your flight status",
      "Fixed outstation rates with transparent driver bata",
      "Clean sanitized Sedan, SUV & Innova Crysta cabs",
    ],
  },
  "bangalore-airport-taxi": {
    name: "Kempegowda International Airport Bengaluru (BLR)",
    title: "Bangalore Airport Drop Taxi Service - Doorstep Pickups",
    metaTitle: "Bangalore Airport Taxi - Intercity Pickups & Drops | Pranav Drop Taxi",
    metaDesc: "Book reliable Bangalore Airport (BLR) taxi service to Chennai, Hosur, Mysore & Vellore. Professional drivers, clean cabs, instant booking.",
    code: "BLR",
    city: "Bangalore",
    highlights: [
      "Intercity transfers to Chennai, Hosur, Krishnagiri & Tamil Nadu",
      "Terminal 1 and Terminal 2 pickup assistance",
      "Flight arrival monitoring for stress-free pickups",
    ],
  },
  "coimbatore-airport-taxi": {
    name: "Coimbatore International Airport (CJB)",
    title: "Coimbatore Airport Taxi Service - Outstation Transfers",
    metaTitle: "Coimbatore Airport Taxi - One-Way & Outstation | Pranav Drop Taxi",
    metaDesc: "Book Coimbatore Airport (CJB) drop taxi to Ooty, Tiruppur, Salem & Chennai. Transparent per km rates, 24/7 service.",
    code: "CJB",
    city: "Coimbatore",
    highlights: [
      "Seamless hill station drops to Ooty, Coonoor & Valparai",
      "Direct transfers to industrial hubs in Tiruppur & Erode",
      "Professional drivers familiar with Western Ghats routes",
    ],
  },
  "madurai-airport-taxi": {
    name: "Madurai Airport (IXM)",
    title: "Madurai Airport Drop Taxi Service",
    metaTitle: "Madurai Airport Taxi Service - Doorstep Drops | Pranav Drop Taxi",
    metaDesc: "Book Madurai Airport (IXM) taxi service to Rameshwaram, Kanyakumari, Tirunelveli & Chennai. Reliable 24/7 outstation cabs.",
    code: "IXM",
    city: "Madurai",
    highlights: [
      "Direct tourist drops to Rameshwaram, Kanyakumari & Thenkasi",
      "On-time pickup for early morning & late night flights",
      "Transparent billing with no hidden surge pricing",
    ],
  },
};

export default function AirportPage() {
  const { airportSlug } = useParams();
  const rawSlug = airportSlug || "airport";
  const info = airportData[airportSlug] || {
    name: "Airport Taxi Service",
    title: "24/7 Airport Pickup & Drop Taxi Service",
    metaTitle: "Airport Taxi Service | Pranav Drop Taxi",
    metaDesc: "Reliable 24/7 airport pickup and drop taxi services across South India.",
    code: "AIRPORT",
    city: "South India",
    highlights: [
      "24/7 Doorstep airport transfers",
      "Flight monitoring",
      "Fixed per km rates",
    ],
  };

  return (
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black">
      <SEOHead
        title={info.metaTitle}
        description={info.metaDesc}
        canonicalUrl={`https://pranavdroptaxi.com/${rawSlug}`}
        imageUrl="https://pranavdroptaxi.com/images/hero_airport_pickup.png"
        breadcrumbs={[
          { name: "Airports", item: "https://pranavdroptaxi.com/#airports" },
          { name: info.name, item: `https://pranavdroptaxi.com/${rawSlug}` }
        ]}
      />

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-center bg-no-repeat bg-cover opacity-40 blur-[1px]"
          style={{ backgroundImage: "url('/images/hero_airport_pickup.png')" }}
          role="img"
          aria-label="Pranav Drop Taxi background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-radial-mesh opacity-40 pointer-events-none" />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-taxi-yellow mb-8 uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Hero Header */}
          <div className="p-8 sm:p-12 border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-taxi-yellow/10 rounded-full blur-3xl" />
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
              <Plane className="w-3.5 h-3.5" /> Airport Transfer Specialist
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              {info.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed mb-8">
              Punctual, comfortable, and safe transfers for {info.name}. We monitor flight schedules so your cab is waiting at the terminal when you land.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 text-xs font-black text-black bg-taxi-yellow rounded-full uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(255,193,7,0.3)] cursor-pointer"
              >
                Book Airport Cab Now
              </button>
              <a
                href="tel:+919884949171"
                className="px-8 py-3.5 text-xs font-bold text-white border border-white/10 rounded-full uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-taxi-yellow" /> Call Airport Desk
              </a>
            </div>
          </div>

          {/* Booking Form Integration */}
          <div className="mb-16 p-6 sm:p-10 border border-white/10 bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl" id="booking">
            <h2 className="text-2xl font-black text-center text-white uppercase tracking-wider mb-8">
              Instant <span className="text-taxi-yellow">{info.code} Airport</span> Booking
            </h2>
            <BookingForm />
          </div>

          {/* Highlights */}
          <div className="mb-16 p-8 border border-white/10 bg-white/5 rounded-3xl">
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-taxi-yellow" /> Why Choose Pranav for {info.city} Airport Transfers?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {info.highlights.map((h, i) => (
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
        </div>
      </main>

      <LiveChat />
      <FloatingBottomBar />
    </div>
  );
}
