import { Document } from 'mongoose';

export interface Utilisateur extends Document {
     idFamille: string;
     nom: string;
     prenom: string;
     email: string;
     pseudo: string;
     password: string;
     imgProfil: string;
     anniversaire: string;
     genre: string;
     loisirs: string;
     passions: string;
     nourriture: string;
     reves: string;
     aspirations: string;
     faits: string;
     role: string;
     googleId?: string;
     createdAt: Date;
}
