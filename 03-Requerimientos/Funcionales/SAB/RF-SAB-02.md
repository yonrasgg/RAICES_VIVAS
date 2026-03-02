---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-02
type: requirement/functional
module: saberes
wbs: RV-2.2
title: "Clasificación por categoría"
status: approved
priority: should
actor: [Admin comunitario]
source: entrevista
validation: "Revisión con líderes"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/should
---

# RF-SAB-02: Clasificación por categoría

## Descripción

El sistema debe permitir clasificar saberes por categorías definidas localmente: agricultura, medicina tradicional, alimentación, conservación, ritualidad, entre otras.

## Problema de Origen

> Conocimiento disperso y difícil de recuperar — sin estructura de catalogación.

## Necesidad Identificada

> Catalogación por categorías locales para organizar y recuperar saberes.

## Criterios de Aceptación

- [ ] Categorías configurables/editables por admin comunitario

## Notas de Validación

> Pendiente: Revisión con líderes comunitarios.

## Trazabilidad

- **Problema:** Conocimiento disperso y difícil de recuperar
- **Necesidad:** Catalogación por categorías locales
- **WBS:** [[WBS#RV-2.2]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** Entrevistas

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE type = "task" AND requirement = this.file.name
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
