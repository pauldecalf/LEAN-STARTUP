import { Schema } from 'mongoose';

export const PrisedeconnaissanceSchema = new Schema({
     idRegle: { type: String, required: true },
     idUtilisateur: { type: String, required: true },
     signature: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
});
