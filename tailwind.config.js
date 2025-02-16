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
        'app-main': '#b963cb',
        'app-secondary': '#151B1E',
        'app-contrast': '#402456',
        'app-white': '#F1E0F5',

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
