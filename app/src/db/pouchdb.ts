import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

/** Local databases — one per module, keeps data isolated */
export const dbEdu = new PouchDB('raices_edu')
export const dbSab = new PouchDB('raices_sab')
export const dbSal = new PouchDB('raices_sal')

/** Map of module → local PouchDB instance */
export const databases: Record<string, PouchDB.Database> = {
  edu: dbEdu,
  sab: dbSab,
  sal: dbSal,
}
