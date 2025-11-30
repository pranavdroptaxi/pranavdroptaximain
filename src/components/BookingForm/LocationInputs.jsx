/* global google */
import React, { useEffect } from "react";
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

        // Wrapper with Tailwind styling (same as ContactInputs)
        const wrapper = document.createElement("div");
        wrapper.className =
          "w-full p-3 text-white bg-gray-800 border border-gray-600 rounded";

        const input = new google.maps.places.PlaceAutocompleteElement({
          includedRegionCodes: ["IN"],
          locationRestriction: {
            north: 20.0,
            south: 8.0,
            east: 85.0,
            west: 74.0,
          },
        });

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
    <div className="space-y-4">
      {/* Pickup Box */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          Pickup Location
        </label>

        <div
          id="pickup-input"
          className={`${pickupError ? "border-red-500" : "border-transparent"}`}
        />

        {pickupError && (
          <p className="mt-1 text-sm text-red-400">{pickupError}</p>
        )}
      </div>

      {/* Drop Box */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          Drop Location
        </label>

        <div
          id="drop-input"
          className={`${dropError ? "border-red-500" : "border-transparent"}`}
        />

        {dropError && (
          <p className="mt-1 text-sm text-red-400">{dropError}</p>
        )}
      </div>
    </div>
  );
};

export default LocationInputs;
