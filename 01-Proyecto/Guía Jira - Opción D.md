---
type: guide
title: "Guía de Integración Jira — Opción D (jira-sync + obsidian-jira-issue)"
project: raices-vivas
status: active
created: 2026-03-05
updated: 2026-03-05
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - guia
  - jira
  - integracion
---

# Guía de Integración Jira — Opción D

> **Objetivo:** Conectar el vault de Obsidian con Jira Cloud para tener sync bidireccional de tareas y dashboards JQL, sin scripts custom permanentes.

**Instancia Jira:** `https://ucenfotec-team-y6xzvduw.atlassian.net`
**Proyecto:** RV (Raíces Vivas)
**Board:** `https://ucenfotec-team-y6xzvduw.atlassian.net/jira/software/projects/RV/boards/1`

---

## Visión General

```
┌─────────────────────────────────────────────────────┐
│                   OBSIDIAN VAULT                     │
│                                                     │
│  ┌─────────────┐    ┌────────────────────────────┐  │
│  │ jira-sync   │◄──►│ Jira Cloud (RV)            │  │
│  │ (escritura) │    │ Epics → Stories → Tasks     │  │
│  │ Crear       │    │ Board + Sprints + Reports   │  │
│  │ Actualizar  │    └────────────────────────────┘  │
│  │ Status      │              ▲                      │
│  │ Worklog     │              │ JQL                  │
│  └─────────────┘    ┌────────┴───────────────────┐  │
│                     │ obsidian-jira-issue         │  │
│                     │ (lectura / dashboards)      │  │
│                     │ Tablas inline en Home.md    │  │
│                     │ Contadores y métricas       │  │
│                     └────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

| Plugin | Rol | Dirección |
|--------|-----|-----------|
| **jira-sync** (Jira Issue Manager) | Crear, editar, sincronizar issues | Obsidian ↔ Jira |
| **obsidian-jira-issue** | Dashboards JQL inline, contadores | Jira → Obsidian (solo lectura) |

---

## FASE 0 — Generar API Token de Atlassian

> Esto es necesario para **ambos plugins**. Solo se hace una vez.

### Paso a paso

1. **Abre tu navegador** y ve a:
   ```
   https://id.atlassian.com/manage-profile/security/api-tokens
   ```

2. **Inicia sesión** con tu cuenta de Atlassian (la misma que usás para Jira)

3. Clic en **"Create API token"**

4. En **Label**, escribe: `obsidian-raices-vivas`

5. Clic en **"Create"**

6. **COPIA EL TOKEN INMEDIATAMENTE** — no se puede volver a ver después de cerrar el modal

7. **Guarda el token** en un lugar seguro (gestor de contraseñas, no en el vault)

### Datos que necesitás tener a mano

| Dato | Valor | Dónde lo usás |
|------|-------|---------------|
| **Email** | Tu email de Atlassian (el que usás para login) | Ambos plugins |
| **API Token** | El que acabás de generar | Ambos plugins |
| **Jira URL** | `https://ucenfotec-team-y6xzvduw.atlassian.net` | Ambos plugins |
| **Proyecto** | `RV` | JQL queries |

---

## FASE 1 — Instalar y Configurar jira-sync (Plugin de Escritura)

### 1.1 Instalación

1. En Obsidian, presiona `Ctrl+,` para abrir **Settings**
2. En la barra lateral izquierda, clic en **Community plugins**
3. Clic en **"Browse"**
4. En el buscador, escribe: **`Jira Issue Manager`**
5. Aparece: **"Jira Issue Manager"** por **Alamion** — clic en él
6. Clic en **"Install"**
7. Clic en **"Enable"**

> **Alternativa:** Si al abrir `obsidian://show-plugin?id=jira-sync` en tu navegador ya te lleva al plugin, simplemente dale Install y Enable.

### 1.2 Configuración de Conexión

1. `Ctrl+,` → clic en **"Jira Issue Manager"** (sección Community plugins, parte inferior)
2. Configura estos campos:

| Campo | Valor |
|-------|-------|
| **Jira URL** | `https://ucenfotec-team-y6xzvduw.atlassian.net` |
| **Authentication Method** | **Basic Auth** |
| **Email** | Tu email de Atlassian |
| **API Token (PAT)** | El token que generaste en Fase 0 |
| **API Version** | `3` (Jira Cloud usa v3) |
| **Issues Folder** | `05-Sprints/jira-issues` |

> **IMPORTANTE:** NO usar Bearer Token (es para Jira Server/DC). NO usar Session Cookie (deprecated en Cloud). **Basic Auth** es el método correcto para Jira Cloud.

### 1.3 Verificar conexión

1. Presiona `Ctrl+P` para abrir la paleta de comandos
2. Escribe: **`Jira Issue Manager: Get issue from Jira with custom key`**
3. En el prompt, escribe: **`RV-1`** (o cualquier issue que ya exista en tu board)
4. Si funciona: se crea un archivo en `05-Sprints/jira-issues/` con los datos del issue
5. Si falla: revisar URL, email y token en Settings

### 1.4 Configurar el Template de jira-sync

El template define qué campos se sincronizan entre Obsidian y Jira. En Settings del plugin, busca la sección **Template** y configurá el contenido del template así:

```yaml
---
key: ""
summary: ""
status: ""
priority: ""
assignee: ""
issuetype: ""
sprint: ""
parent: ""
duedate: ""
labels: []
link: ""
created: ""
updated: ""
---
```

> Este template se usa solo cuando jira-sync **crea** un archivo nuevo al traer un issue. Los indicadores en el body son opcionales — el frontmatter es suficiente para nuestro caso.

### 1.5 Configurar Field Mappings (avanzado)

En Settings → **Field Mapping**, agrega estos mapeos personalizados:

| Field Name | Get from Jira (read) | Send to Jira (write) |
|------------|---------------------|---------------------|
| `sprint` | `issue.fields.sprint ? issue.fields.sprint.name : ""` | `null` |
| `parent` | `issue.fields.parent ? issue.fields.parent.key : ""` | `null` |
| `assignee` | `issue.fields.assignee ? issue.fields.assignee.displayName : ""` | `null` |
| `link` | `issue.self.split('/rest/')[0] + '/browse/' + issue.key` | `null` |
| `labels` | `issue.fields.labels` | `value` |
| `created` | `issue.fields.created.split('T')[0]` | `null` |
| `updated` | `issue.fields.updated.split('T')[0]` | `null` |

> Los campos con `null` en "Send to Jira" son de solo lectura (no se pushean). Los campos estándar (`summary`, `status`, `priority`, `duedate`) se mapean automáticamente sin configuración extra.

---

## FASE 2 — Instalar y Configurar obsidian-jira-issue (Plugin de Lectura)

### 2.1 Instalación

1. `Ctrl+,` → **Community plugins** → **Browse**
2. Buscar: **`Jira Issue`**
3. Aparece: **"Jira Issue"** por **marc0l92** — clic
4. **Install** → **Enable**

### 2.2 Configuración de Conexión

1. `Ctrl+,` → clic en **"Jira Issue"** (Community plugins)
2. Configura:

| Campo | Valor |
|-------|-------|
| **Host** | `https://ucenfotec-team-y6xzvduw.atlassian.net` |
| **Authentication type** | **Basic (Jira Cloud)** |
| **Username (email)** | Tu email de Atlassian |
| **Password (API Token)** | El token de Fase 0 |

### 2.3 Verificar conexión

En cualquier nota, escribe esto en el body (modo edición):

````markdown
```jira-search
type: TABLE
query: project = RV ORDER BY created DESC
limit: 5
columns: KEY, SUMMARY, STATUS, PRIORITY, ASSIGNEE
```
````

Si la conexión funciona, al cambiar a modo lectura (`Ctrl+E`) verás una tabla con los issues de Jira.

---

## FASE 3 — Preparar la Estructura en Jira

### 3.1 Crear los 4 Epics

Antes de migrar las tareas, necesitás crear la estructura de Epics en Jira. Esto se hace **una sola vez** desde la interfaz web de Jira:

1. Ve a: `https://ucenfotec-team-y6xzvduw.atlassian.net/jira/software/projects/RV/boards/1`
2. Clic en **"+ Create"** (botón azul arriba)
3. Crea estos 4 Epics:

| Epic Name | Descripción |
|-----------|-------------|
| **Módulo Educación (EDU)** | Gestión educativa intercultural — RF-EDU-01 a RF-EDU-06 |
| **Módulo Saberes Ancestrales (SAB)** | Preservación de conocimiento indígena — RF-SAB-01 a RF-SAB-05 |
| **Módulo Salud Comunitaria (SAL)** | Apoyo a salud comunitaria — RF-SAL-01 a RF-SAL-05 |
| **Transversal (TRANS)** | Requisitos no funcionales — RNF-01 a RNF-07 |

> **Tipo de issue:** `Epic`
> Al crear cada uno, asegurate de seleccionar **Issue type: Epic**

### 3.2 Crear los Sprints en Jira

1. En el board, clic en **Backlog** (barra lateral izquierda)
2. Clic en **"Create sprint"** para crear:
   - **Sprint-01** (2026-02-03 → 2026-02-25) — ya completado
   - **Sprint-02** (2026-02-28 → 2026-04-01) — activo
   - **Sprint-03**, **Sprint-04**, **Sprint-05** — futuros

### 3.3 Tabla de mapeo de estados

| Obsidian (`status:`) | Jira Status | Categoría Jira |
|----------------------|-------------|----------------|
| `todo` | To Do | To Do |
| `in-progress` | In Progress | In Progress |
| `review` | In Review | In Progress |
| `done` | Done | Done |
| `blocked` | Blocked* | To Do |

> *Si `Blocked` no existe como estado en tu board, podés crearlo en Project Settings → Board → Columns, o usar una etiqueta `blocked` como label.

### 3.4 Tabla de mapeo de prioridades

| Obsidian (tareas) | Obsidian (RF, MoSCoW) | Jira Priority |
|--------------------|-----------------------|---------------|
| `critical` | `must` | Highest |
| `high` | `should` | High |
| `medium` | `could` | Medium |
| `low` | `wont` | Low |

---

## FASE 4 — Migración Inicial (crear issues en Jira)

Hay dos formas de hacer la carga inicial:

### Opción A: Crear manualmente desde Obsidian (recomendada si < 30 issues)

Para cada tarea existente en el vault:

1. Abre la tarea en Obsidian (ej: `T-021.md`)
2. `Ctrl+P` → **"Jira Issue Manager: Create issue in Jira"**
3. Selecciona:
   - **Project:** RV
   - **Issue type:** Task (para tareas) o Story (para requerimientos)
4. El plugin crea el issue en Jira con el `summary` del frontmatter
5. **Anota el key** que devuelve (ej: `RV-15`) — o revisalo en Jira

> **Orden recomendado:**
> 1. Primero los 4 Epics (ya creados en Fase 3)
> 2. Luego los 16 Requirements como Stories (hijos de sus Epics)
> 3. Finalmente las Tasks como Tasks/Sub-tasks (hijos de sus Stories)

### Opción B: Migración batch con script Python (si tenés muchos issues)

> Solo necesitás esto si querés migrar las ~50+ notas existentes de golpe. Si preferís crear sobre la marcha, saltá esta opción.

Ejecutar desde terminal:

```bash
# 1. Instalar dependencia
pip install requests pyyaml

# 2. Ejecutar el script de migración
python3 08-Recursos/scripts/jira_migrate.py
```

> El script se crea en la Fase 5 de esta guía si decidís usarlo.

---

## FASE 5 — Flujo de Trabajo Diario (Post-integración)

### Crear una tarea nueva

**Flujo sin Jira (actual):**
`QuickAdd → "Nueva Tarea" → Se crea T-XXX.md`

**Flujo con Jira (nuevo, adicional):**
1. Creás la tarea en Obsidian con QuickAdd (igual que antes)
2. `Ctrl+P` → **"Jira Issue Manager: Create issue in Jira"** → Selecciona proyecto RV + tipo Task
3. El issue se crea en Jira. El plugin escribe el `key` en el frontmatter
4. Ahora la tarea existe en **ambos lados**

### Actualizar una tarea

1. Editá el frontmatter en Obsidian (ej: cambiar `status`, `priority`, `assignee`)
2. `Ctrl+P` → **"Jira Issue Manager: Update issue in Jira"**
3. Los cambios se pushean a Jira

### Cambiar estado de una tarea

1. `Ctrl+P` → **"Jira Issue Manager: Update issue status in Jira"**
2. Seleccioná el nuevo estado de la lista (To Do, In Progress, Done, etc.)
3. El estado se actualiza en Jira con la transición correcta

### Traer cambios de Jira a Obsidian

Si alguien editó algo en Jira y querés actualizar tu nota local:
1. Abrí la nota de la tarea
2. `Ctrl+P` → **"Jira Issue Manager: Get current issue from Jira"**
3. Los campos del frontmatter se actualizan con los valores de Jira

### Importar masivamente con JQL

Para traer muchos issues de golpe:
1. `Ctrl+P` → **"Jira Issue Manager: Batch Fetch Issues by JQL"**
2. Escribe el JQL, por ejemplo:
   ```
   project = RV AND sprint = "Sprint-02" ORDER BY priority DESC
   ```
3. Se crean/actualizan los archivos en la carpeta configurada

### Registrar tiempo

1. Abrí la nota de la tarea
2. `Ctrl+P` → **"Jira Issue Manager: Update work log in Jira manually"**
3. Ingresá el tiempo (ej: `2h`, `1d 4h`)

---

## FASE 6 — Dashboards JQL en Obsidian (obsidian-jira-issue)

### Dashboard de Sprint actual

Agregá esto en `00-Dashboard/Home.md` o en una nota nueva:

````markdown
### 🏃 Sprint-02 en Jira

```jira-search
type: TABLE
query: project = RV AND sprint in openSprints() ORDER BY priority DESC
limit: 50
columns: KEY, SUMMARY, -TYPE, STATUS, PRIORITY, ASSIGNEE
```
````

### Contadores rápidos

````markdown
**Issues abiertos:** `jira-count:project = RV AND status != Done`

**Bloqueados:** `jira-count:project = RV AND status = Blocked`

**Completados Sprint-02:** `jira-count:project = RV AND sprint in openSprints() AND status = Done`
````

### Issues por módulo

````markdown
### 📚 Módulo EDU
```jira-search
type: TABLE
query: project = RV AND "Epic Link" = "EPIC-EDU-KEY" ORDER BY status
columns: KEY, SUMMARY, STATUS, ASSIGNEE
```

### 🌿 Módulo SAB
```jira-search
type: TABLE
query: project = RV AND "Epic Link" = "EPIC-SAB-KEY" ORDER BY status
columns: KEY, SUMMARY, STATUS, ASSIGNEE
```

### 🏥 Módulo SAL
```jira-search
type: TABLE
query: project = RV AND "Epic Link" = "EPIC-SAL-KEY" ORDER BY status
columns: KEY, SUMMARY, STATUS, ASSIGNEE
```
````

> **Nota:** Reemplazá `EPIC-EDU-KEY`, `EPIC-SAB-KEY`, `EPIC-SAL-KEY` con los keys reales de tus Epics (ej: `RV-1`, `RV-2`, `RV-3`).

### Issue individual inline

En cualquier nota, podés referenciar un issue:

```markdown
Ver el progreso de la tarea JIRA:RV-15 para más detalles.
```

Esto renderiza un badge con el estado actual del issue.

---

## FASE 7 — Convivencia con el Vault Existente

### Lo que NO cambia

| Elemento | Status |
|----------|--------|
| Frontmatter YAML existente | Se mantiene intacto |
| QuickAdd macros | Siguen funcionando igual |
| Dataview queries (Dashboard, Métricas, Weekly) | Sin cambios |
| Pre-commit hook (fix_frontmatter) | Sin cambios |
| Plugin Git (auto-sync) | Sin cambios |
| Kanban board (Backlog.md) | Sin cambios |
| Templates de Templater | Sin cambios |

### Lo que se AGREGA

| Elemento | Descripción |
|----------|-------------|
| Campo `jira_key:` en frontmatter | Key del issue en Jira (ej: `RV-15`). Opcional, solo para tareas sincronizadas |
| Carpeta `05-Sprints/jira-issues/` | Donde jira-sync guarda los archivos nuevos traídos de Jira |
| Bloques `jira-search` / `jira-count` | Dashboards JQL inline (solo en notas donde los agregues) |
| Dos plugins nuevos | jira-sync + obsidian-jira-issue |

### Agregar `jira_key` al frontmatter de tareas existentes

Cuando sincronices una tarea con Jira, agregá el campo `jira_key` al frontmatter:

```yaml
---
type: task
id: T-021
jira_key: RV-15      # ← Nuevo campo, se agrega después de crear en Jira
title: "Diseñar diagrama de contexto del sistema"
status: todo
# ... resto del frontmatter sin cambios
---
```

> Este campo es **informativo** — lo usa principalmente jira-sync para saber a qué issue de Jira corresponde la nota. Los Dataview queries existentes no se ven afectados.

---

## Checklist de Implementación

- [ ] **Fase 0:** Generar API Token en `id.atlassian.com/manage-profile/security/api-tokens`
- [ ] **Fase 1.1:** Instalar jira-sync (Jira Issue Manager) desde Community Plugins
- [ ] **Fase 1.2:** Configurar: Basic Auth + URL + email + token + API v3
- [ ] **Fase 1.3:** Verificar conexión (`Get issue from Jira with custom key`)
- [ ] **Fase 1.4:** Configurar template
- [ ] **Fase 1.5:** Configurar field mappings
- [ ] **Fase 2.1:** Instalar obsidian-jira-issue desde Community Plugins
- [ ] **Fase 2.2:** Configurar: Basic (Jira Cloud) + URL + email + token
- [ ] **Fase 2.3:** Verificar conexión (bloque `jira-search` de prueba)
- [ ] **Fase 3.1:** Crear 4 Epics en Jira (EDU, SAB, SAL, TRANS)
- [ ] **Fase 3.2:** Crear Sprints en Jira board
- [ ] **Fase 4:** Migrar issues existentes (manual o batch)
- [ ] **Fase 6:** Agregar dashboards JQL a Home.md

---

## Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| "Authentication failed" en jira-sync | Token o email incorrecto | Verificar en Settings: email exacto + token sin espacios |
| "Authentication failed" en jira-issue | Misma causa | Verificar en Settings del otro plugin |
| No aparece "Jira Issue Manager" en Community Plugins | Plugin no disponible en tu versión | Verificar Obsidian v1.10.1+. Si no aparece, instalar manualmente desde GitHub releases |
| `jira-search` no renderiza tabla | Plugin jira-issue no habilitado | `Ctrl+,` → Community Plugins → verificar toggle azul |
| "Create issue" falla | Proyecto o tipo de issue incorrecto | Verificar que el proyecto RV existe y tiene los issue types configurados |
| Status no se puede cambiar | Jira workflow no permite la transición | Usar "Update issue status in Jira" que respeta las transiciones válidas |
| Campos custom no se sincronizan | Falta field mapping | Agregar en Settings → Field Mapping (ver Fase 1.5) |

---

## Resumen de Comandos jira-sync

| Atajo | Comando | Qué hace |
|-------|---------|----------|
| `Ctrl+P` → `Get issue...custom key` | Get issue from Jira with custom key | Trae 1 issue por key (RV-123) |
| `Ctrl+P` → `Batch Fetch...JQL` | Batch Fetch Issues by JQL | Trae múltiples issues con JQL |
| `Ctrl+P` → `Get current issue` | Get current issue from Jira | Actualiza la nota activa desde Jira |
| `Ctrl+P` → `Update issue` | Update issue in Jira | Pushea campos editados a Jira |
| `Ctrl+P` → `Create issue` | Create issue in Jira | Crea issue nuevo en Jira |
| `Ctrl+P` → `Update issue status` | Update issue status in Jira | Cambia estado con transición |
| `Ctrl+P` → `Update work log manual` | Update work log in Jira manually | Registra tiempo |
| `Ctrl+P` → `Update work log batch` | Update work log in Jira by batch | Registra tiempo en lote |
