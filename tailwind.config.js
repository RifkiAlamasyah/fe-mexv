/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // Jika menggunakan Vite
    "./src/**/*.{js,jsx,ts,tsx}", // Semua file React di folder src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
