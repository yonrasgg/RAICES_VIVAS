import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Docente, Estudiante, MaterialEducativo, Ejercicio } from '@/types/edu'
import StatCard from '@/components/ui/StatCard'

const sections = [
  { to: 'materiales', labelKey: 'edu.materiales', icon: '📖' },
  { to: 'docentes', labelKey: 'edu.docentes', icon: '👩‍🏫' },
  { to: 'estudiantes', labelKey: 'edu.estudiantes', icon: '🎒' },
  { to: 'ejercicios', labelKey: 'edu.ejercicios', icon: '✏️' },
] as const

export default function EduDashboard() {
  const { t } = useTranslation()
  const { docs: docentes } = useDB<Docente>({ mod: 'edu', type: 'docente' })
  const { docs: estudiantes } = useDB<Estudiante>({ mod: 'edu', type: 'estudiante' })
  const { docs: materiales } = useDB<MaterialEducativo>({ mod: 'edu', type: 'material_educativo' })
  const { docs: ejercicios } = useDB<Ejercicio>({ mod: 'edu', type: 'ejercicio' })

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-xl font-bold text-green-800">{t('edu.title')}</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="👩‍🏫" label={t('edu.docentes')} value={docentes.length} color="bg-green-50" />
        <StatCard icon="🎒" label={t('edu.estudiantes')} value={estudiantes.length} color="bg-blue-50" />
        <StatCard icon="📖" label={t('edu.materiales')} value={materiales.length} color="bg-amber-50" />
        <StatCard icon="✏️" label={t('edu.ejercicios')} value={ejercicios.length} color="bg-purple-50" />
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
