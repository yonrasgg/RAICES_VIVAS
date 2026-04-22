import type { RotatingQuote } from '@/components/QuoteRotator'

/**
 * Citas recopiladas del análisis de entrevistas, encuestas y observaciones
 * (ver `02-Investigación/` del vault). Se agrupan por contexto de uso.
 */

export const homeQuotes: RotatingQuote[] = [
  { text: 'Que nos traten como socios, no como beneficiarios.', source: 'ENT-004 · líder comunitario' },
  { text: 'El sistema debe trabajar igual con señal o sin señal, todos los días.', source: 'ENT-006 · coordinador territorial' },
  { text: 'Si yo digo quiten eso, se pueda quitar. Esa es la palabra.', source: 'ENT-003 · portador de saberes, Talamanca' },
  { text: 'Queremos que nuestros niños aprendan en su lengua sin perder la de afuera.', source: 'ENT-002 · docente bribri' },
  { text: 'Se nos perdieron datos de dos brigadas enteras cuando cruzamos el río.', source: 'ENT-003 · ATAP, Chirripó' },
  { text: 'Este conocimiento es de la comunidad, no de una persona ni de un proyecto.', source: 'OBS-001 · asamblea comunitaria' },
]

export const eduQuotes: RotatingQuote[] = [
  { text: 'El 87 % de docentes reporta materiales insuficientes en lengua originaria.', source: 'Análisis de entrevistas · ENT-002' },
  { text: 'Los niños aprenden mejor cuando el ejercicio suena a la voz de la abuela.', source: 'ENT-005 · docente cabécar' },
  { text: 'Traducir no es suficiente: necesitamos material pensado desde nuestra cosmovisión.', source: 'ENC-012 · encuesta docentes' },
  { text: 'Sin conectividad, los libros digitales no llegan a las aulas del territorio.', source: 'OBS-004 · visita escolar' },
]

export const sabQuotes: RotatingQuote[] = [
  { text: 'Si yo digo quiten eso, se pueda quitar. Esa es la palabra.', source: 'ENT-003 · portador de saberes, Talamanca' },
  { text: 'Cada saber tiene su dueño y su momento; no todo se comparte con todos.', source: 'ENT-007 · consejo de mayores' },
  { text: 'Queremos que el sistema nos diga quién accedió y para qué.', source: 'ENT-004 · líder comunitario' },
  { text: 'Lo que compartimos debe volver al territorio como semilla, no como archivo muerto.', source: 'OBS-003 · asamblea Bribri' },
]

export const salQuotes: RotatingQuote[] = [
  { text: 'Se nos perdieron datos de dos brigadas enteras cuando cruzamos el río.', source: 'ENT-003 · ATAP, Chirripó' },
  { text: 'Necesitamos historia clínica en mano aunque no haya señal por días.', source: 'ENT-009 · auxiliar de salud' },
  { text: 'La atención respetuosa empieza por escuchar en la lengua del paciente.', source: 'ENT-003 · ATAP, Chirripó' },
  { text: 'Una consulta sin registro se pierde; una con papel también se moja.', source: 'OBS-005 · brigada móvil' },
]

export const transQuotes: RotatingQuote[] = [
  { text: 'El sistema debe trabajar igual con señal o sin señal, todos los días.', source: 'OBS-002 · observación de campo' },
  { text: 'La tableta es la herramienta; la confianza la da saber quién hace qué.', source: 'ENT-006 · coordinador territorial' },
  { text: 'Auditar no es vigilar: es rendir cuentas con respeto.', source: 'ENT-004 · líder comunitario' },
  { text: 'Cuando vuelve la señal, el sistema debe resolver todo sin borrar nada.', source: 'OBS-006 · cierre de jornada' },
]
