import { Document } from 'mongoose';

export interface Regle extends Document {
    readonly idFamille: string;
    readonly signatureParent: string;
    readonly createdBy: string;
    readonly createdAt: Date;
}
