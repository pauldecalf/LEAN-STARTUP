import { Controller, Get, Post, Body } from '@nestjs/common';
import { TachesService } from './taches.service';
import { CreateTachesDto } from './dto/create-taches.dto';
import { Taches } from "./interfaces/taches.interface";
import { TachesSchema } from "./schemas/taches.schema";

@Controller('taches')
export class TachesController {
    constructor(private readonly tachesService: TachesService) {}

    @Post()
    async create(@Body() createTachesDto: CreateTachesDto) {
        return this.tachesService.create(createTachesDto);
    }

    @Get()
    async findAll(): Promise<Taches[]> {
        return this.tachesService.findAll();
    }
}
