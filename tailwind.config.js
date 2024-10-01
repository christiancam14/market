/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      limon: "#E8FF00",
      blanco: "#fff",
      claro: "#F4F4F4",
      gris: "#DFE2E7",
      azul: {
        600: "#C1D4DE",
        700: "#232B40",
        800: "#2B3550",
        900: "#1B2132",
      },
    },
  },
  plugins: [],
};
