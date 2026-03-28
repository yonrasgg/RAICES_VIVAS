<%*
// ══════════════════════════════════════════════════════════════
// 🏗️ Nuevo ADR (Architecture Decision Record)
// ══════════════════════════════════════════════════════════════
// Auto-ID: ADR-XXX calculado via app.vault
// Destino: 01-Proyecto/Decisiones/
// ══════════════════════════════════════════════════════════════

// ── Auto-ID: calcula el siguiente ADR-XXX consecutivo (via app.vault) ──
const files = app.vault.getFiles().filter(f => f.path.startsWith("01-Proyecto/Decisiones/") && f.basename.match(/^ADR-\d+$/));
const ids = files.map(f => parseInt(f.basename.replace("ADR-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `ADR-${String(maxId + 1).padStart(3, "0")}`;

// ── Prompts del usuario ──
const title = await tp.system.prompt("Título de la decisión");
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
const deciders = await tp.system.prompt("Decisores (separados por coma)", "Geovanny, Elkin, Santiago");
const impact = await tp.system.suggester(
  ["alto", "medio", "bajo"],
  ["alto", "medio", "bajo"],
  false, "Impacto"
);
const source = await tp.system.prompt("Origen (ej: MIN-001, Sprint-02 o vacío)", "");
const today = tp.date.now("YYYY-MM-DD");

// ── Parsear decisores a array ──
const decidersArray = deciders.split(",").map(d => d.trim()).filter(d => d);
const decidersYaml = decidersArray.map(d => `\n  - "${d}"`).join("");

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
deciders:<% decidersYaml %>
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

> ¿Cuál es el problema o la decisión que necesitamos tomar? ¿Qué lo motivó?

## Opciones Consideradas

| # | Opción | Pros | Contras |
|---|--------|------|---------|
| 1 | **Opción A** | | |
| 2 | **Opción B** | | |
| 3 | **Opción C** | | |

## Decisión

> ¿Qué decidimos y por qué? Justificación técnica y de negocio.

**Opción seleccionada:** 

## Consecuencias

### Positivas

- 

### Negativas / Riesgos

- 

### Compromisos (Trade-offs)

- 

## Criterios de Evaluación

| Criterio | Peso | Opción A | Opción B | Opción C |
|----------|------|----------|----------|----------|
| | | | | |

## Requerimientos Relacionados

> Vincular los RF/RNF que esta decisión afecta

- [[]]

## Riesgos Relacionados

> Vincular los riesgos que esta decisión mitiga o introduce

- [[]]

## Referencias

- 

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| <% today %> | Creación | |
