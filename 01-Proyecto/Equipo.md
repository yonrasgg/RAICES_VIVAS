---
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
---
---
type: document
title: "Equipo del Proyecto — Raíces Vivas"
project: raices-vivas
status: active
created: 2026-02-27
updated: 2026-03-05
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
banner_src_x: 0.47714
banner_src_y: 0.45
tags:
  - proyecto
  - equipo
---

# Equipo del Proyecto

## Integrantes

| Nombre | Rol Principal | Módulo Lead | Jira Usuario | Contacto |
|--------|--------------|-------------|--------------|----------|
| **Geovanny** | Project Lead / Arquitecto | EDU + Transversal | galpizars@ucenfotec.ac.cr | — |
| **Elkin** | Líder de Investigación / Analista | SAB | ecerdag@ucenfotec.ac.cr | — |
| **Santiago** | Líder de QA / Analista | SAL | smartinezr@ucenfotec.ac.cr | — |

> 📌 En Obsidian, usar el **nombre exacto** (Geovanny, Elkin, Santiago, Equipo) en el campo `assignee` del frontmatter. El plugin jira-sync mapea automáticamente cada nombre a su `accountId` de Jira.

## Responsabilidades por Rol

### Geovanny — Project Lead / Arquitecto
- Coordinación general del proyecto y vault
- Diseño de [[WBS]], [[_RTM|RTM]] y arquitectura
- Lead de módulo Educativo (EDU)
- Gestión de configuración (Git, vault)
- Compilación de entregables finales

### Elkin — Líder de Investigación / Analista
- **Liderazgo del módulo Saberes Ancestrales (SAB)**
- Investigación documental y de campo
- Marco metodológico
- Redacción de conclusiones
- Validación de requerimientos con usuarios
- Toma de decisiones técnicas en el ámbito SAB

### Santiago — Líder de QA / Analista
- **Liderazgo del módulo Salud Comunitaria (SAL)**
- Diseño de instrumentos de investigación
- Revisión cruzada y control de calidad
- Pruebas de consistencia en requerimientos
- Documentación ética y cultural
- Toma de decisiones técnicas en el ámbito SAL

## Distribución de Carga (Avance 1)

```dataview
TABLE WITHOUT ID
  assignee as "Responsable",
  length(rows) as "Tareas Totales",
  length(filter(rows, (r) => r.status = "done")) as "Completadas"
FROM "05-Sprints"
WHERE type = "task" OR type = "subtask"
GROUP BY assignee
SORT assignee ASC
```

## Reglas de Trabajo

1. **Comunicación**: reuniones semanales (mínimo) + canal async
2. **Commits**: cada integrante actualiza sus notas y marca tareas
3. **Revisión cruzada**: ningún entregable se marca como "done" sin revisión de al menos 1 compañero
4. **Bloqueos**: reportar inmediatamente en el vault (nota o tarea)
5. **Convención de nombres**: respetar IDs del vault (T-XXX, RF-XXX, RNF-XX)
