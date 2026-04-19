---
type: document
title: "Raíces Vivas — Entrega Final: Implementación y Gestión"
project: raices-vivas
avance: 3
sprint: Sprint-03
status: in-progress
tags:
  - entregable
  - avance-3
  - implementación
  - gestión
created: 2026-04-19
updated: 2026-04-19
banner_src: "08-Recursos/Imágenes/cover-entregables.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# Raíces Vivas — Entrega Final: Implementación y Gestión

> **Curso:** Introducción a la Ingeniería de Software — CENFOTEC (SOFT-09, SCV7)
> **Docente:** Johnny Marin
> **Equipo:** Geovanny Alpízar (PM/Arquitecto), Elkin (Investigación/SAB), Santiago (QA/SAL)
> **Fecha de entrega:** 23 de abril de 2026
> **Sprint:** Sprint-03 (2026-04-03 → 2026-04-23)

---

## Tabla de Contenido

1. [Capítulo 1 — Análisis del Problema](#capítulo-1--análisis-del-problema)
2. [Capítulo 2 — Diseño de la Solución](#capítulo-2--diseño-de-la-solución)
3. [Capítulo 3 — Gestión de Proyecto](#capítulo-3--gestión-de-proyecto)
4. [Capítulo 4 — Conclusiones y Recomendaciones](#capítulo-4--conclusiones-y-recomendaciones)
5. [Lista de Referencias](#lista-de-referencias)
6. [Anexos](#anexos)

---

## Capítulo 1 — Análisis del Problema

### 1.1 Contexto y Justificación

El proyecto **Raíces Vivas** surge de la necesidad de atender tres ejes interrelacionados en comunidades indígenas de Costa Rica: educación intercultural bilingüe (EDU), preservación de saberes ancestrales (SAB) y salud comunitaria (SAL). La problemática fue documentada en el [[06-Entregables/Avance-1/Raíces Vivas – Sistema Integral de Apoyo a Comunidades Indígenas|Avance 1]], donde se identificaron brechas en acceso a educación pertinente, riesgos de pérdida de patrimonio biocultural y barreras geográficas para servicios de salud.

Las fuentes de investigación primaria incluyen:

- **4 entrevistas** a actores clave: [[ENT-001]] (líder educativo Maleku), [[ENT-002]] y [[ENT-004]] (portadores de saber Bribri y Boruca), [[ENT-003]] (auxiliar de salud Cabécar)
- **3 encuestas** con 105 respuestas combinadas: [[ENC-EDU-01]], [[ENC-SAB-01]], [[ENC-SAL-01]]
- **3 observaciones de campo**: [[OBS-001]] (Guatuso), [[OBS-002]] (Talamanca), [[OBS-003]] (Boruca)

El [[02-Investigación/Análisis de Entrevistas|Análisis de Entrevistas]] consolidó los hallazgos cualitativos y derivó requerimientos adicionales incorporados en Sprint-02.

### 1.2 Actores del Sistema

Se identificaron **10 actores humanos** y **4 sistemas externos**, clasificados en primarios y secundarios según su interacción con el sistema. Los actores primarios son:

| Actor | Módulo | Función principal |
|-------|--------|-------------------|
| Docente comunitario | EDU | Registra estudiantes, sube material bilingüe, consulta progreso |
| Guía cultural / Portador de saber | SAB | Documenta saberes en formato multimedia, gestiona acceso |
| Auxiliar de salud (ATAP) | SAL | Registra pacientes, historiales, programa citas y brigadas |
| Administrador del sistema | TRANS | Gestiona usuarios, roles, sync y auditoría |
| Administrador comunitario | SAB, TRANS | Gestiona niveles de acceso según gobernanza cultural (CARE) |

La documentación completa de actores y 23 casos de uso se presentó en el [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2]].

### 1.3 Requerimientos

El sistema cuenta con **16 requerimientos funcionales** y **7 no funcionales**, priorizados con MoSCoW y trazados en la [[03-Requerimientos/_RTM|Matriz de Trazabilidad (RTM)]].

```sqlseal
SELECT name AS "ID", title AS "Requerimiento", priority AS "Prioridad", status AS "Estado"
FROM files
WHERE type = 'requirement' AND path LIKE '03-Requerimientos/Funcionales%'
ORDER BY name ASC
```

Los requerimientos no funcionales cubren: rendimiento, seguridad, disponibilidad, usabilidad, accesibilidad, escalabilidad y mantenibilidad.

```sqlseal
SELECT name AS "ID", title AS "Requerimiento", priority AS "Prioridad", status AS "Estado"
FROM files
WHERE type = 'requirement' AND path LIKE '03-Requerimientos/No Funcionales%'
ORDER BY name ASC
```

---

## Capítulo 2 — Diseño de la Solución

### 2.1 Arquitectura del Sistema

La arquitectura sigue el enfoque **offline-first con sync** definido en [[04-Arquitectura/Visión General|Visión General de Arquitectura]] y validado por las decisiones arquitectónicas:

- [[01-Proyecto/Decisiones/ADR-001|ADR-001]]: Obsidian como plataforma de gestión de proyecto
- [[01-Proyecto/Decisiones/ADR-002|ADR-002]]: React + TypeScript como stack de frontend
- [[01-Proyecto/Decisiones/ADR-003|ADR-003]]: PouchDB/CouchDB para persistencia offline-first
- [[01-Proyecto/Decisiones/ADR-004|ADR-004]]: TailwindCSS para sistema de diseño

El [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]] comprende:

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Frontend | React 19 + TypeScript | Tipado fuerte, ecosistema maduro, componentes reutilizables |
| Build | Vite 8 | HMR rápido, ESM nativo, tree-shaking optimizado |
| Estilos | TailwindCSS 4 | Utility-first, responsive, tema customizable |
| Persistencia | PouchDB 9 | Offline-first, sync bidireccional con CouchDB |
| i18n | i18next 26 | Soporte bribri + español, namespaces por módulo |
| Routing | react-router-dom 7 | Navegación SPA, rutas protegidas por rol |
| PWA | workbox-build 7 | Service worker, cache strategies, instalable |

### 2.2 Modelo de Datos

El modelo entidad-relación contempla **38 entidades** distribuidas en 5 diagramas parciales. Las entidades principales por módulo:

- **EDU**: Estudiante, Material, Ejercicio, ProgresoAcademico, CursoComunitario
- **SAB**: Saber, Categoria, MediaAsset, PermisoAcceso, ConsentimientosCARE
- **SAL**: Paciente, HistorialMedico, Cita, BrigadaSalud, Medicamento
- **TRANS**: Usuario, Rol, ConfigSync, TraduccionRecurso, LogAuditoria

Referencia completa: [[04-Arquitectura/Modelo de Datos|Modelo de Datos]]

### 2.3 Diagramas

Los diagramas del sistema incluyen:

- **Diagrama de contexto** (C4 nivel 1): sistema y actores externos
- **Diagrama de contenedores** (C4 nivel 2): frontend PWA, PouchDB local, CouchDB remoto
- **Diagrama de flujo**: [[04-Arquitectura/Diagrama de flujo|flujo de sincronización y resolución de conflictos]]
- **Diagramas de casos de uso** (UML): 23 CU documentados en Avance 2
- **Diagramas ER**: 5 diagramas parciales por módulo + integración

Referencia: [[04-Arquitectura/Diagramas/|Carpeta de Diagramas]]

### 2.4 Prototipos

Los wireframes cubren 3 módulos funcionales y están documentados en [[04-Arquitectura/Prototipos/|Prototipos]].

---

## Capítulo 3 — Gestión de Proyecto

### 3.1 Metodología

El proyecto emplea **Scrum adaptado** con sprints de 3–4 semanas, gestionado íntegramente en un vault de Obsidian con trazabilidad automatizada vía SQLSeal. Las decisiones metodológicas se documentan como ADRs (Architecture Decision Records).

```sqlseal
SELECT name AS "ID", title AS "Decisión", status AS "Estado", "date" AS "Fecha"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY name ASC
```

### 3.2 Cronograma de Sprints

| Sprint | Período | Entregable | Estado |
|--------|---------|-----------|--------|
| Sprint-01 | 2026-02-14 → 2026-02-28 | Avance 1 — Análisis del Problema | Cerrado |
| Sprint-02 | 2026-02-28 → 2026-04-01 | Avance 2 — Casos de Uso y Diseño | Cerrado |
| Sprint-03 | 2026-04-03 → 2026-04-23 | Avance 3 — Implementación y Entrega Final | Activo |

### 3.3 Equipo y Roles

| Miembro | Rol | Responsabilidades principales |
|---------|-----|-------------------------------|
| Geovanny Alpízar | PM / Arquitecto | Planificación, arquitectura, integración, documentación |
| Elkin | Investigación / SAB | Investigación cualitativa, módulo SAB, traducciones bribri |
| Santiago | QA / SAL | Pruebas, módulo SAL, presentaciones |

### 3.4 Gestión de Riesgos

Se mantiene un registro activo de riesgos con revisiones periódicas. Estado actual:

```sqlseal
SELECT name AS "ID", title AS "Riesgo", severity AS "Severidad", status AS "Estado", strategy AS "Estrategia"
FROM files
WHERE type = 'risk' AND path LIKE '01-Proyecto/Riesgos%'
ORDER BY name ASC
```

### 3.5 Resumen de Tareas por Sprint

#### Sprint-01 (20 tareas)

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-01%'
ORDER BY name ASC
```

#### Sprint-02 (22 tareas)

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-02%'
ORDER BY name ASC
```

#### Sprint-03 (16 tareas)

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-03%'
ORDER BY name ASC
```

### 3.6 Métricas de Progreso

```sqlseal
SELECT
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-01%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-01%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-01",
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-02%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-02%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-02",
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-03%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-03%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-03",
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END) || ' (' || ROUND(100.0 * SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) / MAX(1, SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END))) || '%)' as "Total"
FROM files
```

### 3.7 Reuniones

```sqlseal
SELECT name AS "ID", title AS "Reunión", "date" AS "Fecha", sprint AS "Sprint"
FROM files
WHERE type = 'meeting' AND path LIKE '07-Reuniones%'
ORDER BY "date" ASC
```

### 3.8 Lecciones Aprendidas

| Sprint | Lección | Acción |
|--------|---------|--------|
| Sprint-01 | La definición temprana de templates y convenciones acelera la producción de artefactos | Se crearon 16 templates reutilizables en `99-Templates/` |
| Sprint-01 | Obsidian + SQLSeal permite trazabilidad automatizada sin herramientas externas | Se adoptó como estándar para todo el proyecto (ADR-001) |
| Sprint-02 | Exportar 65 páginas con 13 diagramas requiere pipeline de build reproducible | Se implementó script mmdc + Pandoc para PDF consistentes |
| Sprint-02 | Las entrevistas cualitativas generan requerimientos que no aparecen en encuestas | Se agregaron 4 CU adicionales (CU-EDU-07, CU-SAB-06, CU-SAB-07, CU-SAL-06) |
| Sprint-03 | La sincronización PouchDB ↔ CouchDB necesita manejo explícito de conflictos | Se implementó resolución por timestamp con indicador visual |
| Sprint-03 | Las traducciones bribri requieren validación con fuentes del MEP | Elkin documentó las fuentes en notas de investigación |

---

## Capítulo 4 — Conclusiones y Recomendaciones

### 4.1 Cumplimiento de Objetivos

| Objetivo específico | Estado | Evidencia |
|---------------------|--------|-----------|
| Analizar contexto sociocultural y tecnológico | Completado | Avance 1: 4 entrevistas, 3 encuestas, 3 observaciones |
| Especificar requerimientos funcionales y no funcionales | Completado | 16 RF + 7 RNF en RTM con trazabilidad |
| Diseñar arquitectura offline-first con sync | Completado | ADR-002/003/004, diagramas C4, modelo ER (38 entidades) |
| Documentar casos de uso con trazabilidad | Completado | 23 CU (12 expandidos), diagrama UML, referencia cruzada RF↔CU |
| Implementar MVP funcional con módulos EDU, SAB, SAL | En progreso | React + PouchDB + i18next, CRUD operativo en 3 módulos |
| Validar con pruebas manuales y E2E | En progreso | T-051/T-052 completadas, QA final pendiente (T-057) |

### 4.2 Conclusiones

1. **El enfoque offline-first es viable para comunidades con conectividad limitada.** La combinación PouchDB + CouchDB permite operación completa sin conexión y sincronización automática cuando hay red disponible. La resolución de conflictos por timestamp resultó suficiente para el volumen de datos esperado.

2. **La investigación cualitativa es indispensable para sistemas con contexto sociocultural complejo.** Las entrevistas y observaciones de campo revelaron necesidades que las encuestas por sí solas no capturan, como la gobernanza cultural sobre datos sensibles (principios CARE) y la necesidad de multilingüismo real (no solo traducción de interfaz).

3. **La gestión de proyecto con trazabilidad automatizada reduce errores y mejora la auditabilidad.** El uso de Obsidian + SQLSeal permitió mantener un vault con 58+ tareas, 17 ADRs, 14+ riesgos y 6 reuniones con consultas dinámicas que se actualizan en tiempo real.

4. **El diseño modular (EDU/SAB/SAL/TRANS) permite priorizar entregables sin perder visión sistémica.** Cada módulo puede implementarse de forma independiente manteniendo la coherencia del modelo de datos y la arquitectura compartida.

### 4.3 Recomendaciones para Trabajo Futuro

- Implementar el módulo TRANS completo (auditoría, roles RBAC, dashboard administrativo)
- Realizar pruebas de usabilidad con usuarios finales en territorio indígena
- Configurar pipeline CI/CD para despliegue automatizado
- Evaluar métricas de rendimiento del sync en condiciones de red real (latencia alta, desconexiones frecuentes)
- Validar las traducciones bribri con hablantes nativos y el Departamento de Educación Intercultural del MEP

---

## Lista de Referencias

> Formato APA 7ª edición. Ordenadas alfabéticamente.

1. Consejo Nacional para Investigaciones Científicas y Tecnológicas (CONARE). (2024). *Diagnóstico de educación en territorios indígenas de Costa Rica*. Repositorio CONARE.

2. Consejo Nacional para la Gestión de la Biodiversidad y del Conocimiento (CONAGEBIO). (2023). *Estrategia Nacional de Biodiversidad 2016-2025: Pueblos indígenas y comunidades locales*. CONAGEBIO.

3. International Telecommunication Union (ITU). (2023). *Measuring digital development: Facts and figures 2023*. ITU Publications.

4. Ministerio de Educación Pública (MEP). (2013). *Decreto Ejecutivo N.° 37801-MEP: Reforma del Subsistema de Educación Indígena*. Procuraduría General de la República.

5. Ministerio de Salud de Costa Rica. (2024). *Intervenciones en territorios indígenas: Acceso a servicios de salud en zonas de difícil acceso*. Ministerio de Salud.

6. Organización Panamericana de la Salud (OPS). (2023). *Salud en las Américas: Barreras geográficas en territorios indígenas*. OPS/OMS.

7. PouchDB Contributors. (2024). *PouchDB documentation: Replication and conflict resolution*. https://pouchdb.com/guides/

8. React Documentation. (2024). *React 19 release notes*. https://react.dev/blog/2024/12/05/react-19

9. UNESCO. (2023). *Patrimonio cultural inmaterial y conocimientos tradicionales de los pueblos indígenas*. UNESCO Publishing.

10. UNICEF. (2023). *Niñez y adolescencia indígena en Costa Rica: Situación de derechos*. UNICEF Costa Rica.

---

## Anexos

### Anexo A — Estructura del Vault

El proyecto se gestiona en un vault de Obsidian con la siguiente estructura:

| Directorio | Contenido |
|------------|-----------|
| `00-Dashboard/` | Home, Métricas, Roadmap |
| `01-Proyecto/` | Charter, Alcance, Finanzas, Riesgos, Decisiones (ADR) |
| `02-Investigación/` | Entrevistas, Encuestas, Observaciones, Fuentes |
| `03-Requerimientos/` | RF, RNF, RTM |
| `04-Arquitectura/` | Diagramas, Prototipos, Modelo de Datos, Stack |
| `05-Sprints/` | Backlog, Epics, Stories, Tareas por sprint |
| `06-Entregables/` | Avances 1, 2, 3 y Entrega Final |
| `07-Reuniones/` | Minutas MIN-001 a MIN-006 |
| `08-Recursos/` | Imágenes, PDFs, Scripts, Datos |
| `09-QA/` | Pruebas y validación |

### Anexo B — Contribuciones del Equipo

| Miembro | Sprint-01 | Sprint-02 | Sprint-03 |
|---------|-----------|-----------|-----------|
| **Geovanny** | Setup vault, templates, requerimientos, arquitectura, Charter, RTM | Diagramas ER, C4, prototipos, stack, export PDF, 10+ tareas | Sync PouchDB, CRUD EDU, documentación, gestión Jira |
| **Elkin** | Investigación SAB, entrevistas, encuestas, contexto cultural | CU expandidos SAB, traducciones preliminares | Traducciones es + bri, CU SAB multimedia, export PDF |
| **Santiago** | Investigación SAL, observaciones, encuesta salud | CU expandidos SAL, wireframes SAL, revisión cruzada | CRUD SAL, pruebas manuales/E2E, presentación final |

### Anexo C — Decisiones Arquitectónicas (ADR)

```sqlseal
SELECT name AS "ID", title AS "Decisión", status AS "Estado", "date" AS "Fecha"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY name ASC
```
