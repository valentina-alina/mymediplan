import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import { Box, dividerClasses, Paper } from '@mui/material';
import useTheme from './context/useTheme.ts';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: string;
  medicationImage: string | null;
};

const App: React.FC = () => {
  const [joursData, setJoursData] = useState<{ [jour: number]: Medicament[] }>({});

  const [medicamentsList, setMedicamentsList] = useState<Medicament[]>([]);

  const ajouterMedicament = (medicament: Medicament) => {
    const updatedJoursData = { ...joursData };

    // Ajouter le médicament pour chaque jour spécifié
    for (let i = 1; i <= +medicament.jours; i++) {
      if (!updatedJoursData[i]) {
        updatedJoursData[i] = [];
      }
      updatedJoursData[i].push(medicament);
    }

    setJoursData(updatedJoursData);
    setMedicamentsList((prev) => [...prev, medicament]);
  };
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <Paper elevation={3} >
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white'>
      <button
        onClick={toggleDarkMode}
        className="p-8 lg:p-6 bg-none dark:bg-none -mt-9 text-4xl"
      >
        {darkMode ? '☀️' : '🌑'}
      </button>
      
      <Box display="flex" justifyContent="space-between" p={2}>
        
        <Box flex={1} mr={2}>
          <h1 className="text-2xl font-bold mb-4 font-navbar">Gestion des Médicaments</h1>
          <Formulaire onAddMedicament={ajouterMedicament} />
        </Box>
        <Paper elevation={3} >
        <h2 className="text-2xl font-bold mb-4 font-navbar">Liste des médicaments</h2>
          <Box flex={2}>
            <ListeMedicaments medicaments={medicamentsList} />
            <Tableau joursData={joursData} />
          </Box>
        </Paper>
      </Box>
    </div>
    </Paper>

  );
};

export default App;
