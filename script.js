/* ==========================================================================
   Andu × Yukie — Chapter 198 · webtoon reader
   Reads config.js and builds the chapter. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  const C = window.CHAPTER;
  const root = document.documentElement;
  if (!C || !C.panels) { root.classList.add('no-anim'); return; }

  const $ = (s, r) => (r || document).querySelector(s);
  const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const store = {
    get(k) { try { return localStorage.getItem('c198:' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('c198:' + k, v); } catch (e) {} },
  };
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  if (params.has('clean')) root.classList.add('is-clean');       // hide all UI (the "hide the UI" test)
  if (params.has('guides')) root.classList.add('show-guides');   // outline every balloon box

  const SVGNS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function svg(tag, attrs) { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; }
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  const HEART = '<svg class="heart" viewBox="0 0 24 24" role="img" aria-label="heart"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  function setText(node, text) {
    const parts = String(text).split('♥');
    parts.forEach((p, i) => {
      if (p) node.appendChild(document.createTextNode(p));
      if (i < parts.length - 1) node.insertAdjacentHTML('beforeend', HEART);
    });
  }

  /* ───────────── opening + labels ───────────── */
  const M = C.meta || {};
  if (M.names) { $('#coverTitle').textContent = M.names; $('#barTitle').textContent = M.names + ' · ' + (M.chapter || '').replace(/\D+/g, ''); }
  if (M.chapter) $('#coverChapter').textContent = M.chapter;
  if (M.begin) $('#begin').textContent = M.begin;
  document.title = M.title || document.title;

  /* ───────────── speech balloons ───────────── */
  function balloonPath(b) {
    const t = b.kind === 'thought' ? null : b.tail;
    if (!t) return 'M0 50A50 50 0 1 1 100 50A50 50 0 1 1 0 50Z';
    const u = t.pos == null ? 0.5 : t.pos, side = t.side || 'bottom', len = t.len == null ? 0.32 : t.len, half = t.half || 0.19;
    let tc;
    if (side === 'bottom') tc = Math.PI / 2 + (0.5 - u) * Math.PI / 2;
    else if (side === 'top') tc = 1.5 * Math.PI + (u - 0.5) * Math.PI / 2;
    else if (side === 'left') tc = Math.PI + (0.5 - u) * Math.PI / 2;
    else tc = (u - 0.5) * Math.PI / 2;
    const P = a => [50 + 50 * Math.cos(a), 50 + 50 * Math.sin(a)];
    const p1 = P(tc - half), p2 = P(tc + half);
    const L = (side === 'left' || side === 'right') ? len * 46 : len * 100;
    const tip = t.tip || [50 + (50 + L) * Math.cos(tc), 50 + (50 + L) * Math.sin(tc)];
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], dl = Math.hypot(dx, dy) || 1, nx = dx / dl, ny = dy / dl;
    const c1 = [(p1[0] + tip[0]) / 2 + nx * 2.4, (p1[1] + tip[1]) / 2 + ny * 2.4];
    const c2 = [(p2[0] + tip[0]) / 2 - nx * 2.4, (p2[1] + tip[1]) / 2 - ny * 2.4];
    const f = p => p[0].toFixed(2) + ' ' + p[1].toFixed(2);
    return `M${f(p1)}Q${f(c1)} ${f(tip)}Q${f(c2)} ${f(p2)}A50 50 0 1 1 ${f(p1)}Z`;
  }
  function layer(cls, d) {
    const s = svg('svg', { class: cls, viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
    s.appendChild(svg('path', { d }));
    return s;
  }
  const DOTS = { r: [[104, 24, 1.7], [115, 10, 1.1]], l: [[-4, 24, 1.7], [-15, 10, 1.1]], br: [[92, 108, 1.7], [104, 124, 1.1]], bl: [[8, 108, 1.7], [-4, 124, 1.1]] };
  function makeBalloon(b) {
    const n = el('div', 'bl' + (b.kind === 'shaky' ? ' bl--shaky' : '') + (b.kind === 'thought' ? ' bl--thought' : '') + (b.big ? ' bl--big' : ''));
    n.style.setProperty('--x', b.x); n.style.setProperty('--y', b.y); n.style.setProperty('--w', b.w);
    if (b.who) n.dataset.who = b.who;
    const d = balloonPath(b);
    n.appendChild(layer('bl__ink', d));
    n.appendChild(layer('bl__fill', d));
    const t = el('span', 'bl__text');
    if (b.who) t.appendChild(el('span', 'sr-only', cap(b.who) + ': '));
    setText(t, b.text);
    n.appendChild(t);
    if (b.kind === 'thought') {
      (DOTS[b.dots || 'r'] || DOTS.r).forEach(([x, y, s]) => {
        const dot = el('span', 'bl__dot');
        dot.style.cssText = `left:${x}%;top:${y}%;width:${s}cqw;height:${s}cqw;transform:translate(-50%,-50%)`;
        dot.setAttribute('aria-hidden', 'true');
        n.appendChild(dot);
      });
    }
    return n;
  }
  function makeSfx(it) {
    const n = el('span', 'sfx sfx--' + (it.style || 'hand'));
    n.style.setProperty('--x', it.x); n.style.setProperty('--y', it.y);
    n.style.setProperty('--s', it.size || 8); n.style.setProperty('--rot', (it.rot || 0) + 'deg');
    n.textContent = it.text;
    return n;
  }
  function makeMark(it) {
    const n = el('span', 'mk mk--' + it.mark);
    n.style.setProperty('--x', it.x); n.style.setProperty('--y', it.y);
    n.style.setProperty('--s', it.size || 10); n.style.setProperty('--rot', (it.rot || 0) + 'deg');
    n.setAttribute('aria-hidden', 'true');
    if (it.mark === 'q') { n.textContent = '?'; return n; }
    const s = svg('svg', { viewBox: '0 0 100 100' });
    if (it.mark === 'burst') {
      const pts = []; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 - Math.PI / 2, r = i % 2 ? 26 : 48; pts.push((50 + r * Math.cos(a)).toFixed(1) + ',' + (50 + r * Math.sin(a)).toFixed(1)); }
      s.appendChild(svg('polygon', { points: pts.join(' ') }));
    } else {
      // tremble: short wavy strokes around a shaking subject
      [[8, 20, -30], [92, 20, 30], [4, 55, -8], [96, 55, 8], [10, 88, 20], [90, 88, -20]].forEach(([x, y, r]) => {
        s.appendChild(svg('path', { d: 'M-7 -9q5 4 0 9t0 9', transform: `translate(${x} ${y}) rotate(${r})` }));
      });
    }
    n.appendChild(s);
    return n;
  }
  function makeLettering(p) {
    const box = el('div', 'lt-layer'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Dialogue');
    const step = p.pace === 'slow' ? 1350 : 850;
    let d = p.delay == null ? 450 : p.delay;
    (p.lettering || []).forEach(it => {
      const wrap = el('div', 'lt');
      if (it.balloons) it.balloons.forEach(b => wrap.appendChild(makeBalloon(b)));
      else if (it.kind === 'sfx') wrap.appendChild(makeSfx(it));
      else if (it.kind === 'mark') wrap.appendChild(makeMark(it));
      else { wrap.appendChild(makeBalloon(it)); if (it.kind === 'shaky' || it.tremble) wrap.classList.add('lt--tremble'); }
      if (it.instant) wrap.style.setProperty('--d', '200ms');
      else { wrap.style.setProperty('--d', d + 'ms'); d += (it.wait == null ? step : it.wait); }
      box.appendChild(wrap);
    });
    return box;
  }

  /* ───────────── panels ───────────── */
  const reader = $('#reader');
  const GAPS = (C.layout && C.layout.gaps) || { none: 0, tight: 3.5, beat: 9, pause: 20, breath: 34 };
  const INSET = (C.layout && C.layout.insetWidth) || 66;
  const figs = [];

  function placeholder(p) {
    const ph = el('div', 'panel__ph');
    const inner = el('div'); inner.appendChild(el('b', '', p.id));
    inner.appendChild(document.createTextNode((p.shot || '') + (p.note ? ' — ' + p.note : '')));
    ph.appendChild(inner);
    return ph;
  }

  C.panels.forEach((p, i) => {
    const inset = p.width === 'inset';
    const fig = el('figure', 'panel' + (inset ? ' panel--inset' : '') + (p.frame === false ? '' : ' panel--framed') + (p.motion && p.motion.push ? ' panel--push' : '') + (inset && p.align === 'left' ? ' panel--left' : '') + (inset && p.align === 'right' ? ' panel--right' : ''));
    fig.dataset.id = p.id;
    if (p.pace) fig.dataset.pace = p.pace;
    if (p.music != null) fig.dataset.music = p.music;
    fig.style.setProperty('--gap', typeof p.gap === 'number' ? p.gap : (GAPS[p.gap] != null ? GAPS[p.gap] : GAPS.beat));
    fig.style.setProperty('--pw', inset ? INSET + '%' : '100%');

    const art = el('div', 'panel__art');
    art.style.setProperty('--ar', p.w + ' / ' + p.h);
    const cam = el('div', 'panel__cam');
    const img = new Image();
    img.className = 'panel__img'; img.width = p.w; img.height = p.h; img.alt = p.alt || ''; img.decoding = 'async';
    img.loading = i < 3 ? 'eager' : 'lazy';
    img.addEventListener('error', () => { img.remove(); cam.appendChild(placeholder(p)); });
    img.src = p.src;
    cam.appendChild(img); art.appendChild(cam); fig.appendChild(art);
    fig.appendChild(makeLettering(p));

    if (p.motion && p.motion.parallax && !REDUCED) { fig._cam = cam; fig.dataset.par = '1'; }
    figs.push(fig);
    reader.appendChild(fig);
  });

  const end = el('div', 'end');
  end.appendChild(el('p', '', M.end || 'End of chapter'));
  const again = el('button', '', M.readAgain || 'Read again'); again.type = 'button';
  end.appendChild(again);
  reader.appendChild(end);

  /* ───────────── reveal on scroll ───────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    figs.forEach(f => io.observe(f)); io.observe(end);
  } else { figs.forEach(f => f.classList.add('is-in')); end.classList.add('is-in'); }

  /* ───────────── scroll loop: progress bar, top bar, parallax, music level ───────────── */
  const bar = $('#bar'), progress = $('#progress'), menu = $('#menu');
  const vis = new Set();
  if ('IntersectionObserver' in window) {
    const ioVis = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); request(); }, { rootMargin: '12% 0px' });
    figs.forEach(f => ioVis.observe(f));
  }
  let ticking = false, lastY = 0, lastCur = null;
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  function tick() {
    ticking = false;
    const vh = window.innerHeight, y = window.scrollY;
    if (!document.body.classList.contains('is-gated')) {
      if (menu.hidden && y > 90 && y > lastY + 5) bar.classList.add('is-hidden');
      else if (y < lastY - 5 || y <= 90) bar.classList.remove('is-hidden');
    }
    lastY = y;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ')';

    let best = null, bestD = 1e9;
    vis.forEach(f => {
      const r = f.getBoundingClientRect();
      const mid = r.top + r.height / 2, dist = Math.abs(mid - vh / 2);
      if (dist < bestD) { bestD = dist; best = f; }
      if (f._cam) {
        const c = Math.max(-1, Math.min(1, (mid - vh / 2) / (vh / 2 + r.height / 2)));
        f._cam.style.transform = 'translate3d(0,' + (c * -2.1).toFixed(2) + '%,0) scale(1.05)';
      }
    });
    if (best && best !== lastCur) { lastCur = best; Music.setLevel(best.dataset.music != null ? parseFloat(best.dataset.music) : 1); }
  }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);

  /* ───────────── background music: constant loop ───────────── */
  const Music = (function () {
    const cfg = C.audio && C.audio.music;
    const btn = $('#music');
    let a = null, enabled = true, playing = false, wasPlaying = false, level = 1, raf = 0, armed = false;
    const target = () => (cfg && cfg.volume != null ? cfg.volume : 0.6) * level;

    function ui() { if (btn) btn.setAttribute('aria-pressed', String(playing)); }
    function ramp(to, ms) {
      if (!a) return; cancelAnimationFrame(raf);
      const from = a.volume, t0 = performance.now();
      a.volume = from;
      if (Math.abs(a.volume - from) > 0.001) return;             // iOS: volume is fixed; nothing to ramp
      (function step(now) {
        const k = Math.min(1, (now - t0) / Math.max(1, ms));
        try { a.volume = Math.max(0, Math.min(1, from + (to - from) * k)); } catch (e) {}
        if (k < 1) raf = requestAnimationFrame(step);
      })(t0);
    }
    function init() {
      if (!cfg || !cfg.src || a) return !!a;
      a = new Audio(cfg.src); a.loop = true; a.preload = 'auto'; a.volume = 0;
      a.addEventListener('ended', () => { a.currentTime = 0; if (enabled) a.play().catch(() => {}); });   // belt and braces for `loop`
      a.addEventListener('error', () => { if (btn) btn.hidden = true; a = null; });
      if (btn) btn.hidden = false;
      return true;
    }
    function play() {
      if (!a) return;
      a.play().then(() => { playing = true; ramp(target(), cfg.fadeInMs || 2500); ui(); })
        .catch(() => { playing = false; ui(); arm(); });        // autoplay blocked: retry on the next tap
    }
    function arm() {
      if (armed) return; armed = true;
      const go = () => { armed = false; removeEventListener('pointerdown', go); removeEventListener('keydown', go); if (enabled && !playing) play(); };
      addEventListener('pointerdown', go, { once: true }); addEventListener('keydown', go, { once: true });
    }
    function start() {                                            // called from the Begin tap (a user gesture)
      if (!init()) return;
      enabled = store.get('music') !== 'off';
      if (enabled) play(); else ui();
    }
    function toggle() {
      if (!init()) return;
      if (playing) { enabled = false; store.set('music', 'off'); a.pause(); playing = false; ui(); }
      else { enabled = true; store.set('music', 'on'); play(); }
    }
    function setLevel(l) { level = l; if (a && playing) ramp(target(), 1400); }
    document.addEventListener('visibilitychange', () => {
      if (!a) return;
      if (document.hidden) { wasPlaying = playing; if (playing) { a.pause(); playing = false; ui(); } }
      else if (enabled && wasPlaying) { wasPlaying = false; play(); }
    });
    if (btn) btn.addEventListener('click', toggle);
    return { start, toggle, setLevel, isPlaying: () => playing };
  })();

  /* ───────────── menu ───────────── */
  const menuBtn = $('#menuBtn'), nightBtn = $('#nightBtn');
  function setMenu(open) { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); if (open) bar.classList.remove('is-hidden'); }
  menuBtn.addEventListener('click', e => { e.stopPropagation(); setMenu(menu.hidden); });
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  function setTheme(t) { root.setAttribute('data-theme', t); nightBtn.setAttribute('aria-checked', String(t === 'night')); store.set('theme', t); }
  nightBtn.setAttribute('aria-checked', String(root.getAttribute('data-theme') === 'night'));
  nightBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'night' ? 'light' : 'night'));
  const STEPS = [0.9, 1, 1.15, 1.3, 1.5];
  function ltStep(dir) {
    const cur = parseFloat(getComputedStyle(root).getPropertyValue('--lt')) || 1;
    let i = STEPS.findIndex(v => Math.abs(v - cur) < 0.01); if (i < 0) i = 1;
    i = Math.max(0, Math.min(STEPS.length - 1, i + dir));
    root.style.setProperty('--lt', STEPS[i]); store.set('lt', STEPS[i]);
  }
  $('#ltDown').addEventListener('click', () => ltStep(-1));
  $('#ltUp').addEventListener('click', () => ltStep(1));
  function readAgain() { setMenu(false); window.scrollTo(0, 0); }
  $('#againBtn').addEventListener('click', readAgain);
  again.addEventListener('click', readAgain);

  /* ───────────── begin ───────────── */
  const cover = $('#cover'), beginBtn = $('#begin');
  function begin() {
    Music.start();
    root.classList.remove('is-gated'); document.body.classList.remove('is-gated');
    window.scrollTo(0, 0);
    cover.classList.add('is-leaving');
    setTimeout(() => { cover.hidden = true; }, 800);
    reader.tabIndex = -1; try { reader.focus({ preventScroll: true }); } catch (e) {}
    request();
  }
  beginBtn.addEventListener('click', begin);
  if (params.has('begin')) begin();

  window.__reader = { panels: figs, Music };
  request();
})();
