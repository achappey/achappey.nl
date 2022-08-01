import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from "i18next-http-backend";

export const initTranslations = () => {
    i18n
        .use(initReactI18next)
        .use(HttpApi)
        .use(LanguageDetector)
        .init({
            fallbackLng: "en",
            interpolation: {
                escapeValue: false 
            }
        });
}



