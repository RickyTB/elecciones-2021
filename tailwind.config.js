const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.indigo,
      secondary: colors.yellow,
      neutral: colors.gray,
      "map-bg": "#758bfd",
      plain: "#ffffff",
    },
    extend: {},
    stroke: (theme) => ({
      default: theme("colors.neutral.200"),
      secondary: theme("colors.secondary.200"),
      blue: theme("colors.blue.500"),
    }),
    fill: (theme) => ({
      default: theme("colors.neutral.400"),
      secondary: theme("colors.secondary.500"),
      blue: theme("colors.blue.500"),
    }),
  },
  variants: {
    extend: {
      stroke: ["hover", "focus"],
      fill: ["hover", "focus"],
    },
  },
  plugins: [],
};
