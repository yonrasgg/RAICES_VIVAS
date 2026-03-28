---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-6"
summary: "RF-SAB-01: Registro de saberes ancestrales multimedia"
issuetype: Story
project: RV
parent: "RV-2"
title: "Registro de saberes ancestrales multimedia"
status: done
priority: must
assignee: "Elkin"
module: saberes
requirement: "RF-SAB-01"
story_points: 5
customfield_10016: 5
sprint: Sprint-02
created: 2026-02-03
updated: 2026-03-26
tags:
  - story
  - modulo/sab
  - mvp
description: "Como equipo de desarrollo, implementar el registro de conocimientos ancestrales en texto, audio o video, para que los portadores de saber preserven los saberes de su comunidad con su contexto territorial y de uso."
labels:
  - saberes
  - mvp
---

# 📖 RV-6: RF-SAB-01 — Registro de saberes ancestrales multimedia

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Epic** | `VIEW[{parent}]` → [[RV-2]] |
| **Story Points** | `VIEW[{story_points}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{assignee}]` |
| **Requerimiento** | [[RF-SAB-01]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar el registro de conocimientos ancestrales en texto, audio o video,
> **para que** los portadores de saber preserven los saberes de su comunidad con su contexto territorial y de uso.

## Criterios de Aceptación

- [ ] El sistema permite registrar un saber con: título, categoría, formato (texto/audio/video), territorio y nivel de acceso
- [ ] Se asocia cada registro al portador de saber que lo comparte
- [ ] El contenido multimedia se almacena con metadatos de contexto (fecha, lugar, intención de uso)
- [ ] Se valida que campos obligatorios (título, categoría, formato) estén completos
- [ ] El registro aparece en el catálogo de saberes inmediatamente tras la creación

## Subtareas / Tasks

```sqlseal
SELECT
  key as "Jira",
  title as "Tarea",
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%' AND parent = @key
ORDER BY sprint ASC, id ASC
```

## Trazabilidad

| Enlace | Referencia |
|--------|------------|
| **Epic** | [[RV-2]] — Saberes Ancestrales y Patrimonio |
| **RF** | [[RF-SAB-01]] — Registro de saberes ancestrales |
| **WBS** | [[WBS]] — RV-2.1: Registro Multiformato de Saberes |

## Notas de Implementación

- Modelo: tabla `saberes` con campos `id`, `titulo`, `categoria_id`, `formato`, `territorio_id`, `nivel_acceso`, `portador_id`
- Almacenamiento multimedia: mismo Object Storage que módulo EDU
- Metadatos contextuales almacenados en tabla secundaria `saber_contexto`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Elkin |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
