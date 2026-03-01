---
id: MIN-<% tp.system.prompt("Número (ej: 001)") %>
type: meeting
title: "<% tp.system.prompt("Título de la reunión") %>"
date: <% tp.date.now("YYYY-MM-DD") %>
duration: ""
attendees: []
decisions: []
action-items: []
tags:
  - reunión
---

# Minuta: <% tp.frontmatter.title %>

**Fecha:** <% tp.date.now("YYYY-MM-DD") %>  
**Hora:**   
**Duración:**   
**Asistentes:**  

---

## Agenda

1. 
2. 
3. 

## Discusión

### Tema 1



### Tema 2



## Decisiones Tomadas

> **Formato:** `- [ ] Descripción de la decisión — Justificación breve`
> **Promover a ADR formal:** Seleccionar la línea → `Ctrl+P` → `🏗️ Promover Decisión`
> Cuando se promueve, reemplazar la línea por: `- [ ] [[ADR-XXX|Descripción]] — Justificación`

- [ ] Decisión 1

## Riesgos Identificados

> **Formato:** `- [ ] Riesgo: descripción del riesgo`
> **Promover a riesgo formal:** Seleccionar la línea → `Ctrl+P` → `⚠️ Promover Riesgo`
> Cuando se promueve, reemplazar la línea por: `- [ ] [[RSK-XXX|Descripción del riesgo]]`

- [ ] Riesgo: 

## Action Items

> **Formato:** `- [ ] Descripción de la tarea → @Responsable 📅 YYYY-MM-DD`
> **Promover a tarea formal:** Seleccionar la línea → `Ctrl+P` → `📋 Promover Action Item`
> Cuando se promueve, reemplazar la línea por: `- [ ] [[T-XXX|Descripción]] → @Responsable 📅 YYYY-MM-DD`

- [ ] Tarea → @Responsable 📅 YYYY-MM-DD
- [ ] Tarea → @Responsable 📅 YYYY-MM-DD

## Próxima Reunión

**Fecha:**  
**Temas pendientes:**
