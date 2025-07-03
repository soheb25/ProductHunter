/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}" , "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        customHd : '#1c2c3b',
        customText: '#1c2c3b',
        customBg : '#c5c6c7',
        customPbg :'#554940'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

