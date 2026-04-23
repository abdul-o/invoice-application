/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        primaryLight: "#9277FF",
      },
    },
  },
  plugins: [],
};