/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darker':'#000C14',
        'dark':'#001220',
        'mid':'#001d33',
        'light':'#2D82B7',
        'highlight':'#fbae3c',
        'temp-black':'#0A0A0A'
      },
      backgroundImage: {
        "gradient-to-c": "radial-gradient(var(--tw-gradient-stops))"
      }
    },
  },
  plugins: [],
}