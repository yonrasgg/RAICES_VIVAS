---
banner_src: "08-Recursos/Imágenes/cover-rf-sab.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAB-07
type: requirement/functional
module: saberes
wbs: RV-2.3
title: "Registro de auditoría de acceso a contenido"
status: approved
priority: should
actor: [Admin comunitario]
source: entrevista
validation: "Revisión con comunidades piloto"
created: 2026-03-28
updated: 2026-03-28
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sab
  - prioridad/should
---

# RF-SAB-07: Registro de auditoría de acceso a contenido

## Descripción

El sistema debe mantener un log de auditoría visible para el administrador comunitario que registre quién subió, modificó, consultó o descargó contenido del módulo SAB, con fecha y tipo de acción.

## Problema de Origen

> Desconfianza comunitaria por experiencias previas de uso no autorizado de contenido cultural. Las comunidades necesitan verificar quién accede a sus saberes.

## Necesidad Identificada

> Transparencia completa sobre el ciclo de vida del contenido: quién lo creó, quién lo vio, quién lo descargó.

## Criterios de Aceptación

- [ ] Cada acceso a contenido SAB genera una entrada en el log (lectura, descarga, modificación)
- [ ] El admin comunitario puede consultar el log filtrado por: saber, usuario, fecha, tipo de acción
- [ ] El log es inmutable (no se puede editar ni eliminar)
- [ ] Los logs se almacenan localmente y se sincronizan con el servidor central

## Notas de Validación

> Pendiente: Definir nivel de detalle del log con comunidades piloto (Guatuso, Boruca).

## Trazabilidad

- **Problema:** Uso no autorizado de contenido cultural
- **Necesidad:** Transparencia y trazabilidad de acceso
- **WBS:** [[WBS#RV-2.3]]
- **Módulo:** [[Saberes Ancestrales]] (SAB)
- **Fuente:** [[ENT-002]], [[ENT-004]] — Desconfianza por apropiación previa

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
| 2026-03-28 | Creación a partir de análisis de entrevistas (G-SAB-03) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-002]] | Desconfianza por publicación sin permiso — necesidad de trazabilidad |
| Entrevista | [[ENT-004]] | Necesidad de auditoría sobre modificaciones a contenido cultural |
| Encuesta | [[ENC-SAB-01]] | 80% de encuestados reporta preocupación alta por mal uso |
| Observación | [[OBS-002]] | Saberes compartidos sin registro de autoría |
| Síntesis | [[02-Investigación/Análisis de Entrevistas]] | Gap G-SAB-03 identificado |
