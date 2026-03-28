---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-EDU-05
type: requirement/functional
module: educacion
wbs: RV-1.3
title: "Generación de ejercicios de práctica"
status: approved
priority: should
actor: [Estudiante, Docente]
source: entrevista
validation: "Validación con estudiantes"
created: 2026-02-25
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/should
---

# RF-EDU-05: Generación de ejercicios de práctica

## Descripción

El sistema debe permitir generar ejercicios de práctica alineados con contenidos de evaluación nacional (estructuras tipo ítem), asociados a tema y nivel.

## Problema de Origen

> Dificultad con pruebas estandarizadas — los estudiantes no tienen herramientas de práctica contextualizadas.

## Necesidad Identificada

> Práctica guiada y contextualizada para preparar evaluaciones nacionales.

## Criterios de Aceptación

- [ ] Se generan ejercicios por filtro: nivel + tema
- [ ] Registro de intentos por estudiante (correcto/incorrecto)

## Notas de Validación

> Pendiente: Validación con estudiantes reales.

## Trazabilidad

- **Problema:** Dificultad con pruebas estandarizadas
- **Necesidad:** Práctica guiada y contextualizada
- **WBS:** [[WBS#RV-1.3]]
- **Módulo:** [[Educación]] (EDU)
- **Fuente:** Entrevistas + análisis de pruebas

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
| Entrevista | [[ENT-001]] | Necesidad de seguimiento individual por estudiante |
| Encuesta | [[ENC-EDU-01]] | Sin mecanismo de retroalimentación temprana |
| Observación | [[OBS-001]] | Docentes sin visibilidad del progreso estudiantil |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
