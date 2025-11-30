import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();

  // ⭐ Prevent back navigation → Always go to Home
  useEffect(() => {
    // Push extra history state
    window.history.pushState(null, '', window.location.href);

    const handleBack = () => {
      navigate('/', { replace: true }); // Go home
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [navigate]);

  const handleGoogleLogin = async () => {
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
          createdAt: new Date(),
        });
      }

      console.log('Google login successful:', user.email);
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error.message);
      alert('Google login failed: ' + error.message);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('taxi.jpg')" }}
    >
      {/* Home Button */}
      <Link
        to="/"
        className="absolute flex items-center gap-1 px-3 py-2 text-sm font-medium text-black transition bg-yellow-400 rounded-md shadow top-4 right-4 hover:bg-yellow-300"
      >
        <Home size={18} />
        Home
      </Link>

      <div className="flex items-center justify-center min-h-screen px-4 bg-black/70">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 text-white shadow-2xl sm:p-10 bg-black/80 rounded-xl"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-yellow-300">
            Login to Pranav Drop Taxi
          </h2>

          {/* Google Login Only */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 py-3 transition-colors border rounded-lg hover:bg-yellow-100/20"
          >
            <FcGoogle size={24} />
            <span className="font-medium text-white">Continue with Google</span>
          </button>

        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
