---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-01
key: ""
story_points: 5
type: requirement/functional
module: saberes
wbs: RV-2.1
title: "Registro de saberes"
status: approved
priority: must
actor: [Portador de saber, Admin comunitario]
source: entrevista
validation: "Validación comunitaria"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/must
---

# RF-SAB-01: Registro de saberes

## Descripción

El sistema debe permitir registrar saberes ancestrales en formato texto, audio o video, incluyendo descripción, origen (territorio) y contexto de uso/propósito.

## Problema de Origen

> Riesgo de pérdida cultural irreversible — los saberes se transmiten oralmente y los portadores envejecen sin sucesores formados.

## Necesidad Identificada

> Documentar saberes con contexto cultural para preservación intergeneracional.

## Criterios de Aceptación

- [ ] Un registro incluye: título, categoría, formato, territorio, nivel de acceso

## Notas de Validación

> Pendiente: Validación comunitaria con líderes y portadores de saber.

## Trazabilidad

- **Problema:** Riesgo de pérdida cultural (oralidad)
- **Necesidad:** Documentar saberes con contexto
- **WBS:** [[WBS#RV-2.1]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** Entrevistas + fuentes culturales

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE type = "task" AND requirement = this.file.name
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
