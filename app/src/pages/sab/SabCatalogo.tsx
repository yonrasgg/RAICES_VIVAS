import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Saber } from '@/types/sab'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

const accesoColor = { publico: 'green', comunitario: 'blue', restringido: 'amber', ceremonial: 'purple' } as const
const estadoColor = { borrador: 'gray', publicado: 'green', restringido: 'amber', revocado: 'rose' } as const

export default function SabCatalogo() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Saber>({ mod: 'sab', type: 'saber' })
  const [search, setSearch] = useState('')
  const [filterAcceso, setFilterAcceso] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    titulo: '', descripcion: '', categoria: '', portador_nombre: '', comunidad: '', territorio: '',
    formato: 'texto' as const, idioma: 'bri', contexto_uso: '',
    nivel_acceso: 'publico' as Saber['nivel_acceso'], etiquetas: [] as string[], estado: 'borrador' as Saber['estado'],
  })

  const filtered = docs
    .filter((s) => !filterAcceso || s.nivel_acceso === filterAcceso)
    .filter((s) => `${s.titulo} ${s.comunidad} ${s.territorio}`.toLowerCase().includes(search.toLowerCase()))

  const handleSave = async () => {
    await put({
      _id: `sab-${Date.now()}`,
      type: 'saber',
      ...form,
      portador_id: '',
      fecha_registro: new Date().toISOString().slice(0, 10),
    })
    setForm({ titulo: '', descripcion: '', categoria: '', portador_nombre: '', comunidad: '', territorio: '', formato: 'texto', idioma: 'bri', contexto_uso: '', nivel_acceso: 'publico', etiquetas: [], estado: 'borrador' })
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">{t('sab.catalogo')}</h2>
        <Button icon="＋" onClick={() => setShowForm(true)}>{t('sab.addSaber')}</Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder={t('sab.buscar')} />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['', 'publico', 'comunitario', 'restringido', 'ceremonial'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setFilterAcceso(v)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              filterAcceso === v ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {v ? t(`sab.${v}`) : t('common.total')}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📜" message={t('sab.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((s) => (
          <li key={s._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">{s.titulo}</h3>
                <p className="mt-1 text-sm text-gray-500">{s.comunidad} · {s.territorio}</p>
                {s.portador_nombre && <p className="mt-0.5 text-xs text-gray-400">🧓 {s.portador_nombre}</p>}
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge color={accesoColor[s.nivel_acceso]}>{t(`sab.${s.nivel_acceso}`)}</Badge>
                <Badge color={estadoColor[s.estado]}>{t(`sab.${s.estado}`)}</Badge>
              </div>
            </div>
            {s.descripcion && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{s.descripcion}</p>}
          </li>
        ))}
      </ul>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('sab.addSaber')}>
        <div className="space-y-3">
          <Input label={t('sab.titulo')} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <Input label={t('sab.descripcion')} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <Input label={t('sab.categoria')} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
          <Input label={t('sab.portador')} value={form.portador_nombre} onChange={(e) => setForm({ ...form, portador_nombre: e.target.value })} />
          <Input label={t('sab.comunidad')} value={form.comunidad} onChange={(e) => setForm({ ...form, comunidad: e.target.value })} />
          <Input label={t('sab.territorio')} value={form.territorio} onChange={(e) => setForm({ ...form, territorio: e.target.value })} />
          <Select label={t('sab.nivelAcceso')} value={form.nivel_acceso} onChange={(e) => setForm({ ...form, nivel_acceso: e.target.value as Saber['nivel_acceso'] })} options={[
            { value: 'publico', label: t('sab.publico') },
            { value: 'comunitario', label: t('sab.comunitario') },
            { value: 'restringido', label: t('sab.restringido') },
            { value: 'ceremonial', label: t('sab.ceremonial') },
          ]} />
          <Select label={t('sab.idioma')} value={form.idioma} onChange={(e) => setForm({ ...form, idioma: e.target.value })} options={[
            { value: 'es', label: 'Español' },
            { value: 'bri', label: 'Bribri' },
            { value: 'cab', label: 'Cabécar' },
            { value: 'ngb', label: 'Ngäbe' },
          ]} />
          <Input label={t('sab.contexto')} value={form.contexto_uso} onChange={(e) => setForm({ ...form, contexto_uso: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button full onClick={handleSave}>{t('common.save')}</Button>
            <Button variant="secondary" full onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
