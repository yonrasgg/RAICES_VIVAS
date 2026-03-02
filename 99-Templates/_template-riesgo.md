<%*
// ══════════════════════════════════════════════════════════════
// ⚠️ Nuevo Riesgo
// ══════════════════════════════════════════════════════════════
// Auto-ID: RSK-XXX calculado via dv.pages()
// Destino: 01-Proyecto/Riesgos/
// ══════════════════════════════════════════════════════════════

// ── Auto-ID: calcula el siguiente RSK-XXX consecutivo ──
const riskPages = dv.pages('"01-Proyecto/Riesgos"').where(p => p.type === "risk" && p.id);
const ids = riskPages.map(p => parseInt(String(p.id).replace("RSK-", "").replace("RISK-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `RSK-${String(maxId + 1).padStart(3, "0")}`;

// ── Prompts del usuario ──
const title = await tp.system.prompt("Título del riesgo");
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
const phase = await tp.system.suggester(
  ["investigación", "análisis", "requerimientos", "diseño", "implementación", "testing", "gestión", "todas"],
  ["investigación", "análisis", "requerimientos", "diseño", "implementación", "testing", "gestión", "todas"],
  false, "Fase del proyecto"
);
const source = await tp.system.prompt("Origen (ej: MIN-001, Sprint review, o vacío)", "");
const today = tp.date.now("YYYY-MM-DD");

// ── Renombrar archivo al ID ──
await tp.file.rename(nextId);
-%>
---
banner_src: "08-Recursos/Imágenes/cover-riesgos.png"
banner_src_x: 0.47714
banner_src_y: 0.42
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
phase: <% phase %>
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

> ¿Qué podría salir mal? Descripción clara y específica del riesgo.

## Causa Raíz

> ¿Por qué podría ocurrir? Identificar las causas subyacentes.

- 

## Impacto Detallado

> ¿Qué consecuencias tendría si se materializa?

| Dimensión | Descripción del Impacto |
|-----------|------------------------|
| **Alcance** | |
| **Calendario** | |
| **Calidad** | |
| **Recursos** | |

## Trigger (Indicador de Alerta)

> ¿Qué señales indicarían que el riesgo está por materializarse?

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

> RF/RNF que podrían verse afectados

- [[]]

## Decisiones Relacionadas

> ADRs vinculados (que mitigan o introducen este riesgo)

- [[]]

## Seguimiento

| Fecha | Observación | Prob. | Imp. | Acción Tomada |
|-------|-------------|-------|------|---------------|
| <% today %> | Identificado | <% probability %> | <% impact %> | Monitorear |

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación | <% owner %> |
