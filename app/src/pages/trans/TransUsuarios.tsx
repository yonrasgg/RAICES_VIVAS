import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Usuario } from '@/types/trans'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

const rolLabels: Record<string, string> = {
  'rol-001': 'Administrador',
  'rol-002': 'Docente',
  'rol-003': 'Promotor de Salud',
  'rol-004': 'Portador de Saber',
  'rol-005': 'Líder Comunitario',
  'rol-006': 'Visitante',
}

export default function TransUsuarios() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Usuario>({ mod: 'trans', type: 'usuario' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    nombre: '', email: '', rol_id: 'rol-002', pueblo: '', comunidad: '', idioma_preferido: 'es',
  })

  const filtered = docs.filter((u) =>
    `${u.nombre} ${u.email} ${u.pueblo} ${u.comunidad}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({
      _id: `usr-${Date.now()}`,
      type: 'usuario',
      ...form,
      activo: true,
      fecha_registro: new Date().toISOString().slice(0, 10),
    })
    setForm({ nombre: '', email: '', rol_id: 'rol-002', pueblo: '', comunidad: '', idioma_preferido: 'es' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('trans.usuarios')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('trans.addUsuario')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder={t('trans.buscar')} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="👤" message={t('trans.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((u) => (
          <li key={u._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{u.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">{u.email}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {u.pueblo} · {u.comunidad} · {rolLabels[u.rol_id] ?? u.rol_id}
                </p>
              </div>
              <Badge color={u.activo ? 'green' : 'gray'}>{u.activo ? t('trans.activo') : t('trans.inactivo')}</Badge>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('trans.addUsuario')}>
        <div className="space-y-3">
          <Input label={t('trans.nombre')} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <Input label={t('trans.email')} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Select label={t('trans.rol')} value={form.rol_id} onChange={(e) => setForm({ ...form, rol_id: e.target.value })} options={[
            { value: 'rol-001', label: 'Administrador' },
            { value: 'rol-002', label: 'Docente' },
            { value: 'rol-003', label: 'Promotor de Salud' },
            { value: 'rol-004', label: 'Portador de Saber' },
            { value: 'rol-005', label: 'Líder Comunitario' },
            { value: 'rol-006', label: 'Visitante' },
          ]} />
          <Select label={t('trans.pueblo')} value={form.pueblo} onChange={(e) => setForm({ ...form, pueblo: e.target.value })} options={[
            { value: '', label: '—' },
            { value: 'Bribri', label: 'Bribri' },
            { value: 'Cabécar', label: 'Cabécar' },
            { value: 'Ngäbe', label: 'Ngäbe' },
          ]} />
          <Input label={t('trans.comunidad')} value={form.comunidad} onChange={(e) => setForm({ ...form, comunidad: e.target.value })} />
          <Select label={t('trans.idiomaPreferido')} value={form.idioma_preferido} onChange={(e) => setForm({ ...form, idioma_preferido: e.target.value })} options={[
            { value: 'es', label: 'Español' },
            { value: 'bri', label: 'Bribri' },
            { value: 'cab', label: 'Cabécar' },
            { value: 'ngb', label: 'Ngäbe' },
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
