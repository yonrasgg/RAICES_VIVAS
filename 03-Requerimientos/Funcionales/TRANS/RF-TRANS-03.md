---
<<<<<<< HEAD:03-Requerimientos/Funcionales/TRANS/RF-TRANS-03.md
banner_src: "08-Recursos/Imágenes/cover-rf.png"
=======
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
---
---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
>>>>>>> origin/main:03-Requerimientos/No Funcionales/RNF-07.md
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-TRANS-03
type: requirement/functional
category: gobernanza
wbs: RV-4.3
title: "Gobernanza cultural y control comunitario"
status: approved
priority: must
metric: "Configuración de roles y permisos editable por admin comunitario. Cada comunidad puede definir sus propias reglas de acceso."
created: 2026-02-25
updated: 2026-03-11
tags:
  - requerimiento
  - funcional
  - transversal
  - prioridad/must
---

# RF-TRANS-03: Gobernanza cultural y control comunitario

> [!info] Reclasificado
> Este requerimiento fue reclasificado de **RNF-07** a **RF-TRANS-03** el 2026-03-11. Se determinó que describe comportamiento funcional (configuración de roles y permisos por comunidad), no una cualidad de calidad.

## Descripción

El sistema debe permitir que cada comunidad defina y configure sus propios roles, permisos y reglas de acceso a contenidos a través de un administrador comunitario.

## Justificación

La gobernanza cultural es un derecho reconocido de los pueblos indígenas. Un sistema que centralice el control viola la autonomía comunitaria y genera desconfianza. El control debe ser local.

## Métrica / Verificación

**Métrica:** Roles y permisos editables por admin comunitario sin intervención técnica externa.

**Método de verificación:** Validación comunitaria — un admin comunitario configura roles y permisos sin ayuda.

## Impacto en Módulos

- [x] Educación (EDU) — control de acceso a materiales
- [x] Saberes Ancestrales (SAB) — niveles de acceso cultural
- [x] Salud (SAL) — roles de acceso a datos médicos

## Trazabilidad

- **Problema de origen:** Riesgo cultural por difusión sin control comunitario
- **WBS:** [[WBS#RV-4.3]]
- **Categoría:** Gobernanza
- **ID anterior:** RNF-07

## Tareas Vinculadas

```dataview
TABLE
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM "05-Sprints"
WHERE (type = "task" OR type = "subtask") AND (
  (typeof(requirement) = "array" AND contains(requirement, "RF-TRANS-03")) OR
  requirement = this.file.name
)
SORT sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial como RNF-07 (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
| 2026-03-11 | Reclasificado de RNF-07 → RF-TRANS-03 (funcional transversal) | Equipo |
