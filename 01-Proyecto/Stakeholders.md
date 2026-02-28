---
type: document
title: "Registro de Stakeholders — Raíces Vivas"
project: raices-vivas
status: draft
created: 2026-02-27
updated: 2026-02-27
tags:
  - proyecto
  - stakeholders
---

# Registro de Stakeholders — Raíces Vivas

## Actores del Sistema (Usuarios Directos)

| Actor | Rol | Módulo | Necesidades Clave | Nivel de Influencia |
|-------|-----|--------|-------------------|-------------------|
| **Docente comunitario** | Crea contenido, registra estudiantes, da seguimiento | EDU | Materiales bilingües, ejercicios de práctica, modo offline | Alta |
| **Estudiante** | Accede materiales, practica ejercicios | EDU | Contenido en su lengua, práctica para pruebas nacionales | Media |
| **Portador de saber** | Documenta conocimiento ancestral | SAB | Registro seguro, consentimiento, control de acceso | Alta |
| **Administrador comunitario** | Gestiona permisos, gobernanza cultural | SAB | Roles configurables, niveles de acceso, auditoría | Muy Alta |
| **Líder comunal** | Aprueba uso del sistema, define políticas | SAB/Transversal | Gobernanza, respeto cultural, control comunitario | Muy Alta |
| **Personal de salud** | Registra pacientes, programa citas, alertas | SAL | Historial médico, citas, alertas, privacidad | Alta |

## Actores Secundarios (Indirectos)

| Actor | Rol | Interés | Relación con el Sistema |
|-------|-----|---------|------------------------|
| **Familias / cuidadores** | Soporte a estudiantes y pacientes | Acceso a información relevante | Usuarios indirectos |
| **MEP** | Ente rector educativo | Alineación curricular | Referencia normativa |
| **CCSS / MINSA** | Salud pública | Estándares de salud | Referencia normativa |
| **Profesor del curso** | Evaluador académico | Calidad de entregables | Stakeholder académico |

## Matriz Poder/Interés

```mermaid
quadrantChart
    title Stakeholders - Poder vs Interés
    x-axis Bajo Interés --> Alto Interés
    y-axis Bajo Poder --> Alto Poder
    quadrant-1 Gestionar de cerca
    quadrant-2 Mantener satisfecho
    quadrant-3 Monitorear
    quadrant-4 Mantener informado
    Líder comunal: [0.8, 0.9]
    Admin comunitario: [0.85, 0.75]
    Docente: [0.9, 0.6]
    Personal salud: [0.85, 0.55]
    Portador saber: [0.7, 0.7]
    Estudiante: [0.75, 0.3]
    MEP: [0.3, 0.8]
    CCSS: [0.25, 0.7]
    Familia: [0.5, 0.2]
    Profesor curso: [0.6, 0.6]
```
