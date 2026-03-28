---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-7"
summary: "RF-SAB-04: Restricción de acceso por autorización comunitaria"
issuetype: Story
project: RV
parent: "RV-2"
title: "Restricción de acceso por autorización comunitaria"
status: done
priority: should
assignee: "Elkin"
module: saberes
requirement: "RF-SAB-04"
story_points: 3
customfield_10016: 3
sprint: Sprint-02
created: 2026-02-03
updated: 2026-03-26
tags:
  - story
  - modulo/sab
  - mvp
description: "Como equipo de desarrollo, implementar la restricción de acceso a contenidos según nivel de autorización comunitaria, para que los administradores comunitarios protejan saberes ceremoniales y sensibles de acceso no autorizado."
labels:
  - saberes
  - mvp
---

# 📖 RV-7: RF-SAB-04 — Restricción de acceso por autorización comunitaria

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
| **Requerimiento** | [[RF-SAB-04]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar la restricción de acceso a contenidos según nivel de autorización comunitaria,
> **para que** los administradores comunitarios protejan saberes ceremoniales y sensibles de acceso no autorizado.

## Criterios de Aceptación

- [ ] El sistema define al menos 3 niveles de acceso: público, restringido, sagrado/ceremonial
- [ ] Solo usuarios con rol "administrador comunitario" pueden asignar niveles de acceso
- [ ] Contenidos marcados como "sagrado" solo son visibles para usuarios explícitamente autorizados
- [ ] Se registra en bitácora cada cambio de nivel de acceso (quién, cuándo, de qué nivel a cuál)

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
| **RF** | [[RF-SAB-04]] — Restricción de acceso comunitario |
| **WBS** | [[WBS]] — RV-2.3: Gobernanza y Control Comunitario |

## Notas de Implementación

- Modelo RBAC extendido con `nivel_acceso` en tabla `saberes` + tabla `autorizaciones_saber`
- Middleware de autorización que valida nivel antes de servir contenido
- Bitácora en tabla `audit_acceso_saberes`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Elkin |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
