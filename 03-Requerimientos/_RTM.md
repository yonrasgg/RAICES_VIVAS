---
type: index
title: Matriz de Trazabilidad de Requerimientos (RTM)
project: raices-vivas
tags:
  - requerimiento
  - trazabilidad
  - index
banner_src: "08-Recursos/Imágenes/cover-requerimientos.png"
banner_src_x: 0.47714
banner_src_y: 0.42
assignee:
author: Geovanny
---
# Matriz de Trazabilidad de Requerimientos (RTM)

> Vista dinámica generada por SQLSeal. Cada requerimiento es una nota independiente con frontmatter estructurado.

## Matriz Dinámica

### Requerimientos Funcionales — Completo

> Incluye módulos EDU, SAB, SAL y TRANS (transversales reclasificados desde NF el 2026-03-11).

```sqlseal
SELECT name as "ID", module as "Módulo", wbs as "WBS", title as "Descripción", priority as "MoSCoW", actor as "Actor", source as "Fuente", validation as "Validación", status as "Estado"
FROM files
WHERE type = 'requirement/functional' AND path LIKE '03-Requerimientos/Funcionales%'
ORDER BY wbs ASC
```

### Requerimientos No Funcionales — Completo

```sqlseal
SELECT name as "ID", category as "Categoría", wbs as "WBS", title as "Descripción", priority as "MoSCoW", metric as "Métrica", status as "Estado"
FROM files
WHERE type = 'requirement/non-functional' AND path LIKE '03-Requerimientos/No Funcionales%'
ORDER BY wbs ASC
```

### Resumen por Prioridad

| MoSCoW | Significado | Criterio |
|--------|------------|----------|
| **must** | Crítico | Sin esto el sistema no cumple su propósito |
| **should** | Importante | Alto valor, pero viable sin él en MVP |
| **could** | Deseable | Mejora la experiencia, bajo riesgo de omisión |
| **wont** | Fuera de alcance actual | Documentado para futuras fases |

### Leyenda de Estado

| Estado | Significado |
|--------|------------|
| `draft` | Borrador inicial, requiere revisión |
| `review` | En revisión por equipo o stakeholder |
| `approved` | Aprobado y listo para diseño/implementación |
| `implemented` | Implementado en código |
| `tested` | Verificado con pruebas |

### Cobertura de Tareas por Requerimiento

```sqlseal
SELECT
  r.name as "Requerimiento",
  COALESCE(r.module, r.category, '—') as "Módulo",
  COALESCE(r.priority, '—') as "MoSCoW",
  r.status as "Estado",
  COUNT(t.name) as "Tareas",
  SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) as "Done"
FROM files r
LEFT JOIN files t ON (t.requirement = r.name OR t.requirement LIKE '%' || r.name || '%') AND (t.type = 'task' OR t.type = 'subtask') AND t.path LIKE '05-Sprints%'
WHERE r.type LIKE 'requirement%' AND r.path LIKE '03-Requerimientos%'
GROUP BY r.name
ORDER BY r.name ASC
```

### Vinculación Jira (Epics → Stories)

```sqlseal
SELECT key_ as "Jira Key", summary as "Epic / Story", issuetype as "Tipo", parent as "Parent", status as "Estado"
FROM files
WHERE (type = 'epic' OR type = 'story') AND (path LIKE '05-Sprints/Epics%' OR path LIKE '05-Sprints/Stories%')
ORDER BY key_ ASC
```

### Trazabilidad RF ↔ Casos de Uso (Avance 2)

> Referencia cruzada entre los 19 requerimientos funcionales y los 19 casos de uso documentados en el [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2]].

| RF | Caso de Uso | Módulo | Actor Principal | MoSCoW | CU Expandido | Investigación |
|----|------------|--------|-----------------|--------|-------------|---------------|
| RF-EDU-01 | CU-EDU-01: Registrar docente comunitario | EDU | Admin del sistema | Must | ✅ §4.1 | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-EDU-02 | CU-EDU-02: Registrar estudiante | EDU | Docente comunitario | Should | — | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-EDU-03 | CU-EDU-03: Cargar material educativo multimedia | EDU | Docente comunitario | Must | ✅ §4.2 | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-EDU-04 | CU-EDU-04: Organizar material por asignatura | EDU | Docente comunitario | Should | — | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-EDU-05 | CU-EDU-05: Realizar ejercicio de práctica | EDU | Estudiante | Should | — | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-EDU-06 | CU-EDU-06: Consultar progreso de estudiante | EDU | Docente comunitario | Could | — | [[ENT-001]], [[ENC-EDU-01]], [[OBS-001]] |
| RF-SAB-01 | CU-SAB-01: Registrar saber ancestral multimedia | SAB | Guía cultural | Must | ✅ §4.3 | [[ENT-002]], [[ENT-004]], [[ENC-SAB-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAB-02 | CU-SAB-02: Clasificar saber por categoría | SAB | Admin comunitario | Should | — | [[ENT-002]], [[ENT-004]], [[ENC-SAB-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAB-03 | CU-SAB-03: Buscar saberes por filtros | SAB | Usuario autorizado | Should | — | [[ENT-002]], [[ENT-004]], [[ENC-SAB-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAB-04 | CU-SAB-04: Configurar restricción de acceso | SAB | Admin comunitario | Must | ✅ §4.4 | [[ENT-002]], [[ENT-004]], [[ENC-SAB-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAB-05 | CU-SAB-05: Registrar consentimiento informado | SAB | Admin comunitario | Must | — | [[ENT-002]], [[ENT-004]], [[ENC-SAB-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAL-01 | CU-SAL-01: Registrar paciente con ID único | SAL | Auxiliar de salud | Must | ✅ §4.5 | [[ENT-003]], [[ENC-SAL-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAL-02 | CU-SAL-02: Registrar historial médico básico | SAL | Auxiliar de salud | Must | ✅ §4.6 | [[ENT-003]], [[ENC-SAL-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAL-03 | CU-SAL-03: Programar cita médica | SAL | Auxiliar de salud | Should | — | [[ENT-003]], [[ENC-SAL-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAL-04 | CU-SAL-04: Gestionar brigada de salud | SAL | Auxiliar de salud | Could | — | [[ENT-003]], [[ENC-SAL-01]], [[OBS-002]], [[OBS-003]] |
| RF-SAL-05 | CU-SAL-05: Configurar alerta de seguimiento | SAL | Auxiliar de salud | Should | — | [[ENT-003]], [[ENC-SAL-01]], [[OBS-002]], [[OBS-003]] |
| RF-TRANS-01 | CU-TRANS-01: Sincronizar datos offline/online | TRANS | Sistema / Usuario | Must | ✅ §4.7 | [[ENT-001]]–[[ENT-004]], [[Bibliografía]] §6 |
| RF-TRANS-02 | CU-TRANS-02: Seleccionar idioma de interfaz | TRANS | Usuario autenticado | Must | ✅ §4.8 | [[ENT-001]]–[[ENT-004]], [[Bibliografía]] §6 |
| RF-TRANS-03 | CU-TRANS-03: Configurar gobernanza de datos | TRANS | Admin comunitario | Must | — | [[ENT-001]]–[[ENT-004]], [[Bibliografía]] §6 |

> **Cobertura:** 19 RF → 19 CU (100%). 8 CU documentados en formato expandido (todos Must). 11 CU listados.
