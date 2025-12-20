import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();

  // ⭐ Prevent back navigation → Always go to Home
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handleBack = () => {
      navigate('/', { replace: true });
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading('Signing in...');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || '',
          email: user.email,
          role: 'user',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
        });
      }

      toast.success(`Welcome back, ${user.displayName}!`, { id: loadingToast });
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error.message);
      toast.error(error.message, { id: loadingToast });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-gray-300 bg-black">
      
      {/* 1. Dynamic Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]"
            style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      {/* 2. Navigation Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
            <img 
              src="/favicon.ico" 
              alt="Logo" 
              className="object-contain w-10 h-10"
            />
            <span className="text-xl font-bold tracking-tighter text-white">Pranav Drop Taxi</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black transition-all transform rounded-full shadow-lg bg-taxi-yellow hover:bg-white hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* 3. Login Card Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md overflow-hidden border shadow-2xl bg-taxi-dark rounded-3xl border-taxi-gray group"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 rounded-full opacity-20 bg-taxi-yellow blur-3xl translate-x-1/3" />

          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-400">
                Sign in to book your ride and manage trips.
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="relative flex items-center justify-center w-full gap-4 px-6 py-4 transition-all duration-300 transform bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-[1.02] hover:shadow-lg group active:scale-95"
            >
              <FcGoogle size={24} />
              <span className="text-base font-bold text-gray-800">
                Continue with Google
              </span>
            </button>
          </div>
          
          {/* Bottom decorative bar */}
          <div className="w-full h-1 bg-gradient-to-r from-taxi-yellow to-yellow-600"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;