---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAL-04
type: requirement/functional
module: salud
wbs: RV-3.2
title: "Gestión de brigadas/campañas"
status: approved
priority: could
actor: [Personal salud]
source: documental
validation: "Validación con salud"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/could
---

# RF-SAL-04: Gestión de brigadas/campañas

## Descripción

El sistema debe permitir registrar campañas preventivas (vacunación, tamizaje, charlas) y asociar población objetivo.

## Problema de Origen

> Campañas preventivas mal coordinadas — sin registro de alcance ni participantes.

## Necesidad Identificada

> Registrar y coordinar brigadas/campañas con seguimiento de participantes.

## Criterios de Aceptación

- [ ] Lista de participantes por campaña con estado (pendiente/atendido)

## Notas de Validación

> Pendiente: Validación con personal de salud.

## Trazabilidad

- **Problema:** Campañas preventivas mal coordinadas
- **Necesidad:** Registrar brigadas/campañas
- **WBS:** [[WBS#RV-3.2]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
- **Fuente:** Documentación institucional

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND requirement = this.file.name
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-003]] | Pérdida de seguimiento en pacientes crónicos |
| Encuesta | [[ENC-SAL-01]] | Alertas tempranas como prioridad comunitaria |
| Observación | [[OBS-002]] | Pacientes crónicos sin sistema de monitoreo |
| Observación | [[OBS-003]] | Seguimiento manual con riesgo de pérdida |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
