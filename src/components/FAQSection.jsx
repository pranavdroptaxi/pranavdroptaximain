import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet";

export const faqList = [
  {
    question: "Is toll included in the fare?",
    answer:
      "No, toll gate fees, state permits, and parking charges are not included in the base km rate. They are payable directly as per actual receipts incurred during your trip.",
  },
  {
    question: "Is GST extra on taxi bookings?",
    answer:
      "GST is charged as per government norms if official tax invoices are requested. Standard transparent billing applies to all drop trips without hidden fees.",
  },
  {
    question: "Can I cancel my ride booking?",
    answer:
      "Yes! You can cancel your booking completely free of charge up to 2 hours before the scheduled pickup time. No cancellation penalty is levied.",
  },
  {
    question: "Are there any hidden night charges?",
    answer:
      "No, Pranav Drop Taxi has no hidden night charges. Standard per kilometer rates apply round the clock. Only the standard driver bata of ₹400 applies for night duty.",
  },
  {
    question: "What is Driver Bata and how is it calculated?",
    answer:
      "Driver Bata is ₹400 for single drop trips and ₹400 per calendar day (12 AM to 12 AM) for round trips. It compensates the driver for outstation meals and lodging expenses.",
  },
  {
    question: "Do you offer 24/7 Airport pickup and drop?",
    answer:
      "Yes, we provide 24/7 dedicated airport drop and pickup services across Chennai International Airport (MAA), Kempegowda Airport Bangalore (BLR), Coimbatore Airport (CJB), and Madurai Airport (IXM).",
  },
  {
    question: "Is the taxi pet friendly?",
    answer:
      "Yes, pets are welcome in our cabs! Please ensure your pet is kept inside a proper carrier or on a clean blanket for comfort and hygiene.",
  },
  {
    question: "Is a child safety seat available?",
    answer:
      "Child seats can be arranged upon request when booking in advance. Please specify child seat requirements in the notes during booking.",
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
    <section className="px-4 py-20 bg-transparent" id="faq">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-black uppercase rounded-full bg-taxi-yellow">
            <HelpCircle className="w-3 h-3" /> Clear & Transparent
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl uppercase tracking-wider">
            Frequently Asked <span className="text-taxi-yellow">Questions</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Got questions? We have clear answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/5 bg-white/5 rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-taxi-yellow/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-extrabold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-taxi-yellow text-black" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldCheck className="w-8 h-8 text-taxi-yellow shrink-0" />
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase">Have more questions?</h4>
              <p className="text-xs text-gray-400">Our customer desk is available 24 hours a day.</p>
            </div>
          </div>
          <a
            href="tel:+919884949171"
            className="px-6 py-3 text-xs font-black text-black bg-taxi-yellow rounded-xl uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(255,193,7,0.2)] whitespace-nowrap"
          >
            Call Support Now
          </a>
        </div>
      </div>
    </section>
  );
}
