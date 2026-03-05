---
id: ENT-<% tp.system.prompt("Número (ej: 001)") %>
type: entrevista
title: "<% tp.system.prompt("Título/Descripción breve de la entrevista") %>"
date: <% tp.date.now("YYYY-MM-DD") %>
interviewer: <% tp.system.prompt("Nombre del entrevistador") %>
consent: false
tags:
  - entrevista
  - investigación
interviewee_role: <% tp.system.suggester(["docente", "estudiante", "líder-comunal", "portador-saber", "personal-salud", "familiar-cuidador", "actor-institucional"], ["docente", "estudiante", "líder-comunal", "portador-saber", "personal-salud", "familiar-cuidador", "actor-institucional"]) %>
module: <% tp.system.suggester(["educacion", "saberes", "salud", "general"], ["educacion", "saberes", "salud", "general"]) %>
territory: <% tp.system.prompt("Territorio / Comunidad") %>
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
