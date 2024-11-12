# MyMediPlan

## Description

MyMediPlan Planner est une application web développée en **React**, **TypeScript**, et **Vite** permettant de générer un tableau de planification des médicaments pour des prescriptions médicales. L'application aide les utilisateurs (patients ou soignants) à organiser la prise de médicaments par jour, en indiquant les doses et les types de médicaments nécessaires pour chaque jour du traitement.

## Fonctionnalités

- **Création de planning de médicaments** : Planifier les doses journalières de différents types de médicaments (pilules, cuillères, sachets, etc.).
- **Formulaire de prescription** : Saisissez des informations sur le nom de l'utilisateur, le nom et la photo du médicament, la posologie, la quantité,  la durée du traitement, et le début du traitement.
- **Persistance des données** : Les données de prescription sont stockées en local (Local Storage) pour être conservées entre les sessions et pouvoir être récupérées après une fermeture de l’application. Un bouton de refresh permet ensuite de nettoyer le planning pour en créer un nouveau.
- **Gestion des types de médicaments** : Choisissez parmi des types de médicaments préconfigurés avec des images associées (ex. pilule, cuillère).
- **Multilingue** : Support pour plusieurs langues via un fichier JSON de dictionnaire (ex : anglais, français).


## Prérequis

- **Node.js** version 14 ou supérieure
- **npm** ou **yarn** pour gérer les packages

## Installation

1. **Cloner le dépôt** :
`git clone https://github.com/valentina-alina/prescription.git`
`cd prescription`
   
1. **Installer les dépendances** :
`npm install # ou yarn install`

3. **Démarrer l'application** :
`npm run dev # ou yarn dev

4. **Ouvrez votre navigateur et allez à l’adresse suivante :**
`http://localhost:5173`
## Utilisation

1. **Remplissez le formulaire** : Entrez le nom de l'utilisateur (facultatif) , le mon du médicament, nombre d'unités de chaque médicament (par ex., comprimés, cuillères,....), la durée du traitement en jours, et le jour de début du traitement., les périodes de la journée.
2. **Générer le PDF pour l'impression**.
3. **Enregistrer le planning** : Les données sont enregistrées dans le localstorage, permettant une récupération même après fermeture de l'application.
4. **Changer la langue** : Utilisez le menu de sélection de langue pour changer la langue de l'interface.

## Technologies utilisées

- **React** avec **TypeScript** 
- **Vite**
- **Local Storage** pour la persistance des données
- **Material UI** pour le style de l'application
- **JSON** pour la gestion multilingue

## Url du projet en phase de test : 
https://mymediplan.onrender.com/

