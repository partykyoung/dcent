import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../../assets/i18n/en.json";
import koTranslation from "../../assets/i18n/ko.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ko: {
    translation: koTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 언어
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
