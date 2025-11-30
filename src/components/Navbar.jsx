import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiMapPin, FiPhone } from "react-icons/fi";
import { useAuth } from "../utils/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const toastTheme = {
  style: {
    background: "#000",
    color: "#FFD700",
    border: "1px solid #FFD700",
    fontSize: "14px",
  }
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      await logout();

      toast.success("Logged out successfully!", toastTheme);

      setTimeout(() => navigate("/"), 200);
    } catch (err) {
      toast.error("Logout failed. Try again.", toastTheme);
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-[60] flex items-center justify-center h-10 px-4 text-sm font-medium bg-yellow-300 text-black md:hidden">
        <div className="flex items-center gap-4">
          <a
            href="https://www.google.com/maps/place/28A,+Karmel+St,+opposite+V+Cure+Hospital,+Pallikaranai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FiMapPin size={14} />
            Office Location
          </a>

          <span className="text-black">|</span>

          <a href="tel:9884609789" className="flex items-center gap-1 hover:underline">
            <FiPhone size={14} />
            9884609789
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky z-50 px-6 text-white bg-black shadow-sm top-10 md:top-0 backdrop-blur">
        <div className="container flex items-center justify-between h-16 mx-auto md:h-[72px]">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            <img
              src="/header.png"
              alt="Logo"
              className="object-contain h-24 -my-4 transition-transform duration-300 scale-105 hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-6 text-white md:flex">
            
            <Link
              to="/my-bookings"
              className={`transition hover:text-yellow-300 ${
                location.pathname === "/my-bookings"
                  ? "text-yellow-400 font-semibold underline"
                  : ""
              }`}
            >
              My Bookings
            </Link>

            <button
              onClick={() => scrollToSection("tariff")}
              className="transition hover:text-yellow-300"
            >
              Tariff
            </button>

            <button
              onClick={() => scrollToSection("fleet")}
              className="transition hover:text-yellow-300"
            >
              Fleet
            </button>

            <Link
              to="/about"
              className={`transition hover:text-yellow-300 ${
                location.pathname === "/about"
                  ? "text-yellow-400 font-semibold underline"
                  : ""
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`transition hover:text-yellow-300 ${
                location.pathname === "/contact"
                  ? "text-yellow-400 font-semibold underline"
                  : ""
              }`}
            >
              Contact Us
            </Link>

            {user && (
              <div className="relative" ref={desktopDropdownRef}>
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=100"}
                  alt="Profile"
                  className="object-cover w-10 h-10 transition border-2 border-yellow-300 rounded-full cursor-pointer hover:scale-105"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 z-20 w-64 mt-3 bg-black border border-yellow-400 shadow-xl rounded-xl"
                    >
                      <div className="px-4 py-3 border-b border-yellow-400 space-y-0.5">
                        <p className="text-sm text-gray-200">Signed in as</p>
                        <p className="text-sm font-semibold text-yellow-300 truncate">
                          {user.displayName || "Guest User"}
                        </p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-sm text-left text-white transition hover:bg-yellow-400 hover:text-black rounded-b-xl"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 md:hidden">

            <Link
              to="/my-bookings"
              className={`text-sm font-medium hover:text-yellow-300 ${
                location.pathname === "/my-bookings"
                  ? "text-yellow-400 font-semibold underline"
                  : ""
              }`}
            >
              My Bookings
            </Link>

            {user && (
              <div className="relative" ref={mobileDropdownRef}>
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=100"}
                  alt="Profile"
                  className="object-cover border-2 border-yellow-300 rounded-full cursor-pointer w-9 h-9"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 z-20 mt-3 bg-black border border-yellow-400 shadow-xl w-60 rounded-xl"
                    >
                      <div className="px-4 py-3 border-b border-yellow-400 space-y-0.5">
                        <p className="text-sm text-gray-200">Signed in as</p>
                        <p className="text-sm font-semibold text-yellow-300 truncate">
                          {user.displayName || "Guest User"}
                        </p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-sm text-left text-white transition hover:bg-yellow-400 hover:text-black rounded-b-xl"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-6 py-6 space-y-6 text-white bg-black border-t border-yellow-400 shadow-xl md:hidden"
            >
              <button
                onClick={() => scrollToSection("tariff")}
                className="block text-lg hover:text-yellow-300"
              >
                Tariff
              </button>

              <button
                onClick={() => scrollToSection("fleet")}
                className="block text-lg hover:text-yellow-300"
              >
                Fleet
              </button>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`block text-lg hover:text-yellow-300 ${
                  location.pathname === "/about"
                    ? "text-yellow-400 font-semibold underline"
                    : ""
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={`block text-lg hover:text-yellow-300 ${
                  location.pathname === "/contact"
                    ? "text-yellow-400 font-semibold underline"
                    : ""
                }`}
              >
                Contact Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
