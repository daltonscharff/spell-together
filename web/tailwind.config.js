/** @type {import('tailwindcss').Config} */
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "--rounded-box": "0.125rem",
          "--rounded-btn": "0.125rem",
          "--rounded-badge": "0.125rem",
          neutral: "#1c1917",
        },
      },
    ],
  },
};
