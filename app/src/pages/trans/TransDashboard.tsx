import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Usuario, Rol, LogAuditoria, SyncLog } from '@/types/trans'
import StatCard from '@/components/ui/StatCard'
import ModuleHeader from '@/components/layout/ModuleHeader'
import TribalIcon from '@/components/icons/TribalIcon'
import { transQuotes } from '@/data/quotes'

const sections = [
  { to: 'usuarios', labelKey: 'trans.usuarios', icon: 'rancho' as const, desc: 'Cuentas activas por territorio y rol.' },
  { to: 'roles', labelKey: 'trans.roles', icon: 'esfera' as const, desc: 'Permisos con lógica comunitaria.' },
  { to: 'sync', labelKey: 'trans.syncLog', icon: 'trans' as const, desc: 'Bitácora de sincronización tablet ⇄ RPi ⇄ nube.' },
  { to: 'auditoria', labelKey: 'trans.auditoria', icon: 'chacara' as const, desc: 'Eventos de seguridad y acceso a saberes.' },
] as const

export default function TransDashboard() {
  const { t } = useTranslation()
  const { docs: usuarios } = useDB<Usuario>({ mod: 'trans', type: 'usuario' })
  const { docs: roles } = useDB<Rol>({ mod: 'trans', type: 'rol' })
  const { docs: auditoria } = useDB<LogAuditoria>({ mod: 'trans', type: 'log_auditoria' })
  const { docs: syncLogs } = useDB<SyncLog>({ mod: 'trans', type: 'sync_log' })

  const activos = usuarios.filter((u) => u.activo).length

  return (
    <div className="space-y-6">
      <ModuleHeader
        module="trans"
        title={t('trans.title')}
        subtitle="Capa transversal: sincronización, identidades y auditoría"
        cover={`${import.meta.env.BASE_URL}img/cover-rf-trans.png`}
        quotes={transQuotes}
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<TribalIcon name="rancho" size={22} />} label={t('trans.usuarios')} value={activos} accent="trans" />
        <StatCard icon={<TribalIcon name="esfera" size={22} />} label={t('trans.roles')} value={roles.length} accent="trans" />
        <StatCard icon={<TribalIcon name="trans" size={22} />} label={t('trans.syncs')} value={syncLogs.length} accent="trans" />
        <StatCard icon={<TribalIcon name="chacara" size={22} />} label={t('trans.eventos')} value={auditoria.length} accent="trans" />
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rv-card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-tribal)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-bone-100)] text-[color:var(--color-jungle-700)] ring-1 ring-[color:var(--color-border-strong)]">
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
