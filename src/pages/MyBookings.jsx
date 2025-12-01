import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { generateInvoicePDF } from "../utils/pdfGenerator";
import toast from "react-hot-toast";

// Toast theme
const toastTheme = {
  style: {
    background: "#000",
    color: "#FFD700",
    border: "1px solid #FFD700",
    fontSize: "14px",
  },
};

// Vehicle labels
const vehicleOptions = [
  { type: "sedan", label: "Sedan (4+1)" },
  { type: "etios", label: "Etios (4+1)" },
  { type: "suv", label: "SUV (7+1)" },
  { type: "innova", label: "Innova (7+1)" },
  { type: "innovacrysta", label: "Innova Crysta (7+1)" },
];

const vehicleLabelMap = vehicleOptions.reduce((acc, v) => {
  acc[v.type] = v.label;
  return acc;
}, {});

// Calculate trip days
const getDays = (start, end) => {
  const s = new Date(start);
  const e = end ? new Date(end) : s;
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff + 1 : 1;
};

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const bookingSnap = await getDocs(
        query(collection(db, "bookings"), where("userId", "==", user.uid))
      );

      const bookingsData = bookingSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        tempReview: "",
        review: "",
      }));

      const reviewSnap = await getDocs(
        query(collection(db, "reviews"), where("userId", "==", user.uid))
      );

      const reviewMap = {};
      reviewSnap.docs.forEach((doc) => {
        const r = doc.data();
        if (r.bookingId) reviewMap[r.bookingId] = r.review;
      });

      const merged = bookingsData.map((b) => ({
        ...b,
        review: reviewMap[b.id] || "",
      }));

      setBookings(merged);
    } catch (err) {
      toast.error("Failed to load bookings.", toastTheme);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user, fetchBookings]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Expand / Collapse
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toNum = (val) => (typeof val === "number" ? val : parseFloat(val) || 0);

  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
  };

  const getStatusTag = (status) => {
    const base = "text-xs px-2 py-1 rounded-full font-semibold text-white";
    switch ((status || "").toLowerCase()) {
      case "confirmed":
        return <span className={`${base} bg-green-600`}>Confirmed</span>;
      case "completed":
        return <span className={`${base} bg-blue-600`}>Completed</span>;
      case "cancelled":
        return <span className={`${base} bg-red-600`}>Cancelled</span>;
      default:
        return <span className={`${base} bg-yellow-500`}>Pending</span>;
    }
  };

  // Handle Review Submit
  const handleReviewSubmit = async (bookingId, reviewText) => {
    if (!reviewText.trim()) {
      toast.error("Please enter a valid review.", toastTheme);
      return;
    }

    try {
      const reviewSnap = await getDocs(
        query(
          collection(db, "reviews"),
          where("bookingId", "==", bookingId),
          where("userId", "==", user.uid)
        )
      );

      if (!reviewSnap.empty) {
        toast.error("You already submitted a review for this booking.", toastTheme);
        return;
      }

      await addDoc(collection(db, "reviews"), {
        bookingId,
        userId: user.uid,
        name: user.displayName || "Anonymous",
        review: reviewText.trim(),
        createdAt: serverTimestamp(),
      });

      await fetchBookings();
      toast.success("Review submitted successfully!", toastTheme);
    } catch {
      toast.error("Failed to submit review. Try again.", toastTheme);
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-sm opacity-70"
        style={{ backgroundImage: "url('/images/taxi.jpg')" }}
      />

      <div className="relative z-10 max-w-4xl px-3 py-8 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-yellow-300">Your Bookings</h2>
          <Link
            to="/"
            className="px-3 py-1.5 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 text-sm"
          >
            Home
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-2 text-sm text-center text-red-400">{error}</p>
        )}

        {/* Loading / No Data */}
        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-400">No bookings found.</p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking, index) => {
              const {
                id,
                bookingId,
                status,
                tripType,
                source,
                destination,
                date,
                returnDate,
                vehicleType,
                distance,
                duration,
                cost,
                tollCharges,
                parkingCharges,
                hillCharges,
                permitCharges,
                invoiceEnabled,
                review,
                tempReview,
              } = booking;

              const isRound = (tripType || "").toLowerCase() === "round";

              const base = toNum(cost);
              const toll = toNum(tollCharges);
              const parking = toNum(parkingCharges);
              const hill = toNum(hillCharges);
              const permit = toNum(permitCharges);

              const days = getDays(date, isRound ? returnDate : date);
              const bata = days * 400;

              const total = base + bata + toll + parking + hill + permit;

              const isExpanded = expandedId === id;

              return (
                <li
                  key={id}
                  className="p-3 border border-yellow-500 rounded-lg shadow bg-black/70 backdrop-blur-sm"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-yellow-300">
                          {index + 1}.
                        </span>
                        <h3 className="text-sm font-semibold">
                          Booking ID: {bookingId || id}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      {getStatusTag(status)}

                      <button
                        onClick={() => toggleExpand(id)}
                        className="p-1 mt-1 text-yellow-400 rounded hover:text-yellow-300 active:scale-90"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* From → To */}
                  <p className="mt-1 text-sm">
                    <strong>From:</strong> {source?.displayName || "N/A"}{" "}
                    <span className="mx-1">→</span>
                    <strong>To:</strong> {destination?.displayName || "N/A"}
                  </p>

                  {/* Cost */}
                  <p className="flex items-center gap-2 mt-1 text-sm font-semibold text-yellow-300">
                    Total Cost: ₹{total}
                    {status === "completed" ? (
                      <span className="bg-green-600 text-xs px-2 py-0.5 rounded text-white">
                        Paid
                      </span>
                    ) : (
                      <span className="text-xs italic text-gray-400">
                        (Estimated)
                      </span>
                    )}
                  </p>

                  {/* Invoice */}
                  {status === "completed" && invoiceEnabled && (
                    <button
                      onClick={() => generateInvoicePDF(booking)}
                      className="px-3 py-1 mt-2 text-xs text-black bg-green-400 rounded hover:bg-green-500"
                    >
                      📄 Download Invoice
                    </button>
                  )}

                  {/* Expanded Section */}
                  {isExpanded && (
                    <div className="grid grid-cols-1 gap-3 p-3 mt-3 text-xs border border-gray-600 rounded md:grid-cols-2 bg-black/80 sm:text-sm">
                      <div className="space-y-1">
                        <p>
                          <span className="font-semibold text-gray-300">
                            Trip Type:
                          </span>{" "}
                          {isRound ? "Round Trip" : "Single Trip"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-300">
                            Date:
                          </span>{" "}
                          {date}
                        </p>

                        {isRound && returnDate && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Return Date:
                            </span>{" "}
                            {returnDate}
                          </p>
                        )}

                        <p>
                          <span className="font-semibold text-gray-300">
                            Vehicle:
                          </span>{" "}
                          {vehicleLabelMap[vehicleType]}
                        </p>

                        {distance && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Distance:
                            </span>{" "}
                            {distance} km{" "}
                            {status !== "completed" && (
                              <span className="text-gray-500">(Estimated)</span>
                            )}
                          </p>
                        )}

                        {duration && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Duration:
                            </span>{" "}
                            {formatDuration(duration)}{" "}
                            {status !== "completed" && (
                              <span className="text-gray-500">(Estimated)</span>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p>
                          <span className="font-semibold text-gray-300">
                            Base Fare:
                          </span>{" "}
                          ₹{base}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-300">
                            Driver Bata:
                          </span>{" "}
                          ₹400 × {days} = ₹{bata}
                        </p>

                        {toll > 0 && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Toll Charges:
                            </span>{" "}
                            ₹{toll}
                          </p>
                        )}

                        {parking > 0 && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Parking Charges:
                            </span>{" "}
                            ₹{parking}
                          </p>
                        )}

                        {hill > 0 && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Hill Charges:
                            </span>{" "}
                            ₹{hill}
                          </p>
                        )}

                        {permit > 0 && (
                          <p>
                            <span className="font-semibold text-gray-300">
                              Permit Charges:
                            </span>{" "}
                            ₹{permit}
                          </p>
                        )}
                      </div>

                      {/* Review Display */}
                      {status === "completed" && review && (
                        <div className="col-span-2">
                          <p className="mb-1 text-sm font-semibold text-yellow-300">
                            Your Review:
                          </p>
                          <p className="p-2 text-xs text-gray-300 bg-gray-800 rounded">
                            {review}
                          </p>
                        </div>
                      )}

                      {/* Review Input */}
                      {status === "completed" && !review && (
                        <div className="col-span-2">
                          <p className="mb-1 text-sm font-semibold text-yellow-300">
                            Rate Your Trip:
                          </p>

                          <textarea
                            rows={3}
                            value={tempReview}
                            onChange={(e) =>
                              setBookings((prev) =>
                                prev.map((b) =>
                                  b.id === id
                                    ? { ...b, tempReview: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full p-2 text-sm text-black rounded"
                          />

                          <button
                            onClick={() =>
                              handleReviewSubmit(id, tempReview)
                            }
                            className="px-3 py-1 mt-2 text-xs text-black bg-yellow-300 rounded hover:bg-yellow-400"
                          >
                            Submit Review
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
