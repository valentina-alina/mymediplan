import React from 'react';
import Horloge from './Horloge';

type Medicament = {
  nom: string;
  quantite: string;
  typeQuantite: string;
  horaires: { matin: boolean; midi: boolean; apresmidi: boolean; soir: boolean };
  jours: number;
  medicationImage: string | null;
};


type TableauProps = {
  joursData: { [jour: number]: Medicament[] };
};

// Dictionnaire pour les images des types de quantité
const typeImages: { [key: string]: string } = {
  cuilleres: '/spoon.svg',
  cachets: '/tablet.png',
  sachets: '/bag.png',
  unites: '/syringe.svg',
  bouffees: '/inhaler.png',
  efervescent: '/effervescent.png',
};

const Tableau: React.FC<TableauProps> = ({ joursData }) => {
  const jours = Object.keys(joursData).map(Number);

  const getDateForDay = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day - 1);

    // Obtenir le nom du jour et la date dans le format souhaité
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',   // 'long' pour le nom complet du jour
      year: 'numeric',    // Année au format numérique
      month: '2-digit',   // Mois au format à deux chiffres
      day: '2-digit'      // Jour au format à deux chiffres
    };

    // Formatage de la date
    const formattedDate = date.toLocaleDateString('fr-FR', options);

    // Enlever l'éventuelle virgule
    const parts = formattedDate.split(', ');
    const nomDuJour = parts[0]; // Le nom du jour
    const dateSansNom = parts.length > 1 ? parts[1] : ''; // La date sans le nom du jour

    return `${nomDuJour} ${dateSansNom}`.trim(); // Format final : "nom du jour dd/mm/yyyy"
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
          
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
              <Horloge heureDebutInitiale={7} heureFinInitiale={9} texteFinal={'Matin'} afficherHeures={false} />
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
              <Horloge heureDebutInitiale={12} heureFinInitiale={1} texteFinal={'Midi'} afficherHeures={false} />
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
              <Horloge heureDebutInitiale={4} heureFinInitiale={5} texteFinal={'Aprés-midi'} afficherHeures={false} />
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
              <Horloge heureDebutInitiale={7} heureFinInitiale={8} texteFinal={'Soir'} afficherHeures={false} />
            </th>
          </tr>
        </thead>
        <tbody>
          {jours.map((jour) => (
            <tr key={jour}>
              <td className="border border-gray-200 px-4 py-2">{`Jour ${jour}`}</td>

              <td className="border border-gray-200 px-4 py-2">{getDateForDay(jour)}</td>

              <td className="border border-gray-200 px-4 py-2">
  {joursData[jour]
    .filter((medicament) => medicament.horaires.matin)
    .map((medicament, index) => (
      <div key={index}>
        <span>{medicament.nom}</span>
        <div>
        {medicament.medicationImage && (
          <img
            src={medicament.medicationImage}
            alt={`Boîte de ${medicament.nom}`}
            className="w-16 h-auto"
          />
        )}
        {/* Vérifier le typeQuantite et afficher l'image en conséquence */}
        {medicament.typeQuantite === 'syringe' ? (
          renderImages('syringe', 1) // Afficher une seule image pour les seringues
        ) : (
          renderImages(medicament.typeQuantite, parseInt(medicament.quantite)) // Afficher plusieurs images pour les autres types
        )}</div>
      </div>
    ))}
</td>

              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.midi)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom}  </span>
                      {medicament.medicationImage && (
                        <img
                          src={medicament.medicationImage}
                          alt={`Boîte de ${medicament.nom}`}
                          className="w-16 h-auto"
                        />
                      )}
                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.apresmidi)
                  .map((medicament, index) => (
                    <div key={index}>
                    <div className="relative inline-block">
  {medicament.medicationImage && (
    <img
      src={medicament.medicationImage}
      alt={`Boîte de ${medicament.nom}`}
      className="w-16 h-auto"
    />
  )}
  <span className="absolute inset-0 flex items-center justify-center bg-white opacity-75 text-black p-1">
    {medicament.nom}
  </span>
</div>

                      {renderImages(medicament.typeQuantite, parseInt(medicament.quantite))}
                    </div>
                  ))}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {joursData[jour]
                  .filter((medicament) => medicament.horaires.soir)
                  .map((medicament, index) => (
                    <div key={index}>
                      <span>{medicament.nom}  </span>
                      {medicament.medicationImage && (
                        <img
                          src={medicament.medicationImage}
                          alt={`Boîte de ${medicament.nom}`}
                          className="w-16 h-auto"
                        />
                      )}
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
