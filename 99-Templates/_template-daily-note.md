---
banner_src: "08-Recursos/Imágenes/cover-daily.png"
banner_src_y: 0.42
type: daily-note
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - daily
---

# <% tp.date.now("dddd, DD MMMM YYYY") %>

## Foco del Día

- [ ] 

## Progreso del Proyecto

### Completado Hoy

- 

### En Progreso

- 

### Bloqueado

- 

## Notas / Ideas

> 

## Tareas Pendientes (Global)

```dataview
TASK
WHERE !completed AND file.folder != "99-Templates"
SORT due ASC
LIMIT 10
```
