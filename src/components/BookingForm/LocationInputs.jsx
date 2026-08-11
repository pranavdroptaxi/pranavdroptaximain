/* global google */
import React, { useEffect, useState, useRef } from "react";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import loadGoogleMapsAPI from "../../utils/loadGoogleMapsAPI";

export const popularCities = [
  { name: "Chennai", address: "Chennai, Tamil Nadu, India", lat: 13.0827, lng: 80.2707 },
  { name: "Bangalore", address: "Bengaluru, Karnataka, India", lat: 12.9716, lng: 77.5946 },
  { name: "Pondicherry", address: "Puducherry, India", lat: 11.9416, lng: 79.8083 },
  { name: "Trichy", address: "Tiruchirappalli, Tamil Nadu, India", lat: 10.7905, lng: 78.7047 },
  { name: "Coimbatore", address: "Coimbatore, Tamil Nadu, India", lat: 11.0168, lng: 76.9558 },
  { name: "Madurai", address: "Madurai, Tamil Nadu, India", lat: 9.9252, lng: 78.1198 },
  { name: "Salem", address: "Salem, Tamil Nadu, India", lat: 11.6643, lng: 78.146 },
  { name: "Vellore", address: "Vellore, Tamil Nadu, India", lat: 12.9165, lng: 79.1325 },
  { name: "Tirunelveli", address: "Tirunelveli, Tamil Nadu, India", lat: 8.7139, lng: 77.7567 },
  { name: "Hosur", address: "Hosur, Tamil Nadu, India", lat: 12.7409, lng: 77.8253 },
  { name: "Erode", address: "Erode, Tamil Nadu, India", lat: 11.341, lng: 77.7172 },
  { name: "Chennai Airport", address: "Chennai International Airport (MAA), Chennai", lat: 12.9941, lng: 80.1709 },
  { name: "Bangalore Airport", address: "Kempegowda International Airport (BLR), Bengaluru", lat: 13.1986, lng: 77.7066 },
];

const LocationInputs = ({
  onSourcePlaceSelect,
  onDestinationPlaceSelect,
  pickupError,
  dropError,
}) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);

  const pickupContainerRef = useRef(null);
  const dropContainerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMapsAPI()
      .then(async () => {
        if (cancelled || !window.google?.maps?.importLibrary) return;

        try {
          await google.maps.importLibrary("places");
          if (cancelled) return;
          setGoogleLoaded(true);
        } catch (err) {
          console.warn("Google Places library load error, using native fallback:", err);
          setGoogleLoaded(false);
        }
      })
      .catch((err) => {
        console.warn("Google Maps API script error, using native fallback:", err);
        setGoogleLoaded(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize Google Autocomplete into isolated DOM refs
  useEffect(() => {
    if (!googleLoaded) return;

    const setupAutocomplete = (containerRef, onSelect, setText) => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = "";

      const wrapper = document.createElement("div");
      wrapper.className =
        "w-full px-3 py-1 text-white transition-all duration-300 border bg-white/5 border-white/5 rounded-xl focus-within:border-taxi-yellow/30 focus-within:bg-black/50 shadow-inner";

      let input;
      try {
        input = new google.maps.places.PlaceAutocompleteElement({
          includedRegionCodes: ["IN"],
          locationRestriction: {
            north: 20.0,
            south: 8.0,
            east: 85.0,
            west: 74.0,
          },
        });

        input.style.backgroundColor = "transparent";
        input.style.width = "100%";
        input.style.color = "white";

        wrapper.appendChild(input);
        container.appendChild(wrapper);

        input.addEventListener("gmp-select", async ({ placePrediction }) => {
          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ["displayName", "location", "formattedAddress"],
          });

          const data = {
            displayName: place.displayName,
            address: place.formattedAddress,
            location: {
              lat: place.location?.lat?.(),
              lng: place.location?.lng?.(),
            },
          };

          if (typeof onSelect === "function") {
            onSelect(data);
            setText(place.displayName || place.formattedAddress);
          }
        });
      } catch (e) {
        console.warn("Error creating PlaceAutocompleteElement:", e);
      }
    };

    setupAutocomplete(pickupContainerRef, onSourcePlaceSelect, setPickupText);
    setupAutocomplete(dropContainerRef, onDestinationPlaceSelect, setDropText);
  }, [googleLoaded, onSourcePlaceSelect, onDestinationPlaceSelect]);

  const handleManualSelect = (city, isPickup) => {
    const data = {
      displayName: city.name,
      address: city.address,
      location: { lat: city.lat, lng: city.lng },
    };
    if (isPickup) {
      setPickupText(city.name);
      setShowPickupDropdown(false);
      onSourcePlaceSelect(data);
    } else {
      setDropText(city.name);
      setShowDropDropdown(false);
      onDestinationPlaceSelect(data);
    }
  };

  const filteredPickupCities = popularCities.filter((c) =>
    c.name.toLowerCase().includes(pickupText.toLowerCase())
  );

  const filteredDropCities = popularCities.filter((c) =>
    c.name.toLowerCase().includes(dropText.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Pickup Box */}
      <div className="space-y-2 relative">
        <label htmlFor="pickup-location" className="flex items-center justify-between ml-1 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-taxi-yellow" /> Pickup Location
          </span>
          {pickupText && (
            <span className="text-taxi-yellow font-extrabold truncate max-w-[150px]">
              {pickupText}
            </span>
          )}
        </label>

        {googleLoaded ? (
          <div
            ref={pickupContainerRef}
            className={`rounded-xl transition-all ${
              pickupError ? "ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : ""
            }`}
          />
        ) : (
          <div className="relative">
            <input
              id="pickup-location"
              name="pickup-location"
              aria-label="Pickup Location"
              type="text"
              value={pickupText}
              onFocus={() => setShowPickupDropdown(true)}
              onChange={(e) => {
                setPickupText(e.target.value);
                setShowPickupDropdown(true);
                // Try matching exact city name
                const matched = popularCities.find(
                  (c) => c.name.toLowerCase() === e.target.value.trim().toLowerCase()
                );
                if (matched) handleManualSelect(matched, true);
              }}
              placeholder="Select or type pickup city e.g. Chennai"
              className={`w-full px-4 py-3 text-sm text-white border rounded-xl bg-white/5 border-white/10 focus:border-taxi-yellow focus:outline-none transition-all placeholder-gray-400 ${
                pickupError ? "border-red-500" : ""
              }`}
            />

            {/* Dropdown Suggestions */}
            {showPickupDropdown && filteredPickupCities.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-black/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto backdrop-blur-xl">
                {filteredPickupCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleManualSelect(city, true)}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-200 hover:bg-taxi-yellow hover:text-black transition-colors flex items-center justify-between"
                  >
                    <span>{city.name}</span>
                    <span className="text-[9px] opacity-70 truncate max-w-[160px]">{city.address}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Choice Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[9px] text-gray-300 font-bold uppercase flex items-center gap-1 self-center mr-1">
            <Sparkles className="w-2.5 h-2.5 text-taxi-yellow" /> Quick:
          </span>
          {popularCities.slice(0, 4).map((c) => (
            <button
              key={`p-${c.name}`}
              type="button"
              onClick={() => handleManualSelect(c, true)}
              className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition-all ${
                pickupText.toLowerCase().includes(c.name.toLowerCase())
                  ? "bg-taxi-yellow text-black border-taxi-yellow shadow-sm"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-taxi-yellow/40 hover:bg-white/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {pickupError && (
          <p className="ml-1 text-[10px] font-bold tracking-wide text-red-500 animate-pulse">
            * {pickupError}
          </p>
        )}
      </div>

      {/* Drop Box */}
      <div className="space-y-2 relative">
        <label htmlFor="drop-location" className="flex items-center justify-between ml-1 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          <span className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-taxi-yellow" /> Drop Location
          </span>
          {dropText && (
            <span className="text-taxi-yellow font-extrabold truncate max-w-[150px]">
              {dropText}
            </span>
          )}
        </label>

        {googleLoaded ? (
          <div
            ref={dropContainerRef}
            className={`rounded-xl transition-all ${
              dropError ? "ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : ""
            }`}
          />
        ) : (
          <div className="relative">
            <input
              id="drop-location"
              name="drop-location"
              aria-label="Drop Location"
              type="text"
              value={dropText}
              onFocus={() => setShowDropDropdown(true)}
              onChange={(e) => {
                setDropText(e.target.value);
                setShowDropDropdown(true);
                const matched = popularCities.find(
                  (c) => c.name.toLowerCase() === e.target.value.trim().toLowerCase()
                );
                if (matched) handleManualSelect(matched, false);
              }}
              placeholder="Select or type drop city e.g. Bangalore"
              className={`w-full px-4 py-3 text-sm text-white border rounded-xl bg-white/5 border-white/10 focus:border-taxi-yellow focus:outline-none transition-all placeholder-gray-400 ${
                dropError ? "border-red-500" : ""
              }`}
            />

            {/* Dropdown Suggestions */}
            {showDropDropdown && filteredDropCities.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-black/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto backdrop-blur-xl">
                {filteredDropCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleManualSelect(city, false)}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-200 hover:bg-taxi-yellow hover:text-black transition-colors flex items-center justify-between"
                  >
                    <span>{city.name}</span>
                    <span className="text-[9px] opacity-70 truncate max-w-[160px]">{city.address}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Choice Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[9px] text-gray-300 font-bold uppercase flex items-center gap-1 self-center mr-1">
            <Sparkles className="w-2.5 h-2.5 text-taxi-yellow" /> Quick:
          </span>
          {popularCities.slice(1, 5).map((c) => (
            <button
              key={`d-${c.name}`}
              type="button"
              onClick={() => handleManualSelect(c, false)}
              className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition-all ${
                dropText.toLowerCase().includes(c.name.toLowerCase())
                  ? "bg-taxi-yellow text-black border-taxi-yellow shadow-sm"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-taxi-yellow/40 hover:bg-white/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {dropError && (
          <p className="ml-1 text-[10px] font-bold tracking-wide text-red-500 animate-pulse">
            * {dropError}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationInputs;
