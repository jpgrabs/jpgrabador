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
