---
type: guide
title: Onboarding — Raíces Vivas
project: raices-vivas
created: 2026-02-28
updated: 2026-02-28
tags:
  - guia
  - onboarding
---

# 🚀 Onboarding — Raíces Vivas

> Guía para nuevos integrantes del equipo. Sigue estos pasos para tener tu entorno listo en menos de 15 minutos.

---

## 1. Requisitos Previos

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|----------|
| **Git** | 2.30+ | [git-scm.com](https://git-scm.com/) |
| **Obsidian** | 1.4+ | [obsidian.md](https://obsidian.md/) |
| **Cuenta GitHub** | — | [github.com](https://github.com/) |

### Verificar Git instalado
```bash
git --version
# Debe mostrar: git version 2.x.x
```

### Configurar identidad Git
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

---

## 2. Clonar el Repositorio

```bash
# En la carpeta donde quieras el vault
git clone https://github.com/yonrasgg/RAICES_VIVAS.git
```

Esto creará la carpeta `RAICES_VIVAS/` con todo el contenido del vault.

---

## 3. Configurar Git Credentials

Para que el push/pull funcione automáticamente sin pedir contraseña cada vez:

### 3.1 Generar un Personal Access Token (PAT)
1. Ve a: **https://github.com/settings/tokens**
2. Clic en **"Generate new token (classic)"**
3. **Note:** `obsidian-raices-vivas`
4. **Expiration:** 90 days (o "No expiration")
5. **Scopes:** marca solo ✅ `repo`
6. Clic **"Generate token"**
7. **Copia el token** (empieza con `ghp_...`) — no lo podrás ver de nuevo

### 3.2 Guardar credenciales
```bash
git config --global credential.helper store
cd RAICES_VIVAS
git push
# Username: tu-usuario-github
# Password: pega aquí el PAT (no tu contraseña de GitHub)
```

Las credenciales quedan guardadas permanentemente. No te volverá a pedir.

---

## 4. Abrir como Vault en Obsidian

1. Abre **Obsidian**
2. Clic en **"Abrir carpeta como vault"** (Open folder as vault)
3. Selecciona la carpeta `RAICES_VIVAS/`
4. Obsidian detectará los plugins automáticamente

### ⚠️ Mensaje de "Trust author"
Obsidian preguntará si confías en los plugins del vault. Clic en **"Trust author and enable plugins"**.

Los 22 plugins ya están configurados y sincronizados desde el repositorio. No necesitas instalar nada manualmente.

---

## 5. Configurar Plugin Git en Obsidian

1. `Ctrl+,` → **Community Plugins** → busca **Git** → clic en ⚙️ (Settings)
2. Configura estos valores:

| Opción | Valor |
|--------|-------|
| **Auto commit-and-sync interval (minutes)** | `10` |
| **Split timers for automatic commit and sync** | ✅ ON |
| **Auto push interval (minutes)** | `10` |
| **Auto pull interval (minutes)** | `10` |
| **Commit message on auto commit-and-sync** | `vault backup: {{date}}` |
| **Auto commit-and-sync only staged files** | OFF |

3. Verifica en la **barra de estado** (abajo) que aparezca `main ✓`

### Probar la sincronización
- `Ctrl+P` → **"Git: Pull"** → no debería dar error
- `Ctrl+P` → **"Git: Push"** → no debería dar error

---

## 6. Estructura del Vault

```
RAICES_VIVAS/
├── 00-Dashboard/        ← Dashboards con métricas y KPIs
├── 01-Proyecto/         ← Charter, Workflow Guide, Gestión
├── 02-Investigación/    ← Contexto, fuentes, hallazgos
├── 03-Requerimientos/   ← RF (funcionales) + RNF (no funcionales) + RTM
├── 04-Arquitectura/     ← Diagramas, ADRs, visión técnica
├── 05-Sprints/          ← Tareas organizadas por sprint
├── 06-Entregables/      ← Documentos de entrega por avance
├── 07-Reuniones/        ← Minutas de reuniones
├── 08-Recursos/         ← Imágenes, referencias, glosario
├── 09-QA/               ← Control de calidad
├── 99-Templates/        ← Plantillas para crear notas nuevas
└── Daily Notes/         ← Notas diarias automáticas
```

---

## 7. Flujo de Trabajo Diario

### Al iniciar sesión
1. Abre Obsidian — el plugin Git hace **auto-pull** automáticamente
2. Ve al **Dashboard** ([[00-Dashboard/Home|Home]]) para ver el estado del proyecto
3. Revisa tus **tareas pendientes** en el tablero Kanban o en la Daily Note

### Para crear notas nuevas
- `Ctrl+P` → **"QuickAdd"** → selecciona el tipo:
  - 📋 Nueva Tarea
  - 📐 Nuevo Requerimiento Funcional
  - 📐 Nuevo Requerimiento No Funcional
  - ⚠️ Nuevo Riesgo
  - 📝 Nueva Minuta
  - 🚀 Nuevo Sprint Planning
  - 📋 Nuevo Sprint Review

### Para editar una nota existente
- Usa **Meta Bind** (los controles interactivos que aparecen en las notas) para cambiar estado, prioridad, sprint, etc.
- Los cambios en el frontmatter se reflejan automáticamente en los dashboards

### Al terminar sesión
- No necesitas hacer nada — el auto-sync guarda y sube cada 10 minutos
- Si quieres forzar un sync: `Ctrl+P` → **"Git: Commit all changes"** → **"Git: Push"**

---

## 8. Comandos Git Útiles desde Obsidian

| Comando (Ctrl+P) | Qué hace |
|-------------------|----------|
| **Git: Pull** | Trae cambios del repo |
| **Git: Push** | Sube tus cambios |
| **Git: Commit all changes** | Commitea todo sin esperar auto-sync |
| **Git: Open source control view** | Panel de cambios (tipo VS Code) |
| **Git: View file history** | Historial de un archivo específico |

---

## 9. Reglas de Colaboración

1. **No editar el mismo archivo simultáneamente** — coordinar por chat
2. **Los dashboards y queries se actualizan solos** — no editar valores hardcodeados
3. **Usar QuickAdd para crear notas** — garantiza frontmatter correcto
4. **Si hay conflicto de merge** — Git avisa explícitamente, resolver juntos
5. **No borrar archivos sin avisar** — especialmente templates y configs

---

## 10. ¿Problemas?

| Problema | Solución |
|----------|----------|
| "Git is not ready" en Obsidian | Cerrar y reabrir Obsidian |
| Push pide usuario/contraseña | `git config --global credential.helper store` + hacer push manual |
| Plugins no cargan | `Ctrl+P` → "Reload app without saving" |
| Conflicto de merge | `git pull --rebase` desde terminal, o pedir ayuda al equipo |
| Banner no aparece | Verificar campo `banner_src:` en frontmatter con ruta correcta |

---

## 11. Editar desde el Navegador (Sin instalar nada)

Si no puedes instalar Obsidian en alguna máquina:

1. Ve a **https://github.com/yonrasgg/RAICES_VIVAS**
2. Presiona la tecla **`.`** (punto)
3. Se abre **VS Code web** — puedes editar cualquier archivo
4. Los cambios se commitean directamente al repo

---

## 12. Contacto del Equipo

| Integrante | Rol |
|------------|-----|
| **Geovanny** | Project Lead / Arquitecto |
| **Elkin** | Líder de Investigación / Analista — SAB |
| **Santiago** | Líder de QA / Analista — SAL |

---

> 📌 **¿Dudas sobre el workflow?** Consulta [[Guía de Workflow]] para la referencia completa de convenciones, plugins y flujos.
