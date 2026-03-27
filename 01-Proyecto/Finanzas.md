---
type: document
title: "Gestión Financiera — Raíces Vivas"
project: raices-vivas
status: active
created: 2026-03-01
updated: 2026-03-26
banner_src: "08-Recursos/Imágenes/cover-proyecto.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - proyecto
  - finanzas
  - gestion
---
# 💰 Gestión Financiera — Raíces Vivas

> **Contexto:** Proyecto académico universitario orientado a comunidades indígenas de Costa Rica. Este documento establece el marco financiero, costos estimados, y consideraciones legales/gubernamentales aplicables al entorno costarricense y territorios indígenas.

## 1. Resumen de Costos del Proyecto

```dataviewjs
// ── Costos de Recursos Humanos ──
const team = [
  { nombre: "Geovanny", rol: "Project Lead / Arquitecto", horas: 0, tarifa: 8500 },
  { nombre: "Elkin", rol: "Líder Investigación / Analista", horas: 0, tarifa: 6500 },
  { nombre: "Santiago", rol: "Líder QA / Analista", horas: 0, tarifa: 6500 },
  { nombre: "Equipo", rol: "Tareas colectivas", horas: 0, tarifa: 7167 }
];

// Helper: parsear horas (maneja Luxon Duration + strings "8h")
const parseH = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if (typeof v.as === "function") return v.as("hours");
    if (v.hours !== undefined) return v.hours;
  }
  const m = String(v).match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
};

// Calcular horas reales (effort_actual para done, effort para pendientes)
const tasks = dv.pages('"05-Sprints"').where(t => t.type === "task" || t.type === "subtask");
for (const t of tasks) {
  const est = parseH(t.effort);
  const act = parseH(t.effort_actual);
  const hours = (t.status === "done" && act > 0) ? act : est;
  const assignee = String(t.assignee || "").toLowerCase();
  if (assignee.includes("geovanny")) team[0].horas += hours;
  else if (assignee.includes("elkin")) team[1].horas += hours;
  else if (assignee.includes("santiago")) team[2].horas += hours;
  else team[3].horas += hours;
}

const totalHoras = team.reduce((s, m) => s + m.horas, 0);
const totalRH = team.reduce((s, m) => s + (m.horas * m.tarifa), 0);

// ── Costos de Herramientas ──
const tools = [
  { nombre: "Obsidian", costo: 0, periodo: "Gratuito (uso personal)" },
  { nombre: "GitHub (Free tier)", costo: 0, periodo: "Gratuito" },
  { nombre: "Git", costo: 0, periodo: "Open Source" },
  { nombre: "Mermaid / Charts", costo: 0, periodo: "Open Source" },
  { nombre: "Draw.io / Diagrams", costo: 0, periodo: "Open Source" },
  { nombre: "VS Code", costo: 0, periodo: "Open Source" },
  { nombre: "Node.js / Python", costo: 0, periodo: "Open Source" }
];
const totalTools = tools.reduce((s, t) => s + t.costo, 0);

// ── Costos Administrativos Potenciales ──
const admin = [
  { concepto: "Registro de marca (RNPI)", costo: 150000, nota: "Por clase, ante Registro Nacional" },
  { concepto: "Publicación en La Gaceta", costo: 30000, nota: "Edicto obligatorio para marcas" },
  { concepto: "Constitución de Asociación", costo: 75000, nota: "Ante Registro Nacional de Asociaciones" },
  { concepto: "Personería Jurídica", costo: 15000, nota: "Certificación de representante legal" },
  { concepto: "Patente Municipal", costo: 25000, nota: "Varía según cantón y actividad" },
  { concepto: "Certificación MEIC (PYME)", costo: 0, nota: "Trámite gratuito en línea" },
  { concepto: "Permiso Sanitario (Min. Salud)", costo: 35000, nota: "Si aplica por tipo de actividad" }
];
const totalAdmin = admin.reduce((s, a) => s + a.costo, 0);

const totalGeneral = totalRH + totalTools + totalAdmin;

dv.header(3, "📊 Resumen General");
dv.table(
  ["Categoría", "Monto (₡)", "Porcentaje"],
  [
    ["👥 Recursos Humanos", `₡${totalRH.toLocaleString()}`, `${totalGeneral > 0 ? Math.round((totalRH/totalGeneral)*100) : 0}%`],
    ["🔧 Herramientas", `₡${totalTools.toLocaleString()}`, `${totalGeneral > 0 ? Math.round((totalTools/totalGeneral)*100) : 0}%`],
    ["📋 Administrativo / Legal", `₡${totalAdmin.toLocaleString()}`, `${totalGeneral > 0 ? Math.round((totalAdmin/totalGeneral)*100) : 0}%`],
    ["**TOTAL**", `**₡${totalGeneral.toLocaleString()}**`, "**100%**"]
  ]
);
```

---

## 2. Recursos Humanos — Detalle

### 2.1 Tarifas por Rol

| Integrante | Rol | Tarifa / Hora (₡) | Tarifa / Hora (USD) | Dedicación Semanal |
|-----------|-----|-------------------|--------------------|--------------------|
| **Geovanny** | Project Lead / Arquitecto | ₡8,500 | $15.89 | 12–15 h/semana |
| **Elkin** | Líder Investigación / Analista | ₡6,500 | $12.15 | 8–10 h/semana |
| **Santiago** | Líder QA / Analista | ₡6,500 | $12.15 | 8–10 h/semana |

> **Nota:** Tarifas diferenciadas por rol y nivel de responsabilidad, basadas en el mercado laboral costarricense 2026. Ref: Decreto de Salarios Mínimos MTSS — Licenciado universitario ~₡750K/mes (₡4,687/h base) + factor de especialización PM; Técnico superior ~₡570K/mes (₡3,562/h base) + factor de especialización analista. Tipo de cambio referencial: ₡535/USD (BCCR, marzo 2026).

### 2.2 Horas Invertidas por Sprint — Plan vs Real (Dinámico)

```dataviewjs
const parseH = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if (typeof v.as === "function") return v.as("hours");
    if (v.hours !== undefined) return v.hours;
  }
  const m = String(v).match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
};
const tasks = dv.pages('"05-Sprints"').where(t => (t.type === "task" || t.type === "subtask") && t.sprint && t.effort);
const matrix = {};

for (const t of tasks) {
  const sprint = String(t.sprint);
  const person = t.assignee || "Sin asignar";
  const est = parseH(t.effort);
  const act = parseH(t.effort_actual);
  const real = (t.status === "done" && act > 0) ? act : est;
  if (!matrix[sprint]) matrix[sprint] = {};
  if (!matrix[sprint][person]) matrix[sprint][person] = { plan: 0, real: 0 };
  matrix[sprint][person].plan += est;
  matrix[sprint][person].real += real;
}

const people = [...new Set(tasks.map(t => t.assignee || "Sin asignar"))].sort();
const headers = ["Sprint"];
for (const p of people) headers.push(`${p} (P/R)`);
headers.push("Total Plan", "Total Real", "Δ");

const rows = [];
const totals = {};
for (const p of people) totals[p] = { plan: 0, real: 0 };
let grandPlan = 0, grandReal = 0;

for (const [sprint, data] of Object.entries(matrix).sort()) {
  const row = [sprint];
  let sPlan = 0, sReal = 0;
  for (const p of people) {
    const d = data[p] || { plan: 0, real: 0 };
    row.push(`${d.plan}h / ${d.real}h`);
    sPlan += d.plan; sReal += d.real;
    totals[p].plan += d.plan; totals[p].real += d.real;
  }
  const delta = sReal - sPlan;
  row.push(`**${sPlan}h**`, `**${sReal}h**`, `${delta >= 0 ? "+" : ""}${delta}h`);
  rows.push(row);
  grandPlan += sPlan; grandReal += sReal;
}

const totalRow = ["**TOTAL**"];
for (const p of people) totalRow.push(`**${totals[p].plan}h / ${totals[p].real}h**`);
const gDelta = grandReal - grandPlan;
totalRow.push(`**${grandPlan}h**`, `**${grandReal}h**`, `**${gDelta >= 0 ? "+" : ""}${gDelta}h**`);
rows.push(totalRow);

dv.table(headers, rows);
dv.paragraph(`> **📊 Varianza de horas:** ${gDelta >= 0 ? "+" : ""}${gDelta}h (${grandPlan > 0 ? ((gDelta/grandPlan)*100).toFixed(1) : 0}%) · Formato: Plan / Real`);
```

### 2.3 Costo Acumulado por Integrante — Plan vs Real

```dataviewjs
const parseH = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if (typeof v.as === "function") return v.as("hours");
    if (v.hours !== undefined) return v.hours;
  }
  const m = String(v).match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
};
const tarifas = { "Geovanny": 8500, "Elkin": 6500, "Santiago": 6500, "Equipo": 7167 };
const tasks = dv.pages('"05-Sprints"').where(t => (t.type === "task" || t.type === "subtask") && t.effort);
const costos = {};

for (const t of tasks) {
  const person = t.assignee || "Sin asignar";
  const est = parseH(t.effort);
  const act = parseH(t.effort_actual);
  const real = (t.status === "done" && act > 0) ? act : est;
  const tarifa = tarifas[person] || 7000;
  if (!costos[person]) costos[person] = { planH: 0, realH: 0, planCost: 0, realCost: 0 };
  costos[person].planH += est;
  costos[person].realH += real;
  costos[person].planCost += est * tarifa;
  costos[person].realCost += real * tarifa;
}

const headers = ["👤 Integrante", "H. Plan", "H. Real", "Tarifa (₡/h)", "Costo Plan (₡)", "Costo Real (₡)", "Δ Costo (₡)", "Real (USD)"];
const rows = [];
let gPlan = 0, gReal = 0;

for (const [person, d] of Object.entries(costos).sort()) {
  const tarifa = tarifas[person] || 7000;
  gPlan += d.planCost;
  gReal += d.realCost;
  const delta = d.realCost - d.planCost;
  rows.push([
    person,
    `${d.planH}h`,
    `${d.realH}h`,
    `₡${tarifa.toLocaleString()}`,
    `₡${d.planCost.toLocaleString()}`,
    `₡${d.realCost.toLocaleString()}`,
    `${delta >= 0 ? "+" : ""}₡${delta.toLocaleString()}`,
    `$${Math.round(d.realCost / 535).toLocaleString()}`
  ]);
}
const gDelta = gReal - gPlan;
rows.push([
  "**TOTAL**", "", "", "",
  `**₡${gPlan.toLocaleString()}**`,
  `**₡${gReal.toLocaleString()}**`,
  `**${gDelta >= 0 ? "+" : ""}₡${gDelta.toLocaleString()}**`,
  `**$${Math.round(gReal/535).toLocaleString()}**`
]);

dv.table(headers, rows);
```

> **Nota:** Las tareas asignadas a "Equipo" (trabajo colectivo) se costean a tarifa promedio: ₡7,167/h = (₡8,500 + ₡6,500 + ₡6,500) ÷ 3.

### 2.4 Costo por Sprint (Dinámico)

```dataviewjs
const parseH = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if (typeof v.as === "function") return v.as("hours");
    if (v.hours !== undefined) return v.hours;
  }
  const m = String(v).match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
};
const tarifas = { "Geovanny": 8500, "Elkin": 6500, "Santiago": 6500, "Equipo": 7167 };
const tasks = dv.pages('"05-Sprints"').where(t => (t.type === "task" || t.type === "subtask") && t.sprint && t.effort);
const sprints = {};

for (const t of tasks) {
  const sprint = String(t.sprint);
  const person = t.assignee || "Sin asignar";
  const est = parseH(t.effort);
  const act = parseH(t.effort_actual);
  const real = (t.status === "done" && act > 0) ? act : est;
  const tarifa = tarifas[person] || 7000;
  if (!sprints[sprint]) sprints[sprint] = { tasks: 0, done: 0, planH: 0, realH: 0, planCost: 0, realCost: 0 };
  sprints[sprint].tasks++;
  if (t.status === "done") sprints[sprint].done++;
  sprints[sprint].planH += est;
  sprints[sprint].realH += real;
  sprints[sprint].planCost += est * tarifa;
  sprints[sprint].realCost += real * tarifa;
}

const headers = ["Sprint", "Tareas", "Done", "H. Plan", "H. Real", "Costo Plan (₡)", "Costo Real (₡)", "Δ (₡)", "CPI"];
const rows = [];
let gPH = 0, gRH = 0, gPC = 0, gRC = 0, gT = 0, gD = 0;

for (const [sprint, d] of Object.entries(sprints).sort()) {
  const delta = d.realCost - d.planCost;
  const cpi = d.realCost > 0 ? (d.planCost / d.realCost).toFixed(2) : "N/A";
  gPH += d.planH; gRH += d.realH; gPC += d.planCost; gRC += d.realCost;
  gT += d.tasks; gD += d.done;
  rows.push([
    sprint, d.tasks, d.done,
    `${d.planH}h`, `${d.realH}h`,
    `₡${d.planCost.toLocaleString()}`, `₡${d.realCost.toLocaleString()}`,
    `${delta >= 0 ? "+" : ""}₡${delta.toLocaleString()}`,
    cpi
  ]);
}
const gDelta = gRC - gPC;
const gCPI = gRC > 0 ? (gPC / gRC).toFixed(2) : "N/A";
rows.push([
  "**TOTAL**", `**${gT}**`, `**${gD}**`,
  `**${gPH}h**`, `**${gRH}h**`,
  `**₡${gPC.toLocaleString()}**`, `**₡${gRC.toLocaleString()}**`,
  `**${gDelta >= 0 ? "+" : ""}₡${gDelta.toLocaleString()}**`,
  `**${gCPI}**`
]);

dv.table(headers, rows);
dv.paragraph(`> **📊 CPI (Cost Performance Index):** ${gCPI} · Varianza: ${gDelta >= 0 ? "+" : ""}₡${gDelta.toLocaleString()} (${gPC > 0 ? ((gDelta/gPC)*100).toFixed(1) : 0}%) · CPI > 1 = bajo presupuesto · CPI < 1 = sobre presupuesto`);
```

```chart
type: bar
labels: [Sprint-01, Sprint-02]
series:
  - title: Geovanny (₡K)
    data: [434, 306]
  - title: Elkin (₡K)
    data: [182, 189]
  - title: Santiago (₡K)
    data: [189, 202]
  - title: Equipo (₡K)
    data: [43, 79]
width: 70%
labelColors: true
fill: true
beginAtZero: true
```

> *Costos en miles de colones (₡). Actualizado al 2026-03-26. Incluye 42 tareas de Sprint-01 y Sprint-02.*

### 2.5 Indicadores Financieros (Dinámico)

```dataviewjs
const parseH = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if (typeof v.as === "function") return v.as("hours");
    if (v.hours !== undefined) return v.hours;
  }
  const m = String(v).match(/(\d+)/);
  return m ? parseInt(m[1]) : 0;
};
const tarifas = { "Geovanny": 8500, "Elkin": 6500, "Santiago": 6500, "Equipo": 7167 };
const tasks = dv.pages('"05-Sprints"').where(t => (t.type === "task" || t.type === "subtask") && t.effort);
let planH = 0, realH = 0, planC = 0, realC = 0, done = 0;

for (const t of tasks) {
  const est = parseH(t.effort);
  const act = parseH(t.effort_actual);
  const real = (t.status === "done" && act > 0) ? act : est;
  const tarifa = tarifas[t.assignee] || 7000;
  planH += est;
  realH += real;
  planC += est * tarifa;
  realC += real * tarifa;
  if (t.status === "done") done++;
}

const total = tasks.length;
const deltaC = realC - planC;
const deltaH = realH - planH;
const cpi = realC > 0 ? (planC / realC).toFixed(2) : "N/A";
const spi = total > 0 ? (done / total).toFixed(2) : "N/A";
const pctDone = total > 0 ? Math.round((done / total) * 100) : 0;
const pctVar = planC > 0 ? ((deltaC / planC) * 100).toFixed(1) : 0;

dv.table(
  ["📏 Indicador", "Valor", "Meta", "Semáforo"],
  [
    ["**Horas planificadas**", `${planH}h`, "-", "📋"],
    ["**Horas ejecutadas (reales)**", `${realH}h`, "-", "📋"],
    ["**Varianza de horas**", `${deltaH >= 0 ? "+" : ""}${deltaH}h (${planH > 0 ? ((deltaH/planH)*100).toFixed(1) : 0}%)`, "< ±10%", Math.abs(deltaH/planH) < 0.1 ? "🟢" : "🟡"],
    ["**Costo planificado (EV)**", `₡${planC.toLocaleString()}`, "-", "📋"],
    ["**Costo real (AC)**", `₡${realC.toLocaleString()} ($${Math.round(realC/535).toLocaleString()})`, "-", "📋"],
    ["**Varianza de costo (CV)**", `${deltaC >= 0 ? "+" : ""}₡${deltaC.toLocaleString()} (${pctVar}%)`, "< ±10%", Math.abs(parseFloat(pctVar)) < 10 ? "🟢" : "🟡"],
    ["**CPI (Cost Performance Index)**", cpi, "> 0.95", parseFloat(cpi) >= 0.95 ? "🟢" : parseFloat(cpi) >= 0.85 ? "🟡" : "🔴"],
    ["**SPI (Schedule Performance)**", `${spi} (${pctDone}% done)`, "> 0.90", parseFloat(spi) >= 0.9 ? "🟢" : "🟡"],
    ["**Tareas completadas**", `${done} / ${total}`, "-", pctDone >= 95 ? "🟢" : pctDone >= 70 ? "🟡" : "🔴"],
  ]
);
```

---

## 3. Herramientas y Tecnología

### 3.1 Stack Actual (Costo Cero)

| Herramienta | Tipo | Costo | Licencia |
|-------------|------|-------|----------|
| Obsidian | IDE de conocimiento | ₡0 | Gratuito para uso personal |
| GitHub (Free tier) | Repositorio + CI | ₡0 | Gratuito (repos públicos/privados ilimitados) |
| Git | Control de versiones | ₡0 | GPL v2 (Open Source) |
| VS Code | Editor de código | ₡0 | MIT License |
| Node.js | Runtime JavaScript | ₡0 | MIT License |
| Python 3 | Lenguaje de scripting | ₡0 | PSF License |
| Mermaid.js | Diagramas | ₡0 | MIT License |
| Draw.io | Diagramas profesionales | ₡0 | Apache 2.0 |

### 3.2 Herramientas Opcionales (Escalamiento Futuro)

| Herramienta | Función | Costo Mensual | Cuándo Aplicaría |
|-------------|---------|---------------|------------------|
| Obsidian Sync | Sincronización nativa | $5 USD/usuario | Si se abandona Git para sync |
| Obsidian Publish | Publicación web | $10 USD/mes | Para sitio web público |
| GitHub Pro | CI/CD avanzado | $4 USD/usuario | Si se necesitan Actions ilimitados |
| Figma (Free) | Prototipos UI avanzados | ₡0 – $15 USD | Diseño de interfaces |
| Notion (alternativa) | Gestión de conocimiento | $10 USD/usuario | No aplica — usamos Obsidian |

> **Decisión actual:** El proyecto opera con **costo cero en herramientas** gracias al uso exclusivo de software libre y tiers gratuitos. Ver [[01-Proyecto/Decisiones/ADR-001|ADR-001]].

---

## 4. Costos Administrativos, Burocráticos y Gubernamentales

### 4.1 Registro de Marca — Costa Rica

El registro de una marca en Costa Rica se realiza ante el **Registro Nacional de Propiedad Industrial (RNPI)**, adscrito al Ministerio de Justicia y Paz.

| Trámite | Costo Aproximado (₡) | Costo (USD) | Observación |
|---------|----------------------|-------------|-------------|
| Solicitud de registro de marca (por clase) | ₡113,000 – ₡150,000 | $211 – $280 | Clasificación NIZA; cada clase adicional tiene costo separado |
| Publicación en La Gaceta (edicto) | ₡25,000 – ₡35,000 | $47 – $65 | Obligatorio para oposición de terceros |
| Honorarios de abogado (opcional) | ₡150,000 – ₡350,000 | $280 – $654 | No obligatorio pero recomendable |
| Renovación de marca (cada 10 años) | ₡113,000 | $211 | Mismo costo que registro inicial |
| **Total estimado (sin abogado)** | **₡138,000 – ₡185,000** | **$258 – $346** | Por una clase |

**Base legal:** Ley de Marcas y Otros Signos Distintivos, Ley N° 7978 (1999).

**Proceso:**
1. Búsqueda de anterioridades en el RNPI (recomendado)
2. Presentar solicitud con formulario oficial + poder (si usa abogado)
3. Examen de forma por el Registro (15 días hábiles)
4. Publicación en La Gaceta (edicto por 1 día)
5. Período de oposición (2 meses)
6. Examen de fondo
7. Resolución y emisión de certificado

**Duración estimada:** 6–12 meses.

### 4.2 MEIC — Registro PYME

El **Ministerio de Economía, Industria y Comercio (MEIC)** administra el Sistema de Información Empresarial Costarricense (SIEC).

| Trámite | Costo | Observación |
|---------|-------|-------------|
| Registro como PYME en el SIEC | ₡0 (gratuito) | En línea: https://pyme.go.cr |
| Certificación PYME | ₡0 (gratuito) | Requiere: cédula jurídica, CCSS al día, D-101 |
| Capacitaciones MEIC | ₡0 (gratuito) | Programas de apoyo a PYMES |

**Beneficios de estar registrado como PYME:**
- Acceso a fondos no reembolsables (PROPYME)
- Capacitación gratuita en gestión empresarial
- Acceso preferencial a compras del Estado
- Programas de encadenamiento productivo

### 4.3 Constitución de Asociación / ONG

Para operar formalmente con comunidades indígenas, se puede constituir una **Asociación** bajo la Ley de Asociaciones N° 218.

| Trámite | Costo Aproximado (₡) | Observación |
|---------|----------------------|-------------|
| Constitución de Asociación | ₡50,000 – ₡100,000 | Acta constitutiva + estatutos |
| Inscripción Registro de Asociaciones | ₡25,000 | Registro Nacional |
| Personería Jurídica | ₡15,000 | Certificación digital |
| Libros legales (actas, diario, mayor, inventarios) | ₡20,000 – ₡40,000 | Legalización en Tribunal |
| **Total estimado** | **₡110,000 – ₡180,000** | **$206 – $336 USD** |

### 4.4 Cargas Sociales y Laborales (Si se contrata personal)

En Costa Rica, los costos laborales incluyen cargas sociales significativas:

| Concepto | Porcentaje sobre salario | Quién paga |
|----------|--------------------------|------------|
| CCSS (Seguro de Enfermedad y Maternidad) | 9.25% | Patrono |
| CCSS (Invalidez, Vejez y Muerte — IVM) | 5.25% | Patrono |
| Banco Popular | 0.50% | Patrono |
| IMAS | 0.50% | Patrono |
| INA | 1.50% | Patrono |
| Asignaciones Familiares (FODESAF) | 5.00% | Patrono |
| Fondo de Capitalización Laboral (FCL) | 3.00% | Patrono |
| Fondo de Pensión Complementaria (FPC) | 1.50% | Patrono |
| **Total carga patronal** | **~26.50%** | **Patrono** |
| Seguro de Riesgos del Trabajo (INS) | 1.5% – 6.0% | Patrono (varía por actividad) |
| Aguinaldo | 8.33% (1 mes/año) | Patrono |
| Vacaciones | 4.17% (2 semanas/año) | Patrono |
| Cesantía | ~5.33% (preaviso + cesantía) | Patrono |
| **Costo total adicional estimado** | **~45% – 50%** | **Sobre salario bruto** |

> **Nota para Raíces Vivas:** Actualmente el equipo trabaja como **estudiantes universitarios** sin relación laboral formal, por lo que estas cargas **no aplican en la fase académica**. Se documentan para la fase de implementación real.

### 4.5 Régimen Tributario

| Impuesto | Tasa | Aplicabilidad |
|----------|------|---------------|
| IVA | 13% | Sobre ventas de bienes/servicios |
| Impuesto sobre la Renta (personas jurídicas) | 5% – 30% | Progresivo según ingresos brutos |
| Impuesto sobre la Renta (personas físicas) | 0% – 25% | Progresivo según ingresos |
| Tarifa reducida para PYMES | 5% – 20% | Aplicable si ingresos < ₡122M anuales |

**Exenciones relevantes:**
- **Asociaciones sin fines de lucro** declaradas de utilidad pública: exentas de renta
- **Proyectos de desarrollo social** en territorios indígenas: posibles exenciones vía CONAI
- **Donaciones** a entidades autorizadas: deducibles del impuesto sobre la renta

---

## 5. Marco Legal para Territorios Indígenas

### 5.1 Legislación Aplicable

| Ley / Convenio | Número | Relevancia para Raíces Vivas |
|----------------|--------|------------------------------|
| **Ley Indígena** | N° 6172 (1977) | Define territorios indígenas y derechos de los pueblos originarios |
| **Convenio 169 OIT** | Ratificado 1993 | Consulta previa, libre e informada para proyectos que afecten pueblos indígenas |
| **Ley de Biodiversidad** | N° 7788 (1998) | Protección de conocimientos tradicionales y saberes ancestrales |
| **Ley CONAI** | N° 5251 (1973) | CONAI como ente rector de asuntos indígenas |
| **Decreto Mecanismo de Consulta** | N° 40932 (2018) | Mecanismo General de Consulta a Pueblos Indígenas |
| **Ley de Desarrollo de la Comunidad** | N° 3859 (1967) | ADIs como estructura de gobernanza en territorios |

### 5.2 CONAI — Comisión Nacional de Asuntos Indígenas

- **Función:** Ente coordinador entre el Estado y los 24 territorios indígenas de Costa Rica
- **8 pueblos indígenas:** Bribri, Cabécar, Ngäbe (Guaymí), Brunca (Boruca), Huetar, Maleku, Chorotega, Teribe (Térraba)
- **Contacto:** Tel. 2257-6465 · conaicr@ice.co.cr · https://www.conai.go.cr
- **Relevancia:** Cualquier proyecto que trabaje **con** comunidades indígenas debe coordinar con CONAI y respetar el Convenio 169 OIT

### 5.3 ADIs — Asociaciones de Desarrollo Integral

Las **ADIs** son la estructura de gobernanza local reconocida por el Estado en los territorios indígenas:

- Cada territorio indígena tiene una ADI con personería jurídica
- Las ADIs administran tierras comunales y aprueban proyectos
- **Requisito legal:** Antes de implementar cualquier sistema o proyecto en un territorio indígena, se debe obtener el **consentimiento libre, previo e informado** de la ADI correspondiente
- Las ADIs pueden recibir fondos públicos vía DINADECO (Dirección Nacional de Desarrollo de la Comunidad)

### 5.4 Consideraciones Específicas para Proyectos en Zonas Indígenas

| Aspecto | Consideración | Acción Requerida |
|---------|---------------|------------------|
| **Consulta previa** | Obligatoria por Convenio 169 OIT | Reuniones con ADI antes de implementar |
| **Propiedad intelectual** | Los saberes ancestrales no son patentables | Respetar protección de conocimientos tradicionales (Ley 7788) |
| **Acceso a datos** | Conectividad limitada en zonas rurales | Diseñar para operación offline-first |
| **Idioma** | 6 de los 8 pueblos mantienen su lengua | Considerar interfaz multilingüe |
| **Tenencia de tierra** | Tierras son inalienables e imprescriptibles | No aplica compra/venta de terrenos |
| **Infraestructura** | Electricidad intermitente en zonas remotas | Dispositivos con batería; bajo consumo energético |
| **Gobernanza** | Decisiones comunitarias (no individuales) | Proceso participativo, no impositivo |
| **Consentimiento** | Libre, previo e informado | Documentar actas de consentimiento en minutas |

### 5.5 Instituciones de Apoyo

| Institución | Sigla | Apoyo que Brinda |
|-------------|-------|------------------|
| CONAI | Comisión Nacional de Asuntos Indígenas | Coordinación, permisos, consulta previa |
| INDER | Instituto de Desarrollo Rural | Proyectos productivos, infraestructura rural |
| FONABE | Fondo Nacional de Becas | Becas educativas para estudiantes indígenas |
| MEP - DREA | Dir. Regional de Educación | Educación intercultural bilingüe |
| CCSS | Caja Costarricense de Seguro Social | Salud comunitaria, EBAIS en territorios |
| DINADECO | Dir. Nacional de Desarrollo Comunal | Fondos para ADIs y proyectos comunales |
| CONAPDIS | Consejo Nacional de Personas con Discapacidad | Accesibilidad e inclusión |
| SINAC | Sistema Nacional de Áreas de Conservación | Proyectos ambientales en territorios |
| IMAS | Instituto Mixto de Ayuda Social | Programas sociales, subsidios |

---

## 6. Presupuesto Estimado por Fase

### 6.1 Fase Académica (Actual — Feb–May 2026)

| Categoría | Detalle | Costo Estimado (₡) |
|-----------|---------|---------------------|
| Recursos Humanos | 3 estudiantes × ~10 h/semana × 16 semanas | ₡0 (trabajo académico) |
| Herramientas | Stack 100% gratuito | ₡0 |
| Transporte | Visitas a comunidades (si aplica) | ₡50,000 – ₡150,000 |
| Materiales | Impresiones, encuestas físicas | ₡10,000 – ₡30,000 |
| Internet y electricidad | Consumo doméstico (existente) | ₡0 (costo absorbido) |
| **Total Fase Académica** | | **₡60,000 – ₡180,000** |

### 6.2 Fase de Implementación (Estimada — Post-académica)

| Categoría | Detalle | Costo Estimado (₡) | Costo (USD) |
|-----------|---------|---------------------|-------------|
| Desarrollo (3 personas × 6 meses) | Geo: 200h×₡8,500 + Elk/San: 280h×₡6,500 | ₡3,520,000 | $6,579 |
| Registro de marca "Raíces Vivas" | 1 clase RNPI | ₡185,000 | $346 |
| Constitución de Asociación | Personería + libros | ₡180,000 | $336 |
| Hosting / Dominio web | 12 meses | ₡60,000 | $112 |
| Seguro de riesgos INS | 6 meses | ₡90,000 | $168 |
| Capacitación a comunidades | 3 talleres | ₡150,000 | $280 |
| Viáticos y transporte | 12 visitas a territorios | ₡360,000 | $673 |
| **Total Fase Implementación** | | **₡4,520,000** | **$8,449** |

### 6.3 Presupuesto Visual

```chart
type: bar
labels: [RR.HH., Herramientas, Marca, Asociación, Hosting, Seguros, Capacitación, Transporte]
series:
  - title: Costo Estimado (miles ₡)
    data: [3520, 0, 185, 180, 60, 90, 150, 360]
width: 80%
labelColors: true
fill: true
beginAtZero: true
```

```chart
type: doughnut
labels: [Recursos Humanos, Registro de Marca, Constitución Legal, Hosting/Dominio, Seguros, Capacitación, Transporte]
series:
  - title: Distribución de Costos
    data: [3520, 185, 180, 60, 90, 150, 360]
width: 60%
labelColors: true
```

---

## 7. Glosario Financiero

| Término | Definición |
|---------|-----------|
| **RNPI** | Registro Nacional de Propiedad Industrial — donde se registran marcas en CR |
| **MEIC** | Ministerio de Economía, Industria y Comercio — certifica PYMEs |
| **CONAI** | Comisión Nacional de Asuntos Indígenas — ente rector |
| **ADI** | Asociación de Desarrollo Integral — gobernanza territorial indígena |
| **CCSS** | Caja Costarricense de Seguro Social — salud y pensiones |
| **INS** | Instituto Nacional de Seguros — riesgos del trabajo |
| **INA** | Instituto Nacional de Aprendizaje — capacitación técnica |
| **IMAS** | Instituto Mixto de Ayuda Social — programas sociales |
| **DINADECO** | Dirección Nacional de Desarrollo de la Comunidad — fondos para ADIs |
| **INDER** | Instituto de Desarrollo Rural — proyectos productivos rurales |
| **FONABE** | Fondo Nacional de Becas — becas educativas |
| **PROPYME** | Programa de Apoyo a la Pequeña y Mediana Empresa — fondos no reembolsables |
| **Convenio 169 OIT** | Convenio sobre pueblos indígenas y tribales (consulta previa obligatoria) |
| **NIZA** | Clasificación Internacional de Productos y Servicios para marcas |
| **La Gaceta** | Diario Oficial del Gobierno de Costa Rica — publicación de edictos |

---

## 8. Referencias y Fuentes

| Fuente | Enlace / Referencia |
|--------|---------------------|
| CONAI | https://www.conai.go.cr |
| Registro Nacional | https://www.registronacional.go.cr |
| MEIC | https://www.meic.go.cr |
| PYME Costa Rica | https://pyme.go.cr |
| Ministerio de Salud | https://www.ministeriodesalud.go.cr |
| CCSS | https://www.ccss.sa.cr |
| Ley Indígena N° 6172 | Gaceta N° 240, 20/12/1977 |
| Convenio 169 OIT | Ratificado por CR, Ley N° 7316 (1992) |
| Ley de Marcas N° 7978 | Gaceta N° 22, 01/02/2000 |
| Ley de Biodiversidad N° 7788 | Gaceta N° 101, 27/05/1998 |
| Ley CONAI N° 5251 | Gaceta N° 136, 20/07/1973 |
| Decreto de Consulta N° 40932 | Gaceta N° 58, 2018 |
| WIPO — Perfil Costa Rica | https://www.wipo.int/wipolex/es/members/profile/CR |

---

> 📌 **Este documento se actualiza conforme avanza el proyecto.** Los costos de la Fase de Implementación son estimaciones que se refinarán al acercarse esa etapa. Los valores en USD usan tipo de cambio referencial ₡535/USD (BCCR, marzo 2026).

---

*Última actualización: 2026-03-26*
