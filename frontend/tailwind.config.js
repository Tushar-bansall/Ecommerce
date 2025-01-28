import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.75rem'
      },
      rotate: {
        '90': '90deg', // Custom rotation of 30 degrees
      },
    },
  },
  plugins: [
    daisyui,
    require('tailwind-scrollbar'),
  ],
}

