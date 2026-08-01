import React, { useState, useEffect, useRef } from "react";
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
  
  const scrollRef = useRef(0);

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

  useEffect(() => {
    if (rebookState) {
      if (rebookState.tripType) setTripType(rebookState.tripType);
      if (rebookState.vehicleType) setVehicleType(rebookState.vehicleType);
      if (rebookState.source) setSourcePlace(rebookState.source);
      if (rebookState.destination) setDestinationPlace(rebookState.destination);
    }
  }, [rebookState]);

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
    if (!name.trim().match(/^[A-Za-z ]+$/)) return "Name must contain only letters";
    if (!phone.trim().match(/^[6-9]\d{9}$/)) return "Enter a valid 10-digit Indian phone number";
    if (!date) return "Please select a travel date";
    if (tripType === "roundtrip" && !returnDate) return "Please select a return date";
    if (!distance || !cost || !duration) return "Trip details not calculated yet";
    return "";
  };

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
  }, [sourcePlace, destinationPlace, vehicleType, name, phone, date, returnDate, tripType, distance, duration, cost]);

  const resetForm = () => {
    scrollRef.current = window.scrollY;
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
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollRef.current, behavior: 'instant' });
    });
  };

  const handleFinalSubmit = async () => {
    const bookingData = {
      tripType: tripType === "roundtrip" ? "round" : "single",
      date,
      returnDate: tripType === "roundtrip" ? returnDate : null,
      source: {
        displayName: sourcePlace.displayName,
        address: sourcePlace.address,
        location: { lat: sourcePlace.location.lat, lng: sourcePlace.location.lng },
      },
      destination: {
        displayName: destinationPlace.displayName,
        address: destinationPlace.address,
        location: { lat: destinationPlace.location.lat, lng: destinationPlace.location.lng },
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
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      if (validationError !== "Location validation failed") setError(validationError);
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
      setError("Something went wrong during login.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10 text-white"
      >
        {/* Step Indicator */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-10 text-[10px] font-extrabold uppercase tracking-widest text-gray-500 bg-white/5 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className={`flex items-center gap-1.5 transition-colors ${(sourcePlace && destinationPlace) ? 'text-taxi-yellow font-extrabold' : 'text-gray-300'}`}>
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${(sourcePlace && destinationPlace) ? 'border-taxi-yellow bg-taxi-yellow text-black' : 'border-white/20 bg-white/10'}`}>1</span> Route
          </div>
          <div className={`w-6 h-px transition-colors ${(sourcePlace && destinationPlace) ? 'bg-taxi-yellow/50' : 'bg-white/10'}`} />
          <div className={`flex items-center gap-1.5 transition-colors ${vehicleType ? 'text-taxi-yellow font-extrabold' : (sourcePlace && destinationPlace) ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${vehicleType ? 'border-taxi-yellow bg-taxi-yellow text-black' : 'border-white/20 bg-white/10'}`}>2</span> Vehicle
          </div>
          <div className={`w-6 h-px transition-colors ${vehicleType ? 'bg-taxi-yellow/50' : 'bg-white/10'}`} />
          <div className={`flex items-center gap-1.5 transition-colors ${(name && phone && date) ? 'text-taxi-yellow font-extrabold' : vehicleType ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${(name && phone && date) ? 'border-taxi-yellow bg-taxi-yellow text-black' : 'border-white/20 bg-white/10'}`}>3</span> Details
          </div>
          <div className={`w-6 h-px transition-colors ${(name && phone && date) ? 'bg-taxi-yellow/50' : 'bg-white/10'}`} />
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/10 text-[9px] bg-white/5">4</span> Confirm
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <TripTypeSelector tripType={tripType} setTripType={setTripType} />
        </div>

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

        <div className="pt-6 border-t border-white/5">
          <VehicleSelector
            tripType={tripType}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            distance={distance}
          />
        </div>

        <AnimatePresence>
          {distance && cost && duration && showSummary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden border shadow-2xl rounded-3xl bg-white/5 border-taxi-yellow/10"
            >
              <div className="p-1">
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

        <div className="pt-6 space-y-6 border-t border-white/5">
          <ContactInputs name={name} phone={phone} setName={setName} setPhone={setPhone} />
          <SubmitButton submitting={submitting} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 p-3 text-xs font-bold text-red-200 border border-red-500/25 bg-red-900/10 rounded-xl"
          >
            <AlertTriangle className="w-4 h-4 text-red-500" /> {error}
          </motion.div>
        )}
      </motion.form>

      {/* --- MODALS --- */}

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            style={{ overscrollBehavior: 'contain' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex flex-col items-center w-full max-w-sm p-8 text-center border shadow-2xl bg-black border-white/10 rounded-3xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 bg-taxi-yellow blur-3xl" />
              
              <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-green-500/10 border border-green-500/15 text-green-500 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="mb-2 text-xl font-extrabold tracking-wider text-white uppercase">Booking Confirmed!</h2>
              <p className="mb-8 text-xs text-gray-500 uppercase tracking-wider font-bold">Your ride has been scheduled successfully.</p>

              <div className="w-full mb-8 overflow-hidden border rounded-2xl bg-white/5 border-white/5 shadow-inner">
                  <p className="py-2.5 text-[9px] font-extrabold tracking-widest text-gray-500 uppercase bg-white/5">Booking ID</p>
                  <p className="py-5 font-mono text-xl font-extrabold tracking-widest text-taxi-yellow">
                    {bookingId}
                  </p>
              </div>

              <button
                type="button" 
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-4 text-xs font-bold text-black uppercase tracking-wider transition-all transform bg-taxi-yellow rounded-xl hover:bg-white active:scale-95 shadow-[0_0_20px_rgba(255,193,7,0.2)]"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            style={{ overscrollBehavior: 'contain' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center w-full max-w-sm p-8 text-center border shadow-2xl bg-black border-white/10 rounded-3xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-taxi-yellow/10 border border-taxi-yellow/15 text-taxi-yellow shrink-0 animate-pulse-glow">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="mb-2 text-lg font-extrabold tracking-wider text-white uppercase">Login Successful</h3>
              <p className="mb-8 text-xs leading-relaxed text-gray-400 font-bold uppercase tracking-wider">
                You are now signed in. Click confirm to finalize your booking details.
              </p>

              <div className="flex flex-col w-full gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors border border-white/5 rounded-xl hover:text-white hover:bg-white/5 active:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      handleFinalSubmit();
                    }}
                    className="flex-1 px-4 py-3.5 text-xs font-bold text-black uppercase tracking-wider transition-all bg-taxi-yellow rounded-xl hover:bg-white active:scale-95 shadow-[0_0_15px_rgba(255,193,7,0.2)]"
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