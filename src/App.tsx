import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
};

const App: React.FC = () => {
  const [joursData, setJoursData] = useState<{ [jour: number]: Medicament[] }>({});
  const [medicamentsList, setMedicamentsList] = useState<Medicament[]>([]); // État pour la liste des médicaments

  const ajouterMedicament = (medicament: Medicament) => {
    const updatedJoursData = { ...joursData };

    // Ajouter le médicament pour chaque jour spécifié
    for (let i = 1; i <= medicament.jours; i++) {
      if (!updatedJoursData[i]) {
        updatedJoursData[i] = [];
      }
      updatedJoursData[i].push(medicament);
    }

    setJoursData(updatedJoursData);
    setMedicamentsList((prev) => [...prev, medicament]); // Ajouter à la liste des médicaments
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 font-navbar">Gestion des Médicaments</h1>
      <Formulaire onAddMedicament={ajouterMedicament} />
      <ListeMedicaments medicaments={medicamentsList} /> {/* Passer la liste à ListeMedicaments */}
      <Tableau joursData={joursData} />
    </div>
  );
};

export default App;
