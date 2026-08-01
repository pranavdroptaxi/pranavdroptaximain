import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import TermsAndConditions from './pages/TermsAndConditions';

import RouteDetailPage from './pages/routes/RouteDetailPage';
import AirportPage from './pages/airports/AirportPage';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';

import { AuthProvider } from './utils/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from "react-hot-toast";


// Layout Controller
const LayoutWrapper = ({ children }) => {
  const { pathname } = useLocation();

  const hideLayoutRoutes = [
    '/login',
    '/my-bookings',
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
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Main Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            {/* Blog Pages */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:postSlug" element={<BlogPost />} />

            {/* Airport SEO Pages */}
            <Route path="/chennai-airport-taxi" element={<AirportPage />} />
            <Route path="/bangalore-airport-taxi" element={<AirportPage />} />
            <Route path="/coimbatore-airport-taxi" element={<AirportPage />} />
            <Route path="/madurai-airport-taxi" element={<AirportPage />} />

            {/* Route SEO Pages */}
            <Route path="/chennai-to-bangalore-taxi" element={<RouteDetailPage />} />
            <Route path="/chennai-to-trichy-taxi" element={<RouteDetailPage />} />
            <Route path="/chennai-to-coimbatore-taxi" element={<RouteDetailPage />} />
            <Route path="/chennai-to-madurai-taxi" element={<RouteDetailPage />} />
            <Route path="/chennai-to-pondicherry-taxi" element={<RouteDetailPage />} />
            <Route path="/:routeSlug" element={<RouteDetailPage />} />
          </Routes>
        </LayoutWrapper>

      </Router>
    </AuthProvider>
  );
}

export default App;

