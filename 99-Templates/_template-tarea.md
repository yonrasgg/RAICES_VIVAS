<%*
// ── Auto-ID: calcula el siguiente T-XXX consecutivo ──
const taskPages = dv.pages('"05-Sprints"').where(p => p.type === "task" && p.id);
const ids = taskPages.map(p => parseInt(String(p.id).replace("T-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `T-${String(maxId + 1).padStart(3, "0")}`;

// ── Prompts del usuario ──
const title = await tp.system.prompt("Título de la tarea");
const status = await tp.system.suggester(["todo", "in-progress", "review", "done", "blocked"], ["todo", "in-progress", "review", "done", "blocked"]);
const priority = await tp.system.suggester(["critical", "high", "medium", "low"], ["critical", "high", "medium", "low"]);
const assignee = await tp.system.suggester(["Geovanny", "Elkin", "Santiago", "Equipo"], ["Geovanny", "Elkin", "Santiago", "Equipo"]);
const sprint = await tp.system.suggester(["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"], ["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"]);
const phase = await tp.system.suggester(["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"], ["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"]);
const module_ = await tp.system.suggester(["educacion", "saberes", "salud", "transversal", "proyecto"], ["educacion", "saberes", "salud", "transversal", "proyecto"]);
const requirement = await tp.system.prompt("Requerimiento padre (ej: RF-EDU-01 o N/A)", "N/A");
const effort = await tp.system.prompt("Esfuerzo estimado (ej: 4h, 8h)");
const started = await tp.system.prompt("Fecha inicio (YYYY-MM-DD o vacío)", "");
const due = await tp.system.prompt("Fecha límite (YYYY-MM-DD)");
const source = await tp.system.prompt("Minuta origen (ej: MIN-001 o vacío)", "");
const today = tp.date.now("YYYY-MM-DD");

// ── Determinar tag de avance según sprint ──
const sprintNum = sprint.replace("Sprint-0", "").replace("Sprint-", "");
const avanceTag = sprint === "backlog" ? "" : `\n  - avance-${sprintNum}`;

// ── Renombrar archivo al ID ──
await tp.file.rename(nextId);
-%>
---
banner_src: "08-Recursos/Imágenes/cover-tareas.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: task
id: <% nextId %>
title: "<% title %>"
status: <% status %>
priority: <% priority %>
assignee: "<% assignee %>"
sprint: "<% sprint %>"
phase: "<% phase %>"
module: <% module_ %>
requirement: "<% requirement %>"
effort: "<% effort %>"
effort_actual: ""
started: <% started %>
due: <% due %>
completed: 
source: "<% source %>"
created: <% today %>
updated: <% today %>
tags:
  - tarea<% avanceTag %>
---

# <% nextId %>: <% title %>

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

- [ ] Criterio 1
- [ ] Criterio 2

## Subtareas

- [ ] Subtarea 1
- [ ] Subtarea 2

## Dependencias

> Tareas previas o bloqueos.

## Notas

> Observaciones, bloqueos, hallazgos.
<% source ? `\n> 📋 Originada en [[${source}]]` : "" %>

## Requerimiento Relacionado

[[<% requirement %>]]
