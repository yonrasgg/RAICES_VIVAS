---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 01 — Avance 1: Análisis y Requerimientos"
sprint: Sprint-01
avance: Avance-1
status: done
goal: "Completar el análisis de contexto, especificación de requerimientos y entrega del Avance 1"
started: 2026-02-03
due: 2026-02-25
completed: 2026-02-25
team: [Geovanny, Elkin, Santiago]
created: 2026-02-27
updated: 2026-02-27
tags:
  - sprint
  - planning
  - avance-1
---

# Sprint 01 — Avance 1: Análisis y Requerimientos

## Meta del Sprint

> Completar el análisis integral de la problemática, identificar actores y necesidades reales, y producir una especificación de requerimientos funcionales y no funcionales verificable para el sistema Raíces Vivas.

## Período

| Campo | Valor |
|-------|-------|
| **Inicio** | 2026-02-03 |
| **Fin** | 2026-02-25 |
| **Duración** | 23 días (3.3 semanas) |
| **Estado** | ✅ Completado |

## Distribución de Fases

```mermaid
gantt
    title Sprint 01 — Avance 1
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section 🔍 Investigación
    Rev. documental EDU (Geo)          :done, t1, 2026-02-03, 2026-02-07
    Rev. documental SAB (Elk)          :done, t2, 2026-02-03, 2026-02-07
    Rev. documental SAL (San)          :done, t3, 2026-02-03, 2026-02-07
    Introducción (Geo)                 :done, t4, 2026-02-07, 2026-02-09
    Abstract (Elk)                     :done, t5, 2026-02-07, 2026-02-09
    Justificación (San)                :done, t6, 2026-02-07, 2026-02-09

    section 📐 Análisis
    Objetivos (Geo)                    :done, t7, 2026-02-10, 2026-02-12
    Marco metod. tipo (Elk)            :done, t8, 2026-02-10, 2026-02-14
    Marco metod. instr. (San)          :done, t9, 2026-02-10, 2026-02-14
    WBS / EDT (Geo)                    :done, t10, 2026-02-13, 2026-02-16

    section 📋 Requerimientos
    RF EDU (Geo)                       :done, t11, 2026-02-17, 2026-02-19
    RF SAB (Elk)                       :done, t12, 2026-02-17, 2026-02-19
    RF SAL (San)                       :done, t13, 2026-02-17, 2026-02-19
    RNF transversales (Equipo)         :done, t14, 2026-02-19, 2026-02-21
    RTM (Geo)                          :done, t15, 2026-02-20, 2026-02-21

    section 📦 Integración
    Conclusiones (Elk)                 :done, t16, 2026-02-22, 2026-02-23
    Revisión QA (San)                  :done, t17, 2026-02-23, 2026-02-24
    Compilación final (Geo)            :done, t18, 2026-02-24, 2026-02-25
    ENTREGA AVANCE 1                   :milestone, m1, 2026-02-25, 0d
```

## Tareas del Sprint

```dataview
TABLE WITHOUT ID
  id as "ID",
  title as "Tarea",
  assignee as "Responsable",
  phase as "Fase",
  status as "Estado",
  effort as "Esfuerzo",
  started as "Inicio",
  due as "Fin"
FROM "05-Sprints/Sprint-01"
WHERE (type = "task" OR type = "subtask")
SORT started ASC, id ASC
```

## Distribución por Responsable

```dataview
TABLE WITHOUT ID
  assignee as "👤 Responsable",
  length(rows) as "Tareas",
  length(filter(rows, (r) => r.status = "done")) as "✅ Done"
FROM "05-Sprints/Sprint-01"
WHERE (type = "task" OR type = "subtask")
GROUP BY assignee
SORT assignee ASC
```

## Distribución por Fase

```dataview
TABLE WITHOUT ID
  phase as "📍 Fase",
  length(rows) as "Tareas",
  length(filter(rows, (r) => r.status = "done")) as "✅ Done"
FROM "05-Sprints/Sprint-01"
WHERE (type = "task" OR type = "subtask")
GROUP BY phase
```

## Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| **Tareas planificadas** | 20 |
| **Tareas completadas** | 20 |
| **Velocidad** | 20/20 (100%) |
| **Esfuerzo total estimado** | ~108h |
| **Promedio por integrante** | ~36h |

## Retrospectiva

### ✅ Qué salió bien
- División clara de módulos por integrante (EDU→Geo, SAB→Elk, SAL→San)
- Trazabilidad completa en la RTM
- Entrega a tiempo

### ⚠️ Qué mejorar
- Iniciar gestión en vault desde el Sprint 1 (no al final)
- Documentar decisiones como ADR desde el inicio
- Programar revisiones cruzadas antes de la última semana

### 🔄 Acciones para Sprint 02
- Configurar vault completamente antes de iniciar trabajo
- Usar Kanban board activamente
- Reunión semanal con minuta documentada
