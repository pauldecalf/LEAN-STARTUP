export class CreateMoodboardDto {
    readonly idFamille: string;
    readonly idUtilisateur: string;
    readonly humeur: string;
    readonly commentaire: string;
    readonly createdAt: Date;
}
