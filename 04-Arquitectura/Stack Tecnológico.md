---
type: document
title: "Stack Tecnológico — Raíces Vivas"
project: raices-vivas
status: pending-adr
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.40
tags:
  - arquitectura
  - stack
---
# Stack Tecnológico — Raíces Vivas

> **Estado:** Pendiente de decisión formal. Ver [[01-Proyecto/Decisiones/ADR-001-stack-tecnologico]] cuando se cree.

## Criterios de Selección (derivados de RNFs)

| Criterio | RNF Origen | Restricción |
|----------|-----------|-------------|
| Offline-first | [[RNF-01]] | PWA con Service Workers o app nativa con SQLite local |
| Multilingüe | [[RNF-02]] | i18n nativo, contenido etiquetado por idioma |
| Rendimiento | [[RNF-03]] | <3s en búsquedas, carga ligera |
| Seguridad | [[RNF-04]] | Roles, cifrado, auditoría |
| Usabilidad | [[RNF-05]] | UI simple, flujos guiados, ≤6 campos |
| Gama baja | [[RNF-06]] | Android 8+, navegadores modernos, sin HW especial |

## Opciones a Evaluar

> Se formalizará como ADR en la fase de diseño.

### Opción A: PWA (Progressive Web App)

- **Frontend:** React/Vue + Workbox (Service Workers)
- **Backend:** Node.js / Python (FastAPI)
- **BD Local:** IndexedDB (Dexie.js)
- **BD Remota:** PostgreSQL / Supabase
- **Sync:** CouchDB/PouchDB o custom sync

### Opción B: App Híbrida

- **Framework:** Flutter / React Native
- **BD Local:** SQLite (drift/sqflite)
- **Backend:** mismo que Opción A
- **Sync:** custom REST + conflict resolution

### Opción C: Plataforma Low-Code

- **Plataforma:** AppSheet / PowerApps / Budibase
- **BD:** integrada
- **Offline:** limitado según plataforma

## Decisión

> Pendiente → crear ADR-001
