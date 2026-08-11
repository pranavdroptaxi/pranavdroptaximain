import React, { useState, useEffect } from "react";
import { MessageSquare, X, Send, Bot, PhoneCall, Sparkles, ChevronUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! Welcome to Pranav Drop Taxi. How can I help you plan your journey today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickReplies = [
    "Check fare to Bangalore",
    "How to book a ride?",
    "Speak with Driver",
    "Toll & Night charges?",
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [
      ...messages,
      { sender: "user", text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ];

    setMessages(newMsgs);
    setInput("");

    // Bot automated answers
    setTimeout(() => {
      let reply = "Thanks for asking! You can instantly calculate fare on our home page booking form or reach us directly on WhatsApp or Call.";
      const lower = query.toLowerCase();
      if (lower.includes("bangalore")) {
        reply = "Chennai to Bangalore starting at ₹4,799 (346 KM). Select sedan, SUV or Innova for live fare calculation!";
      } else if (lower.includes("book")) {
        reply = "To book, simply select your Pickup & Drop locations above, choose a vehicle, and hit Submit. Our agent will dispatch your driver!";
      } else if (lower.includes("toll") || lower.includes("night") || lower.includes("charge")) {
        reply = "Zero hidden charges! Tolls & parking are as per actual receipts. Driver bata is ₹400 for drop trips.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 600);
  };

  return (
    <>
      {/* UNIFIED FLOATING ACTION STACK - Stable layout preventing layout shift */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        <div className="flex flex-col-reverse items-end gap-3 pointer-events-auto">
          {/* Live Chat Button (Anchored at base) */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Live Chat Support"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-taxi-yellow text-black font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:bg-white transition-all transform hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <MessageSquare className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-black animate-ping" />
              </div>
              <span>Chat with us</span>
            </button>
          )}

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919884949171"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center text-white bg-green-500 rounded-full shadow-xl w-11 h-11 hover:bg-green-600 shadow-green-500/20 transition-all transform hover:scale-105"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>

          {/* Scroll To Top Button (Pops upward without shifting base buttons) */}
          <AnimatePresence>
            {showTopButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                aria-label="Scroll to top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center justify-center text-black rounded-full shadow-xl bg-taxi-yellow w-11 h-11 hover:bg-white transition-all transform hover:scale-105"
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Live Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[550px] flex flex-col bg-black/95 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-taxi-yellow flex items-center justify-center text-black font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  Pranav Assistant <Sparkles className="w-3 h-3 text-taxi-yellow" />
                </h3>
                <p className="text-[9px] text-green-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Live Chat Window"
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[260px] max-h-[320px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-taxi-yellow text-black font-semibold rounded-br-none"
                      : "bg-white/10 text-white rounded-bl-none border border-white/5"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[8px] text-gray-500 font-bold mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-2 bg-white/5 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickReplies.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 text-[9px] font-bold text-gray-300 bg-white/5 border border-white/10 rounded-full whitespace-nowrap hover:border-taxi-yellow hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Direct WhatsApp / Call row */}
          <div className="px-3 py-2 bg-black flex justify-around border-t border-white/5 text-[9px] font-extrabold uppercase">
            <a
              href="https://wa.me/919884949171"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:underline"
            >
              <FaWhatsapp className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
            <a
              href="tel:+919884949171"
              className="flex items-center gap-1 text-taxi-yellow hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Desk
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 text-xs text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-taxi-yellow"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-taxi-yellow text-black rounded-xl hover:bg-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
