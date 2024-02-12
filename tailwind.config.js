/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#23A6F0',
        'secondaryColor' : '#737373',
      },
    },
  },
  plugins: [],
}