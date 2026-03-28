---
type: test
title: "Prueba de SQLSeal — Verificación de tablas CSV y files"
created: 2026-03-27
tags:
  - qa
  - sqlseal
  - test
---

# Prueba de SQLSeal

> **Objetivo**: Verificar que SQLSeal lee correctamente los CSVs y la tabla virtual `files`.  
> Abrir esta nota en Obsidian y confirmar que las 5 secciones de abajo renderizan tablas con datos.

---

## 1. Tabla virtual `files` — Primeras 10 notas

```sqlseal
SELECT name, path, type, status
FROM files
WHERE type IS NOT NULL
LIMIT 10
```

---

## 2. CSV: finanzas-config.csv

```sqlseal
TABLE tarifas = file(08-Recursos/Datos/finanzas-config.csv)
SELECT persona, rol, tarifa_hora, tarifa_hora_usd, dedicacion_semanal
FROM tarifas
```

---

## 3. CSV: sprint-plan.csv

```sqlseal
TABLE sp = file(08-Recursos/Datos/sprint-plan.csv)
SELECT sprint, persona, horas_plan, horas_real
FROM sp
WHERE horas_plan > 0
ORDER BY sprint, persona
```

---

## 4. CSV: encuestas-edu (existente)

```sqlseal
TABLE edu = file(08-Recursos/Datos/encuestas-edu-respuestas.csv)
SELECT respondent_id, A1_territorio, A2_pueblo, A6_dominio_tec
FROM edu
LIMIT 5
```

---

## 5. Prueba JOIN: tareas × tarifas

```sqlseal
TABLE tarifas = file(08-Recursos/Datos/finanzas-config.csv)
SELECT
  f.name,
  f.assignee,
  f.effort,
  f.effort_actual,
  t.tarifa_hora
FROM files f
JOIN tarifas t ON f.assignee = t.persona
WHERE f.path LIKE '05-Sprints%' AND f.type = 'task'
LIMIT 10
```

---

## 6. Prueba TEMPLATE output (formateo rico)

```sqlseal
TEMPLATE
{{#each data}}
> **Progreso**: {{this.done}}/{{this.total}} tareas completadas
{{/each}}
SELECT
  COUNT(*) as total,
  SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done
FROM files
WHERE path LIKE '05-Sprints%' AND (type = 'task' OR type = 'subtask')
```

---

## 7. Prueba SQLSeal Charts

```sqlseal
CHART
{
  series: [{
    type: 'pie',
    radius: '60%',
    encode: { value: 'count', itemName: 'assignee' }
  }]
}
SELECT assignee, COUNT(*) as count
FROM files
WHERE path LIKE '05-Sprints%' AND (type = 'task' OR type = 'subtask')
GROUP BY assignee
```

---

## 8. Prueba referencia a nota actual (@)

```sqlseal
SELECT name, type, status
FROM files
WHERE type = @type
LIMIT 5
```

---

## 9. Diagnóstico: columnas disponibles en `files`

```sqlseal
SELECT * FROM files WHERE type = 'task' AND path LIKE '05-Sprints/Sprint-01/T-001%' LIMIT 1
```

---

## 10. Diagnóstico: intentar SELECT title

```sqlseal
SELECT name, title, summary FROM files WHERE type = 'task' AND path LIKE '05-Sprints/Sprint-01/T-001%' LIMIT 1
```

---

## 11. Diagnóstico: Riesgos con title

```sqlseal
SELECT name, title FROM files WHERE type = 'risk' LIMIT 1
```

---

## Resultado esperado

| Sección | Debe mostrar |
|---|---|
| §1 | Tabla con 10 filas: name, path, type, status |
| §2 | 4 filas: Geovanny, Elkin, Santiago, Equipo con tarifas |
| §3 | 8 filas: Sprint-01 y Sprint-02 con horas > 0 |
| §4 | 5 filas de encuesta educación |
| §5 | Hasta 10 tareas con JOIN a tarifa por persona |
| §6 | Texto Handlebars: "Progreso: X/Y tareas completadas" |
| §7 | Gráfico ECharts de pie: distribución de tareas por persona |
| §8 | Notas con type = "test" |

> **Si alguna sección muestra error o tabla vacía**, anotar aquí cuál y el mensaje de error.
