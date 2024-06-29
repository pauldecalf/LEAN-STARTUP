import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const createdArticle = new this.articleModel(createArticleDto);
        return createdArticle.save();
    }

    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }

    async findAllWithPagination(limit: number, skip: number): Promise<Article[]> {
        return this.articleModel.find().limit(limit).skip(skip).exec();
    }

    async countAll(): Promise<number> {
        return this.articleModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Article> {
        return this.articleModel.findById(id).exec();
    }

    async findOneBySlug(slugUrl: string): Promise<Article> {
        return this.articleModel.findOne({ slugUrl }).exec();
      }
}
