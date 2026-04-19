import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Brigada } from '@/types/sal'
import SearchBar from '@/components/ui/SearchBar'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'

const estadoColor = { planificada: 'blue', en_curso: 'amber', completada: 'green' } as const
const tipoIcon: Record<string, string> = { vacunacion: '💉', tamizaje: '🔬', charla: '🗣️', atencion_general: '🏥' }

export default function SalBrigadas() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<Brigada>({ mod: 'sal', type: 'brigada' })
  const [search, setSearch] = useState('')

  const filtered = docs.filter((b) =>
    `${b.nombre} ${b.territorio} ${b.responsable}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">{t('sal.brigadas')}</h2>

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🚑" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((b) => (
          <li key={b._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">
                  {tipoIcon[b.tipo] ?? '🚑'} {b.nombre}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {b.fecha_gira} · {b.territorio}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {b.responsable} · {b.pacientes_atendidos} {t('sal.pacientes').toLowerCase()}
                </p>
              </div>
              <Badge color={estadoColor[b.estado]}>{b.estado.replace('_', ' ')}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
