---
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.42
type: story
key: ""
summary: "RF-TRANS-02: Interfaz multilingüe con selección de idioma"
issuetype: Story
project: RV
parent: "EPIC-TRANS"
title: "Interfaz multilingüe con selección de idioma"
status: todo
priority: must
assignee: "Elkin"
module: transversal
requirement: "RF-TRANS-02"
story_points: 5
customfield_10016: 5
created: 2026-03-26
updated: 2026-03-26
tags:
  - story
  - modulo/transversal
  - mvp
description: "Como docente comunitario Bribri, necesito poder usar el sistema en mi lengua materna, para facilitar la adopción de la herramienta en mi comunidad."
labels:
  - transversal
  - mvp
---

# US-TRANS-02: Interfaz multilingüe con selección de idioma

## Descripción

Como docente comunitario Bribri, necesito poder usar el sistema en mi lengua materna, para facilitar la adopción de la herramienta en mi comunidad.

## Criterios de Aceptación

- [ ] Selector de idioma en primer uso y en configuración
- [ ] Archivos de traducción JSON: es.json, bri.json (Bribri), cab.json (Cabécar), ngb.json (Ngäbe)
- [ ] i18next integrado con React para cambio dinámico sin recarga
- [ ] Labels, menús, botones y mensajes de error traducidos
- [ ] Preferencia de idioma persistida en PouchDB local

## Dependencias

- [[ADR-008]] — i18next como framework i18n

## Sprint Estimado

Sprint-03
