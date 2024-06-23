import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamillesService } from './familles.service';
import { FamillesController } from './familles.controller';
import { FamilleSchema } from './schemas/famille.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Famille', schema: FamilleSchema }])],
    providers: [FamillesService],
    controllers: [FamillesController],
    exports: [FamillesService] // Ajoutez cette ligne pour exporter FamillesService
})
export class FamillesModule {}
