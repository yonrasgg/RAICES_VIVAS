---
banner_src: "08-Recursos/Imágenes/cover-rnf.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RNF-04
type: requirement/non-functional
category: compatibilidad
wbs: RV-4.4
title: "Compatibilidad de dispositivo"
status: approved
priority: should
metric: "El sistema funciona en dispositivos Android gama media-baja y navegadores modernos sin requerir hardware especializado."
created: 2026-02-25
updated: 2026-03-11
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/should
---

# RNF-04: Compatibilidad de dispositivo

> [!info] Renumerado
> Este requerimiento fue renumerado de **RNF-06** a **RNF-04** el 2026-03-11 tras la reclasificación de RNF-01, RNF-02 y RNF-07 como funcionales.

## Descripción

El sistema debe funcionar correctamente en dispositivos de gama media-baja (Android 8+) y navegadores modernos, sin requerir hardware especializado.

## Justificación

En territorios indígenas los dispositivos disponibles son de gama baja. Exigir hardware de alto rendimiento excluye a la mayoría de usuarios.

## Métrica / Verificación

**Métrica:** Carga inicial en tiempo razonable. No requiere hardware especializado (GPS avanzado, NFC, etc.).

**Método de verificación:** Test de compatibilidad en al menos 3 dispositivos representativos.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Dispositivos de gama baja en territorios indígenas
- **WBS:** [[WBS#RV-4.4]]
- **Categoría:** Compatibilidad

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
| 2026-03-11 | Renumerado de RNF-06 → RNF-04 | Equipo |
