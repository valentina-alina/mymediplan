import React, { useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import { Box, Paper, Stack, Typography } from '@mui/material';
import Navbar from './Nav.tsx';
import { Medicament } from './medicament.ts';

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
    <Box
      className="bg-white text-black dark:bg-gray-900 dark:text-white"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ overflow: 'hidden', padding: 0, margin: 0 }}
    >
      <Navbar navItems={['Accueil', 'À propos', 'Contact']} />

      {/* Main Content */}
      <Box mt={12} display="flex" justifyContent="center" flex="1">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            width: '100%',
            maxWidth: 1200,
            paddingX: 2,
          }}
        >
          {/* Formulaire Section */}
          <Paper variant="outlined" sx={{ padding: 2, flex: 1 }}>
            <Formulaire onAddMedicament={ajouterMedicament} />
          </Paper>

          {/* ListeMedicaments and Tableau Section */}
          <Paper variant="outlined" sx={{ padding: 2, flex: 2 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 2 }}>
              Liste des médicaments
            </Typography>
            <ListeMedicaments medicaments={medicamentsList} />
            <Tableau joursData={joursData} />
          </Paper>
        </Stack>
      </Box>

      {/* Footer Section */}
      <Box py={1} bgcolor="primary.main" color="white" textAlign="center" sx={{ mt: 'auto' }}>
        <Typography variant="body2">© 2024 MediPlan</Typography>
      </Box>
    </Box>
  );
};

export default App;