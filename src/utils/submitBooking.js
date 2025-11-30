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
 * BookingForm sends:
 *
 *  {
 *    displayName: "",
 *    address: "",
 *    location: { lat: number, lng: number }
 *  }
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
    tripType,        // "round" or "single"
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

  // Normalize place data
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

  // Validate address & coordinates
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

  // Prevent duplicate booking
  const bookingQuery = query(
    collection(db, "bookings"),
    where("phone", "==", phone),
    where("date", "==", date),
    where("source.fullAddress", "==", sourceAddress),
    where("destination.fullAddress", "==", destinationAddress)
  );

  const existing = await getDocs(bookingQuery);
  if (!existing.empty) {
    throw new Error("A booking with these details already exists.");
  }

  // Generate booking ID
  const bookingId = generateBookingId(name, phone);

  // Firestore payload
  const bookingEntry = {
    bookingId,
    tripType,                                       // "round" or "single"
    date,
    returnDate: tripType === "round" ? returnDate : null,  // ✅ FIXED
    source: extractedSource,
    destination: extractedDestination,
    vehicleType,
    cost,
    distance,
    duration,
    name,
    phone,
    userId: userId || null,
    userEmail: userEmail || null,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  await addDoc(collection(db, "bookings"), bookingEntry);
  return bookingId;
}
