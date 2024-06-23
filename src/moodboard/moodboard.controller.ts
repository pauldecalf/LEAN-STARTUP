import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoodboardService } from './moodboard.service';
import { CreateMoodboardDto } from './dto/create-moodboard.dto';
import { Moodboard } from "./interfaces/moodboard.interface";
import { MoodboardSchema } from "./schemas/moodboard.schema";

@Controller('moodboard')
export class MoodboardController {
    constructor(private readonly moodboardService: MoodboardService) {}

    @Post()
    async create(@Body() createMoodboardDto: CreateMoodboardDto) {
        return this.moodboardService.create(createMoodboardDto);
    }

    @Get()
    async findAll(): Promise<Moodboard[]> {
        return this.moodboardService.findAll();
    }
}
