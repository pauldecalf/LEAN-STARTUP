import { Document } from 'mongoose';

export interface Activites extends Document {
    readonly idFamille: string;
    readonly contenu: string;
    readonly statut: string;
    readonly createdBy: string;
    readonly createdAt: Date;
}
