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

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  effort_actual AS "⏱️ Real",
  completed AS "Completada"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask")
  AND status = "done"
  AND completed >= date(this.week_start)
  AND completed <= date(this.week_end)
SORT completed ASC
```

---

## 🔄 Tareas en Progreso (al cierre de semana)

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  status AS "Estado",
  due AS "📅 Límite"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask")
  AND (status = "in-progress" OR status = "review")
SORT due ASC
```

---

## 📋 Tareas Pendientes con Fecha esta Semana

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤",
  priority AS "Prioridad",
  due AS "📅 Límite"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask")
  AND status = "todo"
  AND due >= date(this.week_start)
  AND due <= date(this.week_end)
SORT due ASC
```

---

## 🚧 Bloqueos

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Tarea",
  assignee AS "👤"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND status = "blocked"
SORT id ASC
```

<!-- Notas adicionales sobre bloqueos -->
- 

---

## 📊 Métricas de la Semana

```dataviewjs
const ws = dv.current().week_start;
const we = dv.current().week_end;
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task" || t.type === "subtask");

// Completadas esta semana
const doneThisWeek = tasks.where(t =>
  t.status === "done" && t.completed &&
  dv.date(t.completed) >= dv.date(ws) &&
  dv.date(t.completed) <= dv.date(we)
).length;

// En progreso al cierre
const inProgress = tasks.where(t => t.status === "in-progress" || t.status === "review").length;

// Bloqueadas
const blocked = tasks.where(t => t.status === "blocked").length;

// Horas reales esta semana
const parseH = (v) => { if (!v) return 0; if (typeof v === "number") return v; const m = String(v).match(/\d+/); return m ? parseInt(m[0]) : 0; };
let hoursWeek = 0;
for (const t of tasks.where(t => t.status === "done" && t.completed && dv.date(t.completed) >= dv.date(ws) && dv.date(t.completed) <= dv.date(we))) {
  hoursWeek += t.effort_actual ? parseH(t.effort_actual) : parseH(t.effort);
}

// Decisiones tomadas esta semana
const adrs = dv.pages('"01-Proyecto/Decisiones"').where(d => d.type === "adr" && d.date && dv.date(d.date) >= dv.date(ws) && dv.date(d.date) <= dv.date(we)).length;

// Reuniones esta semana
const meetings = dv.pages('"07-Reuniones"').where(m => m.type === "meeting" && m.date && dv.date(m.date) >= dv.date(ws) && dv.date(m.date) <= dv.date(we)).length;

// Progreso general
const totalTasks = tasks.length;
const totalDone = tasks.where(t => t.status === "done").length;
const pct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

dv.table(
  ["📊 Métrica", "Valor"],
  [
    ["✅ Completadas esta semana", doneThisWeek],
    ["⏱️ Horas ejecutadas", `${hoursWeek}h`],
    ["🔄 En progreso", inProgress],
    ["🚫 Bloqueadas", blocked],
    ["🏗️ ADR esta semana", adrs],
    ["📝 Reuniones", meetings],
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
