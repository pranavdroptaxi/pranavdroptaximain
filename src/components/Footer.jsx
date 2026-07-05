import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-50 pt-20 pb-10 text-gray-400 border-t border-white/5 bg-gradient-to-b from-[#0A0A0A] to-[#000000]">
      {/* Background Mesh Glow */}
      <div className="absolute inset-0 z-0 opacity-30 bg-radial-mesh pointer-events-none" />

      <div className="relative z-10 px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-3">

          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="object-contain w-8 h-8 filter brightness-110"
                />
                <h4 className="text-xl font-extrabold tracking-wider text-white uppercase">
                  Pranav <span className="text-taxi-yellow">Drop Taxi</span>
                </h4>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Reliable, affordable, and safe outstation taxi services across South India. We prioritize your comfort with every mile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="inline-block pb-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase border-b-2 border-taxi-yellow/20">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "My Bookings", path: "/my-bookings" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="flex items-center gap-2 group w-fit text-gray-400 hover:text-taxi-yellow transition-colors duration-200">
                    <FiArrowRight className="transition-transform duration-300 text-taxi-yellow group-hover:translate-x-1" />
                    <motion.span 
                      whileHover={{ x: 3 }}
                      className="transition-colors duration-300"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="inline-block pb-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase border-b-2 border-taxi-yellow/20">
              Contact Us
            </h4>
            <ul className="space-y-4 text-xs font-bold tracking-wider">
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                    <FiMail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:droptaxipranav@gmail.com"
                  className="mt-1 text-gray-400 hover:text-taxi-yellow transition-colors"
                >
                  droptaxipranav@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                    <FiPhone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+91 9884949171"
                  className="mt-1 text-gray-400 hover:text-taxi-yellow transition-colors"
                >
                  +91 9884949171
                </a>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-taxi-yellow shadow-inner">
                    <FiMapPin className="w-4 h-4" />
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9254883,80.1970964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 leading-relaxed text-gray-400 hover:text-taxi-yellow transition-colors"
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
        <div className="pt-8 mt-4 text-[10px] font-bold uppercase tracking-wider text-center text-gray-600 border-t border-white/5">
          <p>
            © {new Date().getFullYear()} <span className="text-gray-400">Pranav Drop Taxi</span>. All rights reserved.
          </p>
          <p className="mt-1.5 opacity-60">
            Designed for a smooth travel experience.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;