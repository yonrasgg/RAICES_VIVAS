---
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
type: document
title: "Plan de Gestión — Raíces Vivas"
project: raices-vivas
status: active
created: 2026-02-27
updated: 2026-03-05
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - proyecto
  - gestion
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
| **SQLSeal** | Consultas SQL dinámicas, RTM, métricas, KPIs en Dashboard |
| **Templater** | Templates interactivos con prompts y lógica JavaScript |
| **QuickAdd** | 12 macros: crear tareas, minutas, RF, RNF, riesgos, ADRs, promover action items + decisiones + riesgos |
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

### Colaboración & Gestión Operativa
| Plugin | Función |
|--------|--------|
| **Git** (obsidian-git) | Auto-commit, push, pull cada 10 min. GitHub como fuente de verdad |
| **Auto Link Title** | Pega URLs y automáticamente inserta el título como texto del link |
| **Jira Issue Manager** (jira-sync) | Crear, actualizar y sincronizar issues con Jira Cloud. Mapeo bidireccional de frontmatter → Jira API |

### Jira Cloud
| Recurso | Valor |
|---------|-------|
| **Instancia** | [ucenfotec-team-y6xzvduw.atlassian.net](https://ucenfotec-team-y6xzvduw.atlassian.net) |
| **Proyecto** | `RV` — Raíces Vivas |
| **Board Scrum** | [RV Board](https://ucenfotec-team-y6xzvduw.atlassian.net/jira/software/projects/RV/boards/1) |
| **Jerarquía** | Epic (módulo) → Story (RF priorizado) → Task / Subtask |
| **Sprints** | Sprint 1 (cerrado), Sprint 2 (activo), máx. 8 SP por sprint |

## Automatización Clave

| Sistema | Descripción |
|---------|------------|
| **Auto-ID Tareas** | Al crear una tarea, Templater calcula automáticamente `T-XXX` (nunca manual) |
| **Auto-ID Decisiones** | Al crear un ADR, Templater calcula automáticamente `ADR-XXX` (nunca manual) |
| **Auto-ID Riesgos** | Al crear un riesgo, Templater calcula automáticamente `RSK-XXX` con severidad automática |
| **Promoción de Action Items** | Los action items de minutas se promueven a tareas formales con un comando QuickAdd |
| **Promoción de Decisiones** | Las decisiones de minutas se promueven a ADRs formales con trazabilidad bidireccional |
| **Promoción de Riesgos** | Los riesgos de minutas se promueven a notas formales con severidad calculada |
| **Trazabilidad bidireccional** | Cada tarea referencia su requerimiento (`requirement:`) y su minuta origen (`source:`) |
| **RTM dinámica** | SQLSeal genera la matriz de trazabilidad automáticamente |
| **Dashboard KPIs** | Home.md muestra métricas en tiempo real vía SQLSeal (progreso, horas, costos) |
| **Esfuerzo Estimado vs Real** | `effort` (estimación) + `effort_actual` (horas reales al completar) → Dashboard calcula ₡ automáticamente usando tarifas por persona |
| **Costo por Persona** | `assignee` × `effort_actual` × tarifa horaria = costo real. Tarifas: Geovanny ₡8,500/h, Elkin ₡6,500/h, Santiago ₡6,500/h |
| **Weekly Notes Scoped** | Periodic Notes genera notas semanales con `week_start`/`week_end`. Los queries SQLSeal filtran por rango: solo muestran datos de esa semana específica |
| **Completadas por Semana** | Las tareas `done` con `completed: YYYY-MM-DD` aparecen automáticamente en la weekly note correspondiente |
| **Pendientes por Semana** | Las tareas `todo` con `due: YYYY-MM-DD` aparecen en la weekly de su semana límite |
| **Cycle Time** | `completed - started` = días que tardó una tarea. Se calcula automáticamente en Métricas |
| **Velocity** | Horas completadas por sprint. Se calcula desde `effort` de tareas `done` |
| **Sincronización Jira** | Cada tarea/story/epic creada en Obsidian se sincroniza a Jira con `Ctrl+P` → *Create issue in Jira*. Los campos frontmatter (summary, priority, assignee, parent, description, labels, duedate, timetracking) se mapean automáticamente a campos Jira |
| **Jerarquía Obsidian ↔ Jira** | Epics (`05-Sprints/Epics/`), Stories (`05-Sprints/Stories/`) y Tasks (`05-Sprints/Sprint-XX/`) tienen notas Obsidian con SQLSeal queries que resuelven la jerarquía `parent` idéntica a Jira |

> **🔑 Principio fundamental:** El frontmatter YAML es la **base de datos** del proyecto. Los 12 tipos de nota documentados en [[01-Proyecto/Guía de Workflow#4. Esquema de Frontmatter — Referencia Definitiva|Guía de Workflow §4]] definen qué campos son REQUERIDOS para que cada automatización funcione. Un campo vacío o mal escrito = dato invisible para el Dashboard.

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
| **RTM dinámica** | SQLSeal verifica completitud automáticamente | Tiempo real |
| **Promoción de Action Items** | Items de minutas se formalizan como tareas con trazabilidad | Post-reunión |

## Gestión de Riesgos

Ver [[01-Proyecto/Riesgos/]] — cada riesgo es una nota independiente (`RSK-XXX`) con:
- Severidad calculada automáticamente (probabilidad × impacto)
- Plan de respuesta (preventivo + contingencia)
- Trazabilidad a RF/RNF y ADRs afectados
- Fecha de revisión automática (cada 14 días)

## Gestión de Decisiones

Ver [[01-Proyecto/Decisiones/]] — cada decisión es un ADR formal (`ADR-XXX`) con:
- Contexto, opciones consideradas, y justificación
- Trazabilidad a RF/RNF y riesgos relacionados
- Estados: `proposed` → `accepted` → `deprecated`/`superseded`
- Origen rastreable (minuta fuente via `source:`)

## Gestión Financiera

Ver [[01-Proyecto/Finanzas|Gestión Financiera]] para el detalle completo. Resumen:

### Costos de Recursos Humanos

| Integrante | Rol | Tarifa / Hora (₡) | Dedicación Semanal |
|-----------|-----|-------------------|-------------------|
| **Geovanny** | Project Lead / Arquitecto | ₡8,500 | 12–15 h/semana |
| **Elkin** | Líder Investigación / Analista | ₡6,500 | 8–10 h/semana |
| **Santiago** | Líder QA / Analista | ₡6,500 | 8–10 h/semana |

### Herramientas (Costo Cero)

El stack completo opera con **software libre y tiers gratuitos**: Obsidian, GitHub Free, Git, VS Code, Node.js, Python, Mermaid, Draw.io. Ver [[01-Proyecto/Decisiones/ADR-001|ADR-001]].

### Costos Administrativos y Gubernamentales (Fase de Implementación)

| Concepto | Costo Estimado (₡) | Observación |
|----------|---------------------|-------------|
| Registro de marca (RNPI) | ₡150,000 | Por clase, Registro Nacional |
| Publicación en La Gaceta | ₡30,000 | Edicto obligatorio |
| Constitución de Asociación | ₡180,000 | Personería + libros legales |
| Certificación MEIC (PYME) | ₡0 | Trámite gratuito en línea |

### Marco Legal para Territorios Indígenas

El proyecto opera dentro del marco de:
- **Ley Indígena N° 6172** — Derechos de pueblos originarios
- **Convenio 169 OIT** — Consulta previa, libre e informada
- **Ley de Biodiversidad N° 7788** — Protección de conocimientos tradicionales
- **CONAI** — Ente coordinador entre Estado y 24 territorios indígenas

### Métricas de Calidad (Lean Six Sigma)

El proyecto incorpora métricas alineadas con el framework **DMAIC** (Define, Measure, Analyze, Improve, Control):

| Métrica | Descripción | Meta |
|---------|------------|------|
| **Throughput** | Tareas completadas por sprint | ≥ 80% |
| **WIP** | Trabajo en progreso simultáneo | ≤ 5 |
| **Defect Rate** | % tareas bloqueadas | < 5% |
| **First Pass Yield** | % completadas sin retrabajo | > 90% |
| **Cycle Time** | Horas promedio por tarea | < 4h |

Ver [[00-Dashboard/Métricas|Métricas de Avance]] para el dashboard completo con gráficos.

## Roadmap

Ver [[00-Dashboard/Roadmap]] para el timeline completo del proyecto.

## Referencias

- [[01-Proyecto/Guía de Workflow|Guía de Workflow v7.0]] — Documentación detallada de todos los flujos, plugins, diagramas, convenciones, y **referencia definitiva de frontmatter** (§4: 12 tipos de nota, campos REQUERIDO/RECOMENDADO/OPCIONAL, mapa campo→automatización)
- [[01-Proyecto/Propuesta de Gestión|Propuesta de Gestión]] — Fundamentación técnica de las decisiones de tooling
- [[01-Proyecto/Charter|Charter]] — Alcance y objetivos del proyecto
- [[01-Proyecto/Equipo|Equipo]] — Roles y responsabilidades detalladas
