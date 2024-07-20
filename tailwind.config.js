/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    // "./public/index.html",
    // "./src/input.css",
    "./muzone/index.html",
    "./src/input-mz.css"
  ],
  theme: {
    screens: {
      xs: "350px",
      sm: "641px",
      xl: "1300px",
      "2xl": "1550px"
    },
    extend: {
      gridTemplateColumns: {
        body: "calc(66.66% - 4rem) 8rem calc(33.33% - 4rem)",
        "body-mz": "calc(66.66% - 2rem) 1rem calc(33.33% - 2rem)"
      },   
      gridColumn: {
        2: "2"
      },
      gridTemplateRows: {
        body: "calc(100dvh - 10rem) 10rem",
        "body-xl": "100dvh"
      },
      gridRow: {
        2: "2"
      },
      backgroundSize: {
        size: "58px 58px"
      },  
      fontSize: {
        "html-xs": ".5625rem",
        html: ".625rem",
        "html-sm": ".75rem",
        "html-2xl": ".8125rem",
        browser: ".9375rem",
        help: "1.25rem",
        main: "1.75rem",
        h1: ["5rem", "1"],
        "7xl": ["7rem", "1"],
        "10xl": ["10rem", "1"]
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        nabla: ["Nabla", "Space Grotesk", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      }
    }
  }
}