// tailwind.config.js (ou .mjs)

/** @type {import('tailwindcss').Config} */
module.exports = { // Se for .mjs, use 'export default'
  darkMode: 'class', // Ou o que preferir
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './componentsDesk/**/*.{js,ts,jsx,tsx}',
    './componentsSeguros/**/*.{js,ts,jsx,tsx}', // <-- Adicionado novo caminho
  ],
  theme: {
    extend: {
      colors: {
        // --- Paleta Loyds Seguros ---
        'lo-dark-blue': '#1a3c49',
        'lo-peach': '#f4b4ab',
        'lo-white': '#ffffff',
        'lo-text-secondary': '#adb5bd', // Um cinza claro para textos sutis
        'lo-light-bg': '#f8f9fa',

        // --- Suas cores antigas (se precisar) ---
        'dark-bg': '#0a0a0a',
        'dark-accent': '#3b82f6',
        // ... etc
      },
      fontFamily: {
        // Usaremos uma fonte limpa e profissional
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};