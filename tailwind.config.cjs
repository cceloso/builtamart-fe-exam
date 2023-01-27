/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-charcoal": "#323233",
        "light-orange": "#FAD2C5",
        "orange": "#FF7C50",
        "dark-orange": "#FE6632",
        "green": "#72CC8A",
        "dark-green": "#5FB075",
        "red": "#D97564",
        "dark-red": "#D6604B",
      }
    },
  },
  plugins: [],
}
