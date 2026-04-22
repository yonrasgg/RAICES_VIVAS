/* eslint-disable react/forbid-dom-props */

export type SyncState = 'synced' | 'pending' | 'offline' | 'ceremonial' | 'error'

const stateMap: Record<SyncState, { color: string; label: string }> = {
  synced: { color: 'var(--color-jungle-500)', label: 'Guardado offline' },
  pending: { color: 'var(--color-ocre-500)', label: 'Pendiente de sincronizar' },
  offline: { color: 'var(--color-charcoal-400)', label: 'Sin conexión' },
  ceremonial: { color: 'var(--color-cinabrio-500)', label: 'Ceremonial · no se sincroniza' },
  error: { color: 'var(--color-cinabrio-600)', label: 'Error de sincronización' },
}

interface Props {
  state: SyncState
  label?: string
  showLabel?: boolean
}

export default function SyncDot({ state, label, showLabel = true }: Props) {
  const s = stateMap[state]
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] text-[color:var(--color-charcoal-500)]"
      title={s.label}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: s.color, boxShadow: `0 0 0 2px color-mix(in srgb, ${s.color} 20%, transparent)` }}
        aria-hidden
      />
      {showLabel && (label ?? s.label)}
    </span>
  )
}
