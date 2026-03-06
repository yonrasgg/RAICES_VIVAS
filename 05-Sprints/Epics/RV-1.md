---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: epic
key: "RV-1"
summary: "Educación Intercultural Bilingüe"
issuetype: Epic
project: RV
title: "Educación Intercultural Bilingüe"
status: in-progress
priority: high
owner: "Geovanny"
module: educacion
created: 2026-02-03
updated: 2026-03-05
tags:
  - epic
  - modulo/edu
  - mvp
description: "Módulo de gestión educativa comunitaria. Cubre RF-EDU-01 y RF-EDU-03. Incluye registro de actores educativos, gestión de contenidos bilingües, y acceso offline."
labels:
  - educacion
  - mvp
---

# 🏔️ RV-1: Educación Intercultural Bilingüe

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(done)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{owner}]` |

## Descripción

Módulo de gestión educativa comunitaria para el Sistema Integral **Raíces Vivas**. Abarca la gestión de actores educativos (docentes, estudiantes), contenidos multimedia bilingües, evaluación y práctica académica, y acceso en modo offline.

### Alcance del Epic

| Paquete WBS | Descripción | RF vinculado |
|-------------|-------------|--------------|
| RV-1.1 | Gestión de Actores Educativos | [[RF-EDU-01]] |
| RV-1.2 | Gestión de Contenidos Educativos | [[RF-EDU-03]] |
| RV-1.3 | Evaluación y Práctica Académica | RF-EDU-04, RF-EDU-05 |
| RV-1.4 | Acceso Bilingüe / Offline | RF-EDU-02, RF-EDU-06 |

### Objetivos

- [x] Registrar docentes comunitarios con datos básicos y lengua dominante
- [x] Permitir carga de materiales educativos multimedia (texto, audio, video)
- [ ] Implementar práctica académica con banco de ejercicios
- [ ] Garantizar acceso offline y bilingüe

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
FROM "03-Requerimientos/Funcionales/EDU"
WHERE type = "requirement/functional"
SORT id ASC
```

## Progreso

> **Stories completadas:** `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-1" && p.status === "done").length` / `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-1").length`

> **Tareas completadas:** `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-1" && p.status === "done").length` / `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-1").length`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación del Epic en Jira | Geovanny |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
