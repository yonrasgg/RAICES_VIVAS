#!/usr/bin/env python3
"""
fix_frontmatter_merge.py — Repara frontmatter YAML roto en el vault Raíces Vivas.

PROBLEMA:
  El plugin Banners (Obsidian) y el Linter a veces inyectan campos
  (banner_src, banner_src_x, banner_src_y) como un bloque YAML separado
  al inicio del archivo, produciendo:
  
      ---
      banner_src: "image.png"
      ---
      ---
      type: document
      banner_src: "image.png"
      banner_src_x: 0.47714
      ...
      ---
  
  Esto rompe el frontmatter porque Obsidian ve dos bloques YAML.

SOLUCIÓN:
  1. Detecta bloques YAML duplicados (>2 delimitadores `---`)
  2. Fusiona todos los campos en un único bloque YAML
  3. Deduplica campos (el valor del bloque principal tiene prioridad)
  4. Reordena según el tipo de nota
  5. Escribe el resultado limpio

USO:
  python3 fix_frontmatter_merge.py              # Dry-run (solo reporta)
  python3 fix_frontmatter_merge.py --apply      # Aplica cambios
  python3 fix_frontmatter_merge.py --apply --staged  # Solo archivos staged en git

HOOKS:
  Se invoca automáticamente como pre-commit hook vía .githooks/pre-commit
"""

import os
import sys
import re
import subprocess
from pathlib import Path

# ── Configuración ──────────────────────────────────────────────────
VAULT_ROOT = Path(__file__).resolve().parent.parent.parent  # 08-Recursos/scripts/ → vault root
SKIP_DIRS = {'.obsidian', '.git', '.github', 'node_modules', '.trash'}
BANNER_SRC_X_DEFAULT = 0.47714

# ── Órdenes canónicos por tipo ─────────────────────────────────────
KEY_ORDERS = {
    "task": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "id", "title", "status", "priority",
        "assignee", "sprint", "phase", "module", "requirement",
        "effort", "effort_actual", "started", "due", "completed",
        "source", "created", "updated", "tags"
    ],
    "document": [
        "type", "title", "project", "status", "created", "updated",
        "banner_src", "banner_src_x", "banner_src_y", "tags"
    ],
    "dashboard": [
        "type", "title", "project", "cssclass",
        "banner_src", "banner_src_x", "banner_src_y", "tags"
    ],
    "risk": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "id", "title", "status", "category",
        "probability", "impact", "severity", "strategy",
        "owner", "module", "phase", "source", "trigger",
        "related_requirements", "related_decisions",
        "review_date", "created", "updated", "tags"
    ],
    "adr": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "id", "title", "status", "category",
        "module", "impact", "deciders", "source", "date",
        "superseded_by", "related_requirements", "related_risks",
        "created", "updated", "tags"
    ],
    "meeting": [
        "banner_src", "banner_src_x", "banner_src_y",
        "id", "type", "title", "date", "duration",
        "attendees", "decisions", "risks", "action-items",
        "created", "updated", "tags"
    ],
    "sprint-planning": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "title", "sprint", "avance", "status", "goal",
        "started", "due", "completed", "team",
        "created", "updated", "tags"
    ],
    "sprint-review": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "title", "sprint", "avance", "status",
        "date", "team", "velocity",
        "created", "updated", "tags"
    ],
    "requirement/functional": [
        "banner_src", "banner_src_x", "banner_src_y",
        "id", "type", "module", "wbs", "title", "status", "priority",
        "actor", "source", "validation", "created", "updated", "sprint", "tags"
    ],
    "requirement/non-functional": [
        "banner_src", "banner_src_x", "banner_src_y",
        "id", "type", "category", "wbs", "title", "status", "priority",
        "metric", "created", "updated", "tags"
    ],
    "weekly": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "week", "created", "tags"
    ],
    "daily-note": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "date", "created", "tags"
    ],
    "index": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "title", "status", "created", "updated", "tags"
    ],
    "context": [
        "banner_src", "banner_src_x", "banner_src_y",
        "type", "title", "status", "created", "updated", "tags"
    ],
    "guide": [
        "type", "title", "project", "status", "created", "updated",
        "banner_src", "banner_src_x", "banner_src_y", "tags"
    ],
    "entrevista": [
        "banner_src", "banner_src_x", "banner_src_y",
        "id", "type", "title", "date", "interviewer", "interviewee",
        "location", "consent", "created", "updated", "tags"
    ],
    "proposal": [
        "type", "title", "project", "status", "created", "updated",
        "banner_src", "banner_src_x", "banner_src_y", "tags"
    ],
}


def parse_yaml_block(text):
    """Parse a simple YAML block into ordered key-value pairs.
    Returns list of (key, raw_value_line) tuples, preserving multi-line values."""
    pairs = []
    current_key = None
    current_lines = []

    for line in text.split('\n'):
        # Check if this is a new key (not indented, has colon)
        match = re.match(r'^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:\s*(.*)', line)
        if match:
            if current_key is not None:
                pairs.append((current_key, '\n'.join(current_lines)))
            current_key = match.group(1)
            current_lines = [line]
        elif current_key is not None:
            current_lines.append(line)

    if current_key is not None:
        pairs.append((current_key, '\n'.join(current_lines)))

    return pairs


def merge_yaml_blocks(blocks):
    """Merge multiple YAML blocks. Later blocks take priority for duplicate keys."""
    merged = {}
    order = []
    for block in blocks:
        pairs = parse_yaml_block(block)
        for key, raw in pairs:
            if key not in merged:
                order.append(key)
            merged[key] = raw
    return merged, order


def sort_keys(merged, original_order, note_type):
    """Sort keys according to the canonical order for this note type."""
    canonical = KEY_ORDERS.get(note_type, None)
    if canonical is None:
        # No canonical order — keep original order
        return original_order

    sorted_keys = []
    # First: keys in canonical order
    for k in canonical:
        if k in merged:
            sorted_keys.append(k)
    # Then: any remaining keys not in canonical (preserve original order)
    for k in original_order:
        if k not in sorted_keys and k in merged:
            sorted_keys.append(k)

    return sorted_keys


def fix_file(filepath, apply=False):
    """Fix frontmatter in a single file. Returns (was_broken, description)."""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    lines = content.split('\n')

    # Skip files that don't start with YAML frontmatter delimiter
    if not lines or lines[0].strip() != '---':
        return False, "no frontmatter"

    # Find all --- delimiters in the first 40 lines
    delim_positions = []
    for i, line in enumerate(lines[:40]):
        if line.strip() == '---':
            delim_positions.append(i)

    if len(delim_positions) < 2:
        return False, "no frontmatter"

    # Normal case: exactly 2 delimiters = valid frontmatter
    if len(delim_positions) == 2:
        # Still check if banner_src_x is missing
        fm_text = '\n'.join(lines[delim_positions[0]+1:delim_positions[1]])
        if 'banner_src:' in fm_text and 'banner_src_x' not in fm_text:
            # Add banner_src_x
            pairs = parse_yaml_block(fm_text)
            merged = {k: v for k, v in pairs}
            has_banner = 'banner_src' in merged
            if has_banner:
                # Insert banner_src_x after banner_src
                new_lines = lines[:delim_positions[0]+1]
                for key, raw in pairs:
                    new_lines.append(raw)
                    if key == 'banner_src':
                        new_lines.append(f'banner_src_x: {BANNER_SRC_X_DEFAULT}')
                new_lines.append('---')
                new_lines.extend(lines[delim_positions[1]+1:])
                if apply:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write('\n'.join(new_lines))
                return True, "added missing banner_src_x"
        return False, "ok"

    # BROKEN: more than 2 delimiters → need to merge
    # Extract all YAML blocks between consecutive delimiter pairs
    blocks = []
    i = 0
    while i < len(delim_positions) - 1:
        start = delim_positions[i]
        end = delim_positions[i + 1]
        block_text = '\n'.join(lines[start+1:end]).strip()
        if block_text:  # Skip empty blocks
            blocks.append(block_text)
        i += 1

    if not blocks:
        return False, "empty frontmatter blocks"

    # Find the last delimiter
    last_delim = delim_positions[-1]

    # The rest of the file (body)
    body = '\n'.join(lines[last_delim+1:])

    # Merge all blocks (later blocks win for duplicates)
    merged, original_order = merge_yaml_blocks(blocks)

    # Determine note type
    note_type = None
    if 'type' in merged:
        # Extract type value from raw line
        type_match = re.search(r'^type\s*:\s*(.+)', merged['type'])
        if type_match:
            note_type = type_match.group(1).strip().strip('"').strip("'")

    # Ensure banner_src_x exists if banner_src exists
    if 'banner_src' in merged and 'banner_src_x' not in merged:
        merged['banner_src_x'] = f'banner_src_x: {BANNER_SRC_X_DEFAULT}'
        original_order.insert(original_order.index('banner_src') + 1, 'banner_src_x')

    # Sort keys according to canonical order
    sorted_keys = sort_keys(merged, original_order, note_type)

    # Rebuild frontmatter
    new_fm_lines = ['---']
    for key in sorted_keys:
        raw = merged[key]
        new_fm_lines.append(raw)
    new_fm_lines.append('---')

    # Ensure exactly one blank line between frontmatter and body
    body_stripped = body.lstrip('\n')
    if body_stripped:
        new_content = '\n'.join(new_fm_lines) + '\n\n' + body_stripped
    else:
        new_content = '\n'.join(new_fm_lines) + '\n'

    if apply:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

    return True, f"merged {len(blocks)} YAML blocks → 1 (type: {note_type})"


def get_staged_files():
    """Get list of staged .md files from git."""
    try:
        result = subprocess.run(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
            capture_output=True, text=True, cwd=str(VAULT_ROOT)
        )
        return [f for f in result.stdout.strip().split('\n') if f.endswith('.md')]
    except Exception:
        return []


def main():
    apply = '--apply' in sys.argv
    staged_only = '--staged' in sys.argv

    if staged_only:
        files = [VAULT_ROOT / f for f in get_staged_files()]
        source = "staged files"
    else:
        files = []
        for root, dirs, filenames in os.walk(VAULT_ROOT):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for f in filenames:
                if f.endswith('.md'):
                    files.append(Path(root) / f)
        source = "vault"

    fixed = 0
    errors = 0
    for filepath in sorted(files):
        try:
            was_broken, desc = fix_file(str(filepath), apply=apply)
            if was_broken:
                rel = filepath.relative_to(VAULT_ROOT)
                action = "FIXED" if apply else "WOULD FIX"
                print(f"  {action}: {rel} → {desc}")
                fixed += 1
        except Exception as e:
            print(f"  ERROR: {filepath} → {e}", file=sys.stderr)
            errors += 1

    mode = "Applied" if apply else "Dry-run"
    print(f"\n{mode}: {fixed} files {'fixed' if apply else 'to fix'}, {errors} errors (scanned {len(files)} from {source})")

    if staged_only and fixed > 0 and apply:
        # Re-stage fixed files
        for filepath in sorted(files):
            try:
                was_broken, _ = fix_file(str(filepath), apply=False)
                # Already applied above, just re-stage
            except Exception:
                pass
        subprocess.run(
            ['git', 'add'] + [str(f) for f in files if f.suffix == '.md'],
            cwd=str(VAULT_ROOT)
        )

    return 1 if (fixed > 0 and not apply) else 0


if __name__ == '__main__':
    sys.exit(main())
