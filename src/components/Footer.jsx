import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="px-6 py-12 mt-auto text-white bg-black border-t border-gray-800 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3">

        {/* 🟡 Company Info */}
        <div>
          <h4 className="mb-3 text-xl font-bold tracking-wide text-yellow-300">
            Pranav Drop Taxi
          </h4>
          <p className="text-gray-400">
            Reliable and affordable outstation taxi service.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <Link
              to="/admin-login"
              className="text-grey-500"
            >
              Pranav
            </Link>{' '}
            Drop Taxi. All rights reserved.
          </p>
        </div>

        {/* 🔵 Quick Links */}
        <div>
          <h4 className="mb-3 text-xl font-bold tracking-wide text-yellow-300">
            Quick Links
          </h4>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                to="/about"
                className="inline-block transition-all hover:text-yellow-300 hover:translate-x-1"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="inline-block transition-all hover:text-yellow-300 hover:translate-x-1"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/my-bookings"
                className="inline-block transition-all hover:text-yellow-300 hover:translate-x-1"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* 🟣 Contact Info */}
        <div>
          <h4 className="mb-3 text-xl font-bold tracking-wide text-yellow-300">
            Contact
          </h4>

          <div className="flex items-start gap-3 mb-4">
            <FiMail className="mt-1 text-yellow-300" />
            <a
              href="mailto:droptaxipravan@gmail.com"
              className="transition-colors hover:text-yellow-300"
            >
              droptaxipravan@gmail.com
            </a>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <FiPhone className="mt-1 text-yellow-300" />
            <a
              href="tel:+919884609789"
              className="transition-colors hover:text-yellow-300"
            >
              +91 9884609789
            </a>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <FiMapPin className="mt-1 text-yellow-300" />
            <span>
              28A, Karmel St, opposite V Cure Hospital,<br />
              Pallikaranai, Chennai,<br />
              Tamil Nadu 600100
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-8 text-xs text-center text-gray-500 opacity-75">
        Designed for a smooth travel experience with Pranav Drop Taxi.
      </div>
    </footer>
  );
};

export default Footer;
