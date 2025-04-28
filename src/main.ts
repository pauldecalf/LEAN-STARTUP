import 'reflect-metadata';
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

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
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
