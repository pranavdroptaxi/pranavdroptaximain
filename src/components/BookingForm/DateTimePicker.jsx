import React from 'react';
import { Calendar } from 'lucide-react';

const DateTimePicker = ({ tripType, date, returnDate, setDate, setReturnDate }) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      
      {/* Pickup Date */}
      <div className="space-y-2">
        <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Pickup Date
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Calendar className="w-5 h-5 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
          <input
            id="pickup-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            // Apply dark color scheme for the native date picker popup
            style={{ colorScheme: 'dark' }} 
            className="w-full py-3.5 pl-12 pr-4 text-white bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-taxi-yellow focus:ring-1 focus:ring-taxi-yellow/50 transition-all cursor-pointer placeholder-gray-500"
          />
        </div>
      </div>

      {/* Return Date – only for round trip */}
      {tripType === 'roundtrip' && (
        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
            Return Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
            </div>
            <input
              id="return-date"
              type="date"
              min={date || today} // return date must be after pickup
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              style={{ colorScheme: 'dark' }}
              className="w-full py-3.5 pl-12 pr-4 text-white bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-taxi-yellow focus:ring-1 focus:ring-taxi-yellow/50 transition-all cursor-pointer placeholder-gray-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;