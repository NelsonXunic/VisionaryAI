/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans the app directory for Tailwind classes
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Scans  custom components directory
    './public/**/*.svg', // Scans SVG files in public for classes if use them directly
    // Add other directories like hooks/, lib/ if they will contain Tailwind classes
  ],
  theme: {
    extend: {
      // customize theme here
    },
  },
  plugins: [],
};