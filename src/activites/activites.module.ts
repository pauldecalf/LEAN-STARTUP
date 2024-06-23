import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { ActivitesSchema } from './schemas/activites.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Activites', schema: ActivitesSchema }])],
    providers: [ActivitesService],
    controllers: [ActivitesController],
    exports: [ActivitesService] // Ajoutez cette ligne pour exporter FamillesService
})
export class ActivitesModule {}
