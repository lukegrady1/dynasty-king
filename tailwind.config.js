/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
      },
      colors: {
        brand: '#d42c2c',
        'brand-dark': '#a31f1f',
        gold: '#e8b230',
      }
    },
  },
  plugins: [],
};
