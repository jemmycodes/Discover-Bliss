/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts, js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "main-layout": "minmax(400px, 1fr) 1fr",
      },
      colors: {
        "accent-color": "#5843be",
        "black-col": "#0a0521",
        "gary-text": "#8e9294",
      },
    },
  },
  plugins: [],
};
