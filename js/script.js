/* -----------------------------
   Portfolio — script.js
   - Hamburger toggle (mobile)
   - Smooth scrolling for anchors
   - Active nav link on scroll
   - Split section reveal (IntersectionObserver)
   - Fade-in reveal
   - Back-to-top
   - Lightbox
   ----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Hamburger Toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('tabindex', '0');

    const toggleNav = () => {
      const open = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNav(); }
    });

    // Close on outside click / Escape
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close after picking a link
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scroll for internal anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Active nav highlight ---------- */
  const navAnchorLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = navAnchorLinks
    .map(l => { try { return document.querySelector(l.getAttribute('href')); } catch (_) { return null; } })
    .filter(Boolean);

  if (sections.length) {
    const updateActive = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      let idx = -1;
      sections.forEach((sec, i) => { if (sec.offsetTop <= pos) idx = i; });
      navAnchorLinks.forEach((link, i) => link.classList.toggle('active', i === idx));
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  /* ---------- Reveal animations (split + fade-in) ---------- */
  const revealEls = document.querySelectorAll('.split, .fade-in');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view', 'show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view', 'show'));
  }

  /* ---------- Back to Top ---------- */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    backBtn.setAttribute('aria-label', 'Back to top');
    const onScroll = () => {
      if (window.scrollY > 420) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Screen Stage — wheel + drag horizontal scroll ---------- */
  document.querySelectorAll('.screen-stage__track').forEach(track => {
    // Convert vertical mouse-wheel to horizontal scroll.
    track.addEventListener('wheel', (e) => {
      // Only intercept when vertical intent dominates (mouse wheel),
      // leave native trackpad horizontal gestures alone.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    }, { passive: false });

    // Click-and-drag with mouse — only activates once the pointer moves past
    // a small threshold, so plain clicks on screenshots still fire normally.
    const DRAG_THRESHOLD = 6;
    let down = false, dragging = false, startX = 0, startScroll = 0, activePointer = null;

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true;
      dragging = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      activePointer = e.pointerId;
    });

    track.addEventListener('pointermove', (e) => {
      if (!down || e.pointerId !== activePointer) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > DRAG_THRESHOLD) {
        dragging = true;
        track.style.cursor = 'grabbing';
        track.setPointerCapture(e.pointerId);
      }
      if (dragging) {
        e.preventDefault();
        track.scrollLeft = startScroll - dx;
      }
    });

    const endDrag = (e) => {
      if (!down) return;
      down = false;
      track.style.cursor = '';
      if (dragging) {
        try { track.releasePointerCapture(activePointer); } catch (_) {}
        // Swallow the trailing click that would otherwise fire after a drag.
        track.addEventListener('click', (ev) => ev.stopPropagation(), { capture: true, once: true });
      }
      dragging = false;
      activePointer = null;
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // Keyboard arrow keys when focused.
    track.addEventListener('keydown', (e) => {
      const step = track.clientWidth * 0.6;
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left:  step, behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); track.scrollBy({ left: -step, behavior: 'smooth' }); }
    });
  });

  /* ---------- Screen Lightbox (project pages) ---------- */
  (function initScreenLightbox() {
    const stages = document.querySelectorAll('.screen-stage');
    if (!stages.length) return;

    // Build the lightbox DOM once.
    const lb = document.createElement('div');
    lb.className = 'screen-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Screenshot viewer');
    lb.setAttribute('hidden', '');
    lb.innerHTML = `
      <div class="screen-lightbox__backdrop" data-close></div>
      <button class="screen-lightbox__close" type="button" aria-label="Close viewer" data-close>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="screen-lightbox__nav screen-lightbox__nav--prev" type="button" aria-label="Previous screenshot" data-dir="-1">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M14 4l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="screen-lightbox__nav screen-lightbox__nav--next" type="button" aria-label="Next screenshot" data-dir="1">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M8 4l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <figure class="screen-lightbox__stage">
        <div class="screen-lightbox__imgwrap" tabindex="0">
          <img class="screen-lightbox__img" src="" alt="" draggable="false">
        </div>
        <figcaption class="screen-lightbox__caption">
          <span class="screen-lightbox__counter"></span>
          <span class="screen-lightbox__label"></span>
          <span class="screen-lightbox__zoom">
            <button type="button" class="screen-lightbox__zoom-out"  aria-label="Zoom out">−</button>
            <span class="screen-lightbox__zoom-level">100%</span>
            <button type="button" class="screen-lightbox__zoom-in"   aria-label="Zoom in">+</button>
            <button type="button" class="screen-lightbox__zoom-reset" aria-label="Reset zoom">⤾</button>
          </span>
        </figcaption>
      </figure>
    `;
    document.body.appendChild(lb);

    const wrapEl    = lb.querySelector('.screen-lightbox__imgwrap');
    const imgEl     = lb.querySelector('.screen-lightbox__img');
    const counterEl = lb.querySelector('.screen-lightbox__counter');
    const labelEl   = lb.querySelector('.screen-lightbox__label');
    const zoomLvlEl = lb.querySelector('.screen-lightbox__zoom-level');
    const zoomInBtn = lb.querySelector('.screen-lightbox__zoom-in');
    const zoomOutBtn= lb.querySelector('.screen-lightbox__zoom-out');
    const zoomRstBtn= lb.querySelector('.screen-lightbox__zoom-reset');

    /* ---------- Zoom + Pan state ---------- */
    const MIN_ZOOM = 1, MAX_ZOOM = 5;
    let scale = 1, tx = 0, ty = 0;

    function applyTransform() {
      imgEl.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      zoomLvlEl.textContent = `${Math.round(scale * 100)}%`;
      const zoomed = scale > 1.001;
      wrapEl.classList.toggle('is-zoomed', zoomed);
      zoomOutBtn.disabled  = scale <= MIN_ZOOM + 0.001;
      zoomInBtn.disabled   = scale >= MAX_ZOOM - 0.001;
      zoomRstBtn.disabled  = !zoomed;
    }

    function clampPan() {
      // Keep image within wrapper bounds
      const wr = wrapEl.getBoundingClientRect();
      const iw = imgEl.naturalWidth || imgEl.offsetWidth;
      const ih = imgEl.naturalHeight || imgEl.offsetHeight;
      if (!iw || !ih) return;
      const baseW = imgEl.offsetWidth;
      const baseH = imgEl.offsetHeight;
      const scaledW = baseW * scale;
      const scaledH = baseH * scale;
      const maxX = Math.max(0, (scaledW - wr.width)  / 2);
      const maxY = Math.max(0, (scaledH - wr.height) / 2);
      tx = Math.max(-maxX, Math.min(maxX, tx));
      ty = Math.max(-maxY, Math.min(maxY, ty));
    }

    function resetTransform() {
      scale = 1; tx = 0; ty = 0;
      applyTransform();
      imgEl.style.transformOrigin = '0 0';
      // Center via flexbox alignment (transform-origin from top-left, but
      // since we use translate, simply zero-out and the flex centers it).
    }

    function zoomTo(target, cx, cy) {
      const old = scale;
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, target));
      if (next === old) return;
      // Zoom towards (cx, cy) relative to the wrapper center.
      const wr = wrapEl.getBoundingClientRect();
      const px = (cx ?? wr.left + wr.width / 2) - wr.left - wr.width / 2;
      const py = (cy ?? wr.top + wr.height / 2) - wr.top - wr.height / 2;
      // Pre-zoom offset that keeps (px, py) under the cursor
      tx = (tx - px) * (next / old) + px;
      ty = (ty - py) * (next / old) + py;
      scale = next;
      clampPan();
      applyTransform();
    }

    /* ---------- Wire up zoom buttons ---------- */
    zoomInBtn.addEventListener('click',  (e) => { e.stopPropagation(); zoomTo(scale + 0.5); });
    zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(scale - 0.5); });
    zoomRstBtn.addEventListener('click', (e) => { e.stopPropagation(); resetTransform(); });

    /* ---------- Wheel zoom ---------- */
    wrapEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.002;
      const target = scale * (1 + delta * 2);
      zoomTo(target, e.clientX, e.clientY);
    }, { passive: false });

    /* ---------- Click toggle zoom (only for single-pointer, no drag) ---------- */
    let clickStart = null;
    wrapEl.addEventListener('pointerdown', (e) => { clickStart = { x: e.clientX, y: e.clientY }; });

    /* ---------- Drag-to-pan + pinch-to-zoom ---------- */
    const pointers = new Map();
    let lastPinchDist = 0, lastTx = 0, lastTy = 0, panFrom = null;

    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
    function mid (a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }

    wrapEl.addEventListener('pointerdown', (e) => {
      wrapEl.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1 && scale > 1) {
        panFrom = { x: e.clientX, y: e.clientY };
        lastTx = tx; lastTy = ty;
        wrapEl.classList.add('is-panning');
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        lastPinchDist = dist(a, b);
        wrapEl.classList.add('is-pinching');
      }
    });

    wrapEl.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = dist(a, b);
        const m = mid(a, b);
        const ratio = d / (lastPinchDist || d);
        zoomTo(scale * ratio, m.x, m.y);
        lastPinchDist = d;
      } else if (pointers.size === 1 && panFrom && scale > 1) {
        tx = lastTx + (e.clientX - panFrom.x);
        ty = lastTy + (e.clientY - panFrom.y);
        clampPan();
        applyTransform();
      }
    });

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) {
        wrapEl.classList.remove('is-pinching');
        lastPinchDist = 0;
      }
      if (pointers.size === 0) {
        wrapEl.classList.remove('is-panning');
        // Detect tap (no movement) → toggle click-to-zoom
        if (clickStart) {
          const dx = e.clientX - clickStart.x;
          const dy = e.clientY - clickStart.y;
          if (Math.hypot(dx, dy) < 6) {
            if (scale > 1.01) resetTransform();
            else zoomTo(2.4, e.clientX, e.clientY);
          }
        }
        clickStart = null;
        panFrom = null;
      }
    }
    wrapEl.addEventListener('pointerup', endPointer);
    wrapEl.addEventListener('pointercancel', endPointer);

    /* ---------- Double-tap on touch to toggle zoom ---------- */
    let lastTap = 0;
    wrapEl.addEventListener('pointerup', (e) => {
      if (e.pointerType !== 'touch') return;
      const now = Date.now();
      if (now - lastTap < 300) {
        if (scale > 1.01) resetTransform();
        else zoomTo(2.4, e.clientX, e.clientY);
      }
      lastTap = now;
    });

    let frames = [];
    let index  = 0;
    let originRect = null;
    let lastFocused = null;

    const pad2 = (n) => String(n).padStart(2, '0');

    function setSlide(i) {
      index = (i + frames.length) % frames.length;
      const f = frames[index];
      imgEl.src = f.src;
      imgEl.alt = f.alt;
      counterEl.textContent = `${pad2(index + 1)} / ${pad2(frames.length)}`;
      labelEl.textContent = f.caption || '';
      // Always start a slide at 1:1 zoom, centered.
      resetTransform();
    }

    function open(fromImg) {
      const stage = fromImg.closest('.screen-stage');
      const isWeb = stage.classList.contains('screen-stage--web');
      lb.classList.toggle('screen-lightbox--web', isWeb);
      frames = [...stage.querySelectorAll('.screen-frame img')].map((el) => ({
        src: el.src,
        alt: el.alt,
        caption: el.closest('.screen-frame').querySelector('figcaption')?.textContent.trim() || '',
      }));
      index = [...stage.querySelectorAll('.screen-frame img')].indexOf(fromImg);
      if (index < 0) index = 0;

      originRect = fromImg.getBoundingClientRect();
      lastFocused = document.activeElement;
      setSlide(index);

      lb.hidden = false;
      void lb.offsetWidth;
      lb.classList.add('is-open');

      document.body.style.overflow = 'hidden';
      lb.querySelector('.screen-lightbox__close').focus({ preventScroll: true });
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      // Wait for fade-out before hiding.
      setTimeout(() => {
        lb.hidden = true;
        imgEl.src = '';
        if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
      }, 260);
    }

    // Wire up frame clicks.
    stages.forEach(stage => {
      stage.querySelectorAll('.screen-frame').forEach(frame => {
        frame.style.cursor = 'zoom-in';
        const img = frame.querySelector('img');
        if (!img) return;
        const trigger = () => open(img);
        img.addEventListener('click', (e) => { e.stopPropagation(); trigger(); });
        frame.setAttribute('tabindex', '0');
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', `Open ${img.alt || 'screenshot'} fullscreen`);
        frame.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
        });
      });
    });

    // Lightbox controls.
    lb.addEventListener('click', (e) => {
      const closeTarget = e.target.closest('[data-close]');
      if (closeTarget) { close(); return; }
      const navBtn = e.target.closest('[data-dir]');
      if (navBtn) setSlide(index + parseInt(navBtn.dataset.dir, 10));
    });

    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape')                 { close(); return; }
      if (e.key === 'ArrowRight')             { setSlide(index + 1); return; }
      if (e.key === 'ArrowLeft')              { setSlide(index - 1); return; }
      if (e.key === '+' || e.key === '=')     { zoomTo(scale + 0.5); return; }
      if (e.key === '-' || e.key === '_')     { zoomTo(scale - 0.5); return; }
      if (e.key === '0')                      { resetTransform(); return; }
    });

    // Touch swipe to navigate slides — only when NOT zoomed (so pan still works).
    let touchStartX = 0, touchStartY = 0;
    lb.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (scale > 1.01) return;            // ignore while zoomed (panning takes priority)
      if (e.touches.length > 0) return;     // multi-touch (pinch) — ignore
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        setSlide(index + (dx < 0 ? 1 : -1));
      }
    });
  })();

  /* ---------- Lightbox ---------- */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.getElementById('close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery img').forEach(img => {
      // Skip images wrapped in links (those navigate elsewhere)
      if (img.closest('a')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
    });
  }
});
