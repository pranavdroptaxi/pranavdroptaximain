/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Brand Palette
        'taxi-yellow': '#FFC107', // Signature Amber/Yellow
        'taxi-black': '#000000',  // Pure Black (Sidebar/Main BG)
        'taxi-dark': '#121212',   // Glossy Card Background (Slightly lighter than black)
        'taxi-gray': '#333333',   // Borders & Secondary Text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Optional: If you installed Inter font
      },
    },
  },
  plugins: [],
}