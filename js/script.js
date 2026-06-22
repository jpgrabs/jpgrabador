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
        <img class="screen-lightbox__img" src="" alt="">
        <figcaption class="screen-lightbox__caption">
          <span class="screen-lightbox__counter"></span>
          <span class="screen-lightbox__label"></span>
        </figcaption>
      </figure>
    `;
    document.body.appendChild(lb);

    const imgEl     = lb.querySelector('.screen-lightbox__img');
    const counterEl = lb.querySelector('.screen-lightbox__counter');
    const labelEl   = lb.querySelector('.screen-lightbox__label');

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
      // Force reflow so transition runs.
      void lb.offsetWidth;
      lb.classList.add('is-open');

      // Pop-from-origin: position img where the source was, then animate to center.
      const stageImg = lb.querySelector('.screen-lightbox__img');
      const targetW = Math.min(window.innerWidth * 0.5, 420);
      const scale  = originRect.width / targetW;
      stageImg.style.transformOrigin = 'center center';
      stageImg.style.transform = `translate(${originRect.left + originRect.width/2 - window.innerWidth/2}px, ${originRect.top + originRect.height/2 - window.innerHeight/2}px) scale(${scale})`;
      stageImg.style.transition = 'none';
      // Next frame: animate in.
      requestAnimationFrame(() => {
        stageImg.style.transition = '';
        stageImg.style.transform  = '';
      });

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
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowRight')  setSlide(index + 1);
      if (e.key === 'ArrowLeft')   setSlide(index - 1);
    });

    // Touch swipe support inside the lightbox.
    let touchStartX = 0;
    lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) setSlide(index + (dx < 0 ? 1 : -1));
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
