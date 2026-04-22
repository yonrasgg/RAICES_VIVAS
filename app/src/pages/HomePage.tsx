import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDB } from '@/hooks/useDB'
import TribalIcon from '@/components/icons/TribalIcon'
import type { MaterialEducativo } from '@/types/edu'
import type { Saber } from '@/types/sab'
import type { Paciente } from '@/types/sal'

/* eslint-disable react/forbid-dom-props --
   Inline styles are required here to pipe per-module CSS variables
   (accent/tint colors) into Tailwind-less gradients and tints. */

type ModuleKey = 'edu' | 'sab' | 'sal' | 'trans'

interface ModuleCard {
  to: string
  key: ModuleKey
  labelKey: string
  descKey: string
  icon: 'edu' | 'sab' | 'sal' | 'trans'
  cover: string
  accentVar: string
  tintVar: string
}

const BASE = import.meta.env.BASE_URL

const modules: ModuleCard[] = [
  {
    to: '/edu',
    key: 'edu',
    labelKey: 'nav.edu',
    descKey: 'home.moduleDesc.edu',
    icon: 'edu',
    cover: `${BASE}img/cover-educacion.png`,
    accentVar: 'var(--color-jungle-500)',
    tintVar: 'var(--color-jungle-100)',
  },
  {
    to: '/sab',
    key: 'sab',
    labelKey: 'nav.sab',
    descKey: 'home.moduleDesc.sab',
    icon: 'sab',
    cover: `${BASE}img/cover-saberes.png`,
    accentVar: 'var(--color-terracotta-500)',
    tintVar: 'var(--color-terracotta-100)',
  },
  {
    to: '/sal',
    key: 'sal',
    labelKey: 'nav.sal',
    descKey: 'home.moduleDesc.sal',
    icon: 'sal',
    cover: `${BASE}img/cover-salud.png`,
    accentVar: 'var(--color-ocre-500)',
    tintVar: 'var(--color-ocre-100)',
  },
  {
    to: '/trans',
    key: 'trans',
    labelKey: 'nav.trans',
    descKey: 'home.moduleDesc.trans',
    icon: 'trans',
    cover: `${BASE}img/cover-arquitectura.png`,
    accentVar: 'var(--color-jungle-700)',
    tintVar: 'var(--color-bone-100)',
  },
]

/**
 * Territorios piloto con su estado de conectividad documentado
 * en la investigación de campo (ver 02-Investigación/Observaciones
 * y ADRs de arquitectura offline-first).
 */
const territorios = [
  { nombre: 'Guatuso', pueblo: 'Maleku', conectividad: '3G', estado: 'parcial' as const },
  { nombre: 'Talamanca', pueblo: 'Bribri · Cabécar', conectividad: '2G', estado: 'debil' as const },
  { nombre: 'Boruca', pueblo: 'Brunka', conectividad: '3G', estado: 'parcial' as const },
  { nombre: 'Chirripó', pueblo: 'Cabécar', conectividad: 'Sin señal', estado: 'offline' as const },
] as const

const estadoConectividadColor = {
  parcial: 'bg-[color:var(--color-ocre-100)] text-[color:var(--color-ocre-700)] ring-[color:var(--color-ocre-300)]',
  debil: 'bg-[color:var(--color-terracotta-100)] text-[color:var(--color-terracotta-700)] ring-[color:var(--color-terracotta-300)]',
  offline: 'bg-[color:var(--color-bone-100)] text-[color:var(--color-charcoal-700)] ring-[color:var(--color-border-strong)]',
}

export default function HomePage() {
  const { t } = useTranslation()
  const { docs: materiales } = useDB<MaterialEducativo>({ mod: 'edu', type: 'material_educativo' })
  const { docs: saberes } = useDB<Saber>({ mod: 'sab', type: 'saber' })
  const { docs: pacientes } = useDB<Paciente>({ mod: 'sal', type: 'paciente' })

  const kpis = [
    { valor: 75, labelKey: 'home.kpi.participantes' },
    { valor: 23, labelKey: 'home.kpi.requerimientos' },
    { valor: 4, labelKey: 'home.kpi.idiomas' },
    { valor: 7, labelKey: 'home.kpi.pueblos' },
  ]

  const counts: Record<ModuleKey, number> = {
    edu: materiales.length,
    sab: saberes.length,
    sal: pacientes.length,
    trans: 4,
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[var(--radius-tribal-lg)] shadow-[var(--shadow-tribal)]">
        <img
          src={`${import.meta.env.BASE_URL}img/hero-raices-vivas.png`}
          alt="Paisaje cultural de las comunidades indígenas de Costa Rica"
          className="h-60 w-full object-cover sm:h-72 md:h-80"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(19,58,50,0.88) 0%, rgba(19,58,50,0.62) 45%, rgba(19,58,50,0.15) 100%)',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
          <p className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--color-ocre-400)]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ocre-200)] ring-1 ring-[color:var(--color-ocre-400)]/40">
            <TribalIcon name="espiral" size={12} />
            Raíces Vivas
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-[color:var(--color-cream-100)] sm:text-4xl">
            {t('app.name')}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[color:var(--color-cream-100)]/85 sm:text-base">
            {t('app.tagline')}
          </p>
          <blockquote className="mt-4 max-w-xl border-l-2 border-[color:var(--color-ocre-400)] pl-3 text-sm italic text-[color:var(--color-bone-100)] sm:text-base">
            «Que nos traten como socios, no como beneficiarios».
            <footer className="mt-1 text-[11px] not-italic text-[color:var(--color-ocre-200)]/90">
              — ENT-004 · líder comunitario
            </footer>
          </blockquote>
        </div>
        <div className="rv-cenefa" aria-hidden />
      </section>

      {/* KPIs */}
      <section>
        <h3 className="mb-3 font-display text-lg text-[color:var(--color-jungle-700)]">
          {t('home.kpi.title')}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.labelKey} className="rv-card px-4 py-3">
              <p className="font-display text-3xl font-semibold text-[color:var(--color-terracotta-600)]">
                {k.valor}
              </p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-[color:var(--color-charcoal-500)]">
                {t(k.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Módulos */}
      <section>
        <h3 className="mb-3 font-display text-lg text-[color:var(--color-jungle-700)]">
          {t('home.modules')}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group relative flex overflow-hidden rounded-[var(--radius-tribal)] border border-[color:var(--color-border-soft)] bg-[color:var(--color-surface-raised)] shadow-[var(--shadow-tribal-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-tribal)]"
            >
              <div
                className="relative w-28 shrink-0 overflow-hidden sm:w-32"
                style={{ backgroundColor: m.tintVar }}
              >
                <img
                  src={m.cover}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover opacity-85 transition group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${m.accentVar}ee 0%, transparent 100%)`,
                    color: 'var(--color-cream-100)',
                  }}
                >
                  <TribalIcon name={m.icon} size={40} />
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: m.accentVar }}
                  >
                    Módulo
                  </p>
                  <h4 className="font-display text-xl font-semibold text-[color:var(--color-jungle-700)]">
                    {t(m.labelKey)}
                  </h4>
                  <p className="mt-1 text-xs text-[color:var(--color-charcoal-500)]">
                    {t(m.descKey)}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: m.tintVar,
                      color: m.accentVar,
                    }}
                  >
                    {counts[m.key]} · {t('home.registros')}
                  </span>
                  <span
                    className="inline-flex items-center text-[color:var(--color-terracotta-500)] transition group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <TribalIcon name="chevron-right" size={18} />
                  </span>
                </div>
              </div>
              <span
                className="absolute right-0 top-0 h-5 w-5"
                style={{
                  background: 'var(--color-ocre-400)',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                }}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Territorios piloto */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-[color:var(--color-jungle-700)]">
            {t('home.territorios.title')}
          </h3>
          <p className="text-[11px] uppercase tracking-wider text-[color:var(--color-charcoal-500)]">
            {t('home.territorios.subtitle')}
          </p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {territorios.map((terr) => (
            <li
              key={terr.nombre}
              className="flex items-center justify-between rounded-[var(--radius-tribal)] border border-[color:var(--color-border-soft)] bg-[color:var(--color-surface-raised)] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-display text-base font-semibold text-[color:var(--color-jungle-700)]">
                  <TribalIcon name="rancho" size={16} />
                  {terr.nombre}
                </p>
                <p className="text-[11px] text-[color:var(--color-charcoal-500)]">
                  {terr.pueblo}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${estadoConectividadColor[terr.estado]}`}
              >
                {terr.conectividad}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] italic text-[color:var(--color-charcoal-500)]">
          «Si no hay señal, el sistema debe seguir funcionando igual». — OBS-002
        </p>
      </section>
    </div>
  )
}
