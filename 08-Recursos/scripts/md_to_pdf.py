#!/usr/bin/env python3
"""
Convert the Avance-2 Markdown document to a PDF matching the Avance-1 format.

Usage:
    python3 08-Recursos/scripts/md_to_pdf.py

Output:
    06-Entregables/Avance-2/Raíces Vivas — Avance 2 Diseño y Arquitectura.pdf
"""

import base64
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import markdown
from weasyprint import HTML

# ── Paths ──────────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "06-Entregables" / "Avance-2" / "Raíces Vivas — Avance 2 Diseño y Arquitectura.md"
OUT = SRC.with_suffix(".pdf")
MERMAID_CACHE = ROOT / "08-Recursos" / "scripts" / ".mermaid_cache"
LOGO_PATH = ROOT / "08-Recursos" / "Imágenes" / "logo-cenfotec-web.png"
ACTOR_DIAGRAM_PATH = ROOT / "08-Recursos" / "Imágenes" / "diagram_actor_modulo.png"
USECASE_DIAGRAM_PATH = ROOT / "08-Recursos" / "Imágenes" / "diagram_usecase.png"

# ── Mermaid rendering ─────────────────────────────────────────────────────
MERMAID_CACHE.mkdir(parents=True, exist_ok=True)


def _embed_prerendered(path, index, label):
    """Return base64-embedded img tag for a pre-rendered diagram PNG."""
    png_data = path.read_bytes()
    b64 = base64.b64encode(png_data).decode("ascii")
    print(f"  Using pre-rendered {label} for diagram {index}")
    return f'<div class="mermaid-diagram"><img src="data:image/png;base64,{b64}" alt="Diagram {index}" /></div>'


def render_mermaid(code: str, index: int) -> str:
    """Render a Mermaid diagram to PNG using mmdc CLI, with caching."""
    # Use pre-rendered UML diagram for Actor ↔ Módulo (stick figures)
    if "Actores Primarios" in code and "Módulos del Sistema" in code:
        if ACTOR_DIAGRAM_PATH.exists():
            return _embed_prerendered(ACTOR_DIAGRAM_PATH, index, "UML actor diagram")

    # Use pre-rendered UML Use Case diagram (stick figures + ellipses)
    if "CU_EDU_01" in code and "CU_SAB_01" in code and "CU_SAL_01" in code:
        if USECASE_DIAGRAM_PATH.exists():
            return _embed_prerendered(USECASE_DIAGRAM_PATH, index, "UML use case diagram")

    digest = hashlib.sha256(code.encode()).hexdigest()[:12]
    png_file = MERMAID_CACHE / f"diagram_{index}_{digest}.png"

    if not png_file.exists():
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".mmd", delete=False
        ) as tmp:
            tmp.write(code)
            tmp_path = tmp.name
        try:
            result = subprocess.run(
                [
                    "npx", "mmdc",
                    "-i", tmp_path,
                    "-o", str(png_file),
                    "-b", "white",
                    "-t", "default",
                    "--scale", "4",
                ],
                capture_output=True,
                text=True,
                timeout=120,
                cwd=str(ROOT),
            )
            if result.returncode != 0:
                print(f"  ⚠ Mermaid diagram {index} failed: {result.stderr[:200]}")
                return f'<pre class="mermaid-fallback"><code>{code}</code></pre>'
        finally:
            os.unlink(tmp_path)

    png_data = png_file.read_bytes()
    b64 = base64.b64encode(png_data).decode("ascii")
    return f'<div class="mermaid-diagram"><img src="data:image/png;base64,{b64}" alt="Diagram {index}" /></div>'


# ── Markdown preprocessing ────────────────────────────────────────────────

def strip_frontmatter(text: str) -> str:
    """Remove YAML frontmatter."""
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            return text[end + 3:].lstrip("\n")
    return text


def resolve_obsidian_links(text: str) -> str:
    """Convert [[link|alias]] and [[link]] to plain text."""
    text = re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]', r'\2', text)
    text = re.sub(r'\[\[([^\]]+)\]\]', r'\1', text)
    return text


def process_mermaid_blocks(text: str) -> str:
    """Extract mermaid code blocks and replace with rendered SVGs."""
    pattern = re.compile(r'```mermaid\n(.*?)```', re.DOTALL)
    matches = list(pattern.finditer(text))
    print(f"  Found {len(matches)} Mermaid diagrams to render...")

    for i, match in enumerate(reversed(matches)):
        code = match.group(1).strip()
        print(f"  Rendering diagram {len(matches) - i}/{len(matches)}...")
        svg_html = render_mermaid(code, len(matches) - i)
        placeholder = f"MERMAID_PLACEHOLDER_{len(matches) - i}"
        text = text[:match.start()] + placeholder + text[match.end():]
        text = text.replace(placeholder, svg_html)

    return text


def convert_tables_to_html(text: str) -> str:
    """The markdown library handles tables via the 'tables' extension."""
    return text


# ── HTML template ─────────────────────────────────────────────────────────

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap');

@page {
    size: letter;
    margin: 2.54cm 2.54cm 2.54cm 2.54cm; /* APA: 1 inch margins */
    @top-right {
        content: counter(page);
        font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
        font-size: 10pt;
        color: #333;
    }
    @top-left {
        content: "Raíces Vivas — Avance 2";
        font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
        font-size: 10pt;
        color: #666;
        font-style: italic;
    }
}

@page :first {
    @top-right { content: none; }
    @top-left { content: none; }
}

@page cover {
    margin: 0;
    @top-right { content: none; }
    @top-left { content: none; }
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #1a1a1a;
    text-align: justify;
    hyphens: auto;
    orphans: 2;
    widows: 2;
}

/* ── Cover Page ────────────────────────────────────────────────── */
.cover-page {
    page: cover;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 3cm 2cm;
    background: white;
    color: #1a1a1a;
}

.cover-page .cover-logo {
    width: 200px;
    height: auto;
    margin-bottom: 30px;
}

.cover-page .cover-decoration {
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #0057b8, transparent);
    margin: 16px auto;
    border-radius: 2px;
}

.cover-page .university {
    font-size: 14pt;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 10px;
    color: #0057b8;
}

.cover-page h1 {
    font-size: 30pt;
    font-weight: 700;
    line-height: 1.2;
    margin: 30px 0 10px;
    color: #1a1a1a;
    letter-spacing: 1px;
}

.cover-page .subtitle {
    font-size: 16pt;
    font-weight: 400;
    color: #0057b8;
    margin-bottom: 30px;
    font-style: italic;
}

.cover-page .meta-group {
    margin-top: 30px;
    line-height: 1.8;
    font-size: 12pt;
}

.cover-page .meta-group .label {
    color: #0057b8;
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 15px;
}

.cover-page .meta-group .value {
    color: #333;
    font-size: 12pt;
}

.cover-page .meta-group .authors {
    font-size: 13pt;
    font-weight: 700;
    color: #1a1a1a;
}

/* ── TOC ───────────────────────────────────────────────────────── */
.toc-page {
    page-break-after: always;
}

.toc-page h2 {
    text-align: center;
    font-size: 18pt;
    margin-bottom: 20pt;
    color: #1a3a2a;
    border: none;
}

.toc-page ul {
    list-style: none;
    padding-left: 0;
}

.toc-page li {
    line-height: 1.6;
    border-bottom: 1px dotted #ccc;
    padding: 1px 0;
    font-size: 11pt;
}

.toc-page li a {
    color: #1a3a2a;
    text-decoration: none;
}

.toc-page li a:hover {
    text-decoration: underline;
}

.toc-page li.toc-h2 {
    font-weight: 700;
    margin-top: 8px;
    font-size: 12pt;
    color: #1a3a2a;
}

.toc-page li.toc-h3 {
    padding-left: 20px;
    color: #333;
}

.toc-page li.toc-h4 {
    padding-left: 40px;
    font-size: 10pt;
    color: #555;
}

/* ── Headings (APA v7) ────────────────────────────────────────── */
h1 {
    font-size: 22pt;
    font-weight: 700;
    text-align: center;
    margin: 18pt 0 10pt;
    color: #1a3a2a;
    page-break-after: avoid;
}

h2 { /* APA Level 1: Centered, Bold */
    font-size: 16pt;
    font-weight: 700;
    text-align: center;
    margin: 16pt 0 8pt;
    color: #1a3a2a;
    page-break-after: avoid;
    border-bottom: 2px solid #2d5a3d;
    padding-bottom: 4pt;
}

h3 { /* APA Level 2: Flush Left, Bold */
    font-size: 13pt;
    font-weight: 700;
    text-align: left;
    margin: 12pt 0 6pt;
    color: #2d5a3d;
    page-break-after: avoid;
}

h4 { /* APA Level 3: Flush Left, Bold Italic */
    font-size: 12pt;
    font-weight: 700;
    font-style: italic;
    text-align: left;
    margin: 10pt 0 4pt;
    color: #3a6b4a;
    page-break-after: avoid;
}

h5 { /* APA Level 4 */
    font-size: 12pt;
    font-weight: 700;
    text-indent: 0.5in;
    margin: 12pt 0 4pt;
    page-break-after: avoid;
}

/* ── Tables ────────────────────────────────────────────────────── */
table {
    border-collapse: collapse;
    width: 100%;
    margin: 8pt 0;
    font-size: 9pt;
    line-height: 1.3;
    page-break-inside: auto;
}

thead {
    display: table-header-group;
}

tr {
    page-break-inside: avoid;
}

th {
    background-color: #1a3a2a;
    color: white;
    font-weight: 700;
    padding: 6pt 8pt;
    text-align: left;
    border: 1px solid #1a3a2a;
}

td {
    padding: 5pt 8pt;
    border: 1px solid #ccc;
    vertical-align: top;
    text-align: left;
}

tr:nth-child(even) td {
    background-color: #f5f8f5;
}

/* ── Blockquotes (notes / callouts) ────────────────────────────── */
blockquote {
    margin: 6pt 0;
    padding: 6pt 12pt;
    border-left: 4px solid #2d5a3d;
    background-color: #f0f5f0;
    font-size: 10pt;
    line-height: 1.4;
    color: #333;
    font-style: italic;
    page-break-after: avoid;
}

blockquote p {
    margin: 4pt 0;
}

/* ── Code blocks ───────────────────────────────────────────────── */
code {
    font-family: 'DejaVu Sans Mono', 'Liberation Mono', monospace;
    font-size: 9pt;
    background-color: #f4f4f4;
    padding: 1pt 4pt;
    border-radius: 3pt;
}

pre {
    background-color: #f8f8f8;
    padding: 10pt;
    border: 1px solid #ddd;
    border-radius: 4pt;
    font-size: 8pt;
    line-height: 1.4;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    page-break-inside: avoid;
}

pre code {
    background: none;
    padding: 0;
}

/* ── Mermaid diagrams ──────────────────────────────────────────── */
.mermaid-diagram {
    text-align: center;
    margin: 8pt auto;
    max-width: 100%;
    page-break-before: avoid;
}

.mermaid-diagram img {
    max-width: 100%;
    max-height: 580pt;
    height: auto;
    width: auto;
    object-fit: contain;
}

.mermaid-fallback {
    background-color: #fffde7;
    border: 1px solid #f0e68c;
    padding: 10pt;
    font-size: 8pt;
    page-break-inside: avoid;
}

/* ── Lists ─────────────────────────────────────────────────────── */
ul, ol {
    margin: 4pt 0;
    padding-left: 24pt;
    line-height: 1.4;
}

li {
    margin-bottom: 3pt;
}

/* ── Horizontal rules ──────────────────────────────────────────── */
hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 8pt 0;
}

/* ── Strong / emphasis ─────────────────────────────────────────── */
strong {
    font-weight: 700;
}

em {
    font-style: italic;
}

/* ── Page breaks ───────────────────────────────────────────────── */
.page-break {
    page-break-before: always;
}

h2 {
    page-break-before: auto;
}

/* Force page break before major sections */
h2:not(:first-of-type) {
    page-break-before: always;
}

/* ── References (APA hanging indent) ──────────────────────────── */
.references p {
    padding-left: 0.5in;
    text-indent: -0.5in;
    line-height: 2;
    margin-bottom: 6pt;
}

/* ── Utility: keep annexes together ────────────────────────────── */
.annex {
    page-break-before: always;
}

/* Print optimizations */
@media print {
    body { color: black; }
    a { color: black; text-decoration: none; }
}
"""


def _logo_b64() -> str:
    """Return the CENFOTEC logo as a base64 data URI."""
    if LOGO_PATH.exists():
        data = base64.b64encode(LOGO_PATH.read_bytes()).decode("ascii")
        return f"data:image/png;base64,{data}"
    return ""


def build_cover_page() -> str:
    logo_src = _logo_b64()
    logo_tag = f'<img class="cover-logo" src="{logo_src}" alt="Universidad CENFOTEC" />' if logo_src else ''
    return f"""
<div class="cover-page">
    {logo_tag}
    <div class="cover-decoration"></div>
    <h1>Raíces Vivas</h1>
    <div class="subtitle">Sistema Integral de Apoyo a Comunidades Indígenas</div>
    <div class="cover-decoration"></div>
    <div class="subtitle" style="font-size: 14pt; color: #0057b8; font-style: normal; font-weight: 700;">
        Avance 2 — Diseño y Arquitectura:<br>Casos de Uso
    </div>
    <div class="meta-group">
        <div class="label">Autores</div>
        <div class="authors">Elkin Cerda González</div>
        <div class="authors">Geovanny Alpízar Sandino</div>
        <div class="authors">Santiago Martínez Ramírez</div>
        <div style="height: 20px"></div>
        <div class="label">Curso</div>
        <div class="value">Introducción a la Ingeniería del Software (SOFT-09)</div>
        <div style="height: 10px"></div>
        <div class="label">Docente</div>
        <div class="value">Johnny Marín Sánchez</div>
        <div style="height: 10px"></div>
        <div class="label">Fecha</div>
        <div class="value">Abril de 2026</div>
    </div>
</div>
"""


def build_toc(html_body: str) -> tuple[str, str]:
    """Generate a Table of Contents from h2/h3/h4 headings with anchor links."""
    heading_pattern = re.compile(r'<(h[234])([^>]*)>(.*?)</\1>', re.DOTALL)
    entries = []
    counter = 0
    new_body = html_body
    for match in heading_pattern.finditer(html_body):
        level = match.group(1)
        attrs = match.group(2)
        inner = match.group(3)
        text = re.sub(r'<[^>]+>', '', inner).strip()
        if text and text != "Tabla de Contenido":
            counter += 1
            anchor_id = f"sec-{counter}"
            # Inject id into the heading if not already present
            if 'id=' not in attrs:
                old_tag = match.group(0)
                new_tag = f'<{level} id="{anchor_id}"{attrs}>{inner}</{level}>'
                new_body = new_body.replace(old_tag, new_tag, 1)
            else:
                # Extract existing id
                id_match = re.search(r'id="([^"]+)"', attrs)
                if id_match:
                    anchor_id = id_match.group(1)
            entries.append((level, text, anchor_id))

    if not entries:
        return "", html_body

    lines = ['<div class="toc-page">', '<h2>Tabla de Contenido</h2>', '<ul>']
    for level, text, anchor_id in entries:
        css_class = f"toc-{level}"
        lines.append(f'<li class="{css_class}"><a href="#{anchor_id}">{text}</a></li>')
    lines.extend(['</ul>', '</div>'])
    return "\n".join(lines), new_body


# ── Main conversion ──────────────────────────────────────────────

def main():
    print(f"📄 Reading: {SRC.name}")
    raw = SRC.read_text(encoding="utf-8")

    # 1. Strip frontmatter
    content = strip_frontmatter(raw)

    # 2. Resolve Obsidian wikilinks
    content = resolve_obsidian_links(content)

    # 3. Remove the first H1 (we have the cover page)
    content = re.sub(r'^# .+$', '', content, count=1, flags=re.MULTILINE)

    # 4. Render Mermaid diagrams to SVG
    content = process_mermaid_blocks(content)

    # 5. Convert Markdown to HTML
    print("  Converting Markdown → HTML...")
    md = markdown.Markdown(
        extensions=[
            "tables",
            "fenced_code",
            "toc",
            "attr_list",
            "md_in_html",
            "pymdownx.betterem",
            "pymdownx.superfences",
        ],
        extension_configs={
            "toc": {"permalink": False},
        },
    )
    html_body = md.convert(content)

    # 6. Build TOC (also injects anchor ids into headings)
    toc_html, html_body = build_toc(html_body)

    # 7. Assemble full HTML
    cover = build_cover_page()
    full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Raíces Vivas — Avance 2: Diseño y Arquitectura</title>
    <style>{CSS}</style>
</head>
<body>
{cover}
{toc_html}
{html_body}
</body>
</html>"""

    # 8. Write HTML (useful for debugging)
    html_path = SRC.with_suffix(".html")
    html_path.write_text(full_html, encoding="utf-8")
    print(f"  ✅ HTML written: {html_path.name}")

    # 9. Generate PDF
    print("  Generating PDF with WeasyPrint...")
    HTML(string=full_html, base_url=str(ROOT)).write_pdf(str(OUT))
    size_mb = OUT.stat().st_size / (1024 * 1024)
    print(f"  ✅ PDF written: {OUT.name} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
