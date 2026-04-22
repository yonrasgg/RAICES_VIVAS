import type { ReactNode } from 'react'
import TribalIcon from '@/components/icons/TribalIcon'
import QuoteRotator, { type RotatingQuote } from '@/components/QuoteRotator'

type Module = 'edu' | 'sab' | 'sal' | 'trans'

interface Props {
  module: Module
  title: string
  subtitle?: string
  /** Cita corta de campo (entrevista / observación) — simple. */
  quote?: string
  quoteSource?: string
  /** Lista de citas para rotar en el mismo bloque (lazy/scroll visual). */
  quotes?: RotatingQuote[]
  cover?: string
}

const moduleMeta: Record<
  Module,
  { icon: 'edu' | 'sab' | 'sal' | 'trans'; accent: string; tint: string; ink: string }
> = {
  edu: {
    icon: 'edu',
    accent: 'var(--color-jungle-500)',
    tint: 'var(--color-jungle-50)',
    ink: 'var(--color-jungle-700)',
  },
  sab: {
    icon: 'sab',
    accent: 'var(--color-terracotta-500)',
    tint: 'var(--color-terracotta-50)',
    ink: 'var(--color-terracotta-700)',
  },
  sal: {
    icon: 'sal',
    accent: 'var(--color-ocre-500)',
    tint: 'var(--color-ocre-50)',
    ink: 'var(--color-ocre-700)',
  },
  trans: {
    icon: 'trans',
    accent: 'var(--color-jungle-700)',
    tint: 'var(--color-bone-100)',
    ink: 'var(--color-jungle-700)',
  },
}

/**
 * Encabezado de módulo con cenefa tribal, glifo identitario y cita opcional.
 * Se usa al tope de cada dashboard y catálogo.
 */
export default function ModuleHeader({ module, title, subtitle, quote, quoteSource, quotes, cover }: Props): ReactNode {
  const meta = moduleMeta[module]
  const rotating: RotatingQuote[] | undefined =
    quotes && quotes.length > 0
      ? quotes
      : quote
      ? [{ text: quote, source: quoteSource ?? '' }]
      : undefined
  return (
    <header className="relative overflow-hidden rounded-[var(--radius-tribal-lg)] shadow-[var(--shadow-tribal-sm)]">
      {cover ? (
        <div className="relative h-28 w-full sm:h-32">
          <img src={cover} alt="" aria-hidden className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, ${meta.accent}dd 0%, ${meta.accent}55 55%, transparent 100%)`,
            }}
            aria-hidden
          />
        </div>
      ) : (
        <div
          className="h-14"
          style={{
            background: `linear-gradient(100deg, ${meta.accent} 0%, ${meta.ink} 100%)`,
          }}
          aria-hidden
        />
      )}

      <div className="rv-cenefa" aria-hidden />

      <div className="flex items-start gap-3 bg-[color:var(--color-surface-raised)] p-4 sm:p-5">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1"
          style={{
            backgroundColor: meta.tint,
            color: meta.accent,
            borderColor: meta.accent,
          }}
        >
          <TribalIcon name={meta.icon} size={28} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-semibold leading-tight text-[color:var(--color-jungle-700)] sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-[color:var(--color-charcoal-500)]">{subtitle}</p>
          )}
          {rotating && (
            <QuoteRotator
              quotes={rotating}
              blockquoteClassName="mt-2 border-l-2 pl-3 text-xs italic text-[color:var(--color-charcoal-700)] sm:text-sm"
              blockquoteStyle={{ borderColor: meta.accent }}
              footerClassName="mt-0.5 text-[10px] not-italic tracking-wider text-[color:var(--color-charcoal-500)]"
            />
          )}
        </div>
      </div>
    </header>
  )
}
