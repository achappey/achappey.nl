import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import en from "../config/translations/en.json";
import nl from "../config/translations/nl.json";


export const initTranslations = () => {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: en
                },
                nl: {
                    translation: nl
                }
            },
            fallbackLng: "en",
            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });

}



