import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Docente, Estudiante, MaterialEducativo, Ejercicio } from '@/types/edu'
import StatCard from '@/components/ui/StatCard'
import ModuleHeader from '@/components/layout/ModuleHeader'
import TribalIcon from '@/components/icons/TribalIcon'

const sections = [
  { to: 'materiales', labelKey: 'edu.materiales', icon: 'tejido' as const, desc: 'Audios, videos y cuentos en lenguas originarias.' },
  { to: 'docentes', labelKey: 'edu.docentes', icon: 'rancho' as const, desc: 'Educadores con lenguas dominadas.' },
  { to: 'estudiantes', labelKey: 'edu.estudiantes', icon: 'cacao' as const, desc: 'Aprendices por nivel y territorio.' },
  { to: 'ejercicios', labelKey: 'edu.ejercicios', icon: 'espiral' as const, desc: 'Prácticas y evaluaciones culturalmente pertinentes.' },
] as const

export default function EduDashboard() {
  const { t } = useTranslation()
  const { docs: docentes } = useDB<Docente>({ mod: 'edu', type: 'docente' })
  const { docs: estudiantes } = useDB<Estudiante>({ mod: 'edu', type: 'estudiante' })
  const { docs: materiales } = useDB<MaterialEducativo>({ mod: 'edu', type: 'material_educativo' })
  const { docs: ejercicios } = useDB<Ejercicio>({ mod: 'edu', type: 'ejercicio' })

  return (
    <div className="space-y-6">
      <ModuleHeader
        module="edu"
        title={t('edu.title')}
        subtitle="Materiales y prácticas en cuatro lenguas originarias"
        cover="/img/cover-rf-edu.png"
        quote="El 87 % de docentes reporta materiales insuficientes en lengua originaria."
        quoteSource="Análisis de entrevistas · ENT-002"
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<TribalIcon name="rancho" size={22} />} label={t('edu.docentes')} value={docentes.length} accent="edu" />
        <StatCard icon={<TribalIcon name="cacao" size={22} />} label={t('edu.estudiantes')} value={estudiantes.length} accent="edu" />
        <StatCard icon={<TribalIcon name="tejido" size={22} />} label={t('edu.materiales')} value={materiales.length} accent="edu" />
        <StatCard icon={<TribalIcon name="espiral" size={22} />} label={t('edu.ejercicios')} value={ejercicios.length} accent="edu" />
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rv-card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-tribal)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-jungle-50)] text-[color:var(--color-jungle-500)] ring-1 ring-[color:var(--color-jungle-200)]">
              <TribalIcon name={s.icon} size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-[color:var(--color-jungle-700)]">
                {t(s.labelKey)}
              </p>
              <p className="text-xs text-[color:var(--color-charcoal-500)]">{s.desc}</p>
            </div>
            <TribalIcon name="chevron-right" size={18} />
          </Link>
        ))}
      </section>
    </div>
  )
}
