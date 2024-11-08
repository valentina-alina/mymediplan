import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { Medicament } from './medicament';
import { useTranslation } from 'react-i18next';

type ListeMedicamentsProps = {
  medicaments: Medicament[];
};

const ListeMedicaments: React.FC<ListeMedicamentsProps> = ({ medicaments }) => {
  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);

  return (
    <Box sx={{ margin: 4 }}>
      {/* <Typography variant="h5" component="h2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Liste des Médicaments
      </Typography> */}
      <List>
        {medicaments.map((medicament, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={
                <>
                  <strong>{medicament.nom}: </strong>
                  <span>
                    {medicament.quantite}{" "}
                    {parseInt(medicament.quantite) === 1
                      ? t(`Units.${medicament.typeQuantite}_singular`)
                      : t(`Units.${medicament.typeQuantite}_plural`)}
                  </span>
                </>
              }
              secondary={
                <>
                  {medicament.horaires.matin && <span>{t('Daytime.Morning')}</span>}
                  {medicament.horaires.midi && <span> + {t('Daytime.Noon')}</span>}
                  {medicament.horaires.apresmidi && <span> + {t('Daytime.Afternoon')}</span>}
                  {medicament.horaires.soir && <span> + {t('Daytime.Evening')}</span>}
                  <span> — {t('For')} {medicament.jours} {t('Days')}</span>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListeMedicaments;
