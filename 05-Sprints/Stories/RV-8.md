---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-8"
summary: "RF-SAL-01: Registro de pacientes con ID único"
issuetype: Story
project: RV
parent: "RV-3"
title: "Registro de pacientes con ID único"
status: done
priority: must
assignee: "Santiago"
module: salud
requirement: "RF-SAL-01"
story_points: 3
customfield_10016: 3
sprint: Sprint-02
created: 2026-02-03
updated: 2026-03-26
tags:
  - story
  - modulo/sal
  - mvp
description: "Como equipo de desarrollo, implementar el registro de pacientes con ID interno, nombre, edad y territorio, para que el personal de salud mantenga un censo actualizado de la población atendida en la comunidad."
labels:
  - salud
  - mvp
---

# 📖 RV-8: RF-SAL-01 — Registro de pacientes con ID único

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Epic** | `VIEW[{parent}]` → [[RV-3]] |
| **Story Points** | `VIEW[{story_points}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{assignee}]` |
| **Requerimiento** | [[RF-SAL-01]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar el registro de pacientes con ID interno, nombre, edad y territorio,
> **para que** el personal de salud mantenga un censo actualizado de la población atendida en la comunidad.

## Criterios de Aceptación

- [ ] El sistema genera un ID interno único por paciente (formato: `PAC-XXXX`)
- [ ] Campos obligatorios: nombre completo, fecha de nacimiento (para calcular edad), territorio
- [ ] Los campos sensibles (datos médicos) tienen control de acceso por rol
- [ ] Se permite búsqueda de pacientes por ID, nombre o territorio
- [ ] El registro persiste correctamente y es editable por personal autorizado

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
ORDER BY sprint ASC, name ASC
```

## Trazabilidad

| Enlace | Referencia |
|--------|------------|
| **Epic** | [[RV-3]] — Salud Comunitaria e Intercultural |
| **RF** | [[RF-SAL-01]] — Registro de pacientes |
| **WBS** | [[WBS]] — RV-3.1: Registro y Gestión de Pacientes |

## Notas de Implementación

- Modelo: tabla `pacientes` con `id_interno` (secuencial), `nombre`, `fecha_nacimiento`, `territorio_id`, `sexo`, `etnia`
- ID interno: secuencia con prefijo `PAC-` + 4 dígitos zero-padded
- Encriptación de campos sensibles en reposo (AES-256)
- API REST: `/api/v1/pacientes` con RBAC en middleware

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Santiago |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
