---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-07
type: requirement/functional
module: educacion
wbs: RV-1.3
title: "Repositorio compartido inter-comunitario"
status: approved
priority: should
actor: [Docente]
source: entrevista
validation: "Validación con docentes de comunidades maleku"
created: 2026-03-28
updated: 2026-03-28
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/should
---

# RF-EDU-07: Repositorio compartido inter-comunitario

## Descripción

El sistema debe permitir que docentes de distintas comunidades del mismo pueblo indígena compartan y accedan a materiales educativos subidos por otros centros, creando un repositorio colaborativo.

## Problema de Origen

> Los docentes de las 3 comunidades maleku (Margarita, Tonjibe, El Sol) crean materiales artesanalmente de forma aislada, duplicando esfuerzos y sin mecanismo de intercambio.

## Necesidad Identificada

> Repositorio compartido entre comunidades del mismo pueblo para reutilizar y enriquecer materiales educativos bilingües.

## Criterios de Aceptación

- [ ] Un docente puede publicar material como "compartido" con otras comunidades del mismo pueblo
- [ ] Docentes de otras comunidades ven y pueden reutilizar el material compartido
- [ ] El autor original mantiene atribución visible en materiales compartidos
- [ ] El material compartido se sincroniza automáticamente entre comunidades conectadas

## Notas de Validación

> Pendiente: Validación con docentes de las 3 comunidades maleku durante piloto en Guatuso.

## Trazabilidad

- **Problema:** Duplicación de esfuerzo entre comunidades del mismo pueblo
- **Necesidad:** Repositorio compartido inter-comunitario
- **WBS:** [[WBS#RV-1.3]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** [[ENT-001]] — Entrevista con docente maleku

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
| 2026-03-28 | Creación a partir de análisis de entrevistas (G-EDU-01) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-001]] | Docentes de 3 comunidades maleku crean material sin repositorio compartido |
| Encuesta | [[ENC-EDU-01]] | 73% de docentes crean material propio sin compartirlo |
| Observación | [[OBS-001]] | Materiales dispersos sin mecanismo de intercambio entre centros |
| Síntesis | [[02-Investigación/Análisis de Entrevistas]] | Gap G-EDU-01 identificado |
