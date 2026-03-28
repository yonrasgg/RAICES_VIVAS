import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const modules = [
  { to: '/edu', labelKey: 'nav.edu', icon: '📚', color: 'bg-green-100 text-green-800' },
  { to: '/sab', labelKey: 'nav.sab', icon: '🌿', color: 'bg-amber-100 text-amber-800' },
  { to: '/sal', labelKey: 'nav.sal', icon: '❤️', color: 'bg-rose-100 text-rose-800' },
] as const

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800">
          {t('app.name')}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {t('app.tagline')}
        </p>
      </div>

      <div className="grid gap-4">
        {modules.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={`flex items-center gap-4 rounded-xl p-5 shadow-sm transition hover:shadow-md ${m.color}`}
          >
            <span className="text-3xl">{m.icon}</span>
            <span className="text-lg font-semibold">{t(m.labelKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
