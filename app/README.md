# Raíces Vivas — Aplicación Web

Sistema integral para comunidades indígenas de Costa Rica.  
Mockup funcional con navegación, datos de ejemplo y soporte multilingüe (español, bribri, cabécar, ngäbere).

---

## Requisitos previos

| Herramienta | Versión mínima | Verificar con |
|-------------|---------------|---------------|
| **Node.js** | 20.x | `node -v` |
| **npm** | 10.x | `npm -v` |

> Descarga Node.js desde <https://nodejs.org/> (LTS recomendado).  
> npm se instala automáticamente con Node.

---

## Levantar el ambiente local

### 1. Clonar el repositorio

```bash
git clone https://github.com/yonrasgg/RAICES_VIVAS.git
cd RAICES_VIVAS/app
```

### 2. Instalar dependencias

```bash
npm install
```

Esto descarga todas las bibliotecas necesarias en la carpeta `node_modules/`.

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Salida esperada:

```
VITE v8.x.x  ready in ~800 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### 4. Abrir en el navegador

Navegar a **http://localhost:5173/** para ver la aplicación.

> Si el puerto 5173 está ocupado, Vite selecciona automáticamente el siguiente disponible (5174, 5175…). Verificar la URL en la terminal.

### 5. Detener el servidor

Presionar `Ctrl + C` en la terminal donde está corriendo Vite.

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework UI | React | 19.x |
| Lenguaje | TypeScript | 5.x |
| Bundler | Vite | 8.x |
| Estilos | TailwindCSS | 4.x |
| Base de datos local | PouchDB | 9.x |
| Internacionalización | i18next | 26.x |
| Enrutamiento | react-router-dom | 7.x |

---

## Estructura del proyecto

```
app/
├── public/              # Archivos estáticos (favicon, manifest, íconos)
├── src/
│   ├── components/
│   │   ├── layout/      # AppShell, BottomNav, Header, SyncIndicator
│   │   └── ui/          # Badge, Button, EmptyState, Input, Modal, etc.
│   ├── data/
│   │   ├── seed.ts      # Datos de ejemplo (EDU, SAB, SAL)
│   │   └── seedTrans.ts # Datos de ejemplo (TRANS)
│   ├── db/
│   │   ├── pouchdb.ts   # Instancias de PouchDB (4 bases locales)
│   │   └── sync.ts      # SyncManager (replicación)
│   ├── hooks/
│   │   ├── useDB.ts     # Hook CRUD genérico para PouchDB
│   │   └── useSync.ts   # Hook de estado de sincronización
│   ├── i18n/
│   │   ├── index.ts     # Configuración de i18next
│   │   ├── es.json      # Español
│   │   ├── bri.json     # Bribri
│   │   ├── cab.json     # Cabécar
│   │   └── ngb.json     # Ngäbere
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── edu/          # Módulo Educación (5 páginas)
│   │   ├── sab/          # Módulo Saberes (3 páginas)
│   │   ├── sal/          # Módulo Salud (4 páginas)
│   │   └── trans/        # Módulo Transversal (5 páginas)
│   ├── types/            # Interfaces TypeScript por módulo
│   ├── App.tsx           # Rutas principales
│   └── main.tsx          # Punto de entrada
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Módulos

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| **EDU** | `/edu` | Educación intercultural bilingüe — docentes, estudiantes, materiales, ejercicios |
| **SAB** | `/sab` | Saberes ancestrales — catálogo de saberes y portadores |
| **SAL** | `/sal` | Salud comunitaria — pacientes, citas, brigadas |
| **TRANS** | `/trans` | Transversal — usuarios, roles, sincronización, auditoría |

---

## Idiomas disponibles

El selector de idioma se encuentra en el encabezado de la aplicación.

| Código | Idioma |
|--------|--------|
| `es` | Español |
| `bri` | Bribri |
| `cab` | Cabécar |
| `ngb` | Ngäbere |

---

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con Hot Module Replacement
npm run build     # Compilar TypeScript + generar bundle de producción en dist/
npm run preview   # Previsualizar el build de producción
npm run lint      # Ejecutar ESLint
```

---

## Datos de ejemplo

La aplicación carga datos de ejemplo (seed data) automáticamente la primera vez que se abre en el navegador. Los datos se almacenan en bases PouchDB locales del navegador:

- `raices_edu` — Docentes, estudiantes, materiales, ejercicios
- `raices_sab` — Saberes ancestrales, portadores
- `raices_sal` — Pacientes, citas, brigadas
- `raices_trans` — Usuarios, roles, logs de sync, auditoría

Para reiniciar los datos, abrir la consola del navegador (`F12` → Console) y ejecutar:

```js
localStorage.removeItem('raices_seeded')
localStorage.removeItem('raices_trans_seeded')
location.reload()
```

---

## Solución de problemas

| Problema | Solución |
|----------|----------|
| `npm run dev` falla con "Missing script" | Asegurarse de estar en la carpeta `app/`, no en la raíz del repositorio |
| Puerto 5173 ocupado | Vite usa el siguiente puerto automáticamente. Ver URL en la terminal |
| Página en blanco | Abrir la consola (`F12`) y verificar errores. Reiniciar datos si es necesario |
| `npm install` falla | Verificar versión de Node (`node -v` ≥ 20.x) |

