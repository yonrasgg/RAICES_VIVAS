import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Paciente, Cita, Brigada } from '@/types/sal'
import StatCard from '@/components/ui/StatCard'
import ModuleHeader from '@/components/layout/ModuleHeader'
import TribalIcon from '@/components/icons/TribalIcon'

const sections = [
  { to: 'pacientes', labelKey: 'sal.pacientes', icon: 'hoja' as const, desc: 'Historial comunitario por territorio.' },
  { to: 'citas', labelKey: 'sal.citas', icon: 'ola' as const, desc: 'Agenda respetando tiempos y ceremonias.' },
  { to: 'brigadas', labelKey: 'sal.brigadas', icon: 'rana' as const, desc: 'Equipos ATAP con ruta y conectividad.' },
] as const

export default function SalDashboard() {
  const { t } = useTranslation()
  const { docs: pacientes } = useDB<Paciente>({ mod: 'sal', type: 'paciente' })
  const { docs: citas } = useDB<Cita>({ mod: 'sal', type: 'cita' })
  const { docs: brigadas } = useDB<Brigada>({ mod: 'sal', type: 'brigada' })

  const citasPendientes = citas.filter((c) => c.estado === 'pendiente').length

  return (
    <div className="space-y-6">
      <ModuleHeader
        module="sal"
        title={t('sal.title')}
        subtitle="Atención comunitaria con historial offline-first"
        cover={`${import.meta.env.BASE_URL}img/cover-rf-sal.png`}
        quote="Se nos perdieron datos de dos brigadas enteras cuando cruzamos el río."
        quoteSource="ENT-003 · ATAP, Chirripó"
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<TribalIcon name="hoja" size={22} />} label={t('sal.pacientes')} value={pacientes.length} accent="sal" />
        <StatCard icon={<TribalIcon name="ola" size={22} />} label={t('sal.pendiente')} value={citasPendientes} accent="sal" />
        <StatCard icon={<TribalIcon name="rana" size={22} />} label={t('sal.brigadas')} value={brigadas.length} accent="sal" />
        <StatCard icon={<TribalIcon name="sal" size={22} />} label={t('sal.citas')} value={citas.length} accent="sal" />
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rv-card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-tribal)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ocre-50)] text-[color:var(--color-ocre-600)] ring-1 ring-[color:var(--color-ocre-200)]">
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
