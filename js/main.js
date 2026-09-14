/* ==========================================================================
   BAKUFRAMED — interaksiyalar
   ========================================================================== */
(function () {
  'use strict';

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad2 = (n) => String(n).padStart(2, '0');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let vh = window.innerHeight;
  let vw = window.innerWidth;

  /* ======================================================================
     1. MARKUP GENERASİYASI
     ====================================================================== */

  // --- hero kartları + adlar
  const stageTrack = $('#stageTrack');
  const heroNames = $('#heroNames');

  PRODUCTS.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img class="card__img" src="${p.image}" alt="${p.name.join(' ')} çərçivə" />`;
    stageTrack.appendChild(card);

    const name = document.createElement('div');
    name.className = 'hero__name';
    name.innerHTML = `<em>${p.kicker}</em>${p.name[0]}<br>${p.name[1]}`;
    heroNames.appendChild(name);
  });

  const cards = $$('.card', stageTrack);
  const names = $$('.hero__name', heroNames);

  // --- məhsul səhnələri
  const scenesWrap = $('#scenes');
  PRODUCTS.forEach((p, i) => {
    const sec = document.createElement('section');
    sec.className = 'scene';
    sec.style.setProperty('--sc-accent', p.accent);
    sec.style.setProperty('--sc-glow', p.glow);
    sec.innerHTML = `
      <div class="scene__sticky">
        <div class="scene__bg"></div>
        <div class="scene__rays"></div>
        <span class="scene__index">${pad2(i + 1)}</span>
        <div class="scene__statement">${p.statement[0]}<br>${p.statement[1]}</div>
        <div class="scene__product"><img src="${p.image}" alt="${p.name.join(' ')} çərçivə" /></div>
        <div class="scene__panel">
          <p class="scene__kicker">${p.kicker}</p>
          <h2 class="scene__name">${p.name[0]} ${p.name[1]}</h2>
          <p class="scene__text">${p.text}</p>
          <dl class="scene__specs">
            ${p.specs.map((s) => `<div><dt>${s[0]}</dt><dd>${s[1]}</dd></div>`).join('')}
          </dl>
        </div>
      </div>`;
    scenesWrap.appendChild(sec);
  });

  const scenes = $$('.scene', scenesWrap).map((el) => ({
    el,
    product: $('.scene__product', el),
    statement: $('.scene__statement', el)
  }));

  // --- kolleksiya
  const row = $('#collectionRow');
  PRODUCTS.forEach((p, i) => {
    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.setAttribute('data-reveal', '');
    tile.style.transitionDelay = i * 90 + 'ms';
    tile.style.setProperty('--t-accent', p.accent);
    tile.style.setProperty('--t-glow', p.glow);
    tile.innerHTML = `
      <div class="tile__media"><img src="${p.image}" alt="${p.name.join(' ')} çərçivə" loading="lazy" /></div>
      <div class="tile__foot">
        <div>
          <p class="tile__kicker">${p.kicker}</p>
          <h3 class="tile__name">${p.name[0]}<br>${p.name[1]}</h3>
        </div>
        <span class="tile__dot"></span>
      </div>`;
    row.appendChild(tile);
  });

  // --- üstünlüklər
  const bList = $('#benefitsList');
  BENEFITS.forEach((b) => {
    const item = document.createElement('div');
    item.className = 'bnf';
    item.innerHTML = `
      <div class="bnf__left">
        <span class="bnf__old"><span class="bnf__x">×</span>${b.old}</span>
        <h3 class="bnf__title">${b.title[0]}<br>${b.title[1]}</h3>
      </div>
      <p class="bnf__text">${b.text}</p>`;
    bList.appendChild(item);
  });

  // --- FAQ
  const faqList = $('#faqList');
  FAQ.forEach((item) => {
    const qa = document.createElement('div');
    qa.className = 'qa';
    qa.innerHTML = `
      <button class="qa__btn" type="button" aria-expanded="false">
        <span>${item.q}</span><span class="qa__sign" aria-hidden="true"></span>
      </button>
      <div class="qa__panel"><div class="qa__inner"><p>${item.a}</p></div></div>`;
    faqList.appendChild(qa);
  });

  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.qa__btn');
    if (!btn) return;
    const qa = btn.parentElement;
    const open = qa.classList.contains('is-open');
    $$('.qa', faqList).forEach((el) => {
      el.classList.remove('is-open');
      $('.qa__btn', el).setAttribute('aria-expanded', 'false');
    });
    if (!open) {
      qa.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  /* ======================================================================
     2. PRELOADER
     ====================================================================== */
  const preloader = $('#preloader');
  const preNum = $('#preloaderNum');
  const preMask = $('#preloaderMask');
  const hdr = $('#hdr');

  function preloadImages() {
    const urls = ['assets/brand/logo.png', ...PRODUCTS.map((p) => p.image)];
    return Promise.all(
      urls.map(
        (u) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = img.onerror = res;
            img.src = u;
          })
      )
    );
  }

  function runPreloader() {
    const start = performance.now();
    const minDuration = reduced ? 300 : 2200;
    let assetsReady = false;
    preloadImages().then(() => { assetsReady = true; });

    function tick(now) {
      const t = (now - start) / minDuration;
      // sonuncu 8% assetlər hazır olana qədər gözləyir
      const target = assetsReady ? 1 : 0.92;
      const value = clamp(Math.min(t, target), 0, 1);
      const pct = Math.round(value * 100);
      preNum.textContent = pct;
      preMask.style.clipPath = `inset(${100 - pct}% 0 0 0)`;

      if (pct >= 100) {
        setTimeout(finish, 420);
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function finish() {
    preloader.classList.add('is-done');
    hdr.classList.add('is-ready');
    document.body.classList.remove('is-locked');
    setTimeout(() => preloader.remove(), 1000);
  }

  document.body.classList.add('is-locked');
  runPreloader();

  /* ======================================================================
     3. MENYU
     ====================================================================== */
  const menu = $('#menu');
  const menuToggle = $('#menuToggle');
  const menuLabel = $('.hdr__menu-label', menuToggle);

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'BAĞLA' : 'MENYU';
    document.body.classList.toggle('is-menu-open', open);
  }
  menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));

  $$('[data-menu-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = $(a.getAttribute('href'));
      setMenu(false);
      if (target) {
        setTimeout(() => {
          window.scrollTo({ top: target.offsetTop, behavior: reduced ? 'auto' : 'smooth' });
        }, 420);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ======================================================================
     4. AMBİANS SƏSİ
     ====================================================================== */
  const soundToggle = $('#soundToggle');
  const soundLabel = $('#soundLabel');
  let audioCtx = null;
  let ambientGain = null;

  function buildAmbient() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const seconds = 4;
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * seconds, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02; // qırmızı-şümal (brown noise)
      data[i] = last * 3.2;
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;

    ambientGain = audioCtx.createGain();
    ambientGain.gain.value = 0;

    src.connect(filter).connect(ambientGain).connect(audioCtx.destination);
    src.start();
  }

  soundToggle.addEventListener('click', () => {
    const on = soundToggle.getAttribute('aria-pressed') === 'true';
    if (!audioCtx) buildAmbient();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const next = !on;
    soundToggle.setAttribute('aria-pressed', String(next));
    soundLabel.textContent = next ? 'ON' : 'OFF';
    ambientGain.gain.cancelScheduledValues(audioCtx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(next ? 0.06 : 0, audioCtx.currentTime + 0.8);
  });

  /* ======================================================================
     5. REVEAL / IN-VIEW
     ====================================================================== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          if (en.target.hasAttribute('data-reveal')) io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  $$('[data-reveal]').forEach((el) => io.observe(el));
  $$('.bnf').forEach((el, i) => {
    el.style.transitionDelay = i * 80 + 'ms';
    io.observe(el);
  });

  const sceneIO = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.target.classList.toggle('is-in', en.isIntersecting)),
    { threshold: 0.05 }
  );
  scenes.forEach((s) => sceneIO.observe(s.el));

  /* ======================================================================
     6. SCROLL-DRIVEN ANİMASİYALAR
     ====================================================================== */
  const hero = $('#hero');
  const stageGlow = $('#stageGlow');
  const sliderThumb = $('#sliderThumb');
  const scrollbarFill = $('#scrollbarFill');

  let smooth = window.scrollY;
  let activeIndex = -1;

  function metrics() {
    vh = window.innerHeight;
    vw = window.innerWidth;
  }
  metrics();
  window.addEventListener('resize', metrics);

  function setActive(i) {
    if (i === activeIndex) return;
    activeIndex = i;
    names.forEach((n, k) => n.classList.toggle('is-active', k === i));
    const p = PRODUCTS[i];
    stageGlow.style.background = `radial-gradient(circle, ${p.glow} 0%, transparent 62%)`;
    document.documentElement.style.setProperty('--accent', p.accent);
  }

  function render(now) {
    const y = window.scrollY;
    smooth = reduced ? y : lerp(smooth, y, 0.11);
    const t = now / 1000;

    // üst progress bar
    const max = document.documentElement.scrollHeight - vh;
    scrollbarFill.style.width = clamp(y / max, 0, 1) * 100 + '%';

    /* --- hero karusel --- */
    const heroTop = hero.offsetTop;
    const heroRange = hero.offsetHeight - vh;
    const p = clamp((smooth - heroTop) / heroRange, 0, 1);
    const n = cards.length;
    const pos = p * (n - 1);

    const gapX = vw < 720 ? vw * 1.02 : vw * 0.3;
    cards.forEach((card, i) => {
      const d = i - pos;
      const ad = Math.abs(d);
      const x = d * gapX;
      const z = -ad * (vw < 720 ? 280 : 460);
      const rotY = clamp(-d * 24, -60, 60);
      const float = reduced ? 0 : Math.sin(t * 0.8 + i * 1.4) * 10;
      const tilt = reduced ? 0 : Math.sin(t * 0.5 + i) * 1.6;
      const opacity = clamp(1 - ad / 2.4, 0, 1);
      card.style.transform =
        `translate(-50%, -50%) translate3d(${x}px, ${float}px, ${z}px) rotateY(${rotY}deg) rotateZ(${tilt}deg)`;
      card.style.opacity = opacity;
      card.style.zIndex = String(100 - Math.round(ad * 10));
    });

    setActive(clamp(Math.round(pos), 0, n - 1));
    sliderThumb.style.left = p * 100 + '%';

    /* --- məhsul səhnələri --- */
    scenes.forEach((s) => {
      const rect = s.el.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const range = s.el.offsetHeight - vh;
      const sp = clamp((smooth - s.el.offsetTop) / range, 0, 1);
      const centered = sp - 0.5;
      const narrow = vw < 720;
      const drift = reduced ? 0 : Math.sin(t * 0.7) * (narrow ? 4 : 8);
      const shift = narrow ? -44 : -130;
      s.product.style.transform =
        `translate3d(0, ${centered * shift + drift}px, 0) scale(${1 + (0.5 - Math.abs(centered)) * 0.08})`;
      s.statement.style.transform = `translate3d(0, ${centered * (narrow ? 50 : 110)}px, 0)`;
    });

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  /* ======================================================================
     7. NEWSLETTER
     ====================================================================== */
  const form = $('#newsForm');
  const email = $('#newsEmail');
  const status = $('#newsStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
    status.classList.toggle('is-error', !valid);
    if (!valid) {
      status.textContent = 'Qeydiyyatınızı təsdiqləyə bilmədik. E-poçtu yoxlayın.';
      return;
    }
    status.textContent = 'Qeydiyyatınız təsdiqləndi. Xoş gəldiniz!';
    form.reset();
  });
})();
