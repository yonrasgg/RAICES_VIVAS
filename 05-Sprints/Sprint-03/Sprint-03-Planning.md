---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: sprint-planning
title: "Sprint 03 — Implementación Piloto EDU + Transversal"
sprint: Sprint-03
avance: Avance-3
status: active
goal: "Implementar el módulo EDU piloto con sincronización offline y soporte multilingüe"
started: 2026-04-01
due: 2026-04-23
completed:
team: [Geovanny, Elkin, Santiago]
created: 2026-03-26
updated: 2026-04-19
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
| **Fin** | 2026-04-23 |
| **Duración** | 23 días (3.3 semanas) |
| **Estado** | 🏃 Activo |

## Compromisos del Sprint

### Must (Críticos — Implementación)

- [x] [[T-043]] — Configurar entorno de desarrollo React + Vite + TailwindCSS (Geovanny, 2h)
- [x] [[T-044]] — Implementar sincronización PouchDB ↔ CouchDB (Geovanny, 6h)
- [x] [[T-045]] — Indicador visual de estado de sincronización (Geovanny, 3h)
- [x] [[T-046]] — Completar traducciones español + bribri (Elkin, 4h)
- [x] [[T-047]] — Selector de idioma con persistencia (Elkin, 3h)
- [x] [[T-048]] — Vista CRUD de Materiales Educativos (Geovanny, 5h)
- [x] [[T-049]] — Vista Gestión de Docentes (Santiago, 4h)

### Must (Críticos — Testing)

- [x] [[T-051]] — Pruebas de sincronización offline/online (Santiago, 3h)
- [x] [[T-052]] — Pruebas de interfaz multilingüe (Elkin, 2h)

### Should (Importantes)

- [x] [[T-050]] — Vista Dashboard EDU con métricas (Santiago, 4h)
- [ ] [[T-053]] — Redactar documento Avance 3 (Geovanny, 6h)
- [ ] [[T-054]] — Compilar y exportar PDF Avance 3 (Geovanny, 2h)
- [ ] [[T-055]] — Crear presentación final Sprint-03 (Elkin, 3h)

### Must (Críticos — Gestión)

- [ ] [[T-056]] — Sprint-03 Review y retrospectiva (Equipo, 2h)
- [ ] [[T-057]] — QA final — validación vault + frontmatter (Santiago, 3h)
- [ ] [[T-058]] — Sincronizar Jira y cerrar Sprint-03 (Geovanny, 1h)

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
