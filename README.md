# 🌿 Raíces Vivas — Sistema Integral de Apoyo a Comunidades Indígenas

<p align="center">
  <img src="08-Recursos/Imágenes/ChatGPT%20Image%20Feb%2027,%202026,%2007_23_32%20PM.png" alt="Raíces Vivas — Hero" width="100%" />
</p>

<p align="center">
  <strong>Proyecto académico · Introducción a la Ingeniería de Software</strong><br/>
  <a href="https://ucenfotec.ac.cr/">Universidad CENFOTEC</a> — Escuela de Ingeniería de Software<br/>
  I Cuatrimestre 2026
</p>

---

## 📖 Descripción

**Raíces Vivas** es un proyecto de la materia de **Introducción a la Ingeniería de Software** de la [Universidad CENFOTEC](https://ucenfotec.ac.cr/) (San José, Costa Rica).

El objetivo es diseñar y documentar los requerimientos de un **sistema tecnológico integral** orientado a apoyar:

- 📚 **Procesos educativos bilingües e interculturales** en territorios indígenas
- 🏛️ **Preservación de saberes ancestrales** y conocimiento tradicional
- 🏥 **Gestión básica de salud comunitaria** (registros, citas, seguimiento)

Todo el trabajo se enmarca dentro de las comunidades indígenas de Costa Rica, aplicando un enfoque de **respeto cultural, consulta comunitaria y sensibilidad intercultural**.

> **Nota:** Este proyecto cubre las fases de análisis, educción de requerimientos, especificación (RF/RNF), validación con usuarios potenciales y diseño de arquitectura. **No incluye implementación de software** en esta etapa.

---

## 🧩 Módulos del Sistema

| Módulo | Código | Descripción |
|--------|--------|-------------|
| **Educativo** | `EDU` | Apoyo educativo bilingüe e intercultural. Gestión de contenidos curriculares adaptados, seguimiento estudiantil y herramientas para docentes en territorios indígenas. |
| **Saberes Ancestrales** | `SAB` | Documentación, preservación y transmisión de conocimiento tradicional. Registro de prácticas, medicina tradicional, historias orales y artesanías. |
| **Salud Comunitaria** | `SAL` | Gestión básica de registros de salud, citas médicas, seguimiento de pacientes y coordinación con servicios itinerantes en comunidades remotas. |

---

## 👥 Equipo

| Integrante | Rol | Módulo Lead |
|-----------|-----|-------------|
| **Geovanny** | Project Lead / Arquitecto | EDU + Transversal |
| **Elkin** | Líder de Investigación / Analista | SAB |
| **Santiago** | Líder de QA / Analista | SAL |

---

## 🗂️ Estructura del Proyecto

```
RAICES_VIVAS/
│
├── 00-Dashboard/              ← Panel principal, métricas y roadmap
│   ├── Home.md                    Dashboard central con métricas del proyecto
│   ├── Métricas.md                KPIs, velocidad, calidad, costos
│   └── Roadmap.md                 Gantt y calendario de entregables
│
├── 01-Proyecto/               ← Gestión del proyecto
│   ├── Charter.md                 Acta de constitución del proyecto
│   ├── Alcance.md                 Scope statement (incluido / excluido)
│   ├── Equipo.md                  Integrantes, roles y responsabilidades
│   ├── Stakeholders.md            Mapa de interesados
│   ├── Plan de Gestión.md         Plan maestro de gestión del proyecto
│   ├── Finanzas.md                Presupuesto, tarifas, costos por sprint
│   ├── Guía de Workflow.md        Convenciones, frontmatter, automatizaciones
│   ├── Onboarding.md              Guía paso a paso para nuevos integrantes
│   ├── Glosario.md                Terminología del proyecto
│   ├── Propuesta de Gestión.md    Propuesta inicial del plan de proyecto
│   ├── Decisiones/                Registros de decisiones (ADR)
│   └── Riesgos/                   Registro y seguimiento de riesgos
│
├── 02-Investigación/          ← Investigación y contexto
│   ├── Contexto/                  Documentos de contexto sociocultural
│   │   ├── Educación.md               Contexto educativo en territorios
│   │   ├── Saberes Ancestrales.md     Conocimiento tradicional
│   │   ├── Salud Comunitaria.md       Situación de salud comunitaria
│   │   └── Mapa de Territorios Indígenas.md
│   ├── Encuestas/                 Instrumentos y resultados de encuestas
│   ├── Entrevistas/               Entrevistas con actores clave
│   ├── Fuentes/                   Referencias bibliográficas
│   └── Observaciones/             Notas de campo
│
├── 03-Requerimientos/         ← Especificación de requerimientos
│   ├── _RTM.md                    Matriz de Trazabilidad (RTM)
│   ├── Funcionales/
│   │   ├── EDU/                       RF-EDU-01 a RF-EDU-06
│   │   ├── SAB/                       RF-SAB-01 a RF-SAB-05
│   │   └── SAL/                       RF-SAL-01 a RF-SAL-05
│   └── No Funcionales/
│       └── RNF-01 a RNF-07           Rendimiento, seguridad, usabilidad...
│
├── 04-Arquitectura/           ← Diseño y arquitectura
│   ├── Visión General.md          Arquitectura de alto nivel
│   ├── Modelo de Datos.md         Modelo ER conceptual
│   ├── Stack Tecnológico.md       Tecnologías propuestas
│   ├── WBS.md                     Work Breakdown Structure
│   ├── Diagramas/                 Diagramas técnicos
│   └── Prototipos/                Wireframes y prototipos UI
│
├── 05-Sprints/                ← Ejecución ágil
│   ├── Backlog.md                 Backlog del producto (tablero Kanban)
│   ├── Sprint-01/                 Sprint 1: Planning + 20 tareas
│   ├── Sprint-02/                 Sprint 2: Planning + tareas
│   ├── Sprint-03/                 (planificado)
│   ├── Sprint-04/                 (planificado)
│   └── Sprint-05/                 (planificado)
│
├── 06-Entregables/            ← Documentos de entrega
│   ├── Avance-1/                  Primer avance del proyecto
│   ├── Avance-2/                  Segundo avance
│   └── Presentaciones/            Slides y material de presentación
│
├── 07-Reuniones/              ← Minutas de reunión
│   └── MIN-001.md                 Minuta de ejemplo
│
├── 08-Recursos/               ← Recursos del proyecto
│   ├── Datos/                     Datasets y datos de referencia
│   ├── Imágenes/                  Covers, diagramas, capturas
│   ├── PDFs/                      Documentos de referencia
│   └── scripts/                   Scripts de automatización
│       ├── generate_covers.py         Generador de banners del vault
│       └── fix_frontmatter.py         Normalizador de frontmatter YAML
│
├── 09-QA/                     ← Control de calidad
│   └── README.md                  Lineamientos de QA
│
├── 99-Templates/              ← Plantillas reutilizables
│   ├── _template-tarea.md
│   ├── _template-minuta.md
│   ├── _template-requerimiento-funcional.md
│   ├── _template-requerimiento-nofuncional.md
│   ├── _template-riesgo.md
│   ├── _template-adr.md
│   ├── _template-sprint-planning.md
│   ├── _template-sprint-review.md
│   ├── _template-entrevista.md
│   ├── _template-daily-note.md
│   ├── _template-weekly-note.md
│   └── ... (variantes from-minuta)
│
└── Daily Notes/               ← Notas semanales de seguimiento
    ├── 2026-W09.md
    └── 2026-W10.md
```

---

## 📊 Metodología

El proyecto se gestiona con un enfoque **ágil adaptado** para contexto académico:

- **5 sprints** de duración variable
- **Backlog** priorizado con MoSCoW
- **Daily/Weekly notes** para seguimiento
- **Minutas** de cada reunión de equipo
- **Decisiones** documentadas como ADR (Architecture Decision Records)
- **Riesgos** gestionados con probabilidad, impacto y estrategias de mitigación
- **RTM** (Requirements Traceability Matrix) para trazabilidad completa

---

## 🛠️ Stack de Gestión

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://obsidian.md/">
        <img src="https://obsidian.md/images/obsidian-logo-gradient.svg" width="60" alt="Obsidian"/><br/>
        <strong>Obsidian</strong>
      </a>
      <br/>
      <sub>Knowledge base, dashboard, templates, automatizaciones (Dataview, Templater, QuickAdd, Kanban)</sub>
    </td>
    <td align="center" width="150">
      <a href="https://git-scm.com/">
        <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg" width="60" alt="Git"/><br/>
        <strong>Git</strong>
      </a>
      <br/>
      <sub>Control de versiones, historial de cambios, colaboración distribuida</sub>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/">
        <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width="60" alt="GitHub"/><br/>
        <strong>GitHub</strong>
      </a>
      <br/>
      <sub>Repositorio remoto, sincronización del equipo, backup en la nube</sub>
    </td>
  </tr>
</table>

---

## 🏫 Contexto Académico

- **Universidad:** [CENFOTEC](https://ucenfotec.ac.cr/) — San José, Costa Rica
- **Escuela:** Ingeniería de Software
- **Materia:** Introducción a la Ingeniería de Software
- **Período:** I Cuatrimestre 2026
- **Profesor/a:** *(ver detalles en el vault)*

---

## 📜 Licencia

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Este proyecto se distribuye bajo [**CC BY-NC-SA 4.0**](LICENSE) — ver el archivo [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  <em>Raíces Vivas · CENFOTEC · 2026</em>
</p>
