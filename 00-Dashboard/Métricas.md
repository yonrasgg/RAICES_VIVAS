---
type: dashboard
title: "Métricas de Avance — Raíces Vivas"
project: raices-vivas
banner_src: "08-Recursos/Imágenes/cover-metricas.png"
banner_src_y: 0.42
cssclass: dashboard
tags:
  - dashboard
  - métricas
---

# 📈 Métricas de Avance — Raíces Vivas

---

## Resumen Ejecutivo

```dataviewjs
const allTasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const done = allTasks.where(t => t.status === "done").length;
const total = allTasks.length;
const pct = total > 0 ? Math.round((done/total)*100) : 0;

const rf = dv.pages('"03-Requerimientos/Funcionales"').where(r => r.type === "requirement/functional").length;
const rnf = dv.pages('"03-Requerimientos/No Funcionales"').where(r => r.type === "requirement/non-functional").length;

dv.table(
  ["Métrica", "Valor"],
  [
    ["📊 Progreso general", `${pct}% (${done}/${total} tareas)`],
    ["📋 Requerimientos funcionales", `${rf}`],
    ["🔒 Requerimientos no funcionales", `${rnf}`],
    ["📦 Total requerimientos", `${rf + rnf}`],
    ["🏃 Sprint actual", "Sprint-01 (completado)"],
  ]
);
```

---

## Tareas por Estado

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const statuses = {};
for (const t of tasks) {
  const s = t.status || "desconocido";
  statuses[s] = (statuses[s] || 0) + 1;
}
const icons = {"done": "✅", "todo": "📋", "in-progress": "🔄", "review": "👀", "blocked": "🚫"};
const headers = ["Estado", "Cantidad", "Porcentaje"];
const total = tasks.length;
const rows = [];
for (const [status, count] of Object.entries(statuses).sort()) {
  const icon = icons[status] || "❓";
  const pct = Math.round((count/total)*100);
  rows.push([`${icon} ${status}`, count, `${pct}%`]);
}
dv.table(headers, rows);
```

---

## Tareas por Responsable

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const people = {};
for (const t of tasks) {
  const a = t.assignee || "Sin asignar";
  if (!people[a]) people[a] = {total: 0, done: 0, todo: 0, hours: 0};
  people[a].total++;
  if (t.status === "done") people[a].done++;
  else people[a].todo++;
  people[a].hours += parseInt(String(t.effort)) || 0;
}
const headers = ["👤 Responsable", "Total", "✅ Done", "📋 Pendiente", "⏱️ Horas Est."];
const rows = [];
for (const [person, d] of Object.entries(people).sort()) {
  rows.push([person, d.total, d.done, d.todo, `${d.hours}h`]);
}
dv.table(headers, rows);
```

---

## Tareas por Fase

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const phases = {};
for (const t of tasks) {
  const p = t.phase || "sin fase";
  if (!phases[p]) phases[p] = {total: 0, done: 0};
  phases[p].total++;
  if (t.status === "done") phases[p].done++;
}
const order = ["investigación", "análisis", "requerimientos", "integración", "gestión", "diseño", "implementación", "testing"];
const headers = ["📍 Fase", "Total", "Done", "Progreso"];
const rows = [];
const sorted = Object.entries(phases).sort((a,b) => order.indexOf(a[0]) - order.indexOf(b[0]));
for (const [phase, data] of sorted) {
  const pct = Math.round((data.done / data.total) * 100);
  const bar = "█".repeat(Math.round(pct/10)) + "░".repeat(10 - Math.round(pct/10));
  rows.push([phase, data.total, data.done, `${bar} ${pct}%`]);
}
dv.table(headers, rows);
```

---

## Tareas por Módulo

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const modules = {};
for (const t of tasks) {
  const m = t.module || "sin módulo";
  if (!modules[m]) modules[m] = {total: 0, done: 0};
  modules[m].total++;
  if (t.status === "done") modules[m].done++;
}
const headers = ["🧩 Módulo", "Tareas", "Done", "Pendiente"];
const rows = [];
for (const [mod, data] of Object.entries(modules).sort()) {
  rows.push([mod, data.total, data.done, data.total - data.done]);
}
dv.table(headers, rows);
```

---

## Requerimientos por Módulo

```dataview
TABLE WITHOUT ID
  module as "Módulo",
  length(rows) as "Total RF",
  length(filter(rows, (r) => r.priority = "must")) as "Must",
  length(filter(rows, (r) => r.priority = "should")) as "Should",
  length(filter(rows, (r) => r.priority = "could")) as "Could"
FROM "03-Requerimientos/Funcionales"
WHERE type = "requirement/functional"
GROUP BY module
```

## Requerimientos por Prioridad (MoSCoW)

```dataview
TABLE WITHOUT ID
  priority as "Prioridad",
  length(rows) as "Cantidad"
FROM "03-Requerimientos"
WHERE type = "requirement/functional" OR type = "requirement/non-functional"
GROUP BY priority
SORT priority ASC
```

---

## Cobertura de Validación

> [!note]- 📋 Cobertura completa de validación (expandir)
>
> ```dataview
> TABLE WITHOUT ID
>   id as "ID",
>   title as "Requerimiento",
>   validation as "Validación",
>   status as "Estado"
> FROM "03-Requerimientos"
> WHERE (type = "requirement/functional" OR type = "requirement/non-functional")
> SORT id ASC
> ```

---

## Timeline de Completación (Sprint 01)

> [!note]- 📈 Burndown Sprint 01 (expandir)
>
> ```dataviewjs
> const tasks = dv.pages('"05-Sprints/Sprint-01"').where(t => t.type === "task" && t.completed);
> const byDate = {};
> for (const t of tasks) {
>   const d = t.completed.toString().slice(0, 10);
>   byDate[d] = (byDate[d] || 0) + 1;
> }
> const sorted = Object.entries(byDate).sort();
> let cumulative = 0;
> const headers = ["Fecha", "Completadas ese día", "Acumulado"];
> const rows = [];
> for (const [date, count] of sorted) {
>   cumulative += count;
>   rows.push([date, count, cumulative]);
> }
> dv.table(headers, rows);
> ```

---

## Velocidad por Sprint

| Sprint | Tareas Plan. | Tareas Done | Velocidad | Días |
|--------|-------------|-------------|-----------|------|
| Sprint-01 | 20 | 20 | 100% | 23 |
| Sprint-02 | 5 | 0 | 0% | (en curso) |

---

*Métricas dinámicas · Dataview JS + Tracker · Última configuración: 2026-02-27*
