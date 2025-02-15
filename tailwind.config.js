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
        'app-main': '#c0936c',
        'app-secondary': '#5c6472',
        'app-white': '#ffffff',

        // Secondary colors
        'app-yellow': '#e4eb60',
        'app-green': '#4cb979',
        'app-purple': '#865cf0',
        'app-orange': '#e9683b',
        'app-gray': '#88898c',
        'app-light-gray': '#cecfd4',

        // Neutral colors
        black: '#1d1e28',
      },
    },
  },
  plugins: [],
}
