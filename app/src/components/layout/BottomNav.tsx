import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', labelKey: 'nav.home', icon: '🏠' },
  { to: '/edu', labelKey: 'nav.edu', icon: '📚' },
  { to: '/sab', labelKey: 'nav.sab', icon: '🌿' },
  { to: '/sal', labelKey: 'nav.sal', icon: '❤️' },
] as const

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-gray-200 bg-white py-2 shadow-inner">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? 'text-green-700 font-semibold' : 'text-gray-500'}`
          }
        >
          <span className="text-xl">{l.icon}</span>
          <span>{t(l.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
