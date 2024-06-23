import { Schema } from 'mongoose';

export const FamilleSchema = new Schema({
    nom: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
