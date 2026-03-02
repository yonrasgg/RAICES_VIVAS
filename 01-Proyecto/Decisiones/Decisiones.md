---
type: index
title: "Registro de Decisiones (ADR)"
project: raices-vivas
tags:
  - adr
  - decisiones
  - índice
banner_src: "08-Recursos/Imágenes/cover-adr.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# 🏗️ Registro de Decisiones (ADR)

> Todas las decisiones arquitectónicas y de proceso documentadas como **Architecture Decision Records**.

---

## 📊 Resumen

```dataviewjs
const adrs = dv.pages('"01-Proyecto/Decisiones"').where(p => p.type === "adr");
const accepted = adrs.where(p => p.status === "accepted").length;
const proposed = adrs.where(p => p.status === "proposed").length;
const deprecated = adrs.where(p => p.status === "deprecated").length;
const superseded = adrs.where(p => p.status === "superseded").length;

dv.paragraph(`**${adrs.length}** decisiones registradas — ✅ ${accepted} aceptadas · 📝 ${proposed} propuestas · ⚠️ ${deprecated} deprecadas · 🔄 ${superseded} sustituidas`);
```

---

## 📋 Lista de Decisiones

```dataview
TABLE
  status AS "Estado",
  category AS "Categoría",
  module AS "Módulo",
  impact AS "Impacto",
  date AS "Fecha"
FROM "01-Proyecto/Decisiones"
WHERE type = "adr"
SORT id ASC
```

---

## ➕ Nueva Decisión

> `Ctrl+P` → QuickAdd → **🏗️ Nuevo ADR**

---

← [[00-Dashboard/Home|Volver al Dashboard]]
