import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Taches } from "./interfaces/taches.interface";
import { CreateTachesDto } from './dto/create-taches.dto';
import { TachesSchema } from "./schemas/taches.schema";

@Injectable()
export class TachesService {
    constructor(@InjectModel('Taches') private readonly tachesModel: Model<Taches>) {}

    async create(createTachesDto: CreateTachesDto): Promise<Taches> {
        const createdTaches = new this.tachesModel(createTachesDto);
        return createdTaches.save();
    }

    async findAll(): Promise<Taches[]> {
        return this.tachesModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.tachesModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Taches> {
        return this.tachesModel.findById(id).exec();
    }
}
