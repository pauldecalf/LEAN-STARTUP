import { Document } from 'mongoose';

export interface Utilisateur extends Document {
    readonly idFamille: string;
    readonly nom: string;
    readonly prenom: string;
    readonly email: string;
    readonly pseudo: string;
    readonly password: string;
    readonly imgProfil: string;
    readonly anniversaire: string;
    readonly genre: string;
    readonly loisirs: string;
    readonly passions: string;
    readonly nourriture: string;
    readonly reves: string;
    readonly aspirations: string;
    readonly faits: string;
    readonly role: string;
    readonly createdAt: Date;
}