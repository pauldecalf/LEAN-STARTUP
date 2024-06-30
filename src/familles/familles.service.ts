import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Famille } from "./interfaces/famille.interface";
import { CreateFamilleDto } from './dto/create-famille.dto';

@Injectable()
export class FamillesService {
    constructor(@InjectModel('Famille') private readonly familleModel: Model<Famille>) {}

    async create(createFamilleDto: CreateFamilleDto): Promise<Famille> {
        const createdFamille = new this.familleModel(createFamilleDto);
        return createdFamille.save();
    }

    async findAll(): Promise<Famille[]> {
        return this.familleModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.familleModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Famille> {
        return this.familleModel.findById(id).exec();
    }
    async findByCreatedBy(createdBy: string): Promise<Famille | null> {
        return this.familleModel.findOne({ createdBy }).exec();
    }
    
}
