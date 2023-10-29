const plugin = require("tailwindcss/plugin")
module.exports = plugin.withOptions(() => {
    return function ({ addUtilities }) {
        addUtilities({
           '.bg-coral' : { background: "coral"}
        });
      }
    })


// module.exports = plugin.withOptions(() => {
//     return function ({ addUtilities }) {
//       console.log("addUtilities")
//         const newUtilities = {
//           '.custom-bahar': {
//                 background: '#000',
//           },
//         };
//         addUtilities(newUtilities, ['responsive', 'hover']);
//       }
//     })