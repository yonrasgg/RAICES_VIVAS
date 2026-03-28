---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAL-05
type: requirement/functional
module: salud
wbs: RV-3.3
title: "Alertas de seguimiento"
status: approved
priority: should
actor: [Personal salud]
source: entrevista
validation: "Prueba con casos"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/should
---

# RF-SAL-05: Alertas de seguimiento

## Descripción

El sistema debe generar alertas para seguimiento de pacientes con enfermedades crónicas, según periodicidad definida por el responsable.

## Problema de Origen

> Pérdida de seguimiento en pacientes crónicos — no hay mecanismo de recordatorio.

## Necesidad Identificada

> Alertas configurables para garantizar continuidad en el seguimiento de condiciones crónicas.

## Criterios de Aceptación

- [ ] Regla configurable por condición (ej: diabetes → control cada 3 meses)
- [ ] Notificación visible en panel del responsable

## Notas de Validación

> Pendiente: Prueba con casos reales.

## Trazabilidad

- **Problema:** Pérdida de seguimiento en crónicos
- **Necesidad:** Alertas de seguimiento
- **WBS:** [[WBS#RV-3.3]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
- **Fuente:** Entrevistas

## Tareas Vinculadas

```sqlseal
SELECT
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%' AND requirement = @id
ORDER BY sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-003]] | Datos de salud expuestos en medios no seguros |
| Encuesta | [[ENC-SAL-01]] | Confidencialidad como requisito fundamental |
| Observación | [[OBS-002]] | Expedientes en papel sin control de acceso |
| Observación | [[OBS-003]] | Información sensible visible en puntos de atención |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
