/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
      },
      colors: { /* optional brand tweak */ }
    },
  },
  plugins: [],
};
