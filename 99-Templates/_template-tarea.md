---
type: task
id: <% tp.system.prompt("ID de tarea (ej: T-021)") %>
title: "<% tp.system.prompt("Título de la tarea") %>"
status: <% tp.system.suggester(["todo", "in-progress", "review", "done", "blocked"], ["todo", "in-progress", "review", "done", "blocked"]) %>
priority: <% tp.system.suggester(["critical", "high", "medium", "low"], ["critical", "high", "medium", "low"]) %>
assignee: <% tp.system.suggester(["Geovanny", "Elkin", "Santiago", "Equipo"], ["Geovanny", "Elkin", "Santiago", "Equipo"]) %>
sprint: <% tp.system.suggester(["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"], ["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"]) %>
phase: <% tp.system.suggester(["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"], ["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"]) %>
module: <% tp.system.suggester(["educacion", "saberes", "salud", "transversal", "proyecto"], ["educacion", "saberes", "salud", "transversal", "proyecto"]) %>
requirement: <% tp.system.prompt("Requerimiento padre (ej: RF-EDU-01 o N/A)") %>
effort: <% tp.system.prompt("Esfuerzo estimado (ej: 4h, 8h)") %>
started: <% tp.system.prompt("Fecha inicio (YYYY-MM-DD o vacío)", "") %>
due: <% tp.system.prompt("Fecha límite (YYYY-MM-DD)") %>
completed: 
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tarea
---

# <% tp.frontmatter.id %>: <% tp.frontmatter.title %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Responsable** | `INPUT[suggester(option(Geovanny), option(Elkin), option(Santiago), option(Equipo)):assignee]` |
| **Sprint** | `INPUT[suggester(option(Sprint-01), option(Sprint-02), option(Sprint-03), option(Sprint-04), option(Sprint-05), option(backlog)):sprint]` |

## Descripción

> ¿Qué se debe hacer concretamente?

## Criterios de Aceptación (DoD)

#todo
- [ ] Criterio 1
- [ ] Criterio 2

## Subtareas

- [ ] Subtarea 1
- [ ] Subtarea 2

## Dependencias

> Tareas previas o bloqueos.

## Notas

> Observaciones, bloqueos, hallazgos.

## Requerimiento Relacionado

[[<% tp.frontmatter.requirement %>]]
