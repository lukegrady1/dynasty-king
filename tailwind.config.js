/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        gold: '#c8a96e',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};
