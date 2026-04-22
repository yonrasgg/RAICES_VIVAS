import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Cita } from '@/types/sal'
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
  consulta: { glyph: 'rana', tone: 'sal', label: 'Consulta' },
  control: { glyph: 'tejido', tone: 'jungle', label: 'Control' },
  seguimiento: { glyph: 'espiral', tone: 'ocre', label: 'Seguimiento' },
  emergencia: { glyph: 'jaguar', tone: 'cinabrio', label: 'Emergencia' },
}

const estadoTone: Record<Cita['estado'], ChipTone> = {
  pendiente: 'ocre',
  realizada: 'sal',
  cancelada: 'cinabrio',
}

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
      <PageHeader
        module="sal"
        title={t('sal.citas')}
        subtitle={t('sal.subcitas', { defaultValue: 'Agenda de atención territorial' })}
        icon="ola"
      />

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📅" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((c) => {
          const tm = tipoMeta[c.tipo_atencion] ?? tipoMeta.consulta
          return (
            <li key={c._id} className="rv-card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-jungle-50)', color: 'var(--color-jungle-700)', boxShadow: 'inset 0 0 0 1px var(--color-jungle-200)' }}
                  aria-hidden
                >
                  <TribalIcon name={tm.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{c.paciente_nombre}</h3>
                    <Chip glyph={tm.glyph} tone={tm.tone}>{tm.label}</Chip>
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">
                    {c.fecha} · {c.hora_inicio}–{c.hora_fin}
                  </p>
                  <p className="mt-0.5 text-xs text-[color:var(--color-charcoal-500)]">{c.responsable} · {c.lugar}</p>
                  {c.notas && (
                    <p className="mt-2 text-sm text-[color:var(--color-charcoal-600)] line-clamp-2">{c.notas}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Chip tone={estadoTone[c.estado]}>{t(`sal.${c.estado}`)}</Chip>
                    <SyncDot state="synced" />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <Fab label={t('sal.addCita')} onClick={() => setShowForm(true)} />

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
