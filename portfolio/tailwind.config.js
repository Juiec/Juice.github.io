/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darker: '#050505',
        accent: '#3b82f6',
        light: '#f8f8f6',
        dark: '#111111',
        muted: '#777777',
        border: 'rgba(0,0,0,.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
