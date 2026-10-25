/* DRIFT info pages: WhatsApp message forms and the size guide's inches / cm switch. */

class DriftWaForm extends HTMLElement {
  connectedCallback() {
    this.querySelector('button')?.addEventListener('click', () => this.send());
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); this.send(); }
    });
  }
  send() {
    const fields = [...this.querySelectorAll('input, textarea')];
    const missing = fields.find((f) => f.required && !f.value.trim());
    if (missing) { missing.focus(); missing.reportValidity?.(); return; }
    const v = Object.fromEntries(fields.map((f) => [f.name, f.value.trim()]));
    let text;
    if (this.dataset.template === 'track') {
      text = `Hi DRIFT, where is my order ${v.order}?` + (v.phone ? ` I ordered with the number ${v.phone}.` : '');
    } else {
      text = `Hi DRIFT, this is ${v.name}.` + (v.order ? ` (Order ${v.order})` : '') + `\n\n${v.message}`;
    }
    window.open(`https://wa.me/${this.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
if (!customElements.get('drift-wa-form')) customElements.define('drift-wa-form', DriftWaForm);

class DriftSizeGuide extends HTMLElement {
  connectedCallback() {
    this.querySelectorAll('[data-unit-btn]').forEach((b) =>
      b.addEventListener('click', () => {
        const u = b.dataset.unitBtn;
        this.querySelectorAll('[data-unit-btn]').forEach((x) => x.classList.toggle('is-active', x === b));
        this.querySelectorAll('[data-in]').forEach((td) => {
          const inch = parseFloat(td.dataset.in);
          td.textContent = u === 'cm' ? String(Math.round(inch * 2.54 * 2) / 2).replace(/\.0$/, '') : td.dataset.in;
        });
      })
    );
  }
}
if (!customElements.get('drift-size-guide')) customElements.define('drift-size-guide', DriftSizeGuide);
