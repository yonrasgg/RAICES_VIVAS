---
banner_src: "08-Recursos/Imágenes/cover-rf-trans.png"
banner_src_x: 0.47714
banner_src_y: 0.42
id: RF-TRANS-02
key: ""
story_points: 5
type: requirement/functional
module: transversal
category: multilingüismo
wbs: RV-4.2
title: "Multilingüismo"
status: approved
priority: must
actor:
  - Usuario
source: "investigación"
validation: "Prueba de selector de idioma con hablantes nativos"
metric: "UI con selector de idioma funcional. Contenido etiquetado por idioma permitiendo filtrar y navegar en lengua preferida."
created: 2026-02-25
updated: 2026-03-11
sprint: null
tags:
  - requerimiento
  - funcional
  - transversal
  - prioridad/must
---

# RF-TRANS-02: Multilingüismo

> [!info] Reclasificado
> Este requerimiento fue reclasificado de **RNF-02** a **RF-TRANS-02** el 2026-03-11. Se determinó que describe comportamiento funcional (selector de idioma, etiquetado de contenidos por lengua), no una cualidad de calidad.

## Descripción

El sistema debe soportar interfaz de usuario bilingüe (español + al menos una lengua indígena) y permitir etiquetar contenidos por idioma.

## Justificación

Los usuarios son hablantes nativos de lenguas indígenas (bribri, cabécar, etc.). Un sistema solo en español limita la adopción y excluye a los principales beneficiarios.

## Métrica / Verificación

**Métrica:** Selector de idioma funcional en la UI. Todo contenido tiene etiqueta de idioma obligatoria.

**Método de verificación:** Validación con usuarios bilingües — completar un flujo completo en lengua indígena.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Multilingüismo / barrera cultural
- **WBS:** [[WBS#RV-4.2]]
- **Categoría:** Multilingüismo
- **ID anterior:** RNF-02

## Tareas Vinculadas

```sqlseal
SELECT
  status as "Estado",
  assignee as "Responsable",
  sprint as "Sprint",
  priority as "Prioridad"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints%'
  AND (requirement = @id OR requirement LIKE '%' || @id || '%')
ORDER BY sprint ASC, priority ASC
```

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial como RNF-02 (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
| 2026-03-11 | Reclasificado de RNF-02 → RF-TRANS-02 (funcional transversal) | Equipo |

## Fuentes de Investigación

| Tipo | Referencia | Hallazgo clave |
|------|-----------|----------------|
| Entrevista | [[ENT-001]] | Maleku como lengua prioritaria de interfaz |
| Entrevista | [[ENT-002]] | Bribri y Cabécar como lenguas requeridas |
| Entrevista | [[ENT-003]] | Personal de salud necesita interfaz en español |
| Entrevista | [[ENT-004]] | Boruca demanda interfaz en lengua local |
| Bibliografía | [[Bibliografía#6]] | Fuentes sobre diversidad lingüística indígena |
| Metodología | [[Enfoque-Metodológico]] | Marco metodológico general |
