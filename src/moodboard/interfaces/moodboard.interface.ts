import { Document } from 'mongoose';

export interface Moodboard extends Document {
    readonly idFamille: string;
    readonly idUtilisateur: string;
    readonly humeur: string;
    readonly commentaire: string;
    readonly createdAt: Date;
}
