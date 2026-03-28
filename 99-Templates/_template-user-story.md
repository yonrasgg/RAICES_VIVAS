<%*
// ── Prompts del usuario ──
const storyRF = await tp.system.prompt("Requerimiento funcional (ej: RF-EDU-01)");
const storyTitle = await tp.system.prompt("Título de la historia");
const storyModule = await tp.system.suggester(
  ["educacion", "saberes", "salud"],
  ["educacion", "saberes", "salud"],
  false, "Módulo"
);
const storySP = await tp.system.suggester(
  ["1", "2", "3", "5", "8", "13"],
  ["1", "2", "3", "5", "8", "13"],
  false, "Story Points (Fibonacci)"
);
const storyPriority = await tp.system.suggester(
  ["must", "should", "could", "wont"],
  ["must", "should", "could", "wont"],
  false, "Prioridad MoSCoW"
);
const storyOwner = await tp.system.suggester(
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  false, "Responsable"
);
const storyKey = await tp.system.prompt("Clave Jira (ej: RV-4)", "");
const today = tp.date.now("YYYY-MM-DD");

// ── Parent Epic por módulo ──
const epicMap = {
  "educacion": "RV-1",
  "saberes": "RV-2",
  "salud": "RV-3"
};
const parentEpic = epicMap[storyModule] || "RV-1";

// ── Banner por módulo ──
const bannerMap = {
  "educacion": "08-Recursos/Imágenes/cover-rf-edu.png",
  "saberes": "08-Recursos/Imágenes/cover-rf-sab.png",
  "salud": "08-Recursos/Imágenes/cover-rf-sal.png"
};
const banner = bannerMap[storyModule] || "08-Recursos/Imágenes/cover-arquitectura.png";

// ── Tag módulo ──
const moduleTag = storyModule === "educacion" ? "edu" : storyModule === "saberes" ? "sab" : "sal";

// ── Renombrar archivo ──
const fileName = storyKey ? storyKey : storyRF;
await tp.file.rename(fileName);
-%>
---
banner_src: "<% banner %>"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "<% storyKey %>"
summary: "<% storyRF %>: <% storyTitle %>"
issuetype: Story
project: RV
parent: "<% parentEpic %>"
title: "<% storyTitle %>"
status: todo
priority: <% storyPriority %>
assignee: "<% storyOwner %>"
module: <% storyModule %>
requirement: "<% storyRF %>"
story_points: <% storySP %>
customfield_10016: <% storySP %>
created: <% today %>
updated: <% today %>
tags:
  - story
  - modulo/<% moduleTag %>
  - mvp
description: ""
labels:
  - <% storyModule %>
  - mvp
---

# 📖 <% storyKey ? storyKey + ": " : "" %><% storyRF %> — <% storyTitle %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Epic** | `VIEW[{parent}]` → [[<% parentEpic %>]] |
| **Story Points** | `VIEW[{story_points}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{assignee}]` |
| **Requerimiento** | [[<% storyRF %>]] |

## User Story

> **Como** [actor principal],
> **quiero** [acción/funcionalidad],
> **para** [beneficio/valor].

## Criterios de Aceptación

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Subtareas / Tasks

```sqlseal
SELECT name as "Tarea", key_ as "Jira", title as "Título", status as "Estado", assignee as "Responsable", sprint as "Sprint", priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND parent = @key AND path LIKE '05-Sprints%'
ORDER BY sprint ASC, name ASC
```

## Trazabilidad

| Enlace | Referencia |
|--------|------------|
| **Epic** | [[<% parentEpic %>]] |
| **RF** | [[<% storyRF %>]] |
| **WBS** | [[WBS]] |

## Notas de Implementación

> Observaciones técnicas, decisiones de diseño, dependencias.

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación de la historia | <% storyOwner %> |
