import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from "@nestjs/mongoose";
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
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard'; // Assurez-vous que ce chemin est correct
import { AuthMiddleware } from './auth.middleware';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtAuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
      );
  }
}
