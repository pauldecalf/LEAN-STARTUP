import { Document } from 'mongoose';

export interface Article extends Document {
    readonly title: string;
    readonly intro: string;
    readonly content: string;
    readonly slugUrl: string;
    readonly img: string;
    readonly createdAt: Date;
    readonly category: string;
    readonly titlepage: string;
    readonly metadescription: string;
}
