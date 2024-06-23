import { Controller, Get, Post, Body } from '@nestjs/common';
import { FamillesService } from './familles.service';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { Famille } from "./interfaces/famille.interface";

@Controller('famille')
export class FamillesController {
    constructor(private readonly familleService: FamillesService) {}

    @Post()
    async create(@Body() createFamilleDto: CreateFamilleDto) {
        return this.familleService.create(createFamilleDto);
    }

    @Get()
    async findAll(): Promise<Famille[]> {
        return this.familleService.findAll();
    }
}
