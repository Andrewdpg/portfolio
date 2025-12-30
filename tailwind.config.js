/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // Main colors
        'app-main': '#9B76D3',
        'app-secondary': '#1A1128', // Dark deep purple for text/bg instead of true black
        'app-contrast': '#2D1F44',
        'app-white': '#FFFFFF',

        // Secondary colors
        'app-yellow': '#f0f0f0',
        'app-green': '#28EA96',
        'app-purple': '#9B76D3',
        'app-orange': '#f0f0f0',
        'app-gray': '#888888',
        'app-light-gray': '#D1D1D1',

        // Neutral colors
        black: '#1A1128', // Deep purple-black
      },
    },
  },
  plugins: [],
}
