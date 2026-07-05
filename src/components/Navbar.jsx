import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiMapPin, FiPhone, FiLogOut, FiChevronDown, FiBriefcase, FiUser } from "react-icons/fi";
import { useAuth } from "../utils/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const toastTheme = {
  style: {
    background: "#0A0A0A",
    color: "#FFC107",
    border: "1px solid rgba(255, 193, 7, 0.3)",
    fontSize: "14px",
    borderRadius: "12px",
  }
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener for premium header dynamic blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- SCROLL TO TOP LOGIC (Logo & Home) ---
  const handleHomeClick = (e) => {
    setMenuOpen(false);
    setDropdownOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } 
  };

  // --- ROBUST SCROLL LOGIC (Sections) ---
  const scrollToSection = (id) => {
    setMenuOpen(false);
    setDropdownOpen(false);

    if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 150);
        }
    } else {
        navigate("/", { state: { scrollTo: id } });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
        const id = location.state.scrollTo;
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            window.history.replaceState({}, document.title);
        }, 500); 
    }
  }, [location]);

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

  const navLinks = [
    { name: "Home", path: "/", type: "link" },
    { name: "My Bookings", path: "/my-bookings", type: "link" },
    { name: "Tariff", id: "tariff", type: "scroll" },
    { name: "Fleet", id: "fleet", type: "scroll" },
    { name: "About Us", path: "/about", type: "link" },
    { name: "Contact", path: "/contact", type: "link" },
  ];

  return (
    <>
      {/* Top Bar - Mobile Only */}
      <div className="relative z-[60] bg-taxi-yellow text-black text-xs font-bold tracking-wide md:hidden shadow-md">
        <div className="container flex items-center justify-center gap-4 py-2.5 mx-auto">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=12.9254883,80.1970964"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-85"
          >
            <FiMapPin className="w-3.5 h-3.5" />
            <span>Location</span>
          </a>

          <span className="opacity-30">|</span>

          <a href="tel:9884949171" className="flex items-center gap-1.5 transition-opacity hover:opacity-85">
            <FiPhone className="w-3.5 h-3.5" />
            <span>9884949171</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-black/90 border-white/5 shadow-2xl backdrop-blur-xl py-1 md:py-2" 
          : "bg-black/40 border-white/10 backdrop-blur-md py-2 md:py-4"
      }`}>
        <div className="container flex items-center justify-between px-4 mx-auto md:px-6">
          
          <Link 
            to="/" 
            onClick={handleHomeClick} 
            className="flex items-center gap-2 group relative z-10"
          >
            <img
              src="/header.png"
              alt="Pranav Drop Taxi"
              className="object-contain h-16 transition-transform duration-300 md:h-22 group-hover:scale-102"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-1 lg:flex">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return link.type === "link" ? (
                <Link
                  key={index}
                  to={link.path}
                  onClick={link.path === "/" ? handleHomeClick : undefined}
                  className={`relative px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 rounded-full ${
                    isActive ? "text-taxi-yellow" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2.5 text-xs font-bold tracking-wider text-gray-300 uppercase transition-all duration-300 rounded-full hover:text-white"
                >
                  {link.name}
                </button>
              );
            })}

            {user ? (
              <div className="relative ml-4" ref={desktopDropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3.5 px-3.5 py-1.5 transition-all border border-white/10 rounded-full bg-white/5 hover:bg-white/10 hover:border-taxi-yellow/30 shadow-inner"
                >
                    <img
                        src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=100"}
                        alt="Profile"
                        className="object-cover w-7 h-7 border border-taxi-yellow/30 rounded-full shadow-sm"
                    />
                    <span className="max-w-[100px] truncate text-xs font-bold text-gray-200 hidden xl:block">
                        {user.displayName?.split(" ")[0]}
                    </span>
                    <FiChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 w-64 mt-3 overflow-hidden border shadow-2xl bg-[#0F0F0F]/95 border-white/10 rounded-2xl backdrop-blur-xl"
                    >
                      <div className="p-4 border-b border-white/5 bg-white/5">
                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Signed in as</p>
                        <p className="font-bold truncate text-taxi-yellow mt-0.5">
                          {user.displayName || "Guest User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                      </div>

                      <div className="p-2">
                        <Link 
                            to="/my-bookings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center w-full gap-3 px-3 py-2.5 text-xs font-bold text-gray-300 transition-colors rounded-xl hover:bg-white/5 hover:text-taxi-yellow"
                        >
                            <FiBriefcase className="w-4 h-4" /> My Bookings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-3 px-3 py-2.5 text-xs font-bold text-red-400 transition-colors rounded-xl hover:bg-red-500/10 hover:text-red-300"
                        >
                            <FiLogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
             <Link 
                to="/my-bookings" 
                className="px-3 py-1.5 text-xs font-extrabold transition-all border border-taxi-yellow/30 bg-taxi-yellow/10 text-taxi-yellow rounded-full hover:bg-taxi-yellow hover:text-black active:scale-95 whitespace-nowrap"
             >
                 My Bookings
             </Link>

             {user ? (
                <div className="relative" ref={mobileDropdownRef}>
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center justify-center w-8 h-8 border border-taxi-yellow/40 rounded-full focus:outline-none"
                    >
                        <img
                            src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=100"}
                            alt="Profile"
                            className="object-cover w-full h-full rounded-full"
                        />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 w-56 mt-3 overflow-hidden border shadow-2xl bg-[#0F0F0F]/95 border-white/10 rounded-xl backdrop-blur-xl"
                        >
                            <div className="p-3 border-b border-white/5 bg-white/5">
                                <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full gap-2.5 p-3 text-xs font-bold text-red-400 transition hover:bg-red-500/10"
                            >
                                <FiLogOut className="w-3.5 h-3.5" /> Logout
                            </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
             ) : (
                 <Link to="/my-bookings" className="flex items-center justify-center w-8 h-8 transition border border-white/10 rounded-full bg-white/5 text-taxi-yellow active:scale-95 hover:border-taxi-yellow/30">
                     <FiUser className="w-4 h-4" />
                 </Link>
             )}

            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-300 transition-colors border border-white/10 rounded-full hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/5 bg-[#0A0A0A]/95 backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return link.type === "link" ? (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={(e) => {
                          if (link.path === "/") handleHomeClick(e);
                          else setMenuOpen(false);
                      }}
                      className={`text-sm font-bold uppercase tracking-wider transition-colors py-1 ${
                          isActive ? "text-taxi-yellow" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm font-bold text-left text-gray-400 tracking-wider uppercase transition-colors hover:text-white py-1"
                    >
                      {link.name}
                    </button>
                  );
                })}

                {!user && (
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Welcome Guest</p>
                    </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;