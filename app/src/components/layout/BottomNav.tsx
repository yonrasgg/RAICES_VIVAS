import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TribalIcon from '@/components/icons/TribalIcon'

const links = [
  { to: '/', labelKey: 'nav.home', icon: 'home' as const },
  { to: '/edu', labelKey: 'nav.edu', icon: 'edu' as const },
  { to: '/sab', labelKey: 'nav.sab', icon: 'sab' as const },
  { to: '/sal', labelKey: 'nav.sal', icon: 'sal' as const },
  { to: '/trans', labelKey: 'nav.trans', icon: 'trans' as const },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-[color:var(--color-border-soft)] bg-[color:var(--color-cream-50)]/95 backdrop-blur"
      aria-label={t('nav.home')}
    >
      <div className="rv-cenefa-diamantes" aria-hidden />
      <ul className="mx-auto flex max-w-5xl items-stretch justify-around">
        {links.map((l) => (
          <li key={l.to} className="flex-1">
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                [
                  'relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 px-2 py-2 text-[11px] font-medium transition',
                  isActive
                    ? 'text-[color:var(--color-terracotta-600)]'
                    : 'text-[color:var(--color-charcoal-500)] hover:text-[color:var(--color-jungle-700)]',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <TribalIcon name={l.icon} size={22} />
                  <span className="tracking-wide">{t(l.labelKey)}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-[color:var(--color-terracotta-500)]"
                      aria-hidden
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
