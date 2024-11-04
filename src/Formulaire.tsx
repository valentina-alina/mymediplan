import React, { useState } from 'react';
import Horloge from './Horloge';
import { TextField, Button, Checkbox, FormControlLabel, Paper, Grid, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';
type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: string;
  medicationImage: string | null;
};


type FormulaireProps = {
  onAddMedicament: (medicament: Medicament) => void;
};

const Formulaire: React.FC<FormulaireProps> = ({ onAddMedicament }) => {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState('');
  const [jours, setJours] = useState('');
  const [typeQuantite, setTypeQuantite] = useState('');
  const [horaires, setHoraires] = useState({
    matin: false,
    midi: false,
    apresmidi: false,
    soir: false,
  });


  const selectTypeQuantite = (type: string) => {
    setTypeQuantite(type);
  };

  const toggleHoraire = (horaire: keyof typeof horaires) => {
    setHoraires((prev) => ({ ...prev, [horaire]: !prev[horaire] }));
    console.log(`Horaire cliqué: ${horaire}`);
  };
  const [medicationImage, setMedicationImage] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const medicament: Medicament = {
      nom,
      quantite,
      typeQuantite,
      horaires,
      jours,
      medicationImage // Cela peut maintenant être soit une string, soit null
    };

    onAddMedicament(medicament);
    setNom('');
    setQuantite('');
    setJours('');
    setTypeQuantite('');
    setHoraires({ matin: false, midi: false, apresmidi: false, soir: false });
    setMedicationImage(null); // Réinitialisation correcte
  };



  const handleImageUpload = (event: { target: { files: FileList | null; }; }) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setMedicationImage(reader.result);
          console.log(medicationImage)
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto', marginTop: 4 }}>
      <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 p-6 rounded-lg mx-auto shadow-lg">
        <Typography variant="h5" gutterBottom>
          Ajouter un Médicament
        </Typography>

        <TextField
          label="Nom du médicament"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        
       

        <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
  style={{ width: '250px'}}
>
  Upload files
  <VisuallyHiddenInput
    type="file"
    onChange={handleImageUpload}
    multiple
  />
</Button>
        <div className="flex space-x-4 mb-4">
          {[
            { src: '/spoon.svg', label: 'cuilleres' },
            { src: '/tablet.png', label: 'cachets' },
            { src: '/bag.png', label: 'sachets' },
            { src: '/syringe.svg', label: 'unites' },
            { src: '/inhaler.png', label: 'bouffees' },
            { src: '/effervescent.png', label: 'efervescent' },
          ].map(({ src, label }) => (
            <img
              key={label}
              src={src}
              alt={label}
              onClick={() => selectTypeQuantite(label)}
              className={`w-10 h-10 cursor-pointer p-2 ${typeQuantite === label ? 'shadow-lg border-2 border-blue-500' : ''}`}
            />
          ))}
        </div>
        <div className="flex space-x-4 mb-4">
          <TextField
            label="Quantité"
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Jours"
            type="number"
            value={jours}
            onChange={(e) => setJours(e.target.value)} // Correction ici
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          {/* <TextField
            label="Quantité"
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
            fullWidth
          /> */}
          {[
            { label: 'Matin', value: 'matin', heureDebut: 7, heureFin: 9 },
            { label: 'Midi', value: 'midi', heureDebut: 12, heureFin: 1 },
            { label: 'Après-midi', value: 'apresmidi', heureDebut: 4, heureFin: 5 },
            { label: 'Soir', value: 'soir', heureDebut: 7, heureFin: 8 },
          ].map(({ label, heureDebut, heureFin, value }) => (
            <div
              key={value}
              onClick={() => toggleHoraire(value as keyof typeof horaires)}
              className={`cursor-pointer p-2 ${horaires[value as keyof typeof horaires] ? 'shadow-lg border-2 border-blue-500' : 'border border-gray-300'
                } rounded`}
            >
              <Horloge
                heureDebutInitiale={heureDebut}
                heureFinInitiale={heureFin}
                texteFinal={label}
                afficherHeures={false}
              />
            </div>
          ))}
       {/* <TextField
            label="Jours"
            type="number"
            value={jours}
            onChange={(e) => setQuantite(e.target.value)}
            required
            fullWidth
          /> */}
        </div>

        <Button type="submit" variant="contained" color="primary" size="small"   style={{ width: '150px'}}>
          Ajouter
        </Button>
        
      </form>
    </Paper>
  );
};

export default Formulaire;
