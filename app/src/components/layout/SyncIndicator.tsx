import { useSync } from '@/hooks/useSync'
import { useTranslation } from 'react-i18next'
import type { SyncStatus } from '@/db/sync'

const STATUS_COLORS: Record<SyncStatus, string> = {
  online: 'bg-green-400',
  syncing: 'bg-yellow-400 animate-pulse',
  offline: 'bg-gray-400',
  error: 'bg-red-500',
}

export default function SyncIndicator() {
  const { t } = useTranslation()
  const edu = useSync('edu')

  return (
    <div className="flex items-center gap-1.5 text-sm" title={t(`sync.${edu.status}`)}>
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_COLORS[edu.status]}`} />
      <span className="hidden sm:inline">{t(`sync.${edu.status}`)}</span>
    </div>
  )
}
