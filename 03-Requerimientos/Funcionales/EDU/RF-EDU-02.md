---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-02
type: requirement/functional
module: educacion
wbs: RV-1.1
title: "Registro básico de estudiantes"
status: approved
priority: should
actor: [Docente]
source: entrevista
validation: "Revisión con docentes"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/should
---

# RF-EDU-02: Registro básico de estudiantes

## Descripción

El sistema debe permitir registrar estudiantes con datos mínimos (nombre, nivel educativo, lengua principal, centro educativo/territorio) para asociarles materiales y prácticas.

## Problema de Origen

> Falta de seguimiento básico por estudiante — no se conocen perfiles por nivel e idioma.

## Necesidad Identificada

> Identificar perfiles estudiantiles por nivel/idioma para personalizar contenidos.

## Criterios de Aceptación

- [ ] Registro con mínimo 4 campos obligatorios
- [ ] Asociación a un territorio/circuito educativo

## Notas de Validación

> Pendiente: Revisión con docentes comunitarios.

## Trazabilidad

- **Problema:** Falta de seguimiento básico por estudiante
- **Necesidad:** Identificar perfiles estudiantiles por nivel/idioma
- **WBS:** [[WBS#RV-1.1]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Entrevista/observación

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
