import { Controller, Get, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { FamillesService } from './familles.service';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { Famille } from './interfaces/famille.interface';
import { Request, Response } from 'express';

@Controller('famille')
export class FamillesController {
  constructor(private readonly familleService: FamillesService) {}

  @Post('/create-family')
  async create(@Body() createFamilleDto: CreateFamilleDto, @Req() req: Request, @Res() res: Response) {
    console.log('Received request to create family with nom:', createFamilleDto.nom);

    try {
      if (!req['user']) {
        console.error('User not found in request');
        console.log('Request object:', req); // Log pour vérifier l'objet requête
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Utilisateur non authentifié' });
      }

      console.log('Request user object:', req['user']); // Ajoutez ce log pour vérifier l'objet utilisateur
      const userId = req['user'].sub;
      console.log('User ID from token:', userId);

      const famille = {
        nom: createFamilleDto.nom,
        createdBy: userId,
        createdAt: new Date()
      };

      console.log('Creating family with details:', famille);

      const createdFamily = await this.familleService.create(famille);
      const familyId = createdFamily._id.toString();
      const invitationCode = familyId.slice(-5);

      return res.status(HttpStatus.CREATED).json({
        message: 'Famille créée avec succès',
        invitationCode: invitationCode
      });
    } catch (error) {
      console.error('Error during family creation:', error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Une erreur est survenue lors de la création de la famille'
      });
    }
  }

  @Get('/create-family')
  async findAll(@Req() req: Request): Promise<Famille[]> {
    return this.familleService.findAll();
  }
}
