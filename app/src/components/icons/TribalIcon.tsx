import type { SVGProps } from 'react'

export type TribalIconName =
  | 'home'
  | 'edu'
  | 'sab'
  | 'sal'
  | 'trans'
  | 'esfera'
  | 'espiral'
  | 'mascara'
  | 'jaguar'
  | 'tejido'
  | 'hoja'
  | 'rana'
  | 'rancho'
  | 'chacara'
  | 'ola'
  | 'cacao'
  | 'plus'
  | 'search'
  | 'lock'
  | 'eye'
  | 'chevron-right'

interface Props extends SVGProps<SVGSVGElement> {
  name: TribalIconName
  size?: number
  title?: string
}

/**
 * Pictogramas tribales inspirados en motivos de los pueblos indígenas
 * de Costa Rica (Bribri, Cabécar, Maleku, Boruca, Ngäbe). Trazos
 * estilizados, nunca reproducciones literales.
 */
export default function TribalIcon({ name, size = 24, title, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    ...rest,
  }

  switch (name) {
    case 'home':
      // Rancho cónico (palenque) con círculo solar
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M4 20 L12 5 L20 20 Z" />
          <path d="M8 20 L8 14 L16 14 L16 20" />
          <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'edu':
    case 'tejido':
      // Telar: entramado de guarda tribal
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 10 L21 10 M3 14 L21 14" />
          <path d="M7 5 L7 19 M12 5 L12 19 M17 5 L17 19" />
          <circle cx="9.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'sab':
    case 'mascara':
      // Máscara ceremonial (silueta abstracta, NO réplica)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M6 4 C6 11 4 14 6 19 C9 22 15 22 18 19 C20 14 18 11 18 4 C15 5 9 5 6 4 Z" />
          <path d="M9 11 L10.5 13 L9 15" />
          <path d="M15 11 L13.5 13 L15 15" />
          <path d="M10 18 L14 18" />
        </svg>
      )
    case 'sal':
    case 'hoja':
      // Hoja medicinal con vena central (güitite / hombre grande)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M12 3 C18 6 20 13 14 20 C11 21 8 19 7 16 C5 9 8 5 12 3 Z" />
          <path d="M12 4 L10 19" />
          <path d="M11 9 L14 7 M10.5 13 L14 11 M10 17 L13 15" />
        </svg>
      )
    case 'trans':
      // Nodo ritual: tres círculos conectados (sync)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <circle cx="5" cy="7" r="2.2" />
          <circle cx="19" cy="7" r="2.2" />
          <circle cx="12" cy="18" r="2.2" />
          <path d="M7 8.5 L10 16 M17 8.5 L14 16 M7 7 L17 7" />
        </svg>
      )
    case 'esfera':
      // Esfera precolombina del Diquís
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <circle cx="12" cy="12" r="8" />
          <path d="M5 12 C8 10 16 10 19 12" opacity="0.5" />
          <path d="M5 12 C8 14 16 14 19 12" opacity="0.3" />
        </svg>
      )
    case 'espiral':
      // Petroglifo espiral (común en todo el Chibchá)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M12 12 m0 -6 a6 6 0 1 1 -6 6 a5 5 0 1 1 5 -5 a4 4 0 1 1 -4 4 a3 3 0 1 1 3 -3" />
        </svg>
      )
    case 'jaguar':
      // Jaguar estilizado (Sibö bribri)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M5 9 L7 6 L9 8 L15 8 L17 6 L19 9 L19 14 L17 16 L15 17 L9 17 L7 16 L5 14 Z" />
          <circle cx="9.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
          <path d="M11 14 L13 14" />
        </svg>
      )
    case 'rana':
      // Rana dorada (orfebrería precolombina)
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <ellipse cx="12" cy="13" rx="5" ry="4" />
          <circle cx="9.5" cy="10" r="1.2" />
          <circle cx="14.5" cy="10" r="1.2" />
          <path d="M6 13 L3 10 M6 16 L3 19 M18 13 L21 10 M18 16 L21 19" />
        </svg>
      )
    case 'rancho':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M3 20 L12 4 L21 20 Z" />
          <path d="M7 20 L7 14 L17 14 L17 20" />
        </svg>
      )
    case 'chacara':
      // Bolsa de fibra natural con trenzado
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M6 9 L18 9 L17 20 L7 20 Z" />
          <path d="M8 5 C10 7 14 7 16 5" />
          <path d="M7 13 L17 13 M7 16 L17 16" opacity="0.5" />
        </svg>
      )
    case 'ola':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M3 9 C6 6 9 12 12 9 C15 6 18 12 21 9" />
          <path d="M3 14 C6 11 9 17 12 14 C15 11 18 17 21 14" />
          <path d="M3 19 C6 16 9 22 12 19 C15 16 18 22 21 19" />
        </svg>
      )
    case 'cacao':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(20 12 12)" />
          <path d="M10 6 L12 10 L14 6 M10 18 L12 14 L14 18" opacity="0.5" />
          <path d="M9 12 L15 12" opacity="0.5" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M12 5 L12 19 M5 12 L19 12" strokeWidth="2" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20 L15.5 15.5" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11 L8 7 A4 4 0 0 1 16 7 L16 11" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg {...common}>
          {title && <title>{title}</title>}
          <path d="M9 6 L15 12 L9 18" />
        </svg>
      )
    default:
      return null
  }
}
