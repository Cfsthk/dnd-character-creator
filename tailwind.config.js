/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f8f4ed',
          200: '#f0e6d2',
          300: '#e8d7b7',
          400: '#d8c29c',
          500: '#c8ad81',
        },
        dnd: {
          red: '#c53030',
          gold: '#d69e2e',
          blue: '#2c5282',
          green: '#276749',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}
