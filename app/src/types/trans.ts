export interface Usuario {
  _id: string
  _rev?: string
  type: 'usuario'
  nombre: string
  email: string
  rol_id: string
  pueblo: string
  comunidad: string
  idioma_preferido: string
  activo: boolean
  fecha_registro: string
}

export interface Rol {
  _id: string
  _rev?: string
  type: 'rol'
  nombre: string
  descripcion: string
  modulo: 'EDU' | 'SAB' | 'SAL' | 'TRANS'
  permisos: string[]
}

export interface LogAuditoria {
  _id: string
  _rev?: string
  type: 'log_auditoria'
  usuario_nombre: string
  accion: string
  entidad_tipo: string
  entidad_id: string
  detalle: string
  fecha: string
  resultado: 'exitoso' | 'denegado'
}

export interface SyncLog {
  _id: string
  _rev?: string
  type: 'sync_log'
  device_id: string
  fecha_sync: string
  estado: 'completado' | 'parcial' | 'fallido'
  registros_enviados: number
  registros_recibidos: number
  conflictos_detectados: number
  conflictos_resueltos: number
  modulo: 'EDU' | 'SAB' | 'SAL' | 'ALL'
}

export type TransDoc = Usuario | Rol | LogAuditoria | SyncLog
