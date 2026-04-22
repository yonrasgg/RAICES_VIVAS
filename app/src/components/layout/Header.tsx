import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n'
import SyncIndicator from './SyncIndicator'
import TribalIcon from '@/components/icons/TribalIcon'

export default function Header() {
  const { t, i18n } = useTranslation()

  return (
    <header className="sticky top-0 z-30 shadow-[var(--shadow-tribal)]">
      <div className="rv-cenefa" aria-hidden />
      <div className="flex items-center justify-between bg-[color:var(--color-jungle-700)] px-4 py-3 text-[color:var(--color-cream-100)]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-ocre-400)]/20 text-[color:var(--color-ocre-300)] ring-1 ring-[color:var(--color-ocre-400)]/40">
            <TribalIcon name="espiral" size={22} />
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-semibold tracking-tight text-[color:var(--color-cream-100)]">
              {t('app.name')}
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ocre-300)]/80">
              Raíces Vivas · CR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SyncIndicator />

          <label className="sr-only" htmlFor="lang-select">
            {t('settings.language')}
          </label>
          <select
            id="lang-select"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="rounded-full border border-[color:var(--color-ocre-400)]/40 bg-[color:var(--color-jungle-800)] px-3 py-1 text-xs font-medium text-[color:var(--color-cream-100)] hover:border-[color:var(--color-ocre-400)]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
