import React, { useState } from 'react';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const medicament: Medicament = { nom, quantite, typeQuantite, horaires, jours };
    onAddMedicament(medicament);
    setNom('');
    setQuantite('');
    setJours(1);
    setTypeQuantite('');
    setHoraires({ matin: false, midi: false, apresmidi: false, soir: false });
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

      <div className="flex space-x-4 mb-4">
        {[ 
          { src: './src/assets/spoon.png', label: 'cuilleres' },
          { src: './src/assets/tablet.png', label: 'cachets' },
          { src: './src/assets/sachet.jpg', label: 'sachets' },
          { src: './src/assets/seringue.webp', label: 'unites' },
          { src: './src/assets/inhaler.png', label: 'bouffees' },
          { src: './src/assets/seringue.png', label: 'kg' },
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

      <label className="flex items-center font-bold gap-2 mb-4">
        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          placeholder="Nb"
          required
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </label>

      <div className="flex space-x-4 mb-4">
        {[
          { label: 'Matin', value: 'matin', src: './src/assets/matin.jpg' },
          { label: 'Midi', value: 'midi', src: './src/assets/midi.jpg' },
          { label: 'Après-midi', value: 'apresmidi', src: './src/assets/apresmidi.jpg' },
          { label: 'Soir', value: 'soir', src: './src/assets/soir.jpg' },
        ].map(({ label, value, src }) => (
          <div>
          <img
            key={value}
            src={src}
            alt={label}
            onClick={() => toggleHoraire(value as keyof typeof horaires)}
            className={`w-20 h-20 cursor-pointer p-2 ${horaires[value as keyof typeof horaires] ? 'shadow-lg border-2 border-blue-500' : ''}`}
          />
          <p>{value}</p>
          </div>
         
        ))}
      </div>

      <label className="flex items-center font-bold gap-2 mb-4">
        Durée (jr) :
        <input
          type="number"
          value={jours}
          onChange={(e) => setJours(Number(e.target.value))}
          min="1"
          required
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </label>

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
