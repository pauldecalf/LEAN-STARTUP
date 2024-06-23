import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReglesService } from './regles.service';
import { CreateRegleDto } from './dto/create-regle.dto';
import { Regle } from "./interfaces/regle.interface";

@Controller('regle')
export class ReglesController {
    constructor(private readonly regleService: ReglesService) {}

    @Post()
    async create(@Body() createRegleDto: CreateRegleDto) {
        return this.regleService.create(createRegleDto);
    }

    @Get()
    async findAll(): Promise<Regle[]> {
        return this.regleService.findAll();
    }
}
