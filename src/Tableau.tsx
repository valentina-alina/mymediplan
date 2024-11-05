import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import Horloge from './Horloge';
import { Medicament } from './medicament' ;
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);
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
    
    const formattedDate = date.toLocaleDateString(i18n.language, options);

    return formattedDate;
  };

  const renderImages = (type: string, quantity: number) => {
    switch (type) {
      case 'Spoon':
        type='cuilleres'
        break;
      case 'Pill':
        type='cachets'
        break;
        case 'Puff':
          type=' bouffees'
          break;
        case 'Bag':
          type='sachets'
          break;
          case 'Unit':
            type='unites'
            break;
          case 'Effervescent':
            type='efervescent'
            break;
    }

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
    <TableContainer component={Paper} className="border-2 border-r-customBlue">
      <Typography variant="h5" component="h2" sx={{ margin: 2, fontWeight: 'bold', fontFamily: 'Kalam' }}>
        {t('Daily drugs table')}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">{t('Day')}</Typography></TableCell>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">{t('Date')}</Typography></TableCell>
            <TableCell sx={{ fontFamily: 'Kalam' }}><Horloge heureDebutInitiale={7} heureFinInitiale={9} texteFinal={t('Daytime.Morning')} afficherHeures={false} /></TableCell>
            <TableCell sx={{ fontFamily: 'Kalam' }}><Horloge heureDebutInitiale={12} heureFinInitiale={1} texteFinal={t('Daytime.Noon')} afficherHeures={false} /></TableCell>
            <TableCell sx={{ fontFamily: 'Kalam' }}><Horloge heureDebutInitiale={4} heureFinInitiale={5} texteFinal={t('Daytime.Afternoon')} afficherHeures={false} /></TableCell>
            <TableCell sx={{ fontFamily: 'Kalam' }}><Horloge heureDebutInitiale={7} heureFinInitiale={8} texteFinal={t('Daytime.Evening')} afficherHeures={false} /></TableCell>
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
                          <span>
                            {medicament.quantite}{" "}
                            {parseInt(medicament.quantite) === 1
                              ? t(`Units.${medicament.typeQuantite}_singular`)
                              : t(`Units.${medicament.typeQuantite}_plural`)}
                          </span>
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