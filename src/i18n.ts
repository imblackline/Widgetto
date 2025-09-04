import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      app: {
        title: 'Widgetify',
        settings: 'Settings',
        manageWidgets: 'Manage widgets',
        getStarted: 'Get started',
      },
      auth: {
        loginToAccount: 'Sign in to your account',
      },
      profile: {
        errorLoading: 'Error loading profile',
        userProfile: 'User profile',
      },
    },
  },
  it: {
    translation: {
      app: {
        title: 'Widgetify',
        settings: 'Impostazioni',
        manageWidgets: 'Gestisci widget',
        getStarted: 'Inizia',
      },
      auth: {
        loginToAccount: 'Accedi al tuo account',
      },
      profile: {
        errorLoading: 'Errore durante il caricamento del profilo',
        userProfile: 'Profilo utente',
      },
    },
  },
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'it'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'querystring', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18next


