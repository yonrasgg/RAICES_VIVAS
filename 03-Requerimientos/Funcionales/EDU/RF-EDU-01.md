---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-01
key: RV-4
story_points: 5
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
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Entrevista + revisión MEP

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
| Entrevista | [[ENT-001]] | Necesidades de registro docente en territorio Maleku |
| Encuesta | [[ENC-EDU-01]] | Percepción comunitaria sobre acceso educativo |
| Observación | [[OBS-001]] | Dinámica escolar observada en Guatuso |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
