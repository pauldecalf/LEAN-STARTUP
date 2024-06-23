import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrisedeconnaissanceService } from './prisedeconnaissance.service';
import { PrisedeconnaissanceController } from './prisedeconnaissance.controller';
import { PrisedeconnaissanceSchema } from './schemas/prisedeconnaissance.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Prisedeconnaissance', schema: PrisedeconnaissanceSchema }])],
    providers: [PrisedeconnaissanceService],
    controllers: [PrisedeconnaissanceController],
    exports: [PrisedeconnaissanceService] // Ajoutez cette ligne pour exporter FamillesService
})
export class PrisedeconnaissanceModule {}
