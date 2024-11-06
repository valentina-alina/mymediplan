import React, { useRef, useState } from 'react';
import Formulaire from './Formulaire';
import Tableau from './Tableau';
import ListeMedicaments from './ListeMedicaments';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import Navbar from './Nav.tsx';
import { Medicament } from './medicament.ts';
import { useTranslation } from 'react-i18next';

import html2canvas from 'html2canvas';
import { StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);
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
  }
    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },
      image: {
        width: '100%',
        height: 'auto',
      },
    });
      const divRef = useRef<HTMLDivElement>(null);
      const [imageSrc, setImageSrc] = useState<string | null>(null);
    
   
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
      <Navbar navItems={[t('Navbar.Home'), t('Navbar.About'), t('Navbar.Contact')]} />

      {/* Main Content */}
      <Box mt={18} mb={6} display="flex" justifyContent="center" flex="1">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            width: '100%',
          
            paddingX: 2,
          }}
        >
          {/* Formulaire Section */}
          <Paper variant="outlined" sx={{ flexBasis: '33.33%', padding: 2, flex: 1, height: 'fit-content' }}>
            <Formulaire onAddMedicament={ajouterMedicament} />
          </Paper>

          {/* ListeMedicaments and Tableau Section */}
          <Paper  variant="outlined" sx={{ flexBasis: '66.66%',padding: 2, flex: 2, height: 'fit-content' }}>
            <div id="capture-section">         
          <Button variant="outlined" endIcon={<DownloadIcon  />} onClick={handleCaptureAndDownload}>Générer le PDF</Button>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', marginTop: 3, marginBottom: 2, fontFamily: 'Homemade Apple' }}>
              {t('Drugs list')}
            </Typography>            
            <ListeMedicaments medicaments={medicamentsList} />
            <Tableau joursData={joursData} />
            </div>
          </Paper>
        </Stack>
      </Box>

      {/* Footer Section */}
      <Box py={2.5} bgcolor="#061439" color="white" textAlign="center" sx={{ mt: 'auto' }}>
        <Typography
          variant="body2"
          sx={{ fontSize: '1.5rem', fontFamily: 'Kalam' }}
        >© 2024 MediPlan</Typography>
      </Box>
    </Box>
  );
};


export default App;