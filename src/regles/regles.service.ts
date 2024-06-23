import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Regle } from "./interfaces/regle.interface";
import { CreateRegleDto } from './dto/create-regle.dto';

@Injectable()
export class ReglesService {
    constructor(@InjectModel('Regle') private readonly regleModel: Model<Regle>) {}

    async create(createRegleDto: CreateRegleDto): Promise<Regle> {
        const createdRegle = new this.regleModel(createRegleDto);
        return createdRegle.save();
    }

    async findAll(): Promise<Regle[]> {
        return this.regleModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.regleModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Regle> {
        return this.regleModel.findById(id).exec();
    }
}
