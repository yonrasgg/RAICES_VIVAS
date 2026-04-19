import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Paciente, Cita, Brigada } from '@/types/sal'
import StatCard from '@/components/ui/StatCard'

const sections = [
  { to: 'pacientes', labelKey: 'sal.pacientes', icon: '🩺' },
  { to: 'citas', labelKey: 'sal.citas', icon: '📅' },
  { to: 'brigadas', labelKey: 'sal.brigadas', icon: '🚑' },
] as const

export default function SalDashboard() {
  const { t } = useTranslation()
  const { docs: pacientes } = useDB<Paciente>({ mod: 'sal', type: 'paciente' })
  const { docs: citas } = useDB<Cita>({ mod: 'sal', type: 'cita' })
  const { docs: brigadas } = useDB<Brigada>({ mod: 'sal', type: 'brigada' })

  const citasPendientes = citas.filter((c) => c.estado === 'pendiente').length

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-xl font-bold text-green-800">{t('sal.title')}</h2>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🩺" label={t('sal.pacientes')} value={pacientes.length} color="bg-rose-50" />
        <StatCard icon="📅" label={t('sal.pendiente')} value={citasPendientes} color="bg-amber-50" />
        <StatCard icon="🚑" label={t('sal.brigadas')} value={brigadas.length} color="bg-blue-50" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
