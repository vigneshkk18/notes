const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "white",
        primaryDark: "#1f2937",
        textPrimary: "#1f2937",
        textPrimaryDark: "#FFFFFF",
      },
      colors: {
        bgPrimary: "white",
        bgPrimaryDark: "#1f2937",
        primary: "#1f2937",
        primaryDark: "#FFFFFF",
        secondary: "#b0e9ca",
        secondaryDark: "#b0e9ca",
        gray: colors.slate[400],
        grayDark: colors.slate[500],
        lightGray: colors.slate[200],
        lightGrayDark: colors.slate[700],
        selectionBlock: "#f8ecc2",
        selectionBlockDark: "#f8ecc2",
        selectionIndicator: "#fac709",
        selectionIndicatorDark: "#fac709",
      },
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [],
};
