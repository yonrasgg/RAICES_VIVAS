---
type: sprint-planning
title: "Sprint 02 — Avance 2: Diseño y Arquitectura"
sprint: Sprint-02
avance: Avance-2
status: active
goal: "Diseñar la arquitectura del sistema, crear modelos ER por módulo y definir el stack tecnológico"
started: 2026-02-28
due: 2026-04-01
completed: 
team: [Geovanny, Elkin, Santiago]
created: 2026-02-27
updated: 2026-02-27
tags:
  - sprint
  - planning
  - avance-2
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_y: 0.42
---

# Sprint 02 — Avance 2: Diseño y Arquitectura

## Meta del Sprint

> Producir el diseño de arquitectura del sistema Raíces Vivas: diagrama de contexto (C4), modelos entidad-relación por módulo, decisión de stack tecnológico, prototipos UI/UX iniciales, y validación preliminar con usuarios potenciales.

## Período

| Campo | Valor |
|-------|-------|
| **Inicio** | 2026-02-28 |
| **Fin** | 2026-04-01 |
| **Duración** | ~32 días (4.5 semanas) |
| **Estado** | 🔄 En progreso |

## Timeline del Sprint

```mermaid
gantt
    title Sprint 02 — Avance 2
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section 🏗️ Diseño
    T-021 Diagrama contexto (Geo)      :active, t21, 2026-02-28, 2026-03-07
    T-025 Stack tecnológico (Equipo)   :        t25, 2026-03-01, 2026-03-07
    T-022 Modelo ER EDU (Elk)          :        t22, 2026-03-03, 2026-03-14
    T-023 Modelo ER SAB (San)          :        t23, 2026-03-03, 2026-03-14
    T-024 Modelo ER SAL (Geo)          :        t24, 2026-03-03, 2026-03-14

    section 🎨 Prototipos
    Wireframes EDU (Geo)               :        p1, 2026-03-10, 2026-03-18
    Wireframes SAB (Elk)               :        p2, 2026-03-12, 2026-03-20
    Wireframes SAL (San)               :        p3, 2026-03-14, 2026-03-22

    section ✅ Validación
    Preparar instrumentos (San)        :        v1, 2026-03-18, 2026-03-22
    Validación con usuarios (Elk)      :        v2, 2026-03-23, 2026-03-30
    Ajustes post-validación (Equipo)   :        v3, 2026-03-28, 2026-04-01
    ENTREGA AVANCE 2                   :milestone, m2, 2026-04-01, 0d
```

## Tareas del Sprint

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Tarea",
  assignee as "👤",
  status as "Estado",
  priority as "Prioridad",
  due as "Fecha Límite"
FROM "05-Sprints/Sprint-02"
WHERE type = "task"
SORT due ASC, id ASC
```

## Distribución por Responsable

```dataview
TABLE WITHOUT ID
  assignee as "👤 Responsable",
  length(rows) as "Tareas",
  length(filter(rows, (r) => r.status = "done")) as "✅ Done"
FROM "05-Sprints/Sprint-02"
WHERE type = "task"
GROUP BY assignee
SORT assignee ASC
```

## Capacidad del Equipo

| Integrante | Tareas Asignadas | Horas Estimadas |
|-----------|-----------------|-----------------|
| Geovanny | T-021, T-024, + wireframes, + compilación | ~24h |
| Elkin | T-022, + wireframes, + validación usuarios | ~20h |
| Santiago | T-023, + wireframes, + instrumentos | ~20h |
| Equipo | T-025, ajustes post-validación | ~8h |

## Entregables Esperados

- [ ] Diagrama de contexto C4 nivel 1
- [ ] Modelo ER del módulo EDU
- [ ] Modelo ER del módulo SAB
- [ ] Modelo ER del módulo SAL
- [ ] ADR: Decisión de stack tecnológico
- [ ] Wireframes iniciales (al menos 3 pantallas por módulo)
- [ ] Informe de validación con usuarios
- [ ] Documento Avance 2 compilado

## Criterios de Éxito

- Todos los modelos ER son consistentes con los RF del Avance 1
- El stack tecnológico respeta las restricciones de RNF (offline, gama baja, multilingüe)
- Al menos 2 usuarios potenciales validan el diseño propuesto
- Trazabilidad completa: RF → Entidad ER → Prototipo UI
