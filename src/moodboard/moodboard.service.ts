import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moodboard } from "./interfaces/moodboard.interface";
import { CreateMoodboardDto } from './dto/create-moodboard.dto';
import { MoodboardSchema } from "./schemas/moodboard.schema";

@Injectable()
export class MoodboardService {
    constructor(@InjectModel('Moodboard') private readonly moodboardModel: Model<Moodboard>) {}

    async create(createMoodboardDto: CreateMoodboardDto): Promise<Moodboard> {
        const createdMoodboard = new this.moodboardModel(createMoodboardDto);
        return createdMoodboard.save();
    }

    async findAll(): Promise<Moodboard[]> {
        return this.moodboardModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.moodboardModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Moodboard> {
        return this.moodboardModel.findById(id).exec();
    }
}
