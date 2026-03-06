---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-4"
summary: "RF-EDU-01: Registro de docentes comunitarios"
issuetype: Story
project: RV
parent: "RV-1"
title: "Registro de docentes comunitarios"
status: todo
priority: must
assignee: "Geovanny"
module: educacion
requirement: "RF-EDU-01"
story_points: 5
customfield_10016: 5
created: 2026-02-03
updated: 2026-03-05
tags:
  - story
  - modulo/edu
  - mvp
description: "Como equipo de desarrollo, implementar el registro de docentes comunitarios con datos básicos y lengua indígena dominante, para que los docentes accedan a materiales personalizados según su territorio y nivel académico."
labels:
  - educacion
  - mvp
---

# 📖 RV-4: RF-EDU-01 — Registro de docentes comunitarios

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Epic** | `VIEW[{parent}]` → [[RV-1]] |
| **Story Points** | `VIEW[{story_points}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{assignee}]` |
| **Requerimiento** | [[RF-EDU-01]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar el registro de docentes comunitarios con datos básicos y lengua indígena dominante,
> **para que** los docentes accedan a materiales personalizados según su territorio y nivel académico.

## Criterios de Aceptación

- [x] El sistema permite registrar un nuevo docente con: nombre, territorio, rol educativo y lengua indígena dominante
- [x] El campo "lengua dominante" es obligatorio y presenta un selector con las lenguas registradas
- [x] Se valida que la combinación nombre + territorio + rol sea única
- [x] El sistema permite editar y eliminar registros de docentes existentes (CRUD completo)
- [x] Los datos del docente se persisten correctamente en la base de datos

## Subtareas / Tasks

```dataview
TABLE
  key as "Jira",
  title as "Tarea",
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND parent = this.key
SORT sprint ASC, id ASC
```

## Trazabilidad

| Enlace | Referencia |
|--------|------------|
| **Epic** | [[RV-1]] — Educación Intercultural Bilingüe |
| **RF** | [[RF-EDU-01]] — Registro de docentes comunitarios |
| **WBS** | [[WBS]] — RV-1.1: Gestión de Actores Educativos |

## Notas de Implementación

- Modelo de datos: tabla `docentes` con campos `id`, `nombre`, `territorio_id`, `rol`, `lengua_dominante_id`
- API REST: endpoints CRUD en `/api/v1/docentes`
- Validación de unicidad en backend con índice compuesto

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Geovanny |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
