---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RNF-03
type: requirement/non-functional
category: rendimiento
wbs: RV-4.4
title: "Rendimiento"
status: approved
priority: should
metric: "Tiempo de respuesta menor a 3 segundos para búsquedas y consultas comunes con dataset representativo."
created: 2026-02-25
updated: 2026-02-27
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/should
---

# RNF-03: Rendimiento

## Descripción

El sistema debe responder en menos de 3 segundos para búsquedas y consultas comunes en condiciones normales de uso.

## Justificación

Los usuarios tienen baja tolerancia a la lentitud y experiencia limitada con tecnología. Un sistema lento genera frustración y abandono.

## Métrica / Verificación

**Métrica:** Tiempo de respuesta < 3 segundos para las 10 consultas más frecuentes con dataset representativo.

**Método de verificación:** Test técnico de rendimiento con dataset de prueba simulando volumen real.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Baja tolerancia a lentitud en usuarios con alfabetización digital básica
- **WBS:** [[WBS#RV-4.4]]
- **Categoría:** Rendimiento

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
