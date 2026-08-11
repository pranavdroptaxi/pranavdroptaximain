import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export const faqList = [
  {
    question: "Is toll included?",
    answer:
      "No, toll gate fees, state permits, and parking charges are not included in the base per-kilometer fare. Tolls are paid directly as per actual receipts incurred during your trip.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes! You can cancel your cab booking completely free of charge up to 3 days before the scheduled pickup time with zero cancellation penalty.",
  },
  {
    question: "Do you provide airport pickup?",
    answer:
      "Yes! We provide dedicated 24/7 airport pickup and drop services across Chennai International Airport (MAA), Bangalore Airport (BLR), Coimbatore Airport (CJB), and Madurai Airport (IXM) with zero flight delay penalties.",
  },
  {
    question: "Is night travel available?",
    answer:
      "Yes! Our drop taxi service operates 24 hours a day, 7 days a week. We have experienced outstation drivers for safe night highway driving across South India.",
  },
  {
    question: "What is Driver Bata and how is it calculated?",
    answer:
      "Driver Bata is a fixed ₹400 charge for single-way drop trips (₹400/day for round trips) to cover outstation driver meals and duty allowances.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "None at all! We strictly charge one-way distance + driver bata. There are zero return kilometer charges.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data Schema for Google SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-black tracking-widest text-black uppercase rounded-full bg-taxi-yellow shadow-[0_0_20px_rgba(244,180,0,0.3)]">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
          Have <span className="gradient-text-yellow">Questions?</span> We Have Answers
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-xl mx-auto">
          Everything you need to know about Pranav Drop Taxi booking, fares, safety, and policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "bg-[#1E293B] border-[#0F4C81] shadow-xl shadow-black/50"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
                aria-label={`Toggle answer for: ${item.question}`}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                  {item.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "bg-taxi-yellow text-black rotate-180" : "bg-white/10 text-gray-300"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm leading-relaxed text-gray-300 font-normal border-t border-white/5 mt-2">
                  <p className="pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
