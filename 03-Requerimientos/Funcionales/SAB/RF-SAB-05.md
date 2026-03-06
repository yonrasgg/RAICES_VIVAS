---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-05
type: requirement/functional
module: saberes
wbs: RV-2.3
title: "Registro de consentimiento"
status: approved
priority: must
actor: [Admin comunitario]
source: entrevista
validation: "Revisión de proceso"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/must
---

# RF-SAB-05: Registro de consentimiento

## Descripción

El sistema debe registrar confirmación de consentimiento del portador del saber antes de guardar/publicar un registro, incluyendo fecha, responsable y nivel de acceso autorizado.

## Problema de Origen

> Documentar saberes sin consentimiento es éticamente riesgoso y culturalmente inaceptable.

## Necesidad Identificada

> Consentimiento trazable como requisito previo a la activación de cualquier registro.

## Criterios de Aceptación

- [ ] No se guarda como activo ningún registro sin consentimiento marcado

## Notas de Validación

> Pendiente: Revisión del proceso de consentimiento con comunidades.

## Trazabilidad

- **Problema:** Documentar sin consentimiento es riesgoso
- **Necesidad:** Consentimiento trazable
- **WBS:** [[WBS#RV-2.3]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** Entrevistas + ética cultural

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
