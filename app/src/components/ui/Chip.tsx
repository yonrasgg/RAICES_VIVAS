/* eslint-disable react/forbid-dom-props */
import type { ReactNode } from 'react'
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'

export type ChipTone =
  | 'neutral'
  | 'edu'
  | 'sab'
  | 'sal'
  | 'trans'
  | 'ocre'
  | 'jungle'
  | 'terracotta'
  | 'cinabrio'
  | 'warn'

const toneMap: Record<ChipTone, { bg: string; ink: string; ring: string }> = {
  neutral: { bg: 'var(--color-bone-100)', ink: 'var(--color-charcoal-600)', ring: 'var(--color-border-soft)' },
  edu: { bg: 'var(--color-ocre-50)', ink: 'var(--color-ocre-700)', ring: 'var(--color-ocre-200)' },
  sab: { bg: 'var(--color-terracotta-50)', ink: 'var(--color-terracotta-700)', ring: 'var(--color-terracotta-200)' },
  sal: { bg: 'var(--color-jungle-50)', ink: 'var(--color-jungle-700)', ring: 'var(--color-jungle-200)' },
  trans: { bg: 'var(--color-bone-100)', ink: 'var(--color-jungle-700)', ring: 'var(--color-border-strong)' },
  ocre: { bg: 'var(--color-ocre-100)', ink: 'var(--color-ocre-700)', ring: 'var(--color-ocre-300)' },
  jungle: { bg: 'var(--color-jungle-100)', ink: 'var(--color-jungle-700)', ring: 'var(--color-jungle-300)' },
  terracotta: { bg: 'var(--color-terracotta-100)', ink: 'var(--color-terracotta-700)', ring: 'var(--color-terracotta-300)' },
  cinabrio: { bg: 'var(--color-cinabrio-50)', ink: 'var(--color-cinabrio-700)', ring: 'var(--color-cinabrio-200)' },
  warn: { bg: 'var(--color-ocre-100)', ink: 'var(--color-ocre-800)', ring: 'var(--color-ocre-400)' },
}

interface Props {
  glyph?: TribalIconName
  tone?: ChipTone
  children: ReactNode
  title?: string
  size?: 'sm' | 'md'
}

export default function Chip({ glyph, tone = 'neutral', children, title, size = 'sm' }: Props) {
  const t = toneMap[tone]
  const px = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${px}`}
      style={{ background: t.bg, color: t.ink, boxShadow: `inset 0 0 0 1px ${t.ring}` }}
      title={title}
    >
      {glyph && <TribalIcon name={glyph} size={size === 'md' ? 13 : 11} />}
      {children}
    </span>
  )
}
