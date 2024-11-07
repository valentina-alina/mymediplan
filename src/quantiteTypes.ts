// quantiteTypes.js
import { useTranslation } from 'react-i18next';
interface QuantiteType {
  src: string;
  key: string;
  label: string;
}
// Fonction pour récupérer le tableau des types de quantité avec traduction
export const getQuantiteTypes = (): QuantiteType[] => {
  const { t } = useTranslation();
  
  return [
    { src: '/spoon.svg', key: 'Spoon', label: t('Units.Spoons') },
    { src: '/tablet.png', key: 'Pill', label: t('Units.Pills') },
    { src: '/bag.png', key: 'Bag', label: t('Units.Bags') },
    { src: '/syringe.svg', key: 'Unit', label: t('Units.Units') },
    { src: '/inhaler.png', key: 'Puff', label: t('Units.Puffs') },
    { src: '/effervescent.png', key: 'Effervescent', label: t('Units.Effervescent') },
  ];
};
