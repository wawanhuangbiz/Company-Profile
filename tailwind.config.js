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
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        custom: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spartan: ['"League Spartan"', 'sans-serif']
      },
      colors: {
        'off-white': '#E5E5E5',
      }
    },
  },
  variants: {},
  plugins: [flowbiteReact],
};