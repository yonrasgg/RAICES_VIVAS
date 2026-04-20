import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { LogAuditoria } from '@/types/trans'
import SearchBar from '@/components/ui/SearchBar'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'

const resultColor = { exitoso: 'green', denegado: 'rose' } as const

export default function TransAuditoria() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<LogAuditoria>({ mod: 'trans', type: 'log_auditoria' })
  const [search, setSearch] = useState('')
  const [filterResult, setFilterResult] = useState('')

  const sorted = [...docs]
    .filter((a) => !filterResult || a.resultado === filterResult)
    .filter((a) =>
      `${a.usuario_nombre} ${a.accion} ${a.entidad_tipo} ${a.detalle}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => b.fecha.localeCompare(a.fecha))

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">{t('trans.auditoria')}</h2>

      <SearchBar value={search} onChange={setSearch} placeholder={t('trans.buscarEventos')} />

      <div className="flex gap-2">
        {(['', 'exitoso', 'denegado'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setFilterResult(v)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              filterResult === v ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {v ? t(`trans.${v}`) : t('common.total')}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && sorted.length === 0 && <EmptyState icon="📋" message={t('trans.sinResultados')} />}

      <ul className="space-y-3">
        {sorted.map((a) => (
          <li key={a._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{a.usuario_nombre}</h3>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{a.accion}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{a.detalle}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {a.entidad_tipo} · {new Date(a.fecha).toLocaleString('es-CR')}
                </p>
              </div>
              <Badge color={resultColor[a.resultado]}>{t(`trans.${a.resultado}`)}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
