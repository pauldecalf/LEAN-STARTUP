import { Schema } from 'mongoose';

export const ActivitesSchema = new Schema({
     idFamille: { type: String, required: true },
     contenu: { type: String, required: true },
     statut: { type: String, required: true },
     createdBy: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
});
