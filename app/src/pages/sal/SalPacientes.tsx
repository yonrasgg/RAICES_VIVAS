import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Paciente } from '@/types/sal'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

export default function SalPacientes() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Paciente>({ mod: 'sal', type: 'paciente' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    id_interno: '', nombre: '', fecha_nacimiento: '', sexo: 'M' as 'M' | 'F',
    territorio: '', comunidad: '', tipo_sangre: '', contacto: '',
  })

  const filtered = docs.filter((p) =>
    `${p.nombre} ${p.id_interno} ${p.territorio}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({ _id: `pac-${Date.now()}`, type: 'paciente', ...form, estado: 'activo' as const })
    setForm({ id_interno: '', nombre: '', fecha_nacimiento: '', sexo: 'M', territorio: '', comunidad: '', tipo_sangre: '', contacto: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('sal.pacientes')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('sal.addPaciente')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🩺" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">{p.id_interno} · {p.territorio}</p>
                <p className="mt-0.5 text-xs text-gray-400">{p.comunidad}</p>
              </div>
              <Badge color={p.estado === 'activo' ? 'green' : 'gray'}>{p.estado}</Badge>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('sal.addPaciente')}>
        <div className="space-y-3">
          <Input label={t('sal.nombre')} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <Input label={t('sal.idInterno')} value={form.id_interno} onChange={(e) => setForm({ ...form, id_interno: e.target.value })} />
          <Input label={t('sal.fechaNacimiento')} type="date" value={form.fecha_nacimiento} onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })} />
          <Select label={t('sal.sexo')} value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value as 'M' | 'F' })} options={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Femenino' },
          ]} />
          <Input label={t('sal.territorio')} value={form.territorio} onChange={(e) => setForm({ ...form, territorio: e.target.value })} />
          <Input label={t('sal.comunidad')} value={form.comunidad} onChange={(e) => setForm({ ...form, comunidad: e.target.value })} />
          <Input label={t('sal.tipoSangre')} value={form.tipo_sangre} onChange={(e) => setForm({ ...form, tipo_sangre: e.target.value })} />
          <Input label={t('sal.contacto')} value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
