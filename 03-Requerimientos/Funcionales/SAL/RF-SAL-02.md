---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_y: 0.42
id: RF-SAL-02
type: requirement/functional
module: salud
wbs: RV-3.1
title: "Historial médico básico"
status: approved
priority: must
actor: [Personal salud]
source: entrevista
validation: "Validación con salud"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/must
---

# RF-SAL-02: Historial médico básico

## Descripción

El sistema debe permitir registrar un historial médico básico por paciente: condiciones crónicas, alergias, medicación actual y notas de cada visita.

## Problema de Origen

> Falta de historial accesible — el personal de salud no tiene continuidad de datos entre visitas.

## Necesidad Identificada

> Continuidad de atención médica con acceso a datos previos.

## Criterios de Aceptación

- [ ] Registro por fecha y responsable
- [ ] Vista cronológica del historial

## Notas de Validación

> Pendiente: Validación con personal de salud.

## Trazabilidad

- **Problema:** Falta de historial accesible
- **Necesidad:** Continuidad de atención
- **WBS:** [[WBS#RV-3.1]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
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
