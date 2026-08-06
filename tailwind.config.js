/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suggested Brand Palette
        'taxi-yellow': '#F4B400', // Accent Taxi Yellow
        'brand-blue': '#0F4C81',  // Primary Deep Blue
        'brand-green': '#2E7D32', // Success Green
        'brand-dark': '#1E293B',  // Dark Slate
        'brand-bg': '#F8FAFC',    // Light Slate Background
        'taxi-black': '#000000',  // Pure Black
        'taxi-dark': '#0A0A0A',   // Dark surface
        'taxi-gray': '#1C1C1C',   // Border/surface
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}