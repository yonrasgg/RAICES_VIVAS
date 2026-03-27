---
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: RV-48
link: "https://ucenfotec-team-y6xzvduw.atlassian.net/browse/RV-48"
summary: "RF-TRANS-01: Sincronización offline/online bidireccional"
issuetype: Story
project: RV
parent: RV-47
title: "Sincronización offline/online bidireccional"
status: todo
priority: must
assignee: "Geovanny"
module: transversal
requirement: "RF-TRANS-01"
story_points: 8
customfield_10016: 8
sprint: Sprint-03
created: 2026-03-26
updated: 2026-03-26
tags:
  - story
  - modulo/transversal
  - mvp
description: "Como usuario del sistema, necesito que los datos se sincronicen automáticamente cuando haya conexión a internet, para poder trabajar sin conexión en territorio y que mis cambios se reflejen en el servidor central al reconectarme."
labels:
  - transversal
  - mvp
---

# US-TRANS-01: Sincronización offline/online bidireccional

## Descripción

Como usuario del sistema, necesito que los datos se sincronicen automáticamente cuando haya conexión a internet, para poder trabajar sin conexión en territorio y que mis cambios se reflejen en el servidor central al reconectarme.

## Criterios de Aceptación

- [ ] PouchDB sincroniza bidireccionalmente con CouchDB (servidor local RPi)
- [ ] Conflict resolution automático funciona para ediciones simultáneas
- [ ] Indicador visual de estado de sincronización (online/offline/syncing)
- [ ] Cola de cambios pendientes visible para el usuario
- [ ] Sync funciona con conexión 2G (baja velocidad)

## Dependencias

- [[ADR-008]] — Define PouchDB/CouchDB como tecnología de sync
- RNF-01 — Rendimiento <3s

## Sprint Estimado

Sprint-03 (implementación piloto)
