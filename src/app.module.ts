import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import {MongooseModule} from "@nestjs/mongoose";
import { ArticlesModule } from './articles/articles.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/'),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
