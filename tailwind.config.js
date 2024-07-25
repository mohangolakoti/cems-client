/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Roboto:["Roboto", "sans-serif"],
        Montserrat:["Montserrat", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Audiowide:["Audiowide", "sans-serif"]
      },
      colors: {
        'text': '#1F2937',
        'r-dbtn': '#C8553D',
        'r-logo': '#588B8B',
        'r-nrml':'#FFD5C2'
      }
    },
  },
  plugins: [
  ],
}
