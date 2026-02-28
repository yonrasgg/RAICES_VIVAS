---
type: risk
id: RISK-<% tp.system.prompt("Número (ej: 001)") %>
title: "<% tp.system.prompt("Título del riesgo") %>"
status: open
probability: <% tp.system.suggester(["alta", "media", "baja"], ["alta", "media", "baja"]) %>
impact: <% tp.system.suggester(["alto", "medio", "bajo"], ["alto", "medio", "bajo"]) %>
owner: <% tp.system.prompt("Responsable de monitoreo") %>
module: <% tp.system.suggester(["educacion", "saberes", "salud", "transversal", "proyecto"], ["educacion", "saberes", "salud", "transversal", "proyecto"]) %>
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - riesgo
---

# RISK-<% tp.frontmatter.id %>: <% tp.frontmatter.title %>

## Descripción

> ¿Qué podría salir mal?

## Causa Raíz

> ¿Por qué podría ocurrir?

## Impacto

> ¿Qué consecuencias tendría?

## Estrategia de Respuesta

| Tipo | Acción |
|------|--------|
| **Mitigación** | |
| **Contingencia** | |
| **Aceptación** | |

## Indicadores de Alerta

- 

## Estado de Seguimiento

| Fecha | Observación | Acción |
|-------|-------------|--------|
| <% tp.date.now("YYYY-MM-DD") %> | Identificado | Monitorear |
