export class CreateUtilisateurDto {
    readonly idFamille: string;
    readonly nom: string;
    readonly prenom: string;
    readonly pseudo: string;
    readonly email: string;
    readonly password?: string;
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
    readonly googleId?: string;
    readonly createdAt: Date;
}
