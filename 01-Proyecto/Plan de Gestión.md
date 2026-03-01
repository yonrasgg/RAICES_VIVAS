---
type: document
title: "Plan de Gestión — Raíces Vivas"
project: raices-vivas
status: active
created: 2026-02-27
updated: 2026-03-01
tags:
  - proyecto
  - gestión
---

# Plan de Gestión del Proyecto — Raíces Vivas

## Metodología

**Investigación aplicada, cualitativo-descriptiva** con enfoque iterativo:

1. **Exploración / Descubrimiento (AS-IS):** Comprender contexto, actores, procesos y restricciones
2. **Definición y Priorización:** Convertir hallazgos en necesidades priorizadas (MoSCoW)
3. **Especificación (TO-BE):** Transformar necesidades en requerimientos verificables
4. **Validación:** Revisar con usuarios reales y ajustar

## Equipo y Liderazgo

| Integrante | Rol | Módulo | Área de Decisión |
|-----------|-----|--------|-------------------|
| **Geovanny** | Project Lead / Arquitecto | EDU + Transversal | Coordinación general, arquitectura, vault, entregables |
| **Elkin** | Líder de Investigación / Analista | SAB | Investigación, marco metodológico, decisiones técnicas SAB |
| **Santiago** | Líder de QA / Analista | SAL | Control de calidad, instrumentos, decisiones técnicas SAL |

Cada líder tiene autonomía para tomar decisiones técnicas dentro de su módulo. Las decisiones transversales se documentan como ADR.

## Stack Tecnológico (22 Plugins Activos)

### Core Workflow
| Plugin | Función |
|--------|--------|
| **Dataview** | Queries dinámicos, RTM, métricas, KPIs en Dashboard |
| **Templater** | Templates interactivos con prompts y lógica JavaScript |
| **QuickAdd** | 10 macros: crear tareas, minutas, RF, RNF, riesgos, ADRs, promover action items |
| **Tasks** | Emoji format para fechas/prioridades, estados custom (`[/]` In Progress, `[-]` Cancelled) |
| **Kanban** | Backlog board con columnas por estado |
| **Calendar** | Vista mensual de tareas con fecha `due:` |
| **Periodic Notes** | Weekly notes automáticas (`Daily Notes/YYYY-WNN.md`) |

### QA & Formato
| Plugin | Función |
|--------|--------|
| **Linter** | Formato consistente automático (YAML sort, heading gaps, trailing spaces) |
| **Advanced Tables** | Edición de tablas Markdown con tabulación inteligente |
| **Highlightr** | Resaltado de texto con colores |
| **Latex Suite** | Snippets para notación matemática y atajos |

### Visualización
| Plugin | Función |
|--------|--------|
| **Mermaid Tools** | Diagramas de flujo, secuencia, Gantt, C4, ERD embebidos |
| **Charts** | Gráficas de burndown y progreso |
| **Multi-Column Markdown** | Layouts multi-columna para dashboards |
| **Banners** | Imágenes de cabecera decorativas |

### Metadata & Navegación
| Plugin | Función |
|--------|--------|
| **Meta Bind** | Edición inline del frontmatter (suggesters en tablas de Control Rápido) |
| **Folder Notes** | Nota índice por carpeta |
| **Homepage** | Auto-apertura de `Home.md` al iniciar Obsidian |
| **Checklist** | Panel lateral con todos los checkboxes pendientes (tag: `tarea`) |
| **Projects** | Vista de portafolio de archivos con filtros |

### Colaboración
| Plugin | Función |
|--------|--------|
| **Git** (obsidian-git) | Auto-commit, push, pull cada 10 min. GitHub como fuente de verdad |
| **Auto Link Title** | Pega URLs y automáticamente inserta el título como texto del link |

## Automatización Clave

| Sistema | Descripción |
|---------|------------|
| **Auto-ID** | Al crear una tarea, Templater + Dataview calcula automáticamente `T-XXX` (nunca manual) |
| **Promoción de Action Items** | Los action items de minutas se promueven a tareas formales con un comando QuickAdd |
| **Trazabilidad bidireccional** | Cada tarea referencia su requerimiento (`requirement:`) y su minuta origen (`source:`) |
| **RTM dinámica** | Dataview genera la matriz de trazabilidad automáticamente |
| **Dashboard KPIs** | Home.md muestra métricas en tiempo real via Dataview |
| **Weekly Notes** | Se generan automáticamente con Periodic Notes |

## Comunicación

| Canal | Frecuencia | Propósito |
|-------|-----------|-----------|
| Reunión síncrona | Semanal | Sprint review, planificación |
| Chat (WhatsApp/Discord/Slack) | Diario | Coordinación rápida |
| Minutas Obsidian | Por reunión | Registro de decisiones y action items |
| Daily Notes | Diario | Progreso individual |

## Control de Calidad

| Control | Mecanismo | Frecuencia |
|---------|-----------|------------|
| **Formato consistente** | Linter automático (YAML sort, heading gaps, trailing spaces) | Cada guardado |
| **Frontmatter estricto** | Esquema YAML validado por tipo de nota | Cada creación |
| **Templates obligatorios** | Toda nota se genera desde `99-Templates/` via QuickAdd | Cada creación |
| **Auto-ID de tareas** | `T-XXX` calculado automáticamente — nunca manual | Cada tarea nueva |
| **Tasks emoji format** | `📅` due, `✅` done, `⏫` priority — al final de la línea | Cada checkbox |
| **Checklist panel** | Panel lateral muestra todos los DoD pendientes (tag: `tarea`) | Tiempo real |
| **Peer review** | Revisión cruzada de entregables (Santiago lidera QA) | Pre-entrega |
| **RTM dinámica** | Dataview verifica completitud automáticamente | Tiempo real |
| **Promoción de Action Items** | Items de minutas se formalizan como tareas con trazabilidad | Post-reunión |

## Gestión de Riesgos

Ver [[01-Proyecto/Riesgos/]] — cada riesgo es una nota independiente con seguimiento.

## Roadmap

Ver [[00-Dashboard/Roadmap]] para el timeline completo del proyecto.

## Referencias

- [[01-Proyecto/Guía de Workflow|Guía de Workflow v4.0]] — Documentación detallada de todos los flujos, plugins, diagramas y convenciones
- [[01-Proyecto/Propuesta de Gestión|Propuesta de Gestión]] — Fundamentación técnica de las decisiones de tooling
- [[01-Proyecto/Charter|Charter]] — Alcance y objetivos del proyecto
- [[01-Proyecto/Equipo|Equipo]] — Roles y responsabilidades detalladas
