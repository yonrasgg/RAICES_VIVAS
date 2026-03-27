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

- Planificación detallada de cada tarea antes de ejecutar — permitió que las especificaciones de ER y wireframes estén claras antes de dibujar
- ADR como mecanismo de decisión (FODA cuantitativo en ADR-008) — eliminó discusiones subjetivas sobre stack
- Épica transversal (EPIC-TRANS) agrupa preocupaciones cross-cutting y simplifica el planning de sprints futuros
- La investigación de conectividad territorial (SUTEL, FONATEL) aportó datos reales que sustentaron la decisión offline-first — no fue solo una suposición
- Weekly notes con Dataview mantuvieron visibilidad de progreso sin esfuerzo manual
- La sincronización Jira ↔ Obsidian asegura que los stakeholders siempre ven datos actualizados

### ¿Qué mejorar?

- Iniciar ejecución de diagramas antes en el sprint (no solo planificación) — el sprint priorizó especificación, y la ejecución visual quedó rezagada
- Coordinar acceso a territorios con más anticipación — la logística para entrevistas en Cabécar/Chirripó requiere al menos 3 semanas de gestión previa con CONAI
- Establecer checkpoints de avance semanal con entregables visibles (no solo status updates)
- El Linter plugin causó conflictos con frontmatter multi-tipo — se desactivó `yaml-key-sort` pero se necesita un mecanismo de validación por tipo de nota
- Documentar las decisiones verbales del equipo de forma más oportuna (varias decisiones se tomaron en conversaciones informales y se formalizaron días después)

### ¿Qué intentar diferente?

- Sprint-03: Ejecutar diagramas C4 y ER en Mermaid durante la **primera semana**, validar con el equipo en la **segunda**
- Pair-design: Dos integrantes en un mismo diagrama para acelerar y mejorar calidad
- Validación incremental: mockups de baja fidelidad → evaluación SUS → alta fidelidad
- Usar daily notes como registro de decisiones inmediatas para no perder contexto
- Establecer una "design review" formal antes de pasar de especificación a ejecución

---

## Bitácora de Cambios del Sprint

| Fecha | Cambio | Responsable | Impacto |
|-------|--------|-------------|---------|
| 2026-03-03 | Arranque Sprint-02: 11 tareas asignadas (T-021→T-031) | Geovanny | Distribución de trabajo entre 3 integrantes |
| 2026-03-05 | Evaluación comparativa de stack (React vs Flutter vs Vue) | Equipo | Inputs para ADR-008 |
| 2026-03-07 | Desactivación de `yaml-key-sort` en Linter por conflictos de frontmatter multi-tipo | Geovanny | ~95 archivos reparados, `fix_frontmatter.py` creado |
| 2026-03-10 | ADR-008 aprobado: PWA con React + PouchDB + CouchDB + i18next | Equipo | Stack tecnológico definido — desbloquea wireframes y planning de implementación |
| 2026-03-12 | ADR-009 aprobado: Gobernanza Cultural con 4 niveles CARE | Equipo | Marco ético para manejo de datos sensibles — impacta modelo de datos y UI |
| 2026-03-12 | Modelos ER definidos: EDU (6 entidades), SAB (7 entidades), SAL (6 entidades) | Elkin, Santiago, Geovanny | Base para wireframes y esquema de base de datos |
| 2026-03-14 | Investigación de conectividad territorial completada (17/24 con cobertura parcial) | Geovanny | Sustenta requisito offline-first (RNF-01) con datos SUTEL/FONATEL |
| 2026-03-17 | EPIC-TRANS creada (RV-47 en Jira) + 7 user stories (RV-48→RV-54) | Geovanny | 32 SP distribuidos en Sprint 03-05; épica transversal formalizada |
| 2026-03-17 | Sprint-03, 04 y 05 planning docs creados con metas y distribución de stories | Geovanny | Roadmap de implementación definido hasta junio 2026 |
| 2026-03-19 | Especificaciones de wireframes por módulo (EDU 5 pantallas, SAB 5, SAL 5) | Equipo | Base para ejecución visual en Sprint-03 |
| 2026-03-19 | Instrumentos de validación definidos: guión + SUS + checklist WCAG 2.1 AA | Santiago | Listos para aplicar sobre mockups en Sprint-03 |
| 2026-03-21 | Compilación del documento Avance-2 iniciada | Geovanny | Consolidación de todos los artefactos del sprint |
| 2026-03-21 | Sincronización completa Jira ↔ Obsidian: 52 issues, 0 discrepancias | Geovanny | Consistencia total entre vault y Jira |
| 2026-03-26 | Sprint-02 Review redactado | Equipo | Cierre formal del sprint con evidencias y retro |
| 2026-04-01 | Entrega del Avance-2 al profesor | Equipo | Hito de entrega académica completado |
