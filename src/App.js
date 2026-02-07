import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PageRestricted from './pages/PageRestricted';

import { AuthProvider } from './utils/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from "react-hot-toast";

// Layout Controller
const LayoutWrapper = ({ children }) => {
  const { pathname } = useLocation();

  const hideLayoutRoutes = [
    '/my-bookings',
    '/login',
    '/restricted', // Hide Navbar/Footer here
  ];

  const shouldHideLayout = hideLayoutRoutes.some(route =>
    pathname === route || pathname === `${route}/`
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />

        <LayoutWrapper>
          <Routes>

            {/* 🔒 Site Locked → Redirect Home to Restricted */}
            <Route path="/" element={<Navigate to="/home"/>} />

            {/* Main Pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            {/* Restricted Page */}
            <Route path="/restricted" element={<PageRestricted />} />

            {/* Optional: Allow Home later by switching back */}
            {/* <Route path="/" element={<Home />} /> */}

          </Routes>
        </LayoutWrapper>

      </Router>
    </AuthProvider>
  );
}

export default App;
