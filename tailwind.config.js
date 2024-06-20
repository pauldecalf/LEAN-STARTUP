/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,hbs,js,ts,jsx,tsx}', // Ajustez les chemins selon votre structure de projet
    './views/**/*.{html,hbs}', // Ajoutez ce chemin pour inclure les fichiers Handlebars
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
