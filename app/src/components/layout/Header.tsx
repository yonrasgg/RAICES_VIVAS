import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n'
import SyncIndicator from './SyncIndicator'

export default function Header() {
  const { t, i18n } = useTranslation()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-green-700 px-4 py-3 text-white shadow-md">
      <h1 className="text-lg font-bold tracking-tight">
        {t('app.name')}
      </h1>

      <div className="flex items-center gap-3">
        <SyncIndicator />

        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="rounded bg-green-800 px-2 py-1 text-sm text-white"
          aria-label={t('settings.language')}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
