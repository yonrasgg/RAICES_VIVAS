---
banner_src: "08-Recursos/Imágenes/cover-adr.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: index
title: "Registro de Decisiones (ADR)"
tags:
  - adr
  - decisiones
  - índice
project: raices-vivas
---

← [[00-Dashboard/Home|Volver al Dashboard]] · [[01-Proyecto/Riesgos/Riesgos|Ver Riesgos →]]

# 📋 Registro de Decisiones Arquitectónicas (ADR)

> Todas las decisiones relevantes del proyecto Raíces Vivas, trazadas desde su origen en minutas y daily notes hasta los artefactos que impactan.

---

## 📊 Resumen Ejecutivo

```dataviewjs
const adrs = dv.pages('"01-Proyecto/Decisiones"').where(a => a.type === "adr");
const accepted = adrs.where(a => a.status === "accepted").length;
const proposed = adrs.where(a => a.status === "proposed").length;
const superseded = adrs.where(a => a.status === "superseded").length;
const deprecated = adrs.where(a => a.status === "deprecated").length;
const total = adrs.length;

dv.table(
  ["📊 Métrica", "Valor"],
  [
    ["📝 Total ADRs", total],
    ["✅ Aceptadas", accepted],
    ["🔄 Propuestas", proposed],
    ["🔀 Superseded", superseded],
    ["⛔ Deprecated", deprecated],
  ]
);
```

---

## 📑 Tabla Completa de ADRs

```dataview
TABLE WITHOUT ID
  id AS "ID",
  file.link AS "Decisión",
  status AS "Estado",
  category AS "Categoría",
  module AS "Módulo",
  impact AS "Impacto",
  source AS "Origen",
  date AS "Fecha"
FROM "01-Proyecto/Decisiones"
WHERE type = "adr"
SORT id ASC
```

---

## 🏷️ Por Categoría

### Tecnología
```dataview
LIST
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND category = "tecnología"
SORT id ASC
```

### Proceso
```dataview
LIST
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND category = "proceso"
SORT id ASC
```

### Diseño
```dataview
LIST
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND category = "diseño"
SORT id ASC
```

### Arquitectura
```dataview
LIST
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND category = "arquitectura"
SORT id ASC
```

### Gobernanza
```dataview
LIST
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND category = "gobernanza"
SORT id ASC
```

---

## 🔗 Trazabilidad: ADR ↔ Minuta de Origen

| ADR | Título | Minuta de Origen |
|-----|--------|-----------------|
| [[ADR-001]] | Obsidian como sistema central | [[MIN-001]] |
| [[ADR-002]] | Git + GitHub para control de versiones | [[MIN-001]] |
| [[ADR-003]] | GitHub Projects para gestión ágil | [[MIN-001]] *(superseded por [[ADR-007]])* |
| [[ADR-004]] | Estructura de vault numerada | [[MIN-001]] |
| [[ADR-005]] | Frontmatter estandarizado | [[MIN-001]] |
| [[ADR-006]] | Templates con Templater + QuickAdd | [[MIN-001]] |
| [[ADR-007]] | Migrar a Jira Cloud | Sprint-02 |
| [[ADR-008]] | Stack PWA — React + PouchDB + CouchDB + i18next | [[MIN-002]], aprobado [[MIN-004]] |
| [[ADR-009]] | Gobernanza Cultural — CARE + 4 niveles acceso | [[MIN-002]], aprobado [[MIN-004]] |
| [[ADR-010]] | Mermaid para diagramas técnicos | [[MIN-002]] |
| [[ADR-011]] | Convenciones ER — 3NF + snake_case | [[MIN-002]], [[MIN-004]] |
| [[ADR-012]] | Excalidraw para wireframing | [[MIN-002]], [[MIN-003]] |
| [[ADR-013]] | Walkthrough interno como validación | [[MIN-003]] |
| [[ADR-014]] | Límites multimedia por conectividad territorial | [[MIN-004]] |
| [[ADR-015]] | EPIC-TRANS y distribución Sprint 03-05 | [[MIN-005]] |
| [[ADR-016]] | Instrumentos validación — SUS + WCAG 2.1 AA | [[MIN-005]] |

---

## ⚠️ ADRs con Riesgos Asociados

```dataview
TABLE WITHOUT ID
  id AS "ADR",
  title AS "Decisión",
  related_risks AS "Riesgos Vinculados"
FROM "01-Proyecto/Decisiones"
WHERE type = "adr" AND related_risks AND length(related_risks) > 0
SORT id ASC
```

---

## 📅 Línea Temporal

```dataview
TABLE WITHOUT ID
  id AS "ID",
  title AS "Decisión",
  date AS "Fecha",
  status AS "Estado"
FROM "01-Proyecto/Decisiones"
WHERE type = "adr"
SORT date ASC
```

---

## 📌 Notas

- Las ADRs se crean con `Ctrl+P → QuickAdd: Nueva Decisión (ADR)` o promoviendo desde una minuta
- Cada ADR debe incluir: contexto, opciones consideradas, decisión, consecuencias y referencias
- El campo `source` traza la decisión a su minuta o daily note de origen
- Para crear una nueva ADR, usar la plantilla [[99-Templates/_template-adr|_template-adr]]
