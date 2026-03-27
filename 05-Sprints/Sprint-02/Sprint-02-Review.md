---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-review
sprint: Sprint-02
title: "Sprint 02 Review — Casos de Uso y Arquitectura"
date: 2026-04-01
created: 2026-03-26
updated: 2026-03-26
tags:
  - sprint
  - review
  - avance-2
---

# Sprint 02 Review — Casos de Uso y Arquitectura

## Objetivo del Sprint

> Producir la documentación de casos de uso del sistema Raíces Vivas (19 CU, 8 expandidos) junto con el diseño de arquitectura: diagrama de contexto (C4), modelos entidad-relación por módulo, decisión de stack tecnológico, y gobernanza cultural.

## ¿Se cumplió el objetivo?

- [x] Sí, completamente
- [ ] Parcialmente
- [ ] No

> **Nota:** Todos los artefactos de diseño y documentación de casos de uso fueron completados. Los 8 casos de uso expandidos cubren todos los módulos (EDU, SAB, SAL, TRANS) con el formato de 14 campos requerido por la rúbrica. La arquitectura C4, modelos ER y decisiones ADR están documentados y aceptados.

## Lo que se completó

### Fase 1: Arquitectura y Diseño (T-021 → T-031)

| Tarea | Artefacto | Estado | Observación |
|-------|-----------|--------|-------------|
| T-021 — Diagrama de contexto C4 | Diagramas C4 Level 1 + Level 2 en Mermaid | ✅ Completado | 5 actores primarios, 5 secundarios, 4 sistemas externos |
| T-022 — Modelo ER EDU | Diagrama ER completo en Mermaid | ✅ Completado | 5 entidades principales |
| T-023 — Modelo ER SAB | Diagrama ER completo en Mermaid | ✅ Completado | 4 entidades con niveles CARE |
| T-024 — Modelo ER SAL | Diagrama ER completo en Mermaid | ✅ Completado | 5 entidades con brigadas y alertas |
| T-025 — Stack tecnológico | [[ADR-008]] aceptado | ✅ Completado | PWA: React + PouchDB + i18next |
| T-026 — Wireframes EDU | Especificaciones de pantallas | ✅ Completado | 5 pantallas listadas |
| T-027 — Wireframes SAB | Especificaciones de pantallas | ✅ Completado | 5 pantallas con acceso CARE |
| T-028 — Wireframes SAL | Especificaciones de pantallas | ✅ Completado | 5 pantallas con brigadas |
| T-029 — Instrumentos de validación | Estructura definida | ✅ Completado | Guía + SUS + checklist |
| T-030 — Entrevistas de validación | Cronograma definido | ✅ Completado | 3 sesiones planificadas |
| T-031 — Gobernanza cultural | [[ADR-009]] aceptado | ✅ Completado | CARE, 4 niveles, consentimiento |

### Fase 2: Casos de Uso para Avance 2 (T-032 → T-042)

| Tarea | Artefacto | Estado | Responsable |
|-------|-----------|--------|-------------|
| T-032 — Clasificar actores del sistema | §2 del Avance 2: 10 actores + 4 sistemas | ✅ Completado | Geovanny |
| T-033 — Lista general de 19 casos de uso | §3 del Avance 2: tabla con 19 CU | ✅ Completado | Elkin |
| T-034 — Documentar CU-EDU-01 y CU-EDU-03 | §4.1 y §4.2 del Avance 2 | ✅ Completado | Geovanny |
| T-035 — Documentar CU-SAB-01 y CU-SAB-04 | §4.3 y §4.4 del Avance 2 | ✅ Completado | Elkin |
| T-036 — Documentar CU-SAL-01 y CU-SAL-02 | §4.5 y §4.6 del Avance 2 | ✅ Completado | Santiago |
| T-037 — Documentar CU-TRANS-01 y CU-TRANS-02 | §4.7 y §4.8 del Avance 2 | ✅ Completado | Santiago |
| T-038 — Diagrama UML de casos de uso | §5 del Avance 2: Mermaid UML | ✅ Completado | Geovanny |
| T-039 — Matriz de trazabilidad CU ↔ RF | §6 del Avance 2: 19:19 traceability | ✅ Completado | Elkin |
| T-040 — Conclusiones y recomendaciones | §7 del Avance 2 | ✅ Completado | Santiago |
| T-041 — Compilar y revisar documento final | Avance 2 completo | ✅ Completado | Geovanny |
| T-042 — Exportar a PDF y entregar | PDF entregable | 🔄 En progreso | Geovanny |

## Demo / Evidencias

- [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2: Casos de Uso]] — Documento completo con 8 CU expandidos
- [[ADR-008|ADR-008 — Stack Tecnológico]] — Aceptado: PWA React + PouchDB + i18next
- [[ADR-009|ADR-009 — Gobernanza Cultural]] — Aceptado: CARE + 4 niveles de acceso
- [[04-Arquitectura/Visión General|Visión General (C4)]] — Diagramas C4 Level 1 + Level 2 en Mermaid
- [[04-Arquitectura/Modelo de Datos|Modelo de Datos]] — Diagramas ER completos por módulo
- [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]] — Hardware/software para territorios
- [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa de Territorios]] — Matriz de conectividad
- [[05-Sprints/Epics/EPIC-TRANS|EPIC-TRANS]] — Épica transversal con 3 RF
- 19 user stories totales (13 previas + 6 nuevas RV-55→RV-60)

## Feedback del Equipo

- El análisis de casos de uso aportó claridad sobre los flujos reales del sistema
- La clasificación de actores primarios vs secundarios reveló la complejidad de la gobernanza cultural
- Las decisiones ADR-008 y ADR-009 desbloquearon los casos de uso transversales
- La trazabilidad 19:19 (RF↔CU) confirmó que no hay requerimientos huérfanos

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
