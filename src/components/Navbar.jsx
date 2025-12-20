import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiMapPin, FiPhone, FiLogOut, FiChevronDown, FiBriefcase, FiUser } from "react-icons/fi";
import { useAuth } from "../utils/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const toastTheme = {
  style: {
    background: "#1a1a1a",
    color: "#FFC107",
    border: "1px solid #FFC107",
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

  // --- SCROLL TO TOP LOGIC (Logo & Home) ---
  const handleHomeClick = (e) => {
    // Close menus
    setMenuOpen(false);
    setDropdownOpen(false);

    if (location.pathname === "/") {
      // If already on Home, prevent default navigation and just scroll up smoothly
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } 
    // If not on Home, the <Link> component will handle the navigation to "/" naturally.
    // React Router usually handles scroll reset on navigation, but if you have a global ScrollToTop component it works best.
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
      <div className="relative z-[60] bg-taxi-yellow text-black text-xs font-bold tracking-wide md:hidden">
        <div className="container flex items-center justify-center gap-3 py-2 mx-auto">
          <a
            href="https://www.google.com/maps/place/28A,+Karmel+St,+opposite+V+Cure+Hospital,+Pallikaranai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-opacity hover:opacity-75"
          >
            <FiMapPin className="w-3 h-3" />
            <span>Location</span>
          </a>

          <span className="opacity-50">|</span>

          <a href="tel:9884609789" className="flex items-center gap-1 transition-opacity hover:opacity-75">
            <FiPhone className="w-3 h-3" />
            <span>9884609789</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:h-20 md:px-6">
          
          {/* Logo (Click scrolls top) */}
          <Link 
            to="/" 
            onClick={handleHomeClick} 
            className="flex items-center gap-2 group"
          >
            <img
              src="/header.png"
              alt="Pranav Drop Taxi"
              className="object-contain h-20 -my-4 transition-transform duration-300 md:h-28 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-1 lg:flex">
            {navLinks.map((link, index) => (
                link.type === "link" ? (
                    <Link
                        key={index}
                        to={link.path}
                        // Use handleHomeClick for Home link, otherwise just navigate
                        onClick={link.path === "/" ? handleHomeClick : undefined}
                        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full hover:bg-white/10 ${
                            location.pathname === link.path ? "text-taxi-yellow" : "text-white hover:text-taxi-yellow"
                        }`}
                    >
                        {link.name}
                    </Link>
                ) : (
                    <button
                        key={index}
                        onClick={() => scrollToSection(link.id)}
                        className="px-4 py-2 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 rounded-full hover:bg-white/10 hover:text-taxi-yellow"
                    >
                        {link.name}
                    </button>
                )
            ))}

            {/* User Profile Desktop */}
            {user ? (
              <div className="relative ml-4" ref={desktopDropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-3 py-1.5 transition-all border border-white/20 rounded-full bg-white/5 hover:bg-white/10 hover:border-taxi-yellow/50"
                >
                    <img
                        src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=100"}
                        alt="Profile"
                        className="object-cover w-8 h-8 border border-white rounded-full shadow-sm"
                    />
                    <span className="max-w-[100px] truncate text-sm font-medium text-white hidden xl:block">
                        {user.displayName?.split(" ")[0]}
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 w-64 mt-3 overflow-hidden border shadow-2xl bg-black/90 border-white/10 rounded-2xl backdrop-blur-xl"
                    >
                      <div className="p-4 border-b border-white/10 bg-white/5">
                        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Signed in as</p>
                        <p className="font-semibold truncate text-taxi-yellow">
                          {user.displayName || "Guest User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>

                      <div className="p-2">
                        <Link 
                            to="/my-bookings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center w-full gap-3 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:bg-white/10 hover:text-taxi-yellow"
                        >
                            <FiBriefcase className="w-4 h-4" /> My Bookings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-3 px-3 py-2 text-sm font-medium text-red-400 transition-colors rounded-lg hover:bg-red-500/10 hover:text-red-300"
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

          {/* Mobile Actions (Outside Menu) */}
          <div className="flex items-center gap-3 lg:hidden">
             
             {/* My Bookings Text Link (Mobile) */}
             <Link 
                to="/my-bookings" 
                className="px-2 py-1 text-xs font-bold transition-colors text-taxi-yellow hover:text-white active:scale-95 whitespace-nowrap"
             >
                 My Bookings
             </Link>

             {/* User Profile (Mobile) - Toggle Dropdown */}
             {user ? (
                <div className="relative" ref={mobileDropdownRef}>
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center justify-center w-8 h-8 border border-yellow-500 rounded-full focus:outline-none"
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
                          className="absolute right-0 w-56 mt-3 overflow-hidden border shadow-2xl bg-black/95 border-white/10 rounded-xl backdrop-blur-xl"
                        >
                           <div className="p-3 border-b border-white/10">
                                <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                           </div>
                           <button
                                onClick={handleLogout}
                                className="flex items-center w-full gap-2 p-3 text-sm text-red-400 transition hover:bg-white/5"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
             ) : (
                 <Link to="/my-bookings" className="flex items-center justify-center w-8 h-8 transition rounded-full bg-white/10 text-taxi-yellow active:scale-95">
                     <FiUser className="w-4 h-4" />
                 </Link>
             )}

            {/* Hamburger Menu */}
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 text-white transition-colors rounded-lg hover:text-taxi-yellow focus:outline-none"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                
                {navLinks.map((link, index) => (
                    link.type === "link" ? (
                        <Link
                            key={index}
                            to={link.path}
                            // Use handleHomeClick for Home link
                            onClick={(e) => {
                                if (link.path === "/") handleHomeClick(e);
                                else setMenuOpen(false);
                            }}
                            className={`text-lg font-medium transition-colors ${
                                location.pathname === link.path ? "text-taxi-yellow" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <button
                            key={index}
                            onClick={() => scrollToSection(link.id)}
                            className="text-lg font-medium text-left text-gray-300 transition-colors hover:text-white"
                        >
                            {link.name}
                        </button>
                    )
                ))}

                {!user && (
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-500">Welcome Guest</p>
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