---
id: RNF-01
type: requirement/non-functional
category: conectividad
wbs: RV-4.1
title: "Operación offline + sincronización"
status: approved
priority: must
metric: "Permite registrar datos sin internet. Sincroniza automáticamente al detectar conectividad. Resuelve conflictos básicos."
created: 2026-02-25
updated: 2026-02-27
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/must
---

# RNF-01: Operación offline + sincronización

## Descripción

El sistema debe funcionar en modo offline, permitiendo registrar, consultar y modificar datos sin conexión a internet, y sincronizar automáticamente cuando se detecte conectividad.

## Justificación

Los territorios indígenas de Costa Rica tienen conectividad limitada o inexistente. Sin modo offline, el sistema sería inutilizable en las condiciones reales de uso.

## Métrica / Verificación

**Métrica:** Se puede crear un registro completo (paciente, material, saber) sin conexión a internet. La sincronización se ejecuta automáticamente al restaurar conectividad.

**Método de verificación:** Prueba de campo — registrar datos en modo avión, restaurar conexión, verificar sincronización sin pérdida.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Conectividad limitada/intermitente en territorios indígenas
- **WBS:** [[WBS#RV-4.1]]
- **Categoría:** Conectividad

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
