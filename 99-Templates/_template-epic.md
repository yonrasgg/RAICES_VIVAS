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
assignee: "<% epicOwner %>"
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

## Requerimientos Funcionales

```sqlseal
SELECT name as "RF", title as "Título", priority as "Prioridad", status as "Estado"
FROM files
WHERE type = 'requirement/functional' AND module = @module AND path LIKE '03-Requerimientos/Funcionales%'
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
| <% today %> | Creación del Epic | <% epicOwner %> |
