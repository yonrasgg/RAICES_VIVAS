---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-review
sprint: Sprint-02
title: "Sprint 02 Review — Diseño y Arquitectura"
date: 2026-04-01
created: 2026-03-26
updated: 2026-03-26
tags:
  - sprint
  - review
  - avance-2
---

# Sprint 02 Review — Diseño y Arquitectura

## Objetivo del Sprint

> Producir el diseño de arquitectura del sistema Raíces Vivas: diagrama de contexto (C4), modelos entidad-relación por módulo, decisión de stack tecnológico, prototipos UI/UX iniciales, y validación preliminar con usuarios potenciales.

## ¿Se cumplió el objetivo?

- [ ] Sí, completamente
- [x] Parcialmente
- [ ] No

> **Nota:** Todos los artefactos de diseño fueron **planificados** y sus especificaciones documentadas en las tareas del sprint. La **ejecución** (diagramas finales, wireframes pixel-ready, entrevistas de validación) queda pendiente para cierre del sprint o Sprint-03.

## Lo que se completó

| Tarea | Artefacto | Estado | Observación |
|-------|-----------|--------|-------------|
| T-021 — Diagrama de contexto C4 | Especificación de actores y sistemas | ⚠️ Planificado | 5 actores, 4 sistemas adyacentes documentados |
| T-022 — Modelo ER EDU | Entidades y atributos definidos | ⚠️ Planificado | 6 entidades principales |
| T-023 — Modelo ER SAB | Entidades y atributos definidos | ⚠️ Planificado | 7 entidades con niveles CARE |
| T-024 — Modelo ER SAL | Entidades y atributos definidos | ⚠️ Planificado | 6 entidades con enlace EBAIS |
| T-025 — Stack tecnológico | [[ADR-008]] aprobado | ✅ Decidido | PWA: React + PouchDB + i18next |
| T-026 — Wireframes EDU | Pantallas especificadas | ⚠️ Planificado | 5 pantallas listadas |
| T-027 — Wireframes SAB | Pantallas especificadas | ⚠️ Planificado | 5 pantallas con acceso CARE |
| T-028 — Wireframes SAL | Pantallas especificadas | ⚠️ Planificado | 5 pantallas con brigadas |
| T-029 — Instrumentos de validación | Estructura definida | ⚠️ Planificado | Guía + SUS + checklist |
| T-030 — Entrevistas de validación | Cronograma definido | ⚠️ Planificado | 3 sesiones (docente, guía, auxiliar) |
| T-031 — Gobernanza cultural | [[ADR-009]] aprobado | ✅ Decidido | CARE, 4 niveles, consentimiento |

## Lo que NO se completó (ejecución pendiente)

| Tarea | Razón | Acción |
|-------|-------|--------|
| T-021 — Diagrama Mermaid final | Priorización de planificación integral | Ejecutar en semana de cierre |
| T-022/23/24 — Diagramas ER en Mermaid | Dependían de T-021 (cascada) | Ejecutar tras C4 aprobado |
| T-026/27/28 — Wireframes en Excalidraw | Dependían de ER por módulo | Ejecutar tras ER aprobado |
| T-029 — Instrumentos completos | Depende de wireframes | Ejecutar tras wireframes |
| T-030 — Entrevistas de campo | Depende de instrumentos + coordinación territorial | Sprint-03 |

## Demo / Evidencias

- [[ADR-008|ADR-008 — Stack Tecnológico]] — Análisis FODA con puntajes ponderados
- [[ADR-009|ADR-009 — Gobernanza Cultural]] — Protocolo CARE + 4 niveles de acceso
- [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]] — Hardware/software para territorios
- [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa de Territorios]] — Matriz de conectividad por zona
- [[05-Sprints/Epics/EPIC-TRANS|EPIC-TRANS]] — Épica transversal con 3 RF y 4 RNF
- 7 user stories creadas para Sprint-03→05

## Feedback del Equipo

- Se necesita más tiempo para ejecución de diseño visual (diagramas, wireframes)
- La investigación de conectividad territorial fue valiosa para dimensionar la arquitectura offline-first
- Las decisiones ADR-008 y ADR-009 desbloquearon múltiples tareas en paralelo

## Lecciones Aprendidas (mini-retro)

### ¿Qué funcionó bien?

- Planificación detallada de cada tarea antes de ejecutar
- ADR como mecanismo de decisión (FODA cuantitativo)
- Épica transversal agrupa preocupaciones cross-cutting

### ¿Qué mejorar?

- Iniciar ejecución de diagramas antes en el sprint (no solo planificación)
- Coordinar acceso a territorios con más anticipación
- Establecer checkpoints de avance semanal

### ¿Qué intentar diferente?

- Sprint-03: Ejecutar diagramas en primera semana, validar en segunda
- Pair-design: Dos integrantes en un mismo diagrama para acelerar
- Validación incremental: mockups de baja fidelidad → alta fidelidad
