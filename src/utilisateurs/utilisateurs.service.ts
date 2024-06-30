import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utilisateur } from "./interfaces/utilisateur.interface";
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Controller, Post, Body, Res, NotFoundException } from '@nestjs/common';
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

    async findOneByEmail(email: string): Promise<Utilisateur | undefined> {
    return this.utilisateurModel.findOne({ email }).exec();
  }

  async updateUserRole(email: string, role: string): Promise<Utilisateur> {
    const user = await this.utilisateurModel.findOne({ email }).exec();
    if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
    }
    user.role = role;
    return user.save();
}
async update(id: string, user: Partial<Utilisateur>): Promise<Utilisateur> {
    return this.utilisateurModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

}
