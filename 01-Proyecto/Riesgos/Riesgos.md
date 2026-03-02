---
type: index
title: "Registro de Riesgos (RSK)"
project: raices-vivas
tags:
  - riesgo
  - registro
  - índice
banner_src: "08-Recursos/Imágenes/cover-riesgos.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# ⚠️ Registro de Riesgos (RSK)

> Todos los riesgos identificados, evaluados y gestionados del proyecto.

---

## 📊 Resumen

```dataviewjs
const risks = dv.pages('"01-Proyecto/Riesgos"').where(p => p.type === "risk");
const open = risks.where(p => p.status === "open" || p.status === "active").length;
const mitigated = risks.where(p => p.status === "mitigated").length;
const closed = risks.where(p => p.status === "closed").length;

dv.paragraph(`**${risks.length}** riesgos registrados — 🔴 ${open} abiertos · 🟡 ${mitigated} mitigados · 🟢 ${closed} cerrados`);
```

---

## 📋 Lista de Riesgos

```dataview
TABLE
  status AS "Estado",
  category AS "Categoría",
  probability AS "Prob.",
  impact AS "Impacto",
  severity AS "Severidad",
  owner AS "Owner"
FROM "01-Proyecto/Riesgos"
WHERE type = "risk"
SORT id ASC
```

---

## ➕ Nuevo Riesgo

> `Ctrl+P` → QuickAdd → **⚠️ Nuevo Riesgo**

---

← [[00-Dashboard/Home|Volver al Dashboard]]
