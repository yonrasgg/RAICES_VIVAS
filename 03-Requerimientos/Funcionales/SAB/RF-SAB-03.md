---
id: RF-SAB-03
type: requirement/functional
module: saberes
wbs: RV-2.2
title: "Búsqueda por filtros"
status: approved
priority: should
actor: [Usuario autorizado]
source: observacion
validation: "Prueba controlada"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/should
---

# RF-SAB-03: Búsqueda por filtros

## Descripción

El sistema debe permitir buscar saberes por categoría, territorio, idioma y formato.

## Problema de Origen

> Búsqueda ineficiente / pérdida de tiempo al intentar recuperar conocimiento registrado.

## Necesidad Identificada

> Acceso rápido a saberes autorizados.

## Criterios de Aceptación

- [ ] Resultados en menos de 3 segundos en condiciones normales

## Notas de Validación

> Pendiente: Prueba controlada con usuarios autorizados.

## Trazabilidad

- **Problema:** Búsqueda ineficiente / pérdida de tiempo
- **Necesidad:** Acceso rápido a saberes autorizados
- **WBS:** [[WBS#RV-2.2]]
- **Módulo:** Saberes Ancestrales (SAB)
- **Fuente:** Observación contextual

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
