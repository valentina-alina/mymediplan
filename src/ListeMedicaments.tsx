import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: string;
};

type ListeMedicamentsProps = {
  medicaments: Medicament[];
};

const ListeMedicaments: React.FC<ListeMedicamentsProps> = ({ medicaments }) => {
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
                  <strong>{medicament.nom} :</strong>
                  <span> {medicament.quantite} {medicament.typeQuantite}</span>
                </>
              }
              secondary={
                <>
                  {medicament.horaires.matin && <span>Matin</span>}
                  {medicament.horaires.midi && <span> + Midi</span>}
                  {medicament.horaires.apresmidi && <span> + Après-midi</span>}
                  {medicament.horaires.soir && <span> + Soir</span>}
                  <span> — pendant {medicament.jours} jours</span>
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
