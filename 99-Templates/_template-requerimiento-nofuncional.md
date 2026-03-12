---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: '<% tp.system.prompt("ID del RNF (ej: RNF-08)") %>'
type: requirement/non-functional
category: '<% tp.system.suggester(["conectividad", "multilingüismo", "seguridad", "usabilidad", "rendimiento", "compatibilidad", "gobernanza"], ["conectividad", "multilingüismo", "seguridad", "usabilidad", "rendimiento", "compatibilidad", "gobernanza"]) %>'
wbs: '<% tp.system.prompt("Código WBS (ej: RV-4.1)") %>'
title: '<% tp.system.prompt("Título del RNF") %>'
status: draft
priority: '<% tp.system.suggester(["must", "should", "could", "wont"], ["must", "should", "could", "wont"]) %>'
metric: ""
created: '<% tp.date.now("YYYY-MM-DD") %>'
updated: '<% tp.date.now("YYYY-MM-DD") %>'
tags:
  - requerimiento
  - no-funcional
  - transversal
---

# <% tp.frontmatter.id %>: <% tp.frontmatter.title %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(draft), option(review), option(approved), option(implemented), option(tested)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |

## Descripción

> Describir la restricción o cualidad que debe cumplir el sistema.

## Justificación

> ¿Por qué es necesario este RNF? ¿Qué riesgo mitiga?

## Métrica / Verificación

> ¿Cómo se mide o verifica? Debe ser objetiva y reproducible.

**Métrica:** 

**Método de verificación:** 

## Impacto en Módulos

- [ ] Educación (EDU)
- [ ] Saberes Ancestrales (SAB)
- [ ] Salud (SAL)

## Trazabilidad

- **Problema de origen:** 
- **WBS:** [[WBS#<% tp.frontmatter.wbs %>]]
- **Categoría:** <% tp.frontmatter.category %>

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% tp.date.now("YYYY-MM-DD") %> | Creación inicial | |
