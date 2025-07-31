/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'wine-background': 'url(/src/shared/components/onBoarding/images/wine-background.png)',
      },
    },
  },
  plugins: [],
};
