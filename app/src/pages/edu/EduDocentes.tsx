import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Docente } from '@/types/edu'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

export default function EduDocentes() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Docente>({ mod: 'edu', type: 'docente' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', territorio: '', rol: '', contacto: '', lengua_dominante: '', nivel_academico: '' })

  const filtered = docs.filter((d) =>
    `${d.nombre} ${d.territorio} ${d.lengua_dominante}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({
      _id: `doc-${Date.now()}`,
      type: 'docente',
      ...form,
      activo: true,
    })
    setForm({ nombre: '', territorio: '', rol: '', contacto: '', lengua_dominante: '', nivel_academico: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('edu.docentes')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('edu.addDocente')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="👩‍🏫" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((d) => (
          <li key={d._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{d.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {d.territorio} · {d.lengua_dominante}
                </p>
                {d.rol && <p className="mt-0.5 text-xs text-gray-400">{d.rol}</p>}
              </div>
              <Badge color={d.activo ? 'green' : 'gray'}>{d.activo ? t('edu.activo') : t('edu.inactivo')}</Badge>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('edu.addDocente')}>
        <div className="space-y-3">
          <Input label={t('edu.nombre')} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <Input label={t('edu.territorio')} value={form.territorio} onChange={(e) => setForm({ ...form, territorio: e.target.value })} />
          <Input label={t('edu.rol')} value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })} />
          <Input label={t('edu.contacto')} value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} />
          <Select label={t('edu.lengua')} value={form.lengua_dominante} onChange={(e) => setForm({ ...form, lengua_dominante: e.target.value })} options={[
            { value: '', label: '—' },
            { value: 'Bribri', label: 'Bribri' },
            { value: 'Cabécar', label: 'Cabécar' },
            { value: 'Ngäbe', label: 'Ngäbe' },
            { value: 'Español', label: 'Español' },
          ]} />
          <Input label={t('edu.nivelAcademico')} value={form.nivel_academico} onChange={(e) => setForm({ ...form, nivel_academico: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
