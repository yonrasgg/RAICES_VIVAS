---
banner_src: "08-Recursos/Imágenes/cover-rf-trans.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-TRANS-01
key: ""
story_points: 8
type: requirement/functional
module: transversal
category: conectividad
wbs: RV-4.1
title: "Operación offline + sincronización"
status: approved
priority: must
actor:
  - Sistema
  - Usuario
source: "investigación"
validation: "Prueba sin conectividad en campo"
metric: "Permite registrar datos sin internet. Sincroniza automáticamente al detectar conectividad. Resuelve conflictos básicos."
created: 2026-02-25
updated: 2026-03-11
sprint: null
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

```sqlseal
SELECT
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%'
  AND (requirement = @id OR requirement LIKE '%' || @id || '%')
ORDER BY sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial como RNF-01 (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
| 2026-03-11 | Reclasificado de RNF-01 → RF-TRANS-01 (funcional transversal) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-001]] | Conectividad intermitente como barrera principal en Maleku |
| Entrevista | [[ENT-002]] | Zonas sin cobertura en Talamanca Alta |
| Entrevista | [[ENT-003]] | Brigadas médicas operando sin conexión estable |
| Entrevista | [[ENT-004]] | Aislamiento digital en territorio Boruca |
| Bibliografía | [[Bibliografía#6]] | Fuentes sobre conectividad y brecha digital |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
