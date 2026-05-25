'use strict';

/* -------------------------------------------------- *
 * main.js – lógica compartida de PasearPerros
 * -------------------------------------------------- */

(function () {

  /* ---- Header sticky scroll ---- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    // Cierra el menú al pulsar un enlace
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Cierra al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Botón "volver arriba" ---- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Active nav link por sección visible ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.site-header__nav a');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active',
              a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }

})();
