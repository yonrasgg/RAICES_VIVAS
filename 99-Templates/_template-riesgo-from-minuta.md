<%*
// ══════════════════════════════════════════════════════════════
// ⚠️ Promover Riesgo desde Minuta → Riesgo Formal
// ══════════════════════════════════════════════════════════════
// Uso: Desde una minuta, seleccionar el texto del riesgo
//      y ejecutar QuickAdd → "⚠️ Promover Riesgo"
//
// Formato esperado en la minuta:
//   - [ ] Riesgo: descripción del riesgo
// ══════════════════════════════════════════════════════════════

// ── Auto-ID: calcula el siguiente RSK-XXX consecutivo ──
const riskPages = dv.pages('"01-Proyecto/Riesgos"').where(p => p.type === "risk" && p.id);
const ids = riskPages.map(p => parseInt(String(p.id).replace("RSK-", "").replace("RISK-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `RSK-${String(maxId + 1).padStart(3, "0")}`;

// ── Extraer datos de la línea seleccionada ──
const selection = tp.file.selection || "";
let extractedTitle = "";

if (selection) {
  let clean = selection.replace(/^-\s*\[.\]\s*/, "").trim();
  // Quitar prefijo "Riesgo:" si existe
  clean = clean.replace(/^[Rr]iesgo:\s*/i, "").trim();
  // Quitar emojis comunes
  clean = clean.replace(/[📅✅❌⏫🔺🔼🔽⏬⚠️🏗️]\s*/g, "").trim();
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
const title = await tp.system.prompt("Título del riesgo", extractedTitle);
const category = await tp.system.suggester(
  ["técnico", "alcance", "recurso", "calendario", "calidad", "externo", "cultural", "comunicación"],
  ["técnico", "alcance", "recurso", "calendario", "calidad", "externo", "cultural", "comunicación"],
  false, "Categoría"
);
const probability = await tp.system.suggester(
  ["alta", "media", "baja"],
  ["alta", "media", "baja"],
  false, "Probabilidad"
);
const impact = await tp.system.suggester(
  ["alto", "medio", "bajo"],
  ["alto", "medio", "bajo"],
  false, "Impacto"
);

// Calcular severidad automática
const probVal = {"alta": 3, "media": 2, "baja": 1};
const impVal = {"alto": 3, "medio": 2, "bajo": 1};
const sevScore = probVal[probability] * impVal[impact];
const severity = sevScore >= 6 ? "crítico" : sevScore >= 3 ? "alto" : sevScore >= 2 ? "medio" : "bajo";

const strategy = await tp.system.suggester(
  ["mitigar", "transferir", "aceptar", "evitar"],
  ["mitigar", "transferir", "aceptar", "evitar"],
  false, "Estrategia de respuesta"
);
const owner = await tp.system.suggester(
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  ["Geovanny", "Elkin", "Santiago", "Equipo"],
  false, "Responsable"
);
const module_ = await tp.system.suggester(
  ["educacion", "saberes", "salud", "transversal", "proyecto"],
  ["educacion", "saberes", "salud", "transversal", "proyecto"],
  false, "Módulo afectado"
);
const source = await tp.system.prompt("Minuta origen", detectedSource);
const today = tp.date.now("YYYY-MM-DD");

// ── Renombrar archivo al ID ──
await tp.file.rename(nextId);
-%>
---
type: risk
id: <% nextId %>
title: "<% title %>"
status: open
category: <% category %>
probability: <% probability %>
impact: <% impact %>
severity: <% severity %>
strategy: <% strategy %>
owner: "<% owner %>"
module: <% module_ %>
phase: gestión
source: "<% source %>"
trigger: ""
related_requirements: []
related_decisions: []
review_date: <% tp.date.now("YYYY-MM-DD", 14) %>
created: <% today %>
updated: <% today %>
tags:
  - riesgo
---

# <% nextId %>: <% title %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(open), option(mitigating), option(mitigated), option(occurred), option(closed), option(accepted)):status]` |
| **Probabilidad** | `INPUT[suggester(option(alta), option(media), option(baja)):probability]` |
| **Impacto** | `INPUT[suggester(option(alto), option(medio), option(bajo)):impact]` |
| **Severidad** | `INPUT[suggester(option(crítico), option(alto), option(medio), option(bajo)):severity]` |
| **Estrategia** | `INPUT[suggester(option(mitigar), option(transferir), option(aceptar), option(evitar)):strategy]` |
| **Responsable** | `INPUT[suggester(option(Geovanny), option(Elkin), option(Santiago), option(Equipo)):owner]` |

## Descripción

> Riesgo identificado en [[<% source %>]].

## Causa Raíz

> ¿Por qué podría ocurrir?

- 

## Impacto Detallado

| Dimensión | Descripción del Impacto |
|-----------|------------------------|
| **Alcance** | |
| **Calendario** | |
| **Calidad** | |

## Trigger (Indicador de Alerta)

- 

## Plan de Respuesta

### Acciones Preventivas (Antes)

| # | Acción | Responsable | Fecha límite | Estado |
|---|--------|------------|--------------|--------|
| 1 | | | | ⬜ |

### Acciones de Contingencia (Si ocurre)

| # | Acción | Responsable | Recursos necesarios |
|---|--------|------------|---------------------|
| 1 | | | |

## Requerimientos Relacionados

- [[]]

## Decisiones Relacionadas

- [[]]

## Seguimiento

| Fecha | Observación | Prob. | Imp. | Acción Tomada |
|-------|-------------|-------|------|---------------|
| <% today %> | Identificado en [[<% source %>]] | <% probability %> | <% impact %> | Monitorear |

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación (desde [[<% source %>]]) | <% owner %> |
