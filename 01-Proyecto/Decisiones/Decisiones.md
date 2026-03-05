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
