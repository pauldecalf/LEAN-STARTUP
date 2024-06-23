import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TachesService } from './taches.service';
import { TachesController } from './taches.controller';
import { TachesSchema } from './schemas/taches.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Taches', schema: TachesSchema }])],
    providers: [TachesService],
    controllers: [TachesController],
    exports: [TachesService] // Ajoutez cette ligne pour exporter FamillesService
})
export class TachesModule {}
