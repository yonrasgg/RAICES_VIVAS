import { databases } from '@/db/pouchdb'
import type { Docente, Estudiante, MaterialEducativo, Ejercicio } from '@/types/edu'
import type { Saber, CategoriaSaber, PortadorSaber } from '@/types/sab'
import type { Paciente, Cita, Brigada } from '@/types/sal'

const SEED_KEY = 'raices_seeded_v2'

/* ------------------------------------------------------------------ */
/*  EDU                                                                */
/* ------------------------------------------------------------------ */

const docentes: Docente[] = [
  { _id: 'doc-001', type: 'docente', nombre: 'María Díaz Morales', territorio: 'Talamanca', rol: 'Docente bilingüe', contacto: '8845-1234', lengua_dominante: 'Bribri', nivel_academico: 'Licenciatura', activo: true },
  { _id: 'doc-002', type: 'docente', nombre: 'Juan Ortiz Segura', territorio: 'Cabagra', rol: 'Docente unidocente', contacto: '8890-5678', lengua_dominante: 'Cabécar', nivel_academico: 'Bachillerato', activo: true },
  { _id: 'doc-003', type: 'docente', nombre: 'Ana Salazar Torres', territorio: 'Conte Burica', rol: 'Coordinadora pedagógica', contacto: '8701-9999', lengua_dominante: 'Ngäbe', nivel_academico: 'Maestría', activo: true },
  { _id: 'doc-004', type: 'docente', nombre: 'Carlos Ríos Ulate', territorio: 'Chirripó', rol: 'Docente bilingüe', contacto: '8623-4567', lengua_dominante: 'Cabécar', nivel_academico: 'Licenciatura', activo: false },
]

const estudiantes: Estudiante[] = [
  { _id: 'est-001', type: 'estudiante', nombre: 'Keylor Sibar López', nivel_educativo: 'Primaria - 3°', lengua_principal: 'Bribri', centro_educativo: 'Escuela de Amubri', territorio: 'Talamanca' },
  { _id: 'est-002', type: 'estudiante', nombre: 'Ditsö Morales Díaz', nivel_educativo: 'Primaria - 5°', lengua_principal: 'Bribri', centro_educativo: 'Escuela de Amubri', territorio: 'Talamanca' },
  { _id: 'est-003', type: 'estudiante', nombre: 'Yulök Ortiz Blanco', nivel_educativo: 'Primaria - 2°', lengua_principal: 'Cabécar', centro_educativo: 'Escuela de Chirripó', territorio: 'Chirripó' },
  { _id: 'est-004', type: 'estudiante', nombre: 'Nairi Segura Palacios', nivel_educativo: 'Primaria - 4°', lengua_principal: 'Cabécar', centro_educativo: 'Escuela de Cabagra', territorio: 'Cabagra' },
  { _id: 'est-005', type: 'estudiante', nombre: 'Juri Torres Lezcano', nivel_educativo: 'Primaria - 6°', lengua_principal: 'Ngäbe', centro_educativo: 'Escuela Conte Burica', territorio: 'Conte Burica' },
  { _id: 'est-006', type: 'estudiante', nombre: 'Siwá Díaz Coronado', nivel_educativo: 'Primaria - 1°', lengua_principal: 'Bribri', centro_educativo: 'Escuela de Amubri', territorio: 'Talamanca' },
]

const materiales: MaterialEducativo[] = [
  { _id: 'mat-001', type: 'material_educativo', titulo: 'Vocabulario Bribri — Animales del bosque', idioma: 'bri', nivel: 'Primaria - 3°', tema: 'Lengua Bribri', formato: 'texto', asignatura: 'Lengua indígena', competencia: 'Comunicación oral', creado_por: 'doc-001', fecha_creacion: '2026-03-10' },
  { _id: 'mat-002', type: 'material_educativo', titulo: 'Cantos tradicionales Cabécar', idioma: 'cab', nivel: 'Primaria - 2°', tema: 'Cultura', formato: 'audio', asignatura: 'Educación cultural', competencia: 'Valoración cultural', creado_por: 'doc-002', fecha_creacion: '2026-03-12' },
  { _id: 'mat-003', type: 'material_educativo', titulo: 'Matemáticas con semillas', idioma: 'es', nivel: 'Primaria - 1°', tema: 'Matemáticas', formato: 'imagen', asignatura: 'Matemáticas', competencia: 'Resolución de problemas', creado_por: 'doc-001', fecha_creacion: '2026-03-15' },
  { _id: 'mat-004', type: 'material_educativo', titulo: 'Historia oral — Sĩbö y la creación', idioma: 'bri', nivel: 'Primaria - 5°', tema: 'Cosmovisión', formato: 'video', asignatura: 'Estudios Sociales', competencia: 'Identidad cultural', creado_por: 'doc-001', fecha_creacion: '2026-03-18' },
  { _id: 'mat-005', type: 'material_educativo', titulo: 'Ngäbere — Saludos y presentaciones', idioma: 'ngb', nivel: 'Primaria - 4°', tema: 'Lengua Ngäbe', formato: 'texto', asignatura: 'Lengua indígena', competencia: 'Comunicación escrita', creado_por: 'doc-003', fecha_creacion: '2026-03-20' },
]

const ejercicios: Ejercicio[] = [
  { _id: 'ej-001', type: 'ejercicio', tema: 'Animales del bosque', nivel: 'Primaria - 3°', tipo_item: 'opcion_multiple', material_id: 'mat-001' },
  { _id: 'ej-002', type: 'ejercicio', tema: 'Cantos tradicionales', nivel: 'Primaria - 2°', tipo_item: 'produccion_oral', material_id: 'mat-002' },
  { _id: 'ej-003', type: 'ejercicio', tema: 'Conteo con semillas', nivel: 'Primaria - 1°', tipo_item: 'completar', material_id: 'mat-003' },
  { _id: 'ej-004', type: 'ejercicio', tema: 'Saludos Ngäbe', nivel: 'Primaria - 4°', tipo_item: 'pareo', material_id: 'mat-005' },
]

/* ------------------------------------------------------------------ */
/*  SAB                                                                */
/* ------------------------------------------------------------------ */

const categorias: CategoriaSaber[] = [
  { _id: 'cat-001', type: 'categoria_saber', nombre: 'Agricultura tradicional', descripcion: 'Prácticas agrícolas ancestrales, ciclos de siembra y cosecha' },
  { _id: 'cat-002', type: 'categoria_saber', nombre: 'Medicina natural', descripcion: 'Uso de plantas medicinales y prácticas de sanación' },
  { _id: 'cat-003', type: 'categoria_saber', nombre: 'Artesanía', descripcion: 'Tejidos, cestería, instrumentos y artes tradicionales' },
  { _id: 'cat-004', type: 'categoria_saber', nombre: 'Cosmovisión y ritualidad', descripcion: 'Historias de creación, ceremonias y espiritualidad' },
]

const portadores: PortadorSaber[] = [
  { _id: 'port-001', type: 'portador_saber', nombre: 'Awá Eligio Almengor', comunidad: 'Amubri', especialidad: 'ritualidad', lengua_principal: 'Bribri', activo: true },
  { _id: 'port-002', type: 'portador_saber', nombre: 'Doña Faustina Lázaro', comunidad: 'Shiroles', especialidad: 'medicina', lengua_principal: 'Bribri', activo: true },
  { _id: 'port-003', type: 'portador_saber', nombre: 'Don Bernardo Mayorga', comunidad: 'Cabagra', especialidad: 'agricultura', lengua_principal: 'Cabécar', activo: true },
  { _id: 'port-004', type: 'portador_saber', nombre: 'Señora Juana Lezcano', comunidad: 'Conte Burica', especialidad: 'artesanía', lengua_principal: 'Ngäbe', activo: true },
]

const saberes: Saber[] = [
  { _id: 'sab-001', type: 'saber', titulo: 'Siembra según las fases lunares', descripcion: 'Conocimiento sobre los ciclos de siembra de maíz, frijol y cacao según las fases de la luna. Se siembra en luna llena para garantizar buen crecimiento.', categoria: 'cat-001', portador_id: 'port-003', portador_nombre: 'Don Bernardo Mayorga', comunidad: 'Cabagra', territorio: 'Cabagra', formato: 'texto', idioma: 'cab', contexto_uso: 'Ciclos agrícolas anuales', nivel_acceso: 'publico', etiquetas: ['agricultura', 'luna', 'cacao'], estado: 'publicado', fecha_registro: '2026-03-05' },
  { _id: 'sab-002', type: 'saber', titulo: 'Uso medicinal del hombre grande', descripcion: 'La raíz de la planta "hombre grande" (Quassia amara) se usa en infusión para tratar fiebres, parásitos y problemas estomacales.', categoria: 'cat-002', portador_id: 'port-002', portador_nombre: 'Doña Faustina Lázaro', comunidad: 'Shiroles', territorio: 'Talamanca', formato: 'texto', idioma: 'bri', contexto_uso: 'Medicina preventiva comunitaria', nivel_acceso: 'comunitario', etiquetas: ['medicina', 'plantas', 'hombre grande'], estado: 'publicado', fecha_registro: '2026-03-08' },
  { _id: 'sab-003', type: 'saber', titulo: 'Tejido de canasta jícara', descripcion: 'Técnica ancestral para tejer canastas con fibra de jícara (Crescentia cujete). Se recogen las fibras en época seca y se dejan secar al sol tres días.', categoria: 'cat-003', portador_id: 'port-004', portador_nombre: 'Señora Juana Lezcano', comunidad: 'Conte Burica', territorio: 'Conte Burica', formato: 'video', idioma: 'ngb', contexto_uso: 'Artesanía cotidiana y comercio', nivel_acceso: 'publico', etiquetas: ['artesanía', 'cestería', 'jícara'], estado: 'publicado', fecha_registro: '2026-03-12' },
  { _id: 'sab-004', type: 'saber', titulo: 'Historia de Sĩbö y la semilla de cacao', descripcion: 'Relato sobre cómo Sĩbö transformó la sangre de los clanes en semillas de cacao para crear el mundo. Saber ceremonial transmitido por el Awá.', categoria: 'cat-004', portador_id: 'port-001', portador_nombre: 'Awá Eligio Almengor', comunidad: 'Amubri', territorio: 'Talamanca', formato: 'audio', idioma: 'bri', contexto_uso: 'Ceremonias y formación espiritual', nivel_acceso: 'ceremonial', etiquetas: ['cosmovisión', 'Sĩbö', 'cacao', 'ceremonia'], estado: 'restringido', fecha_registro: '2026-03-15' },
  { _id: 'sab-005', type: 'saber', titulo: 'Preparación de chicha de maíz', descripcion: 'Proceso tradicional para preparar chicha de maíz para celebraciones comunitarias. El maíz se muele en piedra y se fermenta por 3 días.', categoria: 'cat-001', portador_id: 'port-003', portador_nombre: 'Don Bernardo Mayorga', comunidad: 'Cabagra', territorio: 'Cabagra', formato: 'texto', idioma: 'cab', contexto_uso: 'Festividades y reuniones comunitarias', nivel_acceso: 'publico', etiquetas: ['gastronomía', 'maíz', 'chicha'], estado: 'publicado', fecha_registro: '2026-03-18' },
]

/* ------------------------------------------------------------------ */
/*  SAL                                                                */
/* ------------------------------------------------------------------ */

const pacientes: Paciente[] = [
  { _id: 'pac-001', type: 'paciente', id_interno: 'SAL-0001-2026', nombre: 'Rosa Morales Sibar', fecha_nacimiento: '1975-04-12', sexo: 'F', territorio: 'Talamanca', comunidad: 'Amubri', tipo_sangre: 'O+', contacto: '8834-1111', estado: 'activo', fecha_registro: '2026-01-15' },
  { _id: 'pac-002', type: 'paciente', id_interno: 'SAL-0002-2026', nombre: 'Pedro Ortiz Blanco', fecha_nacimiento: '1988-09-23', sexo: 'M', territorio: 'Chirripó', comunidad: 'Grano de Oro', tipo_sangre: 'A+', contacto: '8856-2222', estado: 'activo', fecha_registro: '2026-01-20' },
  { _id: 'pac-003', type: 'paciente', id_interno: 'SAL-0003-2026', nombre: 'Lucía Torres Lezcano', fecha_nacimiento: '2010-02-08', sexo: 'F', territorio: 'Conte Burica', comunidad: 'Alto Laguna', tipo_sangre: 'B+', contacto: '8701-3333', estado: 'activo', fecha_registro: '2026-02-01' },
  { _id: 'pac-004', type: 'paciente', id_interno: 'SAL-0004-2026', nombre: 'Miguel Díaz Coronado', fecha_nacimiento: '1960-11-30', sexo: 'M', territorio: 'Talamanca', comunidad: 'Shiroles', tipo_sangre: 'O-', contacto: '8845-4444', estado: 'activo', fecha_registro: '2026-02-10' },
  { _id: 'pac-005', type: 'paciente', id_interno: 'SAL-0005-2026', nombre: 'Carmen Segura Vargas', fecha_nacimiento: '1995-07-19', sexo: 'F', territorio: 'Cabagra', comunidad: 'Cabagra Centro', tipo_sangre: 'AB+', contacto: '8690-5555', estado: 'activo', fecha_registro: '2026-02-15' },
]

const citas: Cita[] = [
  { _id: 'cit-001', type: 'cita', paciente_id: 'pac-001', paciente_nombre: 'Rosa Morales Sibar', responsable: 'Dr. Fernández', fecha: '2026-04-21', hora_inicio: '08:00', hora_fin: '08:30', tipo_atencion: 'control', lugar: 'EBAIS Amubri', estado: 'pendiente', notas: 'Control de presión arterial mensual' },
  { _id: 'cit-002', type: 'cita', paciente_id: 'pac-003', paciente_nombre: 'Lucía Torres Lezcano', responsable: 'ATAP Rodríguez', fecha: '2026-04-21', hora_inicio: '09:00', hora_fin: '09:30', tipo_atencion: 'consulta', lugar: 'Puesto de Salud Alto Laguna', estado: 'pendiente', notas: 'Revisión pediátrica' },
  { _id: 'cit-003', type: 'cita', paciente_id: 'pac-002', paciente_nombre: 'Pedro Ortiz Blanco', responsable: 'Dr. Fernández', fecha: '2026-04-22', hora_inicio: '10:00', hora_fin: '10:30', tipo_atencion: 'seguimiento', lugar: 'EBAIS Chirripó', estado: 'pendiente', notas: 'Seguimiento tratamiento diabetes' },
  { _id: 'cit-004', type: 'cita', paciente_id: 'pac-004', paciente_nombre: 'Miguel Díaz Coronado', responsable: 'ATAP Rodríguez', fecha: '2026-04-19', hora_inicio: '14:00', hora_fin: '14:45', tipo_atencion: 'consulta', lugar: 'EBAIS Amubri', estado: 'realizada', notas: 'Dolor lumbar crónico, referencia a hospital' },
]

const brigadas: Brigada[] = [
  { _id: 'bri-001', type: 'brigada', nombre: 'Vacunación Talamanca Sur', responsable: 'Dr. Fernández', territorio: 'Talamanca', fecha_gira: '2026-04-25', tipo: 'vacunacion', estado: 'planificada', pacientes_atendidos: 0 },
  { _id: 'bri-002', type: 'brigada', nombre: 'Tamizaje Chirripó', responsable: 'ATAP Rodríguez', territorio: 'Chirripó', fecha_gira: '2026-04-18', tipo: 'tamizaje', estado: 'completada', pacientes_atendidos: 34 },
]

/* ------------------------------------------------------------------ */
/*  Seed runner                                                        */
/* ------------------------------------------------------------------ */

async function seedDB(mod: string, docs: Array<{ _id: string }>) {
  const db = databases[mod]
  if (!db) return
  for (const doc of docs) {
    try {
      await db.get(doc._id)
      // already exists — skip
    } catch {
      await db.put(doc)
    }
  }
}

export async function seedAll() {
  if (localStorage.getItem(SEED_KEY)) return
  await Promise.all([
    seedDB('edu', [...docentes, ...estudiantes, ...materiales, ...ejercicios]),
    seedDB('sab', [...categorias, ...portadores, ...saberes]),
    seedDB('sal', [...pacientes, ...citas, ...brigadas]),
  ])
  localStorage.setItem(SEED_KEY, Date.now().toString())
}
