
// Import translations
import en from '@locales/en';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const DEFAULT_LNG = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: { en },
    lng: DEFAULT_LNG,
    fallbackLng: DEFAULT_LNG,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;