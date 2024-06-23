import { Document } from 'mongoose';

export interface Prisedeconnaissance extends Document {
    readonly idRegle: string;
    readonly idUtilisateur: string;
    readonly signature: string;
    readonly createdAt: Date;
}
