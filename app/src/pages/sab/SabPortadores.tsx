import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { PortadorSaber } from '@/types/sab'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Chip from '@/components/ui/Chip'
import SyncDot from '@/components/ui/SyncDot'
import EmptyState from '@/components/ui/EmptyState'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'
import type { ChipTone } from '@/components/ui/Chip'

const espMeta: Record<PortadorSaber['especialidad'], { glyph: TribalIconName; tone: ChipTone; label: string }> = {
  agricultura: { glyph: 'hoja', tone: 'sal', label: 'Agricultura' },
  medicina: { glyph: 'rana', tone: 'jungle', label: 'Medicina' },
  artesanía: { glyph: 'tejido', tone: 'ocre', label: 'Artesanía' },
  ritualidad: { glyph: 'mascara', tone: 'cinabrio', label: 'Ritualidad' },
}

export default function SabPortadores() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<PortadorSaber>({ mod: 'sab', type: 'portador' })
  const [search, setSearch] = useState('')

  const filtered = docs.filter((p) =>
    `${p.nombre} ${p.comunidad} ${p.especialidad}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader
        module="sab"
        title={t('sab.portadores')}
        subtitle={t('sab.subportadores', { defaultValue: 'Mayores y portadores del saber' })}
        icon="mascara"
      />

      <SearchBar value={search} onChange={setSearch} placeholder={t('sab.buscar')} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🧓" message={t('sab.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((p) => {
          const em = espMeta[p.especialidad] ?? espMeta.agricultura
          return (
            <li key={p._id} className="rv-card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-terracotta-50)', color: 'var(--color-terracotta-700)', boxShadow: 'inset 0 0 0 1px var(--color-terracotta-200)' }}
                  aria-hidden
                >
                  <TribalIcon name={em.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{p.nombre}</h3>
                    <Chip glyph={em.glyph} tone={em.tone}>{em.label}</Chip>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {p.comunidad && <Chip glyph="rancho" tone="sab">{p.comunidad}</Chip>}
                    {p.lengua_principal && <Chip glyph="espiral" tone="jungle">{p.lengua_principal}</Chip>}
                  </div>
                  <div className="mt-2">
                    <SyncDot state="ceremonial" label={t('sab.protegido', { defaultValue: 'Protocolo comunitario' })} />
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
