---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_y: 0.42
id: RF-SAL-01
type: requirement/functional
module: salud
wbs: RV-3.1
title: "Registro de pacientes"
status: approved
priority: must
actor: [Personal salud]
source: documental
validation: "Validación con brigada"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/must
---

# RF-SAL-01: Registro de pacientes

## Descripción

El sistema debe permitir registrar pacientes con un ID interno, nombre, edad, territorio y contacto.

## Problema de Origen

> Fragmentación de información básica — datos de pacientes dispersos en distintos puntos de atención sin unificación.

## Necesidad Identificada

> Registro mínimo para dar continuidad a la atención entre visitas.

## Criterios de Aceptación

- [ ] ID interno único por paciente
- [ ] Campos sensibles con control de acceso por rol

## Notas de Validación

> Pendiente: Validación con brigada de salud.

## Trazabilidad

- **Problema:** Fragmentación de información básica
- **Necesidad:** Registro mínimo para continuidad
- **WBS:** [[WBS#RV-3.1]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
- **Fuente:** Entrevista + documentación salud

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
