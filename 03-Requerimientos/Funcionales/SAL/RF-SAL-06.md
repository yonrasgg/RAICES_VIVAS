---
banner_src: "08-Recursos/Imágenes/cover-rf-sal.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-SAL-06
type: requirement/functional
module: salud
wbs: RV-3.3
title: "Exportación de expediente a EDUS (CCSS)"
status: approved
priority: could
actor: [Personal salud]
source: entrevista
validation: "Verificación de formato EDUS con CCSS"
created: 2026-03-28
updated: 2026-03-28
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/sal
  - prioridad/could
---

# RF-SAL-06: Exportación de expediente a EDUS (CCSS)

## Descripción

El sistema debe permitir exportar los datos de pacientes y entradas de historial médico en un formato compatible con el sistema EDUS de la CCSS, para facilitar la transcripción que actualmente realiza el ATAP al regresar al EBAIS.

## Problema de Origen

> Los ATAPs transcriben manualmente sus boletas de papel al sistema EDUS al regresar de giras a los territorios, consumiendo 1-6 horas por gira. El 44% ha perdido datos en el proceso.

## Necesidad Identificada

> Exportación estructurada (CSV/PDF) que permita carga rápida o transcripción asistida al sistema EDUS del CCSS.

## Criterios de Aceptación

- [ ] Exportación de expediente individual o masiva (por brigada) en formato CSV y PDF
- [ ] El formato CSV incluye campos compatibles con los requeridos por EDUS
- [ ] Los datos de salud se exportan encriptados y requieren autenticación del ATAP
- [ ] La exportación genera un recibo con conteo de registros exportados

## Notas de Validación

> Pendiente: Verificar campos requeridos por EDUS con personal del CCSS/EBAIS.

## Trazabilidad

- **Problema:** Transcripción manual costosa y propensa a errores
- **Necesidad:** Exportación compatible con EDUS
- **WBS:** [[WBS#RV-3.3]]
- **Módulo:** [[Salud Comunitaria]] (SAL)
- **Fuente:** [[ENT-003]] — Entrevista con ATAP cabécar

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
| 2026-03-28 | Creación a partir de análisis de entrevistas (G-SAL-02) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-003]] | Transcripción papel→EDUS consume 1-6h por gira; 44% ha perdido datos |
| Encuesta | [[ENC-SAL-01]] | Promedio de 3.2h de transcripción por gira |
| Observación | [[OBS-002]] | Expedientes en papel sin control de acceso |
| Síntesis | [[02-Investigación/Análisis de Entrevistas]] | Gap G-SAL-02 identificado |
