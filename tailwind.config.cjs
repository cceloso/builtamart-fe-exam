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
        "orange": "#FE6632",
      }
    },
  },
  plugins: [],
}
