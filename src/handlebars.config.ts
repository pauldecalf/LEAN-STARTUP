import * as hbs from 'hbs';

export function configureHandlebars(): any {
  // Créer une instance de Handlebars
  const handlebars = hbs.create();
  
  // Enregistrer les helpers
  handlebars.registerHelper('formatDate', function (date: Date) {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  });

  handlebars.registerHelper('limit', function (arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  });

  handlebars.registerHelper('range', function (start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  });

  handlebars.registerHelper('subtract', function (a, b) {
    return a - b;
  });

  handlebars.registerHelper('add', function (a, b) {
    return a + b;
  });

  handlebars.registerHelper('gt', function (a, b) {
    return a > b;
  });

  handlebars.registerHelper('lt', function (a, b) {
    return a < b;
  });

  handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  handlebars.registerHelper('isCurrentPage', function (page, currentPage, options) {
    return page === currentPage ? options.fn(this) : options.inverse(this);
  });

  return handlebars;
} 