/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./resources/views/app.blade.php",
    "./resources/app/**/*.{js,ts,jsx,tsx}",
],
  darkMode: 'class',
  theme: {
  
    extend: {
      colors: {
        'bluenf': '#1242bf',
      },

      fontFamily: {
        'mont': ['Montserrat']
      },
    },
  },
  plugins: [],
}

