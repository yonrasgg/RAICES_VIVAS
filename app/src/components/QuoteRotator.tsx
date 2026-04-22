import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export interface RotatingQuote {
  text: string
  source: string
}

interface Props {
  quotes: RotatingQuote[]
  /** Milisegundos por cita. Default 6000. */
  interval?: number
  /** Milisegundos de crossfade. Default 450. */
  fade?: number
  /** Clase aplicada al <blockquote> (para conservar el estilo existente). */
  blockquoteClassName?: string
  /** Estilo inline aplicado al <blockquote> (ej. borderColor dinámico). */
  blockquoteStyle?: CSSProperties
  /** Clase aplicada al <footer>. */
  footerClassName?: string
  /** Si true, envuelve el texto en «comillas». Default true. */
  withGuillemets?: boolean
}

/**
 * Rota varias citas en el mismo bloque conservando el estilo del <blockquote>
 * original (sin fondo, sin cambio de fuente, sin decoración extra).
 * Hace crossfade suave entre citas y respeta `prefers-reduced-motion`.
 */
export default function QuoteRotator({
  quotes,
  interval = 6000,
  fade = 450,
  blockquoteClassName,
  blockquoteStyle,
  footerClassName,
  withGuillemets = true,
}: Props): ReactNode {
  const safe = quotes.length > 0 ? quotes : [{ text: '', source: '' }]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (safe.length <= 1) return
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const tick = () => {
      if (pausedRef.current) return
      if (reduce) {
        setIdx((i) => (i + 1) % safe.length)
        return
      }
      setVisible(false)
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % safe.length)
        setVisible(true)
      }, fade)
    }
    const id = window.setInterval(tick, interval)
    return () => window.clearInterval(id)
  }, [safe.length, interval, fade])

  const current = safe[idx]
  const q = withGuillemets ? `«${current.text}»` : current.text

  return (
    <blockquote
      className={blockquoteClassName}
      style={{
        ...blockquoteStyle,
        transition: `opacity ${fade}ms ease`,
        opacity: visible ? 1 : 0,
      }}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      aria-live="polite"
    >
      {q}
      {current.source && (
        <footer className={footerClassName}>— {current.source}</footer>
      )}
    </blockquote>
  )
}
