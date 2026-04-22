#!/usr/bin/env python3
"""Generate 'Entrega Final Proyecto Raices Vivas.docx' from the Markdown master,
using the official CENFOTEC template as base (keeping cover page intact and
replacing placeholder body with rendered content from the .md)."""

from __future__ import annotations

import copy
import os
import re
import shutil
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

ROOT = Path(__file__).resolve().parent.parent.parent
TEMPLATE = ROOT / "08-Recursos" / "PDFs" / "01-Formato Entrega Final.docx"
SRC_MD = ROOT / "06-Entregables" / "Entrega-Final" / "Raíces Vivas — Entrega Final Implementación y Gestión.md"
OUT_DIR = ROOT / "06-Entregables" / "Entrega-Final"
OUT = OUT_DIR / "Entrega Final Proyecto Raices Vivas.docx"

# ───────────────────────── Cover replacements ─────────────────────────
COVER_REPLACEMENTS = {
    "<Título del Trabajo>": "Raíces Vivas — Entrega Final: Implementación y Gestión",
    "<Autor(es)>": "Autores",
    "<Nombre Estudiante 1>": "Geovanny Alpízar Sandino",
    "<Nombre Estudiante 2>": "Elkin Cerda González",
    "<Nombre del Curso>": "Introducción a la Ingeniería del Software (SOFT-09, SCV7)",
    "<Nombre del Profesor a Cargo>": "Johnny Marín Sánchez",
    "<Mes, Año>": "Abril, 2026",
}

# ─────────────────────── Markdown pre-processing ───────────────────────

FRONTMATTER_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)
TRANSCLUSION_RE = re.compile(r"!\[\[([^\]]+)\]\]")
WIKILINK_ALIAS_RE = re.compile(r"\[\[([^\]|]+)\|([^\]]+)\]\]")
WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")
IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")
ITALIC_RE = re.compile(r"(?<!\*)\*([^*]+)\*(?!\*)")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")


def preprocess_md(text: str) -> str:
    text = FRONTMATTER_RE.sub("", text, count=1)
    # Strip document H1 (first line starting with #) since it's in cover
    text = text.lstrip("\n")
    text = re.sub(r"^# [^\n]+\n", "", text, count=1)
    # Strip the metadata blockquote right after H1 (Universidad/Docente/Equipo/Fecha)
    text = re.sub(
        r"^(?:>[^\n]*\n)+\s*\n",
        "",
        text.lstrip("\n"),
        count=1,
    )
    # Replace transclusions with italic note (Obsidian-only)
    text = TRANSCLUSION_RE.sub(lambda m: f"*[Referencia Obsidian: {m.group(1)}]*", text)
    # Wikilinks with alias
    text = WIKILINK_ALIAS_RE.sub(r"\2", text)
    # Plain wikilinks
    text = WIKILINK_RE.sub(r"\1", text)
    return text


def resolve_image(path: str) -> Path | None:
    """Resolve a relative image path relative to the MD file location."""
    md_dir = SRC_MD.parent
    p = (md_dir / path).resolve()
    if p.exists():
        return p
    # Also try workspace root
    p2 = (ROOT / path.lstrip("/")).resolve()
    if p2.exists():
        return p2
    return None


# ─────────────────────── Rendering helpers ───────────────────────

HEADING_MAP = {
    1: "Heading 1",
    2: "Heading 1",   # ## → chapter
    3: "Heading 2",
    4: "Heading 3",
    5: "Heading 4",
    6: "Heading 5",
}


def add_runs(paragraph, text: str):
    """Parse inline markdown (**bold**, *italic*, `code`) and add runs."""
    # Tokenize: split on bold/italic/code markers while preserving matches.
    pattern = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)")
    parts = pattern.split(text)
    for part in parts:
        if not part:
            continue
        if part.startswith("**") and part.endswith("**"):
            run = paragraph.add_run(part[2:-2])
            run.bold = True
        elif part.startswith("*") and part.endswith("*"):
            run = paragraph.add_run(part[1:-1])
            run.italic = True
        elif part.startswith("`") and part.endswith("`"):
            run = paragraph.add_run(part[1:-1])
            run.font.name = "Consolas"
        else:
            paragraph.add_run(part)


def parse_table_rows(lines: list[str]) -> list[list[str]]:
    """Parse a sequence of markdown table lines into cell matrix."""
    rows = []
    for line in lines:
        line = line.strip()
        if not line.startswith("|"):
            continue
        # Skip alignment row |:---|---|
        if re.match(r"^\|[\s:\-|]+\|$", line):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        rows.append(cells)
    return rows


# ─────────────────────── Main renderer ───────────────────────


def fill_cover(doc: Document):
    for p in doc.paragraphs:
        for placeholder, value in COVER_REPLACEMENTS.items():
            if placeholder in p.text:
                # Replace keeping first run style; collapse remaining runs
                full = p.text.replace(placeholder, value)
                # Clear runs
                for r in list(p.runs):
                    r.text = ""
                if p.runs:
                    p.runs[0].text = full
                else:
                    p.add_run(full)

    # Add Santiago as third student if placeholder was replaced
    # Find the line with Elkin's name and append new paragraph right after.
    for idx, p in enumerate(doc.paragraphs):
        if "Elkin Cerda González" in p.text:
            # Insert new paragraph after this one, same style
            new_p = copy.deepcopy(p._p)
            p._p.addnext(new_p)
            # Access new paragraph and replace text
            new_para = doc.paragraphs[idx + 1]
            for r in list(new_para.runs):
                r.text = ""
            if new_para.runs:
                new_para.runs[0].text = "Santiago Martínez Ramírez"
            else:
                new_para.add_run("Santiago Martínez Ramírez")
            break


def cut_body(doc: Document):
    """Delete all block-level elements after the cover/first page up to the end.

    Strategy: keep every paragraph up to and including the one that contains
    'Fecha:' (the cover). Delete the rest. Also delete any tables before the end.
    """
    body = doc.element.body
    keep_until_idx = None
    for i, p in enumerate(doc.paragraphs):
        if p.text.startswith("Fecha:"):
            keep_until_idx = i
            break
    if keep_until_idx is None:
        raise RuntimeError("Could not locate 'Fecha:' marker in template cover")

    # Collect element references to delete: all paragraphs after keep_until_idx
    paragraphs_after = doc.paragraphs[keep_until_idx + 1 :]
    for p in paragraphs_after:
        p._element.getparent().remove(p._element)

    # Remove any tables (template has none, but just in case)
    for t in list(doc.tables):
        t._element.getparent().remove(t._element)

    # Remove trailing sectPr siblings? Leave untouched; add content before final sectPr.


def add_heading(doc: Document, level: int, text: str):
    style = HEADING_MAP.get(level, "Heading 3")
    p = doc.add_paragraph(style=style)
    add_runs(p, text)
    return p


def add_body_paragraph(doc: Document, text: str, style: str = "normal1"):
    try:
        p = doc.add_paragraph(style=style)
    except KeyError:
        p = doc.add_paragraph()
    add_runs(p, text)
    return p


def add_bullet(doc: Document, text: str, level: int = 0):
    p = doc.add_paragraph(style="List Bullet") if "List Bullet" in [s.name for s in doc.styles] else doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(0.75 + level * 0.5)
    add_runs(p, f"• {text}")
    return p


def add_numbered(doc: Document, text: str, n: int):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(0.75)
    add_runs(p, f"{n}. {text}")
    return p


def add_blockquote(doc: Document, text: str):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(1.0)
    add_runs(p, text)
    for r in p.runs:
        r.italic = True
        r.font.color.rgb = RGBColor(0x55, 0x55, 0x55)


def add_image_paragraph(doc: Document, alt: str, src_path: Path):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    try:
        run = p.add_run()
        run.add_picture(str(src_path), width=Cm(15.0))
    except Exception as e:
        p.add_run(f"[Imagen no disponible: {alt}] ({e})").italic = True
        return
    # Caption
    if alt:
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        cr = cap.add_run(alt)
        cr.italic = True
        cr.font.size = Pt(9)


def _set_cell_shading(cell, hex_color: str):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        from docx.oxml import OxmlElement
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)


def _set_cell_borders(cell):
    from docx.oxml import OxmlElement
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_borders = tc_pr.find(qn("w:tcBorders"))
    if tc_borders is None:
        tc_borders = OxmlElement("w:tcBorders")
        tc_pr.append(tc_borders)
    for edge in ("top", "left", "bottom", "right"):
        b = OxmlElement(f"w:{edge}")
        b.set(qn("w:val"), "single")
        b.set(qn("w:sz"), "4")
        b.set(qn("w:color"), "808080")
        tc_borders.append(b)


def add_table(doc: Document, rows: list[list[str]]):
    if not rows:
        return
    n_cols = max(len(r) for r in rows)
    # Pad rows
    rows = [r + [""] * (n_cols - len(r)) for r in rows]
    table = doc.add_table(rows=len(rows), cols=n_cols)
    available = {s.name for s in doc.styles}
    for candidate in ("Light Grid Accent 1", "Table Grid", "Grid Table Light"):
        if candidate in available:
            try:
                table.style = candidate
                break
            except KeyError:
                continue
    for i, row in enumerate(rows):
        for j, cell_text in enumerate(row):
            cell = table.rows[i].cells[j]
            cell.text = ""
            p = cell.paragraphs[0]
            add_runs(p, cell_text)
            _set_cell_borders(cell)
            if i == 0:
                # Header styling
                _set_cell_shading(cell, "1F4E79")
                for r in p.runs:
                    r.bold = True
                    r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)


# ─────────────────────── MD block processor ───────────────────────


def render_md(doc: Document, md_text: str):
    lines = md_text.splitlines()
    i = 0
    n = len(lines)
    skip_toc = False

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Horizontal rule
        if re.match(r"^\s*(---+|\*\*\*+)\s*$", line):
            i += 1
            continue

        # Fenced code block → skip (often sqlseal queries)
        if stripped.startswith("```"):
            lang = stripped[3:].strip()
            j = i + 1
            code_lines = []
            while j < n and not lines[j].strip().startswith("```"):
                code_lines.append(lines[j])
                j += 1
            if lang.startswith("sqlseal"):
                p = doc.add_paragraph()
                p.paragraph_format.left_indent = Cm(0.5)
                run = p.add_run(
                    "[Consulta dinámica SQLSeal — tabla generada automáticamente desde "
                    "el vault Obsidian. Ver documento Markdown fuente para resultados "
                    "en tiempo real.]"
                )
                run.italic = True
                run.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
            elif lang == "mermaid":
                p = doc.add_paragraph()
                p.paragraph_format.left_indent = Cm(0.5)
                run = p.add_run(
                    "[Diagrama Mermaid — renderizado en el PDF generado por mmdc. "
                    "Ver documento Markdown fuente.]"
                )
                run.italic = True
                run.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
            else:
                # Render as monospace block
                for cl in code_lines:
                    p = doc.add_paragraph()
                    r = p.add_run(cl if cl else " ")
                    r.font.name = "Consolas"
                    r.font.size = Pt(9)
            i = j + 1
            continue

        # Heading
        m = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if m:
            level = len(m.group(1))
            text = m.group(2)
            # Skip TOC section and document title
            if level == 2 and text.strip() == "Tabla de Contenido":
                skip_toc = True
                i += 1
                continue
            if skip_toc and level < 3:
                # Entered next section
                skip_toc = False
            if skip_toc:
                i += 1
                continue

            # Clean inline wiki artifacts already handled in preprocess
            add_heading(doc, level, text)
            i += 1
            continue

        if skip_toc:
            i += 1
            continue

        # Table
        if stripped.startswith("|") and i + 1 < n and re.match(r"^\s*\|[\s:\-|]+\|\s*$", lines[i + 1]):
            table_lines = [line]
            j = i + 1
            table_lines.append(lines[j])
            j += 1
            while j < n and lines[j].strip().startswith("|"):
                table_lines.append(lines[j])
                j += 1
            rows = parse_table_rows(table_lines)
            add_table(doc, rows)
            doc.add_paragraph()  # spacer
            i = j
            continue

        # Image
        img_m = IMAGE_RE.match(stripped)
        if img_m:
            alt, src = img_m.group(1), img_m.group(2)
            resolved = resolve_image(src)
            if resolved:
                add_image_paragraph(doc, alt, resolved)
            else:
                p = doc.add_paragraph()
                p.add_run(f"[Imagen no encontrada: {src}]").italic = True
            i += 1
            continue

        # Blockquote
        if stripped.startswith(">"):
            quote_lines = []
            while i < n and lines[i].strip().startswith(">"):
                quote_lines.append(lines[i].strip().lstrip(">").strip())
                i += 1
            add_blockquote(doc, " ".join(quote_lines))
            continue

        # Bullet list
        if re.match(r"^\s*[-*]\s+", line):
            while i < n and re.match(r"^\s*[-*]\s+", lines[i]):
                bm = re.match(r"^(\s*)[-*]\s+(.+?)\s*$", lines[i])
                indent = len(bm.group(1)) // 2
                add_bullet(doc, bm.group(2), level=indent)
                i += 1
            continue

        # Numbered list
        if re.match(r"^\s*\d+\.\s+", line):
            num = 1
            while i < n and re.match(r"^\s*\d+\.\s+", lines[i]):
                nm = re.match(r"^\s*(\d+)\.\s+(.+?)\s*$", lines[i])
                add_numbered(doc, nm.group(2), int(nm.group(1)))
                i += 1
                num += 1
            continue

        # Empty line
        if not stripped:
            i += 1
            continue

        # Plain paragraph — may span multiple lines
        para_lines = [line.rstrip()]
        j = i + 1
        while j < n:
            nxt = lines[j]
            nxt_strip = nxt.strip()
            if not nxt_strip:
                break
            if nxt_strip.startswith(("#", ">", "-", "*", "|", "```")):
                break
            if re.match(r"^\d+\.\s+", nxt_strip):
                break
            if IMAGE_RE.match(nxt_strip):
                break
            para_lines.append(nxt.rstrip())
            j += 1
        add_body_paragraph(doc, " ".join(para_lines))
        i = j


# ─────────────────────── Main ───────────────────────


def main():
    if not TEMPLATE.exists():
        raise FileNotFoundError(TEMPLATE)
    if not SRC_MD.exists():
        raise FileNotFoundError(SRC_MD)

    # Copy template as starting point, then open
    shutil.copy(TEMPLATE, OUT)
    doc = Document(str(OUT))

    print(f"• Template → {OUT}")
    fill_cover(doc)
    print("• Cover placeholders filled")
    cut_body(doc)
    print("• Placeholder body removed")

    md_text = SRC_MD.read_text(encoding="utf-8")
    md_text = preprocess_md(md_text)
    render_md(doc, md_text)
    print("• Markdown content rendered")

    doc.save(str(OUT))
    size_kb = OUT.stat().st_size / 1024
    print(f"✔ Saved: {OUT.relative_to(ROOT)}  ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
