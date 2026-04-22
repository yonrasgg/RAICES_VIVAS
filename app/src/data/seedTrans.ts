import { databases } from '@/db/pouchdb'
import type { Usuario, Rol, LogAuditoria, SyncLog } from '@/types/trans'

const SEED_KEY = 'raices_trans_seeded_v1'

const roles: Rol[] = [
  { _id: 'rol-001', type: 'rol', nombre: 'Administrador', descripcion: 'Acceso total al sistema, gestión de usuarios y configuración', modulo: 'TRANS', permisos: ['crear', 'leer', 'editar', 'eliminar', 'admin'] },
  { _id: 'rol-002', type: 'rol', nombre: 'Docente', descripcion: 'Gestión de materiales educativos, estudiantes y ejercicios', modulo: 'EDU', permisos: ['crear', 'leer', 'editar'] },
  { _id: 'rol-003', type: 'rol', nombre: 'Promotor de Salud', descripcion: 'Registro de pacientes, citas y brigadas de salud', modulo: 'SAL', permisos: ['crear', 'leer', 'editar'] },
  { _id: 'rol-004', type: 'rol', nombre: 'Portador de Saber', descripcion: 'Documentación de saberes ancestrales con control de acceso', modulo: 'SAB', permisos: ['crear', 'leer'] },
  { _id: 'rol-005', type: 'rol', nombre: 'Líder Comunitario', descripcion: 'Supervisión general, aprobación de contenido restringido/ceremonial', modulo: 'TRANS', permisos: ['leer', 'editar', 'aprobar'] },
  { _id: 'rol-006', type: 'rol', nombre: 'Visitante', descripcion: 'Acceso de solo lectura a contenido público', modulo: 'TRANS', permisos: ['leer'] },
]

const usuarios: Usuario[] = [
  { _id: 'usr-001', type: 'usuario', nombre: 'María Díaz Morales', email: 'maria.diaz@raicesvivas.org', rol_id: 'rol-002', pueblo: 'Bribri', comunidad: 'Amubri', idioma_preferido: 'bri', activo: true, fecha_registro: '2026-01-10' },
  { _id: 'usr-002', type: 'usuario', nombre: 'Juan Ortiz Segura', email: 'juan.ortiz@raicesvivas.org', rol_id: 'rol-002', pueblo: 'Cabécar', comunidad: 'Cabagra', idioma_preferido: 'cab', activo: true, fecha_registro: '2026-01-12' },
  { _id: 'usr-003', type: 'usuario', nombre: 'Ana Salazar Torres', email: 'ana.salazar@raicesvivas.org', rol_id: 'rol-001', pueblo: 'Ngäbe', comunidad: 'Conte Burica', idioma_preferido: 'es', activo: true, fecha_registro: '2026-01-05' },
  { _id: 'usr-004', type: 'usuario', nombre: 'Awá Eligio Almengor', email: 'eligio.almengor@raicesvivas.org', rol_id: 'rol-004', pueblo: 'Bribri', comunidad: 'Amubri', idioma_preferido: 'bri', activo: true, fecha_registro: '2026-02-01' },
  { _id: 'usr-005', type: 'usuario', nombre: 'Dr. Carlos Fernández', email: 'carlos.fernandez@raicesvivas.org', rol_id: 'rol-003', pueblo: 'Bribri', comunidad: 'Shiroles', idioma_preferido: 'es', activo: true, fecha_registro: '2026-01-20' },
  { _id: 'usr-006', type: 'usuario', nombre: 'Don Bernardo Mayorga', email: 'bernardo.mayorga@raicesvivas.org', rol_id: 'rol-005', pueblo: 'Cabécar', comunidad: 'Cabagra', idioma_preferido: 'cab', activo: true, fecha_registro: '2026-02-15' },
  { _id: 'usr-007', type: 'usuario', nombre: 'Doña Faustina Lázaro', email: 'faustina.lazaro@raicesvivas.org', rol_id: 'rol-004', pueblo: 'Bribri', comunidad: 'Shiroles', idioma_preferido: 'bri', activo: true, fecha_registro: '2026-02-20' },
  { _id: 'usr-008', type: 'usuario', nombre: 'ATAP Rodríguez', email: 'atap.rodriguez@raicesvivas.org', rol_id: 'rol-003', pueblo: 'Cabécar', comunidad: 'Grano de Oro', idioma_preferido: 'es', activo: false, fecha_registro: '2026-03-01' },
]

const auditoria: LogAuditoria[] = [
  { _id: 'aud-001', type: 'log_auditoria', usuario_nombre: 'Ana Salazar Torres', accion: 'crear', entidad_tipo: 'usuario', entidad_id: 'usr-004', detalle: 'Registro de portador de saber Awá Eligio Almengor', fecha: '2026-02-01T10:30:00', resultado: 'exitoso' },
  { _id: 'aud-002', type: 'log_auditoria', usuario_nombre: 'María Díaz Morales', accion: 'crear', entidad_tipo: 'material_educativo', entidad_id: 'mat-001', detalle: 'Subida de material: Vocabulario Bribri — Animales del bosque', fecha: '2026-03-10T14:15:00', resultado: 'exitoso' },
  { _id: 'aud-003', type: 'log_auditoria', usuario_nombre: 'Awá Eligio Almengor', accion: 'crear', entidad_tipo: 'saber', entidad_id: 'sab-004', detalle: 'Documentación de saber ceremonial: Historia de Sĩbö', fecha: '2026-03-15T09:00:00', resultado: 'exitoso' },
  { _id: 'aud-004', type: 'log_auditoria', usuario_nombre: 'Dr. Carlos Fernández', accion: 'crear', entidad_tipo: 'cita', entidad_id: 'cit-001', detalle: 'Programación de cita de control para Rosa Morales', fecha: '2026-04-18T16:00:00', resultado: 'exitoso' },
  { _id: 'aud-005', type: 'log_auditoria', usuario_nombre: 'usuario_anonimo', accion: 'leer', entidad_tipo: 'saber', entidad_id: 'sab-004', detalle: 'Intento de acceso a saber ceremonial sin permisos', fecha: '2026-04-10T11:45:00', resultado: 'denegado' },
  { _id: 'aud-006', type: 'log_auditoria', usuario_nombre: 'Ana Salazar Torres', accion: 'editar', entidad_tipo: 'rol', entidad_id: 'rol-005', detalle: 'Actualización de permisos del Líder Comunitario', fecha: '2026-03-20T08:30:00', resultado: 'exitoso' },
  { _id: 'aud-007', type: 'log_auditoria', usuario_nombre: 'Don Bernardo Mayorga', accion: 'crear', entidad_tipo: 'saber', entidad_id: 'sab-005', detalle: 'Documentación: Preparación de chicha de maíz', fecha: '2026-03-18T13:00:00', resultado: 'exitoso' },
  { _id: 'aud-008', type: 'log_auditoria', usuario_nombre: 'María Díaz Morales', accion: 'editar', entidad_tipo: 'estudiante', entidad_id: 'est-002', detalle: 'Actualización de nivel educativo de Ditsö Morales', fecha: '2026-04-05T10:00:00', resultado: 'exitoso' },
]

const syncLogs: SyncLog[] = [
  { _id: 'sync-001', type: 'sync_log', device_id: 'device-amubri-01', fecha_sync: '2026-04-19T08:00:00', estado: 'completado', registros_enviados: 12, registros_recibidos: 8, conflictos_detectados: 0, conflictos_resueltos: 0, modulo: 'ALL' },
  { _id: 'sync-002', type: 'sync_log', device_id: 'device-chiripo-01', fecha_sync: '2026-04-18T17:30:00', estado: 'completado', registros_enviados: 5, registros_recibidos: 15, conflictos_detectados: 1, conflictos_resueltos: 1, modulo: 'SAL' },
  { _id: 'sync-003', type: 'sync_log', device_id: 'device-cabagra-01', fecha_sync: '2026-04-17T12:00:00', estado: 'parcial', registros_enviados: 3, registros_recibidos: 0, conflictos_detectados: 2, conflictos_resueltos: 1, modulo: 'EDU' },
  { _id: 'sync-004', type: 'sync_log', device_id: 'device-conteburica-01', fecha_sync: '2026-04-16T09:15:00', estado: 'fallido', registros_enviados: 0, registros_recibidos: 0, conflictos_detectados: 0, conflictos_resueltos: 0, modulo: 'SAB' },
  { _id: 'sync-005', type: 'sync_log', device_id: 'device-amubri-01', fecha_sync: '2026-04-15T20:00:00', estado: 'completado', registros_enviados: 20, registros_recibidos: 14, conflictos_detectados: 0, conflictos_resueltos: 0, modulo: 'ALL' },
  { _id: 'sync-006', type: 'sync_log', device_id: 'device-shiroles-01', fecha_sync: '2026-04-14T11:30:00', estado: 'completado', registros_enviados: 7, registros_recibidos: 9, conflictos_detectados: 0, conflictos_resueltos: 0, modulo: 'EDU' },
]

async function seedDB(docs: Array<{ _id: string }>) {
  const db = databases['trans']
  if (!db) return
  for (const doc of docs) {
    try {
      await db.get(doc._id)
    } catch {
      await db.put(doc)
    }
  }
}

export async function seedTrans() {
  if (localStorage.getItem(SEED_KEY)) return
  await seedDB([...roles, ...usuarios, ...auditoria, ...syncLogs])
  localStorage.setItem(SEED_KEY, Date.now().toString())
}
