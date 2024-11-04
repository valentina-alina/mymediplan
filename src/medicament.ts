export type Medicament = {
    nom: string;
    quantite: string;
    typeQuantite: string;
    horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
    jours: number;
    medicationImage: string | null;
};