export class CreateUtilisateurDto {
     idFamille: string;
     nom: string;
     prenom: string;
     pseudo: string;
     email: string;
     password?: string;
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
