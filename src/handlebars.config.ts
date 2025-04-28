import * as hbs from 'hbs';

export function configureHandlebars(): void {
  // Enregistrer les helpers directement sur hbs
  hbs.registerHelper('formatDate', function (date: Date) {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  });

  hbs.registerHelper('limit', function (arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  });

  hbs.registerHelper('range', function (start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  });

  hbs.registerHelper('subtract', function (a, b) {
    return a - b;
  });

  hbs.registerHelper('add', function (a, b) {
    return a + b;
  });

  hbs.registerHelper('gt', function (a, b) {
    return a > b;
  });

  hbs.registerHelper('lt', function (a, b) {
    return a < b;
  });

  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  hbs.registerHelper('isCurrentPage', function (page, currentPage, options) {
    return page === currentPage ? options.fn(this) : options.inverse(this);
  });
} 