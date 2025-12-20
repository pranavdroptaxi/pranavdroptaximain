import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronUp, FileText, Star, Home, ArrowRight, Calendar } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

// Toast theme
const toastTheme = {
  style: {
    background: "#1a1a1a",
    color: "#FFC107",
    border: "1px solid #FFC107",
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

// Logic Helpers
const getDays = (start, end) => {
  const s = new Date(start);
  const e = end ? new Date(end) : s;
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff + 1 : 1;
};

const formatDate = (val) => {
  if (!val) return "N/A";
  const date = val.toDate ? val.toDate() : new Date(val);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDuration = (minutes) => {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
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

      // Sort by latest created
      merged.sort((a, b) => {
        const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt || 0);
        return dateB - dateA;
      });

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

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // UI Helper for Status Tags
  const getStatusTag = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border";
    switch ((status || "").toLowerCase()) {
      case "confirmed":
        return <span className={`${base} bg-green-900/30 text-green-400 border-green-500/30`}>Confirmed</span>;
      case "completed":
        return <span className={`${base} bg-blue-900/30 text-blue-400 border-blue-500/30`}>Completed</span>;
      case "cancelled":
        return <span className={`${base} bg-red-900/30 text-red-400 border-red-500/30`}>Cancelled</span>;
      default:
        return <span className={`${base} bg-yellow-900/30 text-yellow-400 border-yellow-500/30`}>Pending</span>;
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
        query(collection(db, "reviews"), where("bookingId", "==", bookingId), where("userId", "==", user.uid))
      );
      if (!reviewSnap.empty) {
        toast.error("You already submitted a review.", toastTheme);
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
      toast.success("Review submitted!", toastTheme);
    } catch {
      toast.error("Failed to submit review.", toastTheme);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-200 bg-black">
      
      {/* --- GLOBAL FIXED BACKGROUND (Full Page & Brighter) --- */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-100"
            style={{ backgroundImage: "url('/images/taxi.jpg')" }}
        />
        {/* Lighter gradient to let the image shine through, darker at top/bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* 2. Navigation Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
            <img 
              src="/favicon.ico" 
              alt="Logo" 
              className="object-contain w-10 h-10"
            />
            <span className="text-xl font-bold tracking-tighter text-white">Pranav Drop Taxi</span>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black transition-all transform rounded-full shadow-lg bg-taxi-yellow hover:bg-white hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-4xl px-4 py-8 mx-auto sm:px-6">
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Your <span className="text-taxi-yellow">Bookings</span></h2>
          <div className="w-16 h-1 mx-auto mt-2 rounded bg-taxi-yellow shadow-[0_0_10px_#FFC107]"></div>
        </div>

        {error && (
          <p className="p-3 mb-6 text-sm text-center text-red-400 border border-red-500/30 bg-red-900/20 rounded-xl">
            {error}
          </p>
        )}

        {loading ? (
          <div className="space-y-4">
             {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-800 rounded-xl animate-pulse"></div>)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center border shadow-2xl bg-black/60 backdrop-blur-md rounded-3xl border-taxi-gray">
             <p className="text-gray-400">No bookings found.</p>
             <Link to="/" className="inline-block mt-4 text-taxi-yellow hover:underline">Book your first ride now →</Link>
          </div>
        ) : (
          <div className="space-y-6">
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
                createdAt,
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
              const isCompleted = status === 'completed';
              
              const base = Number(cost || 0);
              const toll = Number(tollCharges || 0);
              const parking = Number(parkingCharges || 0);
              const hill = Number(hillCharges || 0);
              const permit = Number(permitCharges || 0);
              
              const days = getDays(date, isRound ? returnDate : date);
              const bata = days * 400; 
              const total = base + bata + toll + parking + hill + permit;
              
              const isExpanded = expandedId === id;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
                    isExpanded 
                      ? "bg-black/80 border-taxi-yellow shadow-[0_0_15px_rgba(255,193,7,0.15)]" 
                      : "bg-black/60 backdrop-blur-md border-taxi-gray hover:border-gray-500"
                  }`}
                >
                  {/* Card Header (Summary) */}
                  <div 
                    onClick={() => toggleExpand(id)}
                    className="flex flex-col gap-4 p-5 cursor-pointer sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-black rounded-full bg-taxi-yellow">
                          {index + 1}
                        </span>
                        <h3 className="font-mono text-sm font-bold text-gray-400">ID: {bookingId || id.slice(0,8)}</h3>
                        
                        {/* Status Tag */}
                        {getStatusTag(status)}

                        {/* --- DOWNLOAD INVOICE BUTTON (Header) --- */}
                        {isCompleted && invoiceEnabled && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Stop expand toggle
                              generateInvoicePDF(booking);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-black transition-transform bg-green-500 rounded hover:bg-green-400 hover:scale-105"
                            title="Download Invoice"
                          >
                            <FileText className="w-3 h-3" /> Invoice
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-white sm:text-base">
                         <span>{source?.displayName || "N/A"}</span>
                         <ArrowRight className="w-4 h-4 text-gray-500" />
                         <span>{destination?.displayName || "N/A"}</span>
                      </div>
                      
                      <p className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Trip: {formatDate(date)} {isRound && `— ${formatDate(returnDate)}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1">
                       <p className="text-lg font-bold text-white">
                         ₹{total.toLocaleString()}
                         {!isCompleted && <span className="ml-1 text-xs font-normal text-yellow-500/70">(Est)</span>}
                       </p>
                       <div className="p-2 transition-colors rounded-full bg-white/5 hover:bg-white/10">
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-taxi-yellow"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
                       </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-800 bg-black/40"
                      >
                        <div className="p-6 space-y-6">
                          
                          {/* Details Grid */}
                          <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
                             {/* Col 1: General Info */}
                             <div className="space-y-3">
                                <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">Trip Details</h4>
                                <div className="flex justify-between"><span className="text-gray-500">Booked On:</span> <span>{formatDate(createdAt)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Type:</span> <span>{isRound ? "Round Trip" : "One Way"}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Vehicle:</span> <span>{vehicleLabelMap[vehicleType]}</span></div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Distance:</span> 
                                    <span>{distance || '-'} km {!isCompleted && <span className="text-xs text-yellow-500/70">(Est)</span>}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Duration:</span> 
                                    <span>{formatDuration(duration)} {!isCompleted && <span className="text-xs text-yellow-500/70">(Est)</span>}</span>
                                </div>
                             </div>

                             {/* Col 2: Cost Breakdown */}
                             <div className="space-y-3">
                                <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">Fare Breakdown</h4>
                                <div className="flex justify-between"><span className="text-gray-500">Base Fare:</span> <span>₹{base}</span></div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Driver Bata:</span> 
                                    <span className="text-xs text-gray-400">₹400 × {days} days = <span className="text-sm text-white">₹{bata}</span></span>
                                </div>
                                {toll > 0 && <div className="flex justify-between"><span className="text-gray-500">Toll:</span> <span>₹{toll}</span></div>}
                                {parking > 0 && <div className="flex justify-between"><span className="text-gray-500">Parking:</span> <span>₹{parking}</span></div>}
                                {hill > 0 && <div className="flex justify-between"><span className="text-gray-500">Hill Charges:</span> <span>₹{hill}</span></div>}
                                {permit > 0 && <div className="flex justify-between"><span className="text-gray-500">Permit:</span> <span>₹{permit}</span></div>}
                                <div className="flex justify-between pt-2 font-bold border-t border-gray-700 text-taxi-yellow">
                                   <span>Total:</span> <span>₹{total}</span>
                                </div>
                             </div>
                          </div>

                          {/* Review Section */}
                          {isCompleted && (
                            <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/50">
                               {review ? (
                                 <div>
                                    <div className="flex items-center gap-2 mb-2 text-sm font-bold text-taxi-yellow">
                                       <Star className="w-4 h-4 fill-current" /> Your Review
                                    </div>
                                    <p className="text-sm italic text-gray-400">"{review}"</p>
                                 </div>
                               ) : (
                                 <div className="space-y-3">
                                    <label className="block text-sm font-bold text-taxi-yellow">Rate Your Experience</label>
                                    <textarea
                                      rows={2}
                                      value={tempReview}
                                      placeholder="Write your feedback here..."
                                      onChange={(e) => setBookings(prev => prev.map(b => b.id === id ? { ...b, tempReview: e.target.value } : b))}
                                      className="w-full p-3 text-sm text-white placeholder-gray-600 bg-black border border-gray-700 rounded-lg focus:border-taxi-yellow focus:outline-none"
                                    />
                                    <button
                                      onClick={() => handleReviewSubmit(id, tempReview)}
                                      className="px-4 py-2 text-xs font-bold text-black transition-colors rounded-lg bg-taxi-yellow hover:bg-yellow-400"
                                    >
                                      Submit Review
                                    </button>
                                 </div>
                               )}
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;