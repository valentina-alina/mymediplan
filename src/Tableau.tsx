import React from 'react';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
};

type TableauProps = {
  joursData: { [jour: number]: Medicament[] };
};

// Dictionnaire pour les images des types de quantité
const typeImages: { [key: string]: string } = {
  cuilleres: './src/assets/spoon.png',
  cachets: './src/assets/tablet.png',
  sachets: './src/assets/sachet.jpg',
  unites: './src/assets/seringue.webp',
  bouffees: './src/assets/inhaler.png',
  kg: './src/assets/seringue.png',
};

const Tableau: React.FC<TableauProps> = ({ joursData }) => {
  const jours = Object.keys(joursData).map(Number);

  const getDateForDay = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString();
  };

  const renderImages = (type: string, quantity: number) => {
    const imageSrc = typeImages[type];
    if (!imageSrc) return null;

    return Array.from({ length: quantity }, (_, i) => (
      <img
        key={i}
        src={imageSrc}
        alt={type}
        className="w-6 h-6 inline-block mx-1"
      />
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Jour</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Date</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Matin</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Midi</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Après-midi</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">Soir</th>
          </tr>
        </thead>
        <tbody>
          {jours.map((jour) => (
            <tr key={jour} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">Jour {jour}</td>
              <td className="border border-gray-200 px-4 py-2">{getDateForDay(jour)}</td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.matin)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom} - </span>
                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.midi)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom} - </span>
                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.apresmidi)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom} - </span>
                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.soir)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom} - </span>
                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tableau;
