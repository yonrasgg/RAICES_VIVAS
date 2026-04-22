import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Paciente } from '@/types/sal'
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
import TribalIcon from '@/components/icons/TribalIcon'

const CONTRAST_KEY = 'raices_contrast'

export default function SalPacientes() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Paciente>({ mod: 'sal', type: 'paciente' })
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [highContrast, setHighContrast] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(CONTRAST_KEY) === 'high',
  )
  const [form, setForm] = useState({
    id_interno: '', nombre: '', fecha_nacimiento: '', sexo: 'M' as 'M' | 'F',
    territorio: '', comunidad: '', tipo_sangre: '', contacto: '',
  })

  useEffect(() => {
    const root = document.documentElement
    if (highContrast) root.setAttribute('data-contrast', 'high')
    else root.removeAttribute('data-contrast')
    localStorage.setItem(CONTRAST_KEY, highContrast ? 'high' : 'normal')
  }, [highContrast])

  const filtered = docs.filter((p) =>
    `${p.nombre} ${p.id_interno} ${p.territorio}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSave = async () => {
    await put({ _id: `pac-${Date.now()}`, type: 'paciente', ...form, estado: 'activo' as const, fecha_registro: new Date().toISOString().slice(0, 10) })
    setForm({ id_interno: '', nombre: '', fecha_nacimiento: '', sexo: 'M', territorio: '', comunidad: '', tipo_sangre: '', contacto: '' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <PageHeader
        module="sal"
        title={t('sal.pacientes')}
        subtitle={t('sal.subpacientes', { defaultValue: 'Cuidado integral de la comunidad' })}
        icon="rana"
        action={
          <button
            type="button"
            onClick={() => setHighContrast((v) => !v)}
            aria-pressed={highContrast}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-jungle-50)] px-3 py-1 text-[11px] font-medium text-[color:var(--color-jungle-700)] ring-1 ring-[color:var(--color-jungle-200)] transition hover:bg-[color:var(--color-jungle-100)]"
          >
            <TribalIcon name="eye" size={12} />
            {highContrast ? t('sal.contraste.alto', { defaultValue: 'Alto contraste' }) : t('sal.contraste.normal', { defaultValue: 'Contraste' })}
          </button>
        }
      />

      <SearchBar value={search} onChange={setSearch} placeholder={t('sal.buscar')} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🩺" message={t('sal.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p._id} className="rv-card p-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'var(--color-jungle-50)', color: 'var(--color-jungle-700)', boxShadow: 'inset 0 0 0 1px var(--color-jungle-200)' }}
                aria-hidden
              >
                <TribalIcon name="rana" size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{p.nombre}</h3>
                  <Chip tone={p.estado === 'activo' ? 'sal' : 'neutral'}>{p.estado}</Chip>
                </div>
                <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">{p.id_interno}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {p.territorio && <Chip glyph="rancho" tone="jungle">{p.territorio}</Chip>}
                  {p.comunidad && <Chip tone="neutral">{p.comunidad}</Chip>}
                  {p.tipo_sangre && <Chip tone="cinabrio">{p.tipo_sangre}</Chip>}
                </div>
                <div className="mt-2">
                  <SyncDot state="synced" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Fab label={t('sal.addPaciente')} onClick={() => setShowForm(true)} />

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
