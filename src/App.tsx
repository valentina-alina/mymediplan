import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import { Box, Paper} from '@mui/material';

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

  return (
  
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box flex={1} mr={2}>
        <h1 className="text-2xl font-bold mb-4 font-navbar">Gestion des Médicaments</h1>
        <Formulaire onAddMedicament={ajouterMedicament} />
             </Box>
             <Paper elevation={3} >
      <Box flex={2}>
      <ListeMedicaments medicaments={medicamentsList} />
        <Tableau joursData={joursData} />
      </Box>
      </Paper>
    </Box>

  );
};

export default App;
