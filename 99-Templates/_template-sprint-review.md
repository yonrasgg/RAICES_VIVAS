---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_y: 0.42
type: sprint-review
sprint: <% tp.system.prompt("Número de sprint (ej: 01)") %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - sprint
  - review
---

# Sprint <% tp.frontmatter.sprint %> — Review

**Fecha:** <% tp.frontmatter.date %>

---

## Objetivo del Sprint

> ¿Cuál era el objetivo?

## ¿Se cumplió el objetivo?

- [ ] Sí, completamente
- [ ] Parcialmente
- [ ] No

## Lo que se completó

| Tarea / Requerimiento | Estado | Observación |
|----------------------|--------|-------------|
| | ✅ Done | |
| | ✅ Done | |

## Lo que NO se completó

| Tarea / Requerimiento | Razón | Acción |
|----------------------|-------|--------|
| | | Mover a Sprint siguiente |

## Demo / Evidencias

> Links a artefactos, capturas, diagramas generados.

## Feedback del Equipo

- 

## Lecciones Aprendidas (mini-retro)

### ¿Qué funcionó bien?

- 

### ¿Qué mejorar?

- 

### ¿Qué intentar diferente?

- 
