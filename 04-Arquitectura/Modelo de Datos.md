---
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
---
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

> Modelo relacional detallado derivado de los 23 requerimientos funcionales (RF-EDU-01..07, RF-SAB-01..07, RF-SAL-01..06, RF-TRANS-01..03) y los 4 requerimientos no funcionales (RNF-01..04).  
> Cada entidad incluye campos de sincronización offline-first (`sync_status`, `last_synced`, `device_id`) requeridos por RF-TRANS-01.  
> Los datos médicos (módulo SAL) requieren cifrado AES-256 en reposo (RNF-02).

---

## Diagrama ER — Entidades Transversales (TRANS)

> **Fuente:** RF-TRANS-01 (sync), RF-TRANS-02 (i18n), RF-TRANS-03 (gobernanza), RNF-02 (auditoría)

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre "NOT NULL"
        string email "UNIQUE"
        string password_hash "NOT NULL"
        int rol_id FK
        int pueblo_id FK
        int comunidad_id FK
        string idioma_preferido "DEFAULT 'es'"
        boolean activo "DEFAULT true"
        datetime created_at
        datetime updated_at
        string sync_status "DEFAULT 'pending'"
        datetime last_synced
        string device_id
    }

    PUEBLO {
        int id PK
        string nombre "NOT NULL UNIQUE"
        string territorio
        string idiomas "JSON array"
        string descripcion
    }

    COMUNIDAD {
        int id PK
        string nombre "NOT NULL"
        int pueblo_id FK "NOT NULL"
        string ubicacion
        string contacto
        int admin_comunitario_id FK
    }

    ROL {
        int id PK
        string nombre "NOT NULL UNIQUE"
        string descripcion
        string modulo "EDU|SAB|SAL|TRANS"
        string permisos "JSON array"
    }

    PERMISO {
        int id PK
        string nombre "NOT NULL"
        string modulo "NOT NULL"
        string accion "crear|leer|editar|eliminar"
        string nivel_acceso "publico|comunitario|restringido|ceremonial"
    }

    ROL_PERMISO {
        int rol_id FK "PK"
        int permiso_id FK "PK"
    }

    IDIOMA {
        int id PK
        string codigo "UNIQUE — es|bri|cab|ngb|mal|bru"
        string nombre "Español, Bribri, etc."
        string nombre_nativo
        boolean activo "DEFAULT true"
    }

    LOG_AUDITORIA {
        int id PK
        int usuario_id FK
        string accion "NOT NULL"
        string entidad_tipo "NOT NULL"
        int entidad_id
        string detalle "JSON"
        string ip
        string device_id
        datetime fecha "NOT NULL — INMUTABLE"
        string resultado "exitoso|denegado"
    }

    SINCRONIZACION {
        int id PK
        string device_id "NOT NULL"
        datetime fecha_sync
        string estado "completado|parcial|fallido"
        int registros_enviados
        int registros_recibidos
        int conflictos_detectados
        int conflictos_resueltos
        string modulo "EDU|SAB|SAL|ALL"
    }

    USUARIO }o--|| ROL : "tiene"
    USUARIO }o--|| PUEBLO : "pertenece a"
    USUARIO }o--|| COMUNIDAD : "vive en"
    COMUNIDAD }o--|| PUEBLO : "parte de"
    ROL ||--o{ ROL_PERMISO : "asigna"
    PERMISO ||--o{ ROL_PERMISO : "otorgado en"
    USUARIO ||--o{ LOG_AUDITORIA : "genera"
    USUARIO ||--o{ SINCRONIZACION : "ejecuta"
```

---

## Diagrama ER — Módulo Educativo (EDU)

> **Fuente:** RF-EDU-01 (docentes), RF-EDU-02 (estudiantes), RF-EDU-03 (materiales), RF-EDU-04 (organización), RF-EDU-05 (ejercicios), RF-EDU-06 (progreso), RF-EDU-07 (compartir inter-comunitario)

```mermaid
erDiagram
    DOCENTE {
        int id PK
        int usuario_id FK "NOT NULL UNIQUE"
        string nombre "NOT NULL"
        string cedula "UNIQUE — 9 dígitos"
        string territorio "NOT NULL"
        int centro_educativo_id FK
        string lengua_dominante "NOT NULL"
        string lenguas_adicionales "JSON array"
        string nivel_academico
        string grado
        boolean activo "DEFAULT true"
        datetime fecha_registro
        string sync_status
        datetime last_synced
        string device_id
    }

    ESTUDIANTE {
        int id PK
        string nombre "NOT NULL"
        string nivel_educativo "NOT NULL"
        string lengua_principal "NOT NULL"
        int centro_educativo_id FK
        string territorio "NOT NULL"
        date fecha_nacimiento
        int docente_id FK
        boolean activo "DEFAULT true"
        datetime fecha_registro
        string sync_status
        datetime last_synced
        string device_id
    }

    CENTRO_EDUCATIVO {
        int id PK
        string nombre "NOT NULL"
        string territorio "NOT NULL"
        int comunidad_id FK
        string circuito_educativo
        string contacto
    }

    ASIGNATURA {
        int id PK
        string nombre "NOT NULL"
        string descripcion
        string nivel_educativo
    }

    COMPETENCIA {
        int id PK
        string nombre "NOT NULL"
        string descripcion
        int asignatura_id FK "NOT NULL"
    }

    MATERIAL_EDUCATIVO {
        int id PK
        string titulo "NOT NULL"
        string descripcion
        string idioma "NOT NULL — es|bri|cab|ngb"
        string nivel_academico "NOT NULL"
        string formato "NOT NULL — texto|audio|video|imagen"
        string contenido_url "NOT NULL"
        int tamano_bytes
        int docente_id FK "NOT NULL"
        int asignatura_id FK
        int competencia_id FK
        int centro_educativo_id FK
        int material_vinculado_id FK "versión en otro idioma"
        boolean compartido "DEFAULT false"
        datetime fecha_creacion
        string sync_status
        datetime last_synced
        string device_id
    }

    MATERIAL_COMPARTIDO {
        int id PK
        int material_id FK "NOT NULL"
        int pueblo_id FK "NOT NULL"
        int comunidad_origen_id FK "NOT NULL"
        int docente_origen_id FK "NOT NULL"
        string permisos "lectura|lectura_adaptacion"
        string nota_contexto
        datetime fecha_publicacion
        string sync_status
        datetime last_synced
    }

    EJERCICIO {
        int id PK
        string titulo "NOT NULL"
        string tema "NOT NULL"
        string nivel_academico
        string tipo_item "opcion_multiple|completar|asociar|abierta"
        string contenido "JSON — pregunta + opciones"
        int material_id FK
        int asignatura_id FK
        datetime fecha_creacion
        string sync_status
        datetime last_synced
        string device_id
    }

    INTENTO {
        int id PK
        int estudiante_id FK "NOT NULL"
        int ejercicio_id FK "NOT NULL"
        string respuesta
        boolean correcto "NOT NULL"
        int tiempo_segundos
        datetime fecha "NOT NULL"
        string sync_status
        datetime last_synced
        string device_id
    }

    PROGRESO {
        int id PK
        int estudiante_id FK "NOT NULL"
        string tema "NOT NULL"
        string periodo "semanal|mensual"
        float porcentaje_aciertos
        int total_intentos
        int intentos_correctos
        date fecha_inicio_periodo
        date fecha_fin_periodo
        datetime calculado_en
    }

    DOCENTE ||--o{ MATERIAL_EDUCATIVO : "crea"
    DOCENTE ||--o{ ESTUDIANTE : "supervisa"
    DOCENTE }o--|| CENTRO_EDUCATIVO : "trabaja en"
    ESTUDIANTE }o--|| CENTRO_EDUCATIVO : "estudia en"
    ESTUDIANTE ||--o{ INTENTO : "realiza"
    ESTUDIANTE ||--o{ PROGRESO : "tiene"
    EJERCICIO ||--o{ INTENTO : "evaluado en"
    MATERIAL_EDUCATIVO ||--o{ EJERCICIO : "genera"
    MATERIAL_EDUCATIVO }o--o| ASIGNATURA : "pertenece a"
    MATERIAL_EDUCATIVO }o--o| COMPETENCIA : "alineado a"
    MATERIAL_EDUCATIVO }o--o| MATERIAL_EDUCATIVO : "versión bilingüe"
    MATERIAL_EDUCATIVO ||--o{ MATERIAL_COMPARTIDO : "publicado como"
    ASIGNATURA ||--o{ COMPETENCIA : "contiene"
    CENTRO_EDUCATIVO }o--|| COMUNIDAD : "ubicado en"
```

---

## Diagrama ER — Módulo Saberes Ancestrales (SAB)

> **Fuente:** RF-SAB-01 (registro), RF-SAB-02 (clasificación), RF-SAB-03 (búsqueda), RF-SAB-04 (acceso), RF-SAB-05 (consentimiento), RF-SAB-06 (revocación), RF-SAB-07 (auditoría)

```mermaid
erDiagram
    PORTADOR_SABER {
        int id PK
        int usuario_id FK "NOT NULL UNIQUE"
        string nombre "NOT NULL"
        int comunidad_id FK "NOT NULL"
        string especialidad "agricultura|medicina|artesanía|ritualidad"
        string lengua_principal
        boolean activo "DEFAULT true"
        datetime fecha_registro
    }

    CATEGORIA_SABER {
        int id PK
        string nombre "NOT NULL"
        string descripcion
        int pueblo_id FK "configurable por pueblo"
        boolean editable_por_admin "DEFAULT true"
    }

    SABER {
        int id PK
        string titulo "NOT NULL"
        string descripcion "NOT NULL"
        int categoria_id FK "NOT NULL"
        int portador_id FK "NOT NULL"
        int comunidad_id FK "NOT NULL"
        string territorio "NOT NULL"
        string formato "NOT NULL — texto|audio|video|imagen"
        string contenido_url
        int tamano_bytes
        string idioma "NOT NULL"
        string contexto_uso
        string nivel_acceso "NOT NULL — publico|comunitario|restringido|ceremonial"
        string etiquetas_culturales "JSON array"
        string estado "NOT NULL — borrador|publicado|restringido|revocado"
        boolean encriptado "DEFAULT false — true para restringido/ceremonial"
        boolean sincronizable "DEFAULT true — false para ceremonial"
        datetime fecha_registro
        datetime fecha_modificacion
        string sync_status
        datetime last_synced
        string device_id
    }

    CONSENTIMIENTO {
        int id PK
        int saber_id FK "NOT NULL"
        int portador_id FK "NOT NULL"
        int admin_id FK "NOT NULL — admin comunitario"
        string tipo "oral_grabado|escrito"
        string documento_url "consentimiento firmado o audio"
        string nivel_acceso_autorizado "NOT NULL"
        string estado "NOT NULL — pendiente|confirmado|revocado"
        datetime fecha_consentimiento "NOT NULL"
        datetime fecha_revocacion
        string motivo_revocacion
        string sync_status
        datetime last_synced
        string device_id
    }

    ROL_COMUNITARIO {
        int id PK
        string nombre "NOT NULL"
        int pueblo_id FK
        string permisos_acceso "JSON — niveles permitidos"
        string descripcion
        boolean editable_por_admin "DEFAULT true"
    }

    PERMISO_ACCESO_SABER {
        int id PK
        int rol_comunitario_id FK "NOT NULL"
        string nivel_acceso "NOT NULL"
        boolean puede_consultar "DEFAULT false"
        boolean puede_descargar "DEFAULT false"
        boolean puede_modificar "DEFAULT false"
    }

    HISTORIAL_NIVEL_ACCESO {
        int id PK
        int saber_id FK "NOT NULL"
        string nivel_anterior "NOT NULL"
        string nivel_nuevo "NOT NULL"
        int admin_id FK "NOT NULL"
        string justificacion "NOT NULL"
        string autoridad "Consejo|Awá|Asamblea"
        string referencia_acta
        date fecha_decision
        datetime fecha_cambio "NOT NULL — INMUTABLE"
    }

    REVOCACION {
        int id PK
        int saber_id FK "NOT NULL"
        int admin_id FK "NOT NULL"
        string motivo "NOT NULL — decision_comunitaria|solicitud_portador|apropiacion_indebida|otro"
        string justificacion "NOT NULL"
        string autoridad "NOT NULL — Consejo|Awá|Asamblea"
        string referencia_acta
        date fecha_decision
        boolean notificacion_portador "DEFAULT false"
        boolean cascada "DEFAULT false — revoca derivados"
        datetime fecha_revocacion "NOT NULL — INMUTABLE"
        string sync_status "prioridad_alta"
    }

    LOG_ACCESO_SABER {
        int id PK
        int saber_id FK "NOT NULL"
        int usuario_id FK "NOT NULL"
        string tipo_accion "NOT NULL — lectura|descarga|modificacion|subida|revocacion"
        string resultado "NOT NULL — exitoso|denegado"
        string detalle
        string ip
        string device_id
        datetime fecha "NOT NULL — INMUTABLE"
        boolean sincronizado_servidor "DEFAULT false"
    }

    PORTADOR_SABER ||--o{ SABER : "documenta"
    PORTADOR_SABER ||--o{ CONSENTIMIENTO : "otorga"
    SABER }o--|| CATEGORIA_SABER : "clasificado en"
    SABER ||--|| CONSENTIMIENTO : "requiere"
    SABER ||--o{ HISTORIAL_NIVEL_ACCESO : "cambios de nivel"
    SABER ||--o| REVOCACION : "puede ser revocado"
    SABER ||--o{ LOG_ACCESO_SABER : "registra acceso"
    ROL_COMUNITARIO ||--o{ PERMISO_ACCESO_SABER : "define permisos"
    CATEGORIA_SABER }o--|| PUEBLO : "específica de"
```

---

## Diagrama ER — Módulo Salud Comunitaria (SAL)

> **Fuente:** RF-SAL-01 (pacientes), RF-SAL-02 (historial), RF-SAL-03 (citas), RF-SAL-04 (brigadas), RF-SAL-05 (alertas), RF-SAL-06 (exportación EDUS). Todos los datos encriptados AES-256 (RNF-02).

```mermaid
erDiagram
    PACIENTE {
        int id PK
        string id_interno "UNIQUE — SAL-XXXX-YYYY"
        string nombre "NOT NULL — CIFRADO"
        date fecha_nacimiento "CIFRADO"
        string sexo
        int edad_calculada
        string territorio "NOT NULL"
        int comunidad_id FK "NOT NULL"
        string tipo_sangre
        string contacto "CIFRADO"
        string estado "activo|inactivo|fallecido"
        datetime fecha_registro "NOT NULL"
        string sync_status
        datetime last_synced
        string device_id
    }

    HISTORIAL_MEDICO {
        int id PK
        int paciente_id FK "NOT NULL"
        int responsable_id FK "NOT NULL — ATAP"
        datetime fecha_visita "NOT NULL"
        string motivo_consulta "NOT NULL — CIFRADO"
        string sintomas "CIFRADO"
        string diagnostico "CIFRADO"
        string tratamiento "CIFRADO"
        text notas "CIFRADO"
        boolean requiere_seguimiento "DEFAULT false"
        int numero_entrada "autoincremental por paciente"
        string sync_status
        datetime last_synced
        string device_id
    }

    CONDICION_CRONICA {
        int id PK
        int paciente_id FK "NOT NULL"
        string nombre "NOT NULL — CIFRADO"
        string descripcion "CIFRADO"
        date fecha_diagnostico
        boolean activa "DEFAULT true"
    }

    ALERGIA {
        int id PK
        int paciente_id FK "NOT NULL"
        string nombre "NOT NULL — CIFRADO"
        string severidad "leve|moderada|grave"
    }

    MEDICACION {
        int id PK
        int paciente_id FK "NOT NULL"
        string nombre_farmaco "NOT NULL — CIFRADO"
        string dosis "CIFRADO"
        string frecuencia
        date fecha_inicio
        date fecha_fin
        boolean activa "DEFAULT true"
    }

    CITA {
        int id PK
        int paciente_id FK "NOT NULL"
        int responsable_id FK "NOT NULL"
        datetime fecha "NOT NULL"
        string hora_inicio
        string hora_fin
        string tipo_atencion "consulta|control|seguimiento|emergencia"
        string lugar "NOT NULL"
        string estado "pendiente|realizada|cancelada|reprogramada"
        string notas
        string sync_status
        datetime last_synced
        string device_id
    }

    BRIGADA {
        int id PK
        string nombre "NOT NULL"
        int responsable_id FK "NOT NULL"
        string territorio "NOT NULL"
        date fecha_gira "NOT NULL"
        string tipo "vacunacion|tamizaje|charla|atencion_general"
        string poblacion_objetivo
        string estado "planificada|en_curso|completada"
        int pacientes_atendidos_count
        string sync_status
        datetime last_synced
        string device_id
    }

    BRIGADA_PARTICIPACION {
        int id PK
        int brigada_id FK "NOT NULL"
        int paciente_id FK "NOT NULL"
        string estado "pendiente|atendido|no_presente"
        datetime fecha_participacion
    }

    ALERTA_SEGUIMIENTO {
        int id PK
        int paciente_id FK "NOT NULL"
        int condicion_id FK
        int responsable_id FK "NOT NULL"
        string tipo_alerta "control_cronico|medicacion|vacunacion|otro"
        int periodicidad_dias "NOT NULL"
        date proxima_alerta "NOT NULL"
        boolean activa "DEFAULT true"
        string regla_configurada "JSON — condición y frecuencia"
        string sync_status
        datetime last_synced
        string device_id
    }

    EXPORTACION_EDUS {
        int id PK
        int paciente_id FK
        int brigada_id FK
        int responsable_id FK "NOT NULL"
        string formato "CSV|HL7_FHIR"
        datetime fecha_exportacion "NOT NULL"
        int registros_exportados
        string campos_mapeados "JSON"
        string campos_incompatibles "JSON"
        string archivo_url "CIFRADO"
        boolean cifrado "DEFAULT true"
        string hash_verificacion "SHA-256"
    }

    PACIENTE ||--o{ HISTORIAL_MEDICO : "tiene"
    PACIENTE ||--o{ CONDICION_CRONICA : "padece"
    PACIENTE ||--o{ ALERGIA : "tiene"
    PACIENTE ||--o{ MEDICACION : "toma"
    PACIENTE ||--o{ CITA : "agenda"
    PACIENTE ||--o{ ALERTA_SEGUIMIENTO : "monitorea"
    PACIENTE ||--o{ BRIGADA_PARTICIPACION : "participa en"
    PACIENTE ||--o{ EXPORTACION_EDUS : "exportado en"
    BRIGADA ||--o{ BRIGADA_PARTICIPACION : "incluye"
    BRIGADA ||--o{ EXPORTACION_EDUS : "genera"
    CONDICION_CRONICA ||--o{ ALERTA_SEGUIMIENTO : "desencadena"
    HISTORIAL_MEDICO }o--|| PACIENTE : "registrado para"
```

---

## Diagrama ER — Vista Integrada (Inter-Módulos)

> Relaciones entre entidades que cruzan módulos: USUARIO como eje central, COMUNIDAD/PUEBLO como contexto territorial y SINCRONIZACIÓN como mecanismo transversal.

```mermaid
erDiagram
    USUARIO ||--o| DOCENTE : "perfil EDU"
    USUARIO ||--o| PORTADOR_SABER : "perfil SAB"
    USUARIO ||--o| PACIENTE : "perfil SAL (si aplica)"
    USUARIO }o--|| ROL : "asignado"
    USUARIO }o--|| COMUNIDAD : "pertenece"
    COMUNIDAD }o--|| PUEBLO : "parte de"
    PUEBLO ||--o{ CATEGORIA_SABER : "define categorías"
    PUEBLO ||--o{ ROL_COMUNITARIO : "define roles"
    PUEBLO ||--o{ MATERIAL_COMPARTIDO : "repositorio"
    COMUNIDAD ||--o{ CENTRO_EDUCATIVO : "tiene"
    COMUNIDAD ||--o{ SABER : "origina"
    COMUNIDAD ||--o{ BRIGADA : "recibe"

    USUARIO {
        int id PK
        string nombre
        int rol_id FK
        int comunidad_id FK
    }
    DOCENTE {
        int id PK
        int usuario_id FK
    }
    PORTADOR_SABER {
        int id PK
        int usuario_id FK
    }
    COMUNIDAD {
        int id PK
        int pueblo_id FK
    }
    PUEBLO {
        int id PK
        string nombre
    }
```

---

## Notas Técnicas

### Campos de Sincronización (RF-TRANS-01)
Todas las entidades de datos incluyen:
- `sync_status`: `pending` | `synced` | `conflict` | `local_only` (ceremonial)
- `last_synced`: datetime de última sincronización exitosa
- `device_id`: identificador del dispositivo donde se creó/modificó el registro

### Cifrado (RNF-02)
- **AES-256 en reposo:** Campos marcados como `CIFRADO` en módulo SAL
- **TLS 1.3 en tránsito:** Toda sincronización de datos médicos
- **Saberes restringidos/ceremoniales:** Encriptados localmente (campo `encriptado = true`)

### Inmutabilidad (RF-SAB-07)
- `LOG_AUDITORIA` y `LOG_ACCESO_SABER`: registros inmutables (no se permiten UPDATE ni DELETE)
- `REVOCACION` e `HISTORIAL_NIVEL_ACCESO`: timestamps inmutables

### Reglas de Negocio Implementadas en el Modelo
1. **Consentimiento obligatorio (RF-SAB-05):** `SABER.estado` no puede ser `publicado` sin un `CONSENTIMIENTO.estado = 'confirmado'` asociado
2. **Revocación prevalece (RF-SAB-06):** En conflicto de sincronización, la revocación siempre gana
3. **Ceremonial no sincroniza (RF-TRANS-01):** Saberes con `nivel_acceso = 'ceremonial'` tienen `sincronizable = false`
4. **Duplicado de paciente (RF-SAL-01):** Validación por `nombre + fecha_nacimiento + territorio` antes de crear
5. **Interacción medicamentosa (RF-SAL-02):** Verificación cruzada `MEDICACION.activa = true` al registrar nuevo tratamiento
