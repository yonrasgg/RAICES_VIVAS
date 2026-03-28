---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RNF-03
type: requirement/non-functional
category: usabilidad
wbs: RV-4.2
title: "Usabilidad en alfabetización digital básica"
status: approved
priority: should
metric: "Un usuario puede completar una acción clave (registrar cita, subir material) en ≤2 minutos con formulario de ≤6 campos obligatorios."
created: 2026-02-25
updated: 2026-03-11
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/should
---

# RNF-03: Usabilidad en alfabetización digital básica

> [!info] Renumerado
> Este requerimiento fue renumerado de **RNF-05** a **RNF-03** el 2026-03-11 tras la reclasificación de RNF-01, RNF-02 y RNF-07 como funcionales.

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
| 2026-03-11 | Renumerado de RNF-05 → RNF-03 | Equipo |
