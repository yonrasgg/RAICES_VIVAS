---
type: proposal
title: "Propuesta de Gestión del Proyecto Raíces Vivas en Obsidian"
project: raices-vivas
status: draft
created: 2025-02-25
updated: 2025-02-25
author: Equipo Raíces Vivas
tags:
  - meta
  - propuesta
  - obsidian
  - gestión
---
# Propuesta de Gestión del Proyecto "Raíces Vivas" en Obsidian

> **Objetivo:** Convertir este vault de Obsidian en un sistema profesional de gestión de proyecto de software — equivalente funcional a Confluence + Jira + Wiki técnica — usando plugins, templates, frontmatter estructurado y convenciones estrictas.

---

## 1. Plugins Recomendados (Core Stack)

### 1.1 Plugins Esenciales (Instalar Primero)

| Plugin | Propósito | Por qué |
|--------|-----------|---------|
| **Dataview** | Queries, tablas dinámicas, dashboards | Es el "SQL de Obsidian". Permite consultar frontmatter para generar tablas de requerimientos, estados de tareas, matrices de trazabilidad dinámicas |
| **Templater** | Templates avanzados con lógica | Permite templates con fecha automática, prompts interactivos, snippets. Superior al template core de Obsidian |
| **Tasks** | Gestión de tareas tipo Jira | Checkboxes con fechas, prioridades, recurrencia, queries globales. Permite `- [ ] 📅 2025-03-01 Tarea X #modulo/edu` |
| **Kanban** | Tableros Kanban (como Trello/Jira boards) | Visualización de flujo de trabajo: Backlog → En Progreso → Review → Done |
| **Calendar** | Vista calendario con notas diarias | Integra con Daily Notes y Tasks para ver timeline del proyecto |
| **Excalidraw** | Diagramas libres, wireframes, mapas | Diagramas de arquitectura, wireframes de UI, mapas de actores, flujos de proceso |
| **Mermaid (built-in)** | Diagramas como código | Obsidian ya soporta Mermaid nativo. Sirve para: diagramas de flujo, secuencia, clases, ER, Gantt |

### 1.2 Plugins de Productividad y Datos

| Plugin | Propósito | Por qué |
|--------|-----------|---------|
| **DB Folder** | Carpetas como bases de datos | Convierte carpetas en tablas tipo Notion/Airtable. Ideal para gestionar requerimientos como registros de BD |
| **Metadata Menu** | Edición visual de frontmatter | Permite editar propiedades con dropdowns, tags predefinidos, tipos de dato. Reduce errores en frontmatter |
| **Projects** (by Marcus Olsson) | Gestión de proyectos tipo tabla/board/calendar | Vista unificada de notas como proyecto. Alternativa a Notion databases |
| **Obsidian Charts** | Gráficos y visualizaciones | Gráficos de barras, pie, línea. Para burndown charts, distribución de requerimientos, etc. |
| **Advanced Tables** | Edición de tablas Markdown mejorada | Formateo automático, ordenamiento, fórmulas básicas en tablas. Esencial para matrices grandes como la RTM |
| **Spreadsheets** (CSV plugin) | Hojas de cálculo embebidas | Embeber y editar CSVs directamente. Útil para matrices de datos, presupuestos, inventarios |

### 1.3 Plugins de Organización y Navegación

| Plugin | Propósito | Por qué |
|--------|-----------|---------|
| **Tag Wrangler** | Gestión avanzada de tags | Renombrar, fusionar, organizar tags jerárquicos (`#modulo/edu`, `#modulo/sab`) |
| **Breadcrumbs** | Navegación jerárquica entre notas | Crear relaciones padre-hijo entre documentos (WBS → Requerimientos → Criterios) |
| **Obsidian Git** | Control de versiones con Git | Backup automático, historial de cambios, colaboración en tiempo real entre los 3 integrantes vía GitHub |
| **Homepage** | Dashboard de inicio | Página de aterrizaje del proyecto con links rápidos a todo |
| **Folder Notes** | Nota índice por carpeta | Cada carpeta tiene una nota `README` automática que describe su contenido |
| **Linter** | Formateo consistente de Markdown | Asegura consistencia en frontmatter, headings, espaciado |
| **QuickAdd** | Creación rápida con templates | Macro para crear un nuevo requerimiento, tarea, o nota con un solo comando |

### 1.4 Plugins para Diagramas y Modelado

| Plugin               | Propósito                      | Por qué                                                                               |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| **Excalidraw**       | Diagramas visuales libre forma | Wireframes, mapas mentales, diagramas de arquitectura dibujados                       |
| **Mermaid (nativo)** | Diagramas como código          | ER diagrams, flowcharts, sequence diagrams, class diagrams, Gantt                     |
| **PlantUML**         | UML profesional                | Para diagramas de casos de uso, clases, componentes. Requiere servidor local o plugin |
| **Kroki**            | Multi-formato de diagramas     | Soporta D2, PlantUML, Mermaid, etc. desde un solo plugin                              |

---

## 2. Arquitectura de Directorios

```
RAICES_VIVAS/                          ← Vault root
│
├── 00-Dashboard/                      ← Página de inicio y dashboards
│   ├── Home.md                        ← Dashboard principal del proyecto
│   ├── Roadmap.md                     ← Timeline y milestones
│   └── Burndown.md                    ← Métricas de avance
│
├── 01-Proyecto/                       ← Gobierno del proyecto
│   ├── Charter.md                     ← Acta de constitución
│   ├── Alcance.md                     ← Scope statement
│   ├── Plan de Gestión.md             ← Plan de proyecto
│   ├── Stakeholders.md                ← Registro de interesados
│   ├── Riesgos.md                     ← Registro de riesgos
│   ├── Glosario.md                    ← Términos y acrónimos
│   └── Decisiones/                    ← ADRs (Architecture Decision Records)
│       └── ADR-001-stack-tecnologico.md
│
├── 02-Investigación/                  ← Fase de descubrimiento
│   ├── Contexto/                      ← Análisis del entorno
│   │   ├── Educación.md
│   │   ├── Saberes Ancestrales.md
│   │   └── Salud Comunitaria.md
│   ├── Entrevistas/                   ← Resultados de educción
│   │   ├── ENT-001-docente-bribri.md
│   │   └── _template-entrevista.md
│   ├── Encuestas/                     ← Instrumentos y resultados
│   ├── Observaciones/                 ← Notas de campo
│   └── Fuentes/                       ← Referencias bibliográficas
│       └── Referencias.md
│
├── 03-Requerimientos/                 ← Especificaciones del sistema
│   ├── _RTM.md                        ← Matriz de trazabilidad (Dataview)
│   ├── Funcionales/                   ← RF por módulo
│   │   ├── EDU/                       ← Módulo Educativo
│   │   │   ├── RF-EDU-01.md
│   │   │   ├── RF-EDU-02.md
│   │   │   └── ...
│   │   ├── SAB/                       ← Módulo Saberes Ancestrales
│   │   │   ├── RF-SAB-01.md
│   │   │   └── ...
│   │   └── SAL/                       ← Módulo Salud
│   │       ├── RF-SAL-01.md
│   │       └── ...
│   └── No Funcionales/                ← RNF transversales
│       ├── RNF-01-offline.md
│       └── ...
│
├── 04-Arquitectura/                   ← Diseño técnico
│   ├── Visión General.md              ← Arquitectura de alto nivel
│   ├── Diagramas/                     ← Excalidraw, Mermaid, PlantUML
│   │   ├── diagrama-contexto.excalidraw
│   │   ├── diagrama-modulos.md        ← Mermaid embebido
│   │   ├── modelo-datos.md            ← ER diagram
│   │   └── diagrama-despliegue.md
│   ├── WBS.md                         ← Work Breakdown Structure
│   ├── Modelo de Datos.md             ← Entidades, atributos, relaciones
│   └── Stack Tecnológico.md           ← Decisiones de tecnología
│
├── 05-Sprints/                        ← Gestión iterativa (tipo Jira)
│   ├── Backlog.md                     ← Product Backlog (Kanban)
│   ├── Sprint-01/
│   │   ├── Sprint Planning.md
│   │   ├── Sprint Review.md
│   │   └── Sprint Retro.md
│   └── Sprint-02/
│       └── ...
│
├── 06-Entregables/                    ← Documentos de entrega del curso
│   ├── Avance 1 - Raíces Vivas – Sistema Integral de Apoyo a Comunidades Indígenas.md
│   ├── Avance 2.md
│   └── Presentaciones/
│
├── 07-Reuniones/                      ← Minutas y acuerdos
│   ├── 2025-02-25-kickoff.md
│   └── _template-minuta.md
│
├── 08-Recursos/                       ← Archivos de soporte
│   ├── PDFs/                          ← Documentos fuente
│   │   ├── C1-2026-Consigna avance 1 del proyecto.docx.pdf
│   │   └── Raíces Vivas - Sistema Integral de Apoyo a Comunidades Indígenas.pdf
│   ├── Imágenes/
│   └── Datos/                         ← CSVs, datasets de prueba
│
├── 99-Templates/                      ← Plantillas del vault
│   ├── _template-requerimiento-funcional.md
│   ├── _template-requerimiento-nofuncional.md
│   ├── _template-entrevista.md
│   ├── _template-minuta.md
│   ├── _template-sprint-planning.md
│   ├── _template-sprint-review.md
│   ├── _template-adr.md
│   ├── _template-daily-note.md
│   ├── _template-tarea.md
│   └── _template-riesgo.md
│
├── Daily Notes/                       ← Notas diarias del proyecto
│   └── 2025-02-25.md
│
├── RAICES VIVAS.md                    ← (legacy - mover a 08-Recursos)
└── .obsidian/                         ← Config del vault
```

### Por qué esta estructura

| Directorio | Equivalente en industria | Justificación |
|------------|--------------------------|---------------|
| `00-Dashboard` | Confluence Home | Punto de entrada único. Dashboards con Dataview |
| `01-Proyecto` | Project Management Plan | Gobierno: alcance, riesgos, stakeholders, decisiones |
| `02-Investigación` | Discovery/Research | Separar evidencia cruda de especificaciones derivadas |
| `03-Requerimientos` | SRS / Product Backlog | **1 nota = 1 requerimiento** permite queries, Kanban, trazabilidad |
| `04-Arquitectura` | Architecture Docs | Diagramas y decisiones técnicas |
| `05-Sprints` | Jira Sprints | Planificación iterativa cuando llegue la implementación |
| `06-Entregables` | Release Docs | Lo que se entrega al profesor / stakeholder |
| `07-Reuniones` | Meeting Notes | Trazabilidad de decisiones y acuerdos |
| `99-Templates` | Confluence Templates | Templates con Templater para consistencia |

---

## 3. Convención de Frontmatter (Esquema Estándar)

### 3.1 Frontmatter para Requerimientos Funcionales

```yaml
---
id: RF-EDU-01
type: requirement/functional
module: educacion          # educacion | saberes | salud
wbs: RV-1.1
title: "Registro de docentes comunitarios"
status: draft              # draft | review | approved | implemented | tested
priority: must             # must | should | could | wont (MoSCoW)
actor: [Docente, Admin]
source: entrevista         # entrevista | encuesta | observacion | documental
validation: "Revisión con docentes"
created: 2025-02-25
updated: 2025-02-25
sprint: null
tags:
  - requerimiento
  - funcional
  - modulo/edu
  - prioridad/must
---
```

### 3.2 Frontmatter para Requerimientos No Funcionales

```yaml
---
id: RNF-01
type: requirement/non-functional
category: conectividad     # conectividad | multilingüismo | seguridad | usabilidad | rendimiento | compatibilidad | gobernanza
wbs: RV-4.1
title: "Operación offline + sincronización"
status: draft
priority: must
metric: "Permite registrar datos sin internet. Sincroniza al detectar conectividad."
created: 2025-02-25
updated: 2025-02-25
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/must
---
```

### 3.3 Frontmatter para Tareas (tipo Jira)

```yaml
---
type: task
id: TASK-001
title: "Crear modelo ER del módulo educativo"
status: todo               # todo | in-progress | review | done | blocked
priority: high             # critical | high | medium | low
assignee: "Geovanny"
sprint: Sprint-01
module: educacion
requirement: RF-EDU-01     # Link al requerimiento padre
due: 2025-03-15
created: 2025-02-25
tags:
  - tarea
  - modulo/edu
  - sprint/01
---
```

### 3.4 Frontmatter para Minutas de Reunión

```yaml
---
type: meeting
title: "Kickoff del proyecto"
date: 2025-02-25
attendees: [Geovanny, Colaborador1]
decisions: []
action-items: []
tags:
  - reunión
  - decisión
---
```

### 3.5 Frontmatter para ADRs (Architecture Decision Records)

```yaml
---
type: adr
id: ADR-001
title: "Selección de stack tecnológico"
status: proposed           # proposed | accepted | deprecated | superseded
date: 2025-02-25
deciders: [Equipo]
tags:
  - adr
  - arquitectura
---
```

---

## 4. Sistema de Tags (Taxonomía Jerárquica)

```
Tags del proyecto:
├── #modulo/edu              ← Módulo Educativo
├── #modulo/sab              ← Módulo Saberes Ancestrales
├── #modulo/sal              ← Módulo Salud
├── #modulo/transversal      ← Requerimientos cross-cutting
│
├── #tipo/requerimiento      ← Requerimientos
├── #tipo/tarea              ← Tareas
├── #tipo/decision           ← Decisiones
├── #tipo/investigacion      ← Material de investigación
├── #tipo/entrega            ← Entregables del curso
├── #tipo/reunion            ← Minutas
├── #tipo/riesgo             ← Riesgos identificados
│
├── #prioridad/must          ← MoSCoW: Crítico
├── #prioridad/should        ← MoSCoW: Importante
├── #prioridad/could         ← MoSCoW: Deseable
├── #prioridad/wont          ← MoSCoW: Fuera de alcance
│
├── #estado/draft            ← Borrador
├── #estado/review           ← En revisión
├── #estado/approved         ← Aprobado
├── #estado/done             ← Completado
│
├── #sprint/01               ← Sprint 1
├── #sprint/02               ← Sprint 2
├── #sprint/backlog          ← Backlog
│
├── #fase/descubrimiento     ← AS-IS
├── #fase/definicion         ← Priorización
├── #fase/especificacion     ← TO-BE
├── #fase/validacion         ← Feedback
│
├── #actor/docente           ← Actores del sistema
├── #actor/estudiante
├── #actor/admin-comunitario
├── #actor/personal-salud
├── #actor/portador-saber
└── #actor/lider-comunal
```

---

## 5. Queries Dataview (Dashboards Dinámicos)

### 5.1 Dashboard Home - Tabla de Requerimientos por Módulo

```dataview
TABLE
  id as "ID",
  title as "Título",
  priority as "Prioridad",
  status as "Estado",
  actor as "Actor"
FROM "03-Requerimientos"
WHERE type = "requirement/functional"
SORT module ASC, priority ASC
```

### 5.2 Conteo de Requerimientos por Estado

```dataview
TABLE
  length(rows) as "Cantidad"
FROM "03-Requerimientos"
WHERE type = "requirement/functional" OR type = "requirement/non-functional"
GROUP BY status
```

### 5.3 Tareas Pendientes (vista tipo Jira)

```dataview
TABLE
  status as "Estado",
  priority as "Prioridad",
  assignee as "Responsable",
  due as "Fecha límite",
  sprint as "Sprint"
FROM "05-Sprints"
WHERE type = "task" AND status != "done"
SORT priority ASC
```

### 5.4 Matriz de Trazabilidad Dinámica

```dataview
TABLE
  id as "ID",
  module as "Módulo",
  wbs as "WBS",
  priority as "MoSCoW",
  source as "Fuente",
  validation as "Validación",
  status as "Estado"
FROM "03-Requerimientos"
SORT wbs ASC
```

### 5.5 Timeline de Reuniones

```dataview
TABLE
  date as "Fecha",
  attendees as "Asistentes",
  decisions as "Decisiones"
FROM "07-Reuniones"
SORT date DESC
```

---

## 6. Templates (Ejemplos Clave)

### 6.1 Template: Requerimiento Funcional

```markdown
---
id: null
type: requirement/functional
module: null
wbs: null
title: "null"
status: draft
priority: null
actor: []
source: null
validation: ""
created: 2026-02-27
updated: 2026-02-27
sprint: null
tags:
  - requerimiento
  - funcional
---

# undefined: Propuesta de Gestión del Proyecto Raíces Vivas en Obsidian

## Descripción
> [Describir qué debe hacer el sistema]

## Problema de Origen
> [¿Qué problema resuelve?]

## Necesidad Identificada
> [¿Qué necesidad del usuario atiende?]

## Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Notas de Validación
> [Resultados de validación con usuarios]

## Trazabilidad
- **Problema:** 
- **Necesidad:** 
- **WBS:** [[]]
- **Módulo:** 

## Historial de Cambios
| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-27 | Creación inicial | |
```

### 6.2 Template: Minuta de Reunión

```markdown
---
type: meeting
title: "null"
date: 2026-02-27
attendees: []
decisions: []
action-items: []
tags:
  - reunión
---

# Minuta: Propuesta de Gestión del Proyecto Raíces Vivas en Obsidian

**Fecha:** 2026-02-27
**Hora:** 
**Duración:** 
**Asistentes:** 

## Agenda
1. 
2. 
3. 

## Discusión
### Tema 1


### Tema 2


## Decisiones Tomadas
- [ ] Decisión 1

## Action Items
- [ ] 📅 YYYY-MM-DD Tarea → @Responsable
- [ ] 📅 YYYY-MM-DD Tarea → @Responsable

## Próxima Reunión
**Fecha:** 
**Temas pendientes:**
```

### 6.3 Template: Sprint Planning

```markdown
---
type: sprint-planning
sprint: null
start: 2026-02-27
end: 
goal: ""
status: active
tags:
  - sprint
  - planificación
---

# Sprint undefined - Planning

**Período:** undefined → 
**Objetivo del Sprint:** 

## Compromisos del Sprint

### Must (Críticos)
- [ ] 

### Should (Importantes)
- [ ] 

### Could (Si hay tiempo)
- [ ] 

## Capacidad del Equipo
| Miembro | Disponibilidad | Foco |
|---------|---------------|------|
|         |               |      |

## Riesgos del Sprint
- 

## Definition of Done
- [ ] Requerimiento documentado con criterios de aceptación
- [ ] Validado con al menos 1 usuario/stakeholder
- [ ] Frontmatter completo y consistente
- [ ] Links de trazabilidad actualizados
```

### 6.4 Template: ADR (Architecture Decision Record)

```markdown
---
type: adr
id: ADR-null
title: "null"
status: proposed
date: 2026-02-27
deciders: []
tags:
  - adr
  - arquitectura
---

# ADR-undefined: Propuesta de Gestión del Proyecto Raíces Vivas en Obsidian

## Estado
draft

## Contexto
> ¿Cuál es el problema o la decisión que necesitamos tomar?

## Opciones Consideradas
1. **Opción A:** 
2. **Opción B:** 
3. **Opción C:** 

## Decisión
> ¿Qué decidimos y por qué?

## Consecuencias
### Positivas
- 

### Negativas/Riesgos
- 

## Referencias
- 
```

---

## 7. Estrategia de Vinculación (Links, Backlinks, MOCs)

### 7.1 Principio: Todo se conecta

```
Problema → Necesidad → WBS → Requerimiento → Tarea → Sprint → Entregable
     ↑                                                           ↓
     └────────── Validación / Feedback ──────────────────────────┘
```

### 7.2 Convenciones de links

| Tipo de link | Formato | Ejemplo |
|-------------|---------|---------|
| Requerimiento → WBS | `wbs:` en frontmatter + `[[WBS]]` | `wbs: RV-1.2` + `[[WBS#RV-1.2]]` |
| Tarea → Requerimiento | `requirement:` en frontmatter | `requirement: RF-EDU-01` + `[[RF-EDU-01]]` |
| Entrevista → Requerimiento | Inline link | `Esto valida [[RF-SAB-04]]` |
| Reunión → Decisión | `decisions:` en frontmatter | Link a ADR |
| Sprint → Tareas | Dataview query | Query filtra por `sprint: Sprint-01` |

### 7.3 MOCs (Maps of Content)

Cada directorio principal tiene un `_index.md` o nota MOC que sirve como tabla de contenido navegable:

- `03-Requerimientos/_RTM.md` → MOC de todos los requerimientos (query Dataview)
- `04-Arquitectura/Visión General.md` → MOC de diagramas y decisiones
- `05-Sprints/Backlog.md` → MOC de todas las tareas (Kanban board)
- `00-Dashboard/Home.md` → MOC del proyecto completo

---

## 8. Integración con Calendario

### 8.1 Daily Notes
- Usar plugin **Calendar** + **Daily Notes** (core)
- Carpeta: `Daily Notes/YYYY-MM-DD.md`
- Template daily note con sección de progreso del proyecto

### 8.2 Milestones en el calendario
- Usar frontmatter `due:` en tareas
- Dataview query para mostrar próximos deadlines:

```dataview
TABLE
  title as "Entregable",
  due as "Fecha",
  status as "Estado"
FROM ""
WHERE due AND due >= date(today)
SORT due ASC
LIMIT 10
```

### 8.3 Gantt con Mermaid (embebido)

````markdown
```mermaid
gantt
    title Raíces Vivas - Roadmap
    dateFormat YYYY-MM-DD
    
    section Avance 1
    Análisis de contexto          :done,    a1, 2025-02-01, 2025-02-25
    Educción de requerimientos    :done,    a2, 2025-02-10, 2025-02-25
    Especificación RF/RNF         :done,    a3, 2025-02-15, 2025-02-25
    Entrega Avance 1              :milestone, m1, 2025-02-25, 0d
    
    section Avance 2
    Diseño de arquitectura        :active,  b1, 2025-02-26, 2025-03-15
    Modelo de datos               :         b2, 2025-03-01, 2025-03-15
    Prototipos UI                 :         b3, 2025-03-10, 2025-03-25
    Validación con usuarios       :         b4, 2025-03-20, 2025-04-01
    Entrega Avance 2              :milestone, m2, 2025-04-01, 0d
    
    section Implementación
    Sprint 1 - Módulo piloto      :         c1, 2025-04-01, 2025-04-15
    Sprint 2 - Core features      :         c2, 2025-04-15, 2025-04-30
    Sprint 3 - Integración        :         c3, 2025-05-01, 2025-05-15
    Testing y refinamiento        :         c4, 2025-05-15, 2025-05-30
    Entrega Final                 :milestone, m3, 2025-05-30, 0d
```
````

---

## 9. Control de Versiones y Colaboración

### 9.1 Decisión: GitHub como fuente de verdad (3 integrantes)

> **Decisión tomada (2026-02-26):** Se descarta Google Drive Sync a favor de un **repositorio privado en GitHub** sincronizado con el vault de Obsidian mediante el plugin **Obsidian Git**.

**Justificación (GitHub vs Google Drive para 3 personas editando `.md`):**

| Criterio | GitHub | Google Drive |
|---|---|---|
| **Versionado** | Control real (git log, diff, revert) | Versiones automáticas limitadas (30 días) |
| **Conflictos** | Merge explícito y controlado | Sobrescritura silenciosa o archivos duplicados |
| **Trazabilidad** | Cada cambio tiene autor, fecha, mensaje | Sin trazabilidad granular |
| **Colaboración** | Pull requests, issues, reviews | Solo edición simultánea sin control de conflictos en `.md` |
| **VS Code** | Integración nativa (git panel, GitLens) | Requiere app externa |
| **Obsidian** | Plugin `obsidian-git` (auto commit/push/pull) | Funciona pero sin historial real |
| **Offline** | Funciona 100% offline, sync cuando quieras | Requiere conexión para sync |
| **Costo** | Gratis (repos privados ilimitados) | Gratis hasta 15 GB |

### 9.2 Configuración del Equipo (3 Integrantes)

**Herramientas por integrante:**

| Integrante | Herramienta principal | Herramienta de sync | Nivel técnico |
|---|---|---|---|
| Integrante 1 (técnico) | VS Code + Obsidian | Git CLI / Obsidian Git | Avanzado |
| Integrante 2 | Obsidian | Plugin **Obsidian Git** (auto-sync) | Intermedio |
| Integrante 3 (menos técnico) | Obsidian / **github.dev** (tecla `.` en el repo) | GitHub Desktop / navegador | Básico |

> **Tip:** Cualquier integrante puede editar desde el navegador presionando `.` en el repo de GitHub — abre VS Code completo sin instalar nada.

**Flujo de sincronización:**
```
Integrante 1 (VS Code/Obsidian) → commit → push → GitHub (repo privado)
Integrante 2 (Obsidian)          → pull  → edita → push ↑
Integrante 3 (github.dev)        → edita directamente en navegador ↑
```

### 9.3 Configuración Técnica

**Plugin Obsidian Git — Configuración recomendada:**
- Auto commit cada **10 minutos**
- Auto push después de cada commit
- Auto pull al abrir Obsidian
- Commit message: `vault backup: {{date}}`

**`.gitignore` del vault:**
```gitignore
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/plugins/*/data.json
.trash/
.DS_Store
```

**Archivos pesados (PDFs, imágenes >10 MB):**
- Opción A: **Git LFS** (Large File Storage)
- Opción B: Carpeta compartida de Google Drive solo para assets pesados
- Los `.md` y archivos de texto siempre van en GitHub

### 9.4 Reglas de Colaboración

1. **Siempre hacer pull antes de editar** (Obsidian Git lo hace automático)
2. **No editar el mismo archivo simultáneamente** — coordinar por chat
3. **Commits descriptivos** para cambios manuales importantes
4. **Branches opcionales** para cambios grandes (ej: reestructurar sección)
5. **Conflictos**: Git avisa explícitamente — resolver juntos, nunca sobrescribir

### 9.3 Integración con GitHub Projects (Futuro)

```
Obsidian Vault (Documentación)     ←→     GitHub Repo (Código + Issues)
        ↓                                         ↓
    Requerimientos                           GitHub Issues
    Tareas (Tasks plugin)         ←→      GitHub Projects Board
    ADRs                                    Wiki / Discussions
    Sprints                       ←→      GitHub Milestones
```

**Estrategia de puente:**

1. **GitHub Issues como fuente de tareas**: Cada requerimiento aprobado en Obsidian genera un Issue en GitHub con labels (`module:edu`, `priority:must`)
2. **GitHub Projects Board**: Kanban board que refleja el Backlog de Obsidian
3. **Milestones = Sprints**: Cada sprint de Obsidian es un Milestone en GitHub
4. **Bidireccionalidad**: Usar Obsidian para documentación rica + GitHub para tracking de código y CI/CD
5. **Automatización futura**: GitHub Actions para sincronizar estados

**Plugins útiles para el puente:**
- **Obsidian Git**: Sync del vault al repo
- **GitHub Publisher**: Publicar notas seleccionadas
- Se puede usar un script Python/Node que lea el frontmatter y cree Issues vía GitHub API

---

## 10. Flujo de Trabajo Propuesto

### Flujo diario
```
1. Abrir Home.md (Dashboard)
2. Revisar Dataview: tareas pendientes, deadlines próximos
3. Abrir Daily Note del día
4. Trabajar en tareas asignadas
5. Actualizar frontmatter (status, updated)
6. Registrar notas/hallazgos en la nota correspondiente
7. Commit (manual o automático con Obsidian Git)
```

### Flujo por Sprint
```
1. Sprint Planning → definir objetivo y tareas
2. Crear/actualizar tareas con frontmatter
3. Mover tareas en Kanban (Backlog → In Progress → Review → Done)
4. Sprint Review → documentar qué se completó
5. Sprint Retro → lecciones aprendidas
6. Actualizar Roadmap y Burndown
```

### Flujo para nuevo requerimiento
```
1. Cmd+P → QuickAdd → "Nuevo Requerimiento Funcional"
2. Templater solicita: ID, módulo, WBS, título, prioridad
3. Se crea nota en 03-Requerimientos/Funcionales/{MÓDULO}/
4. Completar: descripción, criterios de aceptación, trazabilidad
5. Status: draft → review (equipo/profesor) → approved
6. Aparece automáticamente en RTM (Dataview)
```

---

## 11. Orden de Implementación Sugerido

| Paso | Acción | Tiempo estimado |
|------|--------|-----------------|
| 1 | Instalar plugins esenciales (Dataview, Templater, Tasks, Kanban, Calendar, Excalidraw, Advanced Tables) | 15 min |
| 2 | Crear estructura de directorios | 10 min |
| 3 | Crear templates en `99-Templates/` | 30 min |
| 4 | Configurar Templater (folder de templates, QuickAdd) | 15 min |
| 5 | Migrar contenido actual del Avance 1 a la estructura (requerimientos individuales) | 1-2 hrs |
| 6 | Crear `Home.md` con dashboards Dataview | 30 min |
| 7 | Crear `_RTM.md` con query de trazabilidad | 15 min |
| 8 | Configurar Kanban board para Backlog | 15 min |
| 9 | Configurar Obsidian Git (si se decide) | 15 min |
| 10 | Crear primer diagrama de arquitectura (Mermaid/Excalidraw) | 30 min |

**Total estimado de setup: ~3-4 horas**

---

## 12. Resumen Ejecutivo

| Aspecto | Decisión |
|---------|----------|
| **IDE de documentación** | Obsidian con plugins profesionales |
| **Esquema de datos** | Frontmatter YAML estricto + Dataview queries |
| **Templates** | Templater con prompts interactivos |
| **Diagramas** | Mermaid (código) + Excalidraw (visual) + PlantUML (UML) |
| **Tareas** | Tasks plugin + Kanban boards |
| **Queries** | Dataview (SQL-like sobre Markdown) |
| **Calendario** | Calendar plugin + Daily Notes |
| **Trazabilidad** | Frontmatter → Dataview → RTM dinámica |
| **Tags** | Jerárquicos: `#modulo/`, `#prioridad/`, `#estado/`, `#sprint/` |
| **Versiones** | GitHub repo privado + plugin Obsidian Git |
| **Gestión (ahora)** | Kanban + Tasks en Obsidian |
| **Gestión (futuro)** | GitHub Projects + Milestones integrado |
| **Colaboración** | GitHub (3 integrantes: Obsidian Git + github.dev) |

> **Filosofía:** Cada nota es un nodo de conocimiento con metadata estructurada. Dataview convierte el vault en una base de datos viva. Los links crean la red de trazabilidad. Los templates garantizan consistencia. Los plugins añaden las vistas (tabla, kanban, calendario, gráfico) que transforman Markdown plano en un sistema de gestión profesional.
