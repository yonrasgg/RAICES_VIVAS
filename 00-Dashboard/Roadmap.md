---
type: dashboard
title: "Roadmap & Gantt — Raíces Vivas"
project: raices-vivas
cssclass: dashboard
banner_src: "08-Recursos/Imágenes/cover-roadmap.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - dashboard
  - roadmap
  - gantt
---

## Timeline General del Proyecto

```mermaid
gantt
    title Raíces Vivas — Cronograma Maestro
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section 📚 Avance 1 — Requerimientos
    Investigación           :done,   a1, 2026-02-03, 2026-02-09
    Análisis                :done,   a2, 2026-02-10, 2026-02-16
    Requerimientos          :done,   a3, 2026-02-17, 2026-02-21
    Integración y entrega   :done,   a4, 2026-02-22, 2026-02-25
    AVANCE 1                :milestone, m1, 2026-02-25, 0d
    Setup vault gestión     :done,   a5, 2026-02-26, 2026-02-27

    section 🏗️ Avance 2 — Arquitectura
    Diseño de arquitectura  :done,   b1, 2026-02-28, 2026-03-15
    Modelos entidad-relación:done,   b2, 2026-03-03, 2026-03-14
    Decisión stack (ADR)    :done,   b3, 2026-03-01, 2026-03-14
    Prototipos UI/UX        :done,   b4, 2026-03-10, 2026-03-25
    Validación con usuarios :done,   b5, 2026-03-20, 2026-03-25
    Compilación Avance 2    :done,   b6, 2026-03-21, 2026-03-29
    AVANCE 2                :milestone, m2, 2026-03-29, 0d

    section 💻 Implementación
    Sprint-03 EDU piloto + sync  :active,  c1, 2026-04-01, 2026-04-23
    AVANCE 3                :milestone, m3, 2026-04-23, 0d
    Sprint-04 SAB + SAL + motor  :        c2, 2026-05-01, 2026-05-31
    Sprint-05 integración + test :        c3, 2026-06-01, 2026-06-30
    PROYECTO COMPLETO       :milestone, m4, 2026-06-30, 0d
```

---

## Gantt Detallado — Avance 1 (Sprint 01)

```mermaid
gantt
    title Avance 1 — Desglose por Tarea y Responsable
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section 🔍 Investigación
    T-001 Rev. doc. EDU (Geo)          :done, t1,  2026-02-03, 2026-02-07
    T-002 Rev. doc. SAB (Elk)          :done, t2,  2026-02-03, 2026-02-07
    T-003 Rev. doc. SAL (San)          :done, t3,  2026-02-03, 2026-02-07
    T-004 Introducción (Geo)           :done, t4,  2026-02-07, 2026-02-09
    T-005 Abstract (Elk)               :done, t5,  2026-02-07, 2026-02-09
    T-006 Justificación (San)          :done, t6,  2026-02-07, 2026-02-09

    section 📐 Análisis
    T-007 Objetivos (Geo)              :done, t7,  2026-02-10, 2026-02-12
    T-008 Marco metod. tipo (Elk)      :done, t8,  2026-02-10, 2026-02-14
    T-009 Marco metod. instr. (San)    :done, t9,  2026-02-10, 2026-02-14
    T-010 WBS / EDT (Geo)              :done, t10, 2026-02-13, 2026-02-16

    section 📋 Requerimientos
    T-011 RF EDU ×6 (Geo)              :done, t11, 2026-02-17, 2026-02-19
    T-012 RF SAB ×5 (Elk)              :done, t12, 2026-02-17, 2026-02-19
    T-013 RF SAL ×5 (San)              :done, t13, 2026-02-17, 2026-02-19
    T-014 RNF ×7 (Equipo)              :done, t14, 2026-02-19, 2026-02-21
    T-015 RTM (Geo)                    :done, t15, 2026-02-20, 2026-02-21

    section 📦 Integración
    T-016 Conclusiones (Elk)           :done, t16, 2026-02-22, 2026-02-23
    T-017 Revisión QA (San)            :done, t17, 2026-02-23, 2026-02-24
    T-018 Compilación final (Geo)      :done, t18, 2026-02-24, 2026-02-25
    ENTREGA                            :milestone, m1, 2026-02-25, 0d

    section ⚙️ Gestión
    T-020 Setup vault (Geo)            :done, t20, 2026-02-26, 2026-02-27
```

---

## Gantt Detallado — Avance 2 (Sprint 02)

```mermaid
gantt
    title Avance 2 — Tareas Planificadas
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section 🏗️ Diseño
    T-021 Diagrama contexto (Geo) [RV-12]  :done,   t21, 2026-02-28, 2026-03-07
    T-025 Stack tecnológico (Equipo) [RV-30]:done,  t25, 2026-03-01, 2026-03-14
    T-022 Modelo ER EDU (Elk) [RV-39]      :done,   t22, 2026-03-03, 2026-03-14
    T-023 Modelo ER SAB (San) [RV-40]      :done,   t23, 2026-03-03, 2026-03-14
    T-024 Modelo ER SAL (Geo) [RV-41]      :done,   t24, 2026-03-03, 2026-03-14

    section 🎨 Prototipos
    T-026 Wireframes EDU (Geo) [RV-42]     :done,   p1, 2026-03-10, 2026-03-19
    T-027 Wireframes SAB (Elk) [RV-43]     :done,   p2, 2026-03-12, 2026-03-20
    T-028 Wireframes SAL (San) [RV-44]     :done,   p3, 2026-03-14, 2026-03-22

    section ✅ Validación
    T-029 Preparar instrumentos (San) [RV-31]:done,  v1, 2026-03-18, 2026-03-22
    T-030 Planificar entrevistas (Elk) [RV-32]:done, v2, 2026-03-20, 2026-03-25
    T-031 Gobernanza cultural (Equipo) [RV-33]:done, v3, 2026-03-07, 2026-03-14

    section 📝 Casos de Uso
    T-032 Clasificar actores (Geo) [RV-55]   :done, t32, 2026-03-26, 2026-03-28
    T-033 Lista 23 CU (Elk) [RV-56]          :done, t33, 2026-03-26, 2026-03-28
    T-034 Doc CU-EDU (Geo) [RV-57]           :done, t34, 2026-03-28, 2026-03-29
    T-035 Doc CU-SAB (Elk) [RV-58]           :done, t35, 2026-03-28, 2026-03-29
    T-036 Doc CU-SAL (San) [RV-59]           :done, t36, 2026-03-28, 2026-03-29
    T-037 Doc CU-TRANS (San) [RV-60]         :done, t37, 2026-03-28, 2026-03-29
    T-038 Diagrama UML CU (Geo) [RV-61]     :done, t38, 2026-03-28, 2026-03-29
    T-039 Matriz CU↔RF (Elk) [RV-62]        :done, t39, 2026-03-28, 2026-03-29
    T-040 Conclusiones (San) [RV-63]         :done, t40, 2026-03-28, 2026-03-29

    section 📦 Compilación
    T-041 Compilar Avance 2 (Geo) [RV-64]   :done, t41, 2026-03-29, 2026-03-29
    T-042 Exportar PDF (Geo) [RV-65]         :done, t42, 2026-03-29, 2026-03-29
    ENTREGA AVANCE 2                   :milestone, m2, 2026-03-29, 0d
```

---

## Gantt Detallado — Avance 3 (Sprint 03)

```mermaid
gantt
    title Avance 3 — Implementación Piloto EDU + Sync + i18n
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    todayMarker stroke-width:3px,stroke:#f66,opacity:0.8

    section ⚙️ Setup & Sync
    T-043 Config React + Vite (Geo)         :done,   t43, 2026-04-01, 2026-04-01
    T-044 Sync PouchDB ↔ CouchDB (Geo)      :done,   t44, 2026-04-02, 2026-04-05
    T-045 Indicador visual sync (Geo)        :done,   t45, 2026-04-06, 2026-04-07

    section 🌐 Internacionalización
    T-046 Traducciones es + bri (Elk)        :done,   t46, 2026-04-07, 2026-04-08
    T-047 Selector idioma persist. (Elk)     :done,   t47, 2026-04-09, 2026-04-10

    section 📚 Módulo EDU
    T-048 CRUD Materiales (Geo)              :done,   t48, 2026-04-10, 2026-04-12
    T-049 Gestión Docentes (San)             :done,   t49, 2026-04-11, 2026-04-13
    T-050 Dashboard EDU métricas (San)       :done,   t50, 2026-04-13, 2026-04-14

    section ✅ Testing
    T-051 Pruebas sync offline (San)         :done,   t51, 2026-04-14, 2026-04-15
    T-052 Pruebas i18n (Elk)                 :done,   t52, 2026-04-13, 2026-04-14

    section 📦 Documentación & Cierre
    T-053 Redactar Avance 3 (Geo)            :active, t53, 2026-04-15, 2026-04-19
    T-054 Exportar PDF (Geo)                 :        t54, 2026-04-19, 2026-04-20
    T-055 Presentación final (Elk)           :        t55, 2026-04-20, 2026-04-21
    T-056 Sprint-03 Review (Equipo)          :        t56, 2026-04-21, 2026-04-22
    T-057 QA vault + frontmatter (San)       :        t57, 2026-04-20, 2026-04-22
    T-058 Sync Jira y cierre (Geo)           :        t58, 2026-04-22, 2026-04-23
    ENTREGA AVANCE 3                    :milestone, m3, 2026-04-23, 0d
```

---

## Milestones

| # | Milestone | Fecha Objetivo | Estado | Responsable |
|---|-----------|---------------|--------|-------------|
| M1 | Avance 1 — Requerimientos | 2026-02-25 | ✅ Entregado | Equipo |
| M2 | Avance 2 — Arquitectura | 2026-03-29 | ✅ Entregado | Equipo |
| M3 | Avance 3 — Implementación | 2026-04-23 | 🔄 En curso | Equipo |
| M4 | Proyecto Completo (S04+S05) | 2026-06-30 | ⏳ Pendiente | Equipo |

## Entregas Próximas

```sqlseal
SELECT
  title as "Tarea / Entrega",
  assignee as "👤",
  due as "Fecha",
  sprint as "Sprint",
  status as "Estado"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%' AND status != 'done'
ORDER BY due ASC
```

---

*Roadmap dinámico · Mermaid + SQLSeal + Jira Sync · Última actualización: 2026-04-19 (Sprint-03 activo, Avance 3 en curso)*

## Navegación

| Sprint | Enlace |
|--------|--------|
| **Sprint 01** | [[Sprint-01-Planning]] |
| **Sprint 02** | [[Sprint-02-Planning]] |
| **Sprint 03** | [[Sprint-03-Planning]] |
| **Sprint 04** | [[Sprint-04-Planning]] |
| **Sprint 05** | [[Sprint-05-Planning]] |
| **Backlog** | [[Backlog]] |
| **Dashboard** | [[Home]] |
