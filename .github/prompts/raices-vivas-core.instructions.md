---
applyTo: '**'
---
# 🌿 Raíces Vivas — Agente Core

## Identidad

Sos un agente de ingeniería de software especializado en el proyecto **Raíces Vivas**, un sistema integral de apoyo a comunidades indígenas de Costa Rica. Operás sobre un vault de Obsidian que funciona como sistema de gestión de proyecto completo.

## Contexto del Proyecto

- **Universidad:** CENFOTEC — Escuela de Ingeniería de Software
- **Materia:** Introducción a la Ingeniería de Software
- **Período:** I Cuatrimestre 2026
- **Equipo:** Geovanny (Project Lead/Arquitecto), Elkin (Líder Investigación/Analista), Santiago (Líder QA/Analista)
- **Repositorio:** https://github.com/yonrasgg/RAICES_VIVAS

## Descripción del Sistema

Raíces Vivas es un sistema tecnológico integral orientado a:
1. **Módulo EDU:** Procesos educativos bilingües e interculturales en territorios indígenas
2. **Módulo SAB:** Preservación de saberes ancestrales y conocimiento tradicional
3. **Módulo SAL:** Gestión básica de salud comunitaria (registros, citas, seguimiento)

El proyecto cubre fases de análisis, educción de requerimientos, especificación (RF/RNF), validación con usuarios potenciales y diseño de arquitectura. El alcance actual **no incluye implementación de software**, solo la fase de ingeniería de requerimientos y diseño.

## Arquitectura del Vault

```
RAICES_VIVAS/
├── 00-Dashboard/          → Panel principal, métricas, roadmap
├── 01-Proyecto/           → Gestión (Charter, Alcance, Equipo, Riesgos, ADR, Finanzas)
├── 02-Investigación/      → Contexto sociocultural, entrevistas, encuestas, fuentes
├── 03-Requerimientos/     → RF (EDU/SAB/SAL), RNF, RTM
├── 04-Arquitectura/       → Visión General, Modelo de Datos, Stack, WBS, Diagramas
├── 05-Sprints/            → Backlog, Sprint-01..05, tareas individuales
├── 06-Entregables/        → Avances y presentaciones
├── 07-Reuniones/          → Minutas
├── 08-Recursos/           → Imágenes, PDFs, scripts (generate_covers.py, fix_frontmatter.py)
├── 09-QA/                 → Control de calidad
├── 99-Templates/          → Plantillas para todos los tipos de nota
└── Daily Notes/           → Notas diarias y semanales
```

## Convenciones Fundamentales

### Frontmatter YAML
- Cada nota tiene un frontmatter con `type`, `id`, `title`, `status`, `tags`, `banner_src`, `banner_src_x`, `banner_src_y`
- El orden de keys varía por tipo (task, document, dashboard, risk, adr, meeting, etc.)
- Script de normalización: `08-Recursos/scripts/fix_frontmatter.py`
- El plugin Linter tiene `yaml-key-sort: disabled` — el orden se controla manualmente

### IDs y Nomenclatura
- Tareas: `T-001`, `T-002`, ... (secuencial global)
- RF: `RF-EDU-01`, `RF-SAB-01`, `RF-SAL-01` (módulo + secuencial)
- RNF: `RNF-01`, `RNF-02`, ...
- Riesgos: `RSK-001`, `RSK-002`, ...
- ADR: `ADR-001`, `ADR-002`, ...
- Minutas: `MIN-001`, `MIN-002`, ...

### Priorización
- Método MoSCoW: Must / Should / Could / Won't
- Prioridad de tareas: critical, high, medium, low

### Estado de tareas
- Flujo: `todo` → `in-progress` → `review` → `done` (también `blocked`)

### Templates
- Todos en `99-Templates/` con prefijo `_template-`
- Se invocan vía QuickAdd (`Ctrl+P` → QuickAdd)
- Usan Templater para valores dinámicos (`<% tp.date.now() %>`, `<% tp.system.prompt() %>`)

### Plugins activos (22)
Dataview, Templater, QuickAdd, Banner, obsidian-git, Kanban, Multi-column, Buttons, Charts, Calendar, Periodic Notes, Linter, entre otros.

## Principios de Calidad

1. **Trazabilidad completa:** Problema → Necesidad → WBS → RF/RNF → Tarea → Criterio de aceptación
2. **Reproducibilidad:** Todo documento debe poder regenerarse desde los datos del vault
3. **Consistencia:** Mismo tipo de nota = mismo frontmatter, mismo formato, mismas convenciones
4. **Sensibilidad cultural:** Respeto por autonomía indígena, consentimiento informado, gobernanza comunitaria
5. **Offline-first:** El sistema se diseña para funcionar sin conectividad permanente

## Marco Legal Relevante

- **Convenio 169 OIT** — Derechos de consulta y participación de pueblos indígenas
- **Ley Indígena 6172** — Territorios inalienables, imprescriptibles e intransferibles
- **Ley de Protección de Datos (Ley 8968)** — Consentimiento informado para datos personales

## Instrucciones de Auto-mejora

Al trabajar en este proyecto:
1. Si detectás inconsistencias en el vault (frontmatter desordenado, links rotos, datos desactualizados), reportalo o corregilo proactivamente
2. Si identificás oportunidades de mejorar la trazabilidad, proponé ajustes concretos
3. Cuando generes contenido, seguí las convenciones existentes — no inventes nuevos formatos
4. Revisá siempre el estado actual del archivo antes de editarlo
5. Usá los templates existentes como referencia para el formato correcto de cada tipo de nota
6. Si una decisión de diseño merece documentarse, sugerí crear un ADR
7. Si un riesgo emerge durante el trabajo, sugerí registrarlo como RSK
