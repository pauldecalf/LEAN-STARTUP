import { Controller, Get, Post, Body } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { CreateActivitesDto } from './dto/create-activites.dto';
import { Activites } from "./interfaces/activites.interface";
import { ActivitesSchema } from "./schemas/activites.schema";

@Controller('activites')
export class ActivitesController {
    constructor(private readonly activitesService: ActivitesService) {}

    @Post()
    async create(@Body() createActivitesDto: CreateActivitesDto) {
        return this.activitesService.create(createActivitesDto);
    }

    @Get()
    async findAll(): Promise<Activites[]> {
        return this.activitesService.findAll();
    }
}
