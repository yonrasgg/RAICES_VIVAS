<%*
// ══════════════════════════════════════════════════════════════
// 📋 Promover Action Item → Tarea Formal
// ══════════════════════════════════════════════════════════════
// Uso: Desde una minuta, seleccionar el texto del action item
//      y ejecutar QuickAdd → "📋 Promover Action Item"
//
// Formato esperado del action item:
//   - [ ] Texto de la tarea → @Persona 📅 YYYY-MM-DD
// ══════════════════════════════════════════════════════════════

// ── Auto-ID: calcula el siguiente T-XXX consecutivo ──
const taskPages = dv.pages('"05-Sprints"').where(p => p.type === "task" && p.id);
const ids = taskPages.map(p => parseInt(String(p.id).replace("T-", ""))).filter(n => !isNaN(n));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;
const nextId = `T-${String(maxId + 1).padStart(3, "0")}`;

// ── Extraer datos de la línea del action item (si fue seleccionada) ──
const selection = tp.file.selection || "";
let extractedTitle = "";
let extractedAssignee = "";
let extractedDue = "";

if (selection) {
  // Quitar "- [ ] " o "- [x] " del inicio
  let clean = selection.replace(/^-\s*\[.\]\s*/, "").trim();
  // Extraer @Persona
  const personMatch = clean.match(/→?\s*@(\S+)/);
  if (personMatch) extractedAssignee = personMatch[1];
  // Extraer 📅 fecha
  const dateMatch = clean.match(/📅\s*(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) extractedDue = dateMatch[1];
  // Limpiar título: quitar → @Persona y 📅 fecha y emojis Tasks
  extractedTitle = clean
    .replace(/→?\s*@\S+/g, "")
    .replace(/📅\s*\d{4}-\d{2}-\d{2}/g, "")
    .replace(/[✅❌⏫🔺🔼🔽⏬🔁⏳🛫➕]\s*\d{0,4}-?\d{0,2}-?\d{0,2}/g, "")
    .trim();
}

// ── Detectar minuta activa como source ──
const activeFile = tp.config.active_file;
let detectedSource = "";
if (activeFile && activeFile.path.includes("07-Reuniones")) {
  // Intentar leer el ID del frontmatter de la minuta activa
  const cache = app.metadataCache.getFileCache(activeFile);
  if (cache && cache.frontmatter && cache.frontmatter.id) {
    detectedSource = cache.frontmatter.id;
  } else {
    detectedSource = activeFile.basename;
  }
}

// ── Prompts (con valores pre-rellenados del action item) ──
const title = await tp.system.prompt("Título de la tarea", extractedTitle);
const assigneeOptions = ["Geovanny", "Elkin", "Santiago", "Equipo"];
const defaultAssigneeIdx = assigneeOptions.findIndex(a => a.toLowerCase() === extractedAssignee.toLowerCase());
const assignee = await tp.system.suggester(assigneeOptions, assigneeOptions, false, defaultAssigneeIdx >= 0 ? `Pre-seleccionado: ${assigneeOptions[defaultAssigneeIdx]}` : "Responsable");
const priority = await tp.system.suggester(["critical", "high", "medium", "low"], ["critical", "high", "medium", "low"], false, "Prioridad");
const sprint = await tp.system.suggester(["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"], ["Sprint-01", "Sprint-02", "Sprint-03", "Sprint-04", "Sprint-05", "backlog"], false, "Sprint destino");
const phase = await tp.system.suggester(["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"], ["investigación", "análisis", "requerimientos", "integración", "diseño", "implementación", "testing", "gestión"], false, "Fase");
const module_ = await tp.system.suggester(["educacion", "saberes", "salud", "transversal", "proyecto"], ["educacion", "saberes", "salud", "transversal", "proyecto"], false, "Módulo");
const requirement = await tp.system.prompt("Requerimiento padre (ej: RF-EDU-01 o N/A)", "N/A");
const effort = await tp.system.prompt("Esfuerzo estimado (ej: 4h, 8h)", "4h");
const due = await tp.system.prompt("Fecha límite (YYYY-MM-DD)", extractedDue || tp.date.now("YYYY-MM-DD"));
const source = await tp.system.prompt("Minuta origen", detectedSource);
const today = tp.date.now("YYYY-MM-DD");

// ── Tag de avance según sprint ──
const sprintNum = sprint.replace("Sprint-0", "").replace("Sprint-", "");
const avanceTag = sprint === "backlog" ? "" : `\n  - avance-${sprintNum}`;

// ── Renombrar archivo al ID ──
await tp.file.rename(nextId);
-%>
---
type: task
id: <% nextId %>
title: "<% title %>"
status: todo
priority: <% priority %>
assignee: "<% assignee %>"
sprint: "<% sprint %>"
phase: "<% phase %>"
module: <% module_ %>
requirement: "<% requirement %>"
effort: "<% effort %>"
started: 
due: <% due %>
completed: 
source: "<% source %>"
created: <% today %>
updated: <% today %>
tags:
  - tarea<% avanceTag %>
---

# <% nextId %>: <% title %>

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |
| **Responsable** | `INPUT[suggester(option(Geovanny), option(Elkin), option(Santiago), option(Equipo)):assignee]` |
| **Sprint** | `INPUT[suggester(option(Sprint-01), option(Sprint-02), option(Sprint-03), option(Sprint-04), option(Sprint-05), option(backlog)):sprint]` |

## Descripción

> Promovida desde action item de [[<% source %>]].

## Criterios de Aceptación (DoD)

- [ ] Criterio 1
- [ ] Criterio 2

## Subtareas

- [ ] Subtarea 1
- [ ] Subtarea 2

## Dependencias

> Tareas previas o bloqueos.

## Notas

> 📋 Originada en [[<% source %>]]

## Requerimiento Relacionado

[[<% requirement %>]]
