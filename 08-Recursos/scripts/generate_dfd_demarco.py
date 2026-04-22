#!/usr/bin/env python3
"""Generate DeMarco–Yourdon Data Flow Diagrams (DFD) for Raíces Vivas.

Notation (strict):
  • Process         → circle                         ("0", "1.x"…)
  • External entity → rectangle                      (actors / external systems)
  • Data store      → open-sided rectangle (D#)      (two horizontal lines)
  • Data flow       → labeled arrow                  (name on the arrow)

Outputs:
  08-Recursos/Imágenes/diagram_dfd_nivel0.png   (Diagrama de Contexto)
  08-Recursos/Imágenes/diagram_dfd_nivel1.png   (Descomposición funcional)
"""

from __future__ import annotations

from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyArrowPatch, Rectangle
import numpy as np

ROOT = Path(__file__).resolve().parent.parent.parent
OUT_DIR = ROOT / "08-Recursos" / "Imágenes"
OUT_DIR.mkdir(parents=True, exist_ok=True)


# ─────────────────────── Shared DFD primitives ───────────────────────

PROCESS_FC = "#E8F5E9"
PROCESS_EC = "#2E7D32"
ENTITY_FC = "#E3F2FD"
ENTITY_EC = "#1565C0"
STORE_EC = "#6A1B9A"
FLOW_EC = "#37474F"
LABEL_BG = "#FFFFFF"


def draw_process(ax, x, y, label, r=0.70):
    """Circle = process (DeMarco–Yourdon bubble)."""
    c = Circle((x, y), r, facecolor=PROCESS_FC, edgecolor=PROCESS_EC, linewidth=2.0, zorder=3)
    ax.add_patch(c)
    ax.text(x, y, label, ha="center", va="center", fontsize=9.5,
            fontweight="bold", color=PROCESS_EC, zorder=4,
            wrap=True)


def draw_entity(ax, x, y, label, w=2.2, h=0.85):
    """Rectangle = external entity (source/sink)."""
    rect = Rectangle((x - w / 2, y - h / 2), w, h,
                     facecolor=ENTITY_FC, edgecolor=ENTITY_EC, linewidth=1.8, zorder=3)
    ax.add_patch(rect)
    ax.text(x, y, label, ha="center", va="center", fontsize=8.5,
            color="#0D47A1", zorder=4)


def draw_store(ax, x, y, label, w=2.6, h=0.7):
    """Open-sided rectangle = data store (two horizontal lines, no verticals).

    DeMarco variant: left & right are open; top & bottom rules only. We also
    draw the store ID (D#) inside a small left-aligned compartment.
    """
    x0, x1 = x - w / 2, x + w / 2
    y0, y1 = y - h / 2, y + h / 2
    ax.plot([x0, x1], [y1, y1], color=STORE_EC, linewidth=1.8, zorder=3)
    ax.plot([x0, x1], [y0, y0], color=STORE_EC, linewidth=1.8, zorder=3)
    # Subtle fill so text is readable behind arrows
    ax.add_patch(Rectangle((x0, y0), w, h, facecolor="#FFFFFF",
                           edgecolor="none", alpha=0.85, zorder=2.5))
    ax.text(x, y, label, ha="center", va="center", fontsize=8.5,
            color=STORE_EC, zorder=4)


def draw_flow(ax, start, end, label, bend=0.0, label_offset=(0, 0.0)):
    """Labeled arrow = data flow."""
    arrow = FancyArrowPatch(
        start, end,
        connectionstyle=f"arc3,rad={bend}",
        arrowstyle="-|>", mutation_scale=14,
        linewidth=1.3, color=FLOW_EC, zorder=2,
    )
    ax.add_patch(arrow)
    # Midpoint with small offset toward bend
    mx = (start[0] + end[0]) / 2 + label_offset[0]
    my = (start[1] + end[1]) / 2 + label_offset[1]
    if bend:
        # Shift perpendicular-ish
        dx = end[0] - start[0]
        dy = end[1] - start[1]
        length = max(np.hypot(dx, dy), 0.001)
        nx, ny = -dy / length, dx / length
        mx += nx * bend * 0.8
        my += ny * bend * 0.8
    ax.text(mx, my, label, ha="center", va="center", fontsize=7.2,
            color="#212121",
            bbox=dict(boxstyle="round,pad=0.18", fc=LABEL_BG,
                      ec="#B0BEC5", lw=0.6, alpha=0.95),
            zorder=5)


def _finalize(ax, xlim, ylim):
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal")
    ax.axis("off")


# ─────────────────────── Nivel 0 — Contexto ───────────────────────

def generate_nivel0():
    fig, ax = plt.subplots(figsize=(14, 9.5), dpi=150)
    # Central process
    cx, cy = 7.5, 4.5
    draw_process(ax, cx, cy, "0\nSistema\nRaíces Vivas", r=1.25)

    # External entities (actors + external systems)
    entities = {
        # Left column
        "Docente\nComunitario":     (1.5, 7.3),
        "Estudiante":               (1.5, 5.0),
        "Líder Comunal /\nAdmin":   (1.5, 2.6),
        # Right column
        "Personal de Salud":        (13.5, 7.3),
        "Portador de\nSaber":       (13.5, 5.0),
        "Consejo de Mayores /\nADI": (13.5, 2.6),
        # Top / Bottom (external systems)
        "MEP\n(Sistema Educativo)": (4.5, 8.4),
        "CCSS / EDUS\n(Sistema de Salud)": (10.5, 8.4),
        "ODS / UNESCO\n(Marco Normativo)": (7.5, 0.6),
    }
    for label, (x, y) in entities.items():
        draw_entity(ax, x, y, label)

    # Data flows — entity → process (and back)
    flows = [
        # Docente
        ("Docente\nComunitario", ("in",  "Material didáctico, registro de progreso")),
        ("Docente\nComunitario", ("out", "Material bilingüe, reportes, sync")),
        # Estudiante
        ("Estudiante",           ("in",  "Respuestas a ejercicios, identidad")),
        ("Estudiante",           ("out", "Contenido educativo, retroalimentación")),
        # Líder comunal
        ("Líder Comunal /\nAdmin", ("in",  "Políticas de acceso, aprobaciones")),
        ("Líder Comunal /\nAdmin", ("out", "Reportes de uso, log de auditoría")),
        # Salud
        ("Personal de Salud",    ("in",  "Consultas, signos vitales, alertas")),
        ("Personal de Salud",    ("out", "Historial clínico, export EDUS")),
        # Portador
        ("Portador de\nSaber",   ("in",  "Saber ancestral + consentimiento")),
        ("Portador de\nSaber",   ("out", "Catálogo, revocaciones aplicadas")),
        # Consejo
        ("Consejo de Mayores /\nADI", ("in",  "Decisión de acceso, revocación")),
        ("Consejo de Mayores /\nADI", ("out", "Log de accesos ceremoniales")),
        # MEP
        ("MEP\n(Sistema Educativo)", ("in",  "Currículo oficial")),
        ("MEP\n(Sistema Educativo)", ("out", "Reporte trimestral")),
        # CCSS
        ("CCSS / EDUS\n(Sistema de Salud)", ("in",  "Paciente existente (EDUS)")),
        ("CCSS / EDUS\n(Sistema de Salud)", ("out", "Expediente consolidado CSV")),
        # ODS
        ("ODS / UNESCO\n(Marco Normativo)", ("in",  "Lineamientos CARE / ODS 4·3·10·16")),
    ]

    # Draw flows: for each entity, draw one labeled arrow (merge in/out labels)
    merged: dict[tuple[float, float], list[tuple[str, str]]] = {}
    for ent_label, (direction, flow_name) in flows:
        pos = entities[ent_label]
        merged.setdefault(pos, []).append((direction, flow_name))

    for pos, arrows in merged.items():
        x_e, y_e = pos
        # Compute direction vector from entity to process
        dx, dy = cx - x_e, cy - y_e
        length = np.hypot(dx, dy)
        ux, uy = dx / length, dy / length
        # Start / end points at boundary
        entity_edge = (x_e + ux * 1.1, y_e + uy * 0.55)
        process_edge = (cx - ux * 1.30, cy - uy * 1.30)

        # Build merged label
        parts = []
        for direction, name in arrows:
            parts.append(name)
        label = "\n".join(parts[:2])

        # Draw two parallel arrows (bidirectional flow) using bend
        perp = (-uy, ux)
        offset = 0.14
        start_a = (entity_edge[0] + perp[0] * offset, entity_edge[1] + perp[1] * offset)
        end_a   = (process_edge[0] + perp[0] * offset, process_edge[1] + perp[1] * offset)
        start_b = (process_edge[0] - perp[0] * offset, process_edge[1] - perp[1] * offset)
        end_b   = (entity_edge[0] - perp[0] * offset, entity_edge[1] - perp[1] * offset)

        FancyArrowPatch_kwargs = dict(
            arrowstyle="-|>", mutation_scale=12, linewidth=1.2,
            color=FLOW_EC, zorder=2,
        )
        ax.add_patch(FancyArrowPatch(start_a, end_a, **FancyArrowPatch_kwargs))
        ax.add_patch(FancyArrowPatch(start_b, end_b, **FancyArrowPatch_kwargs))

        # Midpoint label
        mx = (x_e + cx) / 2
        my = (y_e + cy) / 2
        ax.text(mx, my, label, ha="center", va="center", fontsize=7.0,
                color="#212121",
                bbox=dict(boxstyle="round,pad=0.20", fc=LABEL_BG,
                          ec="#B0BEC5", lw=0.6, alpha=0.96),
                zorder=5)

    # Title
    ax.text(7.5, 9.3, "DFD Nivel 0 — Diagrama de Contexto (DeMarco–Yourdon)",
            ha="center", fontsize=13, fontweight="bold", color="#1B5E20")
    ax.text(7.5, -0.1,
            "○ Proceso   □ Entidad externa   → Flujo de datos",
            ha="center", fontsize=9, color="#546E7A", style="italic")

    _finalize(ax, (-0.2, 15.2), (-0.5, 9.8))
    out = OUT_DIR / "diagram_dfd_nivel0.png"
    fig.savefig(out, bbox_inches="tight", dpi=180, facecolor="white")
    plt.close(fig)
    print(f"✔ {out.relative_to(ROOT)}")


# ─────────────────────── Nivel 1 — Descomposición ───────────────────────

def generate_nivel1():
    fig, ax = plt.subplots(figsize=(17, 11.5), dpi=150)

    # Processes (bubbles) — more spacing
    procs = {
        "P1": (5.5, 8.6, "1\nMódulo\nEducación\n(EDU)"),
        "P2": (13.0, 8.6, "2\nMódulo\nSaberes\n(SAB)"),
        "P3": (5.5, 3.2, "3\nMódulo\nSalud\n(SAL)"),
        "P4": (13.0, 3.2, "4\nServicios\nTransversales\n(TRANS)"),
    }
    for _, (x, y, label) in procs.items():
        draw_process(ax, x, y, label, r=1.15)

    # Data stores (placed on clean tracks; labels at top)
    stores = {
        "D1": (9.25, 10.5, "D1  Catálogo multimedia bilingüe"),
        "D2": (9.25, 5.9,  "D2  Réplica local PouchDB"),
        "D3": (9.25, 0.75, "D3  Log inmutable de auditoría"),
        "D4": (1.1,  5.9,  "D4  Catálogo i18n"),
        "D5": (17.4, 5.9,  "D5  CouchDB servidor"),
    }
    for _, (x, y, label) in stores.items():
        draw_store(ax, x, y, label, w=3.4, h=0.55)

    # External entities (stacked on edges)
    entities = {
        "Docente\nComunitario":   (0.9, 9.4),
        "Estudiante":             (0.9, 7.8),
        "Portador de\nSaber":     (17.6, 9.4),
        "Consejo de\nMayores":    (17.6, 7.8),
        "ATAP / Personal\nde Salud":    (0.9, 4.0),
        "Paciente":               (0.9, 2.4),
        "EDUS / CCSS":            (17.6, 4.0),
        "MEP":                    (17.6, 2.4),
    }
    for label, (x, y) in entities.items():
        draw_entity(ax, x, y, label, w=1.85, h=0.85)

    # Single-direction flows (much cleaner than double arrows everywhere)
    flows = [
        # Docente/Estudiante ↔ EDU
        ((1.82, 9.4),  (4.45, 8.85), "Material, registro"),
        ((4.45, 8.35), (1.82, 7.8),  "Progreso, reportes"),
        # EDU ↔ D1
        ((5.5, 9.75),  (8.15, 10.35), "Guardar/leer material", 0.08),
        # EDU ↔ D2
        ((5.5, 7.45),  (8.15, 6.1),   "Persistir / leer caché", 0.06),
        # Portador/Consejo ↔ SAB
        ((16.67, 9.4), (14.05, 8.85), "Saber + consentimiento"),
        ((14.05, 8.35),(16.67, 7.8),  "Políticas, revocación"),
        # SAB ↔ D1
        ((13.0, 9.75), (10.35, 10.35),"Catalogar / consultar", -0.08),
        # SAB ↔ D2
        ((13.0, 7.45), (10.35, 6.1),  "Guardar / leer (CARE)", -0.06),
        # SAL ↔ ATAP/Paciente
        ((1.82, 4.0),  (4.45, 3.55),  "Consulta, signos"),
        ((4.45, 3.0),  (1.82, 2.4),   "Historial, seguimiento"),
        # SAL ↔ D2
        ((5.5, 4.35),  (8.15, 5.65),  "Registrar / leer paciente", -0.06),
        # SAL → EDUS (direct export)
        ((6.6, 3.2),   (16.67, 4.0),  "Export CSV → EDUS", 0.18),
        # TRANS ↔ D2
        ((13.0, 4.35), (10.35, 5.65), "Sync bidireccional", 0.06),
        # TRANS ↔ D5
        ((14.1, 3.2),  (16.3, 5.65),  "Sync oportunista", 0.12),
        # TRANS ↔ D4
        ((11.9, 3.2),  (2.2, 5.65),   "Claves / strings i18n", 0.25),
        # MEP ↔ TRANS
        ((16.67, 2.4), (14.1, 2.85),  "Currículo / reporte"),
        # Audit fan-in → D3
        ((5.5, 2.05),  (8.15, 0.95),  "Evento de acceso", 0.10),
        ((13.0, 2.05), (10.35, 0.95), "Evento de acceso", -0.10),
    ]

    for flow in flows:
        if len(flow) == 3:
            s, e, lbl = flow; bend = 0.0
        else:
            s, e, lbl, bend = flow
        draw_flow(ax, s, e, lbl, bend=bend)

    # Title & legend
    ax.text(9.25, 11.7, "DFD Nivel 1 — Descomposición Funcional (DeMarco–Yourdon)",
            ha="center", fontsize=13, fontweight="bold", color="#1B5E20")
    ax.text(9.25, -0.15,
            "○ Proceso   □ Entidad externa   ═ D#  Almacén de datos (abierto a los lados)   → Flujo de datos etiquetado",
            ha="center", fontsize=9, color="#546E7A", style="italic")

    _finalize(ax, (-0.3, 18.8), (-0.3, 12.2))
    out = OUT_DIR / "diagram_dfd_nivel1.png"
    fig.savefig(out, bbox_inches="tight", dpi=180, facecolor="white")
    plt.close(fig)
    print(f"✔ {out.relative_to(ROOT)}")


if __name__ == "__main__":
    generate_nivel0()
    generate_nivel1()
