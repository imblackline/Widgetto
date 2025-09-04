import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslation from './locales/en/translation.json'
import itTranslation from './locales/it/translation.json'
import faTranslation from './locales/fa/translation.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  it: {
    translation: itTranslation,
  },
  fa: {
    translation: faTranslation,
  },
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'fa'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'querystring', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18next


