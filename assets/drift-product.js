/* DRIFT product page (colour, size, gallery, size chart units, sticky bar) and collection size filter. */

class DriftProduct extends HTMLElement {
  connectedCallback() {
    this.variants = JSON.parse(this.querySelector('[data-variants]').textContent);
    const params = new URLSearchParams(location.search);
    this.fit = ['men', 'women'].includes(params.get('fit')) ? params.get('fit') : '';
    const fromUrl = this.variants.find((v) => String(v.id) === params.get('variant'));
    const first = fromUrl || this.variants.find((v) => v.available) || this.variants[0];
    this.colour = first.colour;
    this.size = fromUrl ? fromUrl.size : null;

    this.querySelectorAll('button[data-colour]').forEach((b) => b.addEventListener('click', () => this.pickColour(b.dataset.colour)));
    this.querySelectorAll('[data-size]').forEach((b) => b.addEventListener('click', () => this.pickSize(b.dataset.size)));
    this.querySelector('[data-bar-add]')?.addEventListener('click', () => {
      if (this.match()) this.querySelector('form[data-drift-add]').requestSubmit();
      else this.querySelector('.drift-sizes-pick')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    this.querySelector('[data-open-chart]')?.addEventListener('click', () => {
      const d = this.querySelector('[data-chart-details]');
      if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    this.querySelectorAll('[data-unit-btn]').forEach((b) => b.addEventListener('click', () => this.unit(b.dataset.unitBtn)));

    // Slim bar on phones once the main button has scrolled away
    const add = this.querySelector('[data-add]');
    const bar = this.querySelector('[data-buybar]');
    if (add && bar && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => bar.classList.toggle('is-shown', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(add);
    }
    this.gallery = this.querySelector('[data-gallery]');
    this.gallery.addEventListener('scroll', () => this.syncDots(), { passive: true });
    this.pickColour(this.colour, true);
  }

  photos() {
    return [...this.gallery.querySelectorAll('.drift-product__photo')];
  }

  pickColour(colour, initial) {
    this.colour = colour;
    this.querySelectorAll('button[data-colour]').forEach((b) => b.classList.toggle('is-active', b.dataset.colour === colour));
    const name = this.querySelector('[data-colour-name]');
    if (name) name.textContent = colour;

    // Photos of this colour, and the Men / Women model if we came from that section
    const all = this.photos();
    const ofColour = all.filter((f) => f.dataset.colour.toLowerCase() === String(colour).toLowerCase());
    let show = ofColour.length ? ofColour : all;
    if (this.fit) {
      const own = show.filter((f) => !f.dataset.fit || f.dataset.fit === this.fit);
      if (own.length) show = own;
    }
    all.forEach((f) => { f.hidden = !show.includes(f); });
    show.slice(0, 2).forEach((f) => f.querySelector('img')?.setAttribute('loading', 'eager'));
    if (!initial) this.gallery.scrollTo({ left: 0, top: 0 });
    this.buildDots(show.length);

    // Sizes in stock for this colour
    this.querySelectorAll('[data-size]').forEach((b) => {
      const v = this.variants.find((x) => x.colour === colour && x.size === b.dataset.size);
      const ok = Boolean(v && v.available);
      b.classList.toggle('is-soldout', !ok);
      b.disabled = !ok;
    });
    if (this.size && !(this.match() && this.match().available)) this.size = null;
    this.update();
  }

  pickSize(size) {
    this.size = size;
    this.update();
  }

  match() {
    return this.variants.find((v) => v.colour === this.colour && v.size === this.size);
  }

  update() {
    this.querySelectorAll('[data-size]').forEach((b) => b.classList.toggle('is-active', b.dataset.size === this.size));
    const chosen = this.match();
    const v = chosen || this.variants.find((x) => x.colour === this.colour) || this.variants[0];
    this.querySelector('[data-variant-id]').value = v.id;
    this.querySelector('[data-now]').textContent = v.price;
    const cmp = this.querySelector('[data-compare]');
    if (cmp) { cmp.textContent = v.compare || ''; cmp.hidden = !v.compare; }
    const off = this.querySelector('[data-off]');
    if (off) { off.textContent = '-' + v.off + '%'; off.hidden = !v.off; }
    const barPrice = this.querySelector('[data-bar-price]');
    if (barPrice) barPrice.textContent = v.price;

    const add = this.querySelector('[data-add]');
    const label = this.querySelector('[data-add-label]');
    const stock = this.querySelector('[data-stock]');
    const barBtn = this.querySelector('[data-bar-add]');
    if (!chosen) {
      add.disabled = true;
      label.textContent = 'Select a size';
      if (stock) stock.textContent = '';
      if (barBtn) barBtn.textContent = 'Select size';
      return;
    }
    add.disabled = !chosen.available;
    label.textContent = chosen.available ? 'Add to bag · ' + chosen.price : 'Sold out';
    if (stock) stock.textContent = chosen.available && chosen.stock > 0 && chosen.stock <= 3 ? 'Only ' + chosen.stock + ' left' : '';
    if (barBtn) barBtn.textContent = chosen.available ? 'Add to bag' : 'Sold out';
    const url = new URL(location.href);
    url.searchParams.set('variant', chosen.id);
    history.replaceState(null, '', url);
  }

  buildDots(n) {
    const dots = this.querySelector('[data-dots]');
    dots.innerHTML = n > 1 ? '<i></i>'.repeat(n) : '';
    this.syncDots();
  }

  syncDots() {
    const dots = [...this.querySelectorAll('[data-dots] i')];
    if (!dots.length) return;
    const i = Math.round(this.gallery.scrollLeft / Math.max(1, this.gallery.clientWidth));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
  }

  unit(u) {
    this.querySelectorAll('[data-unit-btn]').forEach((b) => b.classList.toggle('is-active', b.dataset.unitBtn === u));
    this.querySelectorAll('[data-in]').forEach((td) => {
      const inch = parseFloat(td.dataset.in);
      td.textContent = u === 'cm' ? String(Math.round(inch * 2.54 * 2) / 2).replace(/\.0$/, '') : td.dataset.in;
    });
  }
}
if (!customElements.get('drift-product')) customElements.define('drift-product', DriftProduct);

class DriftSizeFilter extends HTMLElement {
  connectedCallback() {
    const root = this.closest('.drift-collection');
    const list = JSON.parse(root.querySelector('[data-size-list]')?.textContent || '[]');
    const order = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const sizes = [...new Set(list.filter(Boolean))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    if (sizes.length < 2) return;
    this.selected = new Set();
    this.innerHTML = sizes.map((s) => '<button type="button" class="drift-chip" data-chip="' + s + '">' + s + '</button>').join('');
    this.addEventListener('click', (e) => {
      const b = e.target.closest('[data-chip]');
      if (!b) return;
      const s = b.dataset.chip;
      if (this.selected.has(s)) this.selected.delete(s); else this.selected.add(s);
      b.classList.toggle('is-active');
      let shown = 0;
      root.querySelectorAll('[data-grid] [data-sizes]').forEach((item) => {
        const ok = !this.selected.size || [...this.selected].some((x) => item.dataset.sizes.includes('|' + x + '|'));
        item.hidden = !ok;
        if (ok) shown++;
      });
      root.querySelector('[data-no-size]').hidden = shown > 0;
    });
  }
}
if (!customElements.get('drift-size-filter')) customElements.define('drift-size-filter', DriftSizeFilter);
