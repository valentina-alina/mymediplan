import React, { useState } from 'react';
import Horloge from './Horloge';
import { TextField, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';
import { MdAddToPhotos } from "react-icons/md";
import { Medicament } from './medicament';
import { useTranslation } from 'react-i18next';

type FormulaireProps = {
  onAddMedicament: (medicament: Medicament) => void;
};

const Formulaire: React.FC<FormulaireProps> = ({ onAddMedicament }) => {
  const { t, i18n } = useTranslation();
  console.log('i18n', i18n);
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
          {t('Add a drug')}
        </Typography>

        <TextField
          label={t('Drug name')}
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
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-customBlue relative flex gap-2 p-1 mt-2'>
            <span className="relative text-white m-1">{t('Upload file')} </span>
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
        <div className="flex flex-wrap justify-center mr-8 md:mr-0 m-2 md:m-4 space-x-4">
          {[
            { src: '/spoon.svg', key: 'Spoon', label: t('Units.Spoons') },
            { src: '/tablet.png', key: 'Pill', label: t('Units.Pills') },
            { src: '/bag.png', key: 'Bag', label: t('Units.Bags') },
            { src: '/syringe.svg', key: 'Unit', label: t('Units.Units') },
            { src: '/inhaler.png', key: 'Puff', label: t('Units.Puffs') },
            { src: '/effervescent.png', key: 'Effervescent', label: t('Units.Effervescent') },
          ].map(({ src, key, label }) => (
            <img
              key={key}
              src={src}
              alt={label}
              onClick={() => selectTypeQuantite(key)}
              className={`w-10 h-10 cursor-pointer p-1 m-6 md:m-0 ${typeQuantite === key ? 'shadow-lg border-2 border-blue-500' : ''}`}
            />
          ))}
        </div>
        <div className="flex space-x-4 mb-4">
          <TextField
            label={t('Quantity')}
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label={t('Days')}
            type="number"
            value={jours}
            onChange={(e) => setJours(e.target.value)} // Correction ici
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center md:space-x-2 mb-4">
          {[
            { label: t('Daytime.Morning'), value: 'matin', heureDebut: 7, heureFin: 9 },
            { label: t('Daytime.Noon'), value: 'midi', heureDebut: 12, heureFin: 1 },
            { label: t('Daytime.Afternoon'), value: 'apresmidi', heureDebut: 4, heureFin: 5 },
            { label: t('Daytime.Evening'), value: 'soir', heureDebut: 7, heureFin: 8 },
          ].map(({ label, heureDebut, heureFin, value }) => (
            <div
              key={value}
              onClick={() => toggleHoraire(value as keyof typeof horaires)}
              // style={{ width: '110px', height: '110px' }}
              className={` flex flex-col items-center justify-center cursor-pointer p-2 m-2 ${horaires[value as keyof typeof horaires] ? ' shadow-lg border-2 border-blue-500' : 'border border-gray-300'
                } rounded`}
            >
           <img src={`./${value}.svg`} alt=""  width="50" height="50" />

              <p>{label}</p>
              {/* <Horloge
                heureDebutInitiale={heureDebut}
                heureFinInitiale={heureFin}
                texteFinal={label}
                afficherHeures={false}
              /> */}
            </div>
          ))}
        </div>

        <Button type="submit">
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-customBlue relative flex gap-2 p-1 mt-2'>
              <span className="relative text-white m-1">{t('Add')} </span>
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