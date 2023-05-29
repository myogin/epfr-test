/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      }
    },
    colors: {
      'blue-midnight': '#003566',
      'blue-deep': "#0D72D7",
      'blue-soft': "#D7E5F4",
      'blue-bubble': '#3977F1',
      'gray-light': '#333333',
      'gray-soft-light': '#EDEDED',
      'gray-soft-thin': '#DDDDDD',
      'gray-soft-strong': '#CCCCCC',
      'gray-soft-white': '#FCFCFC',
      'gray-soft-white-soft': '#F5F5F5',
      'white': '#FFFFFF',
      'white-bone': '#FAFAFA',
      'green-deep': '#2BB673',
      'green-soft': '#F4FCF3',
      'green-light': '#DAF5D6',
      'green-soft-light': '#D6F5E6',
      'pink-light': '#FCCFD1',
      'red': '#E61B00',
      'black': '#000000',
      'yellow-deep': '#FEBE01',
      'yellow-light': '#FFF2CC'
    }
  },
  
  plugins: [require("@tailwindcss/forms")],
}
