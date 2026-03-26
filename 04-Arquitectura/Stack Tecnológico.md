---
type: document
title: "Stack Tecnológico — Raíces Vivas"
project: raices-vivas
status: proposed
banner_src: "08-Recursos/Imágenes/cover-arquitectura.png"
banner_src_x: 0.47714
banner_src_y: 0.40
tags:
  - arquitectura
  - stack
---
# Stack Tecnológico — Raíces Vivas

> **Estado:** Propuesto — Ver [[01-Proyecto/Decisiones/ADR-008|ADR-008: Stack Tecnológico]] para análisis FODA completo.

## Criterios de Selección (derivados de RNFs)

| Criterio | RNF Origen | Restricción |
|----------|-----------|-------------|
| Offline-first | [[RF-TRANS-01]] | PWA con Service Workers o app nativa con SQLite local |
| Multilingüe | [[RF-TRANS-02]] | i18n nativo, contenido etiquetado por idioma |
| Rendimiento | [[RNF-01]] | <3s en búsquedas, carga ligera |
| Seguridad | [[RNF-02]] | Roles, cifrado, auditoría |
| Usabilidad | [[RNF-03]] | UI simple, flujos guiados, ≤6 campos |
| Gama baja | [[RNF-04]] | Android 8+, navegadores modernos, sin HW especial |

## Opciones a Evaluar

> Se formalizará como ADR en la fase de diseño.

### Opción A: PWA (Progressive Web App)

- **Frontend:** React/Vue + Workbox (Service Workers)
- **Backend:** Node.js / Python (FastAPI)
- **BD Local:** IndexedDB (Dexie.js)
- **BD Remota:** PostgreSQL / Supabase
- **Sync:** CouchDB/PouchDB o custom sync

### Opción B: App Híbrida

- **Framework:** Flutter / React Native
- **BD Local:** SQLite (drift/sqflite)
- **Backend:** mismo que Opción A
- **Sync:** custom REST + conflict resolution

### Opción C: Plataforma Low-Code

- **Plataforma:** AppSheet / PowerApps / Budibase
- **BD:** integrada
- **Offline:** limitado según plataforma

## Decisión

> **Recomendación:** Opción A — PWA (React + Workbox + PouchDB). Score ponderado: 4.50/5. Ver [[ADR-008]] para análisis detallado.

---

## Stack Técnico Propuesto (per ADR-008)

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Frontend | React 18 + TypeScript | Ecosystem maduro, tipado estático, equipo con experiencia |
| UI Framework | Tailwind CSS + Headless UI | Ligero, personalizable, mobile-first |
| Offline Storage | PouchDB | Sync nativo con CouchDB, conflict resolution automático |
| Backend DB | CouchDB | Replicación master-master, ideal para offline-first |
| Service Workers | Workbox (Google) | Estrategias de cache probadas, PWA installable |
| Internacionalización | i18next + react-i18next | Archivos JSON por lengua (Bribri, Cabécar, Ngäbe, Español) |
| Autenticación | JWT + bcrypt | Stateless, funciona offline con tokens cacheados |
| API | Node.js + Express | JavaScript full-stack, bajo overhead |
| Multimedia | WebP (imágenes) + Opus (audio) | Compresión eficiente para bajo bandwidth |
| Testing | Jest + Playwright | Unit + E2E testing |

---

## Hardware Recomendado para Territorios Indígenas

### Contexto Operativo

Los 24 territorios indígenas de Costa Rica presentan condiciones desafiantes:
- **Conectividad:** Zonas sin cobertura celular (Talamanca, Alto Chirripó, Buenos Aires de Puntarenas)
- **Electricidad:** Algunas comunidades dependen de energía solar o tienen servicio intermitente
- **Acceso:** Distancias de 4-8 horas caminando al EBAIS más cercano; cruces de ríos sin puentes

### Dispositivos de Usuario

| Dispositivo | Especificación | Costo Aprox. (₡) | Justificación |
|-------------|---------------|-------------------|---------------|
| **Samsung Galaxy Tab A8** | 10.5", Android 13, 3GB RAM, 32GB | ₡120,000–₡160,000 | Pantalla grande para materiales educativos, resistente |
| **Lenovo Tab M10 HD** | 10.1", Android 12, 3GB RAM, 32GB | ₡100,000–₡130,000 | Alternativa económica, buen rendimiento básico |
| **MicroSD 64GB** | Clase 10, UHS-I | ₡5,000–₡8,000 | Almacenamiento local de contenido multimedia offline |
| **Funda protectora IP52+** | Silicona reforzada con soporte | ₡8,000–₡15,000 | Protección contra agua y polvo (uso en campo) |

### Infraestructura de Conectividad

| Equipo | Función | Costo Aprox. (₡) | Justificación |
|--------|---------|-------------------|---------------|
| **Raspberry Pi 5 (8GB)** | Servidor local en centro comunal | ₡45,000–₡60,000 | Ejecuta CouchDB como nodo de sync local. Bajo consumo (5W) |
| **Ubiquiti UniFi AP-AC Lite** | WiFi mesh en centro comunal | ₡35,000–₡50,000 | Cobertura inalámbrica para tablets en radio de ~120m |
| **Router 4G/LTE** | Gateway a internet cuando hay señal | ₡25,000–₡40,000 | Sincronización con nube cuando hay cobertura |
| **Switch Ethernet 5 puertos** | Conexión cableada RPi ↔ AP | ₡5,000–₡10,000 | Backbone local |

### Energía (Zonas sin Red Eléctrica)

| Equipo | Función | Costo Aprox. (₡) | Justificación |
|--------|---------|-------------------|---------------|
| **Power bank 20,000mAh** | Carga de tablets en campo | ₡12,000–₡18,000 | 2-3 cargas completas por tablet |
| **Panel solar portátil 21W** | Carga de power banks y RPi | ₡25,000–₡40,000 | Independencia energética para centros sin electricidad |
| **UPS micro (para RPi)** | Protección contra cortes | ₡15,000–₡25,000 | Evitar corrupción de datos en RPi por corte súbito |

### Arquitectura de Sync Local

```
                    ☁️ NUBE (CouchDB Cloud)
                         │
                    [4G/LTE cuando hay señal]
                         │
              ┌──────────┴──────────┐
              │  🖥️ Raspberry Pi     │
              │  CouchDB local      │
              │  (servidor comunal) │
              └──────────┬──────────┘
                         │ WiFi mesh
              ┌──────────┼──────────┐
              │          │          │
          📱 Tablet  📱 Tablet  📱 Tablet
          (PouchDB)  (PouchDB)  (PouchDB)
          Docente    Aux.Salud  Líder
```

**Flujo de sincronización:**
1. Tablets se conectan al WiFi del centro comunal (Ubiquiti AP)
2. PouchDB en cada tablet sincroniza bidireccionalmente con CouchDB en Raspberry Pi
3. Cuando hay señal 4G/LTE, el RPi sincroniza con CouchDB en la nube
4. Conflict resolution automático de PouchDB/CouchDB maneja cambios simultáneos

---

## Software Recomendado — Stack de Campo

### Base de Datos Offline-First

| Tecnología | Rol | Justificación |
|------------|-----|---------------|
| **PouchDB** | DB local en navegador/PWA | API compatible con CouchDB, conflict resolution nativo, almacena en IndexedDB |
| **CouchDB** | DB en servidor local (RPi) y nube | Replicación master-master, HTTP API nativa, bajo overhead |
| **SQLite** | Alternativa para datos estructurados | Más liviano si no se necesita sync bidireccional |

### Multimedia Optimizado

| Formato | Uso | Reducción vs. Original |
|---------|-----|----------------------|
| **WebP** | Imágenes educativas, fotos de saberes | ~30% menor que JPEG a misma calidad |
| **Opus** | Audio: narraciones en lengua indígena, entrevistas | ~50% menor que MP3 a misma calidad |
| **WebM/VP9** | Video corto: demostraciones, rituales (si autorizado) | ~30% menor que H.264 |

### Internacionalización

| Componente | Tecnología | Detalle |
|------------|-----------|---------|
| Framework i18n | **i18next** | Standard de facto para React |
| Archivos de traducción | JSON por lengua | `es.json`, `bri.json` (Bribri), `cab.json` (Cabécar), `ngb.json` (Ngäbe) |
| Detección de idioma | Preferencia de usuario | Selección manual en primer uso, persistida en PouchDB |
| RTL support | No requerido | Lenguas indígenas CR son LTR |

### Seguridad para Datos Sensibles

| Capa | Mecanismo | Estándar |
|------|-----------|----------|
| Datos en reposo | **AES-256** (via Web Crypto API) | Historiales médicos + saberes ceremoniales encriptados en PouchDB |
| Datos en tránsito | **TLS 1.3** | HTTPS obligatorio (Let's Encrypt para dominio + mkcert para RPi local) |
| Autenticación | **JWT con refresh tokens** | Tokens cortos (15min) + refresh (7d), funciona offline con token cacheado |
| Roles por comunidad | **RBAC 4 niveles** | Per ADR-009: Público, Comunitario, Restringido, Ceremonial |
| Auditoría | **Logs de acceso** | Registros en CouchDB con timestamp, usuario, operación, nivel de dato |
