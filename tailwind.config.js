/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d7',
          300: '#f4a9b7',
          400: '#ec778f',
          500: '#df486b',
          600: '#ca2a51',
          700: '#aa1c3f',
          800: '#8d1a37',
          900: '#5c0d23',
          950: '#450719',
        },
        gold: {
          300: '#f2d48f',
          400: '#e8c171',
          500: '#c99a38',
          600: '#aa7b25',
          700: '#865e1c',
        },
        warm: {
          cream: '#faf4f0',
          peach: '#fdf7f4',
          sand: '#f6ede6',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Caveat"', 'cursive'],
      }
    },
  },
  plugins: [],
}
