/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    fontFamily: {
      "Aeonik": ['CustomAeonik', 'sans'],
      "Aeonik-bold": ['CustomAeonik-Bold', 'sans'],
      "Aeonik-light": ['CustomAeonik-Light', 'sans'],
    },
    extend: {
      colors:{
        "MojaRuzova": '#F72798',
        "MojaOranzova": '#F57D1F',
        "MojaZlta": '#EBF400',
      },
      translate: {
        '10': '80px'
      },
    },
  plugins: [],
}};
