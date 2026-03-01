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

- [ ] Decisión 1

## Action Items

> **Formato:** `- [ ] Descripción de la tarea → @Responsable 📅 YYYY-MM-DD`
> **Promover a tarea formal:** Seleccionar la línea → `Ctrl+P` → `📋 Promover Action Item`
> Cuando se promueve, reemplazar la línea por: `- [ ] [[T-XXX|Descripción]] → @Responsable 📅 YYYY-MM-DD`

- [ ] Tarea → @Responsable 📅 YYYY-MM-DD
- [ ] Tarea → @Responsable 📅 YYYY-MM-DD

## Próxima Reunión

**Fecha:**  
**Temas pendientes:**
