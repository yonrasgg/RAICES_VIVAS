#!/usr/bin/env python3
"""
fix_frontmatter.py — Normaliza el frontmatter YAML de todas las notas del vault.

Para cada tipo de nota (task, document, dashboard, risk, adr, etc.) aplica:
  1. Orden canónico de keys según el tipo
  2. Agrega banner_src_x: 0.47714 si falta (cuando banner_src existe)
  3. Preserva valores, listas y formato original de cada campo

Uso:
    python3 08-Recursos/scripts/fix_frontmatter.py          # dry-run (solo muestra cambios)
    python3 08-Recursos/scripts/fix_frontmatter.py --apply   # aplica los cambios

Se ejecuta desde la raíz del vault:
    cd /home/geovanny/Documents/RAICES_VIVAS
    python3 08-Recursos/scripts/fix_frontmatter.py --apply
"""

import os
import re
import sys

# ── Configuración ──────────────────────────────────────────────

VAULT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

BANNER_SRC_X_VALUE = "banner_src_x: 0.47714"

# Archivos a ignorar (Templater scripts sin frontmatter estático, kanban, etc.)
SKIP_FILES = {
    "05-Sprints/Backlog.md",
    "99-Templates/_template-riesgo-from-minuta.md",
    "99-Templates/_template-weekly-note.md",
    "99-Templates/_template-tarea-from-minuta.md",
    "99-Templates/_template-adr-from-minuta.md",
    "09-QA/README.md",
}

# ── Ordenes canónicos por tipo ─────────────────────────────────

TASK_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "id", "title", "status", "priority", "assignee",
    "sprint", "phase", "module", "requirement",
    "effort", "effort_actual", "started", "due", "completed",
    "source", "created", "updated", "tags",
]

RF_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "id", "type", "module", "wbs", "title", "status", "priority",
    "actor", "source", "validation", "created", "updated", "sprint", "tags",
]

RNF_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "id", "type", "category", "wbs", "title", "status", "priority",
    "metric", "created", "updated", "tags",
]

RISK_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "id", "title", "status", "category", "probability", "impact",
    "severity", "strategy", "owner", "module", "phase", "source", "trigger",
    "related_requirements", "related_decisions", "review_date",
    "created", "updated", "tags",
]

ADR_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "id", "title", "status", "category", "module", "impact",
    "deciders", "source", "date", "superseded_by",
    "related_requirements", "related_risks", "created", "updated", "tags",
]

DOCUMENT_ORDER = [
    "type", "title", "project", "status", "created", "updated",
    "banner_src", "banner_src_x", "banner_src_y", "tags",
]

DASHBOARD_ORDER = [
    "type", "title", "project", "cssclass",
    "banner_src", "banner_src_x", "banner_src_y", "tags",
]

CONTEXT_ORDER = [
    "type", "title", "module", "project", "status", "created", "updated",
    "tags", "banner_src", "banner_src_x", "banner_src_y",
]

SPRINT_PLANNING_ORDER = [
    "type", "title", "sprint", "avance", "status", "goal",
    "started", "due", "completed", "team", "created", "updated",
    "tags", "banner_src", "banner_src_x", "banner_src_y",
]

SPRINT_REVIEW_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "sprint", "date", "tags",
]

MEETING_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "id", "type", "title", "date", "duration", "attendees",
    "decisions", "risks", "action-items", "created", "updated", "tags",
]

WEEKLY_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "title", "sprint", "week_start", "week_end", "created", "tags",
]

DAILY_NOTE_ORDER = [
    "banner_src", "banner_src_x", "banner_src_y",
    "type", "date", "created", "tags", "author",
]

INDEX_ORDER = [
    "type", "title", "project", "tags",
    "banner_src", "banner_src_x", "banner_src_y", "assignee", "author",
]

PROPOSAL_ORDER = [
    "type", "title", "project", "status", "created", "updated", "author",
    "banner_src", "banner_src_x", "banner_src_y", "tags",
]

GUIDE_ORDER = [
    "type", "title", "project", "status", "created", "updated",
    "banner_src", "banner_src_x", "banner_src_y", "tags",
]

ENTREVISTA_ORDER = [
    "type", "id", "title", "date", "interviewer", "interviewee_role",
    "module", "territory", "consent", "tags",
]

COURSE_ORDER = [
    "type", "title", "source", "tags",
]

# ── Mapa type → orden ─────────────────────────────────────────

TYPE_ORDERS = {
    "task":                     TASK_ORDER,
    "requirement/functional":   RF_ORDER,
    "requirement/non-functional": RNF_ORDER,
    "risk":                     RISK_ORDER,
    "adr":                      ADR_ORDER,
    "document":                 DOCUMENT_ORDER,
    "dashboard":                DASHBOARD_ORDER,
    "context":                  CONTEXT_ORDER,
    "sprint-planning":          SPRINT_PLANNING_ORDER,
    "sprint-review":            SPRINT_REVIEW_ORDER,
    "meeting":                  MEETING_ORDER,
    "weekly":                   WEEKLY_ORDER,
    "daily-note":               DAILY_NOTE_ORDER,
    "index":                    INDEX_ORDER,
    "proposal":                 PROPOSAL_ORDER,
    "guide":                    GUIDE_ORDER,
    "entrevista":               ENTREVISTA_ORDER,
    "COURSE":                   COURSE_ORDER,
}

# ── Funciones auxiliares ───────────────────────────────────────


def parse_md(path):
    """Lee un .md y retorna (frontmatter_text, body_text) o (None, content)."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if not content.startswith("---"):
        return None, content

    lines = content.split("\n")
    fm_lines = []
    body_start = None
    in_fm = False

    for i, line in enumerate(lines):
        if i == 0 and line.strip() == "---":
            in_fm = True
            continue
        if in_fm and line.strip() == "---":
            body_start = i + 1
            break
        if in_fm:
            fm_lines.append(line)

    if body_start is None:
        return None, content

    fm_text = "\n".join(fm_lines)
    body = "\n".join(lines[body_start:])
    return fm_text, body


def get_fm_blocks(fm_text):
    """Parsea frontmatter en bloques (key, texto_completo) preservando listas."""
    lines = fm_text.split("\n")
    blocks = []
    current_key = None
    current_lines = []

    for line in lines:
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:", line)
        if m:
            if current_key is not None:
                blocks.append((current_key, "\n".join(current_lines)))
            current_key = m.group(1)
            current_lines = [line]
        else:
            current_lines.append(line)

    if current_key is not None:
        blocks.append((current_key, "\n".join(current_lines)))

    return blocks


def reorder_blocks(blocks, key_order):
    """Reordena bloques según key_order. Keys no listadas van al final en orden original."""
    ordered = []
    remaining = list(blocks)

    for key in key_order:
        for i, (k, text) in enumerate(remaining):
            if k == key:
                ordered.append((k, text))
                remaining.pop(i)
                break

    ordered.extend(remaining)
    return ordered


def has_key(blocks, key):
    return any(k == key for k, _ in blocks)


def add_key_after(blocks, after_key, new_key, new_text):
    """Inserta un bloque nuevo después de after_key."""
    result = []
    for k, text in blocks:
        result.append((k, text))
        if k == after_key:
            result.append((new_key, new_text))
    return result


def blocks_to_text(blocks):
    return "\n".join(text for _, text in blocks)


def write_md(path, fm_text, body):
    with open(path, "w", encoding="utf-8") as f:
        f.write("---\n")
        f.write(fm_text)
        f.write("\n---\n")
        f.write(body)


# ── Main ───────────────────────────────────────────────────────


def main():
    dry_run = "--apply" not in sys.argv

    if dry_run:
        print("🔍 DRY-RUN — Mostrando cambios sin aplicar. Usa --apply para escribir.\n")
    else:
        print("✏️  APLICANDO cambios...\n")

    changes = []
    errors = []
    skipped = 0

    for root, dirs, files in os.walk(VAULT):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for fname in sorted(files):
            if not fname.endswith(".md"):
                continue

            full = os.path.join(root, fname)
            rel = os.path.relpath(full, VAULT)

            if rel in SKIP_FILES:
                skipped += 1
                continue

            fm_text, body = parse_md(full)
            if fm_text is None:
                continue

            blocks = get_fm_blocks(fm_text)
            if not blocks:
                continue

            # Detectar type
            file_type = None
            for k, text in blocks:
                if k == "type":
                    m = re.search(r":\s*(.+)", text)
                    if m:
                        file_type = m.group(1).strip().strip("\"'")
                    break

            if not file_type:
                continue

            order = TYPE_ORDERS.get(file_type)
            if not order:
                errors.append(f"UNKNOWN_TYPE: {rel} → {file_type}")
                continue

            original_fm = blocks_to_text(blocks)

            # 1. Agregar banner_src_x si falta
            if has_key(blocks, "banner_src") and not has_key(blocks, "banner_src_x"):
                blocks = add_key_after(blocks, "banner_src", "banner_src_x", BANNER_SRC_X_VALUE)

            # 2. Reordenar al canónico
            blocks = reorder_blocks(blocks, order)

            new_fm = blocks_to_text(blocks)

            if new_fm != original_fm:
                changes.append(rel)
                if not dry_run:
                    write_md(full, new_fm, body)

    # ── Reporte ──
    label = "cambiarían" if dry_run else "modificados"
    print(f"{'📋' if dry_run else '✅'} {len(changes)} archivos {label}:")
    for c in sorted(changes):
        print(f"  • {c}")

    if errors:
        print(f"\n⚠️  Tipos desconocidos ({len(errors)}):")
        for e in errors:
            print(f"  • {e}")

    print(f"\n📊 Resumen: {len(changes)} {label} · {skipped} ignorados · {len(errors)} errores")

    if dry_run and changes:
        print("\n💡 Para aplicar: python3 08-Recursos/scripts/fix_frontmatter.py --apply")


if __name__ == "__main__":
    main()
