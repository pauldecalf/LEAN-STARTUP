const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { NestExpressApplication } = require('@nestjs/platform-express');
const { join } = require('path');
const express = require('express');
const hbs = require('hbs');
const { configureHandlebars } = require('./dist/handlebars.config');

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(NestExpressApplication, AppModule);

    app.useStaticAssets(join(__dirname, 'public'));
    app.setBaseViewsDir(join(__dirname, 'views'));
    app.setViewEngine('hbs');

    // Configuration des helpers Handlebars
    const handlebars = configureHandlebars();
    
    // Enregistrer les helpers directement
    Object.keys(handlebars.helpers).forEach(helperName => {
      hbs.registerHelper(helperName, handlebars.helpers[helperName]);
    });

    // Configuration des middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}; 