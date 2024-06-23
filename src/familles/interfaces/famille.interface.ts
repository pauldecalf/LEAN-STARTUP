import { Document } from 'mongoose';

export interface Famille extends Document {
    readonly nom: string;
    readonly createdBy: string;
    readonly createdAt: Date;
}
