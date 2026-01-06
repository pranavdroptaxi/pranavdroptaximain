import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    /**
     * LOGIC:
     * We only want to snap to top when the actual URL changes.
     * We ignore state updates here to prevent fighting with 
     * the BookingForm's internal scroll-to-modal logic.
     */
    const shouldScroll = !state?.scrollTo;

    if (shouldScroll) {
      window.scrollTo(0, 0);
    }
    
    // The comment below silences the warning for the missing 'state' dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); 

  return null;
}