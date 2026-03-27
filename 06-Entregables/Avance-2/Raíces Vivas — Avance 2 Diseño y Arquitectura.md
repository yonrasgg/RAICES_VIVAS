---
type: document
title: "Raíces Vivas — Avance 2: Diseño y Arquitectura"
project: raices-vivas
avance: 2
sprint: Sprint-02
status: in-progress
tags:
  - entregable
  - avance-2
  - arquitectura
  - diseño
created: 2026-03-26
updated: 2026-03-26
banner_src: "08-Recursos/Imágenes/cover-entregables.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# Raíces Vivas — Avance 2: Diseño y Arquitectura

> **Curso:** Introducción a la Ingeniería de Software — CENFOTEC
> **Equipo:** Geovanny Alpízar (PM/Arquitecto), Elkin (Investigación/SAB), Santiago (QA/SAL)
> **Fecha de entrega:** 01 de abril de 2026
> **Sprint:** Sprint-02 (2026-02-28 → 2026-04-01)

---

## 1. Introducción

Este documento presenta los avances de la fase de Diseño y Arquitectura del sistema Raíces Vivas, un sistema integral de apoyo a comunidades indígenas de Costa Rica en tres ejes: educación intercultural bilingüe (EDU), preservación de saberes ancestrales (SAB) y salud comunitaria (SAL).

Durante el Sprint-02, el equipo se enfocó en:
- Definir la arquitectura del sistema mediante el modelo C4
- Diseñar modelos entidad-relación por módulo
- Evaluar y seleccionar el stack tecnológico (ADR-008)
- Definir gobernanza cultural y protocolos de consentimiento (ADR-009)
- Investigar la infraestructura tecnológica disponible en territorios indígenas
- Planificar prototipos UI/UX y validación con usuarios

---

## 2. Diagrama de Contexto (C4 — Level 1)

> **Tarea:** [[T-021]] — Diagrama de contexto del sistema
> **Responsable:** Geovanny
> **Estado:** Especificación completa, ejecución en Mermaid pendiente

### 2.1 Actores del Sistema

| Actor | Descripción | Módulo(s) |
|-------|-------------|-----------|
| Docente comunitario | Educador bilingüe en territorio | EDU |
| Estudiante | Desde primaria hasta secundaria | EDU |
| Guía cultural | Portador de saberes ancestrales, documentalista | SAB |
| Auxiliar de salud | Promotor de salud comunitario | SAL |
| Administrador del sistema | Gestiona usuarios y configuración | TRANS |

### 2.2 Sistemas Adyacentes

| Sistema | Interacción | Protocolo |
|---------|-------------|-----------|
| MEP (Currículo Nacional) | Importa planes de estudio | CSV/REST |
| CCSS/EBAIS | Referencia de brigadas, protocolos | Manual/PDF |
| CouchDB (servidor central) | Sincronización de datos | HTTP/REST |
| Raspberry Pi (servidor local) | Sync local ↔ cloud | LAN |

*Diagrama Mermaid: pendiente de ejecución en [[04-Arquitectura/Diagramas/]]*

---

## 3. Modelos Entidad-Relación

> **Tareas:** [[T-022]] (EDU), [[T-023]] (SAB), [[T-024]] (SAL)
> **Estado:** Entidades y atributos definidos, diagramas Mermaid pendientes

### 3.1 Módulo EDU — Entidades Principales

- ESTUDIANTE (id, nombre, territorio, lengua_materna, nivel, grado)
- DOCENTE (id, nombre, lenguas, centro_educativo, territorio)
- CURSO (id, nombre, nivel, lengua_primaria, descripción)
- MATERIAL_DIDACTICO (id, tipo, idioma, formato, url_media)
- EVALUACION (id, tipo, puntaje_max, fecha)
- ASISTENCIA (id, fecha, presente, observación)

### 3.2 Módulo SAB — Entidades Principales

- SABER (id, titulo, categoría, descripción, nivel_acceso, lengua)
- PORTADOR (id, nombre, territorio, pueblo, especialidad)
- CONSENTIMIENTO (id, tipo, fecha_otorgado, vigencia, revocable)
- CATEGORIA (id, nombre, descripción, parent_id)
- MEDIA (id, tipo, formato, url, tamaño_kb)
- NIVEL_ACCESO (id, nombre: Público|Comunitario|Restringido|Ceremonial)
- ROL_COMUNITARIO (id, nombre, descripción, nivel_acceso_maximo)

### 3.3 Módulo SAL — Entidades Principales

- PACIENTE (id, nombre, territorio, fecha_nacimiento, sexo)
- EXPEDIENTE (id, tipo_sangre, alergias, condiciones_crónicas)
- CONSULTA (id, fecha, motivo, diagnóstico, tratamiento)
- CITA (id, fecha, tipo, estado, brigada_id)
- MEDICAMENTO (id, nombre, presentacion, stock)
- BRIGADA (id, fecha, territorio, personal, tipo)

*Diagramas Mermaid completos: pendiente de ejecución*

---

## 4. Stack Tecnológico — ADR-008

> **Decisión:** [[ADR-008|ADR-008 — Selección de Stack Tecnológico]]
> **Tarea:** [[T-025]]
> **Estado:** Propuesto (pendiente aprobación formal)

### 4.1 Evaluación FODA (Puntajes Ponderados)

| Alternativa | Puntaje | Recomendación |
|-------------|---------|---------------|
| **PWA (React + PouchDB)** | **4.50/5** | ✅ Recomendada |
| Flutter (Dart) | 4.30/5 | Alternativa viable |
| Low-Code (AppSheet) | 2.20/5 | No recomendada |

### 4.2 Stack Seleccionado

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Offline DB | PouchDB (cliente) ↔ CouchDB (servidor) |
| i18n | i18next (es, bri, cab, ngb) |
| Backend | Node.js + Express |
| Multimedia | Opus (audio), WebP (imágenes), HLS (video) |
| Seguridad | AES-256 reposo, TLS 1.3 tránsito, RBAC + CARE |

### 4.3 Infraestructura Territorial

| Componente | Especificación |
|-----------|---------------|
| Tablets | Android 10"+, 3 GB RAM, 32 GB almacenamiento |
| Servidor local | Raspberry Pi 4B, 4 GB RAM, SSD 256 GB |
| Red local | WiFi mesh (TP-Link Deco / Ubiquiti) |
| Energía | Panel solar 50W + batería 12V |

Detalle completo: [[04-Arquitectura/Stack Tecnológico]]

---

## 5. Gobernanza Cultural — ADR-009

> **Decisión:** [[ADR-009|ADR-009 — Gobernanza Cultural y Protocolos de Consentimiento]]
> **Tarea:** [[T-031]]
> **Estado:** Propuesto

### 5.1 Principios CARE

| Principio | Aplicación |
|-----------|-----------|
| **C**ollective Benefit | Datos gestionados para beneficio comunitario |
| **A**uthority to Control | Comunidad decide acceso y uso |
| **R**esponsibility | Equipo técnico como custodio, no propietario |
| **E**thics | Protocolo de consentimiento informado obligatorio |

### 5.2 Niveles de Acceso

| Nivel | Descripción | Autorización |
|-------|-------------|-------------|
| Público | Información general, educativa | Libre |
| Comunitario | Saberes compartidos en la comunidad | Líder comunal |
| Restringido | Conocimiento especializado | Consejo de mayores |
| Ceremonial | Contenido sagrado/espiritual | Awá o autoridad espiritual |

### 5.3 Marco Legal

- Convenio 169 OIT — Consulta y participación
- Ley 6172 — Ley Indígena (territorios inalienables)
- Ley 7788 — Biodiversidad (conocimientos tradicionales)
- Ley 8968 — Protección de datos personales
- Decreto 40932 — Consulta indígena
- UNDRIP — Declaración ONU sobre Derechos de Pueblos Indígenas

---

## 6. Wireframes y Prototipos UI/UX

> **Tareas:** [[T-026]] (EDU), [[T-027]] (SAB), [[T-028]] (SAL)
> **Herramienta:** Excalidraw
> **Estado:** Pantallas especificadas, diseño pendiente

### 6.1 Pantallas por Módulo

| Módulo | Pantallas Planificadas |
|--------|----------------------|
| EDU | Dashboard docente, Lista de cursos, Detalle de curso, Ejercicio interactivo, Progreso estudiante |
| SAB | Catálogo de saberes, Detalle con multimedia, Registro con consentimiento, Panel de gobernanza, Búsqueda avanzada |
| SAL | Dashboard auxiliar, Expediente paciente, Calendario de citas, Registro de brigada, Alertas de seguimiento |
| TRANS | Selector de idioma, Indicador de sincronización, Login/Registro, Configuración |

*Wireframes en Excalidraw: pendiente de ejecución*

---

## 7. Validación con Usuarios

> **Tareas:** [[T-029]] (Instrumentos), [[T-030]] (Entrevistas de campo)
> **Estado:** Estructura definida

### 7.1 Instrumentos de Validación
- Guía de entrevista semi-estructurada
- Escala de usabilidad SUS (System Usability Scale)
- Checklist de accesibilidad cultural

### 7.2 Sesiones Planificadas

| Sesión | Perfil | Territorio | Fecha estimada |
|--------|--------|-----------|---------------|
| 1 | Docente comunitario Bribri | Talamanca | Sprint-03 |
| 2 | Guía cultural Maleku | Guatuso | Sprint-03 |
| 3 | Auxiliar de salud (ATAP) | Buenos Aires | Sprint-03 |

---

## 8. Investigación: Tecnología para Territorios

Se realizó una investigación de la infraestructura de conectividad disponible en los principales territorios indígenas de Costa Rica, documentada en [[02-Investigación/Contexto/Mapa de Territorios Indígenas]].

### 8.1 Hallazgos Clave
- La conectividad varía drásticamente entre territorios (desde 3G+ en Guatuso hasta sin cobertura en Alto Chirripó)
- La estrategia de despliegue debe ser por fases, priorizando territorios con mejor infraestructura
- El diseño offline-first es **obligatorio**, no opcional
- La energía solar es necesaria en territorios sin red eléctrica estable

### 8.2 Estrategia de Despliegue por Fases

| Fase | Territorio | Conectividad | Justificación |
|------|-----------|-------------|---------------|
| Piloto 1 | Guatuso / Quitirrisí | 3G+ / WiFi | Mejor infraestructura, accesible |
| Piloto 2 | Buenos Aires (Brunca/Térraba) | 3G parcial | Complejidad intermedia |
| Expansión | Talamanca (Bribri/Cabécar) | 2G/3G irregular | Mayor población indígena |
| Avanzado | Chirripó / Nairi Awari | Sin cobertura | Requiere mesh + solar |

---

## 9. Épica Transversal y User Stories

Se creó la épica [[EPIC-TRANS]] que agrupa las preocupaciones cross-cutting del sistema:
- RF-TRANS-01: Sincronización offline/online bidireccional
- RF-TRANS-02: Internacionalización con selección de idioma
- RF-TRANS-03: Gobernanza cultural de datos

### 9.1 User Stories para Sprint-03→05

| Historia | Módulo | SP | Sprint | Responsable |
|----------|--------|----|--------|-------------|
| [[US-TRANS-01]] — Sync offline/online | Transversal | 8 | Sprint-03 | Geovanny |
| [[US-TRANS-02]] — Interfaz multilingüe | Transversal | 5 | Sprint-03 | Elkin |
| [[US-EDU-04]] — Motor práctica educativa | EDU | 5 | Sprint-04 | Geovanny |
| [[US-EDU-05]] — Seguimiento académico | EDU | 3 | Sprint-04 | Santiago |
| [[US-SAB-03]] — Búsqueda de saberes | SAB | 3 | Sprint-04 | Elkin |
| [[US-SAL-03]] — Gestión de citas | SAL | 5 | Sprint-04 | Santiago |
| [[US-SAL-05]] — Alertas clínicas | SAL | 3 | Sprint-05 | Geovanny |

**Total:** 32 story points distribuidos en 3 sprints.

---

## 10. Planificación de Sprints

| Sprint | Período | Objetivo | Estado |
|--------|---------|----------|--------|
| Sprint-03 | Abr 01 – Abr 30 | Piloto EDU + sync offline + i18n | Planificado |
| Sprint-04 | May 01 – May 31 | Módulos SAB + SAL + motor educativo | Planificado |
| Sprint-05 | Jun 01 – Jun 30 | Integración, testing, despliegue piloto | Planificado |

Detalle: [[Sprint-03-Planning]], [[Sprint-04-Planning]], [[Sprint-05-Planning]]

---

## 11. Sprint-02 Review

> Documento completo: [[05-Sprints/Sprint-02/Sprint-02-Review]]

### Resumen
- **Objetivo cumplido parcialmente:** Toda la especificación y planificación de diseño fue completada. La ejecución visual (diagramas Mermaid, wireframes Excalidraw) queda como carry-over.
- **ADR-008 y ADR-009 aprobados** como propuestas formales de stack y gobernanza.
- **7 user stories creadas** para Sprint-03→05 con 32 SP totales.
- **Investigación de conectividad territorial** completada con estrategia de despliegue por fases.

---

## 12. Decisiones Arquitectónicas

| ADR | Decisión | Estado | Impacto |
|-----|---------|--------|---------|
| [[ADR-008]] | Stack: PWA (React + PouchDB + i18next) | Propuesto | Alto |
| [[ADR-009]] | Gobernanza: CARE + 4 niveles + consentimiento | Propuesto | Alto |

Decisiones anteriores vigentes: [[ADR-001]] a [[ADR-007]] (ver [[01-Proyecto/Decisiones/Decisiones]])

---

## 13. Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Conectividad insuficiente en piloto | Alta | Alto | Despliegue por fases, servidores RPi locales |
| Traducciones incompletas lenguas indígenas | Media | Alto | Estructura i18n lista, contenido incremental |
| Resistencia comunitaria a digitalización | Baja | Alto | Protocolo CARE, consentimiento, validación con líderes |
| PouchDB/CouchDB integración compleja | Media | Medio | Spike técnico semana 1 Sprint-03 |
| Carry-over de Sprint-02 consume capacidad | Alta | Medio | Priorizar diagramas en primera semana |

---

## 14. Próximos Pasos

1. **Ejecutar diagramas C4 y ER** en Mermaid (carry-over Sprint-02)
2. **Diseñar wireframes** en Excalidraw por módulo
3. **Completar instrumentos de validación** y coordinar entrevistas de campo
4. **Iniciar implementación Sprint-03:** sync PouchDB/CouchDB + i18n
5. **Desplegar ambiente de desarrollo** en Raspberry Pi
6. **Sincronizar con Jira:** crear issues para user stories y EPIC-TRANS

---

## Referencias

- [[01-Proyecto/Charter|Charter del Proyecto]]
- [[01-Proyecto/Alcance|Alcance]]
- [[04-Arquitectura/Visión General|Arquitectura General]]
- [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]]
- [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa de Territorios]]
- [[03-Requerimientos/_RTM|Matriz de Trazabilidad]]

---

*Documento generado el 2026-03-26 · Equipo Raíces Vivas · CENFOTEC*
