---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 02 — Avance 2: Diseño y Arquitectura"
sprint: Sprint-02
avance: Avance-2
status: done
goal: "Diseñar la arquitectura del sistema, crear modelos ER por módulo y definir el stack tecnológico"
started: 2026-02-28
due: 2026-04-01
completed: 2026-03-26
team: [Geovanny, Elkin, Santiago]
created: 2026-02-27
updated: 2026-03-26
tags:
  - sprint
  - planning
  - avance-2
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
    T-021 Diagrama contexto (Geo) [RV-12]  :active, t21, 2026-02-28, 2026-03-07
    T-025 Stack tecnológico (Equipo) [RV-30]:        t25, 2026-03-01, 2026-03-07
    T-022 Modelo ER EDU (Elk) [RV-39]      :        t22, 2026-03-03, 2026-03-14
    T-023 Modelo ER SAB (San) [RV-40]      :        t23, 2026-03-03, 2026-03-14
    T-024 Modelo ER SAL (Geo) [RV-41]      :        t24, 2026-03-03, 2026-03-14

    section 🎨 Prototipos
    T-026 Wireframes EDU (Geo) [RV-42]     :        t26, 2026-03-10, 2026-03-18
    T-027 Wireframes SAB (Elk) [RV-43]     :        t27, 2026-03-12, 2026-03-20
    T-028 Wireframes SAL (San) [RV-44]     :        t28, 2026-03-14, 2026-03-22

    section ✅ Validación
    T-029 Instrumentos (San) [RV-31]       :        t29, 2026-03-18, 2026-03-22
    T-030 Entrevistas (Elk) [RV-32]        :        t30, 2026-03-23, 2026-03-30
    T-031 Gobernanza cultural (Eq) [RV-33] :        t31, 2026-03-01, 2026-03-15
    Ajustes post-validación (Equipo)   :        v3, 2026-03-28, 2026-04-01
    ENTREGA AVANCE 2                   :milestone, m2, 2026-04-01, 0d
```

## Tareas del Sprint

```sqlseal
SELECT id as "ID", title as "Tarea", assignee as "👤", status as "Estado", priority as "Prioridad", due as "Fecha Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-02%'
ORDER BY due ASC, id ASC
```

## Distribución por Responsable

```sqlseal
SELECT assignee as "👤 Responsable", COUNT(*) as "Tareas", SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as "✅ Done"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-02%'
GROUP BY assignee
ORDER BY assignee ASC
```

## 🔗 Mapa de Dependencias

```mermaid
graph LR
    T021["T-021<br/>Diagrama contexto<br/>🟢 Geo"]
    T025["T-025<br/>Stack ADR<br/>🔵 Equipo"]
    T022["T-022<br/>ER EDU<br/>🟡 Elk"]
    T023["T-023<br/>ER SAB<br/>🟡 San"]
    T024["T-024<br/>ER SAL<br/>🟡 Geo"]
    T026["T-026<br/>Wireframes EDU<br/>🟠 Geo"]
    T027["T-027<br/>Wireframes SAB<br/>🟠 Elk"]
    T028["T-028<br/>Wireframes SAL<br/>🟠 San"]
    T029["T-029<br/>Instrumentos<br/>🔴 San"]
    T030["T-030<br/>Entrevistas<br/>🔴 Elk"]
    T031["T-031<br/>Gobernanza ADR<br/>🔵 Equipo"]

    T021 -->|bloquea| T022
    T021 -->|bloquea| T023
    T021 -->|bloquea| T024
    T025 -->|bloquea| T026
    T025 -->|bloquea| T027
    T025 -->|bloquea| T028
    T022 -->|bloquea| T026
    T023 -->|bloquea| T027
    T024 -->|bloquea| T028
    T026 -->|bloquea| T029
    T027 -->|bloquea| T029
    T028 -->|bloquea| T029
    T029 -->|bloquea| T030

    style T021 fill:#4CAF50,color:#fff
    style T025 fill:#2196F3,color:#fff
    style T022 fill:#FFC107,color:#000
    style T023 fill:#FFC107,color:#000
    style T024 fill:#FFC107,color:#000
    style T026 fill:#FF9800,color:#fff
    style T027 fill:#FF9800,color:#fff
    style T028 fill:#FF9800,color:#fff
    style T029 fill:#f44336,color:#fff
    style T030 fill:#f44336,color:#fff
    style T031 fill:#2196F3,color:#fff
```

> **Ruta crítica:** T-021 → T-022/T-023/T-024 → T-026/T-027/T-028 → T-029 → T-030
> T-025 y T-031 pueden ejecutarse en paralelo con la ruta crítica.

## 🚧 Tareas con Bloqueos Activos

```sqlseal
TEMPLATE
{{#if data.length}}
| Tarea Bloqueada | Estado | Responsable | Bloqueada por |
|---|---|---|---|
{{#each data}}
| {{this.tarea}} | {{this.estado}} | {{this.responsable}} | {{this.bloqueada_por}} |
{{/each}}
{{else}}
✅ **No hay bloqueos activos** — todas las dependencias previas están resueltas.
{{/if}}

SELECT
  name as tarea,
  status as estado,
  assignee as responsable,
  blocked_by as bloqueada_por
FROM files
WHERE path LIKE '05-Sprints/Sprint-02%'
  AND (type = 'task' OR type = 'subtask')
  AND blocked_by IS NOT NULL AND blocked_by != ''
ORDER BY id ASC
```

## ⚠️ Impedimentos Activos

```sqlseal
TEMPLATE
{{#if data.length}}
| Tarea | Responsable | Impedimento |
|---|---|---|
{{#each data}}
| {{this.tarea}} | {{this.responsable}} | {{this.impedimento}} |
{{/each}}
{{else}}
✅ **Sin impedimentos registrados.**
{{/if}}

SELECT
  name as tarea,
  assignee as responsable,
  impediments as impedimento
FROM files
WHERE path LIKE '05-Sprints/Sprint-02%'
  AND (type = 'task' OR type = 'subtask')
  AND impediments IS NOT NULL AND impediments != ''
ORDER BY id ASC
```

## Capacidad del Equipo

| Integrante | Tareas Asignadas | Horas Estimadas |
|-----------|-----------------|-----------------|
| Geovanny | [[T-021]], [[T-024]], [[T-026]] | ~24h |
| Elkin | [[T-022]], [[T-027]], [[T-030]] | ~20h |
| Santiago | [[T-023]], [[T-028]], [[T-029]] | ~20h |
| Equipo | [[T-025]], [[T-031]] | ~12h |
| **Total** | **11 tareas** | **~76h** |

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
