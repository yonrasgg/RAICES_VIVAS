import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Saber, PortadorSaber, CategoriaSaber } from '@/types/sab'
import StatCard from '@/components/ui/StatCard'

const sections = [
  { to: 'catalogo', labelKey: 'sab.catalogo', icon: '📜' },
  { to: 'portadores', labelKey: 'sab.portadores', icon: '🧓' },
] as const

export default function SabDashboard() {
  const { t } = useTranslation()
  const { docs: saberes } = useDB<Saber>({ mod: 'sab', type: 'saber' })
  const { docs: portadores } = useDB<PortadorSaber>({ mod: 'sab', type: 'portador' })
  const { docs: categorias } = useDB<CategoriaSaber>({ mod: 'sab', type: 'categoria' })

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-xl font-bold text-green-800">{t('sab.title')}</h2>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="📜" label={t('sab.catalogo')} value={saberes.length} color="bg-green-50" />
        <StatCard icon="🧓" label={t('sab.portadores')} value={portadores.length} color="bg-amber-50" />
        <StatCard icon="🏷️" label={t('sab.categorias')} value={categorias.length} color="bg-blue-50" />
      </div>

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
