import { Schema } from 'mongoose';

export const RegleSchema = new Schema({
    idFamille: { type: String, required: true },
     signatureParent: { type: String, required: true },
     createdBy: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
});
