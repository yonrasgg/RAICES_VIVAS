---
type: document
title: "QA — Plan de Calidad y Testing"
project: raices-vivas
status: active
created: 2026-02-27
updated: 2026-03-01
tags:
  - qa
  - testing
---
# QA — Plan de Calidad y Testing

> **Estado:** Activo. La sección **Validación de Frontmatter** aplica desde Sprint-01. Las secciones de testing funcional se completarán en la fase de implementación.

## 1. Validación de Frontmatter (Quality Gate Permanente)

El frontmatter YAML es la **base de datos** del proyecto. Un campo vacío, mal escrito o con tipo incorrecto hace que la nota sea **invisible** para dashboards, métricas y weekly notes. Esta sección define los controles de calidad que deben aplicarse **antes de cada commit**.

> 📌 Referencia completa de esquemas: [[01-Proyecto/Guía de Workflow#4. Esquema de Frontmatter — Referencia Definitiva|Guía de Workflow §4]]

### 1.1 Checklist de Validación por Tipo de Nota

#### ✅ Tareas (`type: task`) — CRÍTICO

| # | Verificación | Comando para auditar |
|---|-------------|---------------------|
| 1 | ¿Tiene `type: task`? | `grep -rL "^type: task" 05-Sprints/Sprint-*/T-*.md` |
| 2 | ¿`effort` está entre comillas? (`"8h"`, no `8h`) | `grep -rn "^effort: [0-9]" 05-Sprints/` |
| 3 | ¿`effort_actual` está entre comillas? | `grep -rn "^effort_actual: [0-9]" 05-Sprints/` |
| 4 | ¿Tareas `done` tienen `completed: YYYY-MM-DD`? | `grep -l "status: done" 05-Sprints/Sprint-*/T-*.md \| xargs grep -L "^completed: 20"` |
| 5 | ¿Tareas `done` tienen `effort_actual: "Xh"`? | `grep -l "status: done" 05-Sprints/Sprint-*/T-*.md \| xargs grep "^effort_actual: \"\""` |
| 6 | ¿Todas tienen `assignee`? | `grep -rn "^assignee:$" 05-Sprints/` |
| 7 | ¿Todas tienen `sprint`? | `grep -rn "^sprint:$" 05-Sprints/` |
| 8 | ¿Todas tienen `due: YYYY-MM-DD`? | `grep -rL "^due: 20" 05-Sprints/Sprint-*/T-*.md` |
| 9 | ¿IDs son secuenciales y únicos? | `grep -rh "^id:" 05-Sprints/Sprint-*/T-*.md \| sort \| uniq -d` |
| 10 | ¿El `status` tiene valores válidos? | `grep -rh "^status:" 05-Sprints/Sprint-*/T-*.md \| sort \| uniq` |

**Valores válidos de `status` para tareas:** `todo`, `in-progress`, `review`, `done`, `blocked`

#### ✅ Riesgos (`type: risk`)

| # | Verificación | Comando para auditar |
|---|-------------|---------------------|
| 1 | ¿Tiene `type: risk`? | `grep -rL "^type: risk" 01-Proyecto/Riesgos/RSK-*.md` |
| 2 | ¿`severity` corresponde a `probability × impact`? | Revisar manualmente cada RSK |
| 3 | ¿Tiene `review_date: YYYY-MM-DD`? | `grep -rL "^review_date:" 01-Proyecto/Riesgos/RSK-*.md` |
| 4 | ¿`status` es un valor válido? | `grep -rh "^status:" 01-Proyecto/Riesgos/ \| sort \| uniq` |

**Valores válidos de `status` para riesgos:** `open`, `mitigating`, `mitigated`, `occurred`, `closed`, `accepted`

#### ✅ ADRs (`type: adr`)

| # | Verificación | Comando para auditar |
|---|-------------|---------------------|
| 1 | ¿Tiene `type: adr` (NO `type: decision`)? | `grep -rn "^type: decision" 01-Proyecto/Decisiones/` |
| 2 | ¿Tiene `date: YYYY-MM-DD`? | `grep -rL "^date:" 01-Proyecto/Decisiones/ADR-*.md` |
| 3 | ¿`status` es un valor válido? | `grep -rh "^status:" 01-Proyecto/Decisiones/ \| sort \| uniq` |

**Valores válidos de `status` para ADRs:** `proposed`, `accepted`, `deprecated`, `superseded`

#### ✅ Weekly Notes (`type: weekly`)

| # | Verificación | Comando para auditar |
|---|-------------|---------------------|
| 1 | ¿Tiene `week_start: YYYY-MM-DD`? | `grep -rL "^week_start:" "Daily Notes/"*.md` |
| 2 | ¿Tiene `week_end: YYYY-MM-DD`? | `grep -rL "^week_end:" "Daily Notes/"*.md` |
| 3 | ¿`week_start` es un lunes ISO? | Verificar manualmente |

#### ✅ Requerimientos (`type: requirement/*`)

| # | Verificación | Comando para auditar |
|---|-------------|---------------------|
| 1 | ¿`type` es `requirement/functional` o `requirement/non-functional`? | `grep -rh "^type:" 03-Requerimientos/ \| sort \| uniq` |
| 2 | ¿Tiene `priority: must\|should\|could`? | `grep -rL "^priority:" 03-Requerimientos/ --include="*.md"` |
| 3 | ¿RNFs tienen `metric:`? | `grep -rL "^metric:" "03-Requerimientos/No Funcionales/"` |

### 1.2 Errores Frecuentes y su Impacto

| Error | Impacto en automatización | Cómo detectar |
|-------|--------------------------|---------------|
| `effort: 8h` (sin comillas) | Dashboard muestra 0h. SQLSeal parsea como Duration, no string | `grep -rn "^effort: [0-9]" 05-Sprints/` |
| `status: done` sin `completed:` | Tarea no aparece en weekly "Completadas esta semana" | Comparar conteo `done` vs conteo `completed: 20` |
| `status: done` sin `effort_actual:` | Costo real = ₡0, Weekly muestra 0h ejecutadas | `grep -l "status: done" \| xargs grep "effort_actual: \"\""` |
| `type: decision` (en vez de `adr`) | ADR invisible para Dashboard y Métricas | `grep -rn "^type: decision"` |
| `week_start` falta en weekly | Weekly note muestra TODO el vault en vez de solo esa semana | `grep -rL "^week_start:" "Daily Notes/"` |
| `assignee:` vacío en tarea | Costo calculado con tarifa fallback ₡5,000/h (incorrecta) | `grep -rn "^assignee:$" 05-Sprints/` |
| `due:` vacío en tarea | No aparece en Calendar ni en weekly "Pendientes con fecha" | `grep -rL "^due: 20" 05-Sprints/Sprint-*/T-*.md` |

### 1.3 Script de Auditoría Rápida

Para ejecutar una auditoría completa del vault antes de un commit:

```bash
cd /home/geovanny/Documents/RAICES_VIVAS

echo "=== EFFORT SIN COMILLAS ==="
grep -rn "^effort: [0-9]" 05-Sprints/

echo "=== EFFORT_ACTUAL SIN COMILLAS ==="
grep -rn "^effort_actual: [0-9]" 05-Sprints/

echo "=== TAREAS DONE SIN COMPLETED ==="
for f in 05-Sprints/Sprint-*/T-*.md; do
  if grep -q "^status: done" "$f" && ! grep -q "^completed: 20" "$f"; then
    echo "  ❌ $f"
  fi
done

echo "=== TAREAS DONE SIN EFFORT_ACTUAL ==="
for f in 05-Sprints/Sprint-*/T-*.md; do
  if grep -q "^status: done" "$f" && grep -q 'effort_actual: ""' "$f"; then
    echo "  ❌ $f"
  fi
done

echo "=== ADRs CON TYPE INCORRECTO ==="
grep -rn "^type: decision" 01-Proyecto/Decisiones/

echo "=== WEEKLY SIN WEEK_START ==="
grep -rL "^week_start:" "Daily Notes/"*.md 2>/dev/null

echo "=== DISTRIBUCIÓN DE STATUS (Tareas) ==="
grep -rh "^status:" 05-Sprints/Sprint-*/T-*.md | sort | uniq -c

echo "=== IDs DUPLICADOS ==="
grep -rh "^id:" 05-Sprints/Sprint-*/T-*.md | sort | uniq -d

echo "✅ Auditoría completada"
```

> Este script se puede guardar como `08-Recursos/scripts/audit-frontmatter.sh` y ejecutar antes de cada `git push`.

---

## 2. Testing Funcional (Sprint de Implementación)

> Se completará cuando se inicie la fase de implementación.

- [ ] Plan de pruebas por módulo
- [ ] Casos de prueba derivados de criterios de aceptación
- [ ] Resultados de pruebas de usabilidad
- [ ] Pruebas de rendimiento (<3s)
- [ ] Pruebas de compatibilidad (dispositivos gama baja)
- [ ] Pruebas offline/sync
- [ ] Pruebas de seguridad (roles, acceso, auditoría, pentesting)

## 3. Referencia

- Los criterios de aceptación de cada requerimiento funcional definen los casos de prueba mínimos. Ver [[03-Requerimientos/_RTM]] para la lista completa.
- Para el esquema completo de frontmatter y qué campos alimentan qué automatización: [[01-Proyecto/Guía de Workflow#4. Esquema de Frontmatter — Referencia Definitiva|Guía de Workflow §4]]
- Para la referencia rápida de frontmatter para nuevos miembros: [[01-Proyecto/Onboarding#10. Frontmatter — El Motor de Automatización del Vault|Onboarding §10]]
