import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Brigada } from '@/types/sal'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Chip from '@/components/ui/Chip'
import SyncDot from '@/components/ui/SyncDot'
import EmptyState from '@/components/ui/EmptyState'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'
import type { ChipTone } from '@/components/ui/Chip'

const tipoMeta: Record<string, { glyph: TribalIconName; tone: ChipTone; label: string }> = {
  vacunacion: { glyph: 'hoja', tone: 'sal', label: 'Vacunación' },
  tamizaje: { glyph: 'ola', tone: 'jungle', label: 'Tamizaje' },
  charla: { glyph: 'espiral', tone: 'ocre', label: 'Charla' },
  atencion_general: { glyph: 'rana', tone: 'terracotta', label: 'Atención general' },
}

const estadoTone: Record<Brigada['estado'], ChipTone> = {
  planificada: 'ocre',
  en_curso: 'jungle',
  completada: 'sal',
}

export default function SalBrigadas() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<Brigada>({ mod: 'sal', type: 'brigada' })
  const [search, setSearch] = useState('')

  const filtered = docs.filter((b) =>
    `${b.nombre} ${b.territorio} ${b.responsable}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader
        module="sal"
        title={t('sal.brigadas')}
        subtitle={t('sal.subbrigadas', { defaultValue: 'Salud que camina con el pueblo' })}
        icon="jaguar"
      />

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🚑" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((b) => {
          const tm = tipoMeta[b.tipo] ?? tipoMeta.atencion_general
          return (
            <li key={b._id} className="rv-card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-jungle-50)', color: 'var(--color-jungle-700)', boxShadow: 'inset 0 0 0 1px var(--color-jungle-200)' }}
                  aria-hidden
                >
                  <TribalIcon name={tm.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{b.nombre}</h3>
                    <Chip glyph={tm.glyph} tone={tm.tone}>{tm.label}</Chip>
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">
                    {b.fecha_gira}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {b.territorio && <Chip glyph="rancho" tone="jungle">{b.territorio}</Chip>}
                    {b.responsable && <Chip tone="neutral">{b.responsable}</Chip>}
                    <Chip tone="ocre">
                      {b.pacientes_atendidos} {t('sal.pacientes').toLowerCase()}
                    </Chip>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip tone={estadoTone[b.estado]}>{b.estado.replace('_', ' ')}</Chip>
                    <SyncDot state="synced" />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
