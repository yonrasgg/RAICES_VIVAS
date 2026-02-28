---
id: <% tp.system.prompt("ID del requerimiento (ej: RF-EDU-07)") %>
type: requirement/functional
module: <% tp.system.suggester(["educacion", "saberes", "salud"], ["educacion", "saberes", "salud"]) %>
wbs: <% tp.system.prompt("Código WBS (ej: RV-1.2)") %>
title: "<% tp.system.prompt("Título del requerimiento") %>"
status: draft
priority: <% tp.system.suggester(["must", "should", "could", "wont"], ["must", "should", "could", "wont"]) %>
actor: []
source: <% tp.system.suggester(["entrevista", "encuesta", "observacion", "documental"], ["entrevista", "encuesta", "observacion", "documental"]) %>
validation: ""
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
sprint: null
tags:
  - requerimiento
  - funcional
---

# <% tp.frontmatter.id %>: <% tp.frontmatter.title %>

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
- **WBS:** [[WBS#<% tp.frontmatter.wbs %>]]
- **Módulo:** <% tp.frontmatter.module %>

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% tp.date.now("YYYY-MM-DD") %> | Creación inicial | |
