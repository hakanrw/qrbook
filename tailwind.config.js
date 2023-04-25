import themes from "daisyui/src/colors/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.svelte",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["[data-theme=light]"],
          primary: "#e11d48",
          secondary: "#9f1239",
        }
      }
    ]
  }
}

