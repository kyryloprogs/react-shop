/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "supergray": "#EBECEE",
        "extrumsPurple": "#766ED3"
      },
      spacing: {
        '85': '85px',
      },
      backgroundImage: {
        'banner1': "url('./img/banner1.png')",
        'banner2': "url('./img/banner2.png')",
        'banner3': "url('./img/banner3.png')",
        'banner4': "url('./img/banner4.png')",
        'banner5': "url('./img/banner5.png')",
        'banner6': "url('./img/banner6.png')",
      },
      borderRadius: {
        "extrumsDefault": "10px"
      }
    },
  },
  plugins: [],
}