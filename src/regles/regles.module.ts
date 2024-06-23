import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReglesService } from './regles.service';
import { ReglesController } from './regles.controller';
import { RegleSchema } from './schemas/regle.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Regle', schema: RegleSchema }])],
    providers: [ReglesService],
    controllers: [ReglesController],
    exports: [ReglesService] // Ajoutez cette ligne pour exporter FamillesService
})
export class ReglesModule {}
