/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,hbs,js,ts,jsx,tsx}', // Ajustez les chemins selon votre structure de projet
    './views/**/*.{html,hbs}', // Ajoutez ce chemin pour inclure les fichiers Handlebars
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px', // Assurez-vous que lg est défini à 1024px
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
