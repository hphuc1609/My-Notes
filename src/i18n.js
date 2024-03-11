import resources from "configs/translation";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false
  },
  supportedLngs: ["vi", "en"],
  ns: ["translation"],
  defaultNS: "translation",
  keySeparator: false, // we use content as keys
  returnNull: false,
  returnEmptyString: false,
  returnObjects: false,
  saveMissing: true,
  missingKeyHandler(lng, ns, key) {
    console.log("missingKey", lng, ns, key);
  }
});

export default i18n;
