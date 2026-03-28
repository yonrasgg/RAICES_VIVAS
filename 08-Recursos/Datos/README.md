# 📊 Esquemas CSV — RAICES_VIVAS

Directorio de datos tabulares del vault. Los CSVs sirven como fuente de verdad para dashboards SQLSeal y se pueden regenerar desde frontmatter con el script `extract-frontmatter-to-csv.py`.

---

## Archivos

| Archivo | Filas | Origen | Regenerable |
|---------|-------|--------|-------------|
| `finanzas-config.csv` | 4 | Manual | No |
| `sprint-plan.csv` | 20 | Manual | No |
| `riesgos.csv` | 14 | Frontmatter RSK-*.md | Sí |
| `decisiones.csv` | 16 | Frontmatter ADR-*.md | Sí |
| `encuestas-edu-respuestas.csv` | 30 | Datos de campo | No |
| `encuestas-sal-respuestas.csv` | 25 | Datos de campo | No |
| `encuestas-sab-respuestas.csv` | 20 | Datos de campo | No |

---

## Esquemas

### finanzas-config.csv

| Columna | Tipo | Descripción |
|---------|------|-------------|
| persona | text | Nombre del integrante o "Equipo" |
| rol | text | Rol en el proyecto |
| tarifa_hora | int | Tarifa por hora en colones (₡) |
| tarifa_hora_usd | float | Tarifa por hora en USD |
| dedicacion_semanal | int | Horas semanales de dedicación |

### sprint-plan.csv

| Columna | Tipo | Descripción |
|---------|------|-------------|
| sprint | text | Identificador del sprint (Sprint-01..05) |
| persona | text | Nombre del integrante |
| horas_plan | int | Horas planificadas |
| horas_real | int | Horas reales ejecutadas |

### riesgos.csv

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | text | Identificador (RSK-001..014) |
| title | text | Título del riesgo |
| status | enum | open, mitigated, closed, accepted |
| category | text | recurso, técnico, calidad, calendario |
| probability | enum | baja, media, alta |
| impact | enum | bajo, medio, alto |
| severity | enum | bajo, medio, alto, crítico |
| strategy | enum | mitigar, evitar, aceptar, transferir |
| owner | text | Responsable |
| module | text | proyecto, saberes, transversal |
| phase | text | gestión, diseño, implementación, investigación |
| source | text | Minuta de origen (MIN-00X) |
| trigger | text | Condición de activación |
| related_requirements | text | IDs separados por `;` |
| related_decisions | text | IDs separados por `;` |
| review_date | date | Fecha de próxima revisión |
| created | date | Fecha de creación |
| updated | date | Última actualización |

### decisiones.csv

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | text | Identificador (ADR-001..016) |
| title | text | Título de la decisión |
| status | enum | accepted, superseded, proposed |
| category | text | tecnología, proceso, diseño, gobernanza, arquitectura |
| module | text | proyecto, transversal |
| impact | enum | bajo, medio, alto |
| deciders | text | Nombres separados por `;` |
| source | text | Minuta de origen (MIN-00X) |
| date | date | Fecha de la decisión |
| superseded_by | text | ID de ADR que reemplaza (si aplica) |
| related_requirements | text | IDs separados por `;` |
| related_risks | text | IDs separados por `;` |
| created | date | Fecha de creación |
| updated | date | Última actualización |

---

## Convenciones

- **Separador de listas**: `;` (punto y coma) para campos multi-valor dentro del CSV
- **Encoding**: UTF-8 sin BOM
- **Line endings**: Unix (LF)
- **Regeneración**: `python3 08-Recursos/scripts/extract-frontmatter-to-csv.py --type all`

---

## Navegación

- [[Finanzas]]
- [[Riesgos]]
- [[Decisiones]]
- [[Métricas]]
