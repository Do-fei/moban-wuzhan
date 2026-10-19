from pathlib import Path
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'icons'
OUT.mkdir(parents=True, exist_ok=True)
FONT_CANDIDATES = [
    '/System/Library/Fonts/STHeiti Medium.ttc',
    '/System/Library/Fonts/STHeiti Light.ttc',
    '/System/Library/Fonts/PingFang.ttc',
    '/System/Library/Fonts/Supplemental/Songti.ttc',
]

def font(size):
    for p in FONT_CANDIDATES:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def background(size):
    yy, xx = np.mgrid[0:size, 0:size]
    cx, cy = size*0.62, size*0.25
    dist = np.clip(np.sqrt((xx-cx)**2 + (yy-cy)**2) / (size*0.78), 0, 1)
    inner = np.array([33, 47, 41], dtype=float)
    outer = np.array([7, 11, 9], dtype=float)
    arr = inner[None,None,:] * (1-dist[...,None]) + outer[None,None,:] * dist[...,None]
    rng = np.random.default_rng(13)
    arr += rng.normal(0, 2.2, arr.shape)
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGB').convert('RGBA')

def draw_foreground(size):
    s = size / 512
    fg = Image.new('RGBA', (size, size), (0,0,0,0))
    d = ImageDraw.Draw(fg, 'RGBA')

    # Sign post and board at left.
    sx = int(size*.185)
    d.rectangle((sx, int(size*.54), sx+int(10*s), int(size*.94)), fill=(12, 18, 14, 255))
    board = (sx-int(72*s), int(size*.34), sx+int(116*s), int(size*.535))
    d.rounded_rectangle(board, radius=int(7*s), fill=(24, 39, 32, 255), outline=(109, 129, 115, 255), width=max(2,int(3*s)))
    inset = (board[0]+int(13*s), board[1]+int(12*s), board[2]-int(13*s), board[3]-int(12*s))
    d.rectangle(inset, outline=(174, 160, 123, 90), width=max(1,int(2*s)))
    f1 = font(int(142*s))
    d.text(((board[0]+board[2])//2, board[1]+int(20*s)), '末', font=f1, fill=(221, 208, 166, 255), anchor='ma')

    # Bus at right.
    x, y, w, h = int(size*.51), int(size*.51), int(size*.35), int(size*.23)
    d.rounded_rectangle((x, y, x+w, y+h), radius=int(28*s), fill=(17, 27, 22, 255), outline=(88, 107, 95, 255), width=max(2,int(3*s)))
    d.rounded_rectangle((x+int(22*s), y+int(22*s), x+w-int(24*s), y+int(72*s)), radius=int(6*s), fill=(72, 58, 34, 255))
    for i in range(3):
        x0 = x+int((28+i*43)*s)
        d.rounded_rectangle((x0, y+int(28*s), x0+int(33*s), y+int(65*s)), radius=int(3*s), fill=(208, 192, 140, 36))
    d.ellipse((x+int(18*s), y+h-int(28*s), x+int(56*s), y+h+int(10*s)), fill=(4, 7, 6, 255), outline=(55, 70, 61, 255), width=max(2,int(2*s)))
    d.ellipse((x+w-int(58*s), y+h-int(28*s), x+w-int(20*s), y+h+int(10*s)), fill=(4, 7, 6, 255), outline=(55, 70, 61, 255), width=max(2,int(2*s)))
    d.rounded_rectangle((x+w-int(90*s), y+h-int(70*s), x+w-int(46*s), y+h-int(48*s)), radius=int(4*s), fill=(150, 60, 48, 230))
    d.ellipse((x+w-int(18*s), y+int(72*s), x+w-int(7*s), y+int(84*s)), fill=(219, 203, 149, 140))

    # Red thread.
    pts = [(int(size*.62), int(size*.73)), (int(size*.58), int(size*.82)), (int(size*.66), int(size*.88)), (int(size*.64), int(size*.945))]
    d.line(pts, fill=(149, 58, 47, 210), width=max(2,int(3*s)), joint='curve')
    d.ellipse((int(size*.633), int(size*.937), int(size*.652), int(size*.956)), fill=(172, 72, 57, 230))
    return fg

def draw_scenery(img):
    size = img.size[0]
    s = size / 512
    d = ImageDraw.Draw(img, 'RGBA')
    # Moon and fog glow.
    glow = Image.new('RGBA', (size, size), (0,0,0,0))
    gd = ImageDraw.Draw(glow)
    cx, cy, r = int(size*.69), int(size*.23), int(size*.17)
    gd.ellipse((cx-r, cy-r, cx+r, cy+r), fill=(222, 207, 156, 56))
    glow = glow.filter(ImageFilter.GaussianBlur(max(2, size//26)))
    img.alpha_composite(glow)
    d.ellipse((cx-int(r*.42), cy-int(r*.42), cx+int(r*.42), cy+int(r*.42)), fill=(216, 206, 174, 40))
    # Mist bands.
    for y, alpha in [(0.50, 7), (0.58, 5)]:
        d.rounded_rectangle((int(size*.05), int(size*y), int(size*.95), int(size*(y+.018))), radius=int(8*s), fill=(179, 196, 181, alpha))
    # Ground and skyline.
    d.rectangle((0, int(size*.80), size, size), fill=(6, 10, 8, 255))
    d.polygon([(0, int(size*.80)), (int(size*.12), int(size*.72)), (int(size*.24), int(size*.78)),
               (int(size*.38), int(size*.71)), (int(size*.52), int(size*.79)), (int(size*.68), int(size*.72)),
               (int(size*.83), int(size*.78)), (size, int(size*.72)), (size, int(size*.80))], fill=(8, 13, 10, 255))
    d.line((int(size*.05), int(size*.805), int(size*.95), int(size*.805)), fill=(143, 159, 141, 38), width=max(1,int(2*s)))

def make_icon(size, maskable=False):
    img = background(size)
    draw_scenery(img)
    fg = draw_foreground(size)
    if maskable:
        inset = int(size * .10)
        inner = fg.resize((size - inset*2, size - inset*2), Image.Resampling.LANCZOS)
        img.alpha_composite(inner, (inset, inset))
    else:
        img.alpha_composite(fg)
    d = ImageDraw.Draw(img, 'RGBA')
    random.seed(7)
    for _ in range(size*5):
        xx, yy = random.randrange(size), random.randrange(size)
        a = random.randrange(8, 30)
        d.point((xx, yy), fill=(225, 215, 183, a))
    return img.convert('RGB')

for size in (192, 512):
    make_icon(size).save(OUT / f'icon-{size}.png', optimize=True)
make_icon(512, maskable=True).save(OUT / 'maskable-512.png', optimize=True)
make_icon(180).save(OUT / 'apple-touch-icon.png', optimize=True)
print('icons generated')
