<%*
// Calcular lunes y domingo de la semana actual
const now = tp.date.now("YYYY-MM-DD");
const m = moment(now);
const monday = m.clone().startOf('isoWeek').format('YYYY-MM-DD');
const sunday = m.clone().endOf('isoWeek').format('YYYY-MM-DD');
const weekNum = m.isoWeek().toString().padStart(2, '0');
const year = m.isoWeekYear();
-%>
---
banner_src: "08-Recursos/Imágenes/cover-weekly.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: weekly
title: "Semana <% weekNum %> — <% year %>"
sprint: ""
week_start: <% monday %>
week_end: <% sunday %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - weekly
  - reporte
---

# 📅 Semana <% weekNum %> — <% year %>

> Resumen semanal del equipo Raíces Vivas.
> **Período:** <% monday %> → <% sunday %>

---

## 🎯 Objetivo de la Semana

<!-- ¿Qué se planea lograr esta semana? -->

---

## ✅ Tareas Completadas esta Semana

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤", effort_actual AS "⏱️ Real", completed AS "Completada"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND status = 'done' AND completed >= @week_start AND completed <= @week_end AND path LIKE '05-Sprints%'
ORDER BY completed ASC
```

---

## 🔄 Tareas en Progreso (al cierre de semana)

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", due AS "📅 Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND (status = 'in-progress' OR status = 'review') AND path LIKE '05-Sprints%'
ORDER BY due ASC
```

---

## 📋 Tareas Pendientes con Fecha esta Semana

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤", priority AS "Prioridad", due AS "📅 Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND status = 'todo' AND due >= @week_start AND due <= @week_end AND path LIKE '05-Sprints%'
ORDER BY due ASC
```

---

## 🚧 Bloqueos

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND status = 'blocked' AND path LIKE '05-Sprints%'
ORDER BY id ASC
```

<!-- Notas adicionales sobre bloqueos -->
- 

---

## 📊 Métricas de la Semana

```sqlseal
TEMPLATE
| 📊 Métrica | Valor |
|---|---|
{{#each data}}
| ✅ Completadas esta semana | {{this.done_week}} |
| 🔄 En progreso | {{this.in_progress}} |
| 🚫 Bloqueadas | {{this.blocked}} |
| 🏗️ ADR esta semana | {{this.adrs_week}} |
| 📝 Reuniones | {{this.meetings_week}} |
| 📈 Progreso global | {{this.pct}}% ({{this.total_done}}/{{this.total_tasks}}) |
{{/each}}

SELECT
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' AND completed >= @week_start AND completed <= @week_end THEN 1 ELSE 0 END) as done_week,
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND (status='in-progress' OR status='review') THEN 1 ELSE 0 END) as in_progress,
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='blocked' THEN 1 ELSE 0 END) as blocked,
  SUM(CASE WHEN type='adr' AND path LIKE '01-Proyecto/Decisiones%' AND "date" >= @week_start AND "date" <= @week_end THEN 1 ELSE 0 END) as adrs_week,
  SUM(CASE WHEN type='meeting' AND path LIKE '07-Reuniones%' AND "date" >= @week_start AND "date" <= @week_end THEN 1 ELSE 0 END) as meetings_week,
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END) as total_tasks,
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) as total_done,
  ROUND(100.0 * SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) / MAX(1, SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END))) as pct
FROM files
```

---

## ⚠️ Riesgos Activos (snapshot)

```sqlseal
SELECT id AS "ID", title AS "Riesgo", severity AS "Severidad", status AS "Estado"
FROM files
WHERE type = 'risk' AND status = 'open' AND path LIKE '01-Proyecto/Riesgos%'
ORDER BY severity DESC
```

---

## 📝 Notas y Decisiones

<!-- Decisiones importantes, hallazgos, cambios de plan -->
- 

---

## 📋 Plan para la Próxima Semana

<!-- ¿Qué se planea hacer la siguiente semana? -->
- 

---

## 🔗 Enlaces

- [[00-Dashboard/Home|Dashboard]]
- [[00-Dashboard/Métricas|Métricas]]
- [[05-Sprints/Backlog|Backlog]]
