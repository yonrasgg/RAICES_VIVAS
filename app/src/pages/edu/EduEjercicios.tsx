import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Ejercicio } from '@/types/edu'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Chip from '@/components/ui/Chip'
import SyncDot from '@/components/ui/SyncDot'
import Fab from '@/components/ui/Fab'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'
import type { ChipTone } from '@/components/ui/Chip'

const tipoMeta: Record<string, { glyph: TribalIconName; tone: ChipTone; label: string }> = {
  opcion_multiple: { glyph: 'tejido', tone: 'jungle', label: 'Opción múltiple' },
  completar: { glyph: 'espiral', tone: 'ocre', label: 'Completar' },
  pareo: { glyph: 'esfera', tone: 'terracotta', label: 'Pareo' },
  produccion_oral: { glyph: 'ola', tone: 'cinabrio', label: 'Producción oral' },
}

export default function EduEjercicios() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Ejercicio>({ mod: 'edu', type: 'ejercicio' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ tema: '', nivel: '', tipo_item: 'opcion_multiple' as Ejercicio['tipo_item'], material_id: '' })

  const filtered = docs.filter((e) =>
    `${e.tema} ${e.nivel}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({ _id: `ej-${Date.now()}`, type: 'ejercicio', ...form })
    setForm({ tema: '', nivel: '', tipo_item: 'opcion_multiple', material_id: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader
        module="edu"
        title={t('edu.ejercicios')}
        subtitle={t('edu.subejercicios', { defaultValue: 'Práctica viva de la lengua' })}
        icon="espiral"
      />

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="✏️" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((e) => {
          const tm = tipoMeta[e.tipo_item] ?? tipoMeta.opcion_multiple
          return (
            <li key={e._id} className="rv-card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-ocre-50)', color: 'var(--color-ocre-700)', boxShadow: 'inset 0 0 0 1px var(--color-ocre-200)' }}
                  aria-hidden
                >
                  <TribalIcon name={tm.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{e.tema}</h3>
                    <Chip glyph={tm.glyph} tone={tm.tone}>{tm.label}</Chip>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {e.nivel && <Chip tone="ocre">{e.nivel}</Chip>}
                    {e.material_id && <Chip glyph="tejido" tone="neutral">Material</Chip>}
                  </div>
                  <div className="mt-2">
                    <SyncDot state="synced" />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <Fab label={t('edu.addEjercicio')} onClick={() => setShowForm(true)} />

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('edu.addEjercicio')}>
        <div className="space-y-3">
          <Input label={t('edu.tema')} value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })} />
          <Input label={t('edu.nivel')} value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value })} />
          <Select label={t('edu.tipo')} value={form.tipo_item} onChange={(e) => setForm({ ...form, tipo_item: e.target.value as Ejercicio['tipo_item'] })} options={[
            { value: 'opcion_multiple', label: 'Opción múltiple' },
            { value: 'completar', label: 'Completar' },
            { value: 'pareo', label: 'Pareo' },
            { value: 'produccion_oral', label: 'Producción oral' },
          ]} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
