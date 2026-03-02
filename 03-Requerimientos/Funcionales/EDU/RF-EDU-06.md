---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-06
type: requirement/functional
module: educacion
wbs: RV-1.3
title: "Seguimiento de progreso básico"
status: approved
priority: could
actor: [Docente]
source: encuesta
validation: "Revisión con docentes"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/could
---

# RF-EDU-06: Seguimiento de progreso básico

## Descripción

El sistema debe mostrar un resumen de progreso por estudiante (porcentaje de aciertos por tema en un período).

## Problema de Origen

> Falta de retroalimentación temprana — los docentes no tienen visibilidad del avance de sus estudiantes.

## Necesidad Identificada

> Medir progreso básico por tema para ajustar la enseñanza.

## Criterios de Aceptación

- [ ] Reporte por tema y período (semanal/mensual)

## Notas de Validación

> Pendiente: Revisión con docentes comunitarios.

## Trazabilidad

- **Problema:** Falta de retroalimentación temprana
- **Necesidad:** Medir progreso básico por tema
- **WBS:** [[WBS#RV-1.3]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Encuesta/entrevistas

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
