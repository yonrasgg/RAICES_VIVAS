---
type: document
title: "Visión General de Arquitectura"
project: raices-vivas
status: draft
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - arquitectura
---

# Visión General de Arquitectura — Raíces Vivas

## Diagrama de Contexto (C4 - Nivel 1)

```mermaid
graph TB
    subgraph Usuarios["👥 Usuarios"]
        DOC["👩‍🏫 Docente Comunitario"]
        EST["🎓 Estudiante"]
        LID["🏛️ Líder Comunal / Admin"]
        SAL["🏥 Personal de Salud"]
        POR["👴 Portador de Saber"]
    end
    
    RV["🌿 Raíces Vivas<br/>Sistema Integral"]
    
    DOC -->|Gestiona contenidos,<br/>registra estudiantes| RV
    EST -->|Accede materiales,<br/>practica ejercicios| RV
    LID -->|Administra permisos,<br/>controla gobernanza| RV
    SAL -->|Registra pacientes,<br/>programa citas| RV
    POR -->|Documenta saberes<br/>con consentimiento| RV
    
    subgraph Externos["🌐 Sistemas Externos"]
        MEP["📋 MEP<br/>(referencia curricular)"]
        CCSS["🏥 CCSS<br/>(referencia salud)"]
        SYNC["☁️ Servicio de Sync<br/>(offline → online)"]
    end
    
    RV -.->|Alineación curricular| MEP
    RV -.->|Estándares de salud| CCSS
    RV <-->|Sincronización| SYNC
```

## Diagrama de Módulos (C4 - Nivel 2)

```mermaid
graph TB
    subgraph RV["🌿 Raíces Vivas"]
        EDU["📚 Módulo Educativo<br/>(EDU)"]
        SAB["🏛️ Módulo Saberes<br/>Ancestrales (SAB)"]
        SAL_M["🏥 Módulo Salud<br/>Comunitaria (SAL)"]
        
        subgraph CROSS["⚙️ Servicios Transversales"]
            AUTH["🔐 Autenticación<br/>y Roles"]
            SYNC["🔄 Sincronización<br/>Offline/Online"]
            I18N["🌍 Motor<br/>Multilingüe"]
            AUDIT["📋 Auditoría<br/>y Logs"]
        end
    end
    
    EDU --> AUTH
    EDU --> SYNC
    EDU --> I18N
    SAB --> AUTH
    SAB --> SYNC
    SAB --> I18N
    SAB --> AUDIT
    SAL_M --> AUTH
    SAL_M --> SYNC
    SAL_M --> AUDIT
```

## Principios de Arquitectura

1. **Modularidad:** Cada módulo (EDU, SAB, SAL) es independiente y puede desarrollarse/desplegarse por separado
2. **Offline-first:** El sistema funciona sin conexión; la sincronización es eventual
3. **Control comunitario:** La gobernanza de datos es configurable por comunidad
4. **Ligereza:** Compatible con dispositivos de gama media-baja (Android + navegadores modernos)
5. **Multilingüe nativo:** Tanto la UI como los contenidos soportan español + lenguas indígenas

## Stack Tecnológico

> Pendiente de definición formal → Ver [[Stack Tecnológico]] o [[ADR-001-stack-tecnologico]]

## Notas

- Diagrama de despliegue: pendiente para Sprint de implementación
- Modelo de datos (ER): ver [[Modelo de Datos]]
