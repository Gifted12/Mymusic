/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}" ],
  theme: {
    extend:{
      fontFamily:{
        "popping":[
          'Poppins',
          'sans-serif'
        ],
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
    },
 },
  plugins: [require("tailwindcss-animate")],
};



// #181C14
// #024CAA
// #EC8305
// #DBD3D3

