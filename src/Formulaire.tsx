import React, { useState } from 'react';
import Horloge from './Horloge';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
  medicationImage: string | null; 
};


type FormulaireProps = {
  onAddMedicament: (medicament: Medicament) => void;
};

const Formulaire: React.FC<FormulaireProps> = ({ onAddMedicament }) => {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState('');
  const [jours, setJours] = useState(1);
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
    setJours(1);
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

  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 p-6 rounded-lg mx-auto shadow-lg">
      <label className="flex items-center font-bold gap-2 mb-4">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du médicament"
          required
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </label>
      <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
/>


      <div className="flex space-x-4 mb-4">

        <label className="flex items-center font-bold gap-2 mb-4">
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            placeholder="Nb"
            required
            min="1"
            maxLength={4} // Limiter le nombre de caractères à 3
            className="w-16 p-2 border border-gray-300 rounded" // Ajuster la largeur de l'input
          />
        </label>

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
        {[
          { label: 'Matin', value: 'matin', heureDebut: 7, heureFin: 9 },
          { label: 'Midi', value: 'midi', heureDebut: 12, heureFin: 1 },
          { label: 'Après-midi', value: 'apresmidi', heureDebut: 4, heureFin: 5 },
          { label: 'Soir', value: 'soir', heureDebut: 7, heureFin: 8 },
        ].map(({ label, heureDebut, heureFin, value }) => (
          <div
          key={value}
          onClick={() => toggleHoraire(value as keyof typeof horaires)}
          className={`cursor-pointer p-2 ${
            horaires[value as keyof typeof horaires] ? 'shadow-lg border-2 border-blue-500' : 'border border-gray-300'
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


        <label className="flex items-center font-bold gap-2 mb-4">
          Jours :
          <input

            type="number" // Vous pouvez conserver "number", mais l'attribut maxLength n'aura pas d'effet ici
            value={jours}
            onChange={(e) => setJours(Number(e.target.value))}
            placeholder="Nb"
            min="1"
            max={9999} // Limite le maximum à 9999 pour un input type="number"
            required

            className="w-20 p-2 border border-gray-300 rounded" // Ajuster la largeur de l'input
          />
        </label>

      </div>


      <button
        type="submit"
        className="bg-teal-600 text-white p-2 rounded font-bold hover:bg-teal-500 active:bg-teal-700 mt-4"
      >

        Ajouter le médicament
      </button>
    </form>
  );
};

export default Formulaire;
