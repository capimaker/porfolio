import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

const savedLang = localStorage.getItem('portfolio-lang')
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: savedLang ?? browserLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('portfolio-lang', lng)
  document.documentElement.lang = lng
})

export default i18n
