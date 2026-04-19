import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { MaterialEducativo } from '@/types/edu'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

const formatoColor = { texto: 'green', audio: 'blue', video: 'purple', imagen: 'amber' } as const

export default function EduMateriales() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<MaterialEducativo>({ mod: 'edu', type: 'material_educativo' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', idioma: 'es', nivel: '', tema: '', formato: 'texto' as const, asignatura: '', competencia: '' })

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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('edu.materiales')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('edu.addMaterial')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📖" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((m) => (
          <li key={m._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">{m.titulo}</h3>
              <Badge color={formatoColor[m.formato]}>{m.formato}</Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {m.tema} · {m.nivel} · {m.idioma}
            </p>
            {m.asignatura && <p className="mt-0.5 text-xs text-gray-400">{m.asignatura}</p>}
          </li>
        ))}
      </ul>

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
