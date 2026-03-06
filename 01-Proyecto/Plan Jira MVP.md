---
type: guide
title: "Plan de Configuración Jira — MVP Raíces Vivas"
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
  - mvp
  - scrum
---

# Plan de Configuración Jira — MVP Raíces Vivas

> **Objetivo:** Configurar Jira con la estructura Scrum requerida (3 Epics, User Stories con story points, 2 Sprints, simulación) y sincronizar con el vault de Obsidian usando jira-sync sin modificar la estructura del vault.

---

## 1. Requerimientos Seleccionados para el MVP

### 6 Requerimientos Funcionales

| # | ID Vault | Título | Módulo | MoSCoW |
|---|----------|--------|--------|--------|
| 1 | RF-EDU-01 | Registro de docentes comunitarios | EDU | Must |
| 2 | RF-EDU-03 | Carga de materiales educativos | EDU | Must |
| 3 | RF-SAB-01 | Registro de saberes ancestrales | SAB | Must |
| 4 | RF-SAB-04 | Restricción de acceso por autorización comunitaria | SAB | Must |
| 5 | RF-SAL-01 | Registro de pacientes | SAL | Must |
| 6 | RF-SAL-02 | Historial médico básico | SAL | Must |

### 4 Requerimientos No Funcionales

| # | ID Vault | Título | Categoría | MoSCoW |
|---|----------|--------|-----------|--------|
| 1 | RNF-01 | Operación offline + sincronización | Conectividad | Must |
| 2 | RNF-02 | Multilingüismo (español + lengua indígena) | Multilingüismo | Must |
| 3 | RNF-04 | Confidencialidad y privacidad en salud | Seguridad | Must |
| 4 | RNF-07 | Gobernanza cultural y control comunitario | Gobernanza | Must |

> **Criterio de selección:** Los 10 requerimientos de prioridad "Must" porque representan las funcionalidades y atributos de calidad mínimos sin los cuales el sistema no puede operar en comunidades indígenas.

---

## 2. Estructura en Jira — 3 Epics

### Epic 1: Educación Intercultural (EDU)

| Campo | Valor |
|-------|-------|
| **Issue Type** | Epic |
| **Summary** | Educación Intercultural Bilingüe |
| **Description** | Módulo de gestión educativa comunitaria. Permite registro de docentes, carga de materiales educativos en múltiples formatos e idiomas, y organización por nivel académico. Cubre RF-EDU-01 y RF-EDU-03. |
| **Labels** | `educacion`, `mvp` |

### Epic 2: Saberes Ancestrales (SAB)

| Campo | Valor |
|-------|-------|
| **Issue Type** | Epic |
| **Summary** | Saberes Ancestrales y Patrimonio |
| **Description** | Módulo de registro y preservación de conocimiento indígena. Permite capturar saberes en texto, audio y video con control de acceso por autorización comunitaria. Cubre RF-SAB-01 y RF-SAB-04. |
| **Labels** | `saberes`, `mvp` |

### Epic 3: Salud Comunitaria (SAL)

| Campo | Valor |
|-------|-------|
| **Issue Type** | Epic |
| **Summary** | Salud Comunitaria e Intercultural |
| **Description** | Módulo de atención y seguimiento en salud. Permite registro de pacientes con ID único y mantenimiento de historial médico básico con control de acceso por rol. Cubre RF-SAL-01 y RF-SAL-02. |
| **Labels** | `salud`, `mvp` |

---

## 3. User Stories — Detalle Completo

> **Formato obligatorio:** "Como [rol], quiero [acción] para [beneficio]."
> **Story Points:** Escala Fibonacci (1, 2, 3, 5, 8)
> **Mínimo 2 criterios de aceptación por historia.**

---

### 📚 Epic 1: Educación Intercultural (EDU)

#### Story 1.1 — Registro de Docentes Comunitarios

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Educación Intercultural Bilingüe |
| **Summary** | Registro de docentes comunitarios |
| **Story** | Como **docente comunitario**, quiero **registrar mi perfil con datos básicos y lengua indígena dominante**, para **acceder a materiales personalizados según mi territorio y nivel académico**. |
| **Story Points** | **5** |
| **Labels** | `educacion`, `mvp`, `RF-EDU-01` |
| **Assignee** | Geovanny |
| **RF Origen** | RF-EDU-01 |

**Criterios de Aceptación:**

1. Se puede crear, editar e inactivar un docente (CRUD completo) con los campos: nombre, territorio, rol, contacto, lengua indígena dominante y nivel académico.
2. El campo "lengua dominante" es obligatorio — el sistema no permite guardar sin seleccionar una lengua.
3. Validación mínima: nombre + territorio + rol deben tener valor antes de guardar.

---

#### Story 1.2 — Carga de Materiales Educativos

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Educación Intercultural Bilingüe |
| **Summary** | Carga de materiales educativos multimedia |
| **Story** | Como **docente**, quiero **cargar materiales educativos en formatos texto, audio y video**, para que **los estudiantes accedan a recursos en su lengua indígena y nivel académico**. |
| **Story Points** | **5** |
| **Labels** | `educacion`, `mvp`, `RF-EDU-03` |
| **Assignee** | Geovanny |
| **RF Origen** | RF-EDU-03 |

**Criterios de Aceptación:**

1. Un material requiere campos obligatorios: título, idioma (español o lengua indígena), nivel académico, tema y formato.
2. La búsqueda por idioma + nivel retorna resultados relevantes en menos de 3 segundos.

---

### 🌿 Epic 2: Saberes Ancestrales (SAB)

#### Story 2.1 — Registro de Saberes Ancestrales

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Saberes Ancestrales y Patrimonio |
| **Summary** | Registro de saberes ancestrales multimedia |
| **Story** | Como **portador de saber**, quiero **registrar conocimientos ancestrales en texto, audio o video**, para **preservar los saberes de mi comunidad con su contexto territorial y de uso**. |
| **Story Points** | **5** |
| **Labels** | `saberes`, `mvp`, `RF-SAB-01` |
| **Assignee** | Elkin |
| **RF Origen** | RF-SAB-01 |

**Criterios de Aceptación:**

1. Un registro de saber incluye como obligatorios: título, categoría, formato, territorio y nivel de acceso.
2. Se soportan al menos 3 formatos de contenido: texto, audio y video.
3. Cada registro incluye campo de descripción/contexto de uso del saber.

---

#### Story 2.2 — Control de Acceso por Autorización Comunitaria

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Saberes Ancestrales y Patrimonio |
| **Summary** | Restricción de acceso por autorización comunitaria |
| **Story** | Como **administrador comunitario**, quiero **restringir el acceso a contenidos según nivel de autorización**, para **proteger saberes ceremoniales y sensibles de acceso no autorizado**. |
| **Story Points** | **3** |
| **Labels** | `saberes`, `mvp`, `RF-SAB-04` |
| **Assignee** | Elkin |
| **RF Origen** | RF-SAB-04 |

**Criterios de Aceptación:**

1. Cada contenido tiene un nivel de acceso obligatorio seleccionable entre 4 opciones: público, comunitario, restringido, ceremonial/sensible.
2. Los roles comunitarios determinan qué niveles de contenido pueden consultar — un usuario sin autorización no puede ver contenido restringido.

---

### 🏥 Epic 3: Salud Comunitaria (SAL)

#### Story 3.1 — Registro de Pacientes

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Salud Comunitaria e Intercultural |
| **Summary** | Registro de pacientes con ID único |
| **Story** | Como **personal de salud**, quiero **registrar pacientes con ID interno, nombre, edad y territorio**, para **mantener un censo actualizado de la población atendida en la comunidad**. |
| **Story Points** | **3** |
| **Labels** | `salud`, `mvp`, `RF-SAL-01` |
| **Assignee** | Santiago |
| **RF Origen** | RF-SAL-01 |

**Criterios de Aceptación:**

1. Se genera un ID interno único automáticamente al crear un paciente nuevo.
2. Los campos sensibles (historial, contacto) tienen control de acceso — solo usuarios con rol "Personal salud" pueden verlos.

---

#### Story 3.2 — Historial Médico Básico

| Campo | Valor |
|-------|-------|
| **Issue Type** | Story |
| **Epic** | Salud Comunitaria e Intercultural |
| **Summary** | Historial médico básico por paciente |
| **Story** | Como **personal de salud**, quiero **registrar el historial médico básico de cada paciente**, para **dar seguimiento a condiciones crónicas, alergias y medicación actual en cada visita**. |
| **Story Points** | **5** |
| **Labels** | `salud`, `mvp`, `RF-SAL-02` |
| **Assignee** | Santiago |
| **RF Origen** | RF-SAL-02 |

**Criterios de Aceptación:**

1. Cada entrada del historial registra: fecha de visita, responsable (personal de salud) y notas clínicas (condiciones, alergias, medicación).
2. El historial se muestra en vista cronológica ordenada por fecha descendente (más reciente primero).

---

## 4. Resumen de Story Points

| Story | SP | Epic |
|-------|----|------|
| 1.1 Registro docentes | 5 | EDU |
| 1.2 Carga materiales | 5 | EDU |
| 2.1 Registro saberes | 5 | SAB |
| 2.2 Control acceso | 3 | SAB |
| 3.1 Registro pacientes | 3 | SAL |
| 3.2 Historial médico | 5 | SAL |
| **TOTAL** | **26** | — |

---

## 5. Planificación de Sprints

### Sprint 1 — "Fundamentos del MVP" (2 semanas)

| Story | SP | Epic | Assignee |
|-------|----|------|----------|
| 1.1 Registro de docentes comunitarios | 5 | EDU | Geovanny |
| 2.2 Control de acceso por autorización | 3 | SAB | Elkin |
| **Total** | **8** | | |

> **Meta del Sprint:** Establecer la base de registro de usuarios (docentes) y el sistema de control de acceso por niveles comunitarios.

### Sprint 2 — "Registros Core" (2 semanas)

| Story | SP | Epic | Assignee |
|-------|----|------|----------|
| 3.1 Registro de pacientes | 3 | SAL | Santiago |
| 1.2 Carga de materiales educativos | 5 | EDU | Geovanny |
| **Total** | **8** | | |

> **Meta del Sprint:** Implementar el registro de pacientes y la carga de materiales multimedia.

### Backlog (Sprints Futuros)

| Story | SP | Epic | Notas |
|-------|----|------|-------|
| 2.1 Registro de saberes ancestrales | 5 | SAB | Sprint 3 |
| 3.2 Historial médico básico | 5 | SAL | Sprint 3 |
| **Total pendiente** | **10** | | |

---

## 6. Simulación de Sprint 1

### 6.1 Estados de las historias

| Story | Estado Simulado | Detalle |
|-------|----------------|---------|
| 1.1 Registro de docentes comunitarios | **Terminado** ✅ | CRUD completo implementado, validaciones pasando, tests OK |
| 2.2 Control de acceso por autorización | **En progreso** 🔄 | Modelo de 4 niveles implementado, falta validación de roles en frontend |

> **Nota:** Las stories del Sprint 2 están como **"Por hacer"** (To Do) — no se inician hasta que Sprint 1 cierre.

### 6.2 Impedimentos Identificados (2)

#### Impedimento 1 — Falta de claridad en niveles de autorización

| Campo | Valor |
|-------|-------|
| **Tipo** | Falta de claridad en requerimiento |
| **Afecta** | Story 2.2 (Control de acceso por autorización comunitaria) |
| **Descripción** | No están definidos los criterios exactos para clasificar contenido como "ceremonial/sensible" vs "restringido". La comunidad no ha sido consultada para establecer las reglas de negocio de cada nivel. |
| **Impacto** | Bloquea la implementación completa de validaciones de acceso por nivel |
| **Acción** | Agendar sesión con representantes comunitarios para definir los criterios de cada nivel de autorización. Temporalmente se implementan los 4 niveles como etiquetas sin reglas de negocio específicas. |

#### Impedimento 2 — Catálogo de lenguas indígenas no disponible

| Campo | Valor |
|-------|-------|
| **Tipo** | Dependencia técnica / datos |
| **Afecta** | Story 1.1 (Registro de docentes comunitarios) |
| **Descripción** | El formulario de registro de docentes requiere un campo "lengua dominante" obligatorio, pero no existe un catálogo estandarizado de lenguas indígenas de Costa Rica. Se necesita definir la lista válida (Bribri, Cabécar, Maleku, Boruca, Térraba, Guaymí/Ngäbe, etc.). |
| **Impacto** | Retrasa la validación del campo — se implementa temporalmente como campo de texto libre |
| **Acción** | Investigar catálogo del Ministerio de Educación Pública (MEP) y consultar documentación del proyecto [[02-Investigación/Contexto/Educación]]. Crear lista provisional validada con el equipo. |

---

## 7. Configuración de jira-sync en Obsidian

### 7.1 Settings del Plugin (ya configurado)

| Campo | Valor |
|-------|-------|
| Jira URL | `https://ucenfotec-team-y6xzvduw.atlassian.net` |
| API Version | `2` |
| Auth Method | Basic Auth (Username + PAT) |
| Issues Folder | `jira-issues` |
| Template Path | `99-Templates/_template-jira-issue` |

### 7.2 Template (ya creado)

Archivo: `99-Templates/_template-jira-issue.md`

El template incluye los campos del frontmatter que jira-sync rellena automáticamente al traer un issue:

```yaml
---
key: ""          # RV-123 (auto)
summary: ""      # Título del issue
status: ""       # To Do / In Progress / Done
priority: ""     # Highest / High / Medium / Low
issuetype: ""    # Epic / Story / Task
assignee: ""     # Nombre del asignado
sprint: ""       # Nombre del sprint
parent: ""       # Key del Epic padre
labels: []       # Etiquetas
duedate: ""      # Fecha límite
story_points: "" # Puntos de historia
link: ""         # URL al issue en Jira
created: ""      # Fecha creación
updated: ""      # Última actualización
---
```

### 7.3 Field Mappings Recomendados

En Settings → **Field mappings**, configurar:

| Field Name | Get from Jira (Read) | Send to Jira (Write) |
|------------|---------------------|---------------------|
| `assignee` | `issue.fields.assignee ? issue.fields.assignee.displayName : ""` | `null` |
| `sprint` | `issue.fields.sprint ? issue.fields.sprint.name : ""` | `null` |
| `parent` | `issue.fields.parent ? issue.fields.parent.key : ""` | `null` |
| `link` | `issue.self.split('/rest/')[0] + '/browse/' + issue.key` | `null` |
| `labels` | `issue.fields.labels` | `value` |
| `story_points` | `issue.fields.story_points \|\| issue.fields.customfield_10016 \|\| ""` | `null` |
| `created` | `issue.fields.created ? issue.fields.created.split('T')[0] : ""` | `null` |
| `updated` | `issue.fields.updated ? issue.fields.updated.split('T')[0] : ""` | `null` |

> **Nota sobre story_points:** En Jira Cloud, story points pueden estar en `customfield_10016` (el ID exacto puede variar). Verificar en tu instancia yendo a un issue → campo Story Points.

### 7.4 Qué se sincroniza (y qué NO)

| Se Sincroniza ✅ | NO se sincroniza ❌ |
|---|---|
| Epics, Stories, Tasks del proyecto RV | Archivos existentes del vault (T-XXX, RF-XXX) |
| Status, priority, assignee, sprint | Documentación (minutas, ADRs, riesgos) |
| Labels y story points | Investigación, arquitectura, entregables |
| Descripción del issue | Frontmatter YAML existente |

> **Principio clave:** El vault NO se modifica. Los issues de Jira se guardan en la carpeta `jira-issues/` como archivos separados. El vault existente sigue funcionando con Dataview exactamente igual.

---

## 8. Paso a Paso — Crear Todo en Jira

### Paso 1: Crear los 3 Epics

En Jira → Board → clic en **"+ Create"**:

1. **Epic 1:** Issue Type: `Epic` → Summary: `Educación Intercultural Bilingüe` → Labels: `educacion, mvp` → Description: (copiar de sección 2)
2. **Epic 2:** Issue Type: `Epic` → Summary: `Saberes Ancestrales y Patrimonio` → Labels: `saberes, mvp` → Description: (copiar de sección 2)
3. **Epic 3:** Issue Type: `Epic` → Summary: `Salud Comunitaria e Intercultural` → Labels: `salud, mvp` → Description: (copiar de sección 2)

> Anotar los keys generados (ej: RV-1, RV-2, RV-3).

### Paso 2: Crear las 6 Stories

Para cada story de la sección 3, crear con **"+ Create"**:

| # | Summary | Type | Epic Link | SP | Assignee | Labels |
|---|---------|------|-----------|-----|----------|--------|
| 1 | Registro de docentes comunitarios | Story | Epic EDU | 5 | Geovanny | `educacion, mvp, RF-EDU-01` |
| 2 | Carga de materiales educativos multimedia | Story | Epic EDU | 5 | Geovanny | `educacion, mvp, RF-EDU-03` |
| 3 | Registro de saberes ancestrales multimedia | Story | Epic SAB | 5 | Elkin | `saberes, mvp, RF-SAB-01` |
| 4 | Restricción de acceso por autorización comunitaria | Story | Epic SAB | 3 | Elkin | `saberes, mvp, RF-SAB-04` |
| 5 | Registro de pacientes con ID único | Story | Epic SAL | 3 | Santiago | `salud, mvp, RF-SAL-01` |
| 6 | Historial médico básico por paciente | Story | Epic SAL | 5 | Santiago | `salud, mvp, RF-SAL-02` |

> **En cada Story**, agregar en la descripción:
> 1. La user story completa ("Como [rol], quiero [acción] para [beneficio]")
> 2. Los criterios de aceptación (copiar de sección 3)

### Paso 3: Crear los 2 Sprints

En Jira → **Backlog** view:

1. Clic en **"Create sprint"** → Nombre: `Sprint 1 - Fundamentos del MVP` → Start: (fecha inicio) → End: (fecha + 2 semanas)
2. Clic en **"Create sprint"** → Nombre: `Sprint 2 - Registros Core` → Start: (fin Sprint 1) → End: (+ 2 semanas)

### Paso 4: Asignar Stories a Sprints

**Arrastrar** desde Backlog:

- **Sprint 1:** Story "Registro de docentes" (5 SP) + Story "Restricción de acceso" (3 SP) = **8 SP**
- **Sprint 2:** Story "Registro de pacientes" (3 SP) + Story "Carga de materiales" (5 SP) = **8 SP**
- **Backlog:** Story "Registro de saberes" (5 SP) + Story "Historial médico" (5 SP)

### Paso 5: Iniciar Sprint 1

1. En la vista Backlog, clic en **"Start sprint"** en Sprint 1
2. Confirmar fechas y meta del sprint

### Paso 6: Simular Ejecución del Sprint 1

Actualizar estados en el Board (drag-and-drop):

| Story | Acción | Estado Final |
|-------|--------|-------------|
| Registro de docentes comunitarios | Mover a "In Progress" → luego a "Done" | **Done** ✅ |
| Restricción de acceso por autorización | Mover a "In Progress" | **In Progress** 🔄 |

> Las stories del Sprint 2 permanecen como **"To Do"** (Por hacer).

### Paso 7: Registrar Impedimentos

En Jira, hay 2 formas de registrar impedimentos:

**Opción A — Como comentario en la Story afectada:**
1. Abrir Story "Restricción de acceso por autorización"
2. Agregar comentario: el texto del Impedimento 1 (sección 6.2)
3. Marcar la Story con flag (bandera roja) → indica bloqueo visible en el Board

**Opción B — Como Issue tipo Bug/Impediment:**
1. Crear issue → Type: `Bug` o `Task` → Summary: `[IMPEDIMENTO] Falta de claridad en niveles de autorización comunitaria`
2. Vincular a Story 2.2 con link "blocks"
3. Repetir para Impedimento 2 vinculado a Story 1.1

> **Recomendación:** Usar Opción A (comentario + flag) para impedimentos que no son bugs técnicos, y Opción B para dependencias bloqueantes.

### Paso 8: Sincronizar con Obsidian (jira-sync)

Una vez creado todo en Jira:

1. `Ctrl+P` → `Jira Issue Manager: Batch Fetch Issues by JQL`
2. JQL: `project = RV ORDER BY created ASC`
3. Los issues se crean como archivos en `jira-issues/` usando el template
4. Verificar que los archivos tienen el frontmatter correcto

---

## 9. Checklist de Verificación

### Requisitos de las instrucciones

- [ ] 6 requerimientos funcionales identificados (RF-EDU-01, RF-EDU-03, RF-SAB-01, RF-SAB-04, RF-SAL-01, RF-SAL-02)
- [ ] 4 requerimientos no funcionales identificados (RNF-01, RNF-02, RNF-04, RNF-07)
- [ ] 3 épicas creadas (EDU, SAB, SAL)
- [ ] Mínimo 2 historias por épica (2 EDU + 2 SAB + 2 SAL = 6 total) ✅
- [ ] Story points en escala Fibonacci (3, 5) ✅
- [ ] Mínimo 2 criterios de aceptación por historia ✅
- [ ] 2 sprints de 2 semanas cada uno ✅
- [ ] Sprint 1: máximo 8 puntos (5 + 3 = 8) ✅
- [ ] Sprint 2: máximo 8 puntos (3 + 5 = 8) ✅
- [ ] Stories en backlog para sprints futuros (2 stories, 10 SP) ✅
- [ ] Simulación Sprint 1: historia "En progreso" (Story 2.2) ✅
- [ ] Simulación Sprint 1: historia "Terminado" (Story 1.1) ✅
- [ ] Simulación Sprint 1: historias "Por hacer" (Sprint 2 stories) ✅
- [ ] 2 impedimentos registrados ✅

### Configuración técnica

- [ ] jira-sync instalado y conectado (Ping OK)
- [ ] Template configurado en `99-Templates/_template-jira-issue`
- [ ] Field mappings configurados
- [ ] Issues sincronizados con Batch Fetch
- [ ] Vault existente sin modificaciones
