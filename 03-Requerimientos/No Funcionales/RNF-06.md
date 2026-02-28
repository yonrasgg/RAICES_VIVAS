---
id: RNF-06
type: requirement/non-functional
category: compatibilidad
wbs: RV-4.4
title: "Compatibilidad de dispositivo"
status: approved
priority: should
metric: "El sistema funciona en dispositivos Android gama media-baja y navegadores modernos sin requerir hardware especializado."
created: 2026-02-25
updated: 2026-02-27
tags:
  - requerimiento
  - no-funcional
  - transversal
  - prioridad/should
---

# RNF-06: Compatibilidad de dispositivo

## Descripción

El sistema debe funcionar correctamente en dispositivos de gama media-baja (Android 8+) y navegadores modernos, sin requerir hardware especializado.

## Justificación

En territorios indígenas los dispositivos disponibles son de gama baja. Exigir hardware de alto rendimiento excluye a la mayoría de usuarios.

## Métrica / Verificación

**Métrica:** Carga inicial en tiempo razonable. No requiere hardware especializado (GPS avanzado, NFC, etc.).

**Método de verificación:** Test de compatibilidad en al menos 3 dispositivos representativos.

## Impacto en Módulos

- [x] Educación (EDU)
- [x] Saberes Ancestrales (SAB)
- [x] Salud (SAL)

## Trazabilidad

- **Problema de origen:** Dispositivos de gama baja en territorios indígenas
- **WBS:** [[WBS#RV-4.4]]
- **Categoría:** Compatibilidad

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-25 | Creación inicial (Avance 1) | Equipo |
| 2026-02-27 | Migración a nota individual | Equipo |
