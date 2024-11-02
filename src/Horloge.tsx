import React, { useState } from 'react';

// Déclaration des types de props
interface HorlogeProps {
  heureDebutInitiale: number;
  heureFinInitiale: number;
  texteFinal: string;
  afficherHeures: boolean; // Nouvelle prop pour contrôler l'affichage
}

const Horloge: React.FC<HorlogeProps> = ({ heureDebutInitiale, heureFinInitiale, texteFinal, afficherHeures }) => {
  const [heureDebut, setHeureDebut] = useState(heureDebutInitiale);
  const [heureFin, setHeureFin] = useState(heureFinInitiale);

  // Conversion des heures en angles (360 degrés = 12 heures)
  const angleDebut = (heureDebut / 12) * 360;
  const angleFin = (heureFin / 12) * 360;

  // Calcul pour gérer l'angle du secteur coloré
  const backgroundStyle = angleFin >= angleDebut
    ? `conic-gradient(transparent 0deg ${angleDebut}deg, rgba(124, 252, 0, 0.6) ${angleDebut}deg ${angleFin}deg, transparent ${angleFin}deg 360deg)`
    : `conic-gradient(rgba(124, 252, 0, 0.6) 0deg ${angleFin}deg, transparent ${angleFin}deg ${angleDebut}deg, rgba(124, 252, 0, 0.6) ${angleDebut}deg 360deg)`;

  return (
    <div className="flex flex-col items-center">
      {/* Cadran de l'horloge avec plage horaire */}
      <div className="relative flex items-center justify-center w-20 h-20 p-4 rounded-full bg-gray-200 overflow-hidden">
        <div className="absolute p-4 top-0 left-0 w-full h-full rounded-full bg-white border border-blue-900"></div>

        {/* Secteur horaire en couleur */}
        <div className="absolute w-full h-full rounded-full" style={{ background: backgroundStyle }}></div>

        {/* Marquage des heures en dehors du cercle */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 text-center transform -translate-x-1/2 -translate-y-1/2 text-[8px]"
            style={{
              top: `${50 + 40 * Math.cos((i * -30 - 180) * (Math.PI / 180))}%`,
              left: `${50 + 40 * Math.sin((i * -30 - 180) * (Math.PI / 180))}%`,
            }}
          >
            {i === 0 ? 12 : i}
          </div>
        ))}
      </div>

      {/* Affichage conditionnel des inputs pour les heures */}
      {afficherHeures && (
        <div className="flex">
          <input
            type="number"
            min="0"
            max="12"
            value={heureDebut}
            onChange={(e) => setHeureDebut(Number(e.target.value))}
            className="bg-transparent m-1 rounded w-10 text-center text-[12px]"
          />
          <input
            type="number"
            min="0"
            max="12"
            value={heureFin}
            onChange={(e) => setHeureFin(Number(e.target.value))}
            className="rounded w-10 text-right text-[12px] bg-transparent m-1"
          />
        </div>
      )}

      {/* Texte final paramétrable */}
      <p className="rounded text-right text-[12px] m-1">{texteFinal}</p>
    </div>
  );
};

export default Horloge;
