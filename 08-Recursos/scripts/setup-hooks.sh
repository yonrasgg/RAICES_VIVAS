#!/bin/bash
# ──────────────────────────────────────────────────────────────────
# setup-hooks.sh — Configura git hooks para Raíces Vivas
# ──────────────────────────────────────────────────────────────────
#
# Ejecutar UNA VEZ después de clonar el repositorio:
#   bash 08-Recursos/scripts/setup-hooks.sh
#
# Esto configura un pre-commit hook que repara automáticamente
# frontmatter YAML roto antes de cada commit, evitando que los
# compañeros empujen archivos con bloques YAML duplicados.
# ──────────────────────────────────────────────────────────────────

set -e

VAULT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"

if [ -z "$VAULT_ROOT" ]; then
    echo "❌ Error: No estás dentro de un repositorio git."
    exit 1
fi

cd "$VAULT_ROOT"

# Configurar directorio de hooks
git config core.hooksPath .githooks

# Hacer ejecutable el pre-commit hook
chmod +x .githooks/pre-commit

echo ""
echo "✅ Git hooks configurados correctamente."
echo ""
echo "   📁 Hooks directory: .githooks/"
echo "   🔧 Pre-commit: auto-repara frontmatter YAML roto"
echo ""
echo "   Ahora cada vez que hagas commit, el frontmatter de los"
echo "   archivos .md se verificará y reparará automáticamente."
echo ""
