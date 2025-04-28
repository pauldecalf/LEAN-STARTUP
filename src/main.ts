import 'reflect-metadata';

if (!(Reflect && Reflect.getMetadata)) {
  throw new Error('reflect-metadata shim is required! Please add "import \'reflect-metadata\';" to the top of your entry point.');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Express } from 'express';
import * as express from 'express';
import * as hbs from 'hbs';
import { configureHandlebars } from './handlebars.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration des chemins pour l'environnement serverless
  const isProduction = process.env.NODE_ENV === 'production';
  const rootPath = isProduction ? process.cwd() : join(__dirname, '..');

  // Configuration des assets statiques
  app.useStaticAssets(join(rootPath, 'public'), {
    prefix: '/public/',
  });

  // Configuration des vues
  app.setBaseViewsDir(join(rootPath, 'views'));
  app.setViewEngine('hbs');

  // Configuration des helpers Handlebars
  configureHandlebars();

  // Configuration des middlewares Express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
