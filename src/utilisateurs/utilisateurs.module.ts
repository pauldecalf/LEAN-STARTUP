import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { UtilisateurSchema } from './schemas/utilisateur.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Utilisateur', schema: UtilisateurSchema }])],
    providers: [UtilisateursService],
    controllers: [UtilisateursController],
    exports: [UtilisateursService] // Ajoutez cette ligne pour exporter FamillesService
})
export class UtilisateursModule {}
