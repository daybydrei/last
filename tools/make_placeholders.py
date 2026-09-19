#!/usr/bin/env python3
"""Generates storyboard placeholder panels (assets/panels/panel-XX.webp) from config.js.

They are NOT artwork: flat tinted frames with rough blocking dummies, a shot label and a note,
at the exact pixel size of the real panel. Overwrite any file with your real art (same name).

Usage (from the project root):   python3 tools/make_placeholders.py
"""
import json, subprocess, textwrap, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cfg = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'tools', 'dump-config.js')], cwd=ROOT))

FONT_B = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_R = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(p, s): return ImageFont.truetype(p, max(8, int(s)))

CAMPUS = ((242, 196, 158), (233, 160, 118))     # golden-hour tint
CAFE   = ((214, 202, 188), (188, 172, 154))
INK    = (58, 43, 39)
DUMMY  = {'andu': (108, 122, 146), 'yukie': (156, 122, 106)}

# blocking: rough composition guides in fractions of the panel (x, y), r = head radius in fractions of width
def F(who, cx, cy, r, body=True, face='f', hair=False): return dict(k='fig', who=who, cx=cx, cy=cy, r=r, body=body, face=face, hair=hair)
def E(cx, cy, rx, ry, who='yukie'): return dict(k='ell', cx=cx, cy=cy, rx=rx, ry=ry, who=who)
def R(x0, y0, x1, y1, who='yukie'): return dict(k='rect', x0=x0, y0=y0, x1=x1, y1=y1, who=who)

BLOCK = {
 '01': [F('andu', .50, .34, .11)],
 '02': [F('yukie', .50, .36, .20, hair=True)],
 '03': [F('andu', .27, .50, .085), F('yukie', .74, .40, .10, face='b', hair=True)],
 '04': [F('andu', .27, .56, .11, face='r'), F('yukie', .70, .58, .10, face='l', hair=True)],
 '05': [F('andu', .28, .46, .17, face='b'), F('yukie', .70, .50, .13, hair=True), E(.56, .52, .07, .05, 'andu')],
 '06': [F('andu', .50, .55, .32, body=False), R(.74, .78, 1.0, 1.0)],
 '07': [F('yukie', .52, .40, .27, hair=True), E(.72, .54, .09, .07, 'andu')],
 '08': [F('yukie', .27, .55, .24, face='b', hair=True), F('andu', .68, .58, .15)],
 '09': [F('yukie', .46, .52, .30, hair=True)],
 '10': [F('andu', .45, .58, .20)],
 '11': [F('yukie', .50, .16, .09, hair=True), R(.30, .70, .70, .86), R(.36, .86, .48, 1.0), R(.52, .86, .64, 1.0)],
 '12': [F('yukie', .50, .55, .31, hair=True)],
 '13': [F('andu', .40, .45, .26, body=False, face='r'), E(.52, .66, .10, .07, 'andu')],
 '14': [E(.30, .50, .14, .07), E(.68, .50, .14, .07)],
 '15': [F('andu', .42, .55, .16), R(.86, .10, 1.0, .95)],
 '16': [F('yukie', .50, .28, .12, hair=True), E(.50, .78, .12, .06)],
 '17': [F('andu', .32, .52, .14, face='r'), E(.74, .42, .05, .05, 'yukie'), E(.86, .42, .05, .05, 'yukie')],
 '18': [F('yukie', .50, .36, .14, hair=True), E(.50, .58, .16, .06, 'yukie')],
 '19': [F('andu', .50, .42, .13), E(.50, .82, .14, .06, 'andu')],
 '20': [E(.42, .55, .30, .28, 'andu'), R(.64, .30, 1.0, .58)],
 '21': [F('andu', .27, .62, .15, face='r'), F('yukie', .64, .40, .13, face='l', hair=True), R(.0, .82, 1.0, .84), E(.70, .92, .07, .04, 'andu')],
}

def draw_fig(d, W, H, f):
    col = DUMMY[f['who']]; cx, cy, r = f['cx']*W, f['cy']*H, f['r']*W
    rx, ry = r, r*1.15
    if f['hair']:
        d.rounded_rectangle([cx-rx*1.35, cy-ry*1.15, cx+rx*1.35, min(H, cy+ry*3.2)], radius=int(rx*.7), fill=col+(150,))
    if f['body']:
        d.rounded_rectangle([cx-rx*1.9, cy+ry*.9, cx+rx*1.9, H+40], radius=int(rx*.8), fill=col+(190,))
    d.ellipse([cx-rx, cy-ry, cx+rx, cy+ry], fill=tuple(min(255, c+22) for c in col)+(235,), outline=INK+(120,), width=3)
    tip = {'r': (1, 0), 'l': (-1, 0)}.get(f['face'])
    if tip: d.polygon([(cx+tip[0]*rx, cy-ry*.05), (cx+tip[0]*(rx+r*.28), cy+ry*.12), (cx+tip[0]*rx, cy+ry*.28)], fill=INK+(150,))
    if f['face'] == 'b': d.arc([cx-rx*.6, cy-ry*.6, cx+rx*.6, cy+ry*.6], 200, 340, fill=INK+(110,), width=3)
    lab = f['who'].upper() + ({'b': ' (BACK)', 'r': ' →', 'l': ' ←'}.get(f['face'], ''))
    fnt = font(FONT_B, max(14, W*.028)); tw = d.textlength(lab, font=fnt)
    d.text((cx-tw/2, cy-fnt.size/2), lab, font=fnt, fill=(255, 255, 255, 235))

def make(p):
    W, H = p['w'], p['h']
    scene = CAFE if int(p['id']) >= 9 else CAMPUS
    base = Image.new('RGB', (W, H)); px = base.load()
    for y in range(H):
        t = y/(H-1); c = tuple(int(scene[0][i]*(1-t)+scene[1][i]*t) for i in range(3))
        for x in range(0, W): px[x, y] = c
    img = base.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for s in BLOCK.get(p['id'], []):
        if s['k'] == 'fig': draw_fig(d, W, H, s)
        elif s['k'] == 'ell': d.ellipse([(s['cx']-s['rx'])*W, (s['cy']-s['ry'])*H, (s['cx']+s['rx'])*W, (s['cy']+s['ry'])*H], fill=DUMMY[s['who']]+(170,), outline=INK+(110,), width=3)
        elif s['k'] == 'rect': d.rounded_rectangle([s['x0']*W, s['y0']*H, s['x1']*W, s['y1']*H], radius=int(W*.02), fill=DUMMY[s['who']]+(150,))
    # info plate (sized to its content so it never overflows short panels)
    u = min(W, H*1.1); pw = int(W*.58); pad = u*.02
    nf_s, sf_s, tf_s, num_s = u*.0185, u*.02, u*.0155, u*.075
    sf, nf, tf, nb = font(FONT_B, sf_s), font(FONT_R, nf_s), font(FONT_B, tf_s), font(FONT_B, num_s)
    def wrap(txt, f, maxw):
        words, lines, cur = txt.split(), [], ''
        for w_ in words:
            t = (cur+' '+w_).strip()
            if d.textlength(t, font=f) <= maxw: cur = t
            else: lines.append(cur); cur = w_
        return lines+[cur] if cur else lines
    shot_l = wrap(p['shot'], sf, pw-2*pad); note_l = wrap(p['note'], nf, pw-2*pad)[:5]
    ph = int(pad + num_s*1.2 + len(shot_l)*sf_s*1.35 + u*.008 + len(note_l)*nf_s*1.35 + pad*.6 + tf_s*1.4 + pad*.6)
    px0 = int(W*.04); py0 = int(H*.5 - ph/2) if H > 900 else int(H - ph - H*.03)
    d.rounded_rectangle([px0, py0, px0+pw, py0+ph], radius=int(W*.012), fill=(255, 255, 255, 208))
    x = px0 + pad; y = py0 + pad*.5
    d.text((x, y), p['id'], font=nb, fill=INK+(255,)); y += num_s*1.2
    for ln in shot_l: d.text((x, y), ln, font=sf, fill=INK+(255,)); y += sf_s*1.35
    y += u*.008
    for ln in note_l: d.text((x, y), ln, font=nf, fill=INK+(230,)); y += nf_s*1.35
    y += pad*.6
    d.text((x, y), f"PLACEHOLDER · {p['w']}×{p['h']} · replace with panel-{p['id']}.webp", font=tf, fill=(140, 90, 60, 255))
    out = Image.alpha_composite(img, ov).convert('RGB')
    path = os.path.join(ROOT, p['src']); os.makedirs(os.path.dirname(path), exist_ok=True)
    out.save(path, 'WEBP', quality=82, method=6)
    return path

if __name__ == '__main__':
    only = set(sys.argv[1:])
    for p in cfg['panels']:
        if only and p['id'] not in only: continue
        f = make(p); print(os.path.relpath(f, ROOT), os.path.getsize(f)//1024, 'KB')
