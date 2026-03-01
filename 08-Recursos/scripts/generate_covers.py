#!/usr/bin/env python3
"""
Generador de covers culturales para el vault Raíces Vivas.
Patrones geométricos inspirados en arte indígena costarricense:
- Bribri: espirales, triángulos, naturaleza
- Cabécar: montañas, ríos, geometría angular
- Boruca: máscaras, colores tierra
- Maleku: elementos naturales, simétricos

Paleta: tierra, terracota, verde selva, ocre, dorado, azul profundo
"""

import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ---- Dimensiones ----
WIDTH = 1920
HEIGHT = 600

# ---- Paletas por tema ----
PALETTES = {
    "dashboard": {
        "bg": (20, 25, 30),         # casi negro azulado
        "primary": (92, 245, 95),   # verde accent (#5cf55f)
        "secondary": (45, 180, 80),
        "accent": (200, 165, 60),   # dorado
        "detail": (60, 70, 85),
        "text": (240, 240, 240),
    },
    "educacion": {
        "bg": (25, 50, 45),         # verde oscuro selva
        "primary": (80, 180, 100),  # verde fresco
        "secondary": (150, 200, 80),# verde claro
        "accent": (240, 200, 60),   # amarillo cálido
        "detail": (40, 75, 60),
        "text": (240, 240, 230),
    },
    "saberes": {
        "bg": (55, 30, 20),         # marrón profundo
        "primary": (200, 120, 50),  # terracota
        "secondary": (230, 170, 70),# ocre dorado
        "accent": (180, 60, 40),    # rojo tierra
        "detail": (80, 50, 35),
        "text": (245, 235, 220),
    },
    "salud": {
        "bg": (20, 35, 55),         # azul profundo noche
        "primary": (70, 150, 200),  # azul agua
        "secondary": (100, 200, 180),# turquesa
        "accent": (240, 200, 100),  # dorado cálido
        "detail": (35, 55, 80),
        "text": (230, 240, 250),
    },
    "arquitectura": {
        "bg": (30, 30, 35),         # gris oscuro
        "primary": (160, 140, 120), # piedra
        "secondary": (200, 180, 150),# arena
        "accent": (92, 245, 95),    # verde accent
        "detail": (50, 50, 55),
        "text": (230, 230, 225),
    },
    "requerimientos": {
        "bg": (35, 25, 50),         # púrpura oscuro
        "primary": (150, 100, 200), # lavanda
        "secondary": (200, 150, 220),# lila
        "accent": (240, 180, 80),   # ámbar
        "detail": (55, 40, 70),
        "text": (240, 235, 250),
    },
    "sprints": {
        "bg": (20, 40, 35),         # verde oscuro
        "primary": (92, 245, 95),   # verde accent
        "secondary": (60, 200, 130),# esmeralda
        "accent": (255, 200, 60),   # amarillo
        "detail": (35, 60, 50),
        "text": (240, 245, 240),
    },
    "investigacion": {
        "bg": (40, 35, 25),         # tierra
        "primary": (190, 150, 90),  # arena dorada
        "secondary": (150, 120, 70),# ocre
        "accent": (80, 170, 120),   # verde
        "detail": (60, 55, 40),
        "text": (240, 235, 220),
    },
    "metricas": {
        "bg": (15, 20, 30),         # negro azul
        "primary": (92, 245, 95),   # verde
        "secondary": (60, 180, 220),# cyan
        "accent": (255, 160, 60),   # naranja
        "detail": (30, 40, 55),
        "text": (230, 240, 250),
    },
    "roadmap": {
        "bg": (30, 20, 15),         # marrón noche
        "primary": (220, 160, 60),  # dorado
        "secondary": (180, 100, 50),# bronce
        "accent": (92, 245, 95),    # verde
        "detail": (50, 35, 25),
        "text": (245, 240, 230),
    },
    "proyecto": {
        "bg": (18, 22, 35),         # azul noche profundo
        "primary": (92, 160, 220),  # azul cobalto
        "secondary": (140, 200, 180),# jade suave
        "accent": (230, 180, 60),   # oro cálido
        "detail": (35, 42, 60),
        "text": (240, 242, 248),
    },
    "adr": {
        "bg": (22, 18, 38),         # índigo profundo
        "primary": (140, 100, 210), # púrpura medio
        "secondary": (100, 160, 220),# azul acero
        "accent": (230, 185, 65),   # oro decisión
        "detail": (45, 38, 65),
        "text": (242, 238, 250),
    },
    "riesgos": {
        "bg": (38, 15, 15),         # rojo oscuro profundo
        "primary": (210, 65, 50),   # rojo alerta
        "secondary": (220, 140, 45),# ámbar advertencia
        "accent": (240, 200, 60),   # amarillo señal
        "detail": (60, 30, 30),
        "text": (250, 240, 235),
    },
}


def draw_gradient_bg(draw, w, h, color_top, color_bottom):
    """Gradiente vertical suave."""
    for y in range(h):
        ratio = y / h
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * ratio)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * ratio)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * ratio)
        draw.line([(0, y), (w, y)], fill=(r, g, b))


def draw_diamond_band(draw, y_center, size, count, color, alpha=180):
    """Banda horizontal de rombos (patrón Bribri)."""
    spacing = WIDTH // count
    for i in range(count):
        cx = spacing // 2 + i * spacing
        points = [
            (cx, y_center - size),
            (cx + size, y_center),
            (cx, y_center + size),
            (cx - size, y_center),
        ]
        c = (*color, alpha) if len(color) == 3 else color
        draw.polygon(points, fill=c[:3], outline=None)


def draw_triangles_row(draw, y, height, count, color, inverted=False):
    """Fila de triángulos (patrón Cabécar)."""
    w = WIDTH // count
    for i in range(count):
        x0 = i * w
        if inverted:
            points = [(x0, y), (x0 + w, y), (x0 + w // 2, y + height)]
        else:
            points = [(x0 + w // 2, y), (x0 + w, y + height), (x0, y + height)]
        draw.polygon(points, fill=color)


def draw_zigzag_line(draw, y_start, amplitude, freq, color, thickness=3):
    """Línea zigzag horizontal."""
    points = []
    for x in range(0, WIDTH, 4):
        y = y_start + amplitude * math.sin(x * freq * math.pi / WIDTH)
        points.append((x, y))
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=color, width=thickness)


def draw_concentric_circles(draw, cx, cy, max_r, rings, color, gap=2):
    """Círculos concéntricos (espirales simplificadas)."""
    for i in range(rings):
        r = max_r - i * (max_r // rings)
        if r <= 0:
            break
        alpha = max(40, 200 - i * 25)
        c = tuple(min(255, v + i * 8) for v in color[:3])
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c, width=gap)


def draw_stepped_pyramid(draw, cx, cy, levels, base_w, level_h, color):
    """Pirámide escalonada (geometría mesoamericana)."""
    for i in range(levels):
        w = base_w - i * (base_w // levels)
        y = cy - i * level_h
        draw.rectangle([cx - w // 2, y - level_h, cx + w // 2, y], fill=color)
        # borde más claro
        lighter = tuple(min(255, v + 30) for v in color)
        draw.rectangle([cx - w // 2, y - level_h, cx + w // 2, y], outline=lighter, width=1)


def draw_wave_band(draw, y_start, amplitude, color, thickness=2, waves=6):
    """Ondas horizontales (agua, ríos)."""
    for offset in range(3):
        points = []
        y_base = y_start + offset * (amplitude + 5)
        for x in range(0, WIDTH + 10, 3):
            y = y_base + amplitude * math.sin(waves * 2 * math.pi * x / WIDTH + offset * 0.5)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i + 1]], fill=color, width=thickness)


def draw_sun_symbol(draw, cx, cy, radius, rays, color):
    """Sol con rayos (símbolo solar indígena)."""
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color)
    inner = tuple(max(0, v - 40) for v in color)
    draw.ellipse([cx - radius // 2, cy - radius // 2, cx + radius // 2, cy + radius // 2], fill=inner)
    for i in range(rays):
        angle = 2 * math.pi * i / rays
        x1 = cx + int(radius * 1.2 * math.cos(angle))
        y1 = cy + int(radius * 1.2 * math.sin(angle))
        x2 = cx + int(radius * 1.8 * math.cos(angle))
        y2 = cy + int(radius * 1.8 * math.sin(angle))
        draw.line([(x1, y1), (x2, y2)], fill=color, width=3)


def draw_mountain_range(draw, y_base, peaks, color, fill_color=None):
    """Montañas estilizadas (Cordillera de Talamanca)."""
    points = [(0, y_base)]
    seg_w = WIDTH // peaks
    for i in range(peaks):
        peak_x = seg_w // 2 + i * seg_w + random.randint(-20, 20)
        peak_y = y_base - random.randint(60, 140)
        valley_x = (i + 1) * seg_w
        points.append((peak_x, peak_y))
        points.append((valley_x, y_base - random.randint(0, 20)))
    points.append((WIDTH, y_base))
    points.append((WIDTH, y_base + 50))
    points.append((0, y_base + 50))
    if fill_color:
        draw.polygon(points, fill=fill_color)
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=color, width=2)


def draw_leaf_pattern(draw, cx, cy, size, color, angle=0):
    """Hoja estilizada."""
    cos_a = math.cos(angle)
    sin_a = math.sin(angle)
    points = []
    for t in range(0, 360, 10):
        rad = math.radians(t)
        # cardioid-like shape
        r = size * (1 + math.cos(rad)) * 0.5
        x = r * math.cos(rad)
        y = r * math.sin(rad) * 0.6
        # rotate
        rx = x * cos_a - y * sin_a + cx
        ry = x * sin_a + y * cos_a + cy
        points.append((rx, ry))
    if len(points) > 2:
        draw.polygon(points, fill=color)


def draw_border_pattern(draw, palette, style="diamonds"):
    """Bordes decorativos superiores e inferiores."""
    top_y = 15
    bot_y = HEIGHT - 15
    if style == "diamonds":
        draw_diamond_band(draw, top_y, 10, 60, palette["accent"])
        draw_diamond_band(draw, bot_y, 10, 60, palette["accent"])
        draw_diamond_band(draw, top_y + 25, 6, 90, palette["secondary"])
        draw_diamond_band(draw, bot_y - 25, 6, 90, palette["secondary"])
    elif style == "triangles":
        draw_triangles_row(draw, 0, 20, 40, palette["accent"])
        draw_triangles_row(draw, HEIGHT - 20, 20, 40, palette["accent"], inverted=True)
    elif style == "zigzag":
        draw_zigzag_line(draw, top_y, 8, 30, palette["accent"], 2)
        draw_zigzag_line(draw, top_y + 10, 6, 25, palette["secondary"], 2)
        draw_zigzag_line(draw, bot_y - 10, 6, 25, palette["secondary"], 2)
        draw_zigzag_line(draw, bot_y, 8, 30, palette["accent"], 2)
    elif style == "waves":
        draw_wave_band(draw, 5, 8, palette["accent"], 2, 8)
        draw_wave_band(draw, HEIGHT - 35, 8, palette["accent"], 2, 8)


def add_text_overlay(img, title, subtitle="Raíces Vivas", palette=None):
    """Agrega título y subtítulo al cover."""
    draw = ImageDraw.Draw(img)
    text_color = palette["text"] if palette else (240, 240, 240)
    accent = palette["accent"] if palette else (240, 200, 60)

    # Intentar usar fuente del sistema
    fonts_to_try = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    title_font = None
    sub_font = None
    for fpath in fonts_to_try:
        try:
            title_font = ImageFont.truetype(fpath, 52)
            sub_font = ImageFont.truetype(fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 26)
            break
        except (OSError, IOError):
            continue
    if not title_font:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # Sombra de texto
    shadow_offset = 3
    # Título centrado
    bbox = draw.textbbox((0, 0), title, font=title_font)
    tw = bbox[2] - bbox[0]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - 40

    # Sombra
    draw.text((tx + shadow_offset, ty + shadow_offset), title, font=title_font, fill=(0, 0, 0, 160))
    draw.text((tx, ty), title, font=title_font, fill=text_color)

    # Subtítulo
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw = bbox2[2] - bbox2[0]
    sx = (WIDTH - sw) // 2
    sy = ty + 65
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=(0, 0, 0, 120))
    draw.text((sx, sy), subtitle, font=sub_font, fill=accent)

    # Línea decorativa bajo título
    line_y = ty + 58
    line_w = max(tw, sw) + 40
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=accent, width=2)


# =====================================================
# GENERADORES DE COVERS POR TEMA
# =====================================================

def cover_dashboard(path):
    """Dashboard principal — geométrico moderno con accent verde."""
    p = PALETTES["dashboard"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (10, 15, 20))

    # Grid de puntos
    for x in range(0, WIDTH, 40):
        for y in range(0, HEIGHT, 40):
            alpha = random.randint(20, 60)
            draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(*p["detail"], alpha)[:3])

    # Hexágonos decorativos (tecnología + tradición)
    for _ in range(15):
        cx = random.randint(50, WIDTH - 50)
        cy = random.randint(50, HEIGHT - 50)
        r = random.randint(20, 50)
        sides = 6
        pts = [(cx + r * math.cos(2 * math.pi * i / sides - math.pi / 6),
                cy + r * math.sin(2 * math.pi * i / sides - math.pi / 6)) for i in range(sides)]
        c = random.choice([p["primary"], p["secondary"], p["accent"]])
        draw.polygon(pts, outline=c, fill=None)

    # Rombos grandes
    draw_diamond_band(draw, HEIGHT // 3, 25, 12, p["primary"])
    draw_diamond_band(draw, 2 * HEIGHT // 3, 20, 15, p["accent"])

    # Zigzag borders
    draw_border_pattern(draw, p, "zigzag")

    # Círculos concéntricos esquinas
    draw_concentric_circles(draw, 100, HEIGHT // 2, 80, 6, p["primary"], 2)
    draw_concentric_circles(draw, WIDTH - 100, HEIGHT // 2, 80, 6, p["secondary"], 2)

    add_text_overlay(img, "Raíces Vivas", "Sistema Integral · Dashboard", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_educacion(path):
    """Módulo Educación — hojas, naturaleza, verde selva."""
    p = PALETTES["educacion"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (15, 35, 30))

    # Hojas esparcidas
    for _ in range(30):
        cx = random.randint(0, WIDTH)
        cy = random.randint(0, HEIGHT)
        size = random.randint(15, 40)
        angle = random.uniform(0, 2 * math.pi)
        c = random.choice([p["primary"], p["secondary"], p["detail"]])
        draw_leaf_pattern(draw, cx, cy, size, c, angle)

    # Triángulos (pirámide de conocimiento)
    draw_triangles_row(draw, HEIGHT - 80, 40, 20, p["accent"])
    draw_triangles_row(draw, HEIGHT - 45, 25, 30, p["secondary"], True)

    # Sol (iluminación, conocimiento)
    draw_sun_symbol(draw, WIDTH - 200, 120, 35, 12, p["accent"])

    draw_border_pattern(draw, p, "diamonds")
    add_text_overlay(img, "Educación Indígena", "Módulo RV-1 · Preservación del Conocimiento", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_saberes(path):
    """Módulo Saberes Ancestrales — terracota, espirales, máscaras."""
    p = PALETTES["saberes"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (35, 18, 12))

    # Espirales (conocimiento ancestral)
    for _ in range(5):
        cx = random.randint(100, WIDTH - 100)
        cy = random.randint(80, HEIGHT - 80)
        draw_concentric_circles(draw, cx, cy, random.randint(30, 70), random.randint(4, 8),
                                random.choice([p["primary"], p["secondary"]]), 2)

    # Pirámides escalonadas
    draw_stepped_pyramid(draw, 200, HEIGHT - 60, 5, 160, 25, p["detail"])
    draw_stepped_pyramid(draw, WIDTH - 200, HEIGHT - 60, 5, 160, 25, p["detail"])

    # Rombos centrales
    draw_diamond_band(draw, HEIGHT // 2 - 60, 30, 8, p["accent"])
    draw_diamond_band(draw, HEIGHT // 2 + 60, 20, 12, p["secondary"])

    # Sol central
    draw_sun_symbol(draw, WIDTH // 2, 100, 28, 10, p["accent"])

    draw_border_pattern(draw, p, "triangles")
    add_text_overlay(img, "Saberes Ancestrales", "Módulo RV-2 · Cosmovisión y Tradición", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_salud(path):
    """Módulo Salud Comunitaria — azul, agua, montañas."""
    p = PALETTES["salud"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (12, 22, 40))

    # Montañas (Talamanca)
    random.seed(42)
    draw_mountain_range(draw, HEIGHT - 120, 7, p["detail"], (*p["detail"],))
    draw_mountain_range(draw, HEIGHT - 80, 9, p["secondary"], (*p["primary"],)[:3])

    # Ondas de agua
    draw_wave_band(draw, HEIGHT - 60, 12, p["secondary"], 2, 5)
    draw_wave_band(draw, HEIGHT - 30, 10, p["primary"], 2, 7)

    # Estrellas / puntos de luz
    for _ in range(50):
        x = random.randint(0, WIDTH)
        y = random.randint(20, HEIGHT // 2)
        r = random.randint(1, 3)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=p["accent"])

    # Sol/luna
    draw_sun_symbol(draw, 150, 100, 30, 8, p["accent"])

    draw_border_pattern(draw, p, "waves")
    add_text_overlay(img, "Salud Comunitaria", "Módulo RV-3 · Bienestar de los Pueblos", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_arquitectura(path):
    """Arquitectura — piedra, estructura, geometría precisa."""
    p = PALETTES["arquitectura"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (20, 20, 25))

    # Grid arquitectónico
    for x in range(0, WIDTH, 80):
        draw.line([(x, 0), (x, HEIGHT)], fill=p["detail"], width=1)
    for y in range(0, HEIGHT, 60):
        draw.line([(0, y), (WIDTH, y)], fill=p["detail"], width=1)

    # Pirámides escalonadas centrales
    draw_stepped_pyramid(draw, WIDTH // 2, HEIGHT - 50, 7, 300, 30, p["secondary"])

    # Rombos en la base
    draw_diamond_band(draw, HEIGHT - 30, 15, 20, p["accent"])

    # Círculos en las esquinas (tecnología)
    for pos in [(120, 120), (WIDTH - 120, 120), (120, HEIGHT - 120), (WIDTH - 120, HEIGHT - 120)]:
        draw_concentric_circles(draw, pos[0], pos[1], 50, 5, p["primary"], 2)

    draw_border_pattern(draw, p, "zigzag")
    add_text_overlay(img, "Arquitectura", "Diseño Técnico · Stack y Modelos", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_requerimientos(path):
    """Requerimientos — púrpura, rombos, estructura."""
    p = PALETTES["requerimientos"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (25, 15, 40))

    # Patrón de rombos en grid
    for row in range(8):
        y = 40 + row * 70
        offset = 35 if row % 2 else 0
        for col in range(28):
            x = offset + col * 70
            size = 25
            pts = [(x, y - size), (x + size, y), (x, y + size), (x - size, y)]
            c = p["primary"] if (row + col) % 3 == 0 else p["detail"]
            draw.polygon(pts, outline=c, fill=None)

    # Diamantes filled selectos
    draw_diamond_band(draw, HEIGHT // 2, 18, 16, p["accent"])

    # Zigzag decorativo
    draw_zigzag_line(draw, HEIGHT // 2 - 50, 12, 20, p["secondary"], 2)
    draw_zigzag_line(draw, HEIGHT // 2 + 50, 12, 20, p["secondary"], 2)

    draw_border_pattern(draw, p, "diamonds")
    add_text_overlay(img, "Requerimientos", "Funcionales y No Funcionales · MoSCoW", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_sprints(path):
    """Sprints — verde dinámico, flechas, movimiento."""
    p = PALETTES["sprints"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (10, 30, 25))

    # Flechas de progresión (izquierda a derecha)
    for i in range(8):
        x = 100 + i * 200
        y = HEIGHT // 2
        size = 40 - i * 3
        pts = [(x, y - size), (x + size * 2, y), (x, y + size)]
        c = p["primary"] if i % 2 == 0 else p["secondary"]
        draw.polygon(pts, fill=c)

    # Triángulos superiores
    draw_triangles_row(draw, 0, 30, 25, p["accent"])

    # Zigzag inferior
    draw_zigzag_line(draw, HEIGHT - 50, 15, 15, p["primary"], 3)
    draw_zigzag_line(draw, HEIGHT - 35, 10, 20, p["accent"], 2)

    # Círculos de sprint (milestones)
    for i in range(5):
        cx = 200 + i * 350
        cy = HEIGHT // 2 + 80
        r = 20
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=p["accent"], outline=p["primary"])

    draw_border_pattern(draw, p, "triangles")
    add_text_overlay(img, "Sprints", "Planificación y Ejecución Ágil", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_investigacion(path):
    """Investigación — tierra, exploración, espirales."""
    p = PALETTES["investigacion"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (30, 25, 18))

    # Espirales de conocimiento
    for _ in range(8):
        cx = random.randint(80, WIDTH - 80)
        cy = random.randint(60, HEIGHT - 60)
        draw_concentric_circles(draw, cx, cy, random.randint(25, 55), random.randint(3, 6),
                                random.choice([p["primary"], p["secondary"]]), 2)

    # Hojas
    for _ in range(15):
        cx = random.randint(0, WIDTH)
        cy = random.randint(0, HEIGHT)
        draw_leaf_pattern(draw, cx, cy, random.randint(12, 25),
                          random.choice([p["accent"], p["detail"]]),
                          random.uniform(0, math.pi))

    # Diamond borders
    draw_diamond_band(draw, 40, 12, 40, p["primary"])
    draw_diamond_band(draw, HEIGHT - 40, 12, 40, p["primary"])

    draw_border_pattern(draw, p, "zigzag")
    add_text_overlay(img, "Investigación", "Contexto Cultural · Pueblos Indígenas", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_metricas(path):
    """Métricas — data viz, gráficos abstractos."""
    p = PALETTES["metricas"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (8, 12, 22))

    # Barras de gráfico abstractas
    bar_w = 30
    for i in range(20):
        x = 80 + i * 90
        h = random.randint(60, 250)
        y = HEIGHT - 80 - h
        c = random.choice([p["primary"], p["secondary"], p["accent"]])
        draw.rectangle([x, y, x + bar_w, HEIGHT - 80], fill=c)

    # Línea de tendencia
    pts = []
    for x in range(0, WIDTH, 20):
        y = HEIGHT // 2 - 50 + int(50 * math.sin(x * 0.008) + random.randint(-10, 10))
        pts.append((x, y))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i + 1]], fill=p["primary"], width=3)

    # Puntos de datos
    for pt in pts[::3]:
        draw.ellipse([pt[0] - 4, pt[1] - 4, pt[0] + 4, pt[1] + 4], fill=p["accent"])

    # Grid sutil
    for x in range(0, WIDTH, 100):
        draw.line([(x, 0), (x, HEIGHT)], fill=(*p["detail"],)[:3], width=1)

    draw_border_pattern(draw, p, "diamonds")
    add_text_overlay(img, "Métricas", "Analytics · Burndown · Velocity", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_roadmap(path):
    """Roadmap — dorado, camino, progresión."""
    p = PALETTES["roadmap"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (20, 12, 8))

    # Camino serpenteante (timeline)
    pts = []
    for x in range(0, WIDTH, 5):
        y = HEIGHT // 2 + int(40 * math.sin(x * 0.006))
        pts.append((x, y))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i + 1]], fill=p["primary"], width=6)
    # Borde del camino
    for i in range(len(pts) - 1):
        draw.line([(pts[i][0], pts[i][1] - 15), (pts[i + 1][0], pts[i + 1][1] - 15)],
                  fill=p["secondary"], width=1)
        draw.line([(pts[i][0], pts[i][1] + 15), (pts[i + 1][0], pts[i + 1][1] + 15)],
                  fill=p["secondary"], width=1)

    # Milestones en el camino
    milestones = [200, 500, 800, 1100, 1400, 1700]
    for mx in milestones:
        idx = min(mx // 5, len(pts) - 1)
        my = pts[idx][1]
        draw.ellipse([mx - 12, my - 12, mx + 12, my + 12], fill=p["accent"], outline=p["primary"])

    # Estrellas arriba
    for _ in range(30):
        x = random.randint(0, WIDTH)
        y = random.randint(20, HEIGHT // 3)
        r = random.randint(1, 2)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=p["accent"])

    # Sol naciente
    draw_sun_symbol(draw, WIDTH - 150, 100, 25, 10, p["accent"])

    draw_border_pattern(draw, p, "diamonds")
    add_text_overlay(img, "Roadmap", "Avances · Milestones · Entregas", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_proyecto(path):
    """Gestión de Proyecto — estructura, engranajes, red conectada."""
    p = PALETTES["proyecto"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (10, 14, 25))

    # Red de conexiones (gestión, trazabilidad)
    nodes = [(random.randint(60, WIDTH - 60), random.randint(40, HEIGHT - 40)) for _ in range(25)]
    for i, n1 in enumerate(nodes):
        for n2 in nodes[i + 1:]:
            dist = math.sqrt((n1[0] - n2[0]) ** 2 + (n1[1] - n2[1]) ** 2)
            if dist < 280:
                draw.line([n1, n2], fill=(*p["detail"],)[:3], width=1)
    for nx, ny in nodes:
        r = random.randint(4, 9)
        c = random.choice([p["primary"], p["secondary"], p["accent"]])
        draw.ellipse([nx - r, ny - r, nx + r, ny + r], fill=c, outline=p["detail"])

    # Engranajes (mecanismo de gestión)
    for cx, cy, size in [(300, 150, 45), (WIDTH - 350, HEIGHT - 150, 55), (WIDTH // 2 - 200, HEIGHT - 100, 35)]:
        teeth = 8
        for i in range(teeth):
            angle = 2 * math.pi * i / teeth
            x1 = cx + (size - 8) * math.cos(angle)
            y1 = cy + (size - 8) * math.sin(angle)
            x2 = cx + (size + 8) * math.cos(angle)
            y2 = cy + (size + 8) * math.sin(angle)
            draw.line([(x1, y1), (x2, y2)], fill=p["primary"], width=4)
        draw_concentric_circles(draw, cx, cy, size, 4, p["primary"], 2)
        draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=p["accent"])

    # Hexágonos (estructura, organización)
    for _ in range(8):
        hx = random.randint(80, WIDTH - 80)
        hy = random.randint(60, HEIGHT - 60)
        hr = random.randint(18, 35)
        pts = [(hx + hr * math.cos(2 * math.pi * i / 6 - math.pi / 6),
                hy + hr * math.sin(2 * math.pi * i / 6 - math.pi / 6)) for i in range(6)]
        draw.polygon(pts, outline=random.choice([p["secondary"], p["accent"]]))

    # Rombos decorativos (estilo Bribri)
    draw_diamond_band(draw, 30, 18, 15, p["accent"])
    draw_diamond_band(draw, HEIGHT - 30, 18, 15, p["accent"])

    # Zigzag borders
    draw_border_pattern(draw, p, "zigzag")

    add_text_overlay(img, "Gestión de Proyecto", "Planificación · Equipo · Gobernanza", p)
    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_adr(path):
    """ADR — Decisiones arquitectónicas, balanza, documentos, gobernanza."""
    p = PALETTES["adr"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (12, 10, 25))

    # --- Fondo: red de nodos de decisión (grafo de dependencias) ---
    nodes = [(random.randint(40, WIDTH - 40), random.randint(30, HEIGHT - 30)) for _ in range(30)]
    for i, n1 in enumerate(nodes):
        for n2 in nodes[i + 1:]:
            dist = math.sqrt((n1[0] - n2[0]) ** 2 + (n1[1] - n2[1]) ** 2)
            if dist < 250:
                draw.line([n1, n2], fill=p["detail"], width=1)
    for nx, ny in nodes:
        r = random.randint(3, 7)
        c = random.choice([p["primary"], p["secondary"]])
        draw.ellipse([nx - r, ny - r, nx + r, ny + r], fill=c)

    # --- Balanza de decisión (centro simbólico) ---
    bcx, bcy = WIDTH // 2, HEIGHT // 2 - 10
    # Pilar central
    draw.line([(bcx, bcy - 80), (bcx, bcy + 90)], fill=p["accent"], width=4)
    # Brazo horizontal
    draw.line([(bcx - 180, bcy - 60), (bcx + 180, bcy - 60)], fill=p["accent"], width=3)
    # Platillos
    for side in (-1, 1):
        px = bcx + side * 180
        py = bcy - 60
        # Cadenas
        draw.line([(px, py), (px - 30, py + 50)], fill=p["secondary"], width=2)
        draw.line([(px, py), (px + 30, py + 50)], fill=p["secondary"], width=2)
        # Platillo (arco)
        draw.arc([px - 40, py + 40, px + 40, py + 70], 0, 180, fill=p["accent"], width=3)
    # Fulcro (triángulo)
    draw.polygon([(bcx - 12, bcy - 75), (bcx + 12, bcy - 75), (bcx, bcy - 95)], fill=p["accent"])

    # --- Pergaminos / documentos en ambos lados ---
    for sx in [150, WIDTH - 150]:
        sy = HEIGHT // 2 - 40
        rw, rh = 55, 80
        draw.rounded_rectangle([sx - rw, sy - rh, sx + rw, sy + rh],
                               radius=8, outline=p["secondary"], width=2)
        # Líneas de texto simuladas
        for li in range(6):
            ly = sy - rh + 20 + li * 12
            lw = rw - 10 - random.randint(0, 15)
            draw.line([(sx - rw + 12, ly), (sx - rw + 12 + lw * 1.5, ly)],
                      fill=(*p["secondary"], 120)[:3], width=1)

    # --- Sellos / estampas (autenticidad) en las esquinas ---
    for cx_s, cy_s in [(120, HEIGHT - 80), (WIDTH - 120, HEIGHT - 80)]:
        draw_concentric_circles(draw, cx_s, cy_s, 25, 4, p["accent"], 2)
        draw.ellipse([cx_s - 5, cy_s - 5, cx_s + 5, cy_s + 5], fill=p["accent"])

    # --- Hexágonos decorativos (gobernanza estructurada) ---
    for _ in range(6):
        hx = random.randint(60, WIDTH - 60)
        hy = random.randint(50, HEIGHT - 50)
        hr = random.randint(15, 28)
        pts = [(hx + hr * math.cos(2 * math.pi * i / 6 - math.pi / 6),
                hy + hr * math.sin(2 * math.pi * i / 6 - math.pi / 6)) for i in range(6)]
        draw.polygon(pts, outline=random.choice([p["primary"], p["secondary"]]))

    # --- Rombos Bribri (marco cultural) ---
    draw_diamond_band(draw, 25, 14, 18, p["accent"])
    draw_diamond_band(draw, HEIGHT - 25, 14, 18, p["accent"])

    # --- Bordes zigzag ---
    draw_border_pattern(draw, p, "zigzag")

    # --- Texto ADR grande centrado ---
    fonts_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    big_font = None
    sub_font = None
    for fpath in fonts_bold:
        try:
            big_font = ImageFont.truetype(fpath, 120)
            sub_font = ImageFont.truetype(
                fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 28)
            break
        except (OSError, IOError):
            continue
    if not big_font:
        big_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    text_color = p["text"]
    shadow = (0, 0, 0)

    # "ADR" grande
    label = "ADR"
    bbox = draw.textbbox((0, 0), label, font=big_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - th // 2 - 18
    # Resplandor detrás del texto
    for off in range(8, 0, -2):
        glow_alpha = 50 - off * 5
        glow_color = tuple(max(0, min(255, c + glow_alpha)) for c in p["primary"][:3])
        draw.text((tx - off, ty), label, font=big_font, fill=glow_color)
        draw.text((tx + off, ty), label, font=big_font, fill=glow_color)
        draw.text((tx, ty - off), label, font=big_font, fill=glow_color)
        draw.text((tx, ty + off), label, font=big_font, fill=glow_color)
    # Sombra
    draw.text((tx + 4, ty + 4), label, font=big_font, fill=shadow)
    # Texto principal
    draw.text((tx, ty), label, font=big_font, fill=text_color)

    # Línea decorativa bajo "ADR"
    line_y = ty + th + 10
    line_w = tw + 80
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=p["accent"], width=3)

    # Subtítulo
    subtitle = "Decisiones Arquitectónicas · Raíces Vivas"
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw = bbox2[2] - bbox2[0]
    sx = (WIDTH - sw) // 2
    sy = line_y + 12
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=shadow)
    draw.text((sx, sy), subtitle, font=sub_font, fill=p["accent"])

    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_riesgos(path):
    """Riesgos — señales de advertencia, escudo, relámpagos, triángulos alerta."""
    p = PALETTES["riesgos"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (25, 8, 8))

    # --- Grietas / fracturas (riesgo latente) ---
    for _ in range(12):
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        pts = [(x, y)]
        for _ in range(random.randint(4, 8)):
            x += random.randint(-40, 40)
            y += random.randint(-30, 30)
            pts.append((x, y))
        c = random.choice([p["detail"], (*p["primary"][:2], p["primary"][2] // 2)])
        for i in range(len(pts) - 1):
            draw.line([pts[i], pts[i + 1]], fill=c, width=1)

    # --- Triángulos de advertencia esparcidos ---
    for _ in range(10):
        cx = random.randint(60, WIDTH - 60)
        cy = random.randint(50, HEIGHT - 50)
        sz = random.randint(18, 35)
        tri = [(cx, cy - sz), (cx - sz, cy + sz // 2), (cx + sz, cy + sz // 2)]
        c = random.choice([p["secondary"], p["accent"]])
        draw.polygon(tri, outline=c, width=2)
        # Signo de exclamación dentro
        draw.line([(cx, cy - sz // 2 + 4), (cx, cy + sz // 4 - 2)], fill=c, width=2)
        draw.ellipse([cx - 2, cy + sz // 4 + 1, cx + 2, cy + sz // 4 + 5], fill=c)

    # --- Escudo protector central ---
    scx, scy = WIDTH // 2, HEIGHT // 2 - 10
    sw, sh = 90, 110
    shield_pts = [
        (scx, scy - sh),          # punta superior
        (scx + sw, scy - sh // 2), # hombro derecho
        (scx + sw, scy + sh // 4), # costado derecho
        (scx, scy + sh),           # punta inferior
        (scx - sw, scy + sh // 4), # costado izquierdo
        (scx - sw, scy - sh // 2), # hombro izquierdo
    ]
    draw.polygon(shield_pts, outline=p["accent"], width=3)
    # Cruz interior del escudo
    draw.line([(scx - sw + 15, scy), (scx + sw - 15, scy)], fill=p["secondary"], width=2)
    draw.line([(scx, scy - sh + 20), (scx, scy + sh - 20)], fill=p["secondary"], width=2)

    # --- Relámpagos (amenaza) ---
    for bx, by in [(250, 120), (WIDTH - 250, 120), (350, HEIGHT - 100), (WIDTH - 350, HEIGHT - 100)]:
        bolt = [
            (bx, by), (bx - 8, by + 25), (bx + 5, by + 22),
            (bx - 12, by + 50), (bx + 18, by + 20), (bx + 8, by + 24), (bx + 3, by)
        ]
        draw.polygon(bolt, fill=p["accent"])

    # --- Ondas de impacto (círculos parciales) ---
    for cx, cy in [(150, HEIGHT // 2), (WIDTH - 150, HEIGHT // 2)]:
        for r in range(20, 80, 15):
            draw.arc([cx - r, cy - r, cx + r, cy + r], 200, 340, fill=p["primary"], width=2)

    # --- Rombos Bribri (marco cultural) ---
    draw_diamond_band(draw, 22, 12, 20, p["accent"])
    draw_diamond_band(draw, HEIGHT - 22, 12, 20, p["accent"])

    # --- Bordes triangulares ---
    draw_border_pattern(draw, p, "triangles")

    # --- Texto RSK grande centrado ---
    fonts_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    big_font = None
    sub_font = None
    for fpath in fonts_bold:
        try:
            big_font = ImageFont.truetype(fpath, 120)
            sub_font = ImageFont.truetype(
                fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 28)
            break
        except (OSError, IOError):
            continue
    if not big_font:
        big_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    text_color = p["text"]
    shadow = (0, 0, 0)

    # "RSK" grande
    label = "RSK"
    bbox = draw.textbbox((0, 0), label, font=big_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - th // 2 - 18
    # Resplandor rojo detrás del texto
    for off in range(8, 0, -2):
        glow_color = tuple(max(0, min(255, c + 30 - off * 3)) for c in p["primary"][:3])
        draw.text((tx - off, ty), label, font=big_font, fill=glow_color)
        draw.text((tx + off, ty), label, font=big_font, fill=glow_color)
        draw.text((tx, ty - off), label, font=big_font, fill=glow_color)
        draw.text((tx, ty + off), label, font=big_font, fill=glow_color)
    # Sombra
    draw.text((tx + 4, ty + 4), label, font=big_font, fill=shadow)
    # Texto principal
    draw.text((tx, ty), label, font=big_font, fill=text_color)

    # Línea decorativa
    line_y = ty + th + 10
    line_w = tw + 80
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=p["accent"], width=3)

    # Subtítulo
    subtitle = "Gestión de Riesgos · Raíces Vivas"
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw2 = bbox2[2] - bbox2[0]
    sx = (WIDTH - sw2) // 2
    sy = line_y + 12
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=shadow)
    draw.text((sx, sy), subtitle, font=sub_font, fill=p["accent"])

    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_rf_edu(path):
    """RF Educación — hojas, sol, libros, texto Educación centrado."""
    p = PALETTES["educacion"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (15, 35, 30))

    # Hojas esparcidas (naturaleza, conocimiento vivo)
    for _ in range(25):
        cx = random.randint(0, WIDTH)
        cy = random.randint(0, HEIGHT)
        size = random.randint(12, 35)
        angle = random.uniform(0, 2 * math.pi)
        c = random.choice([p["primary"], p["secondary"], p["detail"]])
        draw_leaf_pattern(draw, cx, cy, size, c, angle)

    # Sol de conocimiento
    draw_sun_symbol(draw, WIDTH - 180, 100, 30, 10, p["accent"])
    draw_sun_symbol(draw, 180, HEIGHT - 100, 22, 8, p["accent"])

    # Libros estilizados (ambos lados)
    for bx in [200, WIDTH - 200]:
        by = HEIGHT // 2 - 20
        for i in range(5):
            c = random.choice([p["primary"], p["secondary"], p["detail"]])
            draw.rectangle([bx - 30, by - 50 + i * 12, bx + 30, by - 42 + i * 12], fill=c, outline=p["accent"])

    # Triángulos (pirámides de conocimiento)
    draw_triangles_row(draw, HEIGHT - 60, 30, 25, p["secondary"])
    draw_triangles_row(draw, 0, 25, 30, p["detail"], True)

    # Rombos Bribri
    draw_diamond_band(draw, 20, 12, 22, p["accent"])
    draw_diamond_band(draw, HEIGHT - 20, 12, 22, p["accent"])

    draw_border_pattern(draw, p, "diamonds")

    # --- Texto grande centrado ---
    fonts_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    big_font = sub_font = None
    for fpath in fonts_bold:
        try:
            big_font = ImageFont.truetype(fpath, 100)
            sub_font = ImageFont.truetype(
                fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 28)
            break
        except (OSError, IOError):
            continue
    if not big_font:
        big_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    label = "Educación"
    bbox = draw.textbbox((0, 0), label, font=big_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - th // 2 - 18
    for off in range(8, 0, -2):
        glow = tuple(max(0, min(255, c + 40 - off * 4)) for c in p["primary"][:3])
        draw.text((tx - off, ty), label, font=big_font, fill=glow)
        draw.text((tx + off, ty), label, font=big_font, fill=glow)
        draw.text((tx, ty - off), label, font=big_font, fill=glow)
        draw.text((tx, ty + off), label, font=big_font, fill=glow)
    draw.text((tx + 4, ty + 4), label, font=big_font, fill=(0, 0, 0))
    draw.text((tx, ty), label, font=big_font, fill=p["text"])

    line_y = ty + th + 10
    line_w = tw + 80
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=p["accent"], width=3)

    subtitle = "Requerimientos Funcionales · Módulo EDU"
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sx = (WIDTH - (bbox2[2] - bbox2[0])) // 2
    sy = line_y + 12
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=(0, 0, 0))
    draw.text((sx, sy), subtitle, font=sub_font, fill=p["accent"])

    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_rf_sab(path):
    """RF Saberes Ancestrales — espirales, terracota, fuego, texto centrado."""
    p = PALETTES["saberes"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (35, 18, 12))

    # Espirales concéntricos (sabiduría ancestral)
    for cx, cy in [(180, 150), (WIDTH - 180, HEIGHT - 150), (WIDTH // 4, HEIGHT - 100), (3 * WIDTH // 4, 100)]:
        draw_concentric_circles(draw, cx, cy, random.randint(35, 60), 5, p["primary"], 2)

    # Pirámides escalonadas (conocimiento acumulado)
    draw_stepped_pyramid(draw, 300, HEIGHT - 40, 5, 120, 18, p["detail"])
    draw_stepped_pyramid(draw, WIDTH - 300, HEIGHT - 40, 5, 120, 18, p["detail"])

    # Máscaras estilizadas (Boruca) — círculos + triángulos
    for mx, my in [(130, HEIGHT // 2), (WIDTH - 130, HEIGHT // 2)]:
        draw.ellipse([mx - 25, my - 30, mx + 25, my + 20], outline=p["secondary"], width=2)
        draw.polygon([(mx - 8, my - 10), (mx + 8, my - 10), (mx, my + 5)], fill=p["accent"])
        draw.ellipse([mx - 15, my - 18, mx - 7, my - 10], fill=p["secondary"])
        draw.ellipse([mx + 7, my - 18, mx + 15, my - 10], fill=p["secondary"])

    # Zigzag (patrones textiles)
    draw_zigzag_line(draw, HEIGHT // 4, 12, 20, p["secondary"], 2)
    draw_zigzag_line(draw, 3 * HEIGHT // 4, 12, 20, p["secondary"], 2)

    # Rombos
    draw_diamond_band(draw, 20, 14, 18, p["accent"])
    draw_diamond_band(draw, HEIGHT - 20, 14, 18, p["accent"])

    draw_border_pattern(draw, p, "zigzag")

    # --- Texto grande centrado ---
    fonts_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    big_font = sub_font = None
    for fpath in fonts_bold:
        try:
            big_font = ImageFont.truetype(fpath, 72)
            sub_font = ImageFont.truetype(
                fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 28)
            break
        except (OSError, IOError):
            continue
    if not big_font:
        big_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    label = "Saberes Ancestrales"
    bbox = draw.textbbox((0, 0), label, font=big_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - th // 2 - 18
    for off in range(8, 0, -2):
        glow = tuple(max(0, min(255, c + 40 - off * 4)) for c in p["primary"][:3])
        draw.text((tx - off, ty), label, font=big_font, fill=glow)
        draw.text((tx + off, ty), label, font=big_font, fill=glow)
        draw.text((tx, ty - off), label, font=big_font, fill=glow)
        draw.text((tx, ty + off), label, font=big_font, fill=glow)
    draw.text((tx + 4, ty + 4), label, font=big_font, fill=(0, 0, 0))
    draw.text((tx, ty), label, font=big_font, fill=p["text"])

    line_y = ty + th + 10
    line_w = tw + 80
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=p["accent"], width=3)

    subtitle = "Requerimientos Funcionales · Módulo SAB"
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sx = (WIDTH - (bbox2[2] - bbox2[0])) // 2
    sy = line_y + 12
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=(0, 0, 0))
    draw.text((sx, sy), subtitle, font=sub_font, fill=p["accent"])

    img.save(path, quality=92)
    print(f"  ✓ {path}")


def cover_rf_sal(path):
    """RF Salud — agua, ondas, turquesa, cruces, texto Salud centrado."""
    p = PALETTES["salud"]
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, WIDTH, HEIGHT, p["bg"], (12, 22, 38))

    # Ondas de agua (vida, salud)
    draw_wave_band(draw, HEIGHT // 4 - 20, 10, p["primary"], 2, 5)
    draw_wave_band(draw, 3 * HEIGHT // 4, 10, p["primary"], 2, 5)

    # Cruces de salud estilizadas
    for cx, cy in [(200, 130), (WIDTH - 200, 130), (250, HEIGHT - 110), (WIDTH - 250, HEIGHT - 110)]:
        cw, ch = 8, 22
        draw.rectangle([cx - cw, cy - ch, cx + cw, cy + ch], fill=p["secondary"])
        draw.rectangle([cx - ch, cy - cw, cx + ch, cy + cw], fill=p["secondary"])

    # Círculos concéntricos (energía vital)
    draw_concentric_circles(draw, 140, HEIGHT // 2, 50, 5, p["secondary"], 2)
    draw_concentric_circles(draw, WIDTH - 140, HEIGHT // 2, 50, 5, p["secondary"], 2)

    # Hojas medicinales
    for _ in range(15):
        lx = random.randint(0, WIDTH)
        ly = random.randint(0, HEIGHT)
        size = random.randint(10, 25)
        angle = random.uniform(0, 2 * math.pi)
        c = random.choice([p["primary"], p["secondary"], p["detail"]])
        draw_leaf_pattern(draw, lx, ly, size, c, angle)

    # Montañas (Talamanca — plantas medicinales)
    draw_mountain_range(draw, HEIGHT - 50, 8, p["detail"], p["detail"])

    # Rombos
    draw_diamond_band(draw, 20, 12, 22, p["accent"])
    draw_diamond_band(draw, HEIGHT - 20, 12, 22, p["accent"])

    draw_border_pattern(draw, p, "waves")

    # --- Texto grande centrado ---
    fonts_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf",
    ]
    big_font = sub_font = None
    for fpath in fonts_bold:
        try:
            big_font = ImageFont.truetype(fpath, 110)
            sub_font = ImageFont.truetype(
                fpath.replace("-Bold", "-Regular").replace("Bold", "Regular"), 28)
            break
        except (OSError, IOError):
            continue
    if not big_font:
        big_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    label = "Salud"
    bbox = draw.textbbox((0, 0), label, font=big_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = HEIGHT // 2 - th // 2 - 18
    for off in range(8, 0, -2):
        glow = tuple(max(0, min(255, c + 40 - off * 4)) for c in p["primary"][:3])
        draw.text((tx - off, ty), label, font=big_font, fill=glow)
        draw.text((tx + off, ty), label, font=big_font, fill=glow)
        draw.text((tx, ty - off), label, font=big_font, fill=glow)
        draw.text((tx, ty + off), label, font=big_font, fill=glow)
    draw.text((tx + 4, ty + 4), label, font=big_font, fill=(0, 0, 0))
    draw.text((tx, ty), label, font=big_font, fill=p["text"])

    line_y = ty + th + 10
    line_w = tw + 80
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, line_y), (line_x + line_w, line_y)], fill=p["accent"], width=3)

    subtitle = "Requerimientos Funcionales · Módulo SAL"
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sx = (WIDTH - (bbox2[2] - bbox2[0])) // 2
    sy = line_y + 12
    draw.text((sx + 2, sy + 2), subtitle, font=sub_font, fill=(0, 0, 0))
    draw.text((sx, sy), subtitle, font=sub_font, fill=p["accent"])

    img.save(path, quality=92)
    print(f"  ✓ {path}")


# =====================================================
# MAIN — Generar todos los covers
# =====================================================

if __name__ == "__main__":
    base = "/home/geovanny/Documents/RAICES_VIVAS/08-Recursos/Imágenes"

    random.seed(2026)  # reproducible

    covers = {
        "cover-dashboard.png": cover_dashboard,
        "cover-educacion.png": cover_educacion,
        "cover-saberes.png": cover_saberes,
        "cover-salud.png": cover_salud,
        "cover-arquitectura.png": cover_arquitectura,
        "cover-requerimientos.png": cover_requerimientos,
        "cover-sprints.png": cover_sprints,
        "cover-investigacion.png": cover_investigacion,
        "cover-metricas.png": cover_metricas,
        "cover-roadmap.png": cover_roadmap,
        "cover-proyecto.png": cover_proyecto,
        "cover-adr.png": cover_adr,
        "cover-riesgos.png": cover_riesgos,
        "cover-rf-edu.png": cover_rf_edu,
        "cover-rf-sab.png": cover_rf_sab,
        "cover-rf-sal.png": cover_rf_sal,
    }

    print(f"\n🎨 Generando {len(covers)} covers culturales...\n")
    for filename, generator in covers.items():
        path = f"{base}/{filename}"
        generator(path)

    print(f"\n✅ {len(covers)} covers generados en {base}/")
    print("   Dimensiones: 1920×600px | Formato: PNG")
    print("   Paleta: tonos tierra, selva, agua — inspiración indígena CR")
