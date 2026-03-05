---
banner_src: "08-Recursos/Imágenes/cover-daily.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: daily-note
date: <% tp.date.now("YYYY-MM-DD") %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - daily
  - reporte
author:
---

## ✅ Tareas Completadas Hoy

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  effort_actual AS "⏱️ Real",
  completed AS "Completada"
FROM "05-Sprints"
WHERE type = "task"
  AND status = "done"
  AND completed = date(this.date)
SORT completed ASC
```

---

## 🔄 Tareas en Progreso

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  status AS "Estado",
  due AS "📅 Límite"
FROM "05-Sprints"
WHERE type = "task"
  AND (status = "in-progress" OR status = "review")
SORT due ASC
```

---

## 📋 Tareas Pendientes para Hoy

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  priority AS "Prioridad",
  due AS "📅 Límite"
FROM "05-Sprints"
WHERE type = "task"
  AND status = "todo"
  AND due = date(this.date)
SORT priority ASC
```

---

## 🚧 Bloqueos

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤"
FROM "05-Sprints"
WHERE type = "task" AND status = "blocked"
SORT id ASC
```

<!-- Notas adicionales sobre bloqueos -->
- 

---

## 📊 Métricas del Día

```dataviewjs
const today = dv.current().date;
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");

// Completadas hoy
const doneToday = tasks.where(t =>
  t.status === "done" && t.completed &&
  dv.date(t.completed).toString() === dv.date(today).toString()
).length;

// En progreso
const inProgress = tasks.where(t => t.status === "in-progress" || t.status === "review").length;

// Bloqueadas
const blocked = tasks.where(t => t.status === "blocked").length;

// Horas ejecutadas hoy
const parseH = (v) => { if (!v) return 0; if (typeof v === "number") return v; const m = String(v).match(/\d+/); return m ? parseInt(m[0]) : 0; };
let hoursToday = 0;
for (const t of tasks.where(t => t.status === "done" && t.completed && dv.date(t.completed).toString() === dv.date(today).toString())) {
  hoursToday += t.effort_actual ? parseH(t.effort_actual) : parseH(t.effort);
}

// Progreso general
const totalTasks = tasks.length;
const totalDone = tasks.where(t => t.status === "done").length;
const pct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

dv.table(
  ["📊 Métrica", "Valor"],
  [
    ["✅ Completadas hoy", doneToday],
    ["⏱️ Horas ejecutadas", `${hoursToday}h`],
    ["🔄 En progreso", inProgress],
    ["🚫 Bloqueadas", blocked],
    ["📈 Progreso global", `${pct}% (${totalDone}/${totalTasks})`]
  ]
);
```

---

## ⚠️ Riesgos Activos (snapshot)

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Riesgo",
  severity AS "Severidad",
  status AS "Estado"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND status = "open"
SORT severity DESC
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
