import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrisedeconnaissanceService } from './prisedeconnaissance.service';
import { CreatePrisedeconnaissanceDto } from './dto/create-prisedeconnaissance.dto';
import { Prisedeconnaissance } from "./interfaces/prisedeconnaissance.interface";
import { PrisedeconnaissanceSchema } from "./schemas/prisedeconnaissance.schema";

@Controller('prisedeconnaissance')
export class PrisedeconnaissanceController {
    constructor(private readonly prisedeconnaissanceService: PrisedeconnaissanceService) {}

    @Post()
    async create(@Body() createPrisedeconnaissanceDto: CreatePrisedeconnaissanceDto) {
        return this.prisedeconnaissanceService.create(createPrisedeconnaissanceDto);
    }

    @Get()
    async findAll(): Promise<Prisedeconnaissance[]> {
        return this.prisedeconnaissanceService.findAll();
    }
}
