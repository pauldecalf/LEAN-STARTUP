import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activites } from "./interfaces/activites.interface";
import { CreateActivitesDto } from './dto/create-activites.dto';
import { ActivitesSchema } from "./schemas/activites.schema";

@Injectable()
export class ActivitesService {
    constructor(@InjectModel('Activites') private readonly activitesModel: Model<Activites>) {}

    async create(createActivitesDto: CreateActivitesDto): Promise<Activites> {
        const createdActivites = new this.activitesModel(createActivitesDto);
        return createdActivites.save();
    }

    async findAll(): Promise<Activites[]> {
        return this.activitesModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.activitesModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Activites> {
        return this.activitesModel.findById(id).exec();
    }
}
