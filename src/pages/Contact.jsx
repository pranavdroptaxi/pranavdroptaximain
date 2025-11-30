import { Mail, Phone, MapPin, LocateFixed, ArrowUp, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 py-16 text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-sm brightness-75 -z-10"
        style={{ backgroundImage: "url('/images/taxi.jpg')" }}
      />

      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-sm rounded-lg shadow transition"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>

      {/* Heading */}
      <div className="flex flex-col items-center w-full max-w-4xl text-center">
        <h1 className="mb-1 text-sm font-semibold tracking-wide text-yellow-400 uppercase">
          Contact Us
        </h1>
        <h2 className="mb-12 text-4xl font-bold drop-shadow-lg">
          Pranav Drop Taxi
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid items-start w-full max-w-5xl gap-10 md:grid-cols-2">

        {/* Contact Info Box */}
        <div className="p-6 space-y-6 transition border shadow-xl rounded-2xl bg-black/40 backdrop-blur-md border-white/10 hover:shadow-yellow-500/20">
          <h3 className="mb-4 text-xl font-semibold text-yellow-400">
            Get In Touch
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-yellow-400 w-7 h-7" />
              <p className="leading-relaxed text-gray-300">
                28A, Karmel St, opposite V Cure Hospital,
                <br />
                Pallikaranai, Chennai, Tamil Nadu 600100
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-yellow-400" />
              <a
                href="tel:+919884609789"
                className="text-white transition hover:text-yellow-400"
              >
                +91 9884609789
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-yellow-400" />
              <a
                href="mailto:droptaxipravan@gmail.com"
                className="text-white transition hover:text-yellow-400"
              >
                droptaxipravan@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Map Section Box */}
        <div className="p-4 transition border shadow-xl rounded-2xl bg-black/40 backdrop-blur-md border-white/10 hover:shadow-yellow-500/20">
          <div className="w-full overflow-hidden shadow-lg rounded-xl">
            <iframe
              title="Pranav Drop Taxi Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.3162371084387!2d80.19787147595075!3d12.929278287378076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c3add581025%3A0x5afe35915936ea80!2s28A%2C%20Karmel%20St%2C%20opposite%20V%20Cure%20Hospital%2C%20Pallikaranai%2C%20Chennai%2C%20Tamil%20Nadu%20600100!5e0!3m2!1sen!2sin!4v1721902800000!5m2!1sen!2sin"
              className="w-full border-0 h-80"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=28A,+Karmel+St,+Pallikaranai,+Chennai,+Tamil+Nadu+600100"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-black transition bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
          >
            <LocateFixed className="w-4 h-4 mr-2" />
            Get Directions
          </a>
        </div>
      </div>

      {/* Back To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed p-3 text-black transition bg-yellow-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-yellow-600"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
