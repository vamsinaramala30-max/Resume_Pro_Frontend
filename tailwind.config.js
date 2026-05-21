/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'royal-gold': '#c5a059',
        'royal-navy': '#0a192f',
      }
    },
  },
  plugins: [],
}

