---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-06
type: requirement/functional
module: saberes
wbs: RV-2.3
title: "Revocación de contenido por autoridad comunitaria"
status: approved
priority: must
actor: [Admin comunitario]
source: entrevista
validation: "Validación con ADI Boruca y comunidad bribri"
created: 2026-03-28
updated: 2026-03-28
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/must
---

# RF-SAB-06: Revocación de contenido por autoridad comunitaria

## Descripción

El sistema debe permitir que el administrador comunitario revoque (elimine o desactive) cualquier contenido registrado en el módulo SAB por decisión de la autoridad de la comunidad, con registro de auditoría de la acción.

## Problema de Origen

> Trauma de apropiación cultural documentado en comunidades bribri y boruca: contenido publicado sin autorización genera desconfianza. La capacidad de revocar es condición de confianza para la adopción del sistema.

## Necesidad Identificada

> "Que si digo quiten eso, se pueda quitar" — mecanismo de revocación inmediata con trazabilidad completa.

## Criterios de Aceptación

- [ ] El admin comunitario puede revocar cualquier registro SAB de su comunidad
- [ ] La revocación elimina el contenido de todos los dispositivos sincronizados en la siguiente sincronización
- [ ] Se genera registro de auditoría con: fecha, responsable, motivo, ID del contenido revocado
- [ ] El contenido ceremonial (solo local) se elimina inmediatamente del dispositivo
- [ ] Se notifica al portador original que su contenido fue revocado

## Notas de Validación

> Pendiente: Validar flujo de revocación con ADI Boruca y Consejo de mayores bribri.

## Trazabilidad

- **Problema:** Apropiación cultural sin consentimiento
- **Necesidad:** Revocación inmediata con auditoría
- **WBS:** [[WBS#RV-2.3]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** [[ENT-002]], [[ENT-004]] — Entrevistas con portador bribri y líder boruca

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
| 2026-03-28 | Creación a partir de análisis de entrevistas (G-SAB-01) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-002]] | Libro publicado sin permiso — trauma de apropiación bribri |
| Entrevista | [[ENT-004]] | Antropólogo filmó ceremonias sin consentimiento — trauma boruca |
| Encuesta | [[ENC-SAB-01]] | 90% requiere control sobre su contenido una vez publicado |
| Observación | [[OBS-002]] | Contenido compartido sin registro de autoría en Talamanca |
| Observación | [[OBS-003]] | Cadena de custodia cultural inexistente en Boruca |
| Síntesis | [[02-Investigación/Análisis de Entrevistas]] | Gap G-SAB-01 identificado |
