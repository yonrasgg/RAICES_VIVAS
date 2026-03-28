---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: epic
key: "RV-3"
summary: "Salud Comunitaria e Intercultural"
issuetype: Epic
project: RV
title: "Salud Comunitaria e Intercultural"
status: in-progress
priority: high
owner: "Santiago"
assignee: "Santiago"
module: salud
created: 2026-02-03
updated: 2026-03-05
tags:
  - epic
  - modulo/sal
  - mvp
description: "Atención y seguimiento en salud comunitaria. Cubre RF-SAL-01 y RF-SAL-02. Incluye registro de pacientes, citas y brigadas, seguimiento con alertas, y confidencialidad offline."
labels:
  - salud
  - mvp
---

# 🏔️ RV-3: Salud Comunitaria e Intercultural

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(done)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{owner}]` |

## Descripción

Módulo de atención y seguimiento en salud comunitaria para el Sistema Integral **Raíces Vivas**. Abarca el registro y gestión de pacientes con ID único, coordinación de citas y brigadas comunitarias, seguimiento con alertas de salud, y mecanismos de confidencialidad con soporte offline.

### Alcance del Epic

| Paquete WBS | Descripción | RF vinculado |
|-------------|-------------|--------------|
| RV-3.1 | Registro y Gestión de Pacientes | [[RF-SAL-01]] |
| RV-3.2 | Citas y Brigadas Comunitarias | [[RF-SAL-02]] |
| RV-3.3 | Seguimiento y Alertas | RF-SAL-03, RF-SAL-04 |
| RV-3.4 | Confidencialidad / Offline | RF-SAL-05 |

### Objetivos

- [x] Registrar pacientes con ID interno único, nombre, edad y territorio
- [x] Implementar historial médico básico por paciente
- [ ] Coordinar citas y brigadas de salud comunitaria
- [ ] Garantizar confidencialidad y funcionamiento offline

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
WHERE (type = "task" OR type = "subtask") AND parent = this.key
SORT sprint ASC, id ASC
```

## Requerimientos Funcionales del Módulo

```dataview
TABLE
  id as "RF",
  title as "Título",
  priority as "Prioridad",
  status as "Estado"
FROM "03-Requerimientos/Funcionales/SAL"
WHERE type = "requirement/functional"
SORT id ASC
```

## Progreso

> **Stories completadas:** `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-3" && p.status === "done").length` / `$= dv.pages('"05-Sprints/Stories"').where(p => p.type === "story" && p.parent === "RV-3").length`

> **Tareas completadas:** `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-3" && p.status === "done").length` / `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "subtask") && p.parent === "RV-3").length`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación del Epic en Jira | Santiago |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
