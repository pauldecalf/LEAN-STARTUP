import { Schema } from 'mongoose';

export const UtilisateurSchema = new Schema({
    idFamille: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    imgProfil: { type: String, required: true },
    anniversaire: { type: String, required: true },
    genre: { type: String, required: true },
    loisirs: { type: String, required: true },
    passions: { type: String, required: true },
    nourriture: { type: String, required: true },
    reves: { type: String, required: true },
    aspirations: { type: String, required: true },
    faits: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
