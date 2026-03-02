---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAL-03
type: requirement/functional
module: salud
wbs: RV-3.2
title: "Programación de citas"
status: approved
priority: should
actor: [Personal salud]
source: observacion
validation: "Prueba con agenda"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/should
---

# RF-SAL-03: Programación de citas

## Descripción

El sistema debe permitir programar citas indicando fecha, tipo de atención, lugar y responsable.

## Problema de Origen

> Dificultad para coordinar atención médica en territorios remotos.

## Necesidad Identificada

> Gestión de citas comunitarias para optimizar la atención.

## Criterios de Aceptación

- [ ] No permite solapamiento por responsable en la misma franja horaria

## Notas de Validación

> Pendiente: Prueba con agenda real.

## Trazabilidad

- **Problema:** Dificultad para coordinar atención
- **Necesidad:** Gestión de citas comunitarias
- **WBS:** [[WBS#RV-3.2]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
- **Fuente:** Observación

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
