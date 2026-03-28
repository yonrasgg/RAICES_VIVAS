import { useState, useEffect } from 'react'
import { syncManagers, type SyncState } from '@/db/sync'

const INITIAL: SyncState = {
  status: 'offline',
  pending: 0,
  lastSynced: null,
  error: null,
}

/**
 * Hook into a module's sync state.
 * @param mod – module key: 'edu' | 'sab' | 'sal'
 */
export function useSync(mod: string): SyncState {
  const [state, setState] = useState<SyncState>(INITIAL)

  useEffect(() => {
    const manager = syncManagers[mod]
    if (!manager) return
    return manager.subscribe(setState)
  }, [mod])

  return state
}
