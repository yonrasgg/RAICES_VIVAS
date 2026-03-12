# Diagrama de Modelado de Requerimientos — Módulo SAL (Salud Comunitaria)

```mermaid
requirementDiagram

    requirement RF_SAL_01 {
        id: RF-SAL-01
        text: Registro de pacientes — ID interno, nombre, edad, territorio, contacto
        risk: low
        verifymethod: test
    }

    requirement RF_SAL_02 {
        id: RF-SAL-02
        text: Historial médico básico — condiciones crónicas, alergias, medicación, notas de visita
        risk: medium
        verifymethod: test
    }

    requirement RF_SAL_03 {
        id: RF-SAL-03
        text: Programación de citas — fecha, tipo de atención, lugar, responsable
        risk: low
        verifymethod: test
    }

    requirement RF_SAL_04 {
        id: RF-SAL-04
        text: Gestión de brigadas/campañas — vacunación, tamizaje, charlas, población objetivo
        risk: low
        verifymethod: demonstration
    }

    requirement RF_SAL_05 {
        id: RF-SAL-05
        text: Alertas de seguimiento — pacientes crónicos, periodicidad configurable
        risk: medium
        verifymethod: test
    }

    functionalRequirement RF_TRANS_01 {
        id: RF-TRANS-01
        text: Operación offline + sincronización automática
        risk: high
        verifymethod: test
    }

    functionalRequirement RF_TRANS_02 {
        id: RF-TRANS-02
        text: Multilingüismo — UI bilingüe, contenido etiquetado por idioma
        risk: medium
        verifymethod: inspection
    }

    functionalRequirement RF_TRANS_03 {
        id: RF-TRANS-03
        text: Gobernanza cultural — roles y permisos configurables por comunidad
        risk: high
        verifymethod: demonstration
    }

    performanceRequirement RNF_01 {
        id: RNF-01
        text: Rendimiento — Tiempo de respuesta menor a 3 segundos
        risk: low
        verifymethod: test
    }

    requirement RNF_02 {
        id: RNF-02
        text: Confidencialidad — Cifrado de datos médicos, acceso restringido
        risk: high
        verifymethod: inspection
    }

    performanceRequirement RNF_03 {
        id: RNF-03
        text: Usabilidad — Interfaz para alfabetización digital básica
        risk: medium
        verifymethod: demonstration
    }

    requirement RNF_04 {
        id: RNF-04
        text: Compatibilidad — Funciona en Android 8+, Chrome, Firefox
        risk: low
        verifymethod: test
    }

    element Personal_Salud {
        type: actor
        docRef: Stakeholders
    }

    element Paciente {
        type: actor
        docRef: Stakeholders
    }

    element Admin_Comunitario {
        type: actor
        docRef: Stakeholders
    }

    element Mod_Registro {
        type: component
        docRef: WBS RV-3.1
    }

    element Mod_Citas {
        type: component
        docRef: WBS RV-3.2
    }

    element Mod_Alertas {
        type: component
        docRef: WBS RV-3.3
    }

    element Motor_Sync {
        type: component
        docRef: RF-TRANS-01
    }

    element Motor_i18n {
        type: component
        docRef: RF-TRANS-02
    }

    element Motor_RBAC {
        type: component
        docRef: RF-TRANS-03
    }

    %% ── Derivaciones funcionales ──
    RF_SAL_02 - derives -> RF_SAL_01
    RF_SAL_03 - derives -> RF_SAL_01
    RF_SAL_05 - derives -> RF_SAL_02
    RF_SAL_04 - derives -> RF_SAL_03

    %% ── Transversales que refinan SAL ──
    RF_SAL_01 - refines -> RF_TRANS_01
    RF_SAL_02 - refines -> RF_TRANS_01
    RF_SAL_01 - refines -> RF_TRANS_02
    RF_SAL_02 - refines -> RNF_02

    %% ── Satisfacción por componentes ──
    Mod_Registro - satisfies -> RF_SAL_01
    Mod_Registro - satisfies -> RF_SAL_02
    Mod_Citas - satisfies -> RF_SAL_03
    Mod_Citas - satisfies -> RF_SAL_04
    Mod_Alertas - satisfies -> RF_SAL_05
    Motor_Sync - satisfies -> RF_TRANS_01
    Motor_i18n - satisfies -> RF_TRANS_02
    Motor_RBAC - satisfies -> RF_TRANS_03

    %% ── Trazabilidad NF ──
    Mod_Registro - satisfies -> RNF_01
    Mod_Registro - satisfies -> RNF_02
    Mod_Citas - satisfies -> RNF_03
    Mod_Alertas - satisfies -> RNF_04

    %% ── Actores ──
    Personal_Salud - traces -> RF_SAL_01
    Personal_Salud - traces -> RF_SAL_02
    Personal_Salud - traces -> RF_SAL_03
    Personal_Salud - traces -> RF_SAL_04
    Personal_Salud - traces -> RF_SAL_05
    Paciente - traces -> RF_SAL_03
    Admin_Comunitario - traces -> RF_TRANS_03
```

## Leyenda

| Relación | Significado |
|----------|-------------|
| `derives` | El requerimiento hijo se deriva del padre (necesita que exista) |
| `refines` | El RF refina/implementa un requerimiento transversal o NF |
| `satisfies` | El componente satisface el requerimiento |
| `traces` | El actor es el origen/beneficiario del requerimiento |

## Resumen de Requerimientos SAL

| ID | Título | Prioridad (MoSCoW) | WBS | Componente |
|----|--------|---------------------|-----|------------|
| RF-SAL-01 | Registro de pacientes | **Must** | RV-3.1 | Mod_Registro |
| RF-SAL-02 | Historial médico básico | **Must** | RV-3.1 | Mod_Registro |
| RF-SAL-03 | Programación de citas | **Should** | RV-3.2 | Mod_Citas |
| RF-SAL-04 | Gestión de brigadas/campañas | **Could** | RV-3.2 | Mod_Citas |
| RF-SAL-05 | Alertas de seguimiento | **Should** | RV-3.3 | Mod_Alertas |

### Transversales que impactan SAL

| ID | Título | Riesgo |
|----|--------|--------|
| RF-TRANS-01 | Offline + sync | Alto — conectividad limitada en territorios |
| RF-TRANS-02 | Multilingüismo | Medio — UI bilingüe para personal y pacientes |
| RF-TRANS-03 | Gobernanza cultural | Alto — datos médicos requieren control comunitario |
| RNF-02 | Confidencialidad | Alto — datos médicos sensibles, cifrado obligatorio |
