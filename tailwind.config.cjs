/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark-blue': '#182b32',
      'yellow': '#f3b236',
      'cyan': '#35c7c0',
      'dark-gray': '#1f3441',
      'light-gray': '#91a6b3',
      'very-light-gray': '#a9bec7',
    },
    extend: {},
  },
  plugins: [],
}