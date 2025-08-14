// Mobile menu toggle + accessibility + site interactions
(function () {
  const menuBtn = document.querySelector('.menu');
  const nav = document.getElementById('primary-nav');

  if (menuBtn && nav) {
    const closeMenu = () => { nav.style.display = 'none'; menuBtn.setAttribute('aria-expanded', 'false'); };
    const openMenu  = () => { nav.style.display = 'flex'; menuBtn.setAttribute('aria-expanded', 'true');  };

    menuBtn.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      open ? closeMenu() : openMenu();
    });

    nav.addEventListener('click', e => {
      if (e.target.tagName === 'A' && window.innerWidth <= 620) closeMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && window.innerWidth <= 620) closeMenu();
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> WhatsApp
  window.submitForm = function submitForm(e) {
    e.preventDefault();
    const form = e.target.closest('form');
    const status = form.querySelector('#status');
    const fields = form.querySelectorAll('input, textarea');
    const [name, contact, message] = Array.from(fields).map(i => i.value.trim());

    if (!name || !contact || !message) {
      status.textContent = 'Please fill in all fields.';
      return false;
    }

    const toNumber = '918885091293';
    const text =
`Hi Express Car Care,
Name: ${name}
Contact: ${contact}
Message: ${message}`;

    const url = `https://wa.me/${toNumber}?text=${encodeURIComponent(text)}`;
    status.textContent = 'Opening WhatsApp…';
    window.open(url, '_blank', 'noopener');
    return false;
  };

  // Reveal on scroll (features, prices, gallery, results, testimonials)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature, .price, .thumbs img, .ba, .t-card').forEach(el => {
    el.classList.add('reveal-init');
    io.observe(el);
  });

  // ===== Before/After slider init =====
  function initBeforeAfter() {
    const widgets = document.querySelectorAll('[data-ba]');
    widgets.forEach(w => {
      const range = w.querySelector('.ba__range');
      if (!range) return;

      const set = (pct) => {
        const v = Math.max(0, Math.min(100, Number(pct) || 0));
        w.style.setProperty('--ba', v);
      };

      // init
      set(range.value || 50);

      // drag thumb
      range.addEventListener('input', e => set(e.target.value));

      // click anywhere to jump the handle
      w.addEventListener('pointerdown', e => {
        if (e.target === range) return;
        const rect = w.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        range.value = pct.toFixed(0);
        set(range.value);
      });

      // keep handle aligned on resize
      window.addEventListener('resize', () => set(range.value));
    });
  }
  initBeforeAfter();
})();
