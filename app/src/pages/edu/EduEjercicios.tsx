import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Ejercicio } from '@/types/edu'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

const tipoColor = {
  opcion_multiple: 'blue',
  completar: 'green',
  pareo: 'amber',
  produccion_oral: 'purple',
} as const

const tipoLabel: Record<string, string> = {
  opcion_multiple: 'Opción múltiple',
  completar: 'Completar',
  pareo: 'Pareo',
  produccion_oral: 'Producción oral',
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('edu.ejercicios')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('edu.addEjercicio')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="✏️" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((e) => (
          <li key={e._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{e.tema}</h3>
                <p className="mt-1 text-sm text-gray-500">{e.nivel}</p>
              </div>
              <Badge color={tipoColor[e.tipo_item]}>{tipoLabel[e.tipo_item] ?? e.tipo_item}</Badge>
            </div>
          </li>
        ))}
      </ul>

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
