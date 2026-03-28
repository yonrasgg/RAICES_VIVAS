---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-03
type: requirement/functional
module: saberes
wbs: RV-2.2
title: "Búsqueda por filtros"
status: approved
priority: should
actor: [Usuario autorizado]
source: observacion
validation: "Prueba controlada"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/should
---

# RF-SAB-03: Búsqueda por filtros

## Descripción

El sistema debe permitir buscar saberes por categoría, territorio, idioma y formato.

## Problema de Origen

> Búsqueda ineficiente / pérdida de tiempo al intentar recuperar conocimiento registrado.

## Necesidad Identificada

> Acceso rápido a saberes autorizados.

## Criterios de Aceptación

- [ ] Resultados en menos de 3 segundos en condiciones normales

## Notas de Validación

> Pendiente: Prueba controlada con usuarios autorizados.

## Trazabilidad

- **Problema:** Búsqueda ineficiente / pérdida de tiempo
- **Necesidad:** Acceso rápido a saberes autorizados
- **WBS:** [[WBS#RV-2.2]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** Observación contextual

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
| Entrevista | [[ENT-002]] | Saberes como recurso educativo intergeneracional |
| Entrevista | [[ENT-004]] | Vínculo entre saberes y procesos de enseñanza |
| Encuesta | [[ENC-SAB-01]] | Interés en conectar saberes con educación formal |
| Observación | [[OBS-002]] | Saberes usados informalmente en enseñanza Bribri |
| Observación | [[OBS-003]] | Artesanas enseñando a jóvenes en Boruca |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
