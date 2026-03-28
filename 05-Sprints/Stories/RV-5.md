---
banner_src: "08-Recursos/Imágenes/cover-rf-edu.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: "RV-5"
summary: "RF-EDU-03: Carga de materiales educativos multimedia"
issuetype: Story
project: RV
parent: "RV-1"
title: "Carga de materiales educativos multimedia"
status: done
priority: must
assignee: "Geovanny"
module: educacion
requirement: "RF-EDU-03"
story_points: 5
customfield_10016: 5
sprint: Sprint-02
created: 2026-02-03
updated: 2026-03-26
tags:
  - story
  - modulo/edu
  - mvp
description: "Como equipo de desarrollo, implementar la carga de materiales educativos en formatos texto, audio y video, para que los estudiantes accedan a recursos en su lengua indígena y nivel académico."
labels:
  - educacion
  - mvp
---

# 📖 RV-5: RF-EDU-03 — Carga de materiales educativos multimedia

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(review), option(done), option(blocked)):status]` |
| **Prioridad** | `INPUT[suggester(option(must), option(should), option(could), option(wont)):priority]` |
| **Clave Jira** | `VIEW[{key}]` |
| **Epic** | `VIEW[{parent}]` → [[RV-1]] |
| **Story Points** | `VIEW[{story_points}]` |
| **Módulo** | `VIEW[{module}]` |
| **Responsable** | `VIEW[{assignee}]` |
| **Requerimiento** | [[RF-EDU-03]] |

## User Story

> **Como** equipo de desarrollo,
> **quiero** implementar la carga de materiales educativos en formatos texto, audio y video,
> **para que** los estudiantes accedan a recursos en su lengua indígena y nivel académico.

## Criterios de Aceptación

- [ ] El sistema permite subir materiales en formato texto (PDF, DOC), audio (MP3, WAV) y video (MP4)
- [ ] Cada material se clasifica por: lengua, nivel académico, territorio y materia
- [ ] Se valida el formato del archivo antes de la carga
- [ ] Los materiales quedan disponibles para búsqueda y consulta inmediata
- [ ] Se muestra un preview del material según su tipo

## Subtareas / Tasks

```sqlseal
SELECT
  key as "Jira",
  title as "Tarea",
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%' AND parent = @key
ORDER BY sprint ASC, id ASC
```

## Trazabilidad

| Enlace | Referencia |
|--------|------------|
| **Epic** | [[RV-1]] — Educación Intercultural Bilingüe |
| **RF** | [[RF-EDU-03]] — Carga de materiales educativos |
| **WBS** | [[WBS]] — RV-1.2: Gestión de Contenidos Educativos |

## Notas de Implementación

- Almacenamiento: Object Storage (S3-compatible) para archivos multimedia
- Límite de archivo: 50 MB para video, 10 MB para audio, 5 MB para documentos
- Metadata: tabla `materiales_educativos` con FK a `lenguas`, `niveles`, `territorios`

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-03 | Creación de la historia en Jira | Geovanny |
| 2026-03-05 | Nota Obsidian vinculada | Geovanny |
