import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getQuantiteTypes } from './quantiteTypes'; // Import du tableau de types de quantités
import { Medicament } from './medicament';
import { MdAddToPhotos } from 'react-icons/md';


interface FormulaireProps {
  onAddMedicament: (medicament: Medicament) => void;
}

const Formulaire: React.FC<FormulaireProps> = ({ onAddMedicament }) => {
  const { t } = useTranslation();

  const quantiteTypes = getQuantiteTypes();
console.log(quantiteTypes);
  // États pour les champs du formulaire
  const [nom, setNom] = useState<string>('');
  const [quantite, setQuantite] = useState<string>('1');
  const [jours, setJours] = useState<string>('1');
  const [jourDebut, setJourDebut] = useState<string>('1');
  const [typeQuantite, setTypeQuantite] = useState<string>('');
  const [horaires, setHoraires] = useState({
    matin: false,
    midi: false,
    apresmidi: false,
    soir: false,
  });
  const [submittedMedicaments, setSubmittedMedicaments] = useState<Medicament[]>([]);
  const [medicationImage, setMedicationImage] = useState<string | null>(null); // Image du médicament

  useEffect(() => {
    // Chargement des médicaments depuis le localStorage
    const storedMedicaments = localStorage.getItem('medicaments');
    if (storedMedicaments) {
      setSubmittedMedicaments(JSON.parse(storedMedicaments));
    }
  }, []);

  // Fonction pour sélectionner un type de quantité
  const selectTypeQuantite = (type: string) => {
    setTypeQuantite(type);
  };

  // Fonction pour basculer l'état des horaires (matin, midi, etc.)
  const toggleHoraire = (horaire: keyof typeof horaires) => {
    setHoraires((prev) => ({ ...prev, [horaire]: !prev[horaire] }));
  };

  // Gestion de l'envoi du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMedicament: Medicament = {
      nom,
      quantite,
      typeQuantite,
      horaires,
      jours: parseInt(jours, 10),
      jourDebut: parseInt(jourDebut, 10),
      medicationImage,
    };

    onAddMedicament(newMedicament);

    const updatedMedicaments = [...submittedMedicaments, newMedicament];
    setSubmittedMedicaments(updatedMedicaments);
    localStorage.setItem('medicaments', JSON.stringify(updatedMedicaments));
console.log('submitedMedic',submittedMedicaments)
    // Réinitialisation des champs
    setNom('');
    setQuantite('');
    setJours('');
    setJourDebut('');
    setTypeQuantite('');
    setHoraires({ matin: false, midi: false, apresmidi: false, soir: false });
    setMedicationImage(null);
  };

  // Gestion du téléchargement de l'image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setMedicationImage(reader.result);
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
      <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 p-6 rounded-lg mx-auto shadow-lg border-2 border-r-customBlue">
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
          disableRipple
          disableElevation
          tabIndex={-1}
          sx={{
            margin: '10px',
            ':hover': {
              backgroundColor: 'transparent',
            },
            ':focus': {
              outline: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
            ':active': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
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
        {quantiteTypes.map(({ src, key, label }) =>  (
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
            <TextField    
            label={t('FirstDay')}
            type="number"
            value={jourDebut}
            onChange={(e) => setJourDebut(e.target.value)} // Correction ici
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center md:space-x-2 mb-4 font-h1">
          {[
            { label: t('Daytime.Morning'), value: 'matin', heureDebut: 7, heureFin: 9 },
            { label: t('Daytime.Noon'), value: 'midi', heureDebut: 12, heureFin: 1 },
            { label: t('Daytime.Afternoon'), value: 'apresmidi', heureDebut: 4, heureFin: 5 },
            { label: t('Daytime.Evening'), value: 'soir', heureDebut: 7, heureFin: 8 },
          ].map(({ label, value }) => (
            <div
              key={value}
              onClick={() => toggleHoraire(value as keyof typeof horaires)}
              // style={{ width: '110px', height: '110px' }}
              className={` flex flex-col items-center justify-center cursor-pointer p-2 m-2 ${horaires[value as keyof typeof horaires] ? ' shadow-lg border-2 border-blue-500' : 'border border-gray-300'
                } rounded`}
            >
            <img src={`./${value}.svg`} alt=""  width="50" height="50" />

              <p>{label}</p>
        
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