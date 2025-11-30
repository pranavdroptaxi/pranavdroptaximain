import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import TermsAndConditions from './pages/TermsAndConditions';

import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import ManageUsers from './admin/ManageUsers';
import AdminBookings from './admin/AdminBookings/AdminBookings';
import AdminReviews from './admin/AdminReviews';

import { AuthProvider } from './utils/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import ScrollToTop from './components/ScrollToTop';

// ⭐ Toast Library
import { Toaster } from "react-hot-toast";

// ---------------------------
// ⭐ Admin Layout Wrapper
// ---------------------------
const AdminLayout = () => (
  <div className="flex min-h-screen text-black bg-white">
    <AdminSidebar />
    <main className="flex-1 p-4 bg-gray-50">
      <Outlet />
    </main>
  </div>
);

// ---------------------------
// ⭐ Layout wrapper: Hide Navbar/Footer on certain pages
// ---------------------------
const LayoutWrapper = ({ children }) => {
  const { pathname } = useLocation();

  const hideLayoutRoutes = [
    '/my-bookings',
    '/login',
    '/admin',
    '/admin-login',
  ];

  const shouldHideLayout =
    hideLayoutRoutes.includes(pathname) || pathname.startsWith('/admin/');

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

// ---------------------------
// ⭐ Main App Component
// ---------------------------
function App() {
  return (
    <AuthProvider>
      <Router>

        {/* ⭐ Smooth scroll on route change */}
        <ScrollToTop />

        {/* ⭐ Global Toast Notifications */}
        <Toaster position="top-right" reverseOrder={false} />

        <LayoutWrapper>
          <Routes>
            
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            {/* Admin Login (Public) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ⭐ Admin Dashboard Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="bookings" element={<AdminBookings />} />

              {/* ⭐ FIXED: was absolute path earlier */}
              <Route path="reviews" element={<AdminReviews />} />

              <Route index element={<AdminDashboard />} />
            </Route>

          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
