import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import {MongooseModule} from "@nestjs/mongoose";
import { ArticlesModule } from './articles/articles.module';
import { UtilisateursModule } from "./utilisateurs/utilisateurs.module";
import { FamillesModule } from "./familles/familles.module";
import { ReglesModule } from "./regles/regles.module";
import { PrisedeconnaissanceModule } from "./prisedeconnaissance/prisedeconnaissance.module";
import { MoodboardModule } from "./moodboard/moodboard.module";
import { TachesModule } from "./taches/taches.module";
import { ActivitesModule } from "./activites/activites.module";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/'),
    ArticlesModule,
    UtilisateursModule,
    FamillesModule,
    ReglesModule,
    PrisedeconnaissanceModule,
    MoodboardModule,
    TachesModule,
    ActivitesModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,AuthService],
})
export class AppModule {}
