import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { PortadorSaber } from '@/types/sab'
import SearchBar from '@/components/ui/SearchBar'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'

const espColor = { agricultura: 'green', medicina: 'rose', artesanía: 'amber', ritualidad: 'purple' } as const

export default function SabPortadores() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<PortadorSaber>({ mod: 'sab', type: 'portador' })
  const [search, setSearch] = useState('')

  const filtered = docs.filter((p) =>
    `${p.nombre} ${p.comunidad} ${p.especialidad}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">{t('sab.portadores')}</h2>

      <SearchBar value={search} onChange={setSearch} placeholder={t('sab.buscar')} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🧓" message={t('sab.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">{p.comunidad} · {p.lengua_principal}</p>
              </div>
              <Badge color={espColor[p.especialidad]}>{p.especialidad}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
