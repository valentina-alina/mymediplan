// types.ts
export interface Medicament {
    nom: string;
    quantite: string;
    typeQuantite: string;
    horaires: {
      matin: boolean;
      midi: boolean;
      apresmidi: boolean;
      soir: boolean;
    };
    jours: number;
    jourDebut: number;
    medicationImage: string | null; // Image du médicament sous forme de URL ou null
  }
  