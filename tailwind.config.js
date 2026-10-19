/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",
          500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12"
        },
        ink: "#1c1917",
        sand: {50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1"}
      },
      fontFamily: {
        display: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
