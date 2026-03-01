---
type: weekly
title: "Semana <% tp.date.now('ww') %> — <% tp.date.now('YYYY') %>"
sprint: ""
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - weekly
  - reporte
---

# 📅 Semana <% tp.date.now('ww') %> — <% tp.date.now('YYYY') %>

> Resumen semanal del equipo Raíces Vivas.

---

## 🎯 Objetivo de la Semana

<!-- ¿Qué se planea lograr esta semana? -->

---

## ✅ Tareas Completadas

```dataview
TABLE assignee AS "Responsable", completed AS "Completada"
FROM "05-Sprints"
WHERE type = "task" AND completed >= date("{{monday:YYYY-MM-DD}}") AND completed <= date("{{date:YYYY-MM-DD}}")
SORT completed ASC
```

---

## 🔄 Tareas en Progreso

```dataview
TABLE assignee AS "Responsable", due AS "Fecha límite"
FROM "05-Sprints"
WHERE type = "task" AND status = "in-progress"
SORT due ASC
```

---

## 🚧 Bloqueos

<!-- Listar bloqueos identificados durante la semana -->
- 

---

## 📊 Métricas de la Semana

| Métrica | Valor |
|---------|-------|
| Tareas completadas | |
| Tareas en progreso | |
| Tareas bloqueadas | |
| Reuniones realizadas | |

---

## 📝 Notas y Decisiones

<!-- Decisiones importantes tomadas, hallazgos, cambios de plan -->
- 

---

## 📋 Plan para la Próxima Semana

<!-- ¿Qué se planea hacer la siguiente semana? -->
- 

---

## 🔗 Enlaces

- [[00-Dashboard/Home|Dashboard]]
- [[05-Sprints/Backlog|Backlog]]
