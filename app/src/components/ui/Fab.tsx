/* eslint-disable react/forbid-dom-props */
import TribalIcon, { type TribalIconName } from '@/components/icons/TribalIcon'

interface Props {
  icon?: TribalIconName
  label: string
  onClick: () => void
}

export default function Fab({ icon = 'plus', label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="fixed right-4 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full text-[color:var(--color-cream-50)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4"
      style={{
        bottom: 'calc(var(--rv-bottomnav-height, 64px) + 1rem)',
        background: 'var(--color-terracotta-600)',
        boxShadow:
          '0 8px 24px color-mix(in srgb, var(--color-terracotta-700) 40%, transparent), inset 0 0 0 1px var(--color-terracotta-700)',
      }}
    >
      <TribalIcon name={icon} size={26} />
      <span
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-[color:var(--color-jungle-800)] px-3 py-1 text-xs font-medium text-[color:var(--color-cream-50)] opacity-0 shadow transition group-hover:opacity-100"
        aria-hidden
      >
        {label}
      </span>
    </button>
  )
}
