import React from 'react';
import { User, Phone } from 'lucide-react';

const ContactInputs = ({ name, phone, setName, setPhone }) => {
  // Handle name: allow only letters and spaces
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  // Handle phone: only 10 digits allowed, no characters
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="full-name" className="ml-1 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <User className="w-4 h-4 text-gray-400 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
          <input
            id="full-name"
            name="full-name"
            aria-label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
            className="w-full py-3.5 pl-11 pr-4 text-xs font-bold text-white placeholder-gray-400 transition-all bg-white/5 border border-white/5 rounded-xl focus:outline-none focus:border-taxi-yellow/30 focus:bg-black/50 shadow-inner"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="space-y-2">
        <label htmlFor="phone-number" className="ml-1 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          Phone Number
        </label>
        <div className="relative flex group">
          <span className="flex items-center justify-center px-4 text-xs font-bold text-gray-300 transition-colors border border-r-0 border-white/5 bg-white/5 rounded-l-xl group-focus-within:border-taxi-yellow/30 group-focus-within:text-taxi-yellow">
            🇮🇳 +91
          </span>
          <input
            id="phone-number"
            name="phone-number"
            aria-label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={handlePhoneChange}
            required
            pattern="[0-9]{10}"
            className="w-full py-3.5 pl-4 pr-11 text-xs font-bold text-white placeholder-gray-400 transition-all bg-white/5 border border-white/5 rounded-r-xl focus:outline-none focus:border-taxi-yellow/30 focus:bg-black/50 shadow-inner"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Phone className="w-4 h-4 text-gray-400 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactInputs;