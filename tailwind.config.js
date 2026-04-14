/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#bce4ff',
          300: '#8ed6ff',
          400: '#59bfff',
          500: '#00aaff',
          600: '#0088cc',
          700: '#006da6',
          800: '#005c8a',
          900: '#064d74',
          950: '#04314d',
        },
        background: 'var(--background)',
        surface: 'var(--surface)',
        panel: 'var(--panel)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
