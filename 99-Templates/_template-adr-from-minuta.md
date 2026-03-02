<%*
// ══════════════════════════════════════════════════════════════
// 🏗️ Promover Decisión desde Minuta → ADR Formal
// ══════════════════════════════════════════════════════════════
// Uso: Desde una minuta, seleccionar el texto de la decisión
//      y ejecutar QuickAdd → "🏗️ Promover Decisión"
//
// Formato esperado en la minuta:
//   - [ ] Decisión tomada — Justificación breve
// ══════════════════════════════════════════════════════════════

// ── Auto-ID: calcula el siguiente ADR-XXX consecutivo ──
const adrPages = dv.pages('"01-Proyecto/Decisiones"').where(p => p.type === "adr" && p.id);
const ids = adrPages.map(p => parseInt(String(p.id).replace("ADR-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `ADR-${String(maxId + 1).padStart(3, "0")}`;

// ── Extraer datos de la línea seleccionada ──
const selection = tp.file.selection || "";
let extractedTitle = "";

if (selection) {
  let clean = selection.replace(/^-\s*\[.\]\s*/, "").trim();
  // Quitar emojis comunes
  clean = clean.replace(/[📅✅❌⏫🔺🔼🔽⏬🏗️⚠️]\s*/g, "").trim();
  extractedTitle = clean;
}

// ── Detectar minuta activa como source ──
const activeFile = tp.config.active_file;
let detectedSource = "";
if (activeFile && activeFile.path.includes("07-Reuniones")) {
  const cache = app.metadataCache.getFileCache(activeFile);
  if (cache && cache.frontmatter && cache.frontmatter.id) {
    detectedSource = cache.frontmatter.id;
  } else {
    detectedSource = activeFile.basename;
  }
}

// ── Prompts (con valores pre-rellenados) ──
const title = await tp.system.prompt("Título de la decisión", extractedTitle);
const status = await tp.system.suggester(
  ["proposed", "accepted", "deprecated", "superseded"],
  ["proposed", "accepted", "deprecated", "superseded"],
  false, "Estado"
);
const category = await tp.system.suggester(
  ["arquitectura", "tecnología", "proceso", "diseño", "integración", "seguridad", "gobernanza", "otro"],
  ["arquitectura", "tecnología", "proceso", "diseño", "integración", "seguridad", "gobernanza", "otro"],
  false, "Categoría"
);
const module_ = await tp.system.suggester(
  ["educacion", "saberes", "salud", "transversal", "proyecto"],
  ["educacion", "saberes", "salud", "transversal", "proyecto"],
  false, "Módulo afectado"
);
const impact = await tp.system.suggester(
  ["alto", "medio", "bajo"],
  ["alto", "medio", "bajo"],
  false, "Impacto"
);
const source = await tp.system.prompt("Minuta origen", detectedSource);
const today = tp.date.now("YYYY-MM-DD");

// ── Renombrar archivo al ID ──
await tp.file.rename(nextId);
-%>
---
banner_src: "08-Recursos/Imágenes/cover-adr.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: adr
id: <% nextId %>
title: "<% title %>"
status: <% status %>
category: <% category %>
module: <% module_ %>
impact: <% impact %>
deciders:
  - "Geovanny"
  - "Elkin"
  - "Santiago"
source: "<% source %>"
date: <% today %>
superseded_by: ""
related_requirements: []
related_risks: []
created: <% today %>
updated: <% today %>
tags:
  - adr
  - decisión
---

# <% nextId %>: <% title %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(proposed), option(accepted), option(deprecated), option(superseded)):status]` |
| **Categoría** | `INPUT[suggester(option(arquitectura), option(tecnología), option(proceso), option(diseño), option(integración), option(seguridad), option(gobernanza), option(otro)):category]` |
| **Impacto** | `INPUT[suggester(option(alto), option(medio), option(bajo)):impact]` |
| **Módulo** | `INPUT[suggester(option(educacion), option(saberes), option(salud), option(transversal), option(proyecto)):module]` |

## Contexto

> Decisión originada en [[<% source %>]].

## Opciones Consideradas

| # | Opción | Pros | Contras |
|---|--------|------|---------|
| 1 | **Opción A** | | |
| 2 | **Opción B** | | |

## Decisión

> ¿Qué decidimos y por qué?

**Opción seleccionada:** 

## Consecuencias

### Positivas

- 

### Negativas / Riesgos

- 

### Compromisos (Trade-offs)

- 

## Requerimientos Relacionados

- [[]]

## Riesgos Relacionados

- [[]]

## Referencias

- [[<% source %>]]

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación (desde [[<% source %>]]) | |
