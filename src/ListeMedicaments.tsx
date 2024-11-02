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
      <h2 className='font-h1 my-5'>Liste des Médicaments</h2>
      <ul className="liste-medicaments">
        {medicaments.map((medicament, index) => (
          <li key={index} className="medicament-item">
            <strong>{medicament.nom} :</strong>
            <span> {medicament.quantite} {medicament.typeQuantite} :</span>  
            {/* <div className="horaires"> */}
              {/* <strong>Horaires:</strong> */}
              {medicament.horaires.matin && <span> Matin </span>}
              {medicament.horaires.midi && <span>+ Midi</span>}
              {medicament.horaires.apresmidi && <span> + Après-midi</span>}
              {medicament.horaires.soir && <span> + Soir</span>}
            {/* </div> */}
            <span>  pendant {medicament.jours} jours</span>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default ListeMedicaments;
