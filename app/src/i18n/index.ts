import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './es.json'
import bri from './bri.json'
import cab from './cab.json'
import ngb from './ngb.json'

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'bri', label: 'Bribri' },
  { code: 'cab', label: 'Cabécar' },
  { code: 'ngb', label: 'Ngäbe' },
] as const

const STORAGE_KEY = 'raices_lang'

/** Read saved language from localStorage (PouchDB preference is secondary) */
function getSavedLanguage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? 'es'
  } catch {
    return 'es'
  }
}

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    bri: { translation: bri },
    cab: { translation: cab },
    ngb: { translation: ngb },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

/** Persist language selection */
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // storage unavailable — ignore
  }
})

export default i18n
