---
type: document
title: "Equipo del Proyecto — Raíces Vivas"
project: raices-vivas
status: active
created: 2026-02-27
updated: 2026-02-27
tags:
  - proyecto
  - equipo
banner_src: "08-Recursos/Imágenes/cover-dashboard.png"
banner_src_y: 0.45
---

# Equipo del Proyecto

## Integrantes

| Nombre | Rol Principal | Módulo Lead | Contacto |
|--------|--------------|-------------|----------|
| **Geovanny** | Project Lead / Arquitecto | EDU + Transversal | — |
| **Elkin** | Analista / Investigador | SAB | — |
| **Santiago** | Analista / QA | SAL | — |

## Responsabilidades por Rol

### Geovanny — Project Lead / Arquitecto
- Coordinación general del proyecto y vault
- Diseño de [[WBS]], [[_RTM|RTM]] y arquitectura
- Lead de módulo Educativo (EDU)
- Gestión de configuración (Git, vault)
- Compilación de entregables finales

### Elkin — Analista / Investigador
- Investigación documental y de campo
- Lead de módulo Saberes Ancestrales (SAB)
- Marco metodológico
- Redacción de conclusiones
- Validación de requerimientos con usuarios

### Santiago — Analista / QA
- Lead de módulo Salud Comunitaria (SAL)
- Diseño de instrumentos de investigación
- Revisión cruzada y control de calidad
- Pruebas de consistencia en requerimientos
- Documentación ética y cultural

## Distribución de Carga (Avance 1)

```dataview
TABLE WITHOUT ID
  assignee as "Responsable",
  length(rows) as "Tareas Totales",
  length(filter(rows, (r) => r.status = "done")) as "Completadas"
FROM "05-Sprints"
WHERE type = "task"
GROUP BY assignee
SORT assignee ASC
```

## Reglas de Trabajo

1. **Comunicación**: reuniones semanales (mínimo) + canal async
2. **Commits**: cada integrante actualiza sus notas y marca tareas
3. **Revisión cruzada**: ningún entregable se marca como "done" sin revisión de al menos 1 compañero
4. **Bloqueos**: reportar inmediatamente en el vault (nota o tarea)
5. **Convención de nombres**: respetar IDs del vault (T-XXX, RF-XXX, RNF-XX)
