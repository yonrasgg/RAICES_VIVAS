import { useSync } from '@/hooks/useSync'
import { useTranslation } from 'react-i18next'
import type { SyncStatus } from '@/db/sync'

const STATUS_COLORS: Record<SyncStatus, string> = {
  online: 'bg-[color:var(--color-jungle-300)]',
  syncing: 'bg-[color:var(--color-ocre-400)] animate-pulse',
  offline: 'bg-[color:var(--color-bone-300)]',
  error: 'bg-[color:var(--color-cinabrio-500)]',
}

export default function SyncIndicator() {
  const { t } = useTranslation()
  const edu = useSync('edu')

  return (
    <div
      className="flex items-center gap-1.5 rounded-full bg-[color:var(--color-jungle-800)]/60 px-2.5 py-1 text-xs ring-1 ring-[color:var(--color-ocre-400)]/30"
      title={t(`sync.${edu.status}`)}
    >
      <span className={`inline-block h-2 w-2 rounded-full ${STATUS_COLORS[edu.status]}`} />
      <span className="hidden text-[color:var(--color-cream-100)]/90 sm:inline">
        {t(`sync.${edu.status}`)}
      </span>
    </div>
  )
}
