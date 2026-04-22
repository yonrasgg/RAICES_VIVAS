import { useState, useEffect, useCallback } from 'react'
import { databases } from '@/db/pouchdb'

interface UseDBOptions {
  /** Module key: 'edu' | 'sab' | 'sal' */
  mod: string
  /** PouchDB doc type to filter (e.g. 'docente') */
  type: string
  /** Optional selector fields beyond type */
  selector?: PouchDB.Find.Selector
}

interface UseDBResult<T> {
  docs: T[]
  loading: boolean
  error: string | null
  refetch: () => void
  put: (doc: T & { _id: string }) => Promise<void>
  remove: (doc: T & { _id: string; _rev?: string }) => Promise<void>
}

/**
 * CRUD hook for a PouchDB collection filtered by doc type.
 */
export function useDB<T extends { type: string }>(
  opts: UseDBOptions,
): UseDBResult<T> {
  const { mod, type, selector } = opts
  const db = databases[mod]

  const [docs, setDocs] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!db) return
    setLoading(true)
    try {
      const result = await db.find({
        selector: { type, ...selector },
      })
      setDocs(result.docs as unknown as T[])
      setError(null)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }, [db, type, selector])

  useEffect(() => {
    fetch()

    // Listen for changes to re-query
    const changes = db?.changes({ live: true, since: 'now' })
    changes?.on('change', fetch)
    return () => {
      changes?.cancel()
    }
  }, [db, fetch])

  const put = useCallback(
    async (doc: T & { _id: string }) => {
      if (!db) return
      await db.put(doc)
    },
    [db],
  )

  const remove = useCallback(
    async (doc: T & { _id: string; _rev?: string }) => {
      if (!db) return
      if (!doc._rev) {
        const existing = await db.get(doc._id)
        await db.remove(existing)
      } else {
        await db.remove(doc._id, doc._rev)
      }
    },
    [db],
  )

  return { docs, loading, error, refetch: fetch, put, remove }
}
