module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-image": "url('public/background/gold.jpg')",
        "footer-image": "url('public/background/polos.jpg')",
      }),
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [],
};
