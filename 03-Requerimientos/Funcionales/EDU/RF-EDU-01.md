---
id: RF-EDU-01
type: requirement/functional
module: educacion
wbs: RV-1.1
title: "Registro de docentes comunitarios"
status: approved
priority: must
actor: [Docente, Admin]
source: documental
validation: "Revisión con docentes"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/must
---

# RF-EDU-01: Registro de docentes comunitarios

## Descripción

El sistema debe permitir registrar docentes comunitarios con datos básicos (nombre, territorio, rol, contacto) e indicar su lengua indígena dominante y nivel académico.

## Problema de Origen

> Brecha de apoyo educativo intercultural — no se conocen los perfiles docentes para personalizar el apoyo pedagógico.

## Necesidad Identificada

> Identificar perfiles docentes para personalizar apoyo según lengua, nivel y territorio.

## Criterios de Aceptación

- [ ] Se puede crear, editar e inactivar un docente (CRUD completo)
- [ ] Campo "lengua dominante" es obligatorio
- [ ] Validación mínima: nombre + territorio + rol

## Notas de Validación

> Pendiente: Revisión con docentes comunitarios.

## Trazabilidad

- **Problema:** Brecha de apoyo educativo intercultural
- **Necesidad:** Identificar perfiles docentes
- **WBS:** [[WBS#RV-1.1]]
- **Módulo:** Educación (EDU)
- **Fuente:** Entrevista + revisión MEP

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
