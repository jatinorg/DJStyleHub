/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf7f6',
          100: '#faeee9',
          200: '#f6dbd5',
          300: '#edbdb3',
          400: '#df9487',
          500: '#ce6b5c',
          600: '#b84e41',
          700: '#9b3d32',
          800: '#81352c',
          900: '#6d3029',
          950: '#3a1612',
        },
        gold: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        sand: {
          50: '#fcfbf9',
          100: '#f7f5f0',
          200: '#eee8df',
          300: '#dfd4c5',
          400: '#c8b6a3',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
