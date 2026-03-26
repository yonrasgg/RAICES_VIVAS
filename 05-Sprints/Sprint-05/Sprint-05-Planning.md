---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 05 — Integración, Testing y Despliegue Piloto"
sprint: Sprint-05
avance: Avance-Final
status: planned
goal: "Integrar todos los módulos, ejecutar pruebas end-to-end y desplegar piloto en territorio"
started: 2026-06-01
due: 2026-06-30
completed:
team: [Geovanny, Elkin, Santiago]
created: 2026-03-26
updated: 2026-03-26
tags:
  - sprint
  - planning
  - avance-final
---

# Sprint 05 — Integración, Testing y Despliegue Piloto

## Meta del Sprint

> Integrar módulos EDU + SAB + SAL + Transversal en una PWA unificada, ejecutar pruebas end-to-end, desplegar piloto en territorio (RPi + tablets) y recopilar feedback de usuarios reales.

## Período

| Campo | Valor |
|-------|-------|
| **Inicio** | 2026-06-01 |
| **Fin** | 2026-06-30 |
| **Duración** | 30 días (4.3 semanas) |
| **Estado** | 📋 Planificado |

## Compromisos del Sprint

### Must (Críticos)

- [ ] [[US-SAL-05]] — Alertas de seguimiento clínico (3 SP — Geovanny)
- [ ] Integración de módulos: navegación unificada EDU ↔ SAB ↔ SAL
- [ ] Pruebas end-to-end: flujos completos por módulo
- [ ] Despliegue en RPi con CouchDB

### Should (Importantes)

- [ ] Prueba de campo piloto: territory Guatuso o Quitirrisí
- [ ] Recopilar feedback de 3+ usuarios reales
- [ ] Performance testing: <3s en tablet (RNF-01)
- [ ] Documentación de despliegue y operación

### Could (Si hay tiempo)

- [ ] Segunda ronda de validación en territorio diferente
- [ ] Mejoras de UX basadas en feedback piloto
- [ ] Dashboard de métricas de uso

## Capacidad del Equipo

| Miembro | Disponibilidad (hrs) | Foco |
|---------|---------------------|------|
| Geovanny | 80 | Alertas SAL, integración, deploy RPi |
| Elkin | 60 | Testing SAB, pruebas campo, i18n polish |
| Santiago | 60 | QA end-to-end, validación, documentación |

**Capacidad total:** 200 hrs · Sprint velocity estimada: 15 SP (integración + testing)

## Riesgos del Sprint

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Integración rompe módulos individuales | Alto | Feature flags + testing incremental |
| Logística de despliegue en territorio | Alto | Preparar kit portátil (RPi + tablet + solar) |
| Performance insuficiente en tablet | Medio | Lazy loading, compresión de assets |
| Feedback negativo de usuarios | Medio | Iteración rápida + priorizar UX crítica |

## Definition of Done

- [ ] PWA unificada funcional offline y online
- [ ] Sync verificada end-to-end (tablet ↔ RPi ↔ servidor central)
- [ ] Mínimo 3 usuarios realizan flujo completo sin asistencia
- [ ] Performance: carga <3s, sync <10s en 2G
- [ ] Documentación de despliegue completa
- [ ] Reporte de feedback de piloto

## Tareas del Sprint

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Tarea",
  assignee as "👤",
  status as "Estado",
  priority as "Prioridad"
FROM "05-Sprints/Sprint-05"
WHERE type = "task" OR type = "subtask"
SORT priority ASC, id ASC
```

## Stories del Sprint

```dataview
TABLE WITHOUT ID
  file.name as "ID",
  title as "Historia",
  assignee as "👤",
  story_points as "SP",
  status as "Estado"
FROM "05-Sprints/Stories"
WHERE type = "story" AND contains(file.name, "SAL-05")
SORT file.name ASC
```
