---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 03 — Implementación Piloto EDU + Transversal"
sprint: Sprint-03
avance: Avance-3
status: planned
goal: "Implementar el módulo EDU piloto con sincronización offline y soporte multilingüe"
started: 2026-04-01
due: 2026-04-30
completed:
team: [Geovanny, Elkin, Santiago]
created: 2026-03-26
updated: 2026-03-26
tags:
  - sprint
  - planning
  - avance-3
---

# Sprint 03 — Implementación Piloto EDU + Transversal

## Meta del Sprint

> Entregar un prototipo funcional del módulo Educación (EDU) con sincronización offline/online (PouchDB ↔ CouchDB) e interfaz multilingüe (español + Bribri), desplegable en una tablet con Raspberry Pi como servidor local.

## Período

| Campo | Valor |
|-------|-------|
| **Inicio** | 2026-04-01 |
| **Fin** | 2026-04-30 |
| **Duración** | 30 días (4.3 semanas) |
| **Estado** | 📋 Planificado |

## Compromisos del Sprint

### Must (Críticos)

- [ ] [[US-TRANS-01]] — Sincronización offline/online bidireccional (8 SP — Geovanny)
- [ ] [[US-TRANS-02]] — Interfaz multilingüe con selección de idioma (5 SP — Elkin)
- [ ] Ejecutar T-021 — Diagrama C4 en Mermaid (carry-over Sprint-02)
- [ ] Ejecutar T-022/23/24 — Modelos ER en Mermaid (carry-over Sprint-02)

### Should (Importantes)

- [ ] Ejecutar T-026/27/28 — Wireframes en Excalidraw (carry-over Sprint-02)
- [ ] Ejecutar T-029 — Instrumentos de validación completos
- [ ] Setup RPi + CouchDB en ambiente de desarrollo

### Could (Si hay tiempo)

- [ ] Ejecutar T-030 — Primera ronda de entrevistas de validación
- [ ] Pruebas de sincronización en conexión 2G simulada

## Capacidad del Equipo

| Miembro | Disponibilidad (hrs) | Foco |
|---------|---------------------|------|
| Geovanny | 80 | Sync, C4, ER-SAL, Setup RPi |
| Elkin | 60 | i18n, ER-SAB, Wireframes SAB |
| Santiago | 60 | ER-EDU wireframes, instrumentos, QA |

**Capacidad total:** 200 hrs · Sprint velocity estimada: 20 SP

## Riesgos del Sprint

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| PouchDB/CouchDB config en RPi | Alto | Spike técnico en semana 1 |
| Traducciones Bribri incompletas | Medio | Estructura lista, contenido incremental |
| Carry-over de Sprint-02 consume capacidad | Alto | Priorizar diagramas semana 1-2, desarrollo semana 2-4 |

## Definition of Done

- [ ] Código funcional en branch `feature/` correspondiente
- [ ] Sync PouchDB ↔ CouchDB verificada (create, update, conflict)
- [ ] Selector de idioma funcional (es + bri como mínimo)
- [ ] Tests unitarios para lógica de sync
- [ ] Frontmatter completo y consistente en todos los artefactos
- [ ] Revisado por al menos 1 integrante del equipo

## Tareas del Sprint

```sqlseal
SELECT
  name as "ID",
  title as "Tarea",
  assignee as "👤",
  status as "Estado",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-03%'
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
WHERE type = 'story' AND path LIKE '05-Sprints/Stories%' AND (name LIKE '%TRANS-01%' OR name LIKE '%TRANS-02%')
ORDER BY name ASC
```
