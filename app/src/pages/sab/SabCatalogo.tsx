/* eslint-disable react/forbid-dom-props */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Saber } from '@/types/sab'
import ModuleHeader from '@/components/layout/ModuleHeader'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'

type Acceso = Saber['nivel_acceso']
type Estado = Saber['estado']

const accesoMeta: Record<Acceso, { glyph: TribalIconName; tint: string; ink: string; ring: string }> = {
  publico: {
    glyph: 'esfera',
    tint: 'var(--color-jungle-100)',
    ink: 'var(--color-jungle-700)',
    ring: 'var(--color-jungle-300)',
  },
  comunitario: {
    glyph: 'rancho',
    tint: 'var(--color-ocre-100)',
    ink: 'var(--color-ocre-700)',
    ring: 'var(--color-ocre-300)',
  },
  restringido: {
    glyph: 'chacara',
    tint: 'var(--color-terracotta-100)',
    ink: 'var(--color-terracotta-700)',
    ring: 'var(--color-terracotta-300)',
  },
  ceremonial: {
    glyph: 'lock',
    tint: 'var(--color-cinabrio-100)',
    ink: 'var(--color-cinabrio-700)',
    ring: 'var(--color-cinabrio-500)',
  },
}

const estadoMeta: Record<Estado, { label: string; dot: string }> = {
  borrador: { label: 'Borrador', dot: 'var(--color-charcoal-400)' },
  publicado: { label: 'Publicado', dot: 'var(--color-jungle-500)' },
  restringido: { label: 'Restringido', dot: 'var(--color-ocre-500)' },
  revocado: { label: 'Revocado', dot: 'var(--color-cinabrio-500)' },
}

const careBanner: { letter: string; glyph: TribalIconName; label: string; desc: string }[] = [
  { letter: 'C', glyph: 'rancho', label: 'Colectivo', desc: 'Beneficio para la comunidad, no para el individuo.' },
  { letter: 'A', glyph: 'lock', label: 'Autoridad', desc: 'El Consejo de Mayores controla el acceso y la difusión.' },
  { letter: 'R', glyph: 'chacara', label: 'Responsabilidad', desc: 'Registro trazable del portador y su consentimiento.' },
  { letter: 'E', glyph: 'espiral', label: 'Ética', desc: 'Protocolos culturales por encima de eficiencia técnica.' },
]

const idiomas = [
  { value: 'bri', label: 'Bribri' },
  { value: 'cab', label: 'Cabécar' },
  { value: 'ngb', label: 'Ngäbere' },
  { value: 'mal', label: 'Maleku' },
  { value: 'brn', label: 'Brunka' },
  { value: 'es', label: 'Español' },
]

const formatos: { value: Saber['formato']; label: string; glyph: TribalIconName }[] = [
  { value: 'texto', label: 'Texto', glyph: 'tejido' },
  { value: 'audio', label: 'Audio', glyph: 'ola' },
  { value: 'video', label: 'Video', glyph: 'eye' },
  { value: 'imagen', label: 'Imagen', glyph: 'mascara' },
]

const initialForm = {
  titulo: '',
  descripcion: '',
  categoria: '',
  portador_nombre: '',
  comunidad: '',
  territorio: '',
  formato: 'texto' as Saber['formato'],
  idioma: 'bri',
  contexto_uso: '',
  nivel_acceso: 'publico' as Acceso,
  etiquetas: [] as string[],
  estado: 'borrador' as Estado,
  consentimiento: false,
}

export default function SabCatalogo() {
  const { t } = useTranslation()
  const { docs, loading, put } = useDB<Saber>({ mod: 'sab', type: 'saber' })
  const [search, setSearch] = useState('')
  const [filterAcceso, setFilterAcceso] = useState<'' | Acceso>('')
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)

  const filtered = docs
    .filter((s) => !filterAcceso || s.nivel_acceso === filterAcceso)
    .filter((s) =>
      `${s.titulo} ${s.comunidad} ${s.territorio} ${s.portador_nombre}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  const resetForm = () => {
    setForm(initialForm)
    setStep(1)
  }

  const handleSave = async () => {
    const ceremonial = form.nivel_acceso === 'ceremonial'
    await put({
      _id: `sab-${Date.now()}`,
      type: 'saber',
      titulo: form.titulo,
      descripcion: form.descripcion,
      categoria: form.categoria,
      portador_id: '',
      portador_nombre: form.portador_nombre,
      comunidad: form.comunidad,
      territorio: form.territorio,
      formato: form.formato,
      idioma: form.idioma,
      contexto_uso: form.contexto_uso,
      nivel_acceso: form.nivel_acceso,
      etiquetas: form.etiquetas,
      estado: ceremonial ? 'restringido' : form.estado,
      fecha_registro: new Date().toISOString().slice(0, 10),
    })
    resetForm()
    setShowForm(false)
  }

  const handleRevocar = async (s: Saber) => {
    if (!confirm(`¿Revocar el saber "${s.titulo}"? Esta acción reflejará la retirada del consentimiento del portador.`)) return
    await put({ ...s, estado: 'revocado' })
  }

  const canNext =
    (step === 1 && form.titulo.trim() !== '' && form.descripcion.trim() !== '') ||
    (step === 2 && form.portador_nombre.trim() !== '' && form.comunidad.trim() !== '') ||
    step >= 3
  const canSave = step === 3 && form.consentimiento

  return (
    <div className="space-y-5">
      <ModuleHeader
        module="sab"
        title={t('sab.catalogo')}
        subtitle="Saberes documentados bajo gobernanza CARE por portador"
        cover={`${import.meta.env.BASE_URL}img/cover-rf-sab.png`}
        quote="Si yo digo quiten eso, se pueda quitar. Esa es la palabra."
        quoteSource="ENT-003 · Portador de saberes, Talamanca"
      />

      <section className="rv-card overflow-hidden p-0">
        <div className="flex items-center gap-2 bg-[color:var(--color-cinabrio-50)] px-4 py-2 text-xs uppercase tracking-wider text-[color:var(--color-cinabrio-700)]">
          <TribalIcon name="lock" size={14} />
          Principios CARE
        </div>
        <div className="grid grid-cols-2 gap-px bg-[color:var(--color-border-soft)] sm:grid-cols-4">
          {careBanner.map((c) => (
            <div
              key={c.letter}
              className="flex flex-col gap-1 bg-[color:var(--color-cream-50)] p-3"
              title={c.desc}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: 'var(--color-cinabrio-100)',
                    color: 'var(--color-cinabrio-700)',
                  }}
                >
                  {c.letter}
                </span>
                <span className="text-[color:var(--color-jungle-700)]">
                  <TribalIcon name={c.glyph} size={18} />
                </span>
                <span className="font-display text-sm font-semibold text-[color:var(--color-jungle-700)]">
                  {c.label}
                </span>
              </div>
              <p className="text-[11px] leading-tight text-[color:var(--color-charcoal-500)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[14rem] flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder={t('sab.buscar')} />
        </div>
        <Button icon="＋" onClick={() => setShowForm(true)}>
          {t('sab.addSaber')}
        </Button>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button
          type="button"
          onClick={() => setFilterAcceso('')}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
            filterAcceso === ''
              ? 'bg-[color:var(--color-jungle-700)] text-[color:var(--color-cream-50)]'
              : 'bg-[color:var(--color-bone-100)] text-[color:var(--color-charcoal-600)] ring-1 ring-[color:var(--color-border-soft)]'
          }`}
        >
          Todos
        </button>
        {(Object.keys(accesoMeta) as Acceso[]).map((v) => {
          const meta = accesoMeta[v]
          const active = filterAcceso === v
          return (
            <button
              key={v}
              type="button"
              onClick={() => setFilterAcceso(v)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition"
              style={{
                background: active ? meta.ink : meta.tint,
                color: active ? 'var(--color-cream-50)' : meta.ink,
                boxShadow: active ? 'none' : `inset 0 0 0 1px ${meta.ring}`,
              }}
              title={`Acceso ${t(`sab.${v}`)}`}
            >
              <TribalIcon name={meta.glyph} size={14} />
              {t(`sab.${v}`)}
            </button>
          )
        })}
      </div>

      {loading && <p className="text-sm text-[color:var(--color-charcoal-500)]">{t('common.loading')}</p>}

      {!loading && filtered.length === 0 && <EmptyState icon="📜" message={t('sab.sinResultados')} />}

      <ul className="space-y-3">
        {filtered.map((s) => {
          const meta = accesoMeta[s.nivel_acceso]
          const est = estadoMeta[s.estado]
          const revocado = s.estado === 'revocado'
          return (
            <li
              key={s._id}
              className="rv-card relative p-4"
              style={revocado ? { opacity: 0.72 } : undefined}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: meta.tint,
                    color: meta.ink,
                    boxShadow: `inset 0 0 0 1px ${meta.ring}`,
                  }}
                  aria-hidden
                >
                  <TribalIcon name={meta.glyph} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-base font-semibold leading-tight text-[color:var(--color-jungle-700)]">
                      {s.titulo}
                      {revocado && (
                        <span className="ml-2 align-middle text-xs font-normal text-[color:var(--color-cinabrio-700)]">
                          · {est.label}
                        </span>
                      )}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        background: meta.tint,
                        color: meta.ink,
                        boxShadow: `inset 0 0 0 1px ${meta.ring}`,
                      }}
                    >
                      <TribalIcon name={meta.glyph} size={12} />
                      {t(`sab.${s.nivel_acceso}`)}
                    </span>
                  </div>

                  <p className="mt-0.5 text-xs text-[color:var(--color-charcoal-500)]">
                    {s.comunidad} · {s.territorio}
                  </p>

                  {s.descripcion && (
                    <p className="mt-2 line-clamp-2 text-sm text-[color:var(--color-charcoal-600)]">
                      {s.descripcion}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    {s.portador_nombre && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-bone-100)] px-2 py-0.5 text-[color:var(--color-charcoal-600)] ring-1 ring-[color:var(--color-border-soft)]">
                        <TribalIcon name="mascara" size={11} />
                        {s.portador_nombre}
                      </span>
                    )}
                    {s.idioma && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-ocre-50)] px-2 py-0.5 text-[color:var(--color-ocre-700)] ring-1 ring-[color:var(--color-ocre-200)]">
                        <TribalIcon name="tejido" size={11} />
                        {idiomas.find((i) => i.value === s.idioma)?.label ?? s.idioma}
                      </span>
                    )}
                    {s.formato && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-jungle-50)] px-2 py-0.5 text-[color:var(--color-jungle-700)] ring-1 ring-[color:var(--color-jungle-100)]">
                        <TribalIcon
                          name={formatos.find((f) => f.value === s.formato)?.glyph ?? 'tejido'}
                          size={11}
                        />
                        {s.formato}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[color:var(--color-charcoal-500)]">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: est.dot }}
                        aria-hidden
                      />
                      {est.label} · {new Date(s.fecha_registro).toLocaleDateString('es-CR')}
                    </span>
                    {!revocado && (
                      <button
                        type="button"
                        onClick={() => handleRevocar(s)}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-cinabrio-700)] ring-1 ring-[color:var(--color-cinabrio-200)] transition hover:bg-[color:var(--color-cinabrio-50)]"
                        title="Revocar consentimiento (acción reversible por el portador)"
                      >
                        <TribalIcon name="lock" size={12} />
                        Revocar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <aside
        className="rv-card border-l-4 p-4"
        style={{ borderLeftColor: 'var(--color-cinabrio-500)' }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-[color:var(--color-cinabrio-600)]">
            <TribalIcon name="lock" size={18} />
          </span>
          <p className="text-xs leading-relaxed text-[color:var(--color-charcoal-600)]">
            <strong className="font-semibold text-[color:var(--color-cinabrio-700)]">
              Saberes ceremoniales.
            </strong>{' '}
            Nunca se sincronizan con la nube. Viven únicamente en el dispositivo autorizado por el
            Consejo de Mayores. La revocación del portador borra el contenido y conserva sólo la
            bitácora de decisiones.
          </p>
        </div>
      </aside>

      <Modal
        open={showForm}
        onClose={() => {
          setShowForm(false)
          resetForm()
        }}
        title={t('sab.addSaber')}
      >
        <div className="mb-4 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition"
                style={{
                  background: step >= n ? 'var(--color-ocre-500)' : 'var(--color-bone-200)',
                  color: step >= n ? 'var(--color-cream-50)' : 'var(--color-charcoal-500)',
                }}
              >
                {n}
              </span>
              {n < 3 && (
                <span
                  className="h-0.5 flex-1 rounded-full"
                  style={{
                    background: step > n ? 'var(--color-ocre-500)' : 'var(--color-border-soft)',
                  }}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-[color:var(--color-charcoal-500)]">
              Paso 1 · Identidad del saber
            </p>
            <Input
              label={t('sab.titulo')}
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
            <Input
              label={t('sab.descripcion')}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
            <Input
              label={t('sab.categoria')}
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />
            <div>
              <p className="mb-1 text-sm font-medium text-[color:var(--color-charcoal-600)]">
                {t('sab.formato')}
              </p>
              <div className="flex flex-wrap gap-2">
                {formatos.map((f) => {
                  const active = form.formato === f.value
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setForm({ ...form, formato: f.value })}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition"
                      style={{
                        background: active ? 'var(--color-jungle-700)' : 'var(--color-bone-100)',
                        color: active ? 'var(--color-cream-50)' : 'var(--color-charcoal-600)',
                        boxShadow: active ? 'none' : 'inset 0 0 0 1px var(--color-border-soft)',
                      }}
                    >
                      <TribalIcon name={f.glyph} size={14} />
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-[color:var(--color-charcoal-500)]">
              Paso 2 · Procedencia y contexto cultural
            </p>
            <Input
              label={t('sab.portador')}
              value={form.portador_nombre}
              onChange={(e) => setForm({ ...form, portador_nombre: e.target.value })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label={t('sab.comunidad')}
                value={form.comunidad}
                onChange={(e) => setForm({ ...form, comunidad: e.target.value })}
              />
              <Input
                label={t('sab.territorio')}
                value={form.territorio}
                onChange={(e) => setForm({ ...form, territorio: e.target.value })}
              />
            </div>
            <Select
              label={t('sab.idioma')}
              value={form.idioma}
              onChange={(e) => setForm({ ...form, idioma: e.target.value })}
              options={idiomas}
            />
            <Input
              label={t('sab.contexto')}
              value={form.contexto_uso}
              onChange={(e) => setForm({ ...form, contexto_uso: e.target.value })}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="text-xs text-[color:var(--color-charcoal-500)]">
              Paso 3 · Gobernanza y consentimiento
            </p>

            <div>
              <p className="mb-1 text-sm font-medium text-[color:var(--color-charcoal-600)]">
                {t('sab.nivelAcceso')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(accesoMeta) as Acceso[]).map((v) => {
                  const meta = accesoMeta[v]
                  const active = form.nivel_acceso === v
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm({ ...form, nivel_acceso: v })}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition"
                      style={{
                        background: active ? meta.ink : meta.tint,
                        color: active ? 'var(--color-cream-50)' : meta.ink,
                        boxShadow: active ? 'none' : `inset 0 0 0 1px ${meta.ring}`,
                      }}
                    >
                      <TribalIcon name={meta.glyph} size={16} />
                      {t(`sab.${v}`)}
                    </button>
                  )
                })}
              </div>
            </div>

            {form.nivel_acceso === 'ceremonial' && (
              <div
                className="rounded-lg p-3 text-xs leading-relaxed"
                style={{
                  background: 'var(--color-cinabrio-50)',
                  color: 'var(--color-cinabrio-700)',
                  boxShadow: 'inset 0 0 0 1px var(--color-cinabrio-200)',
                }}
              >
                <div className="mb-1 flex items-center gap-1.5 font-semibold">
                  <TribalIcon name="lock" size={14} />
                  Saber ceremonial
                </div>
                Este saber permanecerá offline en el dispositivo autorizado. No se copiará a la
                nube ni a otros dispositivos. El Consejo de Mayores conservará la potestad de
                revocar en cualquier momento.
              </div>
            )}

            <label className="flex items-start gap-2 rounded-lg bg-[color:var(--color-cream-100)] p-3 text-xs text-[color:var(--color-charcoal-600)] ring-1 ring-[color:var(--color-border-soft)]">
              <input
                type="checkbox"
                checked={form.consentimiento}
                onChange={(e) => setForm({ ...form, consentimiento: e.target.checked })}
                className="mt-0.5 h-4 w-4 accent-[color:var(--color-ocre-600)]"
              />
              <span>
                El portador ha dado <strong>consentimiento informado</strong> para registrar este
                saber con el nivel de acceso seleccionado. Puede revocarlo en cualquier momento.
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex gap-2">
          {step > 1 && (
            <Button variant="secondary" full onClick={() => setStep(step - 1)}>
              Anterior
            </Button>
          )}
          {step < 3 && (
            <Button full onClick={() => canNext && setStep(step + 1)} disabled={!canNext}>
              Siguiente
            </Button>
          )}
          {step === 3 && (
            <Button full onClick={handleSave} disabled={!canSave}>
              {t('common.save')}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  )
}
