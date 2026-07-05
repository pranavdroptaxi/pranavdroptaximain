/* global google */
import React, { useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import loadGoogleMapsAPI from "../../utils/loadGoogleMapsAPI";

const LocationInputs = ({
  onSourcePlaceSelect,
  onDestinationPlaceSelect,
  pickupError,
  dropError,
}) => {
  useEffect(() => {
    let cancelled = false;

    loadGoogleMapsAPI().then(async () => {
      if (cancelled || !window.google?.maps?.importLibrary) return;

      await google.maps.importLibrary("places");

      // Initialize Google Autocomplete inside wrapper
      const initAutocomplete = (elementId, onSelect) => {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = "";

        // Wrapper with Glossy Dark Theme Styling
        const wrapper = document.createElement("div");
        // Using focus-within to highlight the box when the inner google input is clicked
        wrapper.className =
          "w-full px-3 py-1.5 text-white transition-all duration-300 border bg-white/5 border-white/5 rounded-xl focus-within:border-taxi-yellow/30 focus-within:bg-black/50 shadow-inner focus-within:shadow-[0_0_15px_rgba(255,193,7,0.1)]";

        const input = new google.maps.places.PlaceAutocompleteElement({
          includedRegionCodes: ["IN"],
          locationRestriction: {
            north: 20.0,
            south: 8.0,
            east: 85.0,
            west: 74.0,
          },
        });

        // Attempt to style the internal web component via inline style (best effort)
        // This helps it blend into the dark background
        input.style.backgroundColor = "transparent";
        input.style.width = "100%";
        input.style.color = "white"; 

        wrapper.appendChild(input);
        container.appendChild(wrapper);

        // When user selects a place:
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
          }
        });
      };

      // Initialize both fields
      initAutocomplete("pickup-input", onSourcePlaceSelect);
      initAutocomplete("drop-input", onDestinationPlaceSelect);
    });

    return () => {
      cancelled = true;
    };
  }, [onSourcePlaceSelect, onDestinationPlaceSelect]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      
      {/* Pickup Box */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          <MapPin className="w-3.5 h-3.5 text-taxi-yellow" /> Pickup Location
        </label>

        <div
          id="pickup-input"
          // If error, we add a red ring around the container
          className={`rounded-xl transition-all ${
            pickupError ? "ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : ""
          }`}
        />

        {pickupError && (
          <p className="ml-1 text-[10px] font-bold tracking-wide text-red-500 animate-pulse">
            * {pickupError}
          </p>
        )}
      </div>

      {/* Drop Box */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          <Navigation className="w-3.5 h-3.5 text-taxi-yellow" /> Drop Location
        </label>

        <div
          id="drop-input"
          className={`rounded-xl transition-all ${
            dropError ? "ring-1 ring-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : ""
          }`}
        />

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