---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RNF-04
type: requirement/non-functional
category: seguridad
wbs: RV-4.3
title: "Confidencialidad y privacidad en salud"
status: approved
priority: must
metric: "Un usuario sin rol de salud no puede ver el historial médico. Se registra quién consultó, qué dato y cuándo (log de auditoría mínimo)."
created: 2026-02-25
updated: 2026-02-27
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/must
---

# RNF-04: Confidencialidad y privacidad en salud

## Descripción

Los datos médicos deben ser accesibles solo por usuarios con rol autorizado (personal de salud). Toda consulta de datos sensibles debe quedar registrada en un log de auditoría.

## Justificación

Los datos médicos son altamente sensibles. La exposición no autorizada viola la privacidad del paciente y puede generar daño real (estigma, discriminación en comunidades pequeñas).

## Métrica / Verificación

**Métrica:** Un usuario sin rol de salud no puede ver historial médico. Se registra: quién consultó, qué dato, cuándo.

**Método de verificación:** Revisión con personal de salud + prueba de acceso con roles diferentes.

## Impacto en Módulos

- [ ] Educación (EDU)
- [ ] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Datos médicos sensibles en comunidades donde todos se conocen
- **WBS:** [[WBS#RV-4.3]]
- **Categoría:** Seguridad

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
