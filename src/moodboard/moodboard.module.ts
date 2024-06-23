import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodboardService } from './moodboard.service';
import { MoodboardController } from './moodboard.controller';
import { MoodboardSchema } from './schemas/moodboard.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Moodboard', schema: MoodboardSchema }])],
    providers: [MoodboardService],
    controllers: [MoodboardController],
    exports: [MoodboardService] // Ajoutez cette ligne pour exporter FamillesService
})
export class MoodboardModule {}
