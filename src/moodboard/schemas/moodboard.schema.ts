import { Schema } from 'mongoose';

export const MoodboardSchema = new Schema({
     idFamille: { type: String, required: true },
     idUtilisateur: { type: String, required: true },
     humeur: { type: String, required: true },
     commentaire: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
});
