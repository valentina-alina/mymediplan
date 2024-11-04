
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import Horloge from './Horloge';
import { Medicament } from './medicament' ;

type TableauProps = {
  joursData: { [jour: number]: Medicament[] };
  
};


const typeImages: { [key: string]: string } = {
  cuilleres: '/spoon.svg',
  cachets: '/tablet.png',
  sachets: '/bag.png',
  unites: '/syringe.svg',
  bouffees: '/inhaler.png',
  efervescent: '/effervescent.png',
};

const Tableau: React.FC<TableauProps> = ({ joursData }) => {
  const jours = Object.keys(joursData).map(Number);
  console.log(joursData)
  console.log(jours)

  const getDateForDay = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day - 1);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    const parts = formattedDate.split(', ');
    const nomDuJour = parts[0];
    const dateSansNom = parts.length > 1 ? parts[1] : '';
    return `${nomDuJour} ${dateSansNom}`.trim();
  };

  const renderImages = (type: string, quantity: number) => {
    const imageSrc = typeImages[type];
    if (!imageSrc) return null;

    return Array.from({ length: quantity }, (_, i) => (
      <Box
        key={i}
        component="img"
        src={imageSrc}
        alt={type}
        sx={{ width: 24, height: 24, marginX: 0.5 }}
      />
    ));
  };

  return (
    <TableContainer component={Paper}>
         <Typography variant="h5" component="h2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Tableau des médicaments par jour
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Jour</Typography></TableCell>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Date</Typography></TableCell>
            <TableCell><Horloge heureDebutInitiale={7} heureFinInitiale={9} texteFinal={'Matin'} afficherHeures={false} /></TableCell>
            <TableCell><Horloge heureDebutInitiale={12} heureFinInitiale={1} texteFinal={'Midi'} afficherHeures={false} /></TableCell>
            <TableCell><Horloge heureDebutInitiale={4} heureFinInitiale={5} texteFinal={'Après-midi'} afficherHeures={false} /></TableCell>
            <TableCell><Horloge heureDebutInitiale={7} heureFinInitiale={8} texteFinal={'Soir'} afficherHeures={false} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jours.map((jour) => (
            <TableRow key={jour}>
              <TableCell>{jour}</TableCell>
              <TableCell>{getDateForDay(jour)}</TableCell>
              {['matin', 'midi', 'apresmidi', 'soir'].map((periode) => (
                <TableCell key={periode}>
                  {joursData[jour].map((medicament, index) => (
                    medicament.horaires[periode as keyof typeof medicament.horaires] && (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                       <div>
                        {medicament.medicationImage && (
                          <Box
                            component="img"
                            src={medicament.medicationImage}
                            alt={medicament.nom}
                            sx={{ width: 32, height: 32, marginRight: 1 }}
                          />
                        )}
                        </div>
                        <div>
                        <Typography variant="body2" sx={{ marginRight: 1 }}>
                          {medicament.nom}
                        </Typography>
                        <Typography variant="body2" sx={{ marginRight: 1 }}>
                        <span> {medicament.quantite} {medicament.typeQuantite}</span>
                        </Typography>
                        </div>
                        <div>
                      
                        {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                        </div>
                      </Box>
                      
                    )
                  ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tableau;

