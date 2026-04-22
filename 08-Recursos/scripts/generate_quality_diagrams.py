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


if __name__ == "__main__":
    generate_foda()
    generate_ishikawa()
