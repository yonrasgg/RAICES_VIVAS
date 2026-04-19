import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Estudiante } from '@/types/edu'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

export default function EduEstudiantes() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Estudiante>({ mod: 'edu', type: 'estudiante' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', nivel_educativo: '', lengua_principal: '', centro_educativo: '', territorio: '' })

  const filtered = docs.filter((e) =>
    `${e.nombre} ${e.territorio} ${e.lengua_principal}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({ _id: `est-${Date.now()}`, type: 'estudiante', ...form })
    setForm({ nombre: '', nivel_educativo: '', lengua_principal: '', centro_educativo: '', territorio: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('edu.estudiantes')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('edu.addEstudiante')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🎒" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((e) => (
          <li key={e._id} className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800">{e.nombre}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {e.nivel_educativo} · {e.lengua_principal}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">{e.centro_educativo} — {e.territorio}</p>
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('edu.addEstudiante')}>
        <div className="space-y-3">
          <Input label={t('edu.nombre')} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <Input label={t('edu.nivel')} value={form.nivel_educativo} onChange={(e) => setForm({ ...form, nivel_educativo: e.target.value })} />
          <Select label={t('edu.lengua')} value={form.lengua_principal} onChange={(e) => setForm({ ...form, lengua_principal: e.target.value })} options={[
            { value: '', label: '—' },
            { value: 'Bribri', label: 'Bribri' },
            { value: 'Cabécar', label: 'Cabécar' },
            { value: 'Ngäbe', label: 'Ngäbe' },
            { value: 'Español', label: 'Español' },
          ]} />
          <Input label={t('edu.centro')} value={form.centro_educativo} onChange={(e) => setForm({ ...form, centro_educativo: e.target.value })} />
          <Input label={t('edu.territorio')} value={form.territorio} onChange={(e) => setForm({ ...form, territorio: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
