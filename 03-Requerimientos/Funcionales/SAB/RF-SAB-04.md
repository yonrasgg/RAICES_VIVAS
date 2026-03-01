---
id: RF-SAB-04
type: requirement/functional
module: saberes
wbs: RV-2.3
title: "Restricción de acceso por autorización comunitaria"
status: approved
priority: must
actor: [Admin comunitario]
source: entrevista
validation: "Validación comunitaria"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/must
---

# RF-SAB-04: Restricción de acceso por autorización comunitaria

## Descripción

El sistema debe restringir el acceso a contenidos según nivel de autorización comunitaria (público, comunitario, restringido, ceremonial/sensible).

## Problema de Origen

> Riesgo de exposición indebida o apropiación cultural del conocimiento ancestral.

## Necesidad Identificada

> Control comunitario del acceso al conocimiento documentado.

## Criterios de Aceptación

- [ ] Cada contenido tiene un nivel de acceso obligatorio
- [ ] Los roles comunitarios determinan qué nivel pueden consultar

## Notas de Validación

> Pendiente: Validación comunitaria con líderes.

## Trazabilidad

- **Problema:** Riesgo de exposición/apropiación cultural
- **Necesidad:** Control comunitario del acceso
- **WBS:** [[WBS#RV-2.3]]
- **Módulo:** Saberes Ancestrales (SAB)
- **Fuente:** Entrevistas + ética cultural

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
