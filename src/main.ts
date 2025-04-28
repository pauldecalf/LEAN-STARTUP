import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Express } from 'express';
import * as express from 'express';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Configuration des helpers Handlebars
  const handlebars = hbs.create();
  
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

  // Configuration des middlewares Express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
