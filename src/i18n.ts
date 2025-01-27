import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; 
import en from '../public/locales/en/translation.json';
import fr from '../public/locales/fr/translation.json';
import ro from '../public/locales/ro/translation.json';
import es from '../public/locales/es/translation.json';
import pt from '../public/locales/pt/translation.json';
import it from '../public/locales/it/translation.json';
import cn from '../public/locales/cn/translation.json';
import se from '../public/locales/se/translation.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            fr: { translation: fr },
            en: { translation: en },
            ro: { translation: ro },
            es: { translation: es },
            pt: { translation: pt },
            it: { translation: it },
            se: { translation: se },
            cn: { translation: cn },
        },
        fallbackLng: "en",
        lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
        escapeValue: false // react already safes from xss
        }
    });

export default i18n;