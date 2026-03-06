---
type: COURSE
title: Software Development Technician
source: "[[Software Engineering Introduction]]"
tags:
---

## Justificación

El proyecto **Raíces Vivas** es socialmente relevante porque atiende necesidades reales y persistentes en comunidades indígenas de Costa Rica, donde convergen desafíos educativos, riesgos de pérdida de patrimonio biocultural y barreras de acceso a servicios básicos de salud. Estas comunidades no solo representan una parte fundamental de la diversidad cultural del país, sino que también resguardan lenguas, formas de organización y saberes ancestrales que aportan valor social, ambiental y científico. Cuando existen brechas en educación, en transmisión de conocimiento y en atención sanitaria, no solo se afecta el bienestar inmediato de las personas, sino también la continuidad de su identidad cultural y sus oportunidades de desarrollo.

Desde la **ingeniería de software**, este proyecto es pertinente porque exige precisamente lo que la disciplina busca resolver: transformar una problemática compleja del mundo real en una solución tecnológica viable mediante un proceso estructurado de análisis, identificación de actores, educción de requerimientos y especificación verificable. En esta etapa, el valor no está en “programar”, sino en **reducir ambigüedad**, **priorizar necesidades**, y construir una base técnica sólida que guíe el desarrollo futuro sin improvisación. Además, la naturaleza multidimensional del problema permite aplicar principios clásicos de diseño estructurado: descomposición en módulos, definición clara de procesos y límites del sistema, y trazabilidad entre necesidades y requerimientos.

La tecnología puede apoyar sin vulnerar la identidad cultural si se diseña bajo un enfoque de **respeto, consentimiento y control comunitario**. En lugar de imponer dinámicas externas, el sistema debe adaptarse al contexto: considerar conectividad limitada, alfabetización digital diversa, multilingüismo, y —sobre todo— reconocer que ciertos contenidos culturales pueden ser sensibles o restringidos. Por eso, el diseño debe contemplar mecanismos como control de acceso por roles comunitarios, opciones de uso offline, y una lógica de “propiedad” de la información donde la comunidad decide qué se documenta, cómo se comparte y con quién. Así, la tecnología se convierte en un instrumento de fortalecimiento cultural, no de extracción o exposición.

Finalmente, el proyecto es **viable dentro de un nivel de complejidad baja-media** porque se plantea como una solución **modular y escalable**, permitiendo delimitar el alcance académico sin perder visión sistémica. Aunque “Raíces Vivas” se concibe con tres áreas (educación, saberes ancestrales y salud), en el marco del curso se abordará principalmente el análisis del contexto y la especificación de requerimientos, dejando la implementación para fases posteriores. Esta modularidad permite iniciar con un subconjunto funcional —por ejemplo, un repositorio educativo bilingüe o un módulo básico de registro y consulta— manteniendo la coherencia del sistema completo. De esta manera, el entregable cumple con los objetivos del curso: comprender la problemática, descomponerla en partes manejables, y definir especificaciones claras, medibles y verificables que sustenten una futura solución tecnológica pertinente y factible.

---
## Antecedentes (El Problema)

### 1. Educación en comunidades indígenas

En Costa Rica, la educación en territorios indígenas se desarrolla en un contexto sociocultural particular: diversidad lingüística, organización comunitaria propia y una relación fuerte entre identidad, territorio y aprendizaje. Sin embargo, este contexto suele entrar en tensión con un sistema educativo nacional que evalúa con **instrumentos estandarizados** y que históricamente ha tenido dificultades para incorporar, de forma consistente, enfoques interculturales en el aula y en los procesos de medición del logro académico. Esta brecha se refleja en **bajas coberturas educativas, alta repitencia y expulsión del sistema** en población indígena, según diagnósticos nacionales y reportes sobre condiciones de vida. 

Un hito clave es el **Decreto Ejecutivo N.° 37801-MEP (2013)**, que reforma el Subsistema de Educación Indígena e incorpora mecanismos de participación y estructura institucional para atender particularidades territoriales, incluyendo figuras como Consejos Locales de Educación Indígena y disposiciones sobre nombramiento y gestión del personal docente en territorios indígenas. ([Procuraduría General de la República][1]) En la práctica, este marco busca fortalecer la pertinencia cultural, pero también revela un desafío estructural: la presencia de docentes comunitarios —cruciales para preservar lengua y cultura— convive con necesidades de acompañamiento pedagógico y recursos para preparar a estudiantes ante **pruebas nacionales** y trayectorias educativas posteriores, especialmente cuando los contenidos, los ritmos de aprendizaje y el idioma del aula no coinciden con los supuestos del currículo estandarizado. ([Conare Repository][2])

Actores directamente implicados en esta problemática incluyen: **estudiantes**, **docentes indígenas**, **familias**, **Consejos Locales**, direcciones regionales y el **MEP** como ente rector. El problema no se reduce a “falta de estudio” o “falta de ganas”, sino a un conjunto de condiciones: disponibilidad de recursos, pertinencia cultural del material, continuidad de acompañamiento, y alineación entre la educación intercultural y los mecanismos formales de evaluación y certificación. ([Conare Repository][2])

---
### 2. Transferencia de conocimientos ancestrales

Los pueblos indígenas preservan conocimientos y prácticas tradicionales que tienen valor cultural, social y ecológico: agricultura diversificada, manejo de semillas, calendarios vinculados a ciclos naturales, uso sostenible de biodiversidad y formas de conservación que hoy son reconocidas por su relevancia en escenarios de cambio climático y protección de ecosistemas. ([UNESCO][3]) En Costa Rica, incluso estrategias nacionales de biodiversidad reconocen el papel de los pueblos indígenas y comunidades locales en el uso ancestral de recursos y en la existencia de conocimientos tradicionales asociados. ([Conagebio][4])

El problema central no es la inexistencia del conocimiento, sino su **vulnerabilidad**: gran parte se transmite por vía oral y práctica, y enfrenta presiones contemporáneas como cambios en estilo de vida, degradación ambiental y la reducción del interés de personas jóvenes por continuar actividades tradicionales vinculadas al territorio. En un manual sobre prácticas ancestrales bribri y cabécar, por ejemplo, se señalan factores que fragilizan el equilibrio cultural y se expresa preocupación porque “los jóvenes ya no quieren dedicarse al trabajo de la tierra” y sustituyen valores indígenas por otros. 

A esto se suma un componente tecnológico y organizativo: la **falta de sistemas sostenidos de documentación y preservación** (con control comunitario) y las limitaciones de conectividad en varios territorios dificultan construir repositorios culturales útiles y seguros. Los esfuerzos de conectividad han avanzado, pero la brecha digital y su cobertura desigual siguen siendo una variable crítica cuando se piensa en herramientas digitales para comunidades rurales e indígenas. ([ITU][5])

Actores relevantes aquí incluyen: **personas mayores y portadoras de saber**, **jóvenes**, **líderes comunitarios**, organizaciones locales y entidades que trabajan con patrimonio cultural y biodiversidad. El reto es doble: preservar sin descontextualizar, y evitar que la documentación se convierta en exposición o pérdida de control sobre contenidos sensibles.

---
### 3. Acceso a salud

El acceso a salud en territorios indígenas se ve afectado por barreras que no son meramente administrativas, sino geográficas y logísticas: distancia a centros médicos, rutas en mal estado o inexistentes, inaccesibilidad estacional, y limitaciones de transporte. Este patrón se describe ampliamente en literatura regional sobre prestación de servicios en zonas indígenas, donde las **barreras geográficas** se identifican como un obstáculo directo para la atención oportuna. ([Pan American Health Organization][6])

En Costa Rica, documentos y acciones recientes evidencian que el Estado reconoce la condición de “zonas de difícil acceso” con énfasis en territorios indígenas, precisamente porque el tiempo y la distancia pueden comprometer la estabilidad clínica del paciente o volver inviable un traslado seguro. ([Ministerio de Salud Costa Rica][7]) El Ministerio de Salud ha descrito intervenciones para mejorar respuesta ante emergencias y acceso oportuno, incluyendo coordinación interinstitucional y giras periódicas en territorios como Telire, lo que confirma la existencia de brechas operativas reales asociadas al aislamiento territorial. ([Ministerio de Salud Costa Rica][8])

Además del acceso físico, existe un reto de **continuidad y seguimiento**, especialmente para condiciones crónicas o necesidades preventivas. Informes sobre niñez y adolescencia indígena destacan cómo patrones de movilidad y condiciones de vida pueden interferir con el acceso regular tanto a educación como a servicios de salud, lo que agrava vulnerabilidad. ([UNICEF][9])

Los actores clave en esta problemática incluyen: población comunitaria, personal de atención primaria (p. ej., equipos locales), instituciones como la **CCSS**, entidades de emergencia y el Ministerio de Salud. El problema se expresa como una combinación de acceso territorial, coordinación, seguimiento y registro de información; no es solo “falta de médicos”, sino una cadena completa de condiciones que impiden atención oportuna, continua y pertinente. ([Ministerio de Salud Costa Rica][8])

---
## Objetivo General y Específicos

### Objetivo general

Diseñar y documentar los requerimientos de un sistema tecnológico integral, denominado **Raíces Vivas**, orientado a apoyar los procesos educativos, la preservación del conocimiento ancestral y la gestión básica de salud en comunidades indígenas de Costa Rica, aplicando una metodología de **diseño estructurado** para asegurar claridad, trazabilidad y viabilidad de la solución propuesta.

### Objetivos específicos

1. **Analizar** el contexto social, cultural, geográfico y tecnológico de la problemática seleccionada, considerando las particularidades de los territorios indígenas y sus condiciones de acceso a servicios esenciales.
2. **Identificar y caracterizar** los actores involucrados (usuarios directos e indirectos), sus roles y necesidades, mediante la recopilación de información contextual y la construcción de un panorama integral del entorno del proyecto.
3. **Determinar y priorizar** las necesidades reales derivadas de la problemática, diferenciando entre requerimientos críticos, importantes y secundarios, con el fin de definir un alcance factible acorde al nivel de complejidad establecido.
4. **Definir** requerimientos funcionales del sistema de forma clara, medible y verificable, organizándolos por módulos (educación, conocimiento ancestral y salud) y garantizando su alineación con las necesidades identificadas.
5. **Establecer** requerimientos no funcionales (usabilidad, seguridad, disponibilidad, rendimiento, conectividad y consideraciones culturales) coherentes con las restricciones reales del contexto, especialmente en zonas rurales e indígenas.
6. **Validar** los requerimientos preliminares mediante técnicas de investigación de campo y consulta con usuarios potenciales (entrevistas, observación o instrumentos similares), ajustando las especificaciones en función de hallazgos y evidencia recopilada.

---
## Marco Metodológico

El enfoque metodológico de este proyecto se diseña para alcanzar **nivel Excelente** en la rúbrica: análisis profundo del contexto, identificación y priorización de necesidades reales, y especificación de requerimientos verificables. Se integra un enfoque de **gestión de proyectos** (iterativo, con retroalimentación y control de alcance) con técnicas de **ingeniería de requerimientos**, **diseño estructurado** y prácticas de **investigación social aplicada** (sensibles al contexto cultural).

### Tipo de Investigación

**Investigación aplicada, con enfoque cualitativo–descriptivo y orientación socio-técnica.**

**Justificación:**  
La meta del entregable no es programar, sino **comprender la problemática en contexto real** (educativo, cultural y de salud), **identificar actores** y **traducir necesidades en especificaciones técnicas** (requerimientos funcionales y no funcionales). El enfoque cualitativo permite capturar matices culturales, lingüísticos y organizativos que suelen perderse en instrumentos puramente cuantitativos, y el enfoque descriptivo permite documentar el “cómo es” el proceso actual (AS-IS) antes de proponer el “cómo debería ser” (TO-BE).

**Enfoque de proyecto (control de alcance y calidad):**  
Se trabajará con planificación iterativa y timeboxing (bloques de tiempo) para reducir riesgo y ambigüedad:

1. **Exploración / Descubrimiento (AS-IS):** comprender el contexto, actores, procesos actuales y restricciones reales.
2. **Definición y Priorización:** convertir hallazgos en necesidades y priorizarlas (críticas, importantes, secundarias).
3. **Especificación (TO-BE):** transformar necesidades en requerimientos medibles y verificables, organizados por módulo.
4. **Validación:** revisar requerimientos con usuarios potenciales y ajustar (ciclo de feedback).

Este esquema es deliberadamente **incremental**: cada iteración produce un artefacto verificable (mapa de actores, lista priorizada de necesidades, borrador de requerimientos, versión validada).

---
### Población o muestra (deseable)

**Muestra intencional (no probabilística), por roles clave del sistema**.  
Se seleccionan participantes que representen los perfiles más influyentes en la definición de necesidades y restricciones, buscando diversidad de perspectivas.

**Propuesta mínima viable (para complejidad baja-media):**

- **2 docentes comunitarios** (idealmente con experiencia en enseñanza intercultural y/o lengua indígena).
- **3 estudiantes** (dos de secundaria y uno de último ciclo de primaria, si es posible) para captar fricciones reales.
- **1 líder comunal o representante territorial** (para criterios culturales, permisos, y límites de acceso a saberes).
- **1 miembro de brigada de salud / personal vinculado a atención primaria** (para flujos de atención, continuidad y restricciones).

**Muestra ampliada (si el acceso lo permite):**

- **1 portador(a) de conocimiento ancestral** (persona mayor o referente cultural).
- **1 familiar/cuidador** (visión de soporte y barreras de acceso).
- **1 actor institucional** (MEP/CCSS/ONG local) como informante clave.

**Si no se logra acceso directo:**  
Se documentará una **muestra simulada** basada en fuentes documentales, entrevistas indirectas (informantes), y evidencia secundaria; sin embargo, el objetivo recomendado es validar al menos con 2–3 usuarios reales para sostener el criterio “Excelente”.

---
### Descripción de los instrumentos

Se utilizarán instrumentos complementarios para lograr triangulación (misma realidad vista desde varios ángulos), y para convertir evidencia cualitativa en especificaciones técnicas.

#### 1) Revisión documental (línea base)

**Fuentes:** decretos, informes institucionales, estudios académicos, diagnósticos y documentos de contexto.  
**Propósito:** construir un panorama inicial del problema, identificar restricciones y términos clave, y preparar guías de entrevista.  
**Salida:** matriz de hallazgos (problemas → actores → impactos → evidencias) y lista preliminar de necesidades.

#### 2) Entrevistas semiestructuradas (núcleo de educción)

**Participantes:** docentes, estudiantes, liderazgo comunal, salud.  
**Propósito:** capturar experiencias reales, procesos actuales, fricciones y criterios culturales.  
**Formato:** 20–40 minutos por entrevista, con preguntas abiertas + preguntas de verificación.

**Ejes de preguntas (ejemplos):**

- **Educación:**
    
    - ¿Qué contenidos cuestan más y por qué?
    - ¿Qué recursos existen hoy (papel, WhatsApp, guías)?
    - ¿Dónde se rompe el proceso cuando se preparan pruebas estandarizadas?
        
- **Conocimiento ancestral:**
    
    - ¿Qué saberes se consideran “compartibles” y cuáles son restringidos?
    - ¿Cómo se transmite hoy (oralidad, práctica, ritual, familia)?
    - ¿Qué riesgos perciben (pérdida, mal uso, apropiación)?
        
- **Salud:**
    
    - ¿Cómo se gestionan citas/seguimientos hoy?
    - ¿Qué sucede cuando no hay conexión o transporte?
    - ¿Qué datos son sensibles y quién debe verlos?

**Datos recolectados:** narrativas, pasos de procesos, excepciones, restricciones, prioridades y criterios de aceptación.

#### 3) Encuestas breves (apoyo de priorización)

**Propósito:** validar patrones detectados en entrevistas y cuantificar prioridades sin caer en complejidad estadística.  
**Formato:** 8–12 ítems tipo Likert + 2 preguntas abiertas.  
**Uso principal:** priorizar necesidades (qué duele más / qué urge más / qué aportaría más valor).

#### 4) Observación contextual (cuando sea posible)

**Propósito:** contrastar lo que se dice con lo que ocurre (brecha entre “debería” y “es”).  
**Qué se observa:** flujo de atención, uso real de herramientas, conectividad, tiempos, barreras de acceso, interacciones.  
**Salida:** notas de campo + hallazgos sobre restricciones no evidentes (por ejemplo: dependencia de un solo dispositivo, baja señal, tiempos de traslado).

## Consideraciones éticas y culturales (parte metodológica crítica)

Dado el contexto indígena, se incorporan criterios mínimos para no vulnerar identidad ni información sensible:

- **Consentimiento informado** para entrevistas y registro de información.
- **Control comunitario** sobre contenidos culturales (quién decide qué se documenta y quién accede).
- **Protección de datos** en salud (confidencialidad y acceso por roles).
- **Principio de minimización:** recolectar solo lo necesario para definir requerimientos.

---
## Requerimientos Funcionales y No Funcionales

### 1) [[WBS]] / EDT de Alto Nivel (orientada a requerimientos)

**RV-1. Módulo Educativo (EDU)**

* RV-1.1 Gestión de actores educativos
* RV-1.2 Gestión de contenidos educativos
* RV-1.3 Evaluación y práctica académica
* RV-1.4 Acceso y uso en contexto (bilingüe/offline)

**RV-2. Módulo de Conocimiento Ancestral (SAB)**

* RV-2.1 Registro multiformato de saberes
* RV-2.2 Catalogación y búsqueda
* RV-2.3 Gobernanza y control comunitario
* RV-2.4 Preservación y trazabilidad cultural

**RV-3. Módulo de Salud Comunitaria (SAL)**

* RV-3.1 Registro y gestión de pacientes
* RV-3.2 Citas y brigadas comunitarias
* RV-3.3 Seguimiento y alertas
* RV-3.4 Confidencialidad y continuidad (offline)

**RV-4. Requerimientos Transversales (NFR / Cross-cutting)**

* RV-4.1 Conectividad y modo offline
* RV-4.2 Multilingüismo y accesibilidad
* RV-4.3 Seguridad, privacidad y auditoría
* RV-4.4 Rendimiento y compatibilidad de dispositivo

---
### 2) [[WBS]] Dictionary (Paquetes de trabajo y su alcance)

A continuación, cada paquete de trabajo (WBS) define su propósito y genera requerimientos trazables.

---
#### RV-1. Módulo Educativo (EDU)

##### RV-1.1 Gestión de actores educativos

**Propósito:** Registrar y mantener información básica de docentes comunitarios y estudiantes para personalizar contenidos y soporte.
**Entregable:** Registro de perfiles educativos.
**Fuera de alcance:** Gestión de nómina, pagos, escalafón.

**[[RF-EDU-01]] (RV-1.1): Registro de docentes comunitarios**
El sistema debe permitir registrar docentes comunitarios con datos básicos (nombre, territorio, rol, contacto) e indicar su lengua indígena dominante y nivel académico.
**Criterios de aceptación:**

* Se puede crear/editar/inactivar un docente.
* Campo “lengua dominante” es obligatorio.
* Validación mínima: nombre + territorio + rol.

[[RF-EDU-02]] (RV-1.1) - Registro básico de estudiantes
El sistema debe permitir registrar estudiantes con datos mínimos (nombre, nivel educativo, lengua principal, centro educativo/territorio) para asociarles materiales y prácticas.
**Criterios de aceptación:**

* Registro con mínimo 4 campos obligatorios.
* Asociación a un territorio/circuito educativo.

---
#### RV-1.2 Gestión de contenidos educativos

**Propósito:** Almacenar y organizar recursos educativos en español y lengua indígena.
**Entregable:** Repositorio educativo bilingüe.
**Fuera de alcance:** Contenido certificado por MEP (se almacena, no se “emite” certificación).

**[[RF-EDU-03]] (RV-1.2): Carga de materiales educativos**
El sistema debe permitir almacenar materiales educativos en formatos texto, audio y video, asociándolos a idioma (español/lengua indígena), tema y nivel académico.
**Criterios de aceptación:**

* Un material tiene: título, idioma, nivel, tema, formato.
* Búsqueda por idioma + nivel.

**[[RF-EDU-04]] (RV-1.2): Organización por asignatura y competencias**
El sistema debe permitir clasificar materiales por asignatura (ej. Matemática, Español, Ciencias) y por competencia/habilidad.
**Criterios de aceptación:**

* Mínimo 2 niveles de clasificación (asignatura → competencia).

---
#### RV-1.3 Evaluación y práctica académica

**Propósito:** Facilitar práctica alineada con evaluaciones nacionales sin reemplazar el currículo comunitario.
**Entregable:** Banco de práctica y seguimiento básico.
**Fuera de alcance:** Calificación oficial o emisión de notas formales.

**[[RF-EDU-05]] (RV-1.3): Generación de ejercicios de práctica**
El sistema debe permitir generar ejercicios de práctica alineados con contenidos de evaluación nacional (por ejemplo, estructuras tipo ítem), asociados a tema y nivel.
**Criterios de aceptación:**

* Se generan ejercicios por filtro: nivel + tema.
* Registro de intentos por estudiante (correcto/incorrecto).

**[[RF-EDU-06]] (RV-1.3): Seguimiento de progreso básico**
El sistema debe mostrar un resumen de progreso por estudiante (porcentaje de aciertos por tema en un período).
**Criterios de aceptación:**

* Reporte por tema y período (semanal/mensual).

---
### RV-2. Módulo de Conocimiento Ancestral (SAB)

#### RV-2.1 Registro multiformato de saberes

**Propósito:** Documentar saberes ancestrales en formatos accesibles (texto/audio/video) manteniendo contexto.
**Entregable:** Registro de saberes con metadatos.
**Fuera de alcance:** Publicación abierta automática.

**[[RF-SAB-01]] (RV-2.1): Registro de saberes**
El sistema debe permitir registrar saberes ancestrales mediante texto, audio o video, incluyendo descripción, origen (territorio) y contexto (uso/propósito).
**Criterios de aceptación:**

* Un saber incluye: título, categoría, formato, territorio, nivel de acceso.

---
#### RV-2.2 Catalogación y búsqueda

**Propósito:** Facilitar recuperación de información sin perder control cultural.
**Entregable:** Catálogo y motor de búsqueda básico.
**Fuera de alcance:** Indexación avanzada con IA (en esta fase).

**[[RF-SAB-02]] (RV-2.2): Clasificación por categoría**
El sistema debe clasificar los conocimientos por categorías definidas (ej. agricultura, medicina tradicional, alimentación, conservación, ritualidad).
**Criterios de aceptación:**

* Categorías configurables por administrador comunitario.

**[[RF-SAB-03]] (RV-2.2): Búsqueda por filtros**
El sistema debe permitir buscar saberes por categoría, territorio, idioma y formato.
**Criterios de aceptación:**

* Retorna resultados en < 3 segundos en condiciones normales.

---
#### RV-2.3 Gobernanza y control comunitario

**Propósito:** Garantizar que la comunidad decide quién ve qué, y cómo se comparte.
**Entregable:** Modelo de roles y permisos.
**Fuera de alcance:** Integración con sistemas externos de identidad estatal.

**[[RF-SAB-04]] (RV-2.3): Restricción de acceso por autorización comunitaria**
El sistema debe permitir restringir el acceso a contenidos según nivel de autorización comunitaria (público, comunitario, restringido, ceremonial/sensible).
**Criterios de aceptación:**

* Cada contenido tiene un nivel de acceso obligatorio.
* Roles definidos pueden consultar según permiso.

**[[RF-SAB-05]] (RV-2.3): Registro de consentimiento**
El sistema debe registrar la confirmación de consentimiento comunitario o del portador del conocimiento al momento de documentar un saber (fecha, responsable, nivel de acceso).
**Criterios de aceptación:**

* No se publica/guarda como “activo” sin consentimiento marcado.

---
### RV-3. Módulo de Salud Comunitaria (SAL)

#### RV-3.1 Registro y gestión de pacientes

**Propósito:** Consolidar información mínima para continuidad de atención.
**Entregable:** Perfil de paciente e historial básico.
**Fuera de alcance:** Expediente clínico completo tipo hospitalario.

**[[RF-SAL-01]] (RV-3.1): Registro de pacientes**
El sistema debe permitir registrar pacientes con información básica (identificación interna, nombre, edad, territorio, contacto) y datos relevantes mínimos.
**Criterios de aceptación:**

* Identificador interno único.
* Campos sensibles con control de acceso.

**[[RF-SAL-02]] (RV-3.1): Historial médico básico**
El sistema debe permitir registrar un historial básico (condiciones crónicas, alergias, medicación esencial, notas de visita).
**Criterios de aceptación:**

* Registro por fecha y responsable.
* Vista cronológica.

---
#### RV-3.2 Citas y brigadas comunitarias

**Propósito:** Coordinar atención periódica y mejorar seguimiento.
**Entregable:** Agenda comunitaria.
**Fuera de alcance:** Sistema de referencia hospitalaria nacional.

**[[RF-SAL-03]] (RV-3.2): Programación de citas**
El sistema debe permitir programar citas médicas comunitarias indicando fecha, tipo (control/consulta/campaña), lugar y responsable.
**Criterios de aceptación:**

* No permite solapamiento por responsable en misma franja.

**[[RF-SAL-04]] (RV-3.2): Gestión de brigadas/campañas**
El sistema debe permitir registrar campañas preventivas (vacunación, tamizaje, charlas) y asociar población objetivo.
**Criterios de aceptación:**

* Lista de participantes y estado (pendiente/atendido).

---
#### RV-3.3 Seguimiento y alertas

**Propósito:** Reducir pérdidas de seguimiento en condiciones crónicas.
**Entregable:** Alertas configurables.
**Fuera de alcance:** Diagnóstico automatizado.

**[[RF-SAL-05]] (RV-3.3): Alertas de seguimiento**
El sistema debe generar alertas para seguimiento de enfermedades crónicas según periodicidad definida (ej. mensual/trimestral).
**Criterios de aceptación:**

* Regla configurable por condición (diabetes, hipertensión, etc.).
* Notificación visible en panel del responsable.

---
### 3) Requerimientos No Funcionales (RNF – Transversales, medibles y verificables)

#### RV-4. Requerimientos Transversales

**[[RNF-01]] (RV-4.1): Operación offline + sincronización**
El sistema debe operar en modo offline y sincronizar datos automáticamente cuando se detecte conectividad.
**Métrica/verificación:**

* Permite registrar datos sin internet.
* Sincroniza y resuelve conflictos básicos (última edición o prioridad por rol).

**[[RNF-02]] (RV-4.2): Multilingüismo**
El sistema debe soportar contenido multilingüe (español y al menos una lengua indígena seleccionable), tanto en UI como en contenidos etiquetados.
**Métrica/verificación:**

* UI con selector de idioma.
* Contenido etiquetado por idioma.

**[[RNF-03]] (RV-4.4): Rendimiento**
El tiempo de respuesta no debe superar **3 segundos** para búsquedas y consultas comunes en condiciones normales.
**Métrica/verificación:**

* Prueba con dataset representativo (ej. 200 contenidos + 300 registros).

**[[RNF-04]] (RV-4.3): Confidencialidad y privacidad en salud**
El sistema debe garantizar confidencialidad de datos médicos mediante control de acceso por roles y registro de accesos (auditoría mínima).
**Métrica/verificación:**

* Un usuario sin rol de salud no puede ver historial.
* Se registra quién consultó, qué y cuándo.

**[[RNF-05]] (RV-4.2): Usabilidad en alfabetización digital básica**
La interfaz debe ser usable para usuarios con alfabetización digital básica, minimizando campos obligatorios y manteniendo flujos guiados.
**Métrica/verificación:**

* Registrar una cita o un material en ≤ 2 minutos con un formulario de ≤ 6 campos obligatorios.

**[[RNF-06]] (RV-4.4): Compatibilidad de dispositivo**
El sistema debe funcionar en dispositivos de gama media o baja (Android común y navegadores modernos), evitando dependencias pesadas.
**Métrica/verificación:**

* Carga inicial razonable y sin requerir hardware especializado.

**[[RNF-07]] (RV-4.3): Gobernanza cultural y control comunitario**
El sistema debe permitir que la comunidad defina niveles de acceso y roles para contenidos culturales, evitando exposición no autorizada.
**Métrica/verificación:**

* Configuración de roles y permisos editable por administrador comunitario.

---
### 4) Trazabilidad mínima recomendada 

Para cada requerimiento (RF/RNF) se mantiene trazabilidad:

**Problema → Necesidad → WBS → Requerimiento → Criterio de aceptación**

Ejemplo:
Brecha educativa → necesidad de materiales bilingües → RV-1.2 → [[RF-EDU-03]] → criterios de aceptación.

#### Matriz de Trazabilidad de Requerimientos ([[_RTM|RTM]]) – Raíces Vivas

**Leyenda de prioridad (MoSCoW):**

- **M** = Must (Crítico)
- **S** = Should (Importante)
- **C** = Could (Deseable)
- **W** = Won’t (Fuera de alcance por ahora)

| ID Requerimiento | Tipo | WBS    | Módulo      | Problema de origen                                | Necesidad (priorizada)                                | Descripción resumida                                          | Actor principal                       | Prioridad | Criterio de aceptación (medible)             | Fuente/Evidencia                  | Validación prevista        |
| ---------------- | ---- | ------ | ----------- | ------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------- | --------- | -------------------------------------------- | --------------------------------- | -------------------------- |
| [[RF-EDU-01]]        | RF   | RV-1.1 | Educación   | Brecha de apoyo educativo intercultural           | Identificar perfiles docentes para personalizar apoyo | Registro de docentes con lengua dominante y rol               | Docente / Admin                       | M         | Lengua obligatoria + CRUD completo           | Entrevista + revisión MEP         | Revisión con docentes      |
| [[RF-EDU-02]]        | RF   | RV-1.1 | Educación   | Falta de seguimiento básico por estudiante        | Identificar perfiles estudiantiles por nivel/idioma   | Registro mínimo de estudiantes                                | Docente                               | S         | Registro con ≥4 campos obligatorios          | Entrevista/observación            | Revisión con docentes      |
| [[RF-EDU-03]]        | RF   | RV-1.2 | Educación   | Escasez de materiales pertinentes y bilingües     | Acceso a materiales educativos bilingües              | Cargar materiales (texto/audio/video) por idioma y nivel      | Docente/Estudiante                    | M         | Material incluye idioma+nivel+tema           | Revisión documental + entrevistas | Prueba con usuarios        |
| [[RF-EDU-04]]        | RF   | RV-1.2 | Educación   | Desalineación curricular y dificultad de búsqueda | Organización clara por asignatura y competencia       | Clasificar materiales por asignatura/competencia              | Docente                               | S         | 2 niveles de clasificación mínimo            | Entrevista                        | Taller de validación       |
| [[RF-EDU-05]]        | RF   | RV-1.3 | Educación   | Dificultad con pruebas estandarizadas             | Práctica guiada y contextualizada                     | Generar ejercicios por nivel+tema                             | Estudiante/Docente                    | S         | Ejercicios filtrables + registro de intentos | Entrevistas + análisis de pruebas | Validación con estudiantes |
| [[RF-EDU-06]]        | RF   | RV-1.3 | Educación   | Falta de retroalimentación temprana               | Medir progreso básico por tema                        | Resumen de aciertos por tema y período                        | Docente                               | C         | Reporte semanal/mensual                      | Encuesta/entrevistas              | Revisión con docentes      |
| [[RF-SAB-01]]        | RF   | RV-2.1 | Saberes     | Riesgo de pérdida cultural (oralidad)             | Documentar saberes con contexto                       | Registro multiformato con territorio y contexto               | Portador de saber / Admin comunitario | M         | Título+categoría+formato+territorio+acceso   | Entrevistas + fuentes culturales  | Validación comunitaria     |
| [[RF-SAB-02]]        | RF   | RV-2.2 | Saberes     | Conocimiento disperso y difícil de recuperar      | Catalogación por categorías locales                   | Clasificación por categorías configurables                    | Admin comunitario                     | S         | Categorías editables por admin               | Entrevistas                       | Revisión con líderes       |
| [[RF-SAB-03]]        | RF   | RV-2.2 | Saberes     | Búsqueda ineficiente / pérdida de tiempo          | Acceso rápido a saberes autorizados                   | Buscar por categoría/territorio/idioma/formato                | Usuario autorizado                    | S         | Resultados en <3s (condiciones normales)     | Observación contextual            | Prueba controlada          |
| [[RF-SAB-04]]        | RF   | RV-2.3 | Saberes     | Riesgo de exposición/apropiación cultural         | Control comunitario del acceso                        | Acceso por niveles (público/comunitario/restringido/sensible) | Admin comunitario                     | M         | Nivel de acceso obligatorio + roles          | Entrevistas + ética               | Validación comunitaria     |
| [[RF-SAB-05]]        | RF   | RV-2.3 | Saberes     | Documentar sin consentimiento es riesgoso         | Consentimiento trazable                               | Registrar consentimiento y responsable                        | Admin comunitario                     | M         | No queda “activo” sin consentimiento         | Entrevistas                       | Revisión de proceso        |
| [[RF-SAL-01]]        | RF   | RV-3.1 | Salud       | Fragmentación de información básica               | Registro mínimo para continuidad                      | Registro de paciente con ID interno único                     | Personal salud                        | M         | ID único + control de acceso                 | Entrevistas + doc salud           | Validación con brigada     |
| [[RF-SAL-02]]        | RF   | RV-3.1 | Salud       | Falta de historial accesible                      | Continuidad de atención                               | Historial básico (crónicos/alergias/medicación/notas)         | Personal salud                        | M         | Vista cronológica por fecha                  | Entrevistas                       | Validación con salud       |
| [[RF-SAL-03]]        | RF   | RV-3.2 | Salud       | Dificultad para coordinar atención                | Gestión de citas comunitarias                         | Programar citas con responsable y lugar                       | Personal salud                        | S         | Sin solapamientos por responsable            | Observación                       | Prueba con agenda          |
| [[RF-SAL-04]]        | RF   | RV-3.2 | Salud       | Campañas preventivas mal coordinadas              | Registrar brigadas/campañas                           | Registro de campañas y población objetivo                     | Personal salud                        | C         | Lista de participantes + estado              | Doc. institucional                | Validación con salud       |
| [[RF-SAL-05]]        | RF   | RV-3.3 | Salud       | Pérdida de seguimiento en crónicos                | Alertas de seguimiento                                | Alertas por periodicidad configurable                         | Personal salud                        | S         | Regla configurable + panel de alertas        | Entrevistas                       | Prueba con casos           |
| [[RNF-01]]           | RNF  | RV-4.1 | Transversal | Conectividad limitada / intermitente              | Operación offline y sincronización                    | Offline + sync automática                                     | Todos                                 | M         | Registra sin internet + sincroniza           | Contexto territorial              | Prueba de campo            |
| [[RNF-02]]           | RNF  | RV-4.2 | Transversal | Multilingüismo / barrera cultural                 | UI y contenidos multilingües                          | UI con selector + contenido etiquetado                        | Todos                                 | M         | Selector idioma + etiquetas                  | Entrevistas                       | Validación usuarios        |
| [[RNF-03]]           | RNF  | RV-4.4 | Transversal | Baja tolerancia a lentitud                        | Rendimiento aceptable                                 | Respuesta <3s en consultas comunes                            | Todos                                 | S         | Prueba de rendimiento simple                 | Buenas prácticas                  | Test técnico               |
| [[RNF-04]]           | RNF  | RV-4.3 | Transversal | Datos médicos sensibles                           | Privacidad y control por roles                        | Acceso por roles + auditoría mínima                           | Salud/Admin                           | M         | Bloqueo por rol + log accesos                | Ética + normativa                 | Revisión con salud         |
| [[RNF-05]]           | RNF  | RV-4.2 | Transversal | Alfabetización digital básica                     | Usabilidad simplificada                               | Flujos guiados, pocos campos obligatorios                     | Todos                                 | S         | Acción clave ≤2 min, ≤6 campos oblig.        | Observación                       | Prueba con usuarios        |
| [[RNF-06]]           | RNF  | RV-4.4 | Transversal | Dispositivos de gama baja                         | Compatibilidad y ligereza                             | Funciona en Android/Browser comunes                           | Todos                                 | S         | Sin hardware especial                        | Contexto                          | Test de compatibilidad     |
| [[RNF-07]]           | RNF  | RV-4.3 | Transversal | Riesgo cultural por difusión                      | Gobernanza cultural                                   | Roles/permisos configurables por comunidad                    | Admin comunitario                     | M         | Configurable por admin local                 | Ética + entrevistas               | Validación comunitaria     |

---
## Conclusiones y Recomendaciones

### Conclusiones

1. El desarrollo de **Raíces Vivas** evidencia que, en proyectos con impacto social, el mayor reto inicial no es programar, sino **comprender el problema en su contexto real**. La diversidad cultural, lingüística y territorial de las comunidades indígenas exige un análisis estructurado que permita transformar situaciones complejas (educación, preservación del conocimiento y salud) en necesidades claramente definidas y, posteriormente, en requerimientos verificables. En esta fase, el valor principal del proyecto fue construir una base sólida de entendimiento que reduzca ambigüedad y evite diseñar una solución desconectada del contexto.
    
2. El análisis realizado confirma que cualquier intervención tecnológica en territorios indígenas debe sostenerse sobre un enfoque **culturalmente respetuoso**, donde la comunidad conserve control sobre su información, especialmente en lo referente a saberes ancestrales y datos sensibles de salud. La transmisión oral, la gobernanza comunitaria y la cosmovisión vinculada al territorio no son “detalles”, sino condiciones estructurales que determinan cómo se debe recolectar información, cómo se valida y qué componentes pueden o no digitalizarse. Por tanto, la pertinencia tecnológica depende tanto de la funcionalidad como de la ética y del consentimiento.
    
3. A nivel técnico, se concluye que la **viabilidad del sistema** se fortalece mediante una arquitectura **modular y escalable**. La descomposición del problema en tres módulos (educación, saberes ancestrales y salud) permite mantener trazabilidad entre necesidades y requerimientos, y facilita adaptar el alcance del proyecto a un nivel de complejidad baja-media sin perder visión integral. Además, la identificación de requerimientos no funcionales clave (offline, multilingüismo, usabilidad y privacidad) demuestra que el contexto real condiciona las decisiones técnicas desde el diseño, no como un ajuste posterior.
    
4. Finalmente, la elaboración de requerimientos con criterios medibles, junto con una matriz de trazabilidad, muestra que el enfoque de **ingeniería de software** permite ordenar la problemática y convertirla en especificaciones concretas. Esto establece una base consistente para fases futuras de diseño detallado e implementación, reduciendo riesgos típicos como cambios tardíos, conflictos de alcance o soluciones que no responden a prioridades comunitarias.
    

---

### Recomendaciones

1. Se recomienda implementar el proyecto **por fases**, iniciando con un alcance controlado que permita resultados tempranos y aprendizaje continuo. Un enfoque iterativo (descubrir → especificar → validar → ajustar) facilita manejar incertidumbre, reduce el riesgo y permite integrar retroalimentación real antes de ampliar funcionalidades.
    
2. Se recomienda mantener una **validación constante con líderes comunitarios y usuarios clave**, no solo al final. En particular, los componentes relacionados con saberes ancestrales deben validarse con gobernanza comunitaria explícita, definiendo con claridad qué información es pública, comunitaria, restringida o sensible. Esta validación debe quedar documentada como parte del proceso de educción y como criterio de aceptación.
    
3. Para asegurar factibilidad en un entorno académico y lograr un piloto exitoso, se recomienda iniciar con **un solo módulo** como primera implementación (por ejemplo, el repositorio educativo bilingüe o el registro básico de salud), manteniendo definidos los requerimientos del sistema completo. Esto permite demostrar resultados concretos sin comprometer el control del alcance ni la calidad de la solución.
    
4. Se recomienda priorizar desde el inicio los requerimientos no funcionales críticos del contexto: **operación offline**, **soporte multilingüe**, **usabilidad para alfabetización digital básica** y **seguridad/privacidad**. En escenarios rurales e indígenas, estos factores determinan la adopción real del sistema; si se ignoran, incluso una solución funcionalmente correcta puede resultar inutilizable en la práctica.

---
![[Raíces Vivas - Sistema Integral de Apoyo a Comunidades Indígenas.pdf]]

---

