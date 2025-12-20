import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Only scroll to top if we are NOT trying to scroll to a specific section via state
    // This prevents fighting with the Navbar's smooth scroll logic
    if (!state?.scrollTo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // Snap to top immediately on route change
      });
    }
  }, [pathname, state]);

  return null;
}