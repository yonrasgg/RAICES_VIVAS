---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-04
type: requirement/functional
module: educacion
wbs: RV-1.2
title: "Organización por asignatura y competencias"
status: approved
priority: should
actor: [Docente]
source: entrevista
validation: "Taller de validación"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/should
---

# RF-EDU-04: Organización por asignatura y competencias

## Descripción

El sistema debe permitir clasificar materiales por asignatura (ej. Matemática, Español, Ciencias) y por competencia/habilidad.

## Problema de Origen

> Desalineación curricular y dificultad de búsqueda — los materiales no están organizados de forma útil.

## Necesidad Identificada

> Organización clara por asignatura y competencia para facilitar la recuperación de materiales.

## Criterios de Aceptación

- [ ] Mínimo 2 niveles de clasificación (asignatura → competencia)

## Notas de Validación

> Pendiente: Taller de validación con docentes.

## Trazabilidad

- **Problema:** Desalineación curricular y dificultad de búsqueda
- **Necesidad:** Organización clara por asignatura y competencia
- **WBS:** [[WBS#RV-1.2]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Entrevista

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND requirement = this.file.name
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-001]] | Falta de evaluaciones contextualizadas para estudiantes |
| Encuesta | [[ENC-EDU-01]] | Desajuste entre pruebas nacionales y realidad territorial |
| Observación | [[OBS-001]] | Ausencia de herramientas de evaluación adaptadas |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
