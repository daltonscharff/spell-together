/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
    extend: {
      colors: {
        primary: "#fee383",
      },
      fontFamily: {
        display: [`"DM Serif Display"`, "ui-serif"],
        sans: [`"Noto Sans"`, ...defaultTheme.fontFamily.sans],
      },
      animation: {
        blink: "blink 1200ms steps(1, end) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      },
    },
  },
};
