import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import type { Usuario, Rol, LogAuditoria, SyncLog } from '@/types/trans'
import StatCard from '@/components/ui/StatCard'

const sections = [
  { to: 'usuarios', labelKey: 'trans.usuarios', icon: '👤' },
  { to: 'roles', labelKey: 'trans.roles', icon: '🛡️' },
  { to: 'sync', labelKey: 'trans.syncLog', icon: '🔄' },
  { to: 'auditoria', labelKey: 'trans.auditoria', icon: '📋' },
] as const

export default function TransDashboard() {
  const { t } = useTranslation()
  const { docs: usuarios } = useDB<Usuario>({ mod: 'trans', type: 'usuario' })
  const { docs: roles } = useDB<Rol>({ mod: 'trans', type: 'rol' })
  const { docs: auditoria } = useDB<LogAuditoria>({ mod: 'trans', type: 'log_auditoria' })
  const { docs: syncLogs } = useDB<SyncLog>({ mod: 'trans', type: 'sync_log' })

  const activos = usuarios.filter((u) => u.activo).length

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-xl font-bold text-green-800">{t('trans.title')}</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="👤" label={t('trans.usuarios')} value={activos} color="bg-indigo-50" />
        <StatCard icon="🛡️" label={t('trans.roles')} value={roles.length} color="bg-amber-50" />
        <StatCard icon="🔄" label={t('trans.syncs')} value={syncLogs.length} color="bg-blue-50" />
        <StatCard icon="📋" label={t('trans.eventos')} value={auditoria.length} color="bg-rose-50" />
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
