---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-9"
summary: "RF-SAL-02: Historial médico básico por paciente"
issuetype: Story
project: RV
parent: "RV-3"
title: "Historial médico básico por paciente"
status: done
priority: must
assignee: "Santiago"
module: salud
requirement: "RF-SAL-02"
story_points: 5
customfield_10016: 5
sprint: Sprint-02
created: 2026-02-03
updated: 2026-03-26
tags:
  - story
  - modulo/sal
  - mvp
description: "Como equipo de desarrollo, implementar el registro del historial médico básico de cada paciente, para que el personal de salud dé seguimiento a condiciones crónicas, alergias y medicación actual en cada visita."
labels:
  - salud
  - mvp
---

# 📖 RV-9: RF-SAL-02 — Historial médico básico por paciente

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
| **Requerimiento** | [[RF-SAL-02]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar el registro del historial médico básico de cada paciente,
> **para que** el personal de salud dé seguimiento a condiciones crónicas, alergias y medicación actual en cada visita.

## Criterios de Aceptación

- [ ] Cada entrada del historial incluye: fecha, motivo de visita, diagnóstico, tratamiento, observaciones
- [ ] Se registra un listado de alergias conocidas por paciente (editable)
- [ ] Se registra la medicación actual con dosis y frecuencia
- [ ] Las condiciones crónicas se marcan como "activas" o "en remisión"
- [ ] El historial se presenta en orden cronológico inverso (más reciente primero)
- [ ] Solo personal de salud autorizado puede ver y agregar entradas

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
| **Epic** | [[RV-3]] — Salud Comunitaria e Intercultural |
| **RF** | [[RF-SAL-02]] — Historial médico básico |
| **WBS** | [[WBS]] — RV-3.2: Citas y Brigadas Comunitarias |

## Notas de Implementación

- Modelo: tabla `historial_medico` con FK a `pacientes`, campos `fecha`, `motivo`, `diagnostico`, `tratamiento`, `observaciones`
- Tablas auxiliares: `alergias_paciente`, `medicacion_activa`, `condiciones_cronicas`
- Vista cronológica inversa como query default en API
- Encriptación de datos médicos en reposo

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Santiago |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
