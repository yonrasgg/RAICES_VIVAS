export interface Paciente {
  _id: string
  _rev?: string
  type: 'paciente'
  id_interno: string
  nombre: string
  fecha_nacimiento: string
  sexo: string
  territorio: string
  comunidad: string
  tipo_sangre: string
  contacto: string
  estado: 'activo' | 'inactivo'
  fecha_registro: string
}

export interface HistorialMedico {
  _id: string
  _rev?: string
  type: 'historial_medico'
  paciente_id: string
  responsable: string
  fecha_visita: string
  motivo_consulta: string
  sintomas: string
  diagnostico: string
  tratamiento: string
  notas: string
  requiere_seguimiento: boolean
}

export interface Cita {
  _id: string
  _rev?: string
  type: 'cita'
  paciente_id: string
  paciente_nombre: string
  responsable: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  tipo_atencion: 'consulta' | 'control' | 'seguimiento' | 'emergencia'
  lugar: string
  estado: 'pendiente' | 'realizada' | 'cancelada'
  notas: string
}

export interface Brigada {
  _id: string
  _rev?: string
  type: 'brigada'
  nombre: string
  responsable: string
  territorio: string
  fecha_gira: string
  tipo: 'vacunacion' | 'tamizaje' | 'charla' | 'atencion_general'
  estado: 'planificada' | 'en_curso' | 'completada'
  pacientes_atendidos: number
}

export type SalDoc = Paciente | HistorialMedico | Cita | Brigada
