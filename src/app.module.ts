import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'styles', 'img'),
      serveRoot: '/img', // Le chemin où les fichiers seront accessibles
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
