import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { generateBookingId } from "../utils/generateBookingId";

/**
 * Converts a place object from BookingForm into Firestore-safe format.
 */
function extractPlaceDetails(place) {
  if (!place) return null;

  const displayName = place.displayName || "";
  const address = place.address || "";

  // Human readable combined address used for UI and Spam Check
  const fullAddress =
    displayName && address
      ? `${displayName}, ${address}`
      : address || displayName;

  const lat = place.location?.lat ?? null;
  const lng = place.location?.lng ?? null;

  return {
    displayName,
    address,
    fullAddress,
    location: { lat, lng },
  };
}

export default async function submitBooking(data) {
  const {
    tripType,
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
    throw new Error("Pickup or drop location is missing.");
  }

  // 1. Normalize Place Data
  const extractedSource = extractPlaceDetails(source);
  const extractedDestination = extractPlaceDetails(destination);

  // 2. Validate Coordinates & Addresses
  if (
    !extractedSource.fullAddress ||
    !extractedDestination.fullAddress ||
    typeof extractedSource.location.lat !== "number" ||
    typeof extractedDestination.location.lat !== "number"
  ) {
    throw new Error("Invalid location details. Please re-select locations.");
  }

  // 3. Prevent Duplicate Bookings (Spam check)
  // Check for existing pending booking with same phone and route on the same day
  const bookingQuery = query(
    collection(db, "bookings"),
    where("phone", "==", phone),
    where("date", "==", date),
    where("source.fullAddress", "==", extractedSource.fullAddress),
    where("status", "==", "pending"),
    limit(1)
  );

  const existing = await getDocs(bookingQuery);
  if (!existing.empty) {
    throw new Error("A booking for this route and date already exists under this phone number.");
  }

  // 4. Generate Readable Booking ID
  const bookingId = generateBookingId(name, phone);

  // 5. Construct Payload
  const bookingEntry = {
    bookingId,
    tripType: tripType === "round" ? "round" : "single",
    date,
    returnDate: tripType === "round" ? returnDate : null,
    source: extractedSource,
    destination: extractedDestination,
    vehicleType,
    cost: Number(cost),
    distance: Number(distance),
    duration: Number(duration),
    name,
    phone,
    userId: userId || null, // Critical for Firestore Rules
    userEmail: userEmail || null,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  // 6. Save to Firestore
  try {
    await addDoc(collection(db, "bookings"), bookingEntry);
    return bookingId;
  } catch (error) {
    console.error("Firestore Error:", error);
    if (error.code === 'permission-denied') {
      throw new Error("Permission denied. Please ensure you are logged in.");
    }
    throw new Error("Could not save booking. Please try again later.");
  }
}