---
banner_src: "08-Recursos/Imágenes/cover-riesgos.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: index
title: "Registro de Riesgos (RSK)"
tags:
  - riesgo
  - registro
  - índice
project: raices-vivas
---

← [[00-Dashboard/Home|Volver al Dashboard]] · [[01-Proyecto/Decisiones/Decisiones|Ver Decisiones →]]

# ⚠️ Registro de Riesgos del Proyecto

> Todos los riesgos identificados en minutas, daily notes y weekly notes del proyecto Raíces Vivas, con trazabilidad completa a decisiones y requerimientos.

---

## 📊 Resumen Ejecutivo

```dataviewjs
const risks = dv.pages('"01-Proyecto/Riesgos"').where(r => r.type === "risk");
const open = risks.where(r => r.status === "open").length;
const mitigated = risks.where(r => r.status === "mitigated").length;
const closed = risks.where(r => r.status === "closed").length;
const accepted = risks.where(r => r.status === "accepted").length;
const total = risks.length;
const critical = risks.where(r => r.severity === "crítico").length;
const high = risks.where(r => r.severity === "alto").length;

dv.table(
  ["📊 Métrica", "Valor"],
  [
    ["⚠️ Total Riesgos", total],
    ["🔴 Abiertos", open],
    ["🟡 Aceptados", accepted],
    ["🟢 Mitigados", mitigated],
    ["⚫ Cerrados", closed],
    ["🔥 Severidad Crítica", critical],
    ["🟠 Severidad Alta", high],
  ]
);
```

---

## 📑 Tabla Completa de Riesgos

```dataview
TABLE WITHOUT ID
  id AS "ID",
  file.link AS "Riesgo",
  status AS "Estado",
  severity AS "Severidad",
  category AS "Categoría",
  owner AS "Responsable",
  source AS "Origen",
  review_date AS "Próxima Revisión"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk"
SORT id ASC
```

---

## 🔴 Riesgos Abiertos (requieren atención)

```dataview
TABLE WITHOUT ID
  id AS "ID",
  file.link AS "Riesgo",
  severity AS "Severidad",
  probability AS "Probabilidad",
  impact AS "Impacto",
  owner AS "Responsable",
  strategy AS "Estrategia"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND (status = "open" OR status = "accepted")
SORT severity DESC
```

---

## 🟢 Riesgos Mitigados / Cerrados

```dataview
TABLE WITHOUT ID
  id AS "ID",
  file.link AS "Riesgo",
  status AS "Estado",
  severity AS "Severidad"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND (status = "mitigated" OR status = "closed")
SORT id ASC
```

---

## 🏷️ Por Categoría

### Técnico
```dataview
LIST
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND category = "técnico"
SORT id ASC
```

### Recurso
```dataview
LIST
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND category = "recurso"
SORT id ASC
```

### Calidad
```dataview
LIST
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND category = "calidad"
SORT id ASC
```

### Calendario
```dataview
LIST
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND category = "calendario"
SORT id ASC
```

---

## 🔗 Trazabilidad: RSK ↔ Minuta de Origen

| RSK | Título | Minuta de Origen | Estado |
|-----|--------|-----------------|--------|
| [[RSK-001]] | Dependencia en Geovanny para config vault | [[MIN-001]] | Mitigado |
| [[RSK-002]] | Conflictos Git entre 3 integrantes | [[MIN-001]] | Abierto |
| [[RSK-003]] | Curva aprendizaje Obsidian | [[MIN-001]] | Mitigado |
| [[RSK-004]] | Migración a GitHub Projects | [[MIN-001]] | Cerrado |
| [[RSK-005]] | Complejidad del frontmatter | [[MIN-001]] | Mitigado |
| [[RSK-006]] | Pérdida de trabajo por falla Git sync | [[MIN-001]] | Abierto |
| [[RSK-007]] | Complejidad módulo SAB (saberes + CARE) | [[MIN-002]], [[MIN-004]] | Abierto |
| [[RSK-008]] | Datos simulados no reflejan realidad territorial | [[MIN-002]], [[MIN-003]], [[MIN-004]] | Abierto |
| [[RSK-009]] | 7 territorios sin conectividad estable | [[MIN-004]] | Abierto |
| [[RSK-010]] | Plazo ajustado para Avance 2 | [[MIN-003]] | Abierto |
| [[RSK-011]] | 32 SP ambiciosos con carga académica | [[MIN-005]] | Abierto |
| [[RSK-012]] | Sync engine — mayor riesgo técnico | [[MIN-005]] | Abierto |
| [[RSK-013]] | Coordinación logística CONAI para entrevistas | [[MIN-005]] | Abierto |
| [[RSK-014]] | Sin validación con usuarios reales en Sprint-02 | [[MIN-003]] | Aceptado |

---

## 🔗 Riesgos con Decisiones Vinculadas

```dataview
TABLE WITHOUT ID
  id AS "RSK",
  title AS "Riesgo",
  related_decisions AS "ADRs Vinculados"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk" AND related_decisions AND length(related_decisions) > 0
SORT id ASC
```

---

## 📈 Matriz de Probabilidad × Impacto

| | **Bajo** | **Medio** | **Alto** |
|---|---------|-----------|---------|
| **Alta** | | RSK-007, RSK-008, RSK-013 | RSK-009 |
| **Media** | | RSK-010 | RSK-002, RSK-011, RSK-012 |
| **Baja** | | RSK-006 | |

---

## 📌 Notas

- Los riesgos se crean con `Ctrl+P → QuickAdd: Nuevo Riesgo` o promoviendo desde una minuta
- Cada riesgo debe incluir: descripción, causa raíz, trigger, plan de respuesta (preventivo + contingencia)
- El campo `source` traza el riesgo a su minuta o daily note de origen
- Revisiones: verificar `review_date` de cada riesgo abierto periódicamente
- Para crear un nuevo riesgo, usar la plantilla [[99-Templates/_template-riesgo|_template-riesgo]]
