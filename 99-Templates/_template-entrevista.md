---
type: entrevista
id: ENT-<% tp.system.prompt("Número (ej: 001)") %>
title: "<% tp.system.prompt("Título/Descripción breve de la entrevista") %>"
date: <% tp.date.now("YYYY-MM-DD") %>
interviewer: <% tp.system.prompt("Nombre del entrevistador") %>
interviewee_role: <% tp.system.suggester(["docente", "estudiante", "líder-comunal", "portador-saber", "personal-salud", "familiar-cuidador", "actor-institucional"], ["docente", "estudiante", "líder-comunal", "portador-saber", "personal-salud", "familiar-cuidador", "actor-institucional"]) %>
module: <% tp.system.suggester(["educacion", "saberes", "salud", "general"], ["educacion", "saberes", "salud", "general"]) %>
territory: <% tp.system.prompt("Territorio / Comunidad") %>
consent: false
tags:
  - entrevista
  - investigación
---

# ENT-<% tp.frontmatter.id %>: <% tp.frontmatter.title %>

**Fecha:** <% tp.frontmatter.date %>  
**Entrevistador:** <% tp.frontmatter.interviewer %>  
**Rol del entrevistado:** <% tp.frontmatter.interviewee_role %>  
**Territorio:** <% tp.frontmatter.territory %>  
**Consentimiento informado:** <% tp.frontmatter.consent %>

---

## Contexto

> Descripción del entorno, condiciones de la entrevista, observaciones previas.

## Preguntas y Respuestas

### P1: 

**R:** 

### P2: 

**R:** 

### P3: 

**R:** 

## Hallazgos Clave

1. 
2. 
3. 

## Necesidades Identificadas

| Necesidad | Módulo | Prioridad estimada |
|-----------|--------|-------------------|
| | | |

## Requerimientos que valida o genera

- [[]]

## Observaciones del Entrevistador

> Notas sobre lenguaje corporal, contexto no verbal, limitaciones de la entrevista.
