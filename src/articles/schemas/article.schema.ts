import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    title: { type: String, required: true },
    intro: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
});