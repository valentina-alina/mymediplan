import React, { useEffect, useState, lazy, Suspense } from 'react';

import { Box, Button, CircularProgress, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { Medicament } from './medicament.ts';
import { useTranslation } from 'react-i18next';

import html2canvas from 'html2canvas';
// import { StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import Contact from './Contact.tsx';


const Tableau = lazy(() => import('./Tableau.tsx'));
const ListeMedicaments = lazy(() => import('./ListeMedicaments.tsx'));
const Formulaire = lazy(() => import('./Formulaire.tsx'));

const Planner: React.FC = () => {
  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);
  const [joursData, setJoursData] = useState<{ [jour: number]: Medicament[] }>({});
  const [medicamentsList, setMedicamentsList] = useState<Medicament[]>([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedJoursData = localStorage.getItem('joursData');
    const storedMedicamentsList = localStorage.getItem('medicamentsList');

    if (storedJoursData) {
      setJoursData(JSON.parse(storedJoursData));
    }
    if (storedMedicamentsList) {
      setMedicamentsList(JSON.parse(storedMedicamentsList));
    }
  }, []);

  const ajouterMedicament = (medicament: Medicament) => {
    const updatedJoursData = { ...joursData };

    // Ajouter le médicament pour chaque jour spécifié
    for (let i = medicament.jourDebut; i <= +medicament.jours+medicament.jourDebut-1; i++) {
      if (!updatedJoursData[i]) {
        updatedJoursData[i] = [];
      }
      updatedJoursData[i].push(medicament);
    }

    setJoursData(updatedJoursData);
    setMedicamentsList((prev) => [...prev, medicament]);

    // Save to local storage
    localStorage.setItem('joursData', JSON.stringify(updatedJoursData));
    localStorage.setItem('medicamentsList', JSON.stringify([...medicamentsList, medicament]));
  };

  // Function to clear local storage
  const clearLocalStorage = () => {
    localStorage.removeItem('joursData');
    localStorage.removeItem('medicamentsList');
  };

  // This function could be called when cookies are deleted
  const handleCookiesCleared = () => {
    clearLocalStorage();
    // Other cookie-clearing logic can be added here
  };
  console.log('handleCookiesCleared', handleCookiesCleared);

  const handleRefresh = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleCaptureAndDownload = () => {
    const elementToCapture = document.getElementById('capture-section');
    if (elementToCapture) {
      html2canvas(elementToCapture, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait', // ou 'landscape' pour le mode paysage
          unit: 'pt',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth()-60;
        const pageHeight = pdf.internal.pageSize.getHeight()-30;
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;

        let position = 50;
        let remainingHeight = imgHeight+50;

        // Ajout d'images multiples pour le contenu qui dépasse une page
        while (remainingHeight > 0) {
          pdf.addImage(
            imgData,
            'PNG',
            30,
            position,
            pageWidth,
            pageWidth / ratio // Calculer la hauteur en maintenant le ratio
          );
          remainingHeight -= pageHeight;
          position -= pageHeight-30; // Décaler la position pour l'image suivante
          if (remainingHeight > 0) {
            pdf.addPage();
          }
        }

        pdf.save('capture.pdf');
        // handleRefresh();
        console.log("refresh")
      });
    }
  };


  return (
    <Box
      className="bg-white text-black dark:bg-gray-900 dark:text-white"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ overflow: 'hidden', padding: 0, margin: 0 }}
    >
  <Suspense fallback={<CircularProgress />}>
              <Contact />
            </Suspense>

      {/* Main Content */}
      <Box mt={3} mb={6} display="flex" justifyContent="center" flex="1">
     
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          marginX={8}
          spacing={3}
          sx={{
            width: '100%',
          
            paddingX: 2,
          }}
        >
          {/* Formulaire Section */}
          <Paper variant="outlined" sx={{ padding: 2, flex: 1, height: 'fit-content' }}>
        
            <Suspense fallback={<CircularProgress />}>
              <Formulaire onAddMedicament={ajouterMedicament} />
            </Suspense>
          </Paper>

          {/* ListeMedicaments and Tableau Section */}
          <Paper  variant="outlined" sx={{ flexBasis: '66.66%',padding: 2, flex: 2, height: 'fit-content' }}>
          <Button variant="outlined" endIcon={<DownloadIcon  />} onClick={handleCaptureAndDownload}>{t('GeneratePDF')}</Button>
          <Tooltip title="Rafraîchir la page pour une nouvelle liste">
            <IconButton sx={{ color: "#061439" }} aria-label="refresh" onClick={handleRefresh}>
              <RefreshIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
            <div id="capture-section">
              <Typography variant="h2" sx={{ fontSize: '1.5rem', marginTop: 3, marginBottom: 2, fontFamily: 'Homemade Apple' }}>
                {t('Drugs list')}
              </Typography>
              
              <Suspense fallback={<CircularProgress />}>
                <ListeMedicaments medicaments={medicamentsList} />
                <Tableau joursData={joursData} />
              </Suspense>
            </div>
          </Paper>
        </Stack>
      </Box>

      {/* Footer Section */}
      <Box py={2.5} bgcolor="#061439" color="white" textAlign="center" sx={{ mt: 'auto' }}>
        <Typography
          variant="body2"
          sx={{ fontSize: '1.5rem', fontFamily: 'Kalam' }}
        >© 2024 MediPlan 💊</Typography>
      </Box>
    </Box>
  );
};


export default Planner;