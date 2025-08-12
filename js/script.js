/* -----------------------------
   Portfolio — script.js
   - Hamburger toggle (mobile)
   - Smooth scrolling for anchors
   - Navbar active link highlight
   - Split section intersection-triggered animation
   - Back-to-top button
   ----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- elements ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  // we'll create a mobile nav container dynamically (simple)
  let mobileNav = null;

  /* ---------- Hamburger Toggle ---------- */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // toggle a class to show/hide nav-links for mobile
      header.classList.toggle('nav-open');

      // create/destroy a small mobile nav panel for accessibility
      if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        // clone links into mobile nav
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(a => {
          const a2 = document.createElement('a');
          a2.href = a.href;
          a2.textContent = a.textContent;
          a2.addEventListener('click', () => {
            // close nav after click
            header.classList.remove('nav-open');
            setTimeout(() => mobileNav && mobileNav.remove(), 200);
          });
          mobileNav.appendChild(a2);
        });
        header.after(mobileNav);
      } else {
        // toggle display
        if (header.classList.contains('nav-open')) {
          mobileNav.style.display = 'block';
        } else {
          mobileNav.style.display = 'none';
        }
      }
    });

    // hide mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        if (mobileNav) mobileNav.style.display = 'none';
      }
    });
  }

  /* ---------- Smooth scroll for internal anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Navbar active on scroll ---------- */
  const navAnchorLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navAnchorLinks.map(l => {
    try { return document.querySelector(l.getAttribute('href')) } catch(e){ return null }
  }).filter(Boolean);

  function updateActiveNav() {
    const pos = window.scrollY + (window.innerHeight / 3);
    let idx = -1;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= pos) idx = i;
    });
    navAnchorLinks.forEach((link, i) => {
      link.classList.toggle('active', i === idx);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- Split section animation (IntersectionObserver) ---------- */
  const left = document.querySelector('.split-left');
  const right = document.querySelector('.split-right');

  if (left && right) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.22 });

    io.observe(left);
    io.observe(right);
  }

  /* ---------- Back to Top button ---------- */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    // show after user scrolled some distance
    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- small accessibility tweak: keyboard close for mobile nav ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        if (mobileNav) mobileNav.style.display = 'none';
      }
    }
  });

});

// Navbar Hamburger Toggle
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});


// Scroll animations
const fadeEls = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});

// Back to Top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
