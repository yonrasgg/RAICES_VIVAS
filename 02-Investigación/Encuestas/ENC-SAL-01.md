---
type: encuesta
id: ENC-SAL-01
title: "Encuesta — Gestión de Salud Comunitaria en Territorios Indígenas"
module: salud
status: approved
target_population: "Auxiliares de salud (ATAP), promotores de salud, personal EBAIS"
sample_size: 25
method: "Cerrado + Likert 5 puntos"
language: "Español (con asistencia en lengua indígena si necesario)"
author: Geovanny
reviewer: Equipo
created: 2026-03-20
updated: 2026-03-27
related_requirements:
  - RF-SAL-01
  - RF-SAL-02
  - RF-SAL-03
  - RF-SAL-04
  - RF-SAL-05
tags:
  - investigación
  - encuesta
  - salud
  - instrumento
methodology: "[[Enfoque-Metodológico]]"
---

← [[02-Investigación/Encuestas/Enfoque-Metodológico|Volver a Metodología]]

# ENC-SAL-01: Gestión de Salud Comunitaria en Territorios Indígenas

## Objetivo

Evaluar las prácticas actuales de registro de pacientes, gestión de historiales médicos, coordinación de citas y brigadas, y las barreras tecnológicas que enfrentan los ATAP y auxiliares de salud en territorios indígenas.

## Población Objetivo

- **Quién:** ATAP (Asistentes Técnicos de Atención Primaria), promotores de salud, personal de EBAIS con cobertura en territorios indígenas
- **Muestra estimada:** n ≈ 25 (al menos 5 áreas de salud con cobertura indígena)
- **Criterio de inclusión:** Al menos 6 meses atendiendo población en territorio indígena
- **Método de muestreo:** Intencional, coordinado con Dirección Regional CCSS

## Protocolo de Aplicación

1. Obtener autorización del Área de Salud correspondiente
2. Consentimiento individual del participante
3. Aplicar presencialmente en EBAIS o durante brigada / vía tableta
4. Duración estimada: 15-20 minutos
5. Almacenamiento: `08-Recursos/Datos/encuestas-sal-respuestas.csv`

---

## Instrumento

### Sección A — Datos del Participante

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| A1 | Área de salud donde labora | Texto | Nombre del EBAIS o equipo |
| A2 | Territorios indígenas que cubre | Multi-selección | Lista de territorios + otro |
| A3 | Rol | Selección | ATAP, promotor de salud, médico, enfermero/a, otro |
| A4 | Años de experiencia en territorios indígenas | Numérico | Rango 0.5-30 |
| A5 | ¿Habla alguna lengua indígena? | Selección | Sí fluido, Sí básico, No pero quisiera aprender, No |
| A6 | Frecuencia de visitas a territorio | Selección | Diario, semanal, quincenal, mensual, solo brigadas |

### Sección B — Registro de Pacientes y Expedientes

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| B1 | ¿Cómo registra actualmente la información de sus pacientes en territorio? | Multi-selección | EDUS/ASIS (CCSS), cuaderno, formularios papel, Excel, aplicación celular, memoria, otro |
| B2 | ¿Tiene acceso al expediente digital EDUS cuando está en territorio? | Selección | Sí siempre, A veces (depende de señal), Nunca en territorio |
| B3 | ¿Ha perdido información de pacientes por falta de registro digital? | Selección | Sí frecuentemente, Sí alguna vez, No que recuerde |
| B4 | ¿Cuánto tiempo dedica a pasar datos en papel a sistemas digitales después de una gira? | Selección | Menos de 1h, 1-3h, 3-6h, más de 6h, no lo hago |
| B5 | ¿Qué tan importante sería un sistema que funcione sin internet para registrar pacientes? | Likert 5 | 1=No importante … 5=Indispensable |

### Sección C — Gestión de Citas y Brigadas

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| C1 | ¿Cómo coordina actualmente las citas con pacientes en territorio? | Multi-selección | Teléfono, mensaje de texto, radio, visita presencial, líder comunal, no se coordinan |
| C2 | ¿Cuántas brigadas de salud realiza al mes en territorios indígenas? | Numérico | Rango 0-10 |
| C3 | ¿Cómo registra las actividades de una brigada? | Multi-selección | Formulario CCSS, boletas papel, fotos, no se registra formalmente, otro |
| C4 | ¿Los pacientes en territorio llegan a sus citas de seguimiento? | Selección | Sí la mayoría, Aproximadamente la mitad, Pocos, Casi ninguno |
| C5 | ¿Qué tan útil sería un sistema de alertas para pacientes con seguimiento pendiente? | Likert 5 | 1=Nada útil … 5=Muy útil |

### Sección D — Barreras y Conectividad

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| D1 | ¿Cuál es la principal barrera para brindar atención en territorio? | Ranking (seleccione 3) | Acceso geográfico, conectividad, idioma, equipamiento, tiempo, transporte, seguridad, personal insuficiente |
| D2 | ¿Tiene conectividad celular durante sus visitas a territorio? | Selección | Sí estable, Intermitente, Solo en algunos puntos, Nunca |
| D3 | ¿Qué dispositivo usa para su trabajo de campo? | Multi-selección | Celular personal, celular institucional, tableta, laptop, ninguno |
| D4 | ¿Qué tan cómodo/a se siente usando aplicaciones en su celular para trabajo? | Likert 5 | 1=Nada cómodo … 5=Muy cómodo |
| D5 | ¿La comunidad confía en que sus datos de salud estén en un sistema digital? | Likert 5 | 1=No confían … 5=Confían plenamente |

### Sección E — Necesidades Específicas

| # | Pregunta | Tipo | Opciones |
|---|----------|------|----------|
| E1 | ¿Qué funcionalidad le sería más útil? | Ranking 1-5 | Registro de pacientes offline, historial médico portable, coordinar citas, alertas de seguimiento, coordinar brigadas |
| E2 | ¿Necesita registrar datos de medicina tradicional junto con la medicina occidental? | Selección | Sí es importante, Sería útil pero no esencial, No lo necesito, No debería mezclarse |
| E3 | ¿Existen condiciones de salud particularmente comunes en los territorios que atiende? | Abierta | (registrar textualmente) |
| E4 | ¿Alguna sugerencia para mejorar la atención de salud en territorios indígenas mediante tecnología? | Abierta | |

---

## Análisis Previsto

- Diagnóstico de prácticas actuales de registro (B1-B4) por área de salud
- Índice de necesidad de sistema offline (B5, D2, E1)
- Brechas en seguimiento de pacientes (C4-C5)
- Análisis de barreras (D1) por región geográfica
- Priorización de funcionalidades (E1) para MVP

## Trazabilidad con Requerimientos

| Sección | RF Validados |
|---------|-------------|
| B — Registro | [[RF-SAL-01]], [[RF-SAL-02]] |
| C — Citas y brigadas | [[RF-SAL-03]], [[RF-SAL-04]] |
| D — Conectividad | [[RF-TRANS-01]] |
| E — Necesidades | [[RF-SAL-05]], [[RF-SAL-02]] |

## Datos

- Respuestas sintéticas: `08-Recursos/Datos/encuestas-sal-respuestas.csv`
- Respuestas reales: Pendiente Sprint-03
