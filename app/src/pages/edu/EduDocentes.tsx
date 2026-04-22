import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Docente } from '@/types/edu'
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
      <PageHeader
        module="edu"
        title={t('edu.docentes')}
        subtitle={t('edu.subdocentes', { defaultValue: 'Portadores del aula' })}
        icon="mascara"
      />

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="👩‍🏫" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((d) => (
          <li key={d._id} className="rv-card p-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'var(--color-ocre-50)', color: 'var(--color-ocre-700)', boxShadow: 'inset 0 0 0 1px var(--color-ocre-200)' }}
                aria-hidden
              >
                <TribalIcon name="mascara" size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{d.nombre}</h3>
                  <Chip tone={d.activo ? 'sal' : 'neutral'}>
                    {d.activo ? t('edu.activo') : t('edu.inactivo')}
                  </Chip>
                </div>
                {d.rol && (
                  <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">{d.rol}</p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {d.territorio && <Chip glyph="rancho" tone="jungle">{d.territorio}</Chip>}
                  {d.lengua_dominante && <Chip glyph="espiral" tone="ocre">{d.lengua_dominante}</Chip>}
                  {d.nivel_academico && <Chip tone="neutral">{d.nivel_academico}</Chip>}
                </div>
                <div className="mt-2">
                  <SyncDot state="synced" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Fab label={t('edu.addDocente')} onClick={() => setShowForm(true)} />

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
