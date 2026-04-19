import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  ghost: 'text-green-700 hover:bg-green-50 active:bg-green-100',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: string
  full?: boolean
}

export default function Button({
  variant = 'primary',
  icon,
  full,
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${variants[variant]} ${full ? 'w-full' : ''} disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
