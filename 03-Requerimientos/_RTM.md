---
type: index
title: Matriz de Trazabilidad de Requerimientos (RTM)
project: raices-vivas
tags:
  - requerimiento
  - trazabilidad
  - index
banner_src: "08-Recursos/Imágenes/cover-requerimientos.png"
banner_src_x: 0.47714
banner_src_y: 0.42
assignee:
author: Geovanny
---
# Matriz de Trazabilidad de Requerimientos (RTM)

> Vista dinámica generada por Dataview. Cada requerimiento es una nota independiente con frontmatter estructurado.

## Matriz Dinámica

### Requerimientos Funcionales — Completo

```dataview
TABLE WITHOUT ID
  id as "ID",
  module as "Módulo",
  wbs as "WBS",
  title as "Descripción",
  priority as "MoSCoW",
  actor as "Actor",
  source as "Fuente",
  validation as "Validación",
  status as "Estado"
FROM "03-Requerimientos/Funcionales"
WHERE type = "requirement/functional"
SORT wbs ASC
```

### Requerimientos No Funcionales — Completo

```dataview
TABLE WITHOUT ID
  id as "ID",
  category as "Categoría",
  wbs as "WBS",
  title as "Descripción",
  priority as "MoSCoW",
  metric as "Métrica",
  status as "Estado"
FROM "03-Requerimientos/No Funcionales"
WHERE type = "requirement/non-functional"
SORT wbs ASC
```

### Resumen por Prioridad

| MoSCoW | Significado | Criterio |
|--------|------------|----------|
| **must** | Crítico | Sin esto el sistema no cumple su propósito |
| **should** | Importante | Alto valor, pero viable sin él en MVP |
| **could** | Deseable | Mejora la experiencia, bajo riesgo de omisión |
| **wont** | Fuera de alcance actual | Documentado para futuras fases |

### Leyenda de Estado

| Estado | Significado |
|--------|------------|
| `draft` | Borrador inicial, requiere revisión |
| `review` | En revisión por equipo o stakeholder |
| `approved` | Aprobado y listo para diseño/implementación |
| `implemented` | Implementado en código |
| `tested` | Verificado con pruebas |

### Cobertura de Tareas por Requerimiento

```dataviewjs
const tasks = dv.pages('"05-Sprints"').where(p => p.type === "task" || p.type === "subtask");
const reqs = dv.pages('"03-Requerimientos"').where(p => p.type && p.type.startsWith("requirement"));

const rows = reqs.map(req => {
  const name = req.file.name;
  const linkedTasks = tasks.where(t => {
    const r = t.requirement;
    if (!r || r === "N/A") return false;
    if (Array.isArray(r)) return r.map(String).includes(name);
    return String(r) === name;
  });
  const total = linkedTasks.length;
  const done = linkedTasks.where(t => t.status === "done").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const bar = total > 0 ? `${"█".repeat(Math.round(pct/10))}${"░".repeat(10 - Math.round(pct/10))} ${pct}%` : "";
  const coverage = total > 0 ? `${done}/${total} ${bar}` : "⚠️ Sin tareas";
  return [req.file.link, req.module || req.category || "—", req.priority || "—", req.status, coverage];
});

dv.table(["Requerimiento", "Módulo", "MoSCoW", "Estado", "Cobertura (done/total)"], rows);
```

### Vinculación Jira (Epics → Stories)

```dataview
TABLE WITHOUT ID
  key as "Jira Key",
  summary as "Epic / Story",
  issuetype as "Tipo",
  parent as "Parent",
  status as "Estado"
FROM "05-Sprints/Epics" OR "05-Sprints/Stories"
WHERE type = "epic" OR type = "story"
SORT key ASC
```
