/* DRIFT interactions: hero slider, lookbook dots, drop countdown, scroll reveals, editorial parallax. */

class DriftHero extends HTMLElement {
  connectedCallback() {
    this.slides = [...this.querySelectorAll('[data-slide]')];
    this.dots = [...this.querySelectorAll('[data-dot]')];
    this.index = 0;
    this.interval = (Number(this.dataset.interval) || 6) * 1000;
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.show(i, true)));
    if (this.slides.length > 1) this.start();
    // Swipe on phones
    let x0 = null;
    this.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
    this.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) this.show(this.index + (dx < 0 ? 1 : -1), true);
      x0 = null;
    });
  }
  disconnectedCallback() { clearInterval(this.timer); }
  start() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.show(this.index + 1), this.interval);
  }
  show(i, manual) {
    const n = this.slides.length;
    this.index = (i + n) % n;
    this.slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === this.index);
      s.setAttribute('aria-hidden', k === this.index ? 'false' : 'true');
    });
    this.dots.forEach((d, k) => {
      d.classList.remove('is-active');
      d.classList.toggle('is-done', k < this.index);
    });
    const dot = this.dots[this.index];
    if (dot) { void dot.offsetWidth; dot.classList.add('is-active'); } // restart the progress bar
    if (manual) this.start();
  }
}
if (!customElements.get('drift-hero')) customElements.define('drift-hero', DriftHero);

class DriftLookbook extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e) => {
      const dot = e.target.closest('.drift-spot__dot');
      if (!dot) return;
      const spot = dot.parentElement;
      const open = !spot.classList.contains('is-open');
      this.querySelectorAll('.drift-spot.is-open').forEach((s) => {
        s.classList.remove('is-open');
        s.querySelector('.drift-spot__dot').setAttribute('aria-expanded', 'false');
      });
      if (open) { spot.classList.add('is-open'); dot.setAttribute('aria-expanded', 'true'); }
    });
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) this.querySelectorAll('.drift-spot.is-open').forEach((s) => s.classList.remove('is-open'));
    });
  }
}
if (!customElements.get('drift-lookbook')) customElements.define('drift-lookbook', DriftLookbook);

class DriftCountdown extends HTMLElement {
  connectedCallback() {
    // "2026-11-14 20:00" is Pakistan time (UTC+5)
    const raw = (this.dataset.date || '').trim().replace(' ', 'T');
    const target = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(raw) ? raw : raw + '+05:00');
    if (!target) return;
    const cells = [...this.querySelectorAll('[data-unit]')];
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const left = Math.max(0, target - Date.now());
      const v = [Math.floor(left / 864e5), Math.floor(left / 36e5) % 24, Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60];
      cells.forEach((c, i) => (c.textContent = pad(v[i])));
    };
    tick();
    this.timer = setInterval(tick, 1000);
  }
  disconnectedCallback() { clearInterval(this.timer); }
}
if (!customElements.get('drift-countdown')) customElements.define('drift-countdown', DriftCountdown);

/* Fade-up on scroll for DRIFT sections, and a gentle parallax on editorial photos */
(() => {
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }), { rootMargin: '0px 0px -10% 0px' })
    : null;
  const init = (root = document) => {
    root.querySelectorAll('.drift-rail__head, .drift-tiles__head, .drift-lookbook__head, .drift-editorial__text, .drift-values__item, .drift-drop__body').forEach((el) => {
      if (el.classList.contains('drift-reveal')) return;
      el.classList.add('drift-reveal');
      io ? io.observe(el) : el.classList.add('is-in');
    });
  };
  init();
  document.addEventListener('shopify:section:load', (e) => init(e.target));

  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (parallax.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const update = () => {
      parallax.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.transform = `translateY(${(-p * Number(img.dataset.parallax) * 100).toFixed(2)}%)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
