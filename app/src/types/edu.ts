/** EDU module domain types — mirrors ER model from Modelo de Datos */

export interface Docente {
  _id: string
  _rev?: string
  type: 'docente'
  nombre: string
  territorio: string
  rol: string
  contacto: string
  lengua_dominante: string
  nivel_academico: string
  activo: boolean
}

export interface Estudiante {
  _id: string
  _rev?: string
  type: 'estudiante'
  nombre: string
  nivel_educativo: string
  lengua_principal: string
  centro_educativo: string
  territorio: string
}

export interface MaterialEducativo {
  _id: string
  _rev?: string
  type: 'material_educativo'
  titulo: string
  idioma: string
  nivel: string
  tema: string
  formato: 'texto' | 'audio' | 'video' | 'imagen'
  asignatura: string
  competencia: string
  creado_por: string // docente _id
  fecha_creacion: string
}

export interface Ejercicio {
  _id: string
  _rev?: string
  type: 'ejercicio'
  tema: string
  nivel: string
  tipo_item: 'opcion_multiple' | 'completar' | 'pareo' | 'produccion_oral'
  material_id: string
}

export interface Intento {
  _id: string
  _rev?: string
  type: 'intento'
  estudiante_id: string
  ejercicio_id: string
  correcto: boolean
  fecha: string
}

export type EduDoc =
  | Docente
  | Estudiante
  | MaterialEducativo
  | Ejercicio
  | Intento
