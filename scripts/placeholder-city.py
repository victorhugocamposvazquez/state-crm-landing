"""
Genera imágenes de RELLENO para la ciudad 2.5D (public/city/*.jpg|png) hasta que existan las definitivas.
No intentan ser bonitas: sirven para probar el mecanismo (parallax, encendido por zonas, tarjetas).

Sustitúyelas por:
  base.jpg   fotografía nocturna B/N de una ciudad (IA o real), 2048x1152
  lit.jpg    la MISMA imagen con las ventanas del edificio protagonista encendidas
  depth.png  mapa de profundidad de base.jpg (blanco = cerca, negro = lejos)
y actualiza los anclajes (u, v) de cada anuncio en src/lib/script.ts → cityPhoto.anchors.
"""
from PIL import Image, ImageDraw, ImageFilter
import random, os

W, H = 2048, 1152
random.seed(7)
out = os.path.join(os.path.dirname(__file__), "..", "public", "city")
os.makedirs(out, exist_ok=True)

base = Image.new("L", (W, H), 10)
lit = Image.new("L", (W, H), 10)
depth = Image.new("L", (W, H), 0)
db, dl, dd = ImageDraw.Draw(base), ImageDraw.Draw(lit), ImageDraw.Draw(depth)

# cielo con bruma en el horizonte
for y in range(0, int(H * 0.42)):
    t = y / (H * 0.42)
    v = int(10 + 14 * (t ** 2.2))
    db.line([(0, y), (W, y)], fill=v)
    dl.line([(0, y), (W, y)], fill=v)

# capas de edificios, del fondo al frente
layers = [
    (0.42, 0.55, 0.012, 0.09, 30, 0.06, 22),   # (horizonte, altura max, ancho min, ancho max, gris, prob ventana, profundidad)
    (0.47, 0.40, 0.02, 0.11, 24, 0.09, 70),
    (0.55, 0.36, 0.03, 0.14, 18, 0.11, 130),
    (0.68, 0.30, 0.05, 0.18, 14, 0.12, 200),
]
hero = None
for li, (hz, hmax, wmin, wmax, grey, pwin, dep) in enumerate(layers):
    x = -random.randint(0, 80)
    while x < W:
        w = int(W * random.uniform(wmin, wmax))
        h = int(H * random.uniform(0.08, hmax))
        y0 = int(H * hz) - h
        y1 = int(H * hz) + int(H * 0.5)
        for d, col in ((db, grey), (dl, grey)):
            d.rectangle([x, y0, x + w, y1], fill=col)
        dd.rectangle([x, y0, x + w, y1], fill=dep)
        # ventanas
        cw, ch = 14, 18
        for wy in range(y0 + 10, int(H * hz) + int(H * 0.08), ch):
            for wx in range(x + 8, x + w - 8, cw):
                if random.random() < pwin:
                    v = random.randint(70, 190)
                    db.rectangle([wx, wy, wx + 6, wy + 8], fill=v)
                    dl.rectangle([wx, wy, wx + 6, wy + 8], fill=v)
        # el protagonista: una torre media de la tercera capa, hacia el centro-derecha
        if li == 2 and hero is None and x > W * 0.52 and w > W * 0.06:
            hero = (x, y0, w, int(H * hz) - y0)
            for wy in range(y0 + 10, int(H * hz), ch):
                for wx in range(x + 8, x + w - 8, cw):
                    dl.rectangle([wx, wy, wx + 6, wy + 8], fill=random.randint(200, 255))
        x += w + random.randint(6, 60)

base = base.filter(ImageFilter.GaussianBlur(0.6))
lit = lit.filter(ImageFilter.GaussianBlur(0.6))
depth = depth.filter(ImageFilter.GaussianBlur(3))

base.convert("RGB").save(os.path.join(out, "base.jpg"), quality=86)
lit.convert("RGB").save(os.path.join(out, "lit.jpg"), quality=86)
depth.save(os.path.join(out, "depth.png"))

if hero:
    x, y0, w, h = hero
    print("hero anchor u,v =", round((x + w / 2) / W, 3), round((y0 + 10) / H, 3))
print("ok", out)
