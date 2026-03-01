---
type: dashboard
title: "Raíces Vivas — Centro de Control"
project: raices-vivas
cssclass: dashboard
banner_src: "08-Recursos/Imágenes/cover-dashboard.png"
banner_src_y: 0.38
tags:
  - dashboard
  - home
banner_src_x: 0.47714
---
# 🎛️ Raíces Vivas — Centro de Control

> **Sistema Integral de Apoyo a Comunidades Indígenas**
> 🌿 Equipo: **Geovanny** (Lead/Arquitecto) · **Elkin** (Líder Investigación) · **Santiago** (Líder QA)

---

## 📊 Indicadores Clave (KPIs)

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const done = tasks.where(t => t.status === "done").length;
const total = tasks.length;
const pct = total > 0 ? Math.round((done/total)*100) : 0;

// Sprint actual
const groups = {};
for (const t of tasks.where(t => t.sprint)) {
  const s = String(t.sprint);
  if (!groups[s]) groups[s] = { active: 0, done: 0, total: 0 };
  groups[s].total++;
  if (t.status === "done") groups[s].done++;
  else groups[s].active++;
}
const sorted = Object.keys(groups).sort();
let current = sorted[sorted.length - 1] || "N/A";
for (const s of sorted) { if (groups[s].active > 0) { current = s; break; } }
const g = groups[current] || { done: 0, total: 0 };

// Requerimientos
const rf = dv.pages('"03-Requerimientos/Funcionales"').where(r => r.type === "requirement/functional").length;
const rnf = dv.pages('"03-Requerimientos/No Funcionales"').where(r => r.type === "requirement/non-functional").length;

// Riesgos
const risks = dv.pages('"01-Proyecto/Riesgos"').where(r => r.type === "risk");
const openRisks = risks.where(r => r.status === "open").length;

// ADR
const adrs = dv.pages('"01-Proyecto/Decisiones"').where(d => d.type === "adr");
const accepted = adrs.where(d => d.status === "accepted").length;
const proposed = adrs.where(d => d.status === "proposed").length;

// Horas (estimadas vs reales)
let estHours = 0, actHours = 0, doneEstH = 0, doneActH = 0;
for (const t of tasks.where(t => t.effort)) {
  const est = parseInt(String(t.effort)) || 0;
  const act = t.effort_actual ? (parseInt(String(t.effort_actual)) || 0) : 0;
  estHours += est;
  actHours += act || est;
  if (t.status === "done") { doneEstH += est; doneActH += act || est; }
}

// Calidad
const blocked = tasks.where(t => t.status === "blocked").length;
const defectRate = total > 0 ? Math.round((blocked / total) * 100) : 0;

// Finanzas (usa horas reales para costos)
const tarifas = { "Geovanny": 12248.23, "Elkin": 12248.23, "Santiago": 12248.23 };
let estCost = 0, actCost = 0;
for (const t of tasks.where(t => t.effort)) {
  const est = parseInt(String(t.effort)) || 0;
  const act = t.effort_actual ? (parseInt(String(t.effort_actual)) || 0) : 0;
  const tarifa = tarifas[t.assignee] || 5000;
  estCost += est * tarifa;
  actCost += (act || est) * tarifa;
}

dv.table(
  ["📊 Indicador", "Valor", "Detalle"],
  [
    ["🎯 Progreso General", `**${pct}%** (${done}/${total})`, pct >= 80 ? "🟢" : pct >= 50 ? "🟡" : "🔴"],
    ["✅ Sprint Actual", `**${current}**`, `${g.done}/${g.total} completadas`],
    ["📋 Requerimientos", `**${rf + rnf}** total`, `${rf} RF · ${rnf} RNF`],
    ["⚠️ Riesgos", openRisks > 0 ? `**${openRisks}** abierto(s)` : "✅ Bajo control", `${risks.length} registrados`],
    ["🏗️ Decisiones (ADR)", `**${accepted}** aceptadas`, `${proposed} propuestas · ${adrs.length} total`],
    ["⏱️ Horas (est.)", `**${estHours}h** planificadas`, `${doneEstH}h en tareas done`],
    ["⏱️ Horas (real)", `**${doneActH}h** ejecutadas`, actHours !== estHours ? `Δ ${actHours - estHours > 0 ? "+" : ""}${actHours - estHours}h` : "✅ En estimado"],
    ["🎯 Calidad (LSS)", `Defectos: **${defectRate}%**`, `Throughput: **${done}** tareas`],
    ["💰 Costo (est.)", `₡${estCost.toLocaleString()}`, `~$${Math.round(estCost / 535).toLocaleString()} USD`],
    ["💰 Costo (real)", `₡${actCost.toLocaleString()}`, `~$${Math.round(actCost / 535).toLocaleString()} USD`]
  ]
);
```

---

## 🚀 Acciones Rápidas

> **Cómo usar:** Haz clic en cualquier botón → se abre el menú QuickAdd → selecciona la opción correspondiente y completa los campos solicitados.

=== start-multi-column: quick-actions
```column-settings
number of columns: 4
border: off
shadow: off
```

```button
name ➕ Nueva Tarea
type command
action QuickAdd: Run QuickAdd
color blue
```

```button
name 📋 Nuevo RF
type command
action QuickAdd: Run QuickAdd
color cyan
```

```button
name 📋 Promover Action Item
type command
action QuickAdd: Run QuickAdd
color blue
```

=== end-column ===

```button
name 📝 Nueva Minuta
type command
action QuickAdd: Run QuickAdd
color green
```

```button
name 🔒 Nuevo RNF
type command
action QuickAdd: Run QuickAdd
color cyan
```

```button
name 🏗️ Promover Decisión
type command
action QuickAdd: Run QuickAdd
color purple
```

=== end-column ===

```button
name ⚠️ Nuevo Riesgo
type command
action QuickAdd: Run QuickAdd
color yellow
```

```button
name 🎤 Entrevista
type command
action QuickAdd: Run QuickAdd
color orange
```

```button
name ⚠️ Promover Riesgo
type command
action QuickAdd: Run QuickAdd
color yellow
```

=== end-column ===

```button
name 🏗️ Nuevo ADR
type command
action QuickAdd: Run QuickAdd
color purple
```

```button
name 📦 Backlog
type link
action obsidian://open?vault=RAICES_VIVAS&file=05-Sprints%2FBacklog
color default
```

```button
name 💰 Finanzas
type link
action obsidian://open?vault=RAICES_VIVAS&file=01-Proyecto%2FFinanzas
color green
```

=== end-multi-column

> **12 macros disponibles en QuickAdd:** Nueva Tarea · Nueva Minuta · Nuevo RF · Nuevo RNF · Nuevo Riesgo · Nuevo ADR · Entrevista · Sprint Planning · Sprint Review · 📋 Promover Action Item · 🏗️ Promover Decisión · ⚠️ Promover Riesgo

---

## 📈 Colaboración del Equipo

```chart
type: pie
labels: [Geovanny, Elkin, Santiago]
series:
  - title: Tareas Asignadas
    data: [8, 6, 6]
width: 50%
labelColors: true
```

> *Gráfico de referencia. La tabla dinámica abajo muestra datos en tiempo real.*

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const people = {};
const total = tasks.length;
for (const t of tasks) {
  const a = t.assignee || "Sin asignar";
  if (!people[a]) people[a] = { total: 0, done: 0, inProgress: 0, todo: 0, estH: 0, actH: 0 };
  people[a].total++;
  const est = parseInt(String(t.effort)) || 0;
  const act = t.effort_actual ? (parseInt(String(t.effort_actual)) || 0) : 0;
  people[a].estH += est;
  people[a].actH += act || est;
  if (t.status === "done") people[a].done++;
  else if (t.status === "in-progress") people[a].inProgress++;
  else people[a].todo++;
}
const headers = ["👤 Integrante", "Asignadas", "✅ Done", "🔄 En curso", "📋 Pend.", "% Colab.", "⏱️ Est.", "⏱️ Real"];
const rows = [];
for (const [person, d] of Object.entries(people).sort()) {
  const pct = total > 0 ? Math.round((d.total / total) * 100) : 0;
  const bar = "█".repeat(Math.round(pct / 5)) + "░".repeat(20 - Math.round(pct / 5));
  rows.push([person, d.total, d.done, d.inProgress, d.todo, `${bar} ${pct}%`, `${d.estH}h`, `${d.actH}h`]);
}
dv.table(headers, rows);
```

---

## 📊 Estado de Tareas

```chart
type: bar
labels: [Done, In Progress, Todo, Blocked, Review]
series:
  - title: Cantidad
    data: [15, 3, 5, 0, 2]
width: 70%
labelColors: true
fill: true
beginAtZero: true
```

> *Gráfico de referencia. La tabla dinámica Dataview abajo muestra datos en tiempo real.*

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
const statuses = {};
for (const t of tasks) {
  const s = t.status || "desconocido";
  statuses[s] = (statuses[s] || 0) + 1;
}
const icons = {"done": "✅", "todo": "📋", "in-progress": "🔄", "review": "👀", "blocked": "🚫"};
const total = tasks.length;
const headers = ["Estado", "Cantidad", "Porcentaje", "Barra"];
const rows = [];
for (const [status, count] of Object.entries(statuses).sort()) {
  const icon = icons[status] || "❓";
  const pct = Math.round((count/total)*100);
  const bar = "█".repeat(Math.round(pct/5)) + "░".repeat(20 - Math.round(pct/5));
  rows.push([`${icon} ${status}`, count, `${pct}%`, bar]);
}
dv.table(headers, rows);
```

---

## 🗺️ Navegación del Proyecto

=== start-multi-column: nav-panel
```column-settings
number of columns: 3
border: off
shadow: off
```

### 📁 Gobierno y Gestión
- 👥 [[01-Proyecto/Equipo|Equipo]]
- 📜 [[01-Proyecto/Charter|Charter]]
- 🎯 [[01-Proyecto/Alcance|Alcance]]
- 👤 [[01-Proyecto/Stakeholders|Stakeholders]]
- 📖 [[01-Proyecto/Glosario|Glosario]]
- 📋 [[01-Proyecto/Plan de Gestión|Plan de Gestión]]
- 📕 [[01-Proyecto/Guía de Workflow|Guía de Workflow]]
- 🚀 [[01-Proyecto/Onboarding|Onboarding]]
- 💰 [[01-Proyecto/Finanzas|Finanzas]]
- 🗂️ [[01-Proyecto/Decisiones/|Decisiones (ADR)]]
- ⚠️ [[01-Proyecto/Riesgos/|Riesgos (RSK)]]

=== end-column ===

### 📐 Técnico y Arquitectura
- 📐 [[03-Requerimientos/_RTM|RTM — Trazabilidad]]
- 🏗️ [[04-Arquitectura/WBS|WBS]]
- 🏗️ [[04-Arquitectura/Visión General|Arquitectura General]]
- 🏗️ [[04-Arquitectura/Modelo de Datos|Modelo de Datos]]
- 💻 [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]]
- 📊 [[00-Dashboard/Roadmap|Roadmap / Gantt]]
- 📈 [[00-Dashboard/Métricas|Métricas de Avance]]
- ✅ [[09-QA/README|QA — Calidad]]

=== end-column ===

### 🔬 Investigación y Entregables
- 🔍 [[02-Investigación/Contexto/Educación|Contexto EDU]]
- 🔍 [[02-Investigación/Contexto/Saberes Ancestrales|Contexto SAB]]
- 🔍 [[02-Investigación/Contexto/Salud Comunitaria|Contexto SAL]]
- 🗺️ [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa Territorios]]
- 📄 [[06-Entregables/Avance-1/Raíces Vivas – Sistema Integral de Apoyo a Comunidades Indígenas|Avance 1]]
- 📦 [[05-Sprints/Sprint-01/Sprint-01-Planning|Sprint 01]]
- 📦 [[05-Sprints/Sprint-02/Sprint-02-Planning|Sprint 02]]
- 📝 [[07-Reuniones/MIN-001|Minuta Kickoff]]

=== end-multi-column

---

## 📅 Timeline del Proyecto

```mermaid
gantt
    title Raíces Vivas — Cronograma General
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section 📚 Avance 1
    Investigación           :done,   a1, 2026-02-03, 2026-02-09
    Análisis                :done,   a2, 2026-02-10, 2026-02-16
    Requerimientos          :done,   a3, 2026-02-17, 2026-02-21
    Integración y entrega   :done,   a4, 2026-02-22, 2026-02-25
    ENTREGA AVANCE 1        :milestone, m1, 2026-02-25, 0d
    Setup vault             :done,   a5, 2026-02-26, 2026-02-27

    section 🏗️ Avance 2
    Diseño de arquitectura  :active, b1, 2026-02-28, 2026-03-15
    Modelos ER              :        b2, 2026-03-03, 2026-03-14
    Stack tecnológico       :        b3, 2026-03-01, 2026-03-07
    Prototipos UI           :        b4, 2026-03-10, 2026-03-25
    Validación usuarios     :        b5, 2026-03-20, 2026-04-01
    ENTREGA AVANCE 2        :milestone, m2, 2026-04-01, 0d

    section 💻 Implementación
    Sprint 1 piloto         :        c1, 2026-04-01, 2026-04-15
    Sprint 2 core           :        c2, 2026-04-15, 2026-04-30
    Sprint 3 integración    :        c3, 2026-05-01, 2026-05-15
    Testing                 :        c4, 2026-05-15, 2026-05-30
    ENTREGA FINAL           :milestone, m3, 2026-05-30, 0d
```

---

## 🏃 Tareas Pendientes (Top 10)

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Tarea",
  assignee as "👤",
  status as "Estado",
  priority as "Prioridad",
  due as "📅 Límite"
FROM "05-Sprints"
WHERE type = "task" AND status != "done"
SORT priority ASC, due ASC
LIMIT 10
```

---

## ⚠️ Riesgos Activos

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Riesgo",
  probability as "Prob.",
  impact as "Impacto",
  severity as "Severidad",
  owner as "Responsable",
  status as "Estado"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk"
SORT severity DESC
```

---

## 🏗️ Decisiones Arquitectónicas (ADR)

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Decisión",
  status as "Estado",
  date as "Fecha"
FROM "01-Proyecto/Decisiones"
WHERE type = "adr"
SORT id ASC
```

---

> [!note]- 📋 Estado de Requerimientos por Módulo (expandir)
>
> ### Funcionales
>
> ```dataview
> TABLE WITHOUT ID
>   module as "Módulo",
>   length(rows) as "Total RF",
>   length(filter(rows, (r) => r.priority = "must")) as "Must",
>   length(filter(rows, (r) => r.priority = "should")) as "Should",
>   length(filter(rows, (r) => r.priority = "could")) as "Could"
> FROM "03-Requerimientos/Funcionales"
> WHERE type = "requirement/functional"
> GROUP BY module
> ```
>
> ### No Funcionales
>
> ```dataview
> TABLE WITHOUT ID
>   id as "ID",
>   title as "Requisito",
>   category as "Categoría",
>   priority as "MoSCoW",
>   status as "Estado"
> FROM "03-Requerimientos/No Funcionales"
> WHERE type = "requirement/non-functional"
> SORT priority ASC
> ```

---

> [!note]- 📈 Progreso por Fase (expandir)
>
> ```dataviewjs
> const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task");
> const phases = {};
> for (const t of tasks) {
>   const p = t.phase || "sin fase";
>   if (!phases[p]) phases[p] = {total: 0, done: 0};
>   phases[p].total++;
>   if (t.status === "done") phases[p].done++;
> }
> const headers = ["Fase", "Total", "Done", "Progreso"];
> const rows = [];
> for (const [phase, data] of Object.entries(phases).sort()) {
>   const pct = Math.round((data.done / data.total) * 100);
>   const bar = "█".repeat(Math.round(pct/10)) + "░".repeat(10 - Math.round(pct/10));
>   rows.push([phase, data.total, data.done, `${bar} ${pct}%`]);
> }
> dv.table(headers, rows);
> ```

---

> [!note]- 💰 Resumen Financiero (expandir)
>
> ```dataviewjs
> const tarifas = { "Geovanny": 7500, "Elkin": 6000, "Santiago": 6000 };
> const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task" && t.effort);
> const costos = {};
> for (const t of tasks) {
>   const person = t.assignee || "Sin asignar";
>   const est = parseInt(String(t.effort)) || 0;
>   const act = t.effort_actual ? (parseInt(String(t.effort_actual)) || 0) : 0;
>   const hours = act || est;
>   const tarifa = tarifas[person] || 5000;
>   if (!costos[person]) costos[person] = { estH: 0, actH: 0, estCost: 0, actCost: 0 };
>   costos[person].estH += est;
>   costos[person].actH += hours;
>   costos[person].estCost += est * tarifa;
>   costos[person].actCost += hours * tarifa;
> }
> let grandEst = 0, grandAct = 0;
> const headers = ["👤 Integrante", "H. Est.", "H. Real", "Costo Est. (₡)", "Costo Real (₡)", "Real (USD)"];
> const rows = [];
> for (const [person, data] of Object.entries(costos).sort()) {
>   grandEst += data.estCost;
>   grandAct += data.actCost;
>   rows.push([person, `${data.estH}h`, `${data.actH}h`, `₡${data.estCost.toLocaleString()}`, `₡${data.actCost.toLocaleString()}`, `$${Math.round(data.actCost / 535).toLocaleString()}`]);
> }
> rows.push(["**TOTAL**", "", "", `**₡${grandEst.toLocaleString()}**`, `**₡${grandAct.toLocaleString()}**`, `**$${Math.round(grandAct / 535).toLocaleString()}**`]);
> dv.table(headers, rows);
> dv.paragraph(`> Ver detalle completo en [[01-Proyecto/Finanzas|Gestión Financiera]]`);
> ```

---

> [!note]- 📆 Próximas Fechas Límite (expandir)
>
> ```dataview
> TABLE WITHOUT ID
>   title as "Tarea / Entregable",
>   assignee as "👤",
>   due as "Fecha",
>   status as "Estado"
> FROM ""
> WHERE due AND status != "done" AND due >= date(today)
> SORT due ASC
> LIMIT 10
> ```

---

> [!note]- 📝 Últimas Reuniones (expandir)
>
> ```dataview
> TABLE WITHOUT ID
>   title as "Reunión",
>   date as "Fecha",
>   attendees as "Asistentes"
> FROM "07-Reuniones"
> WHERE type = "meeting"
> SORT date DESC
> LIMIT 5
> ```
>
> *Para documentar reuniones: `Ctrl+P` → QuickAdd → selecciona "Nueva Minuta"*

---

## 🔗 Vistas Transcluidas

### RTM — Matriz de Trazabilidad

![[03-Requerimientos/_RTM#Matriz Dinámica]]

### Sprint Actual — Distribución

![[05-Sprints/Sprint-01/Sprint-01-Planning#Distribución por Responsable]]

---

## 📊 Milestones

| # | Milestone | Fecha | Estado |
|---|-----------|-------|--------|
| M1 | ✅ Avance 1 — Análisis y Requerimientos | 2026-02-25 | ✅ Entregado |
| M2 | 🏗️ Avance 2 — Diseño y Arquitectura | 2026-04-01 | 🔄 En progreso |
| M3 | 💻 Entrega Final — Implementación | 2026-05-30 | ⏳ Pendiente |

---

*Dashboard dinámico · Banners + Buttons + Multi-Column + Dataview + Charts + Mermaid*
*Última configuración: 2026-03-01*
