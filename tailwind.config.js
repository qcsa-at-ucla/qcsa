/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#234285',
        shadow: '#ADC8EF',
        lighter: '#F8FAFF',
        background: '#F3F8FF',
      },
      fontFamily: {
        // make Kantumruy the default sans utility and keep a named utility
        sans: ['Kantumruy', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial'],
        kantumruy: ['Kantumruy'],
      },
    },
  },
  plugins: [],
}
