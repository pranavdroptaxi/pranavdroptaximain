import React from 'react';
import { Calendar } from 'lucide-react';

const DateTimePicker = ({ tripType, date, returnDate, setDate, setReturnDate }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      
      {/* Pickup Date */}
      <div className="space-y-2">
        <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          Pickup Date
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Calendar className="w-4 h-4 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
          <input
            id="pickup-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ colorScheme: 'dark' }} 
            className="w-full py-3.5 pl-11 pr-4 text-xs font-bold text-white bg-white/5 border border-white/5 rounded-xl focus:outline-none focus:border-taxi-yellow/30 focus:bg-black/50 transition-all cursor-pointer placeholder-gray-600 shadow-inner"
          />
        </div>
      </div>

      {/* Return Date – only for round trip */}
      {tripType === 'roundtrip' && (
        <div className="space-y-2">
          <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            Return Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Calendar className="w-4 h-4 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
            </div>
            <input
              id="return-date"
              type="date"
              min={date || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              style={{ colorScheme: 'dark' }}
              className="w-full py-3.5 pl-11 pr-4 text-xs font-bold text-white bg-white/5 border border-white/5 rounded-xl focus:outline-none focus:border-taxi-yellow/30 focus:bg-black/50 transition-all cursor-pointer placeholder-gray-600 shadow-inner"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;