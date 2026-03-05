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
