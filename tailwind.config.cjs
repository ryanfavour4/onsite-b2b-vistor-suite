/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      ubuntu: ["ubuntu", "sans-serif"],
    },
    colors: {
      light: "#b6b1cd",
      lightest: "#f1f2f7",
      blue: "#301896",
      lightblue: "#604e9e",
      lightestblue: "#8c7abd",
      dark: "#43464a",
      lightred: "#F08080",
      darkred: "#8B0000",
      transparent: "rgba(0, 0, 0, 0)",
      black: "rgb(0, 0, 0)",
      white: "rgba(255, 255, 255)",
      green: "#0f6e17",
      yellow: "#ffff00",
    },
  },
  plugins: [],
};
