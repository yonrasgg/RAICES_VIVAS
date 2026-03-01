---
banner_src: "08-Recursos/Imágenes/cover-sprints.png"
banner_src_y: 0.42
type: sprint-planning
sprint: <% tp.system.prompt("Número de sprint (ej: 01)") %>
start: <% tp.date.now("YYYY-MM-DD") %>
end: <% tp.system.prompt("Fecha fin del sprint (YYYY-MM-DD)") %>
goal: "<% tp.system.prompt("Objetivo del sprint") %>"
status: active
tags:
  - sprint
  - planificación
---

# Sprint <% tp.frontmatter.sprint %> — Planning

**Período:** <% tp.frontmatter.start %> → <% tp.frontmatter.end %>  
**Objetivo:** <% tp.frontmatter.goal %>

---

## Compromisos del Sprint

### Must (Críticos)

- [ ] 

### Should (Importantes)

- [ ] 

### Could (Si hay tiempo)

- [ ] 

## Capacidad del Equipo

| Miembro | Disponibilidad (hrs) | Foco |
|---------|---------------------|------|
| Geovanny | | |
| Integrante 2 | | |
| Integrante 3 | | |

## Riesgos del Sprint

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| | | |

## Definition of Done

- [ ] Requerimiento documentado con criterios de aceptación
- [ ] Validado con al menos 1 usuario/stakeholder
- [ ] Frontmatter completo y consistente
- [ ] Links de trazabilidad actualizados
- [ ] Revisado por al menos 1 integrante del equipo

## Tareas del Sprint (Dataview)

```dataview
TABLE
  status as "Estado",
  priority as "Prioridad",
  assignee as "Responsable",
  requirement as "Requerimiento"
FROM "05-Sprints"
WHERE type = "task" AND sprint = "Sprint-<% tp.frontmatter.sprint %>"
SORT priority ASC
```
