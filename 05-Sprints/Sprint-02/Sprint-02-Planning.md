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
completed: 2026-03-29
team: [Geovanny, Elkin, Santiago]
created: 2026-02-27
updated: 2026-03-29
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
| **Estado** | ✅ Completado (entregado 2026-03-29) |

## Timeline del Sprint

```mermaid
gantt
    title Sprint 02 — Avance 2
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section 🏗️ Diseño
    T-021 Diagrama contexto (Geo) [RV-12]  :done, t21, 2026-02-28, 2026-03-07
    T-025 Stack tecnológico (Equipo) [RV-30]:done, t25, 2026-03-01, 2026-03-14
    T-022 Modelo ER EDU (Elk) [RV-39]      :done, t22, 2026-03-03, 2026-03-14
    T-023 Modelo ER SAB (San) [RV-40]      :done, t23, 2026-03-03, 2026-03-14
    T-024 Modelo ER SAL (Geo) [RV-41]      :done, t24, 2026-03-03, 2026-03-14

    section 🎨 Prototipos
    T-026 Wireframes EDU (Geo) [RV-42]     :done, t26, 2026-03-10, 2026-03-19
    T-027 Wireframes SAB (Elk) [RV-43]     :done, t27, 2026-03-12, 2026-03-20
    T-028 Wireframes SAL (San) [RV-44]     :done, t28, 2026-03-14, 2026-03-22

    section ✅ Validación
    T-029 Instrumentos (San) [RV-31]       :done, t29, 2026-03-18, 2026-03-22
    T-030 Entrevistas (Elk) [RV-32]        :done, t30, 2026-03-23, 2026-03-25
    T-031 Gobernanza cultural (Eq) [RV-33] :done, t31, 2026-03-07, 2026-03-14

    section 📝 Casos de Uso
    T-032 Clasificar actores (Geo) [RV-55] :done, t32, 2026-03-26, 2026-03-28
    T-033 Lista 23 CU (Elk) [RV-56]        :done, t33, 2026-03-26, 2026-03-28
    T-034 Doc CU-EDU (Geo) [RV-57]         :done, t34, 2026-03-28, 2026-03-29
    T-035 Doc CU-SAB (Elk) [RV-58]         :done, t35, 2026-03-28, 2026-03-29
    T-036 Doc CU-SAL (San) [RV-59]         :done, t36, 2026-03-28, 2026-03-29
    T-037 Doc CU-TRANS (San) [RV-60]       :done, t37, 2026-03-28, 2026-03-29
    T-038 Diagrama UML CU (Geo) [RV-61]    :done, t38, 2026-03-28, 2026-03-29
    T-039 Matriz CU↔RF (Elk) [RV-62]       :done, t39, 2026-03-28, 2026-03-29
    T-040 Conclusiones (San) [RV-63]        :done, t40, 2026-03-28, 2026-03-29

    section 📦 Compilación
    T-041 Compilar Avance 2 (Geo) [RV-64]  :done, t41, 2026-03-29, 2026-03-29
    T-042 Exportar PDF (Geo) [RV-65]        :done, t42, 2026-03-29, 2026-03-29
    ENTREGA AVANCE 2                        :milestone, m2, 2026-03-29, 0d
```

## Tareas del Sprint

```sqlseal
SELECT name as "ID", title as "Tarea", assignee as "👤", status as "Estado", priority as "Prioridad", due as "Fecha Límite"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-02%'
ORDER BY due ASC, name ASC
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
    T032["T-032<br/>Clasificar actores<br/>🟢 Geo"]
    T033["T-033<br/>Lista 23 CU<br/>🟡 Elk"]
    T034["T-034<br/>Doc CU-EDU<br/>🟢 Geo"]
    T035["T-035<br/>Doc CU-SAB<br/>🟡 Elk"]
    T036["T-036<br/>Doc CU-SAL<br/>🟠 San"]
    T037["T-037<br/>Doc CU-TRANS<br/>🟠 San"]
    T038["T-038<br/>Diagrama UML CU<br/>🟢 Geo"]
    T039["T-039<br/>Matriz CU↔RF<br/>🟡 Elk"]
    T040["T-040<br/>Conclusiones<br/>🟠 San"]
    T041["T-041<br/>Compilar Avance 2<br/>🟢 Geo"]
    T042["T-042<br/>Exportar PDF<br/>🟢 Geo"]

    T021 -->|bloquea| T022
    T021 -->|bloquea| T023
    T021 -->|bloquea| T024
    T022 -->|bloquea| T026
    T023 -->|bloquea| T027
    T024 -->|bloquea| T028
    T026 -->|bloquea| T029
    T027 -->|bloquea| T029
    T028 -->|bloquea| T029
    T029 -->|bloquea| T030

    T032 -->|bloquea| T034
    T032 -->|bloquea| T035
    T032 -->|bloquea| T036
    T032 -->|bloquea| T037
    T033 -->|bloquea| T034
    T033 -->|bloquea| T035
    T033 -->|bloquea| T036
    T033 -->|bloquea| T037
    T034 -->|bloquea| T038
    T035 -->|bloquea| T038
    T036 -->|bloquea| T038
    T037 -->|bloquea| T038
    T034 -->|bloquea| T039
    T035 -->|bloquea| T039
    T036 -->|bloquea| T039
    T037 -->|bloquea| T039
    T038 -->|bloquea| T041
    T039 -->|bloquea| T041
    T041 -->|bloquea| T042

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
    style T032 fill:#4CAF50,color:#fff
    style T033 fill:#FFC107,color:#000
    style T034 fill:#4CAF50,color:#fff
    style T035 fill:#FFC107,color:#000
    style T036 fill:#FF9800,color:#fff
    style T037 fill:#FF9800,color:#fff
    style T038 fill:#4CAF50,color:#fff
    style T039 fill:#FFC107,color:#000
    style T040 fill:#FF9800,color:#fff
    style T041 fill:#4CAF50,color:#fff
    style T042 fill:#4CAF50,color:#fff
```

> **Ruta crítica:** T-021 → T-022/T-023/T-024 → T-026/T-027/T-028 → T-029 → T-030
> **Ruta CU:** T-032/T-033 → T-034..T-037 → T-038/T-039 → T-041 → T-042
> T-025, T-031 y T-040 pueden ejecutarse en paralelo con las rutas principales.

## 🚧 Tareas con Bloqueos Activos

```sqlseal
SELECT
  name as "Tarea Bloqueada",
  status as "Estado",
  assignee as "Responsable",
  blocked_by as "Bloqueada por"
FROM files
WHERE path LIKE '05-Sprints/Sprint-02%'
  AND (type = 'task' OR type = 'subtask')
  AND blocked_by IS NOT NULL AND blocked_by != ''
ORDER BY name ASC
```

## ⚠️ Impedimentos Activos

```sqlseal
SELECT
  name as "Tarea",
  assignee as "Responsable",
  impediments as "Impedimento"
FROM files
WHERE path LIKE '05-Sprints/Sprint-02%'
  AND (type = 'task' OR type = 'subtask')
  AND impediments IS NOT NULL AND impediments != ''
ORDER BY name ASC
```

## Capacidad del Equipo

| Integrante | Tareas Asignadas | Horas Estimadas |
|-----------|-----------------|-----------------|
| Geovanny | [[T-021]], [[T-024]], [[T-026]], [[T-032]], [[T-034]], [[T-038]], [[T-041]], [[T-042]] | ~35h |
| Elkin | [[T-022]], [[T-027]], [[T-030]], [[T-033]], [[T-035]], [[T-039]] | ~29h |
| Santiago | [[T-023]], [[T-028]], [[T-029]], [[T-036]], [[T-037]], [[T-040]] | ~30h |
| Equipo | [[T-025]], [[T-031]] | ~10h |
| **Total** | **22 tareas** | **~104h** |

## Entregables Esperados

- [x] Diagrama de contexto C4 nivel 1
- [x] Modelo ER del módulo EDU
- [x] Modelo ER del módulo SAB
- [x] Modelo ER del módulo SAL
- [x] ADR: Decisión de stack tecnológico
- [x] Wireframes iniciales (al menos 3 pantallas por módulo)
- [x] Informe de validación con usuarios
- [x] Clasificación de actores y lista de 23 casos de uso
- [x] Documentación expandida de 8 casos de uso representativos
- [x] Diagrama UML de casos de uso
- [x] Matriz de trazabilidad CU ↔ RF
- [x] Documento Avance 2 compilado y entregado

## Criterios de Éxito

- Todos los modelos ER son consistentes con los RF del Avance 1
- El stack tecnológico respeta las restricciones de RNF (offline, gama baja, multilingüe)
- Al menos 2 usuarios potenciales validan el diseño propuesto
- Trazabilidad completa: RF → Entidad ER → Prototipo UI
