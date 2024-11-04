import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import { Box, dividerClasses, Paper } from '@mui/material';
import useTheme from './context/useTheme.ts';
import Navbar from './Nav.tsx';

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
    <div>
      <Navbar  navItems={['Home', 'About', 'Contact']} />
  
        <div className='flex w-full p-t-10 bg-white text-black dark:bg-gray-900 dark:text-white' >

          <div style={{ paddingTop: '64px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <button
            onClick={toggleDarkMode}
            className="p-8 lg:p-6 bg-none dark:bg-none -mt-9 text-4xl"
          >
            {darkMode ? '☀️' : '🌑'}
          </button>
          </div>
          <div className='flex '>

        
          <Paper variant="outlined" sx={{ flexBasis: '33.33%', padding: 2, textAlign: 'center' }}>
            {/* Formulaire à gauche (1/3 de l'écran) */}
      
              <Formulaire onAddMedicament={ajouterMedicament} />
        
            </Paper> 

            <Paper variant="outlined" sx={{ flexBasis: '66.33%', padding: 2, textAlign: 'center' }}>
            {/* Liste et Tableau à droite (2/3 de l'écran) */}
              <h2 className="text-2xl font-bold mb-4 font-navbar">Liste des médicaments</h2>
                <ListeMedicaments medicaments={medicamentsList} />
                <Tableau joursData={joursData} />
          
            </Paper>  
            </div>
      
        </div>
 
    </div>
  
  );
};

export default App;
