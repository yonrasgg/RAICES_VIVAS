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
assignee: "Geovanny"
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

```sqlseal
SELECT name as "Story", key_ as "Jira", title as "Historia", status as "Estado", story_points as "SP", priority as "Prioridad"
FROM files
WHERE type = 'story' AND parent = @key AND path LIKE '05-Sprints/Stories%'
ORDER BY key_ ASC
```

## Tareas Directas (bajo este Epic)

```sqlseal
SELECT name as "Tarea", key_ as "Jira", title as "Título", status as "Estado", assignee as "Responsable", sprint as "Sprint"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND parent = @key AND path LIKE '05-Sprints%'
ORDER BY sprint ASC, name ASC
```

## Requerimientos Funcionales del Módulo

```sqlseal
SELECT name as "RF", title as "Título", priority as "Prioridad", status as "Estado"
FROM files
WHERE type = 'requirement/functional' AND path LIKE '03-Requerimientos/Funcionales/EDU%'
ORDER BY name ASC
```

## Progreso

```sqlseal
SELECT
  SUM(CASE WHEN type = 'story' AND status = 'done' THEN 1 ELSE 0 END) || ' / ' ||
  SUM(CASE WHEN type = 'story' THEN 1 ELSE 0 END) as "📖 Stories",
  SUM(CASE WHEN (type = 'task' OR type = 'subtask') AND status = 'done' THEN 1 ELSE 0 END) || ' / ' ||
  SUM(CASE WHEN type = 'task' OR type = 'subtask' THEN 1 ELSE 0 END) as "📋 Tareas"
FROM files
WHERE parent = @key AND path LIKE '05-Sprints%'
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación del Epic en Jira | Geovanny |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
