import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { generateBookingId } from "../utils/generateBookingId";

/**
 * Converts a place object from BookingForm into Firestore-safe format.
 */
function extractPlaceDetails(place) {
  if (!place) return null;

  const displayName = place.displayName || "";
  const formattedAddress = place.address || "";

  // Human readable combined address
  const fullAddress =
    displayName && formattedAddress
      ? `${displayName}, ${formattedAddress}`
      : formattedAddress || displayName;

  const lat = place.location?.lat ?? null;
  const lng = place.location?.lng ?? null;

  return {
    displayName,
    formattedAddress,
    fullAddress,
    location: { lat, lng },
  };
}

export default async function submitBooking(data) {
  const {
    tripType,        // Input might be "roundtrip" or "round"
    date,
    returnDate,
    source,
    destination,
    vehicleType,
    cost,
    distance,
    duration,
    name,
    phone,
    userId,
    userEmail,
  } = data;

  if (!source || !destination) {
    throw new Error("Source or destination not provided.");
  }

  // 1. Normalize Trip Type (Safety check)
  // Ensures we always store "round" or "single" regardless of what the UI sends
  const normalizedTripType = (tripType === "roundtrip" || tripType === "round") ? "round" : "single";

  // 2. Normalize Place Data
  const extractedSource = extractPlaceDetails(source);
  const extractedDestination = extractPlaceDetails(destination);

  if (!extractedSource || !extractedDestination) {
    throw new Error("Places could not be processed.");
  }

  const {
    fullAddress: sourceAddress,
    location: { lat: sourceLat, lng: sourceLng },
  } = extractedSource;

  const {
    fullAddress: destinationAddress,
    location: { lat: destLat, lng: destLng },
  } = extractedDestination;

  // 3. Validate Coordinates
  if (
    !sourceAddress ||
    !destinationAddress ||
    typeof sourceLat !== "number" ||
    typeof sourceLng !== "number" ||
    typeof destLat !== "number" ||
    typeof destLng !== "number"
  ) {
    throw new Error("Incomplete or invalid source/destination location.");
  }

  // 4. Prevent Duplicate Bookings (Simple spam check)
  // Checks if a booking with same Phone, Date, Source & Dest exists
  const bookingQuery = query(
    collection(db, "bookings"),
    where("phone", "==", phone),
    where("date", "==", date),
    where("source.fullAddress", "==", sourceAddress),
    where("destination.fullAddress", "==", destinationAddress)
  );

  const existing = await getDocs(bookingQuery);
  if (!existing.empty) {
    throw new Error("A booking with these exact details already exists.");
  }

  // 5. Generate Readable Booking ID
  const bookingId = generateBookingId(name, phone);

  // 6. Construct Payload
  const bookingEntry = {
    bookingId,
    tripType: normalizedTripType,
    date,
    // Only save returnDate if it's a round trip
    returnDate: normalizedTripType === "round" ? returnDate : null, 
    source: extractedSource,
    destination: extractedDestination,
    vehicleType,
    cost: Number(cost), // Ensure number
    distance: Number(distance), // Ensure number
    duration: Number(duration), // Ensure number
    name,
    phone,
    // CRITICAL for Rules: explicit null if undefined
    userId: userId || null, 
    userEmail: userEmail || null, 
    status: "pending", // Default status
    createdAt: serverTimestamp(),
  };

  // 7. Save to Firestore
  await addDoc(collection(db, "bookings"), bookingEntry);
  
  return bookingId;
}