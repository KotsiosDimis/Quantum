/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff2626", // WCAG-AA adjusted red (4.53:1 on black for large text, meets 3:1 UI-component contrast)
        "primary-dark": "#c8000c",
        background: "#000000",
        surface: "#0a0a0a",
        "surface-variant": "#1a1a1a",
        "surface-high": "#242424",
        "on-surface": "#ffffff",
        "on-surface-variant": "#b3b3b3" // lightened from #a1a1a1 to clear 4.5:1 body-text contrast on black
      },
      fontFamily: {
        headline: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      spacing: {
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "touch-target": "48px"
      },
      maxWidth: {
        "container-max": "1280px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
