import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle} from "lucide-react";
import { useLocation } from "react-router-dom";

import TripTypeSelector from "./BookingForm/TripTypeSelector";
import DateTimePicker from "./BookingForm/DateTimePicker";
import LocationInputs from "./BookingForm/LocationInputs";
import VehicleSelector from "./BookingForm/VehicleSelector";
import ContactInputs from "./BookingForm/ContactInputs";
import SubmitButton from "./BookingForm/SubmitButton";
import TripSummary from "./TripSummary";

import { useAuth } from "../utils/AuthContext";
import useDistanceCalculator from "../hooks/useDistanceCalculator";
import submitBooking from "../utils/submitBooking";

const BookingForm = () => {
  const location = useLocation();
  const rebookState = location.state;

  const [tripType, setTripType] = useState("oneway");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [sourcePlace, setSourcePlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [pickupError, setPickupError] = useState("");
  const [dropError, setDropError] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const { user, loginWithGoogle } = useAuth();

  const { distance, duration, cost } =
    useDistanceCalculator({
      sourcePlace,
      destinationPlace,
      vehicleType,
      tripType,
    }) || {};

  /** Prefill for Rebooking */
  useEffect(() => {
    if (rebookState) {
      if (rebookState.tripType) setTripType(rebookState.tripType);
      if (rebookState.vehicleType) setVehicleType(rebookState.vehicleType);
      if (rebookState.source) setSourcePlace(rebookState.source);
      if (rebookState.destination) setDestinationPlace(rebookState.destination);
    }
  }, [rebookState]);

  /** FIXED VALIDATION FOR NEW GOOGLE MAPS FORMAT */
  const validatePlace = (place, label) => {
    if (!place) return `${label} is required`;
    if (!place.displayName) return `${label} is invalid`;

    const lat = place.location?.lat;
    const lng = place.location?.lng;

    if (typeof lat !== "number" || typeof lng !== "number") {
      return `${label} coordinates are invalid`;
    }

    return "";
  };

  const validateForm = () => {
    const sourceErr = validatePlace(sourcePlace, "Pickup location");
    const destErr = validatePlace(destinationPlace, "Drop location");

    setPickupError(sourceErr);
    setDropError(destErr);

    if (sourceErr || destErr) return "Location validation failed";
    if (!vehicleType) return "Please select a vehicle";
    if (!name.trim().match(/^[A-Za-z ]+$/))
      return "Name must contain only letters";
    if (!phone.trim().match(/^[6-9]\d{9}$/))
      return "Enter a valid 10-digit Indian phone number";
    if (!date) return "Please select a travel date";
    if (tripType === "roundtrip" && !returnDate)
      return "Please select a return date";
    if (!distance || !cost || !duration)
      return "Trip details not calculated yet";

    return "";
  };

  /** Show summary when valid */
  useEffect(() => {
    const inputsValid =
      sourcePlace &&
      destinationPlace &&
      validatePlace(sourcePlace, "Pickup") === "" &&
      validatePlace(destinationPlace, "Drop") === "" &&
      vehicleType &&
      name.trim().match(/^[A-Za-z ]+$/) &&
      phone.trim().match(/^[6-9]\d{9}$/) &&
      date &&
      (tripType === "oneway" || returnDate) &&
      distance &&
      duration &&
      cost;

    setShowSummary(inputsValid);
  }, [
    sourcePlace,
    destinationPlace,
    vehicleType,
    name,
    phone,
    date,
    returnDate,
    tripType,
    distance,
    duration,
    cost,
  ]);

  /** Reset Form */
  const resetForm = () => {
    setTripType("oneway");
    setDate("");
    setReturnDate("");
    setVehicleType("");
    setName("");
    setPhone("");
    setSourcePlace(null);
    setDestinationPlace(null);
    setPickupError("");
    setDropError("");
    setShowSummary(false);
  };

  /** Final Submit */
  const handleFinalSubmit = async () => {
    const bookingData = {
      tripType: tripType === "roundtrip" ? "round" : "single",
      date,
      returnDate: tripType === "roundtrip" ? returnDate : null,

      source: {
        displayName: sourcePlace.displayName,
        address: sourcePlace.address,
        location: {
          lat: sourcePlace.location.lat,
          lng: sourcePlace.location.lng,
        },
      },
      destination: {
        displayName: destinationPlace.displayName,
        address: destinationPlace.address,
        location: {
          lat: destinationPlace.location.lat,
          lng: destinationPlace.location.lng,
        },
      },

      vehicleType,
      cost,
      distance,
      duration,
      name,
      phone,
      userId: user?.uid || null,
      userEmail: user?.email || null,
    };

    try {
      const id = await submitBooking(bookingData);
      setBookingId(id);
      setShowSuccessModal(true);
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /** On Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      if (validationError !== "Location validation failed") {
        setError(validationError);
      }
      return;
    }

    setSubmitting(true);

    try {
      if (!user && !loginCompleted) {
        await loginWithGoogle();
        setLoginCompleted(true);
        setShowLoginModal(true);
        return;
      }

      await handleFinalSubmit();
    } catch (err) {
      console.error("Login/submission error:", err);
      setError("Something went wrong during login.");
      setSubmitting(false);
    }
  };

  /** UI */
  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 text-white"
      >
        {/* Step 1: Trip Type */}
        <div className="p-1 rounded-full bg-black/40 backdrop-blur-sm">
            <TripTypeSelector tripType={tripType} setTripType={setTripType} />
        </div>

        {/* Step 2: Route & Date */}
        <div className="space-y-6">
            <LocationInputs
                onSourcePlaceSelect={setSourcePlace}
                onDestinationPlaceSelect={setDestinationPlace}
                pickupError={pickupError}
                dropError={dropError}
            />

            <DateTimePicker
                tripType={tripType}
                date={date}
                returnDate={returnDate}
                setDate={setDate}
                setReturnDate={setReturnDate}
            />
        </div>

        {/* Step 3: Vehicle Selection */}
        <div className="pt-4 border-t border-white/10">
            <VehicleSelector
                tripType={tripType}
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
            />
        </div>

        {/* Summary Section (Conditional) */}
        <AnimatePresence>
          {distance && cost && duration && showSummary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden border shadow-lg rounded-2xl bg-white/5 border-taxi-yellow/20"
            >
              <div className="p-2">
                  <TripSummary
                    distance={distance}
                    duration={duration}
                    cost={cost}
                    tripType={tripType === "roundtrip" ? "round" : "single"}
                  />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Contact & Submit */}
        <div className="pt-4 space-y-6 border-t border-white/10">
            <ContactInputs
                name={name}
                phone={phone}
                setName={setName}
                setPhone={setPhone}
            />

            <SubmitButton submitting={submitting} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 p-3 text-sm font-semibold text-red-200 border border-red-500/30 bg-red-900/20 rounded-xl"
          >
            <AlertTriangle className="w-5 h-5 text-red-500" /> {error}
          </motion.div>
        )}
      </motion.form>

      {/* --- MODALS --- */}

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm p-8 text-center border shadow-2xl bg-taxi-dark rounded-3xl border-taxi-gray"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 bg-taxi-yellow blur-3xl" />
              
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="mb-6 text-sm text-gray-400">Your ride has been scheduled.</p>

              <div className="mb-8 overflow-hidden border rounded-xl bg-black/50 border-white/10">
                  <p className="py-2 text-xs font-bold tracking-widest text-gray-500 uppercase bg-white/5">Booking ID</p>
                  <p className="py-3 font-mono text-lg font-bold tracking-wider text-taxi-yellow">
                    {bookingId}
                  </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3.5 text-sm font-bold text-black uppercase transition-all transform bg-taxi-yellow rounded-xl hover:bg-white hover:scale-[1.02] shadow-[0_0_15px_rgba(255,193,7,0.3)]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm p-8 text-center border shadow-2xl bg-taxi-dark rounded-3xl border-taxi-gray"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-taxi-yellow/10">
                <CheckCircle2 className="w-8 h-8 text-taxi-yellow" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">Login Successful</h3>
              <p className="mb-8 text-sm text-gray-400">
                You are now logged in. Please confirm to proceed with your booking.
              </p>

              <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="w-full px-4 py-3 text-sm font-bold text-gray-400 transition-colors border border-gray-600 rounded-xl hover:text-white hover:border-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      handleFinalSubmit();
                    }}
                    className="w-full px-4 py-3 text-sm font-bold text-black transition-colors bg-taxi-yellow rounded-xl hover:bg-white"
                  >
                    Confirm
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingForm;