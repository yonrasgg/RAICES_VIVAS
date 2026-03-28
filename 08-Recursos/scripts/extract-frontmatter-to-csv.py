#!/usr/bin/env python3
"""
extract-frontmatter-to-csv.py

Extrae frontmatter YAML de archivos .md del vault RAICES_VIVAS
y genera/actualiza archivos CSV en 08-Recursos/Datos/.

Uso:
  python3 08-Recursos/scripts/extract-frontmatter-to-csv.py [--type rsk|adr|all]

Dependencias: PyYAML (pip install pyyaml)
"""

import argparse
import csv
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML requerido. Instalar con: pip install pyyaml")
    sys.exit(1)

VAULT = Path(__file__).resolve().parent.parent.parent  # 08-Recursos/scripts → vault root
DATOS = VAULT / "08-Recursos" / "Datos"

# ── Esquemas CSV ──────────────────────────────────────────────

SCHEMAS = {
    "rsk": {
        "glob": "01-Proyecto/Riesgos/RSK-*.md",
        "output": "riesgos.csv",
        "columns": [
            "id", "title", "status", "category", "probability", "impact",
            "severity", "strategy", "owner", "module", "phase", "source",
            "trigger", "related_requirements", "related_decisions",
            "review_date", "created", "updated",
        ],
    },
    "adr": {
        "glob": "01-Proyecto/Decisiones/ADR-*.md",
        "output": "decisiones.csv",
        "columns": [
            "id", "title", "status", "category", "module", "impact",
            "deciders", "source", "date", "superseded_by",
            "related_requirements", "related_risks", "created", "updated",
        ],
    },
}

# Campos que son listas YAML → se unen con ";"
LIST_FIELDS = {
    "related_requirements", "related_decisions", "related_risks",
    "deciders", "tags",
}


def extract_frontmatter(filepath: Path) -> dict:
    """Extrae el bloque YAML entre --- delimitadores."""
    text = filepath.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return {}
    return yaml.safe_load(match.group(1)) or {}


def normalize_value(key: str, value) -> str:
    """Convierte valores YAML a string CSV-safe."""
    if value is None or value == "":
        return ""
    if key in LIST_FIELDS and isinstance(value, list):
        return ";".join(str(v) for v in value)
    return str(value)


def generate_csv(schema_key: str) -> int:
    """Genera un CSV para el esquema dado. Retorna cantidad de filas."""
    schema = SCHEMAS[schema_key]
    columns = schema["columns"]
    files = sorted(VAULT.glob(schema["glob"]))

    if not files:
        print(f"  ⚠ No se encontraron archivos para {schema['glob']}")
        return 0

    rows = []
    for f in files:
        fm = extract_frontmatter(f)
        if not fm:
            print(f"  ⚠ Sin frontmatter: {f.name}")
            continue
        row = {col: normalize_value(col, fm.get(col)) for col in columns}
        rows.append(row)

    output_path = DATOS / schema["output"]
    with open(output_path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)

    print(f"  ✓ {output_path.name}: {len(rows)} filas × {len(columns)} columnas")
    return len(rows)


def main():
    parser = argparse.ArgumentParser(
        description="Extrae frontmatter YAML a CSV para RAICES_VIVAS"
    )
    parser.add_argument(
        "--type",
        choices=["rsk", "adr", "all"],
        default="all",
        help="Tipo de extracción (default: all)",
    )
    args = parser.parse_args()

    DATOS.mkdir(parents=True, exist_ok=True)

    targets = list(SCHEMAS.keys()) if args.type == "all" else [args.type]
    total = 0

    print(f"📂 Vault: {VAULT}")
    print(f"📄 Destino: {DATOS}\n")

    for key in targets:
        print(f"── {key.upper()} ──")
        total += generate_csv(key)

    print(f"\n✅ Total: {total} filas extraídas")


if __name__ == "__main__":
    main()
