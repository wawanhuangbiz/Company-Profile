module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-image': "url('public/background/gold.jpg')"
      })
    },
  },
  plugins: [],
};
