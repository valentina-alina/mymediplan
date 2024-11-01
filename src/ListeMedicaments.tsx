import React from 'react';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
};

type ListeMedicamentsProps = {
  medicaments: Medicament[];
};

const ListeMedicaments: React.FC<ListeMedicamentsProps> = ({ medicaments }) => {
  return (
    <div>
      <h2>Liste des Médicaments</h2>
      <ul className="liste-medicaments">
        {medicaments.map((medicament, index) => (
          <li key={index} className="medicament-item">
            <span>{medicament.nom} - {medicament.quantite} {medicament.typeQuantite} - {medicament.jours} jours</span>
            <div className="horaires">
              <strong>Horaires:</strong>
              {medicament.horaires.matin && <span> Matin</span>}
              {medicament.horaires.midi && <span> Midi</span>}
              {medicament.horaires.apresmidi && <span> Après-midi</span>}
              {medicament.horaires.soir && <span> Soir</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeMedicaments;
