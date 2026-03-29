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
updated: 2026-03-29
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
WHERE type = 'requirement/functional' AND path LIKE '03-Requerimientos/Funcionales/SAL%'
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
| 2026-02-03 | Creación del Epic en Jira | Santiago |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
