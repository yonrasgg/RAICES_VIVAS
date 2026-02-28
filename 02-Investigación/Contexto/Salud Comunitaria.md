---
type: context
title: "Contexto — Salud Comunitaria"
module: salud
project: raices-vivas
status: draft
created: 2026-02-27
updated: 2026-02-27
tags:
  - investigación
  - contexto
  - modulo/sal
banner_src: "08-Recursos/Imágenes/cover-salud.png"
banner_src_y: 0.40
---

# Contexto — Salud Comunitaria

## Situación Actual (AS-IS)

### Problemática Central

La atención de salud en territorios indígenas enfrenta **fragmentación y discontinuidad** por:

- **Fragmentación de información:** Datos de pacientes dispersos en distintos puntos de atención
- **Falta de historial accesible:** El personal de salud no tiene continuidad entre visitas
- **Dificultad para coordinar:** Citas, brigadas y campañas preventivas sin herramienta de gestión
- **Pérdida de seguimiento en crónicos:** Pacientes con diabetes, hipertensión, etc. sin alertas
- **Conectividad limitada:** Las brigadas operan sin internet en la mayoría de territorios

### Actores Clave

| Actor | Rol | Dolor principal |
|-------|-----|----------------|
| Personal de salud | Atención primaria, brigadas | Sin continuidad de datos, sin alertas |
| Paciente | Receptor de atención | Repetir información en cada visita |
| CCSS/EBAIS | Institucional | Baja cobertura en zonas remotas |

### Consideraciones de Privacidad

- Los datos médicos son **altamente sensibles** y requieren:
  - Control de acceso por roles
  - Cifrado de datos
  - Auditoría de accesos (quién consultó qué y cuándo)
  - Cumplimiento con principios de privacidad de datos de salud

## Necesidades Identificadas

1. **Registro básico de pacientes** con ID interno (no cédula)
2. **Historial médico accesible** offline para continuidad
3. **Programación de citas y brigadas** con coordinación
4. **Alertas de seguimiento** para condiciones crónicas
5. **Privacidad estricta** con roles y auditoría

## Requerimientos Derivados

- [[RF-SAL-01]]: Registro de pacientes
- [[RF-SAL-02]]: Historial médico básico
- [[RF-SAL-03]]: Programación de citas
- [[RF-SAL-04]]: Gestión de brigadas/campañas
- [[RF-SAL-05]]: Alertas de seguimiento

## Fuentes

- Entrevistas con personal de salud (pendiente)
- Documentación institucional CCSS
