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

```sqlseal
SELECT
  COUNT(*) as "⚠️ Total",
  SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as "🔴 Abiertos",
  SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as "🟡 Aceptados",
  SUM(CASE WHEN status = 'mitigated' THEN 1 ELSE 0 END) as "🟢 Mitigados",
  SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as "⚫ Cerrados",
  SUM(CASE WHEN severity = 'crítico' THEN 1 ELSE 0 END) as "🔥 Crítico",
  SUM(CASE WHEN severity = 'alto' THEN 1 ELSE 0 END) as "🟠 Alto"
FROM files
WHERE type = 'risk' AND name LIKE 'RSK%'
```

---

## 📑 Tabla Completa de Riesgos

```sqlseal
SELECT
  name AS "ID",
  name AS "Riesgo",
  status AS "Estado",
  severity AS "Severidad",
  category AS "Categoría",
  owner AS "Responsable",
  source AS "Origen",
  review_date AS "Próxima Revisión"
FROM files
WHERE type = 'risk' AND name LIKE 'RSK%'
ORDER BY name ASC
```

---

## 🔴 Riesgos Abiertos (requieren atención)

```sqlseal
SELECT
  name AS "ID",
  name AS "Riesgo",
  severity AS "Severidad",
  probability AS "Probabilidad",
  impact AS "Impacto",
  owner AS "Responsable",
  strategy AS "Estrategia"
FROM files
WHERE type = 'risk' AND name LIKE 'RSK%'
  AND (status = 'open' OR status = 'accepted')
ORDER BY severity DESC
```

---

## 🟢 Riesgos Mitigados / Cerrados

```sqlseal
SELECT
  name AS "ID",
  name AS "Riesgo",
  status AS "Estado",
  severity AS "Severidad"
FROM files
WHERE type = 'risk' AND name LIKE 'RSK%'
  AND (status = 'mitigated' OR status = 'closed')
ORDER BY name ASC
```

---

## 🏷️ Por Categoría

### Técnico
```sqlseal
SELECT name AS "Riesgo", title AS "Título"
FROM files
WHERE type = 'risk' AND category = 'técnico' AND name LIKE 'RSK%'
ORDER BY name ASC
```

### Recurso
```sqlseal
SELECT name AS "Riesgo", title AS "Título"
FROM files
WHERE type = 'risk' AND category = 'recurso' AND name LIKE 'RSK%'
ORDER BY name ASC
```

### Calidad
```sqlseal
SELECT name AS "Riesgo", title AS "Título"
FROM files
WHERE type = 'risk' AND category = 'calidad' AND name LIKE 'RSK%'
ORDER BY name ASC
```

### Calendario
```sqlseal
SELECT name AS "Riesgo", title AS "Título"
FROM files
WHERE type = 'risk' AND category = 'calendario' AND name LIKE 'RSK%'
ORDER BY name ASC
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
| [[RSK-010]] | Plazo ajustado para Avance 2 | [[MIN-003]] | Cerrado |
| [[RSK-011]] | 32 SP ambiciosos con carga académica | [[MIN-005]] | Abierto |
| [[RSK-012]] | Sync engine — mayor riesgo técnico | [[MIN-005]] | Abierto |
| [[RSK-013]] | Coordinación logística CONAI para entrevistas | [[MIN-005]] | Abierto |
| [[RSK-014]] | Sin validación con usuarios reales en Sprint-02 | [[MIN-003]] | Aceptado |

---

## 🔗 Riesgos con Decisiones Vinculadas

```sqlseal
SELECT
  name AS "RSK",
  title AS "Riesgo",
  related_decisions AS "ADRs Vinculados"
FROM files
WHERE type = 'risk' AND name LIKE 'RSK%'
  AND related_decisions IS NOT NULL AND related_decisions != ''
ORDER BY name ASC
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
