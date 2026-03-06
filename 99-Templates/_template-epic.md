<%*
// ── Prompts del usuario ──
const epicTitle = await tp.system.prompt("Nombre del Epic");
const epicModule = await tp.system.suggester(
  ["educacion", "saberes", "salud"],
  ["educacion", "saberes", "salud"],
  false, "Módulo principal"
);
const epicOwner = await tp.system.suggester(
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  false, "Responsable"
);
const epicPriority = await tp.system.suggester(
  ["critical", "high", "medium", "low"],
  ["critical", "high", "medium", "low"],
  false, "Prioridad"
);
const epicKey = await tp.system.prompt("Clave Jira (ej: RV-1)", "");
const today = tp.date.now("YYYY-MM-DD");

// ── Banner por módulo ──
const bannerMap = {
  "educacion": "08-Recursos/Imágenes/cover-rf-edu.png",
  "saberes": "08-Recursos/Imágenes/cover-rf-sab.png",
  "salud": "08-Recursos/Imágenes/cover-rf-sal.png"
};
const banner = bannerMap[epicModule] || "08-Recursos/Imágenes/cover-arquitectura.png";

// ── Renombrar archivo ──
const fileName = epicKey ? epicKey : epicTitle.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s-]/g, "").substring(0, 40);
await tp.file.rename(fileName);
-%>
---
banner_src: "<% banner %>"
banner_src_x: 0.47714
banner_src_y: 0.42
type: epic
key: "<% epicKey %>"
summary: "<% epicTitle %>"
issuetype: Epic
project: RV
title: "<% epicTitle %>"
status: todo
priority: <% epicPriority %>
owner: "<% epicOwner %>"
module: <% epicModule %>
created: <% today %>
updated: <% today %>
tags:
  - epic
  - modulo/<% epicModule === "educacion" ? "edu" : epicModule === "saberes" ? "sab" : "sal" %>
  - mvp
description: ""
labels:
  - <% epicModule %>
  - mvp
---

# 🏔️ <% epicKey ? epicKey + ": " : "" %><% epicTitle %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(done)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{owner}]` |

## Descripción

> Describir el alcance y propósito de este Epic.

## Objetivos

- [ ] Objetivo 1
- [ ] Objetivo 2

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

## Requerimientos Funcionales

```dataview
TABLE
  id as "RF",
  title as "Título",
  priority as "Prioridad",
  status as "Estado"
FROM "03-Requerimientos/Funcionales"
WHERE type = "requirement/functional" AND module = this.module
SORT id ASC
```

## Progreso

> **Completadas:** `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "story") && p.parent === dv.current().key && p.status === "done").length` / `$= dv.pages('"05-Sprints"').where(p => (p.type === "task" || p.type === "story") && p.parent === dv.current().key).length`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación del Epic | <% epicOwner %> |
