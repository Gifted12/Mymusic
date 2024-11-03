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
    },
 },
  plugins: [require("tailwindcss-animate")],
};



// #091057
// #024CAA
// #EC8305
// #DBD3D3

