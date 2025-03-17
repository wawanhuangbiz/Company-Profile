module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-image": "url('/background/gold.jpg')",
        "footer-image": "url('/background/polos.jpg')",
      }),
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [],
};
