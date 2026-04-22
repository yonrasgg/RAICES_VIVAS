import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Estudiante } from '@/types/edu'
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
      <PageHeader
        module="edu"
        title={t('edu.estudiantes')}
        subtitle={t('edu.subestudiantes', { defaultValue: 'Nuevas raíces' })}
        icon="hoja"
      />

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="🎒" message={t('edu.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((e) => (
          <li key={e._id} className="rv-card p-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'var(--color-ocre-50)', color: 'var(--color-ocre-700)', boxShadow: 'inset 0 0 0 1px var(--color-ocre-200)' }}
                aria-hidden
              >
                <TribalIcon name="hoja" size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[color:var(--color-jungle-700)]">{e.nombre}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-charcoal-500)]">{e.centro_educativo}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {e.nivel_educativo && <Chip tone="ocre">{e.nivel_educativo}</Chip>}
                  {e.lengua_principal && <Chip glyph="espiral" tone="jungle">{e.lengua_principal}</Chip>}
                  {e.territorio && <Chip glyph="rancho" tone="sal">{e.territorio}</Chip>}
                </div>
                <div className="mt-2">
                  <SyncDot state="synced" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Fab label={t('edu.addEstudiante')} onClick={() => setShowForm(true)} />

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
