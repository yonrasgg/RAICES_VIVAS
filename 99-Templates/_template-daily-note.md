---
banner_src: "08-Recursos/Imágenes/cover-daily.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: daily-note
date: '<% tp.date.now("YYYY-MM-DD") %>'
created: '<% tp.date.now("YYYY-MM-DD") %>'
tags:
  - daily
  - reporte
author:
---

## 🔄 Tareas en Progreso

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", due AS "📅 Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND (status = 'in-progress' OR status = 'review') AND path LIKE '05-Sprints%'
ORDER BY due ASC
```

---

## 📋 Tareas Pendientes para Hoy

```sqlseal
SELECT id AS "ID", title AS "Tarea", assignee AS "👤", priority AS "Prioridad", due AS "📅 Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND status = 'todo' AND due = @date AND path LIKE '05-Sprints%'
ORDER BY priority ASC
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

## 📊 Métricas del Día

```sqlseal
TEMPLATE
| 📊 Métrica | Valor |
|---|---|
{{#each data}}
| ✅ Completadas hoy | {{this.done_today}} |
| 🔄 En progreso | {{this.in_progress}} |
| 🚫 Bloqueadas | {{this.blocked}} |
| 📈 Progreso global | {{this.pct}}% ({{this.total_done}}/{{this.total_tasks}}) |
{{/each}}

SELECT
  SUM(CASE WHEN status = 'done' AND completed = @date THEN 1 ELSE 0 END) as done_today,
  SUM(CASE WHEN status IN ('in-progress', 'review') THEN 1 ELSE 0 END) as in_progress,
  SUM(CASE WHEN status = 'blocked' THEN 1 ELSE 0 END) as blocked,
  COUNT(*) as total_tasks,
  SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as total_done,
  ROUND(100.0 * SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) / MAX(1, COUNT(*))) as pct
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%'
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

## 📝 Notas e Ideas

<!-- Observaciones, ideas, hallazgos del día -->
- 

---

## 📋 Plan para Mañana

<!-- ¿Qué se planea hacer mañana? -->
- 

---

## 🔗 Enlaces

- [[00-Dashboard/Home|Dashboard]]
- [[00-Dashboard/Métricas|Métricas]]
- [[05-Sprints/Backlog|Backlog]]
