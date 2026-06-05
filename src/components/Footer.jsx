import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion'; // Importing motion for animations

const Footer = () => {
  return (
    <footer className="relative z-50 pt-16 pb-8 text-gray-300 border-t border-white/10 bg-black/90 backdrop-blur-md">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-3">

          {/* 🟡 Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="object-contain w-8 h-8 opacity-90"
                />
                <h4 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  Pranav <span className="text-taxi-yellow">Drop Taxi</span>
                </h4>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Reliable, affordable, and safe outstation taxi services across South India. We prioritize your comfort with every mile.
            </p>
          </div>

          {/* 🔵 Quick Links */}
          <div>
            <h4 className="inline-block pb-2 mb-6 text-lg font-bold tracking-wider text-white uppercase border-b border-taxi-yellow/30">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "My Bookings", path: "/my-bookings" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="flex items-center gap-2 group w-fit">
                    <FiArrowRight className="transition-transform duration-300 text-taxi-yellow group-hover:translate-x-1" />
                    <motion.span 
                      whileHover={{ x: 5 }}
                      className="transition-colors duration-300 group-hover:text-taxi-yellow"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🟣 Contact Info */}
          <div>
            <h4 className="inline-block pb-2 mb-6 text-lg font-bold tracking-wider text-white uppercase border-b border-taxi-yellow/30">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-white/5 text-taxi-yellow">
                    <FiMail />
                </div>
                <a
                  href="mailto:droptaxipranav@gmail.com"
                  className="mt-1 transition-colors hover:text-taxi-yellow"
                >
                  droptaxipranav@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-white/5 text-taxi-yellow">
                    <FiPhone />
                </div>
                <a
                  href="tel:+91 9884949171"
                  className="mt-1 transition-colors hover:text-taxi-yellow"
                >
                  +91 9884949171
                </a>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-white/5 text-taxi-yellow">
                    <FiMapPin />
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9254883,80.1970964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 leading-relaxed transition-colors hover:text-taxi-yellow"
                >
                  MGR Nagar, Nehru Street,
                  <br />
                  Pallikaranai, Chennai – 600100
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 mt-4 text-xs text-center text-gray-500 border-t border-white/10">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-gray-300">Pranav Drop Taxi</span>. All rights reserved.
          </p>
          <p className="mt-2 opacity-60">
            Designed for a smooth travel experience.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;