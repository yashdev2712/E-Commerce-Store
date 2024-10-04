/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#E0FBFC",
        color2: "#3D5A80",
        orange: "#EE6C4D",
      },
    },
  },
  plugins: [],
};
