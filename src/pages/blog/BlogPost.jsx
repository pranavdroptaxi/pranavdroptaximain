import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, User, Clock, Car, ChevronRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { blogPostsData } from "./BlogList";
import LiveChat from "../../components/LiveChat";

const renderInlineText = (text) => {
  if (!text) return null;
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="font-semibold text-taxi-yellow font-mono">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

export default function BlogPost() {
  const { postSlug } = useParams();
  const post = blogPostsData.find((p) => p.slug === postSlug) || {
    title: "Outstation Travel Guide",
    date: "Aug 1, 2026",
    author: "Pranav Travel Team",
    category: "Travel",
    readTime: "4 min read",
    content: "Detailed travel tips and outstation taxi fare information across South India.",
  };

  return (
    <div className="relative min-h-screen text-gray-300 bg-black selection:bg-taxi-yellow selection:text-black">
      <Helmet>
        <title>{post.title} - Pranav Drop Taxi Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://pranavdroptaxi.com/blog/${postSlug}`} />
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
        <div className="max-w-4xl mx-auto">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-taxi-yellow uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog List
            </Link>

            <Link
              to="/#booking"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black text-black bg-taxi-yellow rounded-full uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(255,193,7,0.3)]"
            >
              <Car className="w-3.5 h-3.5" /> Book Ride Now <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Post Header Card */}
          <div className="p-8 sm:p-12 border border-white/10 shadow-2xl bg-black/80 backdrop-blur-2xl rounded-3xl mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-taxi-yellow/10 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1 text-[10px] font-black text-black bg-taxi-yellow rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold">
                <Clock className="w-3.5 h-3.5 text-taxi-yellow" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-gray-400 font-bold">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-taxi-yellow" /> {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-taxi-yellow" /> {post.date}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content Card */}
          <article className="p-6 sm:p-10 border border-white/10 bg-black/80 backdrop-blur-2xl rounded-3xl text-gray-300 space-y-4 shadow-2xl">
            {post.content.split("\n\n").map((block, index) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // H2 Heading
              if (trimmed.startsWith("## ")) {
                return (
                  <div key={index} className="pt-6 pb-2 border-b border-white/10 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-2.5">
                      <Sparkles className="w-6 h-6 text-taxi-yellow shrink-0" />
                      <span>{trimmed.replace("## ", "")}</span>
                    </h2>
                  </div>
                );
              }

              // H3 Subheading
              if (trimmed.startsWith("### ")) {
                const headingText = trimmed.replace("### ", "");
                const isSpecial = headingText.toLowerCase().includes("why choose") || headingText.toLowerCase().includes("driver bata") || headingText.toLowerCase().includes("matrix");
                
                return (
                  <h3
                    key={index}
                    className={`text-lg sm:text-xl font-black uppercase tracking-wider pt-4 mb-2 flex items-center gap-2 ${
                      isSpecial ? "text-taxi-yellow" : "text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-taxi-yellow shrink-0" />
                    {headingText}
                  </h3>
                );
              }

              // List Items (- or * or 1.)
              const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
              const isList = lines.length > 0 && lines.every((l) => /^[-*]\s|\d+\.\s/.test(l));

              if (isList) {
                return (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                    {lines.map((line, idx) => {
                      const content = line.replace(/^[-*]\s*|\d+\.\s*/, "");
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-taxi-yellow/40 transition-all flex items-start gap-3 shadow-md"
                        >
                          <div className="w-6 h-6 rounded-xl bg-taxi-yellow/10 border border-taxi-yellow/20 flex items-center justify-center text-taxi-yellow shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                            {renderInlineText(content)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              // Highlight Callout Box
              if (
                trimmed.toLowerCase().includes("saving over") ||
                trimmed.toLowerCase().includes("flat driver bata") ||
                trimmed.toLowerCase().includes("traditional taxi operators")
              ) {
                return (
                  <div key={index} className="p-6 rounded-3xl bg-gradient-to-r from-taxi-yellow/15 via-black/80 to-white/5 border border-taxi-yellow/30 shadow-2xl my-6">
                    <div className="flex items-center gap-2 text-taxi-yellow font-black text-xs uppercase tracking-widest mb-2">
                      <ShieldCheck className="w-4 h-4" /> Value Guarantee Note
                    </div>
                    <p className="text-sm sm:text-base text-gray-100 font-medium leading-relaxed">
                      {renderInlineText(trimmed)}
                    </p>
                  </div>
                );
              }

              // Standard Paragraph
              return (
                <p key={index} className="text-gray-300 leading-relaxed text-sm sm:text-base font-normal my-2">
                  {renderInlineText(trimmed)}
                </p>
              );
            })}
          </article>

          {/* Bottom Call to Action Banner */}
          <div className="mt-10 p-8 border border-white/10 bg-black/90 rounded-3xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-[10px] font-black text-taxi-yellow uppercase tracking-widest block mb-1">
                Instant Online Booking
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Ready to Book Your Journey?
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md">
                Calculate fare instantly for Sedan, SUV, or Innova and get doorstep pickup anywhere in South India.
              </p>
            </div>

            <Link
              to="/#booking"
              className="px-8 py-4 text-xs font-black text-black bg-taxi-yellow rounded-2xl uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(255,193,7,0.3)] whitespace-nowrap transform hover:scale-105"
            >
              Book Taxi Now
            </Link>
          </div>
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
