import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utilisateur } from "./interfaces/utilisateur.interface";
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';

@Injectable()
export class UtilisateursService {
    constructor(@InjectModel('Utilisateur') private readonly utilisateurModel: Model<Utilisateur>) {}

    async create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
        const createdUtilisateur = new this.utilisateurModel(createUtilisateurDto);
        return createdUtilisateur.save();
    }

    async findAll(): Promise<Utilisateur[]> {
        return this.utilisateurModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.utilisateurModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Utilisateur> {
        return this.utilisateurModel.findById(id).exec();
    }
}
