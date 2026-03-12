---
banner_src: "08-Recursos/Imágenes/cover-rf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-TRANS-01
type: requirement/functional
category: conectividad
wbs: RV-4.1
title: "Operación offline + sincronización"
status: approved
priority: must
metric: "Permite registrar datos sin internet. Sincroniza automáticamente al detectar conectividad. Resuelve conflictos básicos."
created: 2026-02-25
updated: 2026-03-11
tags:
  - requerimiento
  - funcional
  - transversal
  - prioridad/must
---

# RF-TRANS-01: Operación offline + sincronización

> [!info] Reclasificado
> Este requerimiento fue reclasificado de **RNF-01** a **RF-TRANS-01** el 2026-03-11. Se determinó que describe comportamiento funcional (capacidad de registrar datos sin conexión y sincronizar), no una cualidad de calidad.

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
- **ID anterior:** RNF-01

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND (
  (typeof(requirement) = "array" AND contains(requirement, "RF-TRANS-01")) OR
  requirement = this.file.name
)
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial como RNF-01 (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
| 2026-03-11 | Reclasificado de RNF-01 → RF-TRANS-01 (funcional transversal) | Equipo |
