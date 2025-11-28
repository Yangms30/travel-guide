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
          50: '#f0f7ff', // Very light blue
          100: '#e0f0fe',
          200: '#bae2fd',
          300: '#7ccbfd',
          400: '#36b2fa',
          500: '#0c9aeb',
          600: '#007ac9',
          700: '#0161a3',
          800: '#065386',
          900: '#0b456f',
          950: '#072b4a',
        },
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#1f2937', // gray-800
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
