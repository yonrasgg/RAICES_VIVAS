---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-03
key: RV-5
story_points: 5
type: requirement/functional
module: educacion
wbs: RV-1.2
title: "Carga de materiales educativos"
status: approved
priority: must
actor: [Docente, Estudiante]
source: documental
validation: "Prueba con usuarios"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/must
---

# RF-EDU-03: Carga de materiales educativos

## Descripción

El sistema debe permitir almacenar materiales educativos en formatos texto, audio y video, asociándolos a idioma (español/lengua indígena), tema y nivel académico.

## Problema de Origen

> Escasez de materiales pertinentes y bilingües disponibles en territorios indígenas.

## Necesidad Identificada

> Acceso a materiales educativos bilingües organizados y accesibles offline.

## Criterios de Aceptación

- [ ] Un material tiene: título, idioma, nivel, tema, formato
- [ ] Búsqueda por idioma + nivel

## Notas de Validación

> Pendiente: Prueba con usuarios reales.

## Trazabilidad

- **Problema:** Escasez de materiales pertinentes y bilingües
- **Necesidad:** Acceso a materiales educativos bilingües
- **WBS:** [[WBS#RV-1.2]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Revisión documental + entrevistas

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
| Entrevista | [[ENT-001]] | Necesidad de material multimedia accesible offline |
| Encuesta | [[ENC-EDU-01]] | Preferencia por contenido audiovisual bilingüe |
| Observación | [[OBS-001]] | Recursos digitales inexistentes en aulas visitadas |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
