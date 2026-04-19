---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 04 — Módulos SAB + SAL + Motor Educativo"
sprint: Sprint-04
avance: Avance-3
status: planned
goal: "Implementar módulos Saberes y Salud con motor de práctica educativa interactiva"
started: 2026-05-01
due: 2026-05-31
completed:
team: [Geovanny, Elkin, Santiago]
created: 2026-03-26
updated: 2026-04-19
tags:
  - sprint
  - planning
  - avance-3
---

# Sprint 04 — Módulos SAB + SAL + Motor Educativo

## Meta del Sprint

> Implementar los módulos Saberes Ancestrales (SAB) y Salud Comunitaria (SAL) funcionales con búsqueda offline, gestión de citas, y motor de práctica educativa interactiva. Todos integrados con sincronización offline y multilingüe.

## Período

| Campo | Valor |
|-------|-------|
| **Inicio** | 2026-05-01 |
| **Fin** | 2026-05-31 |
| **Duración** | 31 días (4.4 semanas) |
| **Estado** | 📋 Planificado |

## Compromisos del Sprint

### Must (Críticos)

- [ ] [[US-EDU-04]] — Motor de práctica educativa interactiva (5 SP — Geovanny)
- [ ] [[US-SAB-03]] — Búsqueda y consulta de saberes ancestrales (3 SP — Elkin)
- [ ] [[US-SAL-03]] — Gestión de citas y brigadas de salud (5 SP — Santiago)

### Should (Importantes)

- [ ] [[US-EDU-05]] — Seguimiento académico por docente (3 SP — Santiago)
- [ ] Validación con usuarios: primera ronda entrevistas campo (carry-over)
- [ ] Integración CARE niveles de acceso en SAB (per ADR-009)

### Could (Si hay tiempo)

- [ ] Pruebas de campo en territorio piloto (Guatuso o Quitirrisí)
- [ ] Onboarding básico en app (primer uso)

## Capacidad del Equipo

| Miembro | Disponibilidad (hrs) | Foco |
|---------|---------------------|------|
| Geovanny | 80 | Motor EDU, integración sync |
| Elkin | 60 | SAB búsqueda, CARE, traducciones Bribri |
| Santiago | 60 | SAL citas/brigadas, seguimiento académico, QA |

**Capacidad total:** 200 hrs · Sprint velocity estimada: 20 SP

## Riesgos del Sprint

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Acceso a datos reales de saberes | Alto | Usar datos de prueba con estructura real |
| Coordinación con EBAIS para lógica SAL | Medio | Consultar protocolos CCSS documentados |
| Integración CARE compleja | Medio | Implementar 2 niveles primero (Público + Comunitario) |

## Definition of Done

- [ ] Módulo SAB: búsqueda funcional con filtros (texto, categoría, pueblo)
- [ ] Módulo SAL: calendario de citas + registro de brigadas funcional
- [ ] Motor EDU: mínimo 2 tipos de ejercicio funcionales
- [ ] Todos los módulos funcionan offline
- [ ] Tests unitarios para lógica de negocio
- [ ] Frontmatter completo en todos los artefactos

## Tareas del Sprint

```sqlseal
SELECT
  name as "ID",
  title as "Tarea",
  assignee as "👤",
  status as "Estado",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-04%'
ORDER BY priority ASC, name ASC
```

## Stories del Sprint

```sqlseal
SELECT
  name as "ID",
  title as "Historia",
  assignee as "👤",
  story_points as "SP",
  status as "Estado"
FROM files
WHERE type = 'story' AND path LIKE '05-Sprints/Stories%' AND (name LIKE '%EDU-04%' OR name LIKE '%EDU-05%' OR name LIKE '%SAB-03%' OR name LIKE '%SAL-03%')
ORDER BY name ASC
```
