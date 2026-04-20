import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Rol } from '@/types/trans'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'

const moduloColor = { EDU: 'green', SAB: 'amber', SAL: 'rose', TRANS: 'blue' } as const

export default function TransRoles() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<Rol>({ mod: 'trans', type: 'rol' })

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">{t('trans.roles')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && docs.length === 0 && <EmptyState icon="🛡️" message={t('trans.sinResultados')} />}

      <ul className="space-y-3">
        {docs.map((r) => (
          <li key={r._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">{r.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">{r.descripcion}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {r.permisos.map((p) => (
                    <span key={p} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{p}</span>
                  ))}
                </div>
              </div>
              <Badge color={moduloColor[r.modulo]}>{r.modulo}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
