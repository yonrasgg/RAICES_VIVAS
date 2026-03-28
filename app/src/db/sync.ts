import PouchDB from 'pouchdb'
import { databases } from './pouchdb'

export type SyncStatus = 'offline' | 'syncing' | 'online' | 'error'

export interface SyncState {
  status: SyncStatus
  pending: number
  lastSynced: Date | null
  error: string | null
}

const INITIAL_STATE: SyncState = {
  status: 'offline',
  pending: 0,
  lastSynced: null,
  error: null,
}

type Listener = (state: SyncState) => void

/** Lightweight sync manager — one per module DB */
class SyncManager {
  private state: SyncState = { ...INITIAL_STATE }
  private listeners = new Set<Listener>()
  private replication: PouchDB.Replication.Sync<object> | null = null

  constructor(
    private local: PouchDB.Database,
    private remoteUrl: string,
  ) {}

  /** Subscribe to state changes; returns unsubscribe fn */
  subscribe(fn: Listener): () => void {
    this.listeners.add(fn)
    fn(this.state) // emit current immediately
    return () => this.listeners.delete(fn)
  }

  private emit(patch: Partial<SyncState>) {
    Object.assign(this.state, patch)
    this.listeners.forEach((fn) => fn({ ...this.state }))
  }

  /** Start live bidirectional replication */
  start() {
    if (this.replication) return

    const remote = new PouchDB(this.remoteUrl)

    this.replication = this.local.sync(remote, {
      live: true,
      retry: true,
    })

    this.replication
      .on('active', () => this.emit({ status: 'syncing', error: null }))
      .on('paused', () =>
        this.emit({ status: 'online', lastSynced: new Date() }),
      )
      .on('change', (info) => {
        const pending = info.change?.pending ?? 0
        this.emit({ pending })
      })
      .on('denied', (err) =>
        this.emit({ status: 'error', error: String(err) }),
      )
      .on('error', (err) =>
        this.emit({ status: 'error', error: String(err) }),
      )
  }

  stop() {
    this.replication?.cancel()
    this.replication = null
    this.emit({ status: 'offline' })
  }
}

/**
 * Build sync managers for each module.
 * Remote URL comes from env — defaults to localhost CouchDB for dev.
 */
const COUCH_BASE =
  import.meta.env.VITE_COUCHDB_URL ?? 'http://localhost:5984'

export const syncManagers: Record<string, SyncManager> = Object.fromEntries(
  Object.entries(databases).map(([mod, db]) => [
    mod,
    new SyncManager(db, `${COUCH_BASE}/raices_${mod}`),
  ]),
)

/** Start all sync managers */
export function startAllSync() {
  Object.values(syncManagers).forEach((m) => m.start())
}

/** Stop all sync managers */
export function stopAllSync() {
  Object.values(syncManagers).forEach((m) => m.stop())
}
