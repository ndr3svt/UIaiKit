/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E3F2FD',
          DEFAULT: '#90CAF9',
          dark: '#42A5F5',
        },
        secondary: {
          light: '#FCE4EC',
          DEFAULT: '#F48FB1',
          dark: '#EC407A',
        },
        accent: {
          blue: '#A7CBDA',
          beige: '#DCDCC9',
          orange: '#FA9133',
          pink: '#F9C8C5',
          yellow: '#F5C260',
          cyan: '#33DBF5',
        },
        neutral: {
          lightest: '#FAFAFA',
          light: '#F5F5F5',
          DEFAULT: '#E0E0E0',
          dark: '#9E9E9E',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'lg': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0,0,0,0.05)',
        DEFAULT: '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
} 