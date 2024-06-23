import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prisedeconnaissance } from "./interfaces/prisedeconnaissance.interface";
import { CreatePrisedeconnaissanceDto } from './dto/create-prisedeconnaissance.dto';
import { PrisedeconnaissanceSchema } from "./schemas/prisedeconnaissance.schema";

@Injectable()
export class PrisedeconnaissanceService {
    constructor(@InjectModel('Prisedeconnaissance') private readonly prisedeconnaissanceModel: Model<Prisedeconnaissance>) {}

    async create(createPrisedeconnaissanceDto: CreatePrisedeconnaissanceDto): Promise<Prisedeconnaissance> {
        const createdPrisedeconnaissance = new this.prisedeconnaissanceModel(createPrisedeconnaissanceDto);
        return createdPrisedeconnaissance.save();
    }

    async findAll(): Promise<Prisedeconnaissance[]> {
        return this.prisedeconnaissanceModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.prisedeconnaissanceModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Prisedeconnaissance> {
        return this.prisedeconnaissanceModel.findById(id).exec();
    }
}
