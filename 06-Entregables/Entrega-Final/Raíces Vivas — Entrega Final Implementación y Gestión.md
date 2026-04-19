---
type: document
title: "Raíces Vivas — Entrega Final: Implementación y Gestión"
project: raices-vivas
avance: 3
sprint: Sprint-03
status: in-progress
tags:
  - entregable
  - avance-3
  - entrega-final
  - implementación
  - gestión
created: 2026-04-19
updated: 2026-04-19
banner_src: "08-Recursos/Imágenes/cover-entregables.png"
banner_src_x: 0.47714
banner_src_y: 0.42
---

# Raíces Vivas — Entrega Final: Implementación y Gestión

> **Universidad:** CENFOTEC · Curso: Introducción a la Ingeniería de Software (SOFT-09, SCV7)
> **Docente:** Johnny Marin
> **Equipo:** Geovanny Alpízar · Elkin · Santiago
> **Fecha de entrega:** 23 de abril de 2026

---

## Resumen Ejecutivo

Raíces Vivas es un sistema integral diseñado para fortalecer tres ejes interrelacionados en comunidades indígenas de Costa Rica: educación intercultural bilingüe, preservación de saberes ancestrales y salud comunitaria. El proyecto surgió de una investigación de campo que incluyó 4 entrevistas en profundidad con actores clave, 3 observaciones directas en territorios indígenas (Guatuso, Talamanca y Boruca) y 3 encuestas con 75 participantes. Los hallazgos revelaron que el 87 % de los docentes comunitarios carecen de materiales en lengua indígena, el 44 % del personal de salud ha perdido datos de pacientes durante giras a territorios sin conectividad, y lenguas como el boruca sobreviven en apenas 10 hablantes fluidos mayores de 65 años.

La solución propuesta es una Progressive Web Application con arquitectura offline-first (PouchDB/CouchDB), soporte multilingüe nativo en cuatro lenguas (español, bribri, cabécar, ngäbere) y un modelo de gobernanza cultural basado en los principios CARE con cuatro niveles de acceso. El sistema se estructuró en 23 requerimientos funcionales y 4 no funcionales, trazados a 23 casos de uso y un modelo de datos de 38 entidades. La gestión del proyecto se realizó con Scrum adaptado en 3 sprints, ejecutando 58 tareas con un 90 % de completitud, 17 decisiones arquitectónicas documentadas y 14 riesgos gestionados activamente.

**Palabras clave:** pueblos indígenas · offline-first · PWA · gobernanza cultural · CARE · educación intercultural · saberes ancestrales · salud comunitaria · PouchDB · multilingüismo

---

## Tabla de Contenido

1. [Capítulo 1 — Análisis del Problema](#capítulo-1--análisis-del-problema)
   - 1.1 Descripción del Problema
   - 1.2 Metodología de Investigación
   - 1.3 Modelado del Sistema
2. [Capítulo 2 — Diseño de la Solución](#capítulo-2--diseño-de-la-solución)
   - 2.1 Descripción de la Solución
   - 2.2 Prototipos
3. [Capítulo 3 — Gestión de Proyecto](#capítulo-3--gestión-de-proyecto)
   - 3.1 Gestión de Requisitos
   - 3.2 Estimación de Requisitos
   - 3.3 Desglose Funcional del Trabajo
   - 3.4 Cronograma de Trabajo
4. [Capítulo 4 — Conclusiones](#capítulo-4--conclusiones)
5. [Lista de Referencias](#lista-de-referencias)
6. [Anexos](#anexos)

---

## Capítulo 1 — Análisis del Problema

### 1.1 Descripción del Problema

#### Una geografía de contrastes

En el territorio costarricense, 24 territorios indígenas reconocidos albergan a ocho pueblos que representan la diversidad biocultural más antigua del país: los cabécar (~17 000 habitantes), los bribri (~13 000), los ngäbe-buglé (~10 000), los boruca (~2 600), los huetar (~2 500), los maleku (~1 000) y los térraba (~750). La realidad tecnológica de estos territorios, sin embargo, dista de ser uniforme, y esa asimetría fue el primer hallazgo de la investigación de campo.

En Guatuso, los tres palenques maleku —Margarita, Tonjibe y El Sol— gozan de electricidad estable y cobertura 4G con hasta cuatro barras de señal; el EBAIS más cercano se encuentra a menos de 30 minutos ([[OBS-001]]). A 200 kilómetros de distancia, en Alto Chirripó, el panorama es radicalmente distinto: **cero señal de celular** —no intermitente, inexistente—, electricidad alimentada por paneles solares y micro-hidroeléctricas, y el centro de salud más cercano a entre 4 y 8 horas de caminata ([[OBS-002]]). En Talamanca Alta, llegar a Amubri —centro ceremonial bribri— requiere una hora en vehículo por carretera de lastre hasta Suretka, seguida de 45 minutos en lancha por el río Telire o 2.5 horas a pie por sendero.

| Territorio | Electricidad | Señal celular | EBAIS más cercano | Complejidad |
|-----------|-------------|---------------|-------------------|-------------|
| Guatuso (Maleku) | ✅ Estable (ICE) | 4G (3-4 barras) | < 30 min | Baja |
| Buenos Aires (Boruca) | ✅ Estable (ICE) | 3G/4G parcial | < 30 min | Baja-Media |
| Talamanca Alta (Bribri) | ⚠️ Intermitente / Solar | 2G parcial – Sin cobertura | ATAP mensual | Alta |
| Alto Chirripó (Cabécar) | ⚠️ Solar / Micro-hidro | ❌ Sin cobertura | 4-8 h caminando | Muy Alta |

> **Fuente:** Observaciones de campo OBS-001, OBS-002, OBS-003 (marzo 2026) y [[02-Investigación/Contexto/Mapa de Territorios Indígenas|Mapa de Territorios Indígenas]].

Esta asimetría define el requisito no negociable del proyecto: un sistema que funcione **sin internet** no como contingencia, sino como modo primario de operación.

#### La brecha educativa: materiales en español para voces indígenas

Cuando la docente de cultura maleku de Tonjibe describe su realidad cotidiana, los números cobran rostro. Con ocho años de experiencia y cerca de 45 estudiantes distribuidos en tres grupos multigrado, ella crea materiales didácticos de forma artesanal con la ayuda de una anciana hablante de maleku jaíka ([[ENT-001]]). Los libros del MEP «están en español y no hablan de la cultura maleku», señala. Un diccionario maleku compilado por el lingüista Adolfo Constenla existe en papel, pero no ha sido digitalizado. Dos computadoras donadas a la escuela permanecen dañadas; sin tabletas, los alumnos de quinto y sexto grado acceden a tecnología únicamente mediante el celular de sus padres.

La encuesta a 30 docentes comunitarios ([[ENC-EDU-01]]) confirmó que esta experiencia no es aislada:

- El **87 %** reporta materiales en lengua indígena insuficientes.
- El **73 %** crea material propio sin herramientas digitales de apoyo.
- El **83 %** lleva registro de progreso en cuadernos de papel que luego transcribe al sistema del MEP cada trimestre.
- La disposición tecnológica es alta: promedio de **4.3/5** en escala Likert.

La brecha, entonces, no es actitudinal sino instrumental. En Suretka (Talamanca), solo 3 de 5 computadoras del liceo funcionan. En Boruca, 2 de 4 equipos operan. Los estudiantes acceden a tecnología, pero ese acceso carece de canal educativo pertinente. Tres comunidades maleku —Tonjibe, Margarita, Palenque— expresaron la necesidad de compartir un repositorio de materiales didácticos: una funcionalidad que se incorporó como RF-EDU-07.

#### Saberes ancestrales: patrimonio en cuenta regresiva

En Amubri, centro ceremonial de Talamanca, un portador de saber bribri del clan Korbata —de aproximadamente 65 años, guardián de conocimientos sobre medicina natural y agricultura tradicional— explicó con naturalidad algo que el equipo de desarrollo plasmó después en el modelo de datos: que los saberes no son todos iguales ([[ENT-002]]). Las plantas medicinales —el güitite para la fiebre, el hombre grande para el dolor de estómago— son de transmisión abierta. Los saberes del clan se comparten dentro del pueblo. Pero los cantos ceremoniales y las historias de Sibö, deidad creadora bribri, pertenecen al Awá, y «eso es sagrado». Sin que se le presentara formalmente el modelo, articuló los cuatro niveles de acceso que el sistema implementa: **público, comunitario, restringido y ceremonial**.

Su preocupación no era teórica:

> «Vino gente de una universidad a preguntar sobre plantas y después publicaron un libro sin permiso.»

La misma historia se repitió en Boruca: un antropólogo documentó ceremonias y el material apareció en internet sin autorización ([[ENT-004]]). Estos episodios de apropiación cultural explican por qué el **80 %** de los portadores de saber encuestados ([[ENC-SAB-01]], n = 20) expresaron preocupación alta por el mal uso de saberes digitalizados, y el **90 %** exigió control absoluto de eliminación. El **85 %** validó los cuatro niveles CARE como adecuados, y el **75 %** declaró que «el consejo decide» sobre el acceso.

La urgencia temporal agudiza el problema. La lengua boruca sobrevive en aproximadamente **10 hablantes fluidos**, todos mayores de 65 años. La lengua térraba ya se extinguió como medio de comunicación cotidiana. «La generación de mis padres dejó de enseñarlo por la presión de la escuela», relató el líder comunal de la ADI de Boruca. Cada saber documentado en boruca cumple un doble propósito: preserva el conocimiento **y** preserva la lengua.

El **70 %** de los portadores prefiere formato de audio o video sobre texto escrito: «Lo mejor es que alguien me grabe con el teléfono mientras yo explico y muestro la planta», porque «muchas plantas no tienen nombre en español». Las condiciones de participación fueron claras: decisión comunitaria, control de quién lo ve, poder borrar, y que esté en su lengua.

Una frase del líder boruca sintetizó la postura de las comunidades: **«Que nos traten como socios, no como beneficiarios de un proyecto. Nosotros sabemos lo que necesitamos, solo necesitamos la herramienta.»**

#### Salud comunitaria: cuando los datos cruzan ríos

El auxiliar de salud (ATAP) cabécar cubre comunidades en Alto Chirripó desde hace 12 años ([[ENT-003]]). Sus giras duran entre 3 y 5 días, cada 2 a 3 semanas. El recorrido comienza en vehículo hasta donde llega la carretera de lastre; después, entre 2 y 6 horas de caminata por senderos de montaña. Si el río Chirripó crece, hay que esperar. Su maletín contiene un tensiómetro, una balanza, medicamentos básicos y formularios de papel.

> «A veces mi letra se mojó, o no me acuerdo bien de un dato porque vi 40 pacientes en tres días. He perdido datos. Una vez se me cayeron las boletas al río. Desde entonces las meto en una bolsa ziplock.»

La encuesta a 25 profesionales de salud ([[ENC-SAL-01]]) cuantificó esta realidad:

- El **44 %** ha perdido datos de pacientes durante giras a territorios.
- El **80 %** usa formularios individuales en brigadas sin consolidación posterior.
- El **72 %** reporta dificultad en el seguimiento de pacientes crónicos.
- El **56 %** considera importante registrar la medicina tradicional como complemento.

El ATAP de Chirripó monitorea 15 hipertensos y 8 diabéticos sin sistema de alertas — un riesgo clínico tangible con consecuencias reales. El promedio de transcripción manual de papel al sistema EDUS de la CCSS es de **3.2 horas** por gira. En Alto Chirripó, si se presenta una emergencia, «a veces sale alguien a caballo hasta donde haya señal».

El patrón de uso que emerge define la arquitectura del módulo SAL: operación offline durante 3 a 5 días, seguida de sincronización al regresar al EBAIS. La interfaz debe ser tolerante a errores, completable en menos de 2 minutos por registro y legible bajo luz solar directa.

#### Cinco hallazgos transversales

El [[02-Investigación/Análisis de Entrevistas|análisis cruzado]] de las cuatro entrevistas, tres observaciones y tres encuestas convergió en cinco temas que atraviesan los tres módulos del sistema:

1. **Offline-first es existencial**, no una preferencia técnica: 2 de 3 territorios piloto carecen de conectividad usable.
2. **El trauma de apropiación cultural es real y reciente**: casos documentados en bribri y boruca condicionan toda decisión de diseño.
3. **La lengua es vehículo de significado, no solo de interfaz**: el sistema debe operar *en* la lengua indígena, no traducir etiquetas.
4. **La urgencia es temporal**: portadores mayores de 65 años, lenguas con menos de 10 hablantes fluidos.
5. **La gobernanza indígena ya existe**: ADI, Consejo de Mayores y Awá son estructuras vigentes que el sistema debe respetar, no reemplazar.

### 1.2 Metodología de Investigación

El proyecto adoptó una investigación aplicada de enfoque mixto (QUAL → QUAN), donde los hallazgos cualitativos guiaron el diseño de los instrumentos cuantitativos. La muestra fue intencional, seleccionada por accesibilidad y representatividad de tres realidades tecnológicas distintas. El marco ético integró los principios CARE (Collective Benefit, Authority to Control, Responsibility, Ethics) para la gestión de datos indígenas, con consentimiento en tres niveles: comunitario (ADI/Consejo), individual y cultural (Awá).

| Instrumento | Participantes | Territorios | Duración | Eje |
|-------------|--------------|-------------|----------|-----|
| Entrevistas semiestructuradas | 4 actores clave | Guatuso, Talamanca, Chirripó, Boruca | 45-90 min | EDU, SAB, SAL |
| Observaciones de campo | 3 visitas directas | Guatuso, Talamanca, Boruca | 6-10 h c/u | Infraestructura |
| Encuestas (Likert + multi-selección) | 75 participantes | 4+ territorios | 20-35 min | EDU, SAB, SAL |

> Documentación completa: [[02-Investigación/|02-Investigación]]. Análisis consolidado: [[02-Investigación/Análisis de Entrevistas|Análisis de Entrevistas]].

### 1.3 Modelado del Sistema

#### 1.3.1 Diagrama de Flujo de Datos — Nivel 0 (Contexto)

El diagrama de contexto del sistema, modelado con notación C4 (equivalente funcional al DFD Nivel 0), muestra a Raíces Vivas como un sistema integral que interactúa con cinco tipos de usuarios primarios y tres sistemas externos:

![[Visión General#Diagrama de Contexto (C4 - Nivel 1)]]

#### 1.3.2 Diagrama de Flujo de Datos — Nivel 1 (Módulos)

La descomposición en módulos y servicios transversales (C4 Nivel 2, equivalente a DFD Nivel 1) muestra los tres módulos funcionales (EDU, SAB, SAL) soportados por cuatro servicios compartidos: autenticación y roles, sincronización offline/online, motor multilingüe y auditoría.

![[Visión General#Diagrama de Módulos (C4 - Nivel 2)]]

#### 1.3.3 Casos de Uso

Se identificaron **23 casos de uso** distribuidos en 4 módulos, trazados 1:1 con los 23 requerimientos funcionales. De estos, 12 fueron documentados en formato expandido con 14 campos cada uno (escenario principal, flujos alternos, excepciones, actores secundarios, prioridad, sprint estimado).

| Módulo | Casos de Uso | Must | Should | Could | Ejemplos clave |
|--------|-------------|------|--------|-------|----------------|
| **EDU** | 7 | 3 | 3 | 1 | CU-EDU-01 Registrar docente, CU-EDU-03 Cargar material multimedia |
| **SAB** | 7 | 4 | 2 | 1 | CU-SAB-01 Registrar saber, CU-SAB-06 Revocar contenido |
| **SAL** | 6 | 2 | 2 | 2 | CU-SAL-01 Registrar paciente, CU-SAL-06 Exportar a EDUS |
| **TRANS** | 3 | 3 | 0 | 0 | CU-TRANS-01 Sync offline/online, CU-TRANS-02 Seleccionar idioma |
| **Total** | **23** | **12** | **7** | **4** | 100 % trazabilidad RF ↔ CU |

> Documentación completa de los 23 CU (12 expandidos), diagrama UML y matriz de trazabilidad RF ↔ CU: [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2, §3-§6]].

#### 1.3.4 Diagrama UML de Casos de Uso

El siguiente diagrama UML agrupa los 23 casos de uso por módulo (subsistema), mostrando las relaciones entre los 8 actores y los casos de uso de cada módulo:

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#5. Diagrama de Casos de Uso]]

#### 1.3.5 Referencia Cruzada RF ↔ CU

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#6. Referencia Cruzada: Requerimientos Funcionales ↔ Casos de Uso]]

---

## Capítulo 2 — Diseño de la Solución

### 2.1 Descripción de la Solución

#### Arquitectura offline-first: una decisión que nace del territorio

La arquitectura de Raíces Vivas no es un ejercicio académico: cada decisión técnica responde a un hallazgo de campo. La ausencia total de señal celular en Alto Chirripó, la intermitencia de 2G en Talamanca y la necesidad de operar durante giras de salud de 3 a 5 días sin conectividad condujeron a una arquitectura **offline-first con sincronización oportunista** ([[ADR-003]]).

El sistema se implementa como una **Progressive Web Application (PWA)** instalable en cualquier dispositivo con navegador moderno (Android 8+, 2 GB RAM mínimo). Los datos se persisten localmente en **PouchDB** y se sincronizan bidireccionalmente con **CouchDB** cuando se detecta conectividad. La resolución de conflictos opera por timestamp con indicador visual para casos irreconciliables, y los datos con nivel de acceso ceremonial **nunca abandonan el dispositivo local** — una decisión que la comunidad bribri validó como condición de participación ([[ENT-002]]).

Las decisiones clave están formalizadas como Architecture Decision Records:

| ADR | Decisión | Justificación |
|-----|----------|---------------|
| [[ADR-002]] | React 19 + TypeScript 5.9 | Ecosistema maduro, tipado fuerte, componentes reutilizables |
| [[ADR-003]] | PouchDB/CouchDB | Sync bidireccional nativo, offline-first por diseño |
| [[ADR-004]] | TailwindCSS 4 | Utility-first, bundle mínimo, responsive |
| [[ADR-008]] | Stack completo integrado | React 19 + Vite 8 + PouchDB 9 + i18next 26 + workbox-build 7 |
| [[ADR-009]] | Gobernanza cultural CARE | 4 niveles de acceso, consentimiento obligatorio, revocación prevalece |

#### Stack tecnológico

| Capa | Tecnología | Versión | Rol |
|------|-----------|---------|-----|
| Frontend | React + TypeScript | 19.2 / 5.9 | Componentes tipados, SPA |
| Build | Vite | 8 | HMR, ESM nativo, tree-shaking |
| Estilos | TailwindCSS | 4 | Utility-first, responsive |
| Persistencia | PouchDB | 9 | Offline-first, sync con CouchDB |
| i18n | i18next + react-i18next | 26 / 17 | Español, bribri, cabécar, ngäbere |
| Routing | react-router-dom | 7 | Navegación SPA, rutas protegidas |
| PWA | workbox-build | 7 | Service Worker, cache strategies |
| Multimedia | Opus, WebP, HLS | — | Audio comprimido, imágenes optimizadas, video adaptativo |
| Seguridad | AES-256 + TLS 1.3 | — | Cifrado en reposo (datos médicos/ceremoniales) y en tránsito |

Build de producción: **97 módulos, 452 KB JS (145 KB gzip)** — dentro del objetivo de < 500 KB para dispositivos Android económicos con 3G limitado. Referencia completa: [[04-Arquitectura/Stack Tecnológico|Stack Tecnológico]].

#### Modelo de datos

El modelo entidad-relación contempla **38 entidades** distribuidas en 4 módulos más un esquema transversal. Todas las entidades incluyen campos de sincronización offline (`sync_status`, `last_synced`, `device_id`) y los datos médicos están marcados con cifrado AES-256 en reposo.

| Módulo | Entidades | Total | Relaciones clave |
|--------|-----------|-------|------------------|
| **TRANS** | USUARIO, PUEBLO, COMUNIDAD, ROL, PERMISO, IDIOMA, LOG_AUDITORIA, SINCRONIZACION | 9 | USUARIO ↔ ROL ↔ PERMISO, COMUNIDAD → PUEBLO |
| **EDU** | DOCENTE, ESTUDIANTE, CENTRO_EDUCATIVO, MATERIAL_EDUCATIVO, EJERCICIO, PROGRESO | 10 | DOCENTE → MATERIAL → EJERCICIO → INTENTO → PROGRESO |
| **SAB** | PORTADOR_SABER, SABER, CONSENTIMIENTO, REVOCACION, LOG_ACCESO_SABER | 9 | SABER ← CONSENTIMIENTO (obligatorio), revocación prevalece en sync |
| **SAL** | PACIENTE, HISTORIAL_MEDICO, BRIGADA, ALERTA_SEGUIMIENTO, EXPORTACION_EDUS | 10 | PACIENTE → HISTORIAL ↔ CONDICION/ALERGIA/MEDICACION |
| **Total** | | **38** | 5 diagramas ER + vista integrada inter-módulos |

> Diagramas completos: [[04-Arquitectura/Modelo de Datos|Modelo de Datos]] y [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2, Anexo A.2]].

##### Vista Integrada Inter-Módulos

El siguiente diagrama muestra las relaciones entre los cuatro módulos y las entidades compartidas:

![[Modelo de Datos#Diagrama ER — Vista Integrada (Inter-Módulos)]]

#### Gobernanza cultural: principios CARE como arquitectura

Los principios CARE (Collective Benefit, Authority to Control, Responsibility, Ethics) no se implementan como una capa adicional: atraviesan el modelo de datos, la lógica de sincronización y los flujos de autorización ([[ADR-009]]). Cuatro niveles de acceso controlan la visibilidad y distribución de cada saber:

| Nivel | Quién accede | Sincroniza al servidor | Ejemplo (ENT-002) |
|-------|-------------|----------------------|---------------------|
| **Público** | Cualquier usuario autenticado | ✅ Sí | Técnica de tallar máscara boruca |
| **Comunitario** | Miembros del pueblo | ✅ Sí | Recetas medicinales con plantas locales |
| **Restringido** | Roles autorizados por Consejo/Awá | ✅ Sí, cifrado | Significado espiritual de la máscara |
| **Ceremonial** | Solo Awá / autoridad máxima | ❌ **Nunca** — solo local | Cantos sagrados, rituales de Sibö |

El mecanismo de **revocación por decisión comunitaria** (CU-SAB-06) permite retirar un saber en cualquier momento mediante soft-delete con trazabilidad completa. La revocación prevalece sobre cualquier edición en conflictos de sincronización — un principio de **soberanía de datos** que la comunidad bribri articuló como condición de participación. La auditoría de acceso (CU-SAB-07) registra cada consulta en un log inmutable, exportable en CSV para revisión por el Consejo de Mayores en asambleas comunitarias.

Marco legal de sustento: Convenio 169 OIT, Ley Indígena 6172 (1977), Decreto 40932-MP (2018), Ley 7788 de Biodiversidad, Ley 8968 de Protección de Datos.

### 2.2 Prototipos

Los prototipos de interfaz se diseñaron siguiendo principios de usabilidad derivados de la investigación de campo:

- **≤ 6 campos obligatorios** por formulario (RNF-03, validado con ENT-003)
- **Iconografía universal** combinada con texto bilingüe (español + lengua local)
- **Navegación por pestañas inferiores** (BottomNav) para acceso con una mano en tablet
- **Indicador de sincronización** visible permanentemente en el header
- **Selector de idioma** (🌐) accesible desde cualquier pantalla

Las pantallas implementadas en el MVP (Sprint-03) incluyen:

| Pantalla | Módulo | Funcionalidad | Estado |
|----------|--------|---------------|--------|
| AppShell + Header + BottomNav | TRANS | Estructura base, navegación, sync indicator | ✅ Implementado |
| Dashboard EDU | EDU | Resumen de materiales, accesos rápidos | ✅ Implementado |
| Lista de Materiales | EDU | CRUD de material educativo multimedia | ✅ Implementado |
| Registro de Docentes | EDU | Formulario de alta con validación | ✅ Implementado |
| Selector de Idioma | TRANS | i18n en 4 lenguas (es, bri, cab, ngb) | ✅ Implementado |
| Indicador de Sincronización | TRANS | PouchDB ↔ CouchDB, estado visual | ✅ Implementado |

> Los wireframes completos y flujos de navegación se documentan en la sección de diseño del [[06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura|Avance 2]].

---

## Capítulo 3 — Gestión de Proyecto

### 3.1 Gestión de Requisitos

El sistema cuenta con **23 requerimientos funcionales** y **4 no funcionales**, gestionados en la [[03-Requerimientos/_RTM|Matriz de Trazabilidad (RTM)]] con trazabilidad bidireccional hacia casos de uso, tareas y sprints. La especificación completa se desarrolló en el [[06-Entregables/Avance-1/Raíces Vivas – Sistema Integral de Apoyo a Comunidades Indígenas|Avance 1]] y se refinó con 4 requerimientos adicionales emergentes de la investigación cualitativa durante Sprint-02.

#### Requerimientos Funcionales

```sqlseal
SELECT name AS "ID", title AS "Requerimiento", priority AS "Prioridad", status AS "Estado"
FROM files
WHERE type = 'requirement' AND path LIKE '03-Requerimientos/Funcionales%'
ORDER BY name ASC
```

#### Requerimientos No Funcionales

```sqlseal
SELECT name AS "ID", title AS "Requerimiento", priority AS "Prioridad", status AS "Estado"
FROM files
WHERE type = 'requirement' AND path LIKE '03-Requerimientos/No Funcionales%'
ORDER BY name ASC
```

#### Cobertura por prioridad MoSCoW

| MoSCoW | RF | CU asociados | CU expandidos | Cobertura |
|--------|-----|-------------|---------------|-----------|
| Must | 12 | 12 | 9 (75 %) | ✅ MVP completo |
| Should | 7 | 7 | 3 (43 %) | Parcial — Sprint-04 |
| Could | 3 | 3 | 1 (33 %) | Listados — Sprint-05 |
| Won't | 1 | 0 | 0 | Descartado |
| **Total** | **23** | **23** | **12** | **100 % trazabilidad** |

### 3.2 Estimación de Requisitos

La estimación se realizó con Story Points (escala Fibonacci) para las User Stories y horas para las tareas individuales. El equipo estimó un total de **265 horas planificadas** distribuidas entre tres miembros:

| Miembro | Rol | Horas plan | Horas real | Δ |
|---------|-----|-----------|-----------|---|
| **Geovanny Alpízar** | PM / Arquitecto | 105 h | 103 h | −2 h |
| **Elkin** | Investigación / SAB | 68 h | 66 h | −2 h |
| **Santiago** | QA / SAL | 73 h | 71 h | −2 h |
| **Equipo** (reuniones) | — | 19 h | 17 h | −2 h |
| **Total** | | **265 h** | **257 h** | **−8 h (−3 %)** |

La desviación del −3 % refleja una estimación conservadora, consistente con la práctica ágil de no consumir el 100 % de la capacidad para absorber imprevistos.

### 3.3 Desglose Funcional del Trabajo

El Work Breakdown Structure descompone el sistema en 4 módulos y 16 paquetes de trabajo:

![[WBS#Diagrama WBS (Mermaid)]]

| Módulo | Paquetes | Requerimientos asociados |
|--------|----------|-------------------------|
| **RV-1** Educativo (EDU) | 4: Actores, Contenidos, Evaluación, Acceso bilingüe | RF-EDU-01 a RF-EDU-07 |
| **RV-2** Saberes Ancestrales (SAB) | 4: Registro, Catalogación, Gobernanza, Preservación | RF-SAB-01 a RF-SAB-07 |
| **RV-3** Salud Comunitaria (SAL) | 4: Pacientes, Citas/Brigadas, Seguimiento, Confidencialidad | RF-SAL-01 a RF-SAL-06 |
| **RV-4** Transversales (NFR) | 4: Conectividad, Multilingüismo, Seguridad, Rendimiento | RF-TRANS-01 a RF-TRANS-03 + RNF |

> Diccionario WBS completo: [[04-Arquitectura/WBS|WBS]]. Desglose original: [[06-Entregables/Avance-1/Raíces Vivas – Sistema Integral de Apoyo a Comunidades Indígenas|Avance 1, §Requerimientos]].

### 3.4 Cronograma de Trabajo

#### Línea de tiempo de sprints

| Sprint | Período | Foco | Entregable | Estado |
|--------|---------|------|-----------|--------|
| Sprint-01 | 2026-02-03 → 2026-02-25 | Análisis, investigación de campo | Avance 1 — Análisis y Requerimientos | ✅ Cerrado |
| Sprint-02 | 2026-02-28 → 2026-03-29 | Diseño, casos de uso, arquitectura | Avance 2 — Diseño y Arquitectura | ✅ Cerrado |
| Sprint-03 | 2026-04-01 → 2026-04-23 | Implementación MVP, gestión, entrega final | Avance 3 — Entrega Final | 🔄 Activo |

#### Cronograma Maestro (Gantt)

El siguiente cronograma muestra la línea de tiempo completa del proyecto, desde la investigación inicial hasta la proyección de entrega final:

![[Roadmap#Timeline General del Proyecto]]

#### Milestones

![[Roadmap#Milestones]]

#### Metodología

El proyecto emplea **Scrum adaptado** con sprints de 3-4 semanas, gestionado íntegramente en un vault de Obsidian con trazabilidad automatizada vía SQLSeal. La combinación de notas Markdown con frontmatter estructurado permite consultas SQL en tiempo real sobre tareas, riesgos y requerimientos. Las decisiones metodológicas y técnicas se documentan como ADR:

```sqlseal
SELECT name AS "ID", title AS "Decisión", status AS "Estado", "date" AS "Fecha"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY name ASC
```

#### Equipo y roles

| Miembro | Rol | Responsabilidades principales |
|---------|-----|-------------------------------|
| Geovanny Alpízar | PM / Arquitecto | Planificación, arquitectura, integración, documentación, Jira |
| Elkin | Investigación / SAB | Investigación cualitativa, módulo SAB, traducciones bribri |
| Santiago | QA / SAL | Pruebas, módulo SAL, presentaciones |

#### Tareas por sprint

##### Sprint-01 (20 tareas)

![[Roadmap#Gantt Detallado — Avance 1 (Sprint 01)]]

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-01%'
ORDER BY name ASC
```

##### Sprint-02 (22 tareas)

![[Roadmap#Gantt Detallado — Avance 2 (Sprint 02)]]

![[Sprint-02-Planning#🔗 Mapa de Dependencias]]

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-02%'
ORDER BY name ASC
```

##### Sprint-03 (16 tareas)

![[Roadmap#Gantt Detallado — Avance 3 (Sprint 03)]]

```sqlseal
SELECT name AS "ID", title AS "Tarea", assignee AS "👤", status AS "Estado", effort_actual AS "⏱️"
FROM files
WHERE (type = 'task' OR type = 'subtask') AND path LIKE '05-Sprints/Sprint-03%'
ORDER BY name ASC
```

#### Métricas de progreso

```sqlseal
SELECT
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-01%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-01%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-01",
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-02%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-02%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-02",
  SUM(CASE WHEN path LIKE '05-Sprints/Sprint-03%' AND (type='task' OR type='subtask') AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN path LIKE '05-Sprints/Sprint-03%' AND (type='task' OR type='subtask') THEN 1 ELSE 0 END) as "Sprint-03",
  SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) || '/' || SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END) || ' (' || ROUND(100.0 * SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' AND status='done' THEN 1 ELSE 0 END) / MAX(1, SUM(CASE WHEN (type='task' OR type='subtask') AND path LIKE '05-Sprints%' THEN 1 ELSE 0 END))) || '%)' as "Total"
FROM files
```

#### Gestión de riesgos

Se mantiene un registro activo de **14 riesgos** con revisiones periódicas y estrategias de mitigación documentadas:

```sqlseal
SELECT name AS "ID", title AS "Riesgo", severity AS "Severidad", status AS "Estado", strategy AS "Estrategia"
FROM files
WHERE type = 'risk' AND path LIKE '01-Proyecto/Riesgos%'
ORDER BY name ASC
```

#### Reuniones

```sqlseal
SELECT name AS "ID", title AS "Reunión", "date" AS "Fecha", sprint AS "Sprint"
FROM files
WHERE type = 'meeting' AND path LIKE '07-Reuniones%'
ORDER BY "date" ASC
```

#### Lecciones aprendidas

| Sprint | Lección | Acción tomada |
|--------|---------|---------------|
| Sprint-01 | La definición temprana de templates y convenciones acelera la producción de artefactos | Se crearon 16 templates reutilizables en `99-Templates/` |
| Sprint-01 | Obsidian + SQLSeal permite trazabilidad automatizada sin herramientas externas | Adoptado como estándar del proyecto ([[ADR-001]]) |
| Sprint-02 | Exportar 65 páginas con 13 diagramas requiere pipeline de build reproducible | Se implementó script mmdc + Pandoc para PDF consistentes |
| Sprint-02 | Las entrevistas cualitativas revelan requerimientos que las encuestas no capturan | Se agregaron 4 CU adicionales (EDU-07, SAB-06, SAB-07, SAL-06) |
| Sprint-03 | La sincronización PouchDB ↔ CouchDB necesita manejo explícito de conflictos | Se implementó resolución por timestamp con indicador visual |
| Sprint-03 | Las traducciones bribri requieren validación con fuentes del MEP | Elkin documentó las fuentes en notas de investigación |

---

## Capítulo 4 — Conclusiones

### 4.1 Cumplimiento de Objetivos

| # | Objetivo específico | Estado | Evidencia |
|---|---------------------|--------|-----------|
| 1 | Analizar el contexto sociocultural y tecnológico de comunidades indígenas | ✅ Completado | 4 entrevistas, 3 observaciones, 3 encuestas (75 participantes) |
| 2 | Especificar requerimientos funcionales y no funcionales con trazabilidad | ✅ Completado | 23 RF + 4 RNF en RTM, 100 % trazabilidad RF ↔ CU |
| 3 | Diseñar arquitectura offline-first con sincronización | ✅ Completado | ADR-002/003/004/008/009, diagramas C4, modelo ER (38 entidades) |
| 4 | Documentar casos de uso con escenarios completos | ✅ Completado | 23 CU (12 expandidos), diagrama UML, matriz RF ↔ CU |
| 5 | Implementar MVP funcional con módulos EDU, SAB, SAL | 🔄 En progreso | PWA: React 19 + PouchDB + i18next, CRUD EDU implementado |
| 6 | Validar con pruebas manuales y E2E | 🔄 En progreso | T-051/T-052 completadas, QA final (T-057) pendiente |

### 4.2 Conclusiones

1. **El enfoque offline-first es viable y necesario para comunidades con conectividad limitada o inexistente.** La combinación PouchDB + CouchDB permite operación completa sin conexión y sincronización automática cuando hay red disponible. El build de 452 KB (145 KB gzip) es compatible con dispositivos Android económicos y redes 2G/3G, cubriendo el espectro que va desde la estabilidad 4G de Guatuso hasta la ausencia total de señal en Alto Chirripó. La resolución de conflictos por timestamp resultó suficiente para el volumen de datos esperado.

2. **La investigación cualitativa es indispensable para sistemas con contexto sociocultural complejo.** Las entrevistas y observaciones de campo revelaron necesidades que los formularios estructurados no capturan: la gobernanza escalonada sobre datos culturales, la urgencia de extinción lingüística, y el trauma previo de apropiación. Estos hallazgos derivaron en 4 casos de uso adicionales (CU-EDU-07, CU-SAB-06, CU-SAB-07, CU-SAL-06) que no habrían surgido de encuestas solamente.

3. **La gobernanza cultural no es un módulo: es una decisión arquitectónica transversal.** Los principios CARE impactan la sincronización (datos ceremoniales nunca abandonan el dispositivo), el modelo de datos (consentimiento obligatorio como entidad, no como flag), la auditoría (logs inmutables de acceso a saberes) y la resolución de conflictos (la revocación siempre prevalece). Implementar CARE como un complemento aislado habría generado brechas de seguridad cultural.

4. **La gestión de proyecto con trazabilidad automatizada reduce errores y mejora la auditabilidad.** El uso de Obsidian + SQLSeal permitió mantener un vault con 58 tareas, 17 ADRs, 14 riesgos y 5 reuniones con consultas dinámicas actualizadas en tiempo real, eliminando la desincronización entre documentos que caracteriza a las herramientas tradicionales.

5. **Las comunidades indígenas son socias de diseño, no beneficiarias pasivas.** La frase del líder boruca — «Que nos traten como socios, no como beneficiarios» — sintetiza una postura que permeó todo el proyecto. Los cuatro niveles de acceso CARE fueron validados espontáneamente por un portador de saber bribri antes de que el equipo los presentara formalmente. La gobernanza del sistema refleja la gobernanza comunitaria existente (ADI, Consejo de Mayores, Awá), no la reemplaza.

### 4.3 Recomendaciones

1. **Realizar sesiones de validación presencial con comunidades antes de Sprint-04.** Los flujos de consentimiento y revocación fueron diseñados teóricamente a partir de entrevistas; su aceptación real requiere al menos 2 sesiones con líderes de Guatuso y Talamanca para confirmar que reflejan la gobernanza indígena operativa.

2. **Priorizar el despliegue piloto en Guatuso (Margarita).** La observación OBS-001 lo identificó como la comunidad con mejor infraestructura (4G estable, electricidad, EBAIS cercano), lo que minimiza riesgos técnicos y permite concentrar esfuerzos en validación funcional.

3. **Coordinar con la CCSS la especificación de campos EDUS.** La exportación de expedientes clínicos (CU-SAL-06) requiere una tabla de mapeo campo-a-campo con el sistema oficial. Sin esta especificación, la funcionalidad queda limitada a exportación genérica CSV.

4. **Completar las traducciones bribri, cabécar y ngäbere con hablantes nativos.** Los archivos i18next contienen traducciones parciales. El MEP y las organizaciones comunitarias son fuentes de validación lingüística indispensables para que el multilingüismo sea genuino y no cosmético.

5. **Implementar pipeline CI/CD y métricas de adopción.** El proyecto carece de despliegue automatizado y de indicadores de uso real (MAU, tasa de sincronización, tiempo por tarea). Estos elementos son indispensables para medir el impacto del sistema más allá del entorno académico.

---

## Lista de Referencias

> Formato APA 7.ª edición. Ordenadas alfabéticamente.

1. Consejo Nacional para Investigaciones Científicas y Tecnológicas (CONARE). (2024). *Diagnóstico de educación en territorios indígenas de Costa Rica*. Repositorio CONARE.

2. Consejo Nacional para la Gestión de la Biodiversidad y del Conocimiento (CONAGEBIO). (2023). *Estrategia Nacional de Biodiversidad 2016-2025: Pueblos indígenas y comunidades locales*. CONAGEBIO.

3. Global Indigenous Data Alliance. (2019). *CARE Principles for Indigenous Data Governance*. https://www.gida-global.org/care

4. International Telecommunication Union (ITU). (2023). *Measuring digital development: Facts and figures 2023*. ITU Publications.

5. Ministerio de Educación Pública (MEP). (2013). *Decreto Ejecutivo N.° 37801-MEP: Reforma del Subsistema de Educación Indígena*. Procuraduría General de la República.

6. Ministerio de Salud de Costa Rica. (2024). *Intervenciones en territorios indígenas: Acceso a servicios de salud en zonas de difícil acceso*. Ministerio de Salud.

7. Organización Internacional del Trabajo (OIT). (1989). *Convenio 169 sobre pueblos indígenas y tribales en países independientes*. OIT.

8. Organización Panamericana de la Salud (OPS). (2023). *Salud en las Américas: Barreras geográficas en territorios indígenas*. OPS/OMS.

9. PouchDB Contributors. (2024). *PouchDB documentation: Replication and conflict resolution*. https://pouchdb.com/guides/

10. React Documentation. (2024). *React 19 release notes*. https://react.dev/blog/2024/12/05/react-19

11. UNESCO. (2023). *Patrimonio cultural inmaterial y conocimientos tradicionales de los pueblos indígenas*. UNESCO Publishing.

12. UNICEF. (2023). *Niñez y adolescencia indígena en Costa Rica: Situación de derechos*. UNICEF Costa Rica.

---

## Anexos

### Anexo A — Estructura del Vault

| Directorio | Contenido | Artefactos |
|------------|-----------|-----------|
| `00-Dashboard/` | Home, Métricas, Roadmap | 3 notas |
| `01-Proyecto/` | Charter, Alcance, Finanzas, Riesgos, Decisiones | 17 ADR, 14 riesgos |
| `02-Investigación/` | Entrevistas, Encuestas, Observaciones, Fuentes | 4 ENT, 3 ENC, 3 OBS |
| `03-Requerimientos/` | RF, RNF, RTM | 23 RF, 4 RNF |
| `04-Arquitectura/` | Diagramas, Prototipos, Modelo de Datos, Stack, WBS | 5 documentos |
| `05-Sprints/` | Backlog, Epics, Stories, Tareas | 4 Epics, 13 Stories, 58 tareas |
| `06-Entregables/` | Avance 1, Avance 2, Entrega Final | 3 documentos |
| `07-Reuniones/` | Minutas | 5 minutas |
| `08-Recursos/` | Imágenes, PDFs, Scripts, Datos | Assets del proyecto |
| `09-QA/` | Pruebas y validación | Plan de pruebas |
| `99-Templates/` | Templates de Templater | 16 templates |

### Anexo B — Contribuciones del Equipo

| Miembro | Sprint-01 (20 tareas) | Sprint-02 (22 tareas) | Sprint-03 (16 tareas) | Total |
|---------|----------------------|----------------------|----------------------|-------|
| **Geovanny** | Setup vault, templates, requerimientos, Charter, RTM | Diagramas ER/C4, prototipos, stack, export PDF | Sync PouchDB, CRUD EDU, documentación, Jira | 103 h |
| **Elkin** | Investigación SAB, entrevistas, encuestas, contexto | CU expandidos SAB, traducciones preliminares | Traducciones es + bri, CU SAB multimedia | 66 h |
| **Santiago** | Investigación SAL, observaciones, encuesta salud | CU expandidos SAL, wireframes SAL, revisión cruzada | CRUD SAL, pruebas manuales/E2E, presentación | 71 h |

### Anexo C — Decisiones Arquitectónicas (ADR)

```sqlseal
SELECT name AS "ID", title AS "Decisión", status AS "Estado", "date" AS "Fecha"
FROM files
WHERE type = 'adr' AND path LIKE '01-Proyecto/Decisiones%'
ORDER BY name ASC
```

### Anexo D — Análisis Estratégicos

Los siguientes análisis complementarios fueron elaborados durante Sprint-02 y fundamentan las decisiones de diseño y priorización del proyecto.

#### D.1 Análisis FODA

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#Anexo C: Análisis FODA del Proyecto]]

#### D.2 Diagrama de Ishikawa — Causa-Efecto

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#Anexo D: Diagrama de Ishikawa — Causa-Efecto]]

#### D.3 Casa de la Calidad (QFD)

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#Anexo E: Casa de la Calidad (QFD)]]

#### D.4 Ciclo DMAIC — Lean Six Sigma

![[Raíces Vivas — Avance 2 Diseño y Arquitectura#Anexo F: Metodología DMAIC — Lean Six Sigma]]

### Anexo E — Diagramas Entidad-Relación por Módulo

#### E.1 Entidades Transversales

![[Modelo de Datos#Diagrama ER — Entidades Transversales (TRANS)]]

#### E.2 Módulo Educativo

![[Modelo de Datos#Diagrama ER — Módulo Educativo (EDU)]]

#### E.3 Módulo Saberes Ancestrales

![[Modelo de Datos#Diagrama ER — Módulo Saberes Ancestrales (SAB)]]

#### E.4 Módulo Salud Comunitaria

![[Modelo de Datos#Diagrama ER — Módulo Salud Comunitaria (SAL)]]

---

*Documento generado el 2026-04-19 · Equipo Raíces Vivas · CENFOTEC*
*Curso: SOFT-09 — Introducción a la Ingeniería del Software — Prof. Johnny Marin*
