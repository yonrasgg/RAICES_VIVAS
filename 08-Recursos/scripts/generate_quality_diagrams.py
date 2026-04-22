#!/usr/bin/env python3
"""Generate FODA (2x2 quadrant) and Ishikawa (fishbone) PNG diagrams.

Output:
    08-Recursos/Imágenes/diagram_foda.png
    08-Recursos/Imágenes/diagram_ishikawa.png
"""

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Rectangle

ROOT = Path(__file__).resolve().parent.parent.parent
OUT_DIR = ROOT / "08-Recursos" / "Imágenes"
OUT_DIR.mkdir(parents=True, exist_ok=True)


# ── FODA 2x2 ───────────────────────────────────────────────────────────────

def generate_foda():
    fig, ax = plt.subplots(figsize=(14, 10), dpi=180)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis("off")

    quadrants = [
        dict(xy=(0.2, 5.1), w=4.7, h=4.7, color="#C8E6C9", border="#2E7D32",
             title="FORTALEZAS (F) — Internas +",
             items=[
                 "F1. Arquitectura offline-first (PouchDB/CouchDB)",
                 "F2. Gobernanza cultural CARE (ADR-009)",
                 "F3. Stack moderno y abierto (React 19, PWA)",
                 "F4. 23 RF trazados 1:1 con casos de uso",
                 "F5. Investigación de campo real (4 ENT + OBS)",
                 "F6. Soporte multilingüe nativo (es/bri/cab/ngb)",
             ]),
        dict(xy=(5.1, 5.1), w=4.7, h=4.7, color="#FFE0B2", border="#E65100",
             title="DEBILIDADES (D) — Internas −",
             items=[
                 "D1. Conectividad limitada en 80% del territorio",
                 "D2. Alfabetización digital básica en usuarios",
                 "D3. Equipo de 3 personas con carga académica",
                 "D4. Sin CouchDB de producción desplegado",
                 "D5. Sin acceso directo a EDUS/CCSS",
                 "D6. Validación comunitaria pendiente",
             ]),
        dict(xy=(0.2, 0.2), w=4.7, h=4.7, color="#BBDEFB", border="#1565C0",
             title="OPORTUNIDADES (O) — Externas +",
             items=[
                 "O1. 24 territorios indígenas en CR",
                 "O2. Alineación Convenio 169 OIT + Ley 6172",
                 "O3. Interés CONARE y MEP",
                 "O4. Modelo replicable para Centroamérica",
                 "O5. Exportación a EDUS/CCSS mejora cobertura",
                 "O6. PWA distribuible sin App Store",
             ]),
        dict(xy=(5.1, 0.2), w=4.7, h=4.7, color="#FFCDD2", border="#B71C1C",
             title="AMENAZAS (A) — Externas −",
             items=[
                 "A1. Dispositivos Android obsoletos",
                 "A2. Pérdida acelerada de lenguas indígenas",
                 "A3. Riesgo de apropiación cultural",
                 "A4. Rotación de personal ATAP",
                 "A5. Resistencia a digitalización ceremonial",
                 "A6. Cambios regulatorios (Ley 8968)",
             ]),
    ]

    for q in quadrants:
        box = FancyBboxPatch(q["xy"], q["w"], q["h"],
                             boxstyle="round,pad=0.02,rounding_size=0.15",
                             facecolor=q["color"], edgecolor=q["border"],
                             linewidth=2.5)
        ax.add_patch(box)
        x, y = q["xy"]
        ax.text(x + q["w"] / 2, y + q["h"] - 0.35, q["title"],
                ha="center", va="top", fontsize=13, fontweight="bold",
                color=q["border"])
        for i, item in enumerate(q["items"]):
            ax.text(x + 0.20, y + q["h"] - 0.95 - i * 0.6, item,
                    ha="left", va="top", fontsize=10.2, color="#1B1B1B")

    # Axis labels
    ax.annotate("", xy=(5.0, 10.0), xytext=(5.0, 0.0),
                arrowprops=dict(arrowstyle="-", color="#616161", lw=1.5, ls="--"))
    ax.annotate("", xy=(10.0, 5.0), xytext=(0.0, 5.0),
                arrowprops=dict(arrowstyle="-", color="#616161", lw=1.5, ls="--"))

    ax.text(0.05, 9.95, "INTERNO", ha="left", va="top", fontsize=11,
            color="#424242", fontweight="bold", style="italic")
    ax.text(0.05, 0.08, "EXTERNO", ha="left", va="bottom", fontsize=11,
            color="#424242", fontweight="bold", style="italic")
    ax.text(4.95, 9.95, "(+) POSITIVO", ha="right", va="top", fontsize=11,
            color="#424242", fontweight="bold", style="italic")
    ax.text(5.05, 9.95, "(−) NEGATIVO", ha="left", va="top", fontsize=11,
            color="#424242", fontweight="bold", style="italic")

    fig.suptitle("Análisis FODA — Raíces Vivas",
                 fontsize=16, fontweight="bold", y=0.97)
    fig.text(0.5, 0.02,
             "Estrategias cruzadas: FO (ofensiva) · DO (reorientación) · FA (defensiva) · DA (supervivencia)",
             ha="center", fontsize=10.5, style="italic", color="#424242")

    out = OUT_DIR / "diagram_foda.png"
    fig.savefig(out, bbox_inches="tight", facecolor="white", dpi=180)
    plt.close(fig)
    print(f"✔ FODA → {out}")


# ── Ishikawa fishbone ──────────────────────────────────────────────────────

def generate_ishikawa():
    fig, ax = plt.subplots(figsize=(18, 10), dpi=180)
    ax.set_xlim(0, 20)
    ax.set_ylim(0, 11)
    ax.axis("off")

    # Main spine
    spine_y = 5.5
    ax.annotate("", xy=(17.2, spine_y), xytext=(1.2, spine_y),
                arrowprops=dict(arrowstyle="-|>,head_width=0.6,head_length=1.0",
                                color="#263238", lw=3.0))

    # Effect (head of fish)
    effect = FancyBboxPatch((17.3, spine_y - 0.7), 2.4, 1.4,
                            boxstyle="round,pad=0.05,rounding_size=0.15",
                            facecolor="#FFEBEE", edgecolor="#B71C1C", lw=2.5)
    ax.add_patch(effect)
    ax.text(18.5, spine_y, "⚠ Baja adopción\ndel sistema por\ncomunidades",
            ha="center", va="center", fontsize=11, fontweight="bold",
            color="#B71C1C")

    categories = [
        # Upper branches
        dict(name="MÉTODO", color="#1565C0", side="up", x=4.5,
             causes=["Consentimiento no validado\npresencialmente",
                     "Onboarding sin protocolo\nestandarizado",
                     "Resolución de conflictos\nde sync manual"]),
        dict(name="MANO DE OBRA", color="#2E7D32", side="up", x=9.5,
             causes=["Equipo de 3 personas\ncon carga académica",
                     "Rotación de ATAP\nen puestos de salud",
                     "Docentes sin formación\ndigital previa"]),
        dict(name="MEDIO AMBIENTE", color="#6A1B9A", side="up", x=14.5,
             causes=["Pérdida acelerada de\nlenguas indígenas",
                     "Distancia geográfica\na territorios",
                     "Resistencia cultural a\ndigitalización"]),
        # Lower branches
        dict(name="MÁQUINA", color="#E65100", side="down", x=4.5,
             causes=["Sin CouchDB de\nproducción",
                     "Dispositivos Android\nobsoletos (<2 GB RAM)",
                     "Conectividad intermitente\no inexistente"]),
        dict(name="MATERIAL", color="#00838F", side="down", x=9.5,
             causes=["Catálogos base\nno poblados",
                     "Mapeo EDUS sin\nespecificación oficial",
                     "Contenido multilingüe\nrequiere traducción"]),
        dict(name="MEDICIÓN", color="#AD1457", side="down", x=14.5,
             causes=["Sin métricas de\nadopción definidas",
                     "Sin baseline de\nalfabetización digital",
                     "RNF-03 (≤2 min) no\nvalidado con usuarios"]),
    ]

    for cat in categories:
        x = cat["x"]
        y_end = 9.7 if cat["side"] == "up" else 1.3
        y_spine = spine_y
        # Branch slanted line
        x_spine = x + (2.2 if cat["side"] == "up" else -2.2) * 0.0
        # Slanted diagonal branch
        x_branch_end = x
        x_branch_start = x + 2.6  # toward head/spine
        y_branch_start = y_spine
        y_branch_end = y_end

        ax.plot([x_branch_start, x_branch_end], [y_branch_start, y_branch_end],
                color=cat["color"], lw=2.5, solid_capstyle="round")

        # Category label box
        label_y = y_end + (0.35 if cat["side"] == "up" else -0.35)
        label_va = "bottom" if cat["side"] == "up" else "top"
        ax.text(x, label_y, cat["name"], ha="center", va=label_va,
                fontsize=12, fontweight="bold", color=cat["color"],
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                          edgecolor=cat["color"], lw=1.5))

        # Sub-causes (small bones attached to diagonal)
        n = len(cat["causes"])
        for i, cause in enumerate(cat["causes"]):
            # Position along the diagonal branch (from spine outward)
            t = 0.30 + 0.25 * i  # 0.30, 0.55, 0.80
            bx = x_branch_start + (x_branch_end - x_branch_start) * t
            by = y_branch_start + (y_branch_end - y_branch_start) * t
            # Small perpendicular bone to the left (farther from head)
            bone_len = 1.6
            bone_x_end = bx - bone_len
            bone_y_end = by
            ax.plot([bx, bone_x_end], [by, bone_y_end],
                    color=cat["color"], lw=1.3, alpha=0.85)
            ax.text(bone_x_end - 0.1, bone_y_end, cause,
                    ha="right", va="center", fontsize=8.5,
                    color="#263238")

    fig.suptitle("Diagrama de Ishikawa (Causa-Efecto) — 6M · Raíces Vivas",
                 fontsize=16, fontweight="bold", y=0.97)
    fig.text(0.5, 0.02,
             "Causas priorizadas por RPN = Impacto × Frecuencia (1–5). "
             "Top 3: Conectividad (25) · Consentimiento (20) · Dispositivos / Resistencia (16).",
             ha="center", fontsize=10, style="italic", color="#424242")

    out = OUT_DIR / "diagram_ishikawa.png"
    fig.savefig(out, bbox_inches="tight", facecolor="white", dpi=180)
    plt.close(fig)
    print(f"✔ Ishikawa → {out}")


# ── QFD House of Quality ───────────────────────────────────────────────────


def generate_qfd():
    import numpy as np
    from matplotlib.patches import Polygon

    needs = [
        ("N1", "Funcionar sin internet", 5),
        ("N2", "Proteger saberes según nivel cultural", 5),
        ("N3", "Operar en lengua indígena", 4),
        ("N4", "Registrar pacientes de forma sencilla", 4),
        ("N5", "Compartir material entre comunidades", 3),
        ("N6", "Exportar datos al sistema CCSS", 3),
        ("N7", "Revocar contenido en cualquier momento", 5),
        ("N8", "Auditar quién accedió a qué", 4),
        ("N9", "Funcionar en dispositivos básicos", 4),
        ("N10", "Completar tareas en < 2 minutos", 4),
    ]
    hows = [
        ("T1", "PouchDB offline sync"),
        ("T2", "CARE 4 niveles acceso"),
        ("T3", "i18next 4 idiomas"),
        ("T4", "≤ 6 campos obligatorios"),
        ("T5", "PWA Service Worker"),
        ("T6", "AES-256 + TLS 1.3"),
        ("T7", "LOG_ACCESO inmutable"),
        ("T8", "Exportación HL7/EDUS"),
        ("T9", "Android 8+ / 2 GB RAM"),
        ("T10", "Revocación prioritaria"),
    ]
    # 9 = fuerte, 3 = medio, 1 = débil, 0 = sin relación
    rel = [
        # T1 T2 T3 T4 T5 T6 T7 T8 T9 T10
        [9, 0, 0, 0, 9, 0, 0, 0, 3, 0],  # N1
        [0, 9, 0, 0, 0, 3, 9, 0, 0, 9],  # N2
        [0, 0, 9, 0, 0, 0, 0, 0, 0, 0],  # N3
        [0, 0, 3, 9, 0, 0, 0, 0, 3, 0],  # N4
        [3, 3, 3, 0, 3, 0, 0, 0, 0, 0],  # N5
        [0, 0, 0, 0, 0, 3, 0, 9, 0, 0],  # N6
        [3, 9, 0, 0, 0, 0, 9, 0, 0, 9],  # N7
        [0, 3, 0, 0, 0, 0, 9, 0, 0, 0],  # N8
        [0, 0, 0, 3, 9, 0, 0, 0, 9, 0],  # N9
        [3, 0, 0, 9, 3, 0, 0, 0, 3, 0],  # N10
    ]
    # Correlaciones techo (pares T×T): ++ fuerte positiva, + positiva, − negativa, −− fuerte negativa
    # (i, j, symbol)
    roof = {
        (0, 4): "++",   # T1-T5 offline sync refuerza PWA
        (1, 6): "++",   # CARE-auditoría
        (1, 9): "++",   # CARE-revocación
        (6, 9): "+",    # auditoría-revocación
        (4, 8): "+",    # PWA-Android
        (3, 8): "+",    # ≤6 campos-Android básico
        (5, 7): "+",    # cifrado-EDUS
        (2, 3): "−",    # i18n vs ≤6 campos (tensión)
        (0, 8): "+",    # sync-dispositivo
        (5, 6): "+",    # cifrado-auditoría
    }
    n_needs = len(needs)
    n_hows = len(hows)

    fig = plt.figure(figsize=(20, 14), dpi=170)
    ax = fig.add_subplot(111)
    ax.set_xlim(0, 30)
    ax.set_ylim(0, 24)
    ax.axis("off")

    # ── Layout regions (in axes units) ─────────────────────────────────────
    left_x = 1.0          # imp col start
    imp_w = 1.5
    whats_x = left_x + imp_w  # 2.5
    whats_w = 7.0         # needs column
    matrix_x = whats_x + whats_w  # 9.5
    cell = 1.5
    matrix_w = cell * n_hows      # 15.0
    matrix_y = 4.0        # bottom of matrix
    matrix_h = cell * n_needs     # 15.0
    matrix_top = matrix_y + matrix_h  # 19.0
    right_x = matrix_x + matrix_w     # 24.5

    # ── (1) ROOF: Correlation matrix (rotated 45°) ─────────────────────────
    # Each cell of the roof is a diamond at (matrix_x + (i+0.5)*cell + (j-i)*cell/2, matrix_top + (j-i)*cell/2)
    roof_half = cell / 2
    roof_top_y = matrix_top
    for i in range(n_hows):
        for j in range(i + 1, n_hows):
            cx = matrix_x + (i + 0.5) * cell + (j - i) * cell / 2
            cy = roof_top_y + (j - i) * cell / 2
            diamond = Polygon(
                [(cx, cy - roof_half), (cx + roof_half, cy),
                 (cx, cy + roof_half), (cx - roof_half, cy)],
                closed=True, facecolor="#FAFAFA", edgecolor="#BDBDBD", lw=0.8,
            )
            ax.add_patch(diamond)
            sym = roof.get((i, j))
            if sym:
                colors = {"++": "#2E7D32", "+": "#66BB6A",
                          "−": "#E65100", "−−": "#B71C1C"}
                ax.text(cx, cy, sym, ha="center", va="center",
                        fontsize=11, fontweight="bold", color=colors[sym])

    # Roof outline triangle
    roof_peak_y = roof_top_y + n_hows * cell / 2
    tri = Polygon(
        [(matrix_x, roof_top_y),
         (matrix_x + matrix_w, roof_top_y),
         (matrix_x + matrix_w / 2, roof_peak_y)],
        closed=True, fill=False, edgecolor="#424242", lw=2.0,
    )
    ax.add_patch(tri)

    # Roof legend
    leg_x = right_x + 0.3
    leg_y = roof_top_y + 0.3
    ax.text(leg_x, leg_y + 3.0, "Correlación (techo)",
            fontsize=10, fontweight="bold")
    for i, (sym, desc, color) in enumerate([
        ("++", "Sinergia fuerte", "#2E7D32"),
        ("+",  "Sinergia", "#66BB6A"),
        ("−",  "Tensión", "#E65100"),
        ("−−", "Conflicto fuerte", "#B71C1C"),
    ]):
        ax.text(leg_x, leg_y + 2.4 - i * 0.55, sym,
                fontsize=12, fontweight="bold", color=color)
        ax.text(leg_x + 0.7, leg_y + 2.4 - i * 0.55, desc,
                fontsize=9, va="center")

    # ── (2) HOWS row (top of matrix) ───────────────────────────────────────
    hows_label_y = matrix_top + 0.1
    for j, (code, name) in enumerate(hows):
        cx = matrix_x + (j + 0.5) * cell
        # Vertical text rotated for long names
        ax.text(cx, matrix_top + 0.3, f"{code}", ha="center", va="bottom",
                fontsize=11, fontweight="bold", color="#01579B")
        ax.text(cx, matrix_top + 0.85, name, ha="center", va="bottom",
                fontsize=8.5, rotation=35, rotation_mode="anchor", color="#263238")

    # HOWS header bar label
    ax.text(matrix_x + matrix_w / 2, matrix_top + 2.8, "CÓMO (Características técnicas)",
            ha="center", va="bottom", fontsize=11, fontweight="bold", color="#01579B",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="#E1F5FE",
                      edgecolor="#01579B", lw=1.2))

    # ── (3) WHATs column (needs) + Importance ──────────────────────────────
    # Header
    ax.text(whats_x + whats_w / 2, matrix_top + 0.35, "QUÉ (Voz del cliente)",
            ha="center", va="bottom", fontsize=11, fontweight="bold", color="#4A148C",
            bbox=dict(boxstyle="round,pad=0.25", facecolor="#F3E5F5",
                      edgecolor="#4A148C", lw=1.2))
    ax.text(left_x + imp_w / 2, matrix_top + 0.35, "Imp.",
            ha="center", va="bottom", fontsize=10, fontweight="bold", color="#BF360C",
            bbox=dict(boxstyle="round,pad=0.2", facecolor="#FFF3E0",
                      edgecolor="#BF360C", lw=1.0))

    for i, (code, name, imp) in enumerate(needs):
        row_y = matrix_top - (i + 0.5) * cell
        # Importance cell
        imp_color = {5: "#E53935", 4: "#FB8C00", 3: "#FDD835"}.get(imp, "#E0E0E0")
        ax.add_patch(Rectangle((left_x, row_y - cell / 2), imp_w, cell,
                               facecolor=imp_color, edgecolor="#424242", lw=0.8))
        ax.text(left_x + imp_w / 2, row_y, str(imp),
                ha="center", va="center", fontsize=13, fontweight="bold",
                color="white")
        # Need cell
        ax.add_patch(Rectangle((whats_x, row_y - cell / 2), whats_w, cell,
                               facecolor="#FFFFFF", edgecolor="#424242", lw=0.8))
        ax.text(whats_x + 0.15, row_y, f"{code}",
                ha="left", va="center", fontsize=10, fontweight="bold",
                color="#4A148C")
        ax.text(whats_x + 0.95, row_y, name,
                ha="left", va="center", fontsize=9.5, color="#212121")

    # ── (4) Relationship matrix ────────────────────────────────────────────
    for i in range(n_needs):
        for j in range(n_hows):
            x = matrix_x + j * cell
            y = matrix_top - (i + 1) * cell
            ax.add_patch(Rectangle((x, y), cell, cell,
                                   facecolor="white", edgecolor="#BDBDBD", lw=0.6))
            v = rel[i][j]
            if v == 9:
                circle = plt.Circle((x + cell / 2, y + cell / 2), 0.42,
                                    facecolor="#2E7D32", edgecolor="#1B5E20", lw=1.2)
                ax.add_patch(circle)
                inner = plt.Circle((x + cell / 2, y + cell / 2), 0.18,
                                   facecolor="white", edgecolor="#1B5E20", lw=0.8)
                ax.add_patch(inner)
            elif v == 3:
                circle = plt.Circle((x + cell / 2, y + cell / 2), 0.42,
                                    facecolor="none", edgecolor="#F57C00", lw=2.0)
                ax.add_patch(circle)
            elif v == 1:
                tri = Polygon([(x + cell / 2, y + cell / 2 + 0.4),
                               (x + cell / 2 - 0.35, y + cell / 2 - 0.25),
                               (x + cell / 2 + 0.35, y + cell / 2 - 0.25)],
                              closed=True, facecolor="none",
                              edgecolor="#1976D2", lw=1.5)
                ax.add_patch(tri)

    # ── (5) CUÁNTO — Priorización técnica (bottom) ─────────────────────────
    weights = [n[2] for n in needs]
    totals = [sum(weights[i] * rel[i][j] for i in range(n_needs)) for j in range(n_hows)]
    max_total = max(totals)
    bar_base_y = matrix_y - 0.2
    bar_max_h = 2.4
    ranks = sorted(range(n_hows), key=lambda k: -totals[k])
    rank_of = {k: r + 1 for r, k in enumerate(ranks)}

    for j in range(n_hows):
        cx = matrix_x + (j + 0.5) * cell
        h = bar_max_h * (totals[j] / max_total)
        ax.add_patch(Rectangle((cx - cell * 0.35, bar_base_y - h),
                               cell * 0.7, h,
                               facecolor="#1565C0", edgecolor="#0D47A1", lw=1.0,
                               alpha=0.85))
        ax.text(cx, bar_base_y - h - 0.25, str(totals[j]),
                ha="center", va="top", fontsize=9.5, fontweight="bold",
                color="#0D47A1")
        ax.text(cx, bar_base_y + 0.05, f"#{rank_of[j]}",
                ha="center", va="bottom", fontsize=9, fontweight="bold",
                color="#B71C1C")

    # CUANTO header
    ax.text(matrix_x - 0.15, bar_base_y - bar_max_h / 2, "CUÁNTO\n(ponderado)",
            ha="right", va="center", fontsize=10, fontweight="bold",
            color="#0D47A1",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="#E3F2FD",
                      edgecolor="#0D47A1", lw=1.2))

    # ── Matrix legend (relationships) ──────────────────────────────────────
    lg_x = whats_x - 0.2
    lg_y = bar_base_y - bar_max_h - 0.6
    ax.text(lg_x, lg_y + 0.4, "Matriz de relación  QUÉ × CÓMO:",
            fontsize=10, fontweight="bold", color="#263238")

    # Fuerte
    ax.add_patch(plt.Circle((lg_x + 0.3, lg_y - 0.2), 0.22,
                            facecolor="#2E7D32", edgecolor="#1B5E20"))
    ax.add_patch(plt.Circle((lg_x + 0.3, lg_y - 0.2), 0.09,
                            facecolor="white", edgecolor="#1B5E20"))
    ax.text(lg_x + 0.65, lg_y - 0.2, "Fuerte (9)",
            fontsize=9, va="center")
    # Moderada
    ax.add_patch(plt.Circle((lg_x + 2.5, lg_y - 0.2), 0.22,
                            facecolor="none", edgecolor="#F57C00", lw=1.8))
    ax.text(lg_x + 2.85, lg_y - 0.2, "Moderada (3)",
            fontsize=9, va="center")
    # Débil
    tri = Polygon([(lg_x + 4.9, lg_y), (lg_x + 4.7, lg_y - 0.35),
                   (lg_x + 5.1, lg_y - 0.35)],
                  closed=True, facecolor="none",
                  edgecolor="#1976D2", lw=1.3)
    ax.add_patch(tri)
    ax.text(lg_x + 5.35, lg_y - 0.2, "Débil (1)",
            fontsize=9, va="center")

    # Importance legend
    ax.text(lg_x, lg_y - 0.9, "Importancia (QUÉ):",
            fontsize=10, fontweight="bold", color="#BF360C")
    for k, (val, color, txt) in enumerate([
        (5, "#E53935", "Crítica"),
        (4, "#FB8C00", "Alta"),
        (3, "#FDD835", "Media"),
    ]):
        ax.add_patch(Rectangle((lg_x + 2.5 + k * 2.6, lg_y - 1.05), 0.4, 0.35,
                               facecolor=color, edgecolor="#424242", lw=0.7))
        ax.text(lg_x + 3.0 + k * 2.6, lg_y - 0.87, f"{val} — {txt}",
                fontsize=9, va="center")

    # ── Title ──────────────────────────────────────────────────────────────
    fig.suptitle("Casa de la Calidad (QFD) — Raíces Vivas",
                 fontsize=18, fontweight="bold", y=0.975)
    fig.text(0.5, 0.015,
             "Top 3 por puntuación ponderada: T7 Auditoría · T2 CARE · T5 PWA Service Worker",
             ha="center", fontsize=10.5, style="italic", color="#424242")

    out = OUT_DIR / "diagram_qfd.png"
    fig.savefig(out, bbox_inches="tight", facecolor="white", dpi=170)
    plt.close(fig)
    print(f"✔ QFD (House of Quality) → {out}")


if __name__ == "__main__":
    generate_foda()
    generate_ishikawa()
    generate_qfd()
