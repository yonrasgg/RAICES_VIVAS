---
type: encuesta
id: ENC-EDU-01
title: "Encuesta — Necesidades Tecnológicas y Pedagógicas del Docente Comunitario"
module: educacion
status: approved
target_population: "Docentes comunitarios de territorios indígenas"
sample_size: 30
method: "Cerrado + Likert 5 puntos"
language: "Español / Bribri / Cabécar / Maleku / Ngäbere (según territorio)"
author: Geovanny
reviewer: Equipo
created: 2026-03-20
updated: 2026-03-27
related_requirements:
  - RF-EDU-01
  - RF-EDU-02
  - RF-EDU-03
  - RF-EDU-04
  - RF-EDU-05
  - RF-EDU-06
tags:
  - investigación
  - encuesta
  - educación
  - instrumento
---

← [[02-Investigación/Encuestas/Enfoque-Metodológico|Volver a Metodología]]

# ENC-EDU-01: Necesidades Tecnológicas y Pedagógicas del Docente Comunitario

## Objetivo

Identificar las necesidades, prácticas actuales y barreras del docente comunitario en relación con materiales educativos interculturales bilingües, uso de tecnología y seguimiento académico de estudiantes en territorios indígenas.

## Población Objetivo

- **Quién:** Docentes comunitarios que laboran en centros educativos dentro o cerca de territorios indígenas
- **Muestra estimada:** n ≈ 30 (distribuidos en al menos 4 territorios)
- **Criterio de inclusión:** Al menos 1 año de experiencia docente en territorio indígena
- **Método de muestreo:** Intencional por conveniencia + bola de nieve (referidos por ADI)

## Protocolo de Aplicación

1. Obtener consentimiento comunitario (ADI) y individual
2. Aplicar presencialmente o vía tableta (modo offline)
3. Duración estimada: 15-20 minutos
4. Si el docente prefiere responder en lengua indígena, un traductor comunitario asiste
5. Las respuestas se registran digitalmente y se almacenan en `08-Recursos/Datos/encuestas-edu-respuestas.csv`

---

## Instrumento

### Sección A — Datos del Participante

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| A1 | Territorio indígena donde labora | Selección | Guatuso, Talamanca Bribri, Talamanca Cabécar, Boruca, Térraba, Quitirrisí, otro |
| A2 | Pueblo indígena al que pertenece o con el que trabaja | Selección | Bribri, Cabécar, Maleku, Boruca, Térraba, Ngäbe, Huetar, otro, no indígena |
| A3 | Años de experiencia docente en territorio indígena | Numérico | Rango 1-30 |
| A4 | Nivel educativo que atiende | Multi-selección | Preescolar, I ciclo, II ciclo, III ciclo, diversificado |
| A5 | Lengua(s) indígena(s) que domina | Multi-selección | Bribri, Cabécar, Maleku, Boruca, Ngäbere, ninguna, otra |
| A6 | Nivel de dominio tecnológico autopercibido | Likert 5 | 1=Ninguno … 5=Avanzado |

### Sección B — Materiales Educativos Actuales

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| B1 | ¿Con qué tipo de materiales educativos cuenta actualmente? | Multi-selección | Libros MEP, fotocopias, material propio, digital, audio, video, ninguno |
| B2 | ¿Tiene acceso a materiales en lengua indígena? | Selección | Sí suficiente, Sí pero insuficiente, No |
| B3 | ¿Cómo califica la pertinencia cultural de los materiales MEP para su contexto? | Likert 5 | 1=Nada pertinente … 5=Muy pertinente |
| B4 | ¿Ha creado materiales propios adaptados a la realidad de la comunidad? | Sí/No | + campo abierto si sí |
| B5 | ¿Cuál es la principal barrera para obtener materiales adecuados? | Selección + otro | Costo, idioma, pertinencia, acceso, conectividad, otro |

### Sección C — Tecnología y Conectividad

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| C1 | ¿Tiene acceso a internet en el centro educativo? | Selección | Sí estable, Sí intermitente, No |
| C2 | ¿Tiene acceso a electricidad confiable en el aula? | Selección | Sí todo el día, Parcial, No confiable, No hay |
| C3 | ¿Qué dispositivos tiene disponibles para uso docente? | Multi-selección | Computadora escritorio, laptop, tableta, celular, ninguno |
| C4 | ¿Los estudiantes tienen acceso a dispositivos? | Selección | Sí propios, Sí del centro, Compartidos, No |
| C5 | ¿Estaría dispuesto/a a utilizar una aplicación digital para su labor docente? | Likert 5 | 1=Nada dispuesto … 5=Muy dispuesto |
| C6 | ¿Qué tan importante es que la aplicación funcione sin internet? | Likert 5 | 1=No importante … 5=Indispensable |

### Sección D — Necesidades Pedagógicas Específicas

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| D1 | ¿Lleva un registro formal del progreso de cada estudiante? | Selección | Sí digital, Sí en papel, Informal, No |
| D2 | ¿Qué tipo de ejercicios de práctica considera más útiles? | Multi-selección | Opción múltiple, completar, pareo, producción oral, dibujo, juego, otro |
| D3 | ¿Qué asignaturas necesitan más apoyo con materiales interculturales? | Multi-selección | Lengua indígena, matemáticas, ciencias, estudios sociales, cultura, otra |
| D4 | ¿Qué funcionalidad sería más valiosa para usted en un sistema digital? | Ranking 1-5 | Subir materiales, ejercicios para estudiantes, ver progreso, comunicación, organizar por tema |
| D5 | ¿Cada cuánto actualiza o busca nuevos materiales educativos? | Selección | Semanal, quincenal, mensual, por período, nunca |

### Sección E — Observaciones Abiertas

| # | Pregunta | Tipo |
|---|----------|------|
| E1 | ¿Qué es lo más difícil de enseñar en un territorio indígena que un sistema digital podría ayudar a resolver? | Abierta |
| E2 | ¿Tiene alguna sugerencia o preocupación sobre el uso de tecnología en la educación comunitaria? | Abierta |

---

## Análisis Previsto

- Estadísticos descriptivos (frecuencias, medias Likert) por territorio y pueblo indígena
- Análisis de brechas: necesidades vs. recursos actuales
- Priorización de funcionalidades (ranking D4)
- Correlación entre conectividad (C1-C2) y disposición tecnológica (C5-C6)

## Trazabilidad con Requerimientos

| Sección | RF Validados |
|---------|-------------|
| B — Materiales | [[RF-EDU-03]], [[RF-EDU-04]] |
| C — Tecnología | [[RF-TRANS-01]], [[RF-TRANS-02]] |
| D — Pedagógicas | [[RF-EDU-01]], [[RF-EDU-02]], [[RF-EDU-05]], [[RF-EDU-06]] |

## Datos

- Respuestas sintéticas: `08-Recursos/Datos/encuestas-edu-respuestas.csv`
- Respuestas reales: Pendiente Sprint-03 ([[RSK-014]])
