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
        <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <User className="w-5 h-5 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
            className="w-full py-3.5 pl-12 pr-4 text-white placeholder-gray-600 transition-all bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-taxi-yellow focus:ring-1 focus:ring-taxi-yellow/50"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="space-y-2">
        <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Phone Number
        </label>
        <div className="relative flex group">
          <span className="flex items-center justify-center px-4 font-bold text-gray-400 transition-colors border border-r-0 border-white/10 bg-white/5 rounded-l-xl group-focus-within:border-taxi-yellow group-focus-within:text-taxi-yellow">
            +91
          </span>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={handlePhoneChange}
            required
            pattern="[0-9]{10}"
            className="w-full py-3.5 pl-4 pr-12 text-white placeholder-gray-600 transition-all bg-black/50 border border-white/10 rounded-r-xl focus:outline-none focus:border-taxi-yellow focus:ring-1 focus:ring-taxi-yellow/50"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Phone className="w-5 h-5 text-gray-500 transition-colors group-focus-within:text-taxi-yellow" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactInputs;