/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        display: [`"DM Serif Text"`, "ui-serif"],
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
  plugins: [],
};
