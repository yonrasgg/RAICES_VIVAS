---
type: document
title: "Raíces Vivas — Avance 2: Casos de Uso"
project: raices-vivas
avance: 2
sprint: Sprint-02
status: in-progress
tags:
  - entregable
  - avance-2
  - casos-de-uso
  - arquitectura
  - diseño
created: 2026-03-26
updated: 2026-03-26
banner_src: "08-Recursos/Imágenes/cover-entregables.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# Raíces Vivas — Avance 2: Casos de Uso

> **Curso:** Introducción a la Ingeniería de Software — CENFOTEC (SOFT-09, SCV7)
> **Docente:** Johnny Marin
> **Equipo:** Geovanny Alpízar (PM/Arquitecto), Elkin (Investigación/SAB), Santiago (QA/SAL)
> **Fecha de entrega:** 01 de abril de 2026
> **Sprint:** Sprint-02 (2026-02-28 → 2026-04-01)

---

## 1. Introducción

Este documento presenta el segundo avance del proyecto **Raíces Vivas**, un sistema integral de apoyo a comunidades indígenas de Costa Rica en tres ejes: educación intercultural bilingüe (EDU), preservación de saberes ancestrales (SAB) y salud comunitaria (SAL), con un módulo transversal (TRANS) que gestiona conectividad, multilingüismo y gobernanza cultural.

El presente avance se centra en el análisis de **casos de uso** del sistema: identificación de actores, documentación de 19 casos de uso (8 en formato expandido), diagrama UML y trazabilidad con los requerimientos funcionales establecidos en el Avance 1.

### 1.1 Estructura del Documento

| Sección | Contenido | Criterio de Rúbrica |
|---------|-----------|-------------------|
| §2 | Identificación y clasificación de actores | Criterio 1 (4 pts) |
| §3 | Lista general de 19 casos de uso | Criterio 2 (4 pts) |
| §4 | Documentación expandida de 8 casos de uso | Criterios 3-5 (12 pts) |
| §5 | Diagrama de casos de uso (UML) | Criterio 6 (4 pts) |
| §6 | Referencia cruzada RF ↔ CU | Criterio 7 (4 pts) |
| §7 | Conclusiones y recomendaciones | Criterio 8 (4 pts) |
| Anexo A | Contexto arquitectónico (C4, ER, stack) | Complementario |
| Anexo B | Contribuciones del equipo | Criterio 10 (4 pts) |

---

## 2. Identificación y Clasificación de Actores

El sistema Raíces Vivas interactúa con **10 actores humanos** y **4 sistemas externos**. Se clasifican en actores **primarios** (quienes inician casos de uso para lograr un objetivo directo) y **secundarios** (quienes participan reactivamente o proveen información complementaria).

### 2.1 Actores Primarios

| # | Actor | Descripción | Módulo(s) | Justificación |
|---|-------|-------------|-----------|---------------|
| 1 | **Docente comunitario** | Educador bilingüe que trabaja en centros educativos ubicados en territorios indígenas. Opera el módulo EDU: registra estudiantes, sube materiales didácticos bilingües, genera ejercicios de práctica y consulta el progreso académico. | EDU | Principal usuario operativo del módulo educativo; lidera el proceso de enseñanza-aprendizaje intercultural. |
| 2 | **Guía cultural / Portador de saber** | Persona reconocida por la comunidad como portadora de conocimientos ancestrales (agricultura, medicina, artesanía, ceremonial). Documenta saberes en formato multimedia (audio, video, texto) y gestiona su nivel de acceso. | SAB | Fuente primaria de conocimiento; sin su participación, el módulo SAB no tendría contenido. |
| 3 | **Auxiliar de salud (ATAP)** | Promotor de salud comunitario o Asistente Técnico de Atención Primaria del CCSS. Registra pacientes, gestiona historiales médicos, programa citas y coordina brigadas de salud en territorios. | SAL | Único perfil de salud con presencia permanente en territorios; opera el módulo SAL en campo. |
| 4 | **Administrador del sistema** | Responsable técnico de la plataforma. Gestiona usuarios, roles, configuración general, sincronización servidor central y monitoreo de auditoría. | TRANS | Garantiza la operación técnica y seguridad de toda la plataforma. |
| 5 | **Administrador comunitario** | Líder comunal designado que gestiona los niveles de acceso a saberes según la gobernanza cultural de su comunidad. Configura permisos CARE, aprueba/revoca consentimientos. | SAB, TRANS | Representa la autoridad de la comunidad sobre sus datos; requisito de los principios CARE y la Ley 6172. |

### 2.2 Actores Secundarios

| # | Actor | Descripción | Módulo(s) | Tipo de Interacción |
|---|-------|-------------|-----------|-------------------|
| 6 | **Estudiante** | Destinatario del contenido educativo (primaria y secundaria). Realiza ejercicios de práctica y consulta materiales. No administra contenido. | EDU | Consumidor de contenido; sujeto de seguimiento académico. |
| 7 | **Paciente / Miembro de comunidad** | Persona que recibe atención de salud. Proporciona información personal para su registro pero no opera el sistema directamente. | SAL | Proveedor de información personal; sujeto de expediente médico. |
| 8 | **Consejo de mayores** | Colectivo de autoridad comunitaria que autoriza cambios de nivel de acceso a contenido restringido o ceremonial. Interactúa a través del admin comunitario. | SAB | Autoridad intermedia para contenido de acceso restringido. |
| 9 | **Awá / Autoridad espiritual** | Máxima autoridad espiritual de la comunidad. Autoriza el acceso a contenido sagrado y ceremonial. Su participación es requerida por protocolo CARE para el nivel de acceso más alto. | SAB | Autoridad máxima para contenido ceremonial; veto sobre acceso espiritual. |
| 10 | **Traductor comunitario** | Hablante nativo que provee traducciones de la interfaz y contenido a lenguas indígenas (bribri, cabécar, ngäbere). No opera el sistema de forma regular. | TRANS | Proveedor de contenido lingüístico; interacción puntual durante sprints de i18n. |

### 2.3 Sistemas Externos (Actores No Humanos)

| # | Sistema | Interacción | Protocolo | Módulo |
|---|---------|-------------|-----------|--------|
| 11 | **CouchDB (servidor central)** | Recibe y distribuye datos sincronizados desde dispositivos PouchDB | HTTP/REST | TRANS |
| 12 | **Raspberry Pi (servidor local)** | Nodo de sincronización LAN en cada territorio; gateway entre dispositivos y servidor central | LAN / HTTP | TRANS |
| 13 | **MEP (Ministerio de Educación Pública)** | Fuente de planes de estudio y currículo nacional; importación de datos curriculares | CSV / REST | EDU |
| 14 | **CCSS / EBAIS** | Referencia de protocolos de salud y coordinación de brigadas; exportación futura de expedientes | Manual / PDF | SAL |

### 2.4 Diagrama Resumen: Actor ↔ Módulo

```mermaid
graph LR
    subgraph "Actores Primarios"
        DOC[👨‍🏫 Docente comunitario]
        GC[🧓 Guía cultural]
        AUX[🩺 Auxiliar de salud]
        ADM[⚙️ Admin del sistema]
        AC[🏛️ Admin comunitario]
    end

    subgraph "Módulos del Sistema"
        EDU[📚 EDU<br>Educación]
        SAB[🌿 SAB<br>Saberes]
        SAL[❤️ SAL<br>Salud]
        TRANS[🔄 TRANS<br>Transversal]
    end

    subgraph "Actores Secundarios"
        EST[📖 Estudiante]
        PAC[🧑 Paciente]
        CM[👥 Consejo mayores]
        AWA[🔮 Awá]
        TRAD[🗣️ Traductor]
    end

    DOC --> EDU
    GC --> SAB
    AUX --> SAL
    ADM --> TRANS
    AC --> SAB
    AC --> TRANS
    EST -.-> EDU
    PAC -.-> SAL
    CM -.-> SAB
    AWA -.-> SAB
    TRAD -.-> TRANS
```

---

## 3. Lista General de Casos de Uso

El sistema Raíces Vivas comprende **19 casos de uso** derivados de los 19 requerimientos funcionales aprobados. Se organizan por módulo y alineados con la priorización MoSCoW.

| # | ID | Caso de Uso | Módulo | RF | Actor Principal | Prioridad | Expandido |
|---|-----|-------------|--------|-----|-----------------|-----------|-----------|
| 1 | CU-EDU-01 | Registrar docente comunitario | EDU | RF-EDU-01 | Admin del sistema | Must | ✅ §4.1 |
| 2 | CU-EDU-02 | Registrar estudiante | EDU | RF-EDU-02 | Docente comunitario | Should | — |
| 3 | CU-EDU-03 | Cargar material educativo multimedia | EDU | RF-EDU-03 | Docente comunitario | Must | ✅ §4.2 |
| 4 | CU-EDU-04 | Organizar material por asignatura y competencia | EDU | RF-EDU-04 | Docente comunitario | Should | — |
| 5 | CU-EDU-05 | Realizar ejercicio de práctica | EDU | RF-EDU-05 | Estudiante | Should | — |
| 6 | CU-EDU-06 | Consultar progreso de estudiante | EDU | RF-EDU-06 | Docente comunitario | Could | — |
| 7 | CU-SAB-01 | Registrar saber ancestral multimedia | SAB | RF-SAB-01 | Guía cultural | Must | ✅ §4.3 |
| 8 | CU-SAB-02 | Clasificar saber por categoría | SAB | RF-SAB-02 | Admin comunitario | Should | — |
| 9 | CU-SAB-03 | Buscar saberes por filtros | SAB | RF-SAB-03 | Usuario autorizado | Should | — |
| 10 | CU-SAB-04 | Configurar restricción de acceso por autorización comunitaria | SAB | RF-SAB-04 | Admin comunitario | Must | ✅ §4.4 |
| 11 | CU-SAB-05 | Registrar consentimiento informado | SAB | RF-SAB-05 | Admin comunitario | Must | — |
| 12 | CU-SAL-01 | Registrar paciente con ID único | SAL | RF-SAL-01 | Auxiliar de salud | Must | ✅ §4.5 |
| 13 | CU-SAL-02 | Registrar historial médico básico | SAL | RF-SAL-02 | Auxiliar de salud | Must | ✅ §4.6 |
| 14 | CU-SAL-03 | Programar cita médica | SAL | RF-SAL-03 | Auxiliar de salud | Should | — |
| 15 | CU-SAL-04 | Gestionar brigada de salud | SAL | RF-SAL-04 | Auxiliar de salud | Could | — |
| 16 | CU-SAL-05 | Configurar alerta de seguimiento clínico | SAL | RF-SAL-05 | Auxiliar de salud | Should | — |
| 17 | CU-TRANS-01 | Sincronizar datos offline/online | TRANS | RF-TRANS-01 | Sistema / Usuario | Must | ✅ §4.7 |
| 18 | CU-TRANS-02 | Seleccionar idioma de interfaz | TRANS | RF-TRANS-02 | Usuario autenticado | Must | ✅ §4.8 |
| 19 | CU-TRANS-03 | Configurar gobernanza de datos comunitarios | TRANS | RF-TRANS-03 | Admin comunitario | Must | — |

**Resumen:** 19 casos de uso — 10 Must, 6 Should, 2 Could, 1 Won't (ninguno). Se documentan **8 en formato expandido** (todos Must), 2 por cada módulo principal.

---

## 4. Documentación Detallada de Casos de Uso

> Los 8 casos de uso documentados a continuación siguen el formato expandido con los 14 campos requeridos: caso de uso, actor principal, objetivo, precondiciones, disparador, escenario (flujos principal y alternos), excepciones, prioridad, disponibilidad, frecuencia de uso, canal para el actor, actores secundarios, canales para actores secundarios y aspectos pendientes.

### 4.1 CU-EDU-01: Registrar docente comunitario

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-EDU-01 — Registrar docente comunitario |
| **Actor principal** | Administrador del sistema |
| **Objetivo** | Registrar un nuevo docente comunitario con sus datos personales, lingüísticos y profesionales en el módulo EDU |
| **Precondiciones** | 1) El administrador está autenticado y tiene rol "Admin". 2) El sistema está operativo (online u offline). 3) El docente no está previamente registrado. |
| **Disparador** | El administrador selecciona "Nuevo Docente" en el panel de gestión del módulo EDU |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona "Nuevo Docente" | Muestra formulario de registro |
| 2 | Ingresa nombre completo y cédula | Valida formato de cédula (9 dígitos) |
| 3 | Selecciona territorio y centro educativo | Carga lista de centros del territorio |
| 4 | Selecciona lengua(s) indígena(s) dominada(s) | Muestra opciones: bribri, cabécar, ngäbere, maleku, etc. |
| 5 | Asigna nivel académico y grado | — |
| 6 | Confirma registro | Valida campos obligatorios completos |
| 7 | — | Genera ID único (DOC-XXXX) |
| 8 | — | Almacena localmente (PouchDB) y marca para sincronización |
| 9 | — | Muestra confirmación con ID generado |

**Flujo alterno A — Modo offline:**

| Paso | Detalle |
|------|---------|
| 3a | Si no hay conexión, el sistema usa la lista de centros educativos cacheada localmente |
| 8a | El registro se almacena localmente y se sincronizará cuando haya conexión |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Campos obligatorios incompletos → mensaje indicando campos faltantes, no se permite guardar. E2: Cédula ya registrada → alerta de duplicado, ofrece buscar el docente existente. E3: Sin almacenamiento local disponible → alerta de espacio insuficiente. |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-03 (abril 2026) |
| **Frecuencia de uso** | Baja — inicio de período lectivo o ingreso de nuevo docente (estimado: 2-5 veces por año por centro) |
| **Canal para el actor** | PWA en tablet Android o computadora de escritorio |
| **Actores secundarios** | Docente comunitario (proporciona su información personal) |
| **Canales para actores secundarios** | Presencial (entrevista directa en centro educativo) |
| **Aspectos pendientes** | Validación cruzada con lista oficial de docentes del MEP; definir política de actualización de datos; considerar fotografía opcional del docente |

---

### 4.2 CU-EDU-03: Cargar material educativo multimedia

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-EDU-03 — Cargar material educativo multimedia |
| **Actor principal** | Docente comunitario |
| **Objetivo** | Subir material didáctico bilingüe (texto, audio, video, imagen) al repositorio educativo del módulo EDU |
| **Precondiciones** | 1) El docente está autenticado y asignado a un centro educativo. 2) Existe al menos un curso registrado. 3) El dispositivo tiene almacenamiento disponible. |
| **Disparador** | El docente selecciona "Cargar Material" desde el panel de su curso |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona "Cargar Material" | Muestra formulario de carga con opciones de tipo |
| 2 | Selecciona tipo de material (texto/audio/video/imagen) | Ajusta el formulario según el tipo |
| 3 | Sube archivo o graba audio/video in-app | Muestra barra de progreso de carga |
| 4 | Ingresa título y descripción | — |
| 5 | Selecciona asignatura, nivel educativo y competencia alineada | Filtra opciones según el currículo del centro |
| 6 | Selecciona lengua del material (español / bribri / cabécar / ngäbere) | — |
| 7 | Confirma carga | Comprime archivo: Opus (audio), WebP (imagen), HLS (video) |
| 8 | — | Almacena localmente y marca para sincronización |
| 9 | — | Muestra preview del material cargado y confirmación |

**Flujo alterno A — Grabación de audio in-app:**

| Paso | Detalle |
|------|---------|
| 3a | El docente selecciona "Grabar audio" → el sistema activa el micrófono del dispositivo |
| 3b | El docente graba su explicación → el sistema muestra duración y nivel de audio |
| 3c | El docente finaliza → el sistema codifica en Opus y retorna al paso 4 |

**Flujo alterno B — Material bilingüe:**

| Paso | Detalle |
|------|---------|
| 6a | Si el docente selecciona dos idiomas, el sistema solicita vincular la versión en la otra lengua |
| 6b | El sistema crea la relación entre las dos versiones del material |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Archivo excede 50 MB → sugerencia de compresión o división. E2: Formato no soportado → lista de formatos aceptados (PDF, DOCX, PNG, JPG, MP3, MP4, WEBM). E3: Almacenamiento insuficiente → alerta con espacio disponible y sugerencia de liberar caché. E4: Grabación de audio falla → verificar permisos de micrófono. |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-03 (abril 2026) |
| **Frecuencia de uso** | Media — semanal durante período lectivo (estimado: 3-5 materiales/semana por docente) |
| **Canal para el actor** | PWA en tablet Android (preferente) o computadora |
| **Actores secundarios** | Estudiante (consume el material subido) |
| **Canales para actores secundarios** | PWA en tablet Android (modo offline disponible) |
| **Aspectos pendientes** | Política de moderación de contenido; límite de almacenamiento por docente/centro; soporte para contenido en formato SCORM (futuro) |

---

### 4.3 CU-SAB-01: Registrar saber ancestral multimedia

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-SAB-01 — Registrar saber ancestral multimedia |
| **Actor principal** | Guía cultural / Portador de saber |
| **Objetivo** | Documentar un saber ancestral en formato multimedia (audio, video, texto, imagen) con metadatos culturales y nivel de acceso según gobernanza CARE |
| **Precondiciones** | 1) El guía está autenticado en el sistema. 2) Existe un consentimiento informado aprobado (CU-SAB-05). 3) El admin comunitario ha configurado los niveles de acceso (CU-SAB-04). |
| **Disparador** | El guía selecciona "Registrar Saber" en el módulo SAB |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona "Registrar Saber" | Verifica que existe consentimiento vigente para el portador |
| 2 | — | Muestra confirmación: "Consentimiento activo desde [fecha]" |
| 3 | Selecciona tipo de consentimiento (oral grabado / escrito) | Muestra formulario de registro de saber |
| 4 | Ingresa título, descripción y territorio de origen | — |
| 5 | Selecciona categoría (agricultura, medicina, artesanía, etc.) | Carga categorías configuradas por la comunidad |
| 6 | Selecciona nivel de acceso: público / comunitario / restringido / ceremonial | Muestra descripción del nivel y autorización requerida |
| 7 | Sube contenido multimedia (audio/video/imagen/texto) | Comprime y almacena localmente |
| 8 | Selecciona lengua del contenido y agrega etiquetas culturales | — |
| 9 | Confirma registro | Encripta según nivel de acceso (AES-256 para restringido/ceremonial) |
| 10 | — | Almacena y marca para sincronización (excepto ceremonial: solo local) |
| 11 | — | Confirma registro exitoso con ID generado |

**Flujo alterno A — Nivel ceremonial:**

| Paso | Detalle |
|------|---------|
| 6a | Si selecciona "Ceremonial", el sistema requiere autorización previa del Awá |
| 6b | Si no existe autorización → el sistema suspende el registro y notifica al admin comunitario |
| 6c | El admin comunitario gestiona la autorización y retorna al paso 6 |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Sin consentimiento vigente → bloqueo del registro; se redirige al formulario de consentimiento (CU-SAB-05). E2: Nivel ceremonial sin autorización del Awá → registro suspendido; notificación al admin comunitario. E3: Sin conexión → almacena localmente con encriptación; sincronización posterior. E4: Contenido multimedia excede capacidad → sugerencia de formato alternativo. |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-04 (mayo 2026) |
| **Frecuencia de uso** | Media — mensual durante campañas de documentación (estimado: 5-10 saberes/mes por comunidad) |
| **Canal para el actor** | PWA en tablet Android con micrófono y cámara |
| **Actores secundarios** | Admin comunitario (aprueba consentimientos y niveles); Consejo de mayores (autoriza nivel restringido); Awá (autoriza nivel ceremonial) |
| **Canales para actores secundarios** | Presencial / oral en reunión comunitaria; el admin comunitario ingresa la autorización al sistema |
| **Aspectos pendientes** | Protocolo de revocación de consentimiento; soporte para grabación de video en baja conectividad (<1 Mbps); metadatos culturales específicos por pueblo (bribri vs. cabécar vs. maleku) |

---

### 4.4 CU-SAB-04: Configurar restricción de acceso por autorización comunitaria

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-SAB-04 — Configurar restricción de acceso por autorización comunitaria |
| **Actor principal** | Administrador comunitario |
| **Objetivo** | Establecer y modificar los niveles de acceso a saberes registrados según la autorización de la comunidad, cumpliendo los principios CARE de soberanía de datos indígenas |
| **Precondiciones** | 1) El admin comunitario está autenticado con rol "Admin comunitario". 2) Existen saberes registrados en el sistema. 3) El admin tiene la autorización explícita de la comunidad para gestionar acceso. |
| **Disparador** | El admin selecciona "Configurar Acceso" en el panel de gobernanza del módulo SAB |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona "Configurar Acceso" | Muestra lista de saberes con nivel de acceso actual |
| 2 | Filtra por categoría, territorio o nivel | Actualiza la lista filtrada |
| 3 | Selecciona un saber específico | Muestra detalle: título, portador, nivel actual, historial de cambios |
| 4 | Selecciona nuevo nivel de acceso | — |
| 5 | — | Si nivel es restringido/ceremonial → solicita justificación |
| 6 | Ingresa justificación y referencia de autorización (acta, fecha, autoridad) | Valida que la justificación sea completa |
| 7 | Confirma cambio | Registra cambio con timestamp, responsable y justificación |
| 8 | — | Aplica nueva restricción de acceso inmediatamente |
| 9 | — | Notifica a usuarios que tenían acceso previo (si se restringió) |

**Flujo alterno A — Elevación a ceremonial:**

| Paso | Detalle |
|------|---------|
| 5a | Si el nuevo nivel es "Ceremonial", el sistema verifica que existe autorización del Awá |
| 5b | Si no existe → muestra alerta: "Se requiere autorización del Awá para nivel Ceremonial" |
| 5c | El admin registra la autorización del Awá (nombre, fecha, contexto) |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Intento de elevar a "Ceremonial" sin autorización del Awá → bloqueo; requiere aprobación adicional documentada. E2: Conflicto con consentimiento original del portador → alerta al admin con detalle del consentimiento. E3: Sin conexión → cambio aplicado localmente con prioridad alta de sincronización. E4: Intento de reducir nivel sin justificación → bloqueo; toda acción de gobernanza requiere trazabilidad. |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-04 (mayo 2026) |
| **Frecuencia de uso** | Baja — excepcional (estimado: 1-3 cambios/mes por comunidad, generalmente tras reuniones comunitarias) |
| **Canal para el actor** | PWA en computadora (preferente por la complejidad de la interfaz de gobernanza) |
| **Actores secundarios** | Consejo de mayores (autoriza nivel restringido); Awá (autoriza nivel ceremonial); Portador del saber (consultado ante cambios) |
| **Canales para actores secundarios** | Presencial en reunión comunitaria; decisiones se registran posteriormente en el sistema |
| **Aspectos pendientes** | Mecanismo formal de apelación para portadores; registro de auditoría CARE exportable; integración con actas de reuniones comunitarias |

---

### 4.5 CU-SAL-01: Registrar paciente con ID único

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-SAL-01 — Registrar paciente con ID único |
| **Actor principal** | Auxiliar de salud (ATAP) |
| **Objetivo** | Crear el registro de un nuevo paciente con un identificador único, datos demográficos y territorio de pertenencia |
| **Precondiciones** | 1) El auxiliar está autenticado con rol "Personal salud". 2) El sistema tiene capacidad de almacenamiento local disponible. 3) El paciente no está previamente registrado. |
| **Disparador** | El auxiliar selecciona "Nuevo Paciente" en el módulo SAL |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona "Nuevo Paciente" | Muestra formulario de registro de paciente |
| 2 | Ingresa nombre completo | — |
| 3 | Ingresa fecha de nacimiento y sexo | Calcula edad automáticamente |
| 4 | Selecciona territorio y comunidad | Carga lista de comunidades del territorio |
| 5 | — | Genera ID único (SAL-XXXX-YYYY) |
| 6 | Ingresa datos opcionales: tipo de sangre, alergias conocidas | — |
| 7 | Confirma registro | Valida que no exista duplicado (nombre + fecha + territorio) |
| 8 | — | Almacena localmente (PouchDB) y marca para sincronización |
| 9 | — | Muestra ID generado y confirmación de registro |

**Flujo alterno A — Posible duplicado:**

| Paso | Detalle |
|------|---------|
| 7a | El sistema detecta registros similares (nombre parcial + fecha + territorio) |
| 7b | Muestra lista de posibles duplicados con ID, nombre y fecha de nacimiento |
| 7c | El auxiliar confirma que es un paciente nuevo → se completa el registro |
| 7d | El auxiliar identifica el paciente existente → cancela registro y abre expediente existente |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Posible duplicado detectado → flujo alterno A. E2: Campos obligatorios incompletos → mensaje de validación indicando campos faltantes. E3: Sin conexión → almacena localmente; ID temporal hasta sincronización (se confirma ID definitivo post-sync). E4: Sin espacio de almacenamiento → alerta y sugerencia de sincronizar para liberar espacio. |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-03 (abril 2026) |
| **Frecuencia de uso** | Media — durante brigadas de salud y consultas (estimado: 10-30 pacientes nuevos por brigada) |
| **Canal para el actor** | PWA en tablet Android (uso en campo durante brigadas) |
| **Actores secundarios** | Paciente (proporciona información personal); Médico EBAIS (consulta posterior del registro) |
| **Canales para actores secundarios** | Presencial (entrevista directa durante brigada o visita domiciliar) |
| **Aspectos pendientes** | Integración con sistema de identificación del CCSS para evitar duplicados inter-centros; protocolo de consentimiento de datos de salud (Ley 8968); soporte para pacientes sin documento de identidad |

---

### 4.6 CU-SAL-02: Registrar historial médico básico

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-SAL-02 — Registrar historial médico básico |
| **Actor principal** | Auxiliar de salud (ATAP) |
| **Objetivo** | Agregar una nueva entrada al historial médico de un paciente registrado, documentando la consulta, diagnóstico y tratamiento |
| **Precondiciones** | 1) El paciente existe en el sistema (CU-SAL-01 completado). 2) El auxiliar tiene rol autorizado para datos médicos. 3) El módulo SAL está operativo. |
| **Disparador** | El auxiliar busca al paciente y selecciona "Agregar al Historial" |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Busca al paciente por ID, nombre o territorio | Muestra resultados de búsqueda |
| 2 | Selecciona al paciente | Muestra expediente con historial existente |
| 3 | Selecciona "Nueva Entrada" | Muestra formulario de entrada médica |
| 4 | Registra: fecha, motivo de consulta, síntomas | — |
| 5 | Registra: diagnóstico y tratamiento prescrito | — |
| 6 | Agrega notas adicionales (condiciones crónicas detectadas, alergias nuevas) | — |
| 7 | Indica si requiere seguimiento y selecciona tipo de alerta | Precarga alertas sugeridas según diagnóstico |
| 8 | Confirma entrada | Encripta información médica (AES-256) |
| 9 | — | Almacena y marca para sincronización segura (TLS 1.3) |
| 10 | — | Confirma registro con número de entrada |

**Flujo alterno A — Paciente no encontrado:**

| Paso | Detalle |
|------|---------|
| 1a | La búsqueda no arroja resultados |
| 1b | El sistema ofrece: "¿Desea registrar un nuevo paciente?" |
| 1c | El auxiliar acepta → se redirige a CU-SAL-01 (registrar paciente) |
| 1d | Después del registro, retorna al paso 3 para agregar la entrada médica |

**Flujo alterno B — Alerta de interacción medicamentosa:**

| Paso | Detalle |
|------|---------|
| 5a | Si el paciente tiene medicación activa registrada, el sistema verifica interacciones conocidas |
| 5b | Si detecta posible interacción → muestra advertencia con detalle |
| 5c | El auxiliar confirma o modifica el tratamiento → continúa en paso 6 |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Paciente no encontrado → flujo alterno A. E2: Rol no autorizado para datos médicos → acceso denegado; se genera log de auditoría (RNF-02). E3: Conflicto de sincronización (mismo paciente editado en dos dispositivos) → flag para resolución manual por personal autorizado. E4: Error de almacenamiento → reintentar o guardar en modo emergencia (texto plano temporal). |
| **Prioridad** | Alta (Must) |
| **Cuándo estará disponible** | Sprint-04 (mayo 2026) |
| **Frecuencia de uso** | Alta — cada consulta médica o evento de salud (estimado: 20-50 entradas/brigada) |
| **Canal para el actor** | PWA en tablet Android (uso en campo) |
| **Actores secundarios** | Paciente (confirma síntomas y antecedentes); Médico EBAIS (revisa historial posteriormente) |
| **Canales para actores secundarios** | Presencial (consulta directa); sistema CCSS (exportación futura) |
| **Aspectos pendientes** | Integración con formato de expediente estándar del CCSS; firma digital del personal de salud; catálogo CIE-10 para codificación de diagnósticos; visor de historial resumido para emergencias |

---

### 4.7 CU-TRANS-01: Sincronizar datos offline/online

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-TRANS-01 — Sincronizar datos offline/online |
| **Actor principal** | Sistema (automático) / Usuario autenticado (manual) |
| **Objetivo** | Sincronizar los datos almacenados localmente en PouchDB con el servidor central CouchDB al recuperar conectividad, asegurando integridad y consistencia |
| **Precondiciones** | 1) Existen datos locales pendientes de sincronización. 2) Se detecta conexión a internet (automático) o el usuario decide sincronizar manualmente. 3) El servidor central o servidor local RPi está accesible. |
| **Disparador** | Detección automática de conexión a internet, o el usuario presiona "Sincronizar ahora" en el panel de estado |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | — (automático) / Presiona "Sincronizar" | Detecta conexión disponible; muestra indicador de sincronización |
| 2 | — | Identifica registros locales pendientes en PouchDB (changesfeed) |
| 3 | — | Clasifica registros por prioridad: salud > saberes restringidos > educación > general |
| 4 | — | Inicia envío al servidor (CouchDB) vía HTTP/REST con TLS 1.3 |
| 5 | — | El servidor procesa registros y resuelve conflictos (timestamp más reciente prevalece) |
| 6 | — | El servidor envía registros nuevos/actualizados desde otros dispositivos |
| 7 | — | Actualiza indicador: registros enviados / recibidos / conflictos |
| 8 | — | Muestra resumen de sincronización al usuario |

**Flujo alterno A — Conexión intermitente:**

| Paso | Detalle |
|------|---------|
| 4a | La conexión se interrumpe durante la transmisión |
| 4b | El sistema marca el punto de interrupción y registra progreso parcial |
| 4c | Al recuperar conexión, reanuda desde el último checkpoint (sin reenvío de datos ya confirmados) |

**Flujo alterno B — Contenido ceremonial:**

| Paso | Detalle |
|------|---------|
| 3a | El sistema identifica registros con nivel de acceso "Ceremonial" |
| 3b | Estos registros NO se sincronizan al servidor central; permanecen solo en el dispositivo local y el RPi del territorio |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Conexión interrumpida → reanudación automática desde checkpoint (flujo alterno A). E2: Conflicto irreconciliable (misma entidad editada con datos contradictorios) → flag visible para resolución manual por admin del sistema. E3: Datos de salud requieren sincronización encriptada obligatoria (TLS 1.3 + AES-256). E4: Servidor no responde tras 3 reintentos → alerta al admin; datos permanecen locales seguros. |
| **Prioridad** | Alta (Must) — fundamento de la arquitectura offline-first |
| **Cuándo estará disponible** | Sprint-03 (abril 2026) |
| **Frecuencia de uso** | Alta — cada vez que se detecta conexión disponible (estimado: 1-3 veces/día en territorios con conectividad parcial) |
| **Canal para el actor** | PWA (proceso automático en background); interfaz de estado visible en todas las pantallas |
| **Actores secundarios** | Administrador del sistema (resuelve conflictos de sincronización); Raspberry Pi servidor local (nodo intermedio de sincronización LAN) |
| **Canales para actores secundarios** | Panel de admin vía PWA; RPi se comunica por LAN local (HTTP) |
| **Aspectos pendientes** | Política de priorización de sincronización en ancho de banda limitado (<256 Kbps); límite de datos por sesión de sync; compresión de payload; manejo de sincronización masiva post-brigada (batch mode) |

---

### 4.8 CU-TRANS-02: Seleccionar idioma de interfaz

| Campo | Detalle |
|-------|---------|
| **Caso de uso** | CU-TRANS-02 — Seleccionar idioma de interfaz |
| **Actor principal** | Cualquier usuario autenticado |
| **Objetivo** | Cambiar el idioma de la interfaz de usuario entre español y las lenguas indígenas disponibles, para que cada usuario trabaje en su lengua preferida |
| **Precondiciones** | 1) El usuario está autenticado. 2) Los archivos de traducción (i18next JSON) para la lengua deseada están disponibles localmente. 3) El sistema tiene al menos español como idioma base. |
| **Disparador** | El usuario accede a Configuración → Idioma, o presiona el selector de idioma visible en la barra superior de todas las pantallas |

**Escenario principal:**

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Presiona el selector de idioma (🌐) | Muestra idiomas disponibles: Español, Bribri, Cabécar, Ngäbere |
| 2 | Selecciona el idioma deseado | — |
| 3 | — | Carga el archivo de traducciones (i18next namespace) |
| 4 | — | Actualiza toda la interfaz al idioma seleccionado (sin recargar página) |
| 5 | — | Guarda la preferencia en el perfil del usuario (localStorage + perfil sincronizable) |
| 6 | — | En la siguiente sesión, carga automáticamente el idioma preferido |

**Flujo alterno A — Traducción incompleta:**

| Paso | Detalle |
|------|---------|
| 4a | Si una cadena no tiene traducción en el idioma seleccionado, se muestra en español (fallback) |
| 4b | El sistema marca visualmente los textos en fallback (ej: texto en itálica) para que el traductor identifique faltantes |

**Flujo alterno B — Archivo de idioma no disponible offline:**

| Paso | Detalle |
|------|---------|
| 3a | Si el archivo de traducciones no está cacheado localmente |
| 3b | El sistema muestra: "Idioma no disponible offline. ¿Descargar cuando haya conexión?" |
| 3c | El usuario acepta → se encola la descarga; mientras tanto, permanece en idioma actual |

| Campo | Detalle |
|-------|---------|
| **Excepciones** | E1: Traducción incompleta → fallback a español con indicador visual (flujo alterno A). E2: Archivo de idioma no disponible offline → flujo alterno B. E3: Contenido multimedia no tiene versión en el idioma seleccionado → indicador del idioma original del contenido. E4: Error al cargar namespace → mantiene idioma anterior y muestra alerta. |
| **Prioridad** | Alta (Must) — requisito de accesibilidad e inclusión cultural |
| **Cuándo estará disponible** | Sprint-03 (abril 2026) |
| **Frecuencia de uso** | Baja — configuración inicial por usuario (estimado: 1 vez por usuario; cambios posteriores esporádicos) |
| **Canal para el actor** | PWA en cualquier dispositivo (tablet, computadora, teléfono) |
| **Actores secundarios** | Traductor comunitario (provee y valida traducciones en JSON) |
| **Canales para actores secundarios** | Plataforma de gestión de traducciones (futura, por definir); actualmente edición manual de archivos JSON |
| **Aspectos pendientes** | Completar traducciones bribri, cabécar y ngäbere (actualmente solo español disponible); validación lingüística con hablantes nativos; definir proceso de actualización de traducciones; soporte para variantes dialectales |

---

## 5. Diagrama de Casos de Uso

> Diagrama UML de casos de uso representado en Mermaid, agrupando los 19 casos por módulo (subsistema) y mostrando las relaciones entre actores y casos de uso.

```mermaid
graph TB
    %% === ACTORES PRIMARIOS (izquierda) ===
    DOC["👨‍🏫 Docente<br>comunitario"]
    GC["🧓 Guía cultural /<br>Portador de saber"]
    AUX["🩺 Auxiliar de<br>salud (ATAP)"]
    ADM["⚙️ Administrador<br>del sistema"]
    ADMC["🏛️ Admin<br>comunitario"]

    %% === MÓDULO EDU ===
    subgraph EDU ["📚 Módulo EDU — Educación Intercultural"]
        CU_EDU_01(["CU-EDU-01<br>Registrar docente<br>comunitario"])
        CU_EDU_02(["CU-EDU-02<br>Registrar<br>estudiante"])
        CU_EDU_03(["CU-EDU-03<br>Cargar material<br>educativo multimedia"])
        CU_EDU_04(["CU-EDU-04<br>Organizar material<br>por asignatura"])
        CU_EDU_05(["CU-EDU-05<br>Realizar ejercicio<br>de práctica"])
        CU_EDU_06(["CU-EDU-06<br>Consultar progreso<br>de estudiante"])
    end

    %% === MÓDULO SAB ===
    subgraph SAB ["🌿 Módulo SAB — Saberes Ancestrales"]
        CU_SAB_01(["CU-SAB-01<br>Registrar saber<br>ancestral multimedia"])
        CU_SAB_02(["CU-SAB-02<br>Clasificar saber<br>por categoría"])
        CU_SAB_03(["CU-SAB-03<br>Buscar saberes<br>por filtros"])
        CU_SAB_04(["CU-SAB-04<br>Configurar restricción<br>de acceso"])
        CU_SAB_05(["CU-SAB-05<br>Registrar<br>consentimiento"])
    end

    %% === MÓDULO SAL ===
    subgraph SAL ["❤️ Módulo SAL — Salud Comunitaria"]
        CU_SAL_01(["CU-SAL-01<br>Registrar paciente<br>con ID único"])
        CU_SAL_02(["CU-SAL-02<br>Registrar historial<br>médico básico"])
        CU_SAL_03(["CU-SAL-03<br>Programar<br>cita médica"])
        CU_SAL_04(["CU-SAL-04<br>Gestionar brigada<br>de salud"])
        CU_SAL_05(["CU-SAL-05<br>Configurar alerta<br>de seguimiento"])
    end

    %% === MÓDULO TRANS ===
    subgraph TRANS ["🔄 Módulo TRANS — Transversal"]
        CU_TRANS_01(["CU-TRANS-01<br>Sincronizar datos<br>offline/online"])
        CU_TRANS_02(["CU-TRANS-02<br>Seleccionar idioma<br>de interfaz"])
        CU_TRANS_03(["CU-TRANS-03<br>Configurar gobernanza<br>de datos"])
    end

    %% === ACTORES SECUNDARIOS (derecha) ===
    EST["📖 Estudiante"]
    PAC["🧑 Paciente"]
    CM["👥 Consejo<br>de mayores"]
    AWA["🔮 Awá"]
    RPI["🖥️ Raspberry Pi<br>(servidor local)"]
    COUCH["☁️ CouchDB<br>(servidor central)"]

    %% === RELACIONES ACTORES PRIMARIOS → CU ===
    ADM --> CU_EDU_01
    DOC --> CU_EDU_02
    DOC --> CU_EDU_03
    DOC --> CU_EDU_04
    DOC --> CU_EDU_06
    GC --> CU_SAB_01
    ADMC --> CU_SAB_02
    ADMC --> CU_SAB_04
    ADMC --> CU_SAB_05
    AUX --> CU_SAL_01
    AUX --> CU_SAL_02
    AUX --> CU_SAL_03
    AUX --> CU_SAL_04
    AUX --> CU_SAL_05
    ADM --> CU_TRANS_01
    ADMC --> CU_TRANS_03

    %% === RELACIONES ACTORES SECUNDARIOS ===
    EST -.-> CU_EDU_05
    EST -.-> CU_EDU_03
    PAC -.-> CU_SAL_01
    PAC -.-> CU_SAL_02
    CU_SAB_03 -.-> EST
    CU_SAB_03 -.-> DOC
    CU_SAB_03 -.-> AUX
    CM -.-> CU_SAB_04
    AWA -.-> CU_SAB_04
    AWA -.-> CU_SAB_01
    RPI -.-> CU_TRANS_01
    COUCH -.-> CU_TRANS_01

    %% === RELACIONES INCLUDE ===
    CU_SAB_01 -- "«include»" --> CU_SAB_05
    CU_SAL_02 -- "«include»" --> CU_SAL_01
    CU_EDU_06 -- "«include»" --> CU_EDU_05

    %% === RELACIONES EXTEND ===
    CU_SAL_05 -. "«extend»" .-> CU_SAL_02
    CU_EDU_04 -. "«extend»" .-> CU_EDU_03
    CU_SAB_02 -. "«extend»" .-> CU_SAB_01

    %% === ESTILOS ===
    classDef actor fill:#E3F2FD,stroke:#1565C0,stroke-width:2px
    classDef secondary fill:#FFF3E0,stroke:#E65100,stroke-width:1px
    classDef system fill:#E8F5E9,stroke:#2E7D32,stroke-width:1px
    classDef cuEdu fill:#E8EAF6,stroke:#283593,stroke-width:1px
    classDef cuSab fill:#E8F5E9,stroke:#2E7D32,stroke-width:1px
    classDef cuSal fill:#FCE4EC,stroke:#880E4F,stroke-width:1px
    classDef cuTrans fill:#FFF8E1,stroke:#F57F17,stroke-width:1px

    class DOC,GC,AUX,ADM,ADMC actor
    class EST,PAC,CM,AWA secondary
    class RPI,COUCH system
```

### 5.1 Relaciones entre Casos de Uso

| Relación | Origen | Destino | Tipo | Justificación |
|----------|--------|---------|------|---------------|
| CU-SAB-01 → CU-SAB-05 | Registrar saber | Registrar consentimiento | `«include»` | Todo registro de saber **requiere** consentimiento previo |
| CU-SAL-02 → CU-SAL-01 | Registrar historial | Registrar paciente | `«include»` | No se puede crear historial sin paciente registrado |
| CU-EDU-06 → CU-EDU-05 | Consultar progreso | Realizar ejercicio | `«include»` | El progreso se calcula a partir de los ejercicios realizados |
| CU-SAL-05 → CU-SAL-02 | Alerta de seguimiento | Registrar historial | `«extend»` | Opcionalmente, al registrar historial se puede configurar alerta |
| CU-EDU-04 → CU-EDU-03 | Organizar material | Cargar material | `«extend»` | Opcionalmente, al cargar material se puede organizar por asignatura |
| CU-SAB-02 → CU-SAB-01 | Clasificar saber | Registrar saber | `«extend»` | Opcionalmente, al registrar se puede clasificar inmediatamente |

---

## 6. Referencia Cruzada: Requerimientos Funcionales ↔ Casos de Uso

### 6.1 Matriz de Trazabilidad Completa

| # | Requerimiento | Caso de Uso | Módulo | Actor Principal | MoSCoW | Sprint | Documentado |
|---|--------------|-------------|--------|-----------------|--------|--------|-------------|
| 1 | RF-EDU-01 | CU-EDU-01 | EDU | Admin del sistema | Must | Sprint-03 | ✅ §4.1 |
| 2 | RF-EDU-02 | CU-EDU-02 | EDU | Docente comunitario | Should | Sprint-04 | — |
| 3 | RF-EDU-03 | CU-EDU-03 | EDU | Docente comunitario | Must | Sprint-03 | ✅ §4.2 |
| 4 | RF-EDU-04 | CU-EDU-04 | EDU | Docente comunitario | Should | Sprint-04 | — |
| 5 | RF-EDU-05 | CU-EDU-05 | EDU | Estudiante | Should | Sprint-04 | — |
| 6 | RF-EDU-06 | CU-EDU-06 | EDU | Docente comunitario | Could | Sprint-05 | — |
| 7 | RF-SAB-01 | CU-SAB-01 | SAB | Guía cultural | Must | Sprint-04 | ✅ §4.3 |
| 8 | RF-SAB-02 | CU-SAB-02 | SAB | Admin comunitario | Should | Sprint-04 | — |
| 9 | RF-SAB-03 | CU-SAB-03 | SAB | Usuario autorizado | Should | Sprint-04 | — |
| 10 | RF-SAB-04 | CU-SAB-04 | SAB | Admin comunitario | Must | Sprint-04 | ✅ §4.4 |
| 11 | RF-SAB-05 | CU-SAB-05 | SAB | Admin comunitario | Must | Sprint-04 | — |
| 12 | RF-SAL-01 | CU-SAL-01 | SAL | Auxiliar de salud | Must | Sprint-03 | ✅ §4.5 |
| 13 | RF-SAL-02 | CU-SAL-02 | SAL | Auxiliar de salud | Must | Sprint-04 | ✅ §4.6 |
| 14 | RF-SAL-03 | CU-SAL-03 | SAL | Auxiliar de salud | Should | Sprint-04 | — |
| 15 | RF-SAL-04 | CU-SAL-04 | SAL | Auxiliar de salud | Could | Sprint-05 | — |
| 16 | RF-SAL-05 | CU-SAL-05 | SAL | Auxiliar de salud | Should | Sprint-05 | — |
| 17 | RF-TRANS-01 | CU-TRANS-01 | TRANS | Sistema / Usuario | Must | Sprint-03 | ✅ §4.7 |
| 18 | RF-TRANS-02 | CU-TRANS-02 | TRANS | Usuario autenticado | Must | Sprint-03 | ✅ §4.8 |
| 19 | RF-TRANS-03 | CU-TRANS-03 | TRANS | Admin comunitario | Must | Sprint-04 | — |

### 6.2 Cobertura por Prioridad

| MoSCoW | Total RF | Total CU | CU Documentados | Cobertura |
|--------|----------|----------|-----------------|-----------|
| Must | 10 | 10 | 8 (80%) | ✅ Completa para MVP |
| Should | 6 | 6 | 0 | Listados, no expandidos |
| Could | 2 | 2 | 0 | Listados, Sprint-05 |
| Won't | 0 | 0 | 0 | N/A |
| **Total** | **19** | **19** | **8** | **100% trazabilidad** |

> **Nota:** Se priorizó la documentación expandida de los 8 casos de uso de prioridad **Must** que componen el MVP del sistema. Los 11 restantes (Should/Could) están identificados y trazados, y serán documentados en formato expandido conforme se aborden en Sprint-04 y Sprint-05.

---

## 7. Conclusiones y Recomendaciones

### 7.1 Conclusiones

1. **Complejidad multi-dominio confirmada.** El análisis de 19 casos de uso evidenció que Raíces Vivas no es un sistema CRUD convencional; integra educación, patrimonio cultural y salud, cada uno con reglas de negocio, actores y restricciones propios. La decisión de separar en módulos (EDU, SAB, SAL, TRANS) fue acertada y se valida con la distribución natural de los casos de uso.

2. **La gobernanza cultural atraviesa todo el sistema.** Los principios CARE no solo afectan al módulo SAB; están presentes en los flujos de sincronización (CU-TRANS-01 excluye datos ceremoniales), en el registro de salud (CU-SAL-02 aplica encriptación por rol), y en la configuración de acceso (CU-SAB-04). Esto confirma que la gobernanza debe implementarse como un módulo transversal, no como una funcionalidad aislada.

3. **El diseño offline-first impacta todos los casos de uso.** Cada escenario principal documenta un flujo alterno de operación sin conexión. Esto fue consistente en los 8 casos expandidos: todos almacenan localmente, marcan para sincronización y manejan conflictos. La arquitectura PouchDB/CouchDB elegida en ADR-008 soporta nativamente este patrón.

4. **Los actores secundarios tienen influencia crítica sin acceso directo.** El Consejo de mayores y el Awá no operan el sistema, pero su autorización es **bloqueante** para casos de uso con nivel de acceso restringido/ceremonial. Este patrón de "autoridad delegada" requiere un diseño de workflows que trasciende la interacción digital.

5. **La trazabilidad RF ↔ CU es completa (19:19).** Cada requerimiento funcional tiene un caso de uso correspondiente, y cada caso de uso tiene al menos un requerimiento que lo origina. No se identificaron requerimientos huérfanos ni casos de uso sin fundamento funcional.

### 7.2 Recomendaciones

1. **Implementar los casos Must del módulo TRANS primero (Sprint-03).** CU-TRANS-01 (sincronización) y CU-TRANS-02 (idioma) son dependencias transversales para todos los demás módulos. Sin sincronización offline/online funcional, los módulos EDU, SAB y SAL no pueden operar en territorios con conectividad limitada.

2. **Validar los flujos de consentimiento con comunidades reales antes de implementar.** CU-SAB-01 y CU-SAB-04 incluyen flujos de autorización comunitaria (Consejo de mayores, Awá) que fueron diseñados teóricamente. Se recomienda realizar al menos 2 sesiones de validación con líderes de Guatuso y Talamanca durante Sprint-03 para confirmar que los flujos reflejan la realidad de la gobernanza indígena.

3. **Establecer un mecanismo de resolución de conflictos de sincronización.** CU-TRANS-01 documenta una excepción de "conflicto irreconciliable" que actualmente requiere intervención manual. Se recomienda diseñar una interfaz de resolución de conflictos y un protocolo claro para Sprint-04, dado que los escenarios de brigadas de salud pueden generar ediciones simultáneas en múltiples dispositivos.

4. **Priorizar la creación de catálogos base antes de los formularios.** Múltiples casos de uso dependen de catálogos (centros educativos, territorios, categorías de saberes, medicamentos). Se recomienda crear un caso de uso de "Gestión de Catálogos" transversal y poblar los datos maestros durante Sprint-03 para desbloquear el trabajo de Sprint-04.

5. **Diseñar wireframes orientados a usabilidad con alfabetización digital básica.** El RNF-03 establece que toda acción crítica debe completarse en ≤2 minutos con ≤6 campos obligatorios. Los casos de uso documentados muestran formularios con 5-7 campos; se recomienda validar la complejidad con usuarios reales y considerar un asistente guiado (wizard) para los flujos más complejos como CU-SAB-01.

---

## Anexo A: Contexto Arquitectónico

> Los siguientes artefactos de arquitectura fueron desarrollados durante Sprint-02 y complementan el análisis de casos de uso. El detalle completo se encuentra en la carpeta `04-Arquitectura/`.

### A.1 Diagrama de Contexto (C4 — Level 1)

> Documento completo: [[04-Arquitectura/Visión General]]

El diagrama C4 Level 1 muestra el sistema Raíces Vivas en su contexto, con los 5 actores primarios, 3 módulos funcionales y 4 sistemas externos. El diagrama Level 2 descompone los módulos en servicios internos.

### A.2 Modelos Entidad-Relación

> Documento completo: [[04-Arquitectura/Modelo de Datos]]

Se diseñaron modelos ER para cada módulo:
- **EDU:** 5 entidades (DOCENTE, ESTUDIANTE, MATERIAL_EDUCATIVO, EJERCICIO, INTENTO)
- **SAB:** 4 entidades principales (SABER, CATEGORIA_SABER, CONSENTIMIENTO, ROL_COMUNITARIO)
- **SAL:** 5 entidades (PACIENTE, HISTORIAL_MEDICO, CITA, CAMPANA, ALERTA_SEGUIMIENTO)
- **Transversal:** 3 entidades (USUARIO, ROL, LOG_AUDITORIA)

### A.3 Stack Tecnológico (ADR-008)

> Decisión completa: [[ADR-008]] | Documento técnico: [[04-Arquitectura/Stack Tecnológico]]
> **Estado:** Aceptado

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Offline DB | PouchDB (cliente) ↔ CouchDB (servidor) |
| i18n | i18next (es, bri, cab, ngb) |
| Backend | Node.js + Express |
| Multimedia | Opus (audio), WebP (imágenes), HLS (video) |
| Seguridad | AES-256 reposo, TLS 1.3 tránsito, RBAC + CARE 4 niveles |

### A.4 Gobernanza Cultural (ADR-009)

> Decisión completa: [[ADR-009]]
> **Estado:** Aceptado

Principios CARE aplicados: Collective Benefit, Authority to Control, Responsibility, Ethics. Cuatro niveles de acceso (Público, Comunitario, Restringido, Ceremonial). Marco legal: Convenio 169 OIT, Ley 6172, Ley 7788, Ley 8968.

### A.5 WBS (Work Breakdown Structure)

> Documento completo: [[04-Arquitectura/WBS]]

16 paquetes de trabajo organizados en 4 módulos, con diccionario de alcance.

---

## Anexo B: Contribuciones del Equipo

### B.1 Distribución de Trabajo — Avance 2

| Sección del Documento | Responsable | Horas | Evidencia |
|----------------------|-------------|-------|-----------|
| §2 Actores del sistema | Geovanny | 2h | T-032 |
| §3 Lista de casos de uso | Elkin | 3h | T-033 |
| §4.1-4.2 CU módulo EDU | Geovanny | 4h | T-034 |
| §4.3-4.4 CU módulo SAB | Elkin | 4h | T-035 |
| §4.5-4.6 CU módulo SAL | Santiago | 4h | T-036 |
| §4.7-4.8 CU módulo TRANS | Santiago | 4h | T-037 |
| §5 Diagrama UML | Geovanny | 3h | T-038 |
| §6 Matriz de trazabilidad | Elkin | 2h | T-039 |
| §7 Conclusiones | Santiago | 2h | T-040 |
| Compilación y revisión | Geovanny | 3h | T-041 |
| Exportación PDF y entrega | Geovanny | 1h | T-042 |
| **Total** | | **32h** | **11 tareas** |

### B.2 Horas por Miembro

| Miembro | Rol | Tareas | Horas | % |
|---------|-----|--------|-------|---|
| **Geovanny Alpízar** | PM / Arquitecto | T-032, T-034, T-038, T-041, T-042 | 13h | 41% |
| **Elkin** | Investigación / SAB | T-033, T-035, T-039 | 9h | 28% |
| **Santiago** | QA / SAL | T-036, T-037, T-040 | 10h | 31% |

> La distribución refleja la mayor carga en el PM por tareas de compilación y exportación, mientras el trabajo de documentación de casos de uso se distribuyó equitativamente (2 CU por cada miembro no-PM, 2 CU para el PM).

---

## Referencias

- [[01-Proyecto/Charter|Charter del Proyecto]]
- [[01-Proyecto/Alcance|Alcance]]
- [[04-Arquitectura/Visión General|Arquitectura General (C4)]]
- [[04-Arquitectura/Modelo de Datos|Modelo de Datos (ER)]]
- [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]]
- [[04-Arquitectura/WBS|Work Breakdown Structure]]
- [[ADR-008|ADR-008 — Selección de Stack Tecnológico]]
- [[ADR-009|ADR-009 — Gobernanza Cultural y Protocolos de Consentimiento]]
- [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa de Territorios Indígenas]]
- [[03-Requerimientos/_RTM|Matriz de Trazabilidad de Requerimientos]]
- [[05-Sprints/Sprint-02/Sprint-02-Review|Sprint-02 Review]]

---

*Documento generado el 2026-03-26 · Equipo Raíces Vivas · CENFOTEC*
*Curso: SOFT-09 — Introducción a la Ingeniería del Software — Prof. Johnny Marin*
