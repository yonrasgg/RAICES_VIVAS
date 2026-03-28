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

```sqlseal
TEMPLATE
{{#each data}}
| 📊 Métrica | Valor |
|---|---|
| 📝 Total ADRs | {{this.total}} |
| ✅ Aceptadas | {{this.accepted}} |
| 🔄 Propuestas | {{this.proposed}} |
| 🔀 Superseded | {{this.superseded}} |
| ⛔ Deprecated | {{this.deprecated}} |
{{/each}}
SELECT
  COUNT(*) as total,
  SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted,
  SUM(CASE WHEN status = 'proposed' THEN 1 ELSE 0 END) as proposed,
  SUM(CASE WHEN status = 'superseded' THEN 1 ELSE 0 END) as superseded,
  SUM(CASE WHEN status = 'deprecated' THEN 1 ELSE 0 END) as deprecated
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
```

---

## 📑 Tabla Completa de ADRs

```sqlseal
SELECT
  id AS "ID",
  name AS "Decisión",
  status AS "Estado",
  category AS "Categoría",
  module AS "Módulo",
  impact AS "Impacto",
  source AS "Origen",
  date AS "Fecha"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
```

---

## 🏷️ Por Categoría

### Tecnología
```sqlseal
SELECT id, name AS "Decisión", title AS "Título"
FROM files
WHERE type = 'adr' AND category = 'tecnología' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
```

### Proceso
```sqlseal
SELECT id, name AS "Decisión", title AS "Título"
FROM files
WHERE type = 'adr' AND category = 'proceso' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
```

### Diseño
```sqlseal
SELECT id, name AS "Decisión", title AS "Título"
FROM files
WHERE type = 'adr' AND category = 'diseño' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
```

### Arquitectura
```sqlseal
SELECT id, name AS "Decisión", title AS "Título"
FROM files
WHERE type = 'adr' AND category = 'arquitectura' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
```

### Gobernanza
```sqlseal
SELECT id, name AS "Decisión", title AS "Título"
FROM files
WHERE type = 'adr' AND category = 'gobernanza' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY id ASC
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

```sqlseal
SELECT
  id AS "ADR",
  title AS "Decisión",
  related_risks AS "Riesgos Vinculados"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
  AND related_risks IS NOT NULL AND related_risks != ''
ORDER BY id ASC
```

---

## 📅 Línea Temporal

```sqlseal
SELECT
  id AS "ID",
  title AS "Decisión",
  date AS "Fecha",
  status AS "Estado"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY date ASC
```

---

## 📌 Notas

- Las ADRs se crean con `Ctrl+P → QuickAdd: Nueva Decisión (ADR)` o promoviendo desde una minuta
- Cada ADR debe incluir: contexto, opciones consideradas, decisión, consecuencias y referencias
- El campo `source` traza la decisión a su minuta o daily note de origen
- Para crear una nueva ADR, usar la plantilla [[99-Templates/_template-adr|_template-adr]]
