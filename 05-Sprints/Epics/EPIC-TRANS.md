---
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: epic
key: RV-47
link: "https://ucenfotec-team-y6xzvduw.atlassian.net/browse/RV-47"
summary: "Funcionalidades Transversales"
issuetype: Epic
project: RV
title: "Funcionalidades Transversales"
status: todo
priority: must
assignee: "Geovanny"
owner: "Geovanny"
module: transversal
created: 2026-03-26
updated: 2026-03-26
tags:
  - epic
  - modulo/transversal
  - mvp
description: "Módulo transversal que agrupa funcionalidades compartidas por los tres módulos: sincronización offline/online, interfaz multilingüe, gestión de roles comunitarios y arquitectura base del sistema."
labels:
  - transversal
  - mvp
---

# 🔗 EPIC-TRANS: Funcionalidades Transversales

## Control Rápido

| Campo | Valor |
|-------|-------|
| **Estado** | `INPUT[suggester(option(todo), option(in-progress), option(done)):status]` |
| **Prioridad** | `INPUT[suggester(option(critical), option(high), option(medium), option(low)):priority]` |

## Descripción

Épica transversal que agrupa requerimientos compartidos entre EDU, SAB y SAL:

- **RF-TRANS-01:** Sincronización offline/online (PouchDB ↔ CouchDB)
- **RF-TRANS-02:** Interfaz multilingüe (Español, Bribri, Cabécar, Ngäbe)
- **RF-TRANS-03:** Gestión de roles y permisos comunitarios (4 niveles per ADR-009)

## Requerimientos Relacionados

| RF | Título | Prioridad |
|----|--------|-----------|
| RF-TRANS-01 | Sincronización offline/online bidireccional | Must |
| RF-TRANS-02 | Interfaz multilingüe con selección de idioma | Must |
| RF-TRANS-03 | Gestión de roles comunitarios con 4 niveles de acceso | Should |
| RNF-01 | Rendimiento: carga <3s | Must |
| RNF-02 | Seguridad: cifrado AES-256, TLS 1.3, RBAC | Must |
| RNF-03 | Usabilidad: flujos guiados, ≤6 campos por formulario | Should |
| RNF-04 | Compatibilidad: Android 8+, gama baja | Must |

## Stories Asociadas

```dataview
TABLE summary as "Título", status as "Estado", assignee as "Responsable", customfield_10016 as "SP"
FROM "05-Sprints/Stories"
WHERE type = "story" AND contains(tags, "modulo/transversal")
SORT key ASC
```

## ADRs Relacionados

- [[ADR-008]] — Stack Tecnológico (PWA propuesta)
- [[ADR-009]] — Gobernanza Cultural y Protocolos de Consentimiento
