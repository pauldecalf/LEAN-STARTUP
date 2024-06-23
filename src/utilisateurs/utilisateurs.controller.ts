import { Controller, Get, Post, Body } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from "./interfaces/utilisateur.interface";

@Controller('utilisateur')
export class UtilisateursController {
    constructor(private readonly utilisateurService: UtilisateursService) {}

    @Post()
    async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
        return this.utilisateurService.create(createUtilisateurDto);
    }

    @Get()
    async findAll(): Promise<Utilisateur[]> {
        return this.utilisateurService.findAll();
    }
}
