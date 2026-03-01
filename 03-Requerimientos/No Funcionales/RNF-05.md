---
id: RNF-05
type: requirement/non-functional
category: usabilidad
wbs: RV-4.2
title: "Usabilidad en alfabetización digital básica"
status: approved
priority: should
metric: "Un usuario puede completar una acción clave (registrar cita, subir material) en ≤2 minutos con formulario de ≤6 campos obligatorios."
created: 2026-02-25
updated: 2026-02-27
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/should
---

# RNF-05: Usabilidad en alfabetización digital básica

## Descripción

La interfaz debe ser simple, con flujos guiados, formularios cortos y navegación intuitiva para usuarios con experiencia limitada en tecnología.

## Justificación

Muchos usuarios (docentes rurales, personal de salud en brigada, portadores de saber) tienen alfabetización digital básica. Una interfaz compleja impide la adopción.

## Métrica / Verificación

**Métrica:** Completar una acción clave en ≤2 minutos con formulario de ≤6 campos obligatorios.

**Método de verificación:** Prueba de usabilidad con usuarios reales, midiendo tiempo y tasa de éxito.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Alfabetización digital básica en la población objetivo
- **WBS:** [[WBS#RV-4.2]]
- **Categoría:** Usabilidad

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
