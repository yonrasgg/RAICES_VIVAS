import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Cita } from '@/types/sal'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

const estadoColor = { pendiente: 'amber', realizada: 'green', cancelada: 'rose' } as const
const tipoLabel: Record<string, string> = { consulta: '🩺', control: '📋', seguimiento: '🔄', emergencia: '🚨' }

export default function SalCitas() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Cita>({ mod: 'sal', type: 'cita' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    paciente_nombre: '', responsable: '', fecha: '', hora_inicio: '', hora_fin: '',
    tipo_atencion: 'consulta' as Cita['tipo_atencion'], lugar: '', notas: '',
  })

  const filtered = docs.filter((c) =>
    `${c.paciente_nombre} ${c.responsable} ${c.lugar}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({
      _id: `cit-${Date.now()}`, type: 'cita',
      ...form, paciente_id: '', estado: 'pendiente' as const,
    })
    setForm({ paciente_nombre: '', responsable: '', fecha: '', hora_inicio: '', hora_fin: '', tipo_atencion: 'consulta', lugar: '', notas: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('sal.citas')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('sal.addCita')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📅" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((c) => (
          <li key={c._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">
                  {tipoLabel[c.tipo_atencion]} {c.paciente_nombre}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {c.fecha} · {c.hora_inicio}–{c.hora_fin}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{c.responsable} · {c.lugar}</p>
              </div>
              <Badge color={estadoColor[c.estado]}>{t(`sal.${c.estado}`)}</Badge>
            </div>
            {c.notas && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{c.notas}</p>}
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('sal.addCita')}>
        <div className="space-y-3">
          <Input label={t('sal.nombre')} value={form.paciente_nombre} onChange={(e) => setForm({ ...form, paciente_nombre: e.target.value })} />
          <Input label={t('sal.responsable')} value={form.responsable} onChange={(e) => setForm({ ...form, responsable: e.target.value })} />
          <Input label={t('sal.fecha')} type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label={t('sal.hora')} type="time" value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })} />
            <Input label="—" type="time" value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })} />
          </div>
          <Select label={t('sal.tipoAtencion')} value={form.tipo_atencion} onChange={(e) => setForm({ ...form, tipo_atencion: e.target.value as Cita['tipo_atencion'] })} options={[
            { value: 'consulta', label: t('sal.consulta') },
            { value: 'control', label: t('sal.control') },
            { value: 'seguimiento', label: t('sal.seguimiento') },
            { value: 'emergencia', label: t('sal.emergencia') },
          ]} />
          <Input label={t('sal.lugar')} value={form.lugar} onChange={(e) => setForm({ ...form, lugar: e.target.value })} />
          <Input label={t('common.notas')} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
