export interface PortadorSaber {
  _id: string
  _rev?: string
  type: 'portador_saber'
  nombre: string
  comunidad: string
  especialidad: 'agricultura' | 'medicina' | 'artesanía' | 'ritualidad'
  lengua_principal: string
  activo: boolean
}

export interface CategoriaSaber {
  _id: string
  _rev?: string
  type: 'categoria_saber'
  nombre: string
  descripcion: string
}

export interface Saber {
  _id: string
  _rev?: string
  type: 'saber'
  titulo: string
  descripcion: string
  categoria: string
  portador_id: string
  portador_nombre: string
  comunidad: string
  territorio: string
  formato: 'texto' | 'audio' | 'video' | 'imagen'
  idioma: string
  contexto_uso: string
  nivel_acceso: 'publico' | 'comunitario' | 'restringido' | 'ceremonial'
  etiquetas: string[]
  estado: 'borrador' | 'publicado' | 'restringido' | 'revocado'
  fecha_registro: string
}

export interface Consentimiento {
  _id: string
  _rev?: string
  type: 'consentimiento'
  saber_id: string
  portador_id: string
  tipo: 'oral_grabado' | 'escrito'
  nivel_acceso_autorizado: string
  estado: 'pendiente' | 'confirmado' | 'revocado'
  fecha_consentimiento: string
}

export type SabDoc = PortadorSaber | CategoriaSaber | Saber | Consentimiento
