---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: epic
key: "RV-2"
summary: "Saberes Ancestrales y Patrimonio"
issuetype: Epic
project: RV
title: "Saberes Ancestrales y Patrimonio"
status: in-progress
priority: high
owner: "Elkin"
module: saberes
created: 2026-02-03
updated: 2026-03-05
tags:
  - epic
  - modulo/sab
  - mvp
description: "Preservación de conocimiento indígena. Cubre RF-SAB-01 y RF-SAB-04. Incluye registro multiformato, catalogación, gobernanza comunitaria y trazabilidad cultural."
labels:
  - saberes
  - mvp
---

# 🏔️ RV-2: Saberes Ancestrales y Patrimonio

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(done)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{owner}]` |

## Descripción

Módulo de preservación y gestión del conocimiento ancestral indígena para el Sistema Integral **Raíces Vivas**. Abarca el registro multiformato de saberes (texto, audio, video), catalogación y búsqueda, gobernanza con control comunitario de acceso, y preservación con trazabilidad cultural.

### Alcance del Epic

| Paquete WBS | Descripción | RF vinculado |
|-------------|-------------|--------------|
| RV-2.1 | Registro Multiformato de Saberes | [[RF-SAB-01]] |
| RV-2.2 | Catalogación y Búsqueda | RF-SAB-02, RF-SAB-03 |
| RV-2.3 | Gobernanza y Control Comunitario | [[RF-SAB-04]] |
| RV-2.4 | Preservación y Trazabilidad Cultural | RF-SAB-05 |

### Objetivos

- [x] Registrar conocimientos ancestrales en formatos texto, audio y video
- [x] Implementar restricción de acceso por autorización comunitaria
- [ ] Catalogar saberes con categorías y búsqueda facetada
- [ ] Garantizar trazabilidad de cambios en contenidos culturales

## User Stories Vinculadas

```dataview
TABLE
  key as "Jira",
  title as "Historia",
  status as "Estado",
  story_points as "SP",
  priority as "Prioridad"
FROM "05-Sprints/Stories"
WHERE type = "story" AND parent = this.key
SORT key ASC
```

## Tareas Directas (bajo este Epic)

```dataview
TABLE
  key as "Jira",
  title as "Tarea",
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint"
FROM "05-Sprints"
WHERE type = "task" AND parent = this.key
SORT sprint ASC, id ASC
```

## Requerimientos Funcionales del Módulo

```dataview
TABLE
  id as "RF",
  title as "Título",
  priority as "Prioridad",
  status as "Estado"
FROM "03-Requerimientos/Funcionales/SAB"
WHERE type = "requirement/functional"
SORT id ASC
```

## Progreso

> **Stories completadas:** `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-2" && p.status === "done").length` / `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-2").length`

> **Tareas completadas:** `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-2" && p.status === "done").length` / `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-2").length`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación del Epic en Jira | Elkin |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
