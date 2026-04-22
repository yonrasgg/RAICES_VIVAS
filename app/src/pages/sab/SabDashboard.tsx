import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Saber, PortadorSaber, CategoriaSaber } from '@/types/sab'
import StatCard from '@/components/ui/StatCard'
import ModuleHeader from '@/components/layout/ModuleHeader'
import TribalIcon from '@/components/icons/TribalIcon'

const sections = [
  { to: 'catalogo', labelKey: 'sab.catalogo', icon: 'espiral' as const, desc: 'Saberes documentados con niveles CARE.' },
  { to: 'portadores', labelKey: 'sab.portadores', icon: 'mascara' as const, desc: 'Mayores, awapas y portadores reconocidos por su comunidad.' },
] as const

export default function SabDashboard() {
  const { t } = useTranslation()
  const { docs: saberes } = useDB<Saber>({ mod: 'sab', type: 'saber' })
  const { docs: portadores } = useDB<PortadorSaber>({ mod: 'sab', type: 'portador' })
  const { docs: categorias } = useDB<CategoriaSaber>({ mod: 'sab', type: 'categoria' })

  const ceremoniales = saberes.filter((s) => s.nivel_acceso === 'ceremonial').length

  return (
    <div className="space-y-6">
      <ModuleHeader
        module="sab"
        title={t('sab.title')}
        subtitle="Gobernanza CARE: Beneficio colectivo · Autoridad · Responsabilidad · Ética"
        cover={`${import.meta.env.BASE_URL}img/cover-rf-sab.png`}
        quote="Si yo digo quiten eso, se pueda quitar. Esa es la palabra."
        quoteSource="ENT-003 · portador de saber, Talamanca"
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<TribalIcon name="espiral" size={22} />} label={t('sab.catalogo')} value={saberes.length} accent="sab" />
        <StatCard icon={<TribalIcon name="mascara" size={22} />} label={t('sab.portadores')} value={portadores.length} accent="sab" />
        <StatCard icon={<TribalIcon name="chacara" size={22} />} label={t('sab.categorias')} value={categorias.length} accent="sab" />
        <StatCard icon={<TribalIcon name="lock" size={22} />} label={t('sab.ceremonial')} value={ceremoniales} accent="sab" />
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rv-card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-tribal)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-terracotta-50)] text-[color:var(--color-terracotta-500)] ring-1 ring-[color:var(--color-terracotta-200)]">
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

      <aside className="rv-card border-l-4 border-l-[color:var(--color-cinabrio-500)] p-4">
        <p className="flex items-center gap-2 font-display text-sm font-semibold text-[color:var(--color-cinabrio-500)]">
          <TribalIcon name="lock" size={16} /> Saberes ceremoniales
        </p>
        <p className="mt-1 text-xs text-[color:var(--color-charcoal-700)]">
          Los saberes marcados como <strong>ceremoniales</strong> nunca se sincronizan con la nube.
          Viven únicamente en el dispositivo autorizado por el Consejo de Mayores.
        </p>
      </aside>
    </div>
  )
}
