import type { ReactNode } from 'react'

interface Props {
  /** Texto corto (emoji) legacy o nodo React (ej. <TribalIcon />) */
  icon?: ReactNode
  label: string
  value: string | number
  /** Variante cromática del módulo */
  accent?: 'edu' | 'sab' | 'sal' | 'trans' | 'neutral'
  /** Color override legacy (Tailwind class). Si se pasa, sobrescribe accent. */
  color?: string
}

const accentMap = {
  edu: {
    bg: 'bg-[color:var(--color-jungle-50)]',
    ring: 'ring-[color:var(--color-jungle-200)]',
    icon: 'text-[color:var(--color-jungle-500)]',
    value: 'text-[color:var(--color-jungle-700)]',
  },
  sab: {
    bg: 'bg-[color:var(--color-terracotta-50)]',
    ring: 'ring-[color:var(--color-terracotta-200)]',
    icon: 'text-[color:var(--color-terracotta-500)]',
    value: 'text-[color:var(--color-terracotta-600)]',
  },
  sal: {
    bg: 'bg-[color:var(--color-ocre-50)]',
    ring: 'ring-[color:var(--color-ocre-200)]',
    icon: 'text-[color:var(--color-ocre-600)]',
    value: 'text-[color:var(--color-ocre-700)]',
  },
  trans: {
    bg: 'bg-[color:var(--color-bone-100)]',
    ring: 'ring-[color:var(--color-border-strong)]',
    icon: 'text-[color:var(--color-jungle-700)]',
    value: 'text-[color:var(--color-jungle-700)]',
  },
  neutral: {
    bg: 'bg-[color:var(--color-surface-raised)]',
    ring: 'ring-[color:var(--color-border-soft)]',
    icon: 'text-[color:var(--color-charcoal-500)]',
    value: 'text-[color:var(--color-jungle-700)]',
  },
} as const

export default function StatCard({ icon, label, value, accent = 'neutral', color }: Props) {
  if (color) {
    // Ruta legacy (emoji string + bg custom)
    return (
      <div className={`flex items-center gap-3 rounded-[var(--radius-tribal)] p-4 shadow-[var(--shadow-tribal-sm)] ${color}`}>
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <p className="font-display text-2xl font-semibold text-[color:var(--color-jungle-700)]">{value}</p>
          <p className="text-xs text-[color:var(--color-charcoal-500)]">{label}</p>
        </div>
      </div>
    )
  }

  const a = accentMap[accent]
  return (
    <div
      className={`relative flex items-center gap-3 overflow-hidden rounded-[var(--radius-tribal)] p-4 shadow-[var(--shadow-tribal-sm)] ring-1 ${a.bg} ${a.ring}`}
    >
      {icon && (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-cream-50)] ${a.icon}`}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className={`font-display text-2xl font-semibold leading-tight ${a.value}`}>{value}</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[color:var(--color-charcoal-500)]">
          {label}
        </p>
      </div>
      <span
        aria-hidden
        className="absolute right-0 top-0 h-3 w-3 bg-[color:var(--color-ocre-400)]"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
    </div>
  )
}
