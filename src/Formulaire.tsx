import React, { useState } from 'react';
import Horloge from './Horloge';
import { TextField, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';
import { MdAddToPhotos } from "react-icons/md";
import { Medicament } from './medicament';

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
      jours:+jours,
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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 p-6 rounded-lg mx-auto shadow-lg">
        <Typography sx={{ fontFamily: 'Homemade Apple' }} variant="h5" gutterBottom>
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
          tabIndex={-1}
          sx={{
            margin: '10px'
          }}
        >
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
            <span className="relative text-white m-1">Charger fichier </span>
            <span>
              <CloudUploadIcon className="relative text-white h-5 w-5" />
            </span>
          </span>
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

        </div>

        <Button>
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
              <span className="relative text-white m-1">ajouter </span>
              <span>
                <MdAddToPhotos className="relative text-white h-5 w-5" />
              </span>
          </span>
        </Button>

      </form>
    </>
  );
};

export default Formulaire;
