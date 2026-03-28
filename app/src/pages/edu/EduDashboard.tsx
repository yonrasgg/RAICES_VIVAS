import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const sections = [
  { to: 'materiales', labelKey: 'edu.materiales', icon: '📖' },
  { to: 'docentes', labelKey: 'edu.docentes', icon: '👩‍🏫' },
] as const

export default function EduDashboard() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-xl font-bold text-green-800">{t('edu.title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="flex flex-col items-center gap-2 rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <span className="text-4xl">{s.icon}</span>
            <span className="font-medium text-gray-700">{t(s.labelKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
