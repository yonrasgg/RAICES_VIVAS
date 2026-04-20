import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { SyncLog } from '@/types/trans'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'

const estadoColor = { completado: 'green', parcial: 'amber', fallido: 'rose' } as const

export default function TransSync() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<SyncLog>({ mod: 'trans', type: 'sync_log' })

  const sorted = [...docs].sort((a, b) => b.fecha_sync.localeCompare(a.fecha_sync))

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">{t('trans.syncLog')}</h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-green-50 p-3 text-center">
          <p className="text-2xl font-bold text-green-800">{docs.filter((d) => d.estado === 'completado').length}</p>
          <p className="text-xs text-gray-500">{t('trans.completado')}</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">{docs.filter((d) => d.estado === 'parcial').length}</p>
          <p className="text-xs text-gray-500">{t('trans.parcial')}</p>
        </div>
        <div className="rounded-xl bg-rose-50 p-3 text-center">
          <p className="text-2xl font-bold text-rose-800">{docs.filter((d) => d.estado === 'fallido').length}</p>
          <p className="text-xs text-gray-500">{t('trans.fallido')}</p>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && sorted.length === 0 && <EmptyState icon="🔄" message={t('trans.sinResultados')} />}

      <ul className="space-y-3">
        {sorted.map((s) => (
          <li key={s._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">{s.device_id}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(s.fecha_sync).toLocaleString('es-CR')}
                </p>
                <div className="mt-1 flex gap-3 text-xs text-gray-400">
                  <span>⬆ {s.registros_enviados}</span>
                  <span>⬇ {s.registros_recibidos}</span>
                  {s.conflictos_detectados > 0 && (
                    <span className="text-amber-600">
                      ⚠ {s.conflictos_detectados} conflicto(s)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge color={estadoColor[s.estado]}>{t(`trans.${s.estado}`)}</Badge>
                <span className="text-xs text-gray-400">{s.modulo}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
