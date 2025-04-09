const flowbiteReact = require("flowbite-react/plugin/tailwindcss");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-image": "url('/background/gold.jpg')",
        "footer-image": "url('/background/polos.jpg')",
      }),
      fontFamily: {
        sans: ['HelveticaNeueMedium', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [flowbiteReact],
};