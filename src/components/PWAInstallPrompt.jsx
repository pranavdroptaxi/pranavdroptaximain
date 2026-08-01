import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 max-w-xs sm:max-w-sm p-3.5 bg-black/95 border border-taxi-yellow/40 rounded-2xl shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-taxi-yellow text-black flex items-center justify-center font-bold shrink-0">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="flex-1 pr-1">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider">
              Install Pranav Taxi
            </h4>
            <button
              onClick={() => setShowPrompt(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close install prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[9.5px] text-gray-300 font-medium leading-tight mt-0.5">
            Add to home screen for 1-tap bookings.
          </p>
          <button
            onClick={handleInstallClick}
            className="mt-2 w-full py-1.5 text-[10px] font-black text-black bg-taxi-yellow rounded-lg uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Install App
          </button>
        </div>
      </div>
    </div>
  );
}
