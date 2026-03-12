---
type: document
title: "Modelo de Datos — Raíces Vivas"
project: raices-vivas
status: draft
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.42
tags:
  - arquitectura
  - modelo-datos
---

# Modelo de Datos — Raíces Vivas

> Modelo conceptual inicial derivado de los requerimientos funcionales del Avance 1.  
> Se refinará durante la fase de diseño detallado (Avance 2).

## Diagrama ER — Módulo Educativo (EDU)

```mermaid
erDiagram
    DOCENTE {
        int id PK
        string nombre
        string territorio
        string rol
        string contacto
        string lengua_dominante
        string nivel_academico
        boolean activo
    }
    
    ESTUDIANTE {
        int id PK
        string nombre
        string nivel_educativo
        string lengua_principal
        string centro_educativo
        string territorio
    }
    
    MATERIAL_EDUCATIVO {
        int id PK
        string titulo
        string idioma
        string nivel
        string tema
        string formato
        string asignatura
        string competencia
    }
    
    EJERCICIO {
        int id PK
        string tema
        string nivel
        string tipo_item
        int material_id FK
    }
    
    INTENTO {
        int id PK
        int estudiante_id FK
        int ejercicio_id FK
        boolean correcto
        datetime fecha
    }
    
    DOCENTE ||--o{ MATERIAL_EDUCATIVO : "crea/gestiona"
    ESTUDIANTE ||--o{ INTENTO : "realiza"
    EJERCICIO ||--o{ INTENTO : "tiene"
    MATERIAL_EDUCATIVO ||--o{ EJERCICIO : "genera"
```

## Diagrama ER — Módulo Saberes Ancestrales (SAB)

```mermaid
erDiagram
    SABER {
        int id PK
        string titulo
        string categoria
        string formato
        string territorio
        string descripcion
        string contexto_uso
        string nivel_acceso
        boolean activo
        datetime fecha_registro
    }
    
    CATEGORIA_SABER {
        int id PK
        string nombre
        string descripcion
    }
    
    CONSENTIMIENTO {
        int id PK
        int saber_id FK
        string responsable
        datetime fecha
        string nivel_acceso_autorizado
        boolean confirmado
    }
    
    ROL_COMUNITARIO {
        int id PK
        string nombre
        string permisos
    }
    
    SABER }o--|| CATEGORIA_SABER : "pertenece a"
    SABER ||--o{ CONSENTIMIENTO : "requiere"
    ROL_COMUNITARIO ||--o{ SABER : "accede según nivel"
```

## Diagrama ER — Módulo Salud (SAL)

```mermaid
erDiagram
    PACIENTE {
        int id PK
        string id_interno
        string nombre
        int edad
        string territorio
        string contacto
    }
    
    HISTORIAL_MEDICO {
        int id PK
        int paciente_id FK
        string condiciones_cronicas
        string alergias
        string medicacion
        text notas_visita
        datetime fecha
        string responsable
    }
    
    CITA {
        int id PK
        int paciente_id FK
        datetime fecha
        string tipo
        string lugar
        string responsable
    }
    
    CAMPANA {
        int id PK
        string nombre
        string tipo
        datetime fecha
        string poblacion_objetivo
    }
    
    ALERTA_SEGUIMIENTO {
        int id PK
        int paciente_id FK
        string condicion
        string periodicidad
        datetime proxima_fecha
        boolean activa
    }
    
    PACIENTE ||--o{ HISTORIAL_MEDICO : "tiene"
    PACIENTE ||--o{ CITA : "agenda"
    PACIENTE ||--o{ ALERTA_SEGUIMIENTO : "monitorea"
    CAMPANA ||--o{ PACIENTE : "incluye"
```

## Entidades Transversales

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre
        string email
        string rol
        string territorio
        string idioma_preferido
    }
    
    ROL {
        int id PK
        string nombre
        string permisos
        string modulo
    }
    
    LOG_AUDITORIA {
        int id PK
        int usuario_id FK
        string accion
        string recurso
        datetime fecha
        string ip
    }
    
    USUARIO }o--|| ROL : "tiene"
    USUARIO ||--o{ LOG_AUDITORIA : "genera"
```

## Notas

- Los diagramas son **conceptuales** — se refinarán con tipos de datos específicos y constraints en Avance 2
- El modelo offline-sync requiere campos adicionales: `sync_status`, `last_synced`, `conflict_resolution`
- Los datos médicos requieren cifrado at-rest (definido en [[RNF-02-confidencialidad]])
