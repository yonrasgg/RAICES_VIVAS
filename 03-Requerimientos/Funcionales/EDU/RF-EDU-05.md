---
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
