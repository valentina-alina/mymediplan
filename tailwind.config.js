/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adapte selon l'organisation de ton projet
  ],
  theme: {
    fontFamily: {
      navbar: ['Homemade Apple'],
      h1: ['Kalam'],
      h3: ['Kalam'],
      input: ['Kalam'],
      button: ['Kalam'],
      footer: ['Kalam'],
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
    },
    extend: {
      colors: {
        customBlue: '#061439'
      }
    },
  },
  plugins: [],
};
