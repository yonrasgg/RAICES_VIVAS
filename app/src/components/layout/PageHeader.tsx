/* eslint-disable react/forbid-dom-props */
import type { ReactNode } from 'react'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'

type Module = 'edu' | 'sab' | 'sal' | 'trans'

const moduleMeta: Record<Module, { ink: string; tint: string; ring: string; glyph: TribalIconName }> = {
  edu: { ink: 'var(--color-ocre-700)', tint: 'var(--color-ocre-50)', ring: 'var(--color-ocre-300)', glyph: 'edu' },
  sab: { ink: 'var(--color-terracotta-700)', tint: 'var(--color-terracotta-50)', ring: 'var(--color-terracotta-300)', glyph: 'sab' },
  sal: { ink: 'var(--color-jungle-700)', tint: 'var(--color-jungle-50)', ring: 'var(--color-jungle-300)', glyph: 'sal' },
  trans: { ink: 'var(--color-jungle-700)', tint: 'var(--color-bone-100)', ring: 'var(--color-border-strong)', glyph: 'trans' },
}

interface Props {
  module: Module
  title: string
  subtitle?: string
  icon?: TribalIconName
  action?: ReactNode
}

export default function PageHeader({ module, title, subtitle, icon, action }: Props) {
  const m = moduleMeta[module]
  return (
    <header className="relative">
      <span className="rv-cenefa mb-3 block" aria-hidden />
      <div
        className="rv-card flex items-center gap-3 p-4"
        style={{ borderLeft: `4px solid ${m.ink}` }}
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ background: m.tint, color: m.ink, boxShadow: `inset 0 0 0 1px ${m.ring}` }}
          aria-hidden
        >
          <TribalIcon name={icon ?? m.glyph} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-semibold leading-tight text-[color:var(--color-jungle-700)]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[color:var(--color-charcoal-500)]">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  )
}
