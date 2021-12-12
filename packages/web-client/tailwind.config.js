const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans Display", "sans-serif"],
        sans: ["Noto Sans Display", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
