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
    <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 p-6 rounded-lg mx-auto shadow-lg mb-7">
      <label className="flex items-center font-bold gap-2 mb-4">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du médicament"
          required
          className="w-96 p-2 border border-gray-300 rounded font-h1"
        />
      </label>

      <div className="flex space-x-4 mb-4">
        <label className="flex items-center font-bold gap-2">
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            placeholder="Nb"
            required
              min="1"
            maxLength={4} // Limiter le nombre de caractères à 3
            className="w-16 p-2 border border-gray-300 rounded font-h1" // Ajuster la largeur de l'input
          />
        </label>
      </div>
      <div className='flex space-x-3 mb-4'>
        {[ 
          { src: './src/assets/spoon.png', label: 'cuilleres' },
          { src: './src/assets/pills.png', label: 'cachets' },
          { src: './src/assets/bag.png', label: 'sachets' },
          { src: './src/assets/syringe.png', label: 'unites' },
          { src: './src/assets/spray.png', label: 'bouffees' },
          { src: './src/assets/syringe.png', label: 'kg' },
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
      
      <div>

        <label className="flex items-center gap-2 mb-4 text-black dark:text-black">
          Durée (jr) :
          <input
            type="number" // Vous pouvez conserver "number", mais l'attribut maxLength n'aura pas d'effet ici
            value={jours}
            onChange={(e) => setJours(Number(e.target.value))}
            min="1"
            max={9999} // Limite le maximum à 9999 pour un input type="number"
            required
            className="w-20 p-2 border border-gray-300 rounded" // Ajuster la largeur de l'input
          />
        </label>
      </div>
      <div className="flex space-x-4 mb-4 text-black dark:text-black">
        {[
          { label: 'Matin', value: 'matin', src: './src/assets/matin.jpg' }, // garder le texte seulement sur la version portable
          { label: 'Midi', value: 'midi', src: './src/assets/midi.jpg' },
          { label: 'Après-midi', value: 'après-midi', src: './src/assets/apresmidi.jpg' },
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

      <button
        type="submit"
        className="bg-gray-400 text-white p-2 rounded font-bold hover:bg-teal-500 active:bg-teal-700 mt-4 flex items-center justify-center font-h1 w-76"
      >
        Ajouter médicament
        <img className="ml-5" src="./src/assets/add.png" alt="add button image" />
      </button>
    </form>
  );
};

export default Formulaire;