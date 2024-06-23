import { Schema } from 'mongoose';

export const TachesSchema = new Schema({
     idFamille: { type: String, required: true },
     idUtilisateur: { type: String, required: true },
     instruction: { type: String, required: true },
     dateTime: { type: Date, required: true },
     commentaire: { type: String, required: true },
     statut: { type: String, required: true },
     nbPoints: { type: String, required: true },
     createdBy: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
});
