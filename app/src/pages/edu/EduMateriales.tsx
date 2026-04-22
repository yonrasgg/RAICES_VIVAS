import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { MaterialEducativo } from '@/types/edu'
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

const formatoMeta: Record<string, { glyph: TribalIconName; tone: ChipTone; label: string }> = {
  texto: { glyph: 'tejido', tone: 'sal', label: 'Texto' },
  audio: { glyph: 'ola', tone: 'jungle', label: 'Audio' },
  video: { glyph: 'eye', tone: 'terracotta', label: 'Video' },
  imagen: { glyph: 'esfera', tone: 'ocre', label: 'Imagen' },
}

export default function EduMateriales() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<MaterialEducativo>({ mod: 'edu', type: 'material_educativo' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<{ titulo: string; idioma: string; nivel: string; tema: string; formato: MaterialEducativo['formato']; asignatura: string; competencia: string }>({ titulo: '', idioma: 'es', nivel: '', tema: '', formato: 'texto', asignatura: '', competencia: '' })

  const filtered = docs.filter((m) =>
    `${m.titulo} ${m.tema} ${m.idioma}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({
      _id: `mat-${Date.now()}`,
      type: 'material_educativo',
      ...form,
      creado_por: 'usuario',
      fecha_creacion: new Date().toISOString().slice(0, 10),
    })
    setForm({ titulo: '', idioma: 'es', nivel: '', tema: '', formato: 'texto', asignatura: '', competencia: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader
        module="edu"
        title={t('edu.materiales')}
        subtitle={t('edu.submateriales', { defaultValue: 'Biblioteca bilingüe offline' })}
        icon="tejido"
      />

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📖" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((m) => {
          const fm = formatoMeta[m.formato] ?? formatoMeta.texto
          return (
            <li key={m._id} className="rv-card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-ocre-50)', color: 'var(--color-ocre-700)', boxShadow: 'inset 0 0 0 1px var(--color-ocre-200)' }}
                  aria-hidden
                >
                  <TribalIcon name={fm.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{m.titulo}</h3>
                    <Chip glyph={fm.glyph} tone={fm.tone}>{fm.label}</Chip>
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">{m.tema} · {m.nivel}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {m.idioma && <Chip glyph="espiral" tone="jungle">{m.idioma}</Chip>}
                    {m.asignatura && <Chip tone="neutral">{m.asignatura}</Chip>}
                    {m.competencia && <Chip tone="ocre">{m.competencia}</Chip>}
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

      <Fab label={t('edu.addMaterial')} onClick={() => setShowForm(true)} />

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('edu.addMaterial')}>
        <div className="space-y-3">
          <Input label={t('edu.nombre')} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <Input label={t('edu.tema')} value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })} />
          <Input label={t('edu.nivel')} value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value })} />
          <Select label={t('edu.formato')} value={form.formato} onChange={(e) => setForm({ ...form, formato: e.target.value as MaterialEducativo['formato'] })} options={[
            { value: 'texto', label: 'Texto' },
            { value: 'audio', label: 'Audio' },
            { value: 'video', label: 'Video' },
            { value: 'imagen', label: 'Imagen' },
          ]} />
          <Select label={t('edu.idioma')} value={form.idioma} onChange={(e) => setForm({ ...form, idioma: e.target.value })} options={[
            { value: 'es', label: 'Español' },
            { value: 'bri', label: 'Bribri' },
            { value: 'cab', label: 'Cabécar' },
            { value: 'ngb', label: 'Ngäbe' },
          ]} />
          <Input label={t('edu.asignatura')} value={form.asignatura} onChange={(e) => setForm({ ...form, asignatura: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
