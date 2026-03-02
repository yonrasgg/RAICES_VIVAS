<%*
// Capturar módulo primero para usarlo en banner_src
const rfModule = await tp.system.suggester(["educacion", "saberes", "salud"], ["educacion", "saberes", "salud"], false, "Módulo");
const rfBanner = rfModule === "educacion" ? "08-Recursos/Imágenes/cover-rf-edu.png" : rfModule === "saberes" ? "08-Recursos/Imágenes/cover-rf-sab.png" : "08-Recursos/Imágenes/cover-rf-sal.png";
const rfId = await tp.system.prompt("ID del requerimiento (ej: RF-EDU-07)");
const rfWbs = await tp.system.prompt("Código WBS (ej: RV-1.2)");
const rfTitle = await tp.system.prompt("Título del requerimiento");
const rfPriority = await tp.system.suggester(["must", "should", "could", "wont"], ["must", "should", "could", "wont"], false, "Prioridad");
const rfSource = await tp.system.suggester(["entrevista", "encuesta", "observacion", "documental"], ["entrevista", "encuesta", "observacion", "documental"], false, "Fuente");
const rfToday = tp.date.now("YYYY-MM-DD");
-%>
---
banner_src: "<% rfBanner %>"
banner_src_x: 0.47714
banner_src_y: 0.42
id: <% rfId %>
type: requirement/functional
module: <% rfModule %>
wbs: <% rfWbs %>
title: "<% rfTitle %>"
status: draft
priority: <% rfPriority %>
actor: []
source: <% rfSource %>
owner: ""
validation: ""
created: <% rfToday %>
updated: <% rfToday %>
sprint: null
tags:
  - requerimiento
  - funcional
---

# <% rfId %>: <% rfTitle %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(draft), option(review), option(approved), option(implemented), option(tested)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |

## Descripción

> Describir qué debe hacer el sistema.

## Problema de Origen

> ¿Qué problema resuelve este requerimiento?

## Necesidad Identificada

> ¿Qué necesidad del usuario atiende?

## Criterios de Aceptación

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Notas de Validación

> Resultados de validación con usuarios.

## Trazabilidad

- **Problema:** 
- **Necesidad:** 
- **WBS:** [[WBS#<% rfWbs %>]]
- **Módulo:** <% rfModule %>

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% tp.date.now("YYYY-MM-DD") %> | Creación inicial | |
