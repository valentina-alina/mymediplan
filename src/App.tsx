import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import useTheme from './context/useTheme.ts';

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

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white'>
      <div className="mt-5 p-4 m-1 lg:m-20">
        <div className="flex space-x-0 lg:space-x-6">
          
          <button
            onClick={toggleDarkMode}
            className="p-8 lg:p-6 bg-none dark:bg-none -mt-9 text-4xl"
          >
            {darkMode ? '☀️' : '🌑'}
          </button>
          <h1 className="text-2xl font-bold mb-4 font-navbar">Gestion des Médicaments</h1>
        </div>
        <Formulaire onAddMedicament={ajouterMedicament} />
        <ListeMedicaments medicaments={medicamentsList} /> {/* Passer la liste à ListeMedicaments */}
        <Tableau joursData={joursData} />
      </div>
    </div>
  );
};

export default App;
