/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#ffd700',
        silver: '#c0c0c0',
        bronze: '#cd7f32',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

