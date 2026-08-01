import { useEffect, useState } from 'react';

export const vehicleRates = {
  sedan: { single: 14, round: 13, minKm: { single: 130, round: 250 } },
  etios: { single: 14, round: 13, minKm: { single: 130, round: 250 } },
  suv: { single: 19, round: 18, minKm: { single: 130, round: 250 } },
  innova: { single: 20, round: 18, minKm: { single: 130, round: 250 } },
  innovacrysta: { single: 25, round: 23, minKm: { single: 150, round: 250 } },
};

export function calculateVehicleCost(kms, vType, tType) {
  const rates = vehicleRates[vType];
  if (!rates || !kms) return null;
  const isRound = tType === 'roundtrip' || tType === 'round';
  const rate = isRound ? rates.round : rates.single;
  const minKm = isRound ? rates.minKm.round : rates.minKm.single;
  const effectiveKm = Math.max(kms, minKm);
  return Math.round(effectiveKm * rate);
}

export default function useDistanceCalculator({
  sourcePlace,
  destinationPlace,
  vehicleType,
  tripType,
  setSingleTripCost,
  setRoundTripCost,
  setMessage,
}) {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [cost, setCost] = useState(null);

  useEffect(() => {
    // Validate presence of source and destination
    if (
      !sourcePlace ||
      !destinationPlace ||
      typeof sourcePlace.location?.lat !== 'number' ||
      typeof sourcePlace.location?.lng !== 'number' ||
      typeof destinationPlace.location?.lat !== 'number' ||
      typeof destinationPlace.location?.lng !== 'number'
    ) {
      setDistance(null);
      setDuration(null);
      setCost(null);
      return;
    }

    const calculate = async () => {
      try {
        // Fallback calculation using Haversine if Google Maps DistanceMatrix fails or is unavailable
        const calculateHaversine = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // Earth radius in km
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
              Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          // Multiply by 1.35 factor for realistic road driving distance vs straight line
          return parseFloat((R * c * 1.35).toFixed(1));
        };

        const processResult = (kms, mins) => {
          setDistance(kms);
          setDuration(mins);

          if (vehicleType) {
            const rates = vehicleRates[vehicleType];
            if (rates) {
              const singleCost = calculateVehicleCost(kms, vehicleType, 'oneway');
              const roundCost = calculateVehicleCost(kms, vehicleType, 'roundtrip');
              setSingleTripCost?.(singleCost);
              setRoundTripCost?.(roundCost);

              const finalCost = tripType === 'roundtrip' ? roundCost : singleCost;
              setCost(finalCost);
            }
          }
        };

        if (window.google && window.google.maps && window.google.maps.DistanceMatrixService) {
          const service = new window.google.maps.DistanceMatrixService();
          const origin = new window.google.maps.LatLng(
            sourcePlace.location.lat,
            sourcePlace.location.lng
          );
          const destination = new window.google.maps.LatLng(
            destinationPlace.location.lat,
            destinationPlace.location.lng
          );

          service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
                const element = response.rows[0].elements[0];
                const kms = parseFloat((element.distance.value / 1000).toFixed(1));
                const mins = Math.round(element.duration.value / 60);
                processResult(kms, mins);
              } else {
                // Fallback to Haversine
                const kms = calculateHaversine(
                  sourcePlace.location.lat,
                  sourcePlace.location.lng,
                  destinationPlace.location.lat,
                  destinationPlace.location.lng
                );
                const mins = Math.round((kms / 50) * 60); // approx 50km/h avg speed
                processResult(kms, mins);
              }
            }
          );
        } else {
          // Haversine fallback
          const kms = calculateHaversine(
            sourcePlace.location.lat,
            sourcePlace.location.lng,
            destinationPlace.location.lat,
            destinationPlace.location.lng
          );
          const mins = Math.round((kms / 50) * 60);
          processResult(kms, mins);
        }
      } catch (err) {
        console.error('Distance calculation error:', err);
      }
    };

    calculate();
  }, [
    sourcePlace,
    destinationPlace,
    vehicleType,
    tripType,
    setSingleTripCost,
    setRoundTripCost,
    setMessage,
  ]);

  return { distance, duration, cost };
}

