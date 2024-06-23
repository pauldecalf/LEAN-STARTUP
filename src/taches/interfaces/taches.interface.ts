import { Document } from 'mongoose';

export interface Taches extends Document {
    readonly idFamille: string;
    readonly idUtilisateur: string;
    readonly instruction: string;
    readonly dateTime: string;
    readonly commentaire: string;
    readonly statut: string;
    readonly nbPoints: string;
    readonly createdBy: string;
    readonly createdAt: Date;
}
