/* DRIFT "Add to bag": adds the chosen variant and tells Horizon's cart drawer
   (standard CartLinesUpdateEvent), so the drawer refreshes and opens. */
import { CartLinesUpdateEvent, CartErrorEvent } from '@shopify/events';

const sectionIds = () =>
  [...document.querySelectorAll('[data-section-id]')]
    .filter((el) => el.matches('cart-items-component, [data-cart-items]'))
    .map((el) => el.dataset.sectionId)
    .filter(Boolean);

document.addEventListener('submit', async (e) => {
  const form = e.target.closest('form[data-drift-add]');
  if (!form) return;
  e.preventDefault();
  const button = form.querySelector('[type=submit]');
  const id = form.querySelector('[name=id]')?.value;
  if (!id || button?.disabled) return;

  const quantity = Number(form.querySelector('[name=quantity]')?.value) || 1;
  const sections = [...new Set(sectionIds())];
  const deferred = CartLinesUpdateEvent.createPromise();
  form.dispatchEvent(
    new CartLinesUpdateEvent({
      action: 'add',
      context: 'product',
      lines: [{ merchandiseId: id, quantity }],
      promise: deferred.promise,
    })
  );

  button?.classList.add('is-loading');
  try {
    const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(id), quantity }], sections: sections.join(','), sections_url: location.pathname }),
    });
    const data = await res.json();
    const cart = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`).then((r) => r.json());
    if (!res.ok || data.status) {
      form.dispatchEvent(new CartErrorEvent({ error: data.description || data.message || 'Could not add to bag', code: 'INVALID' }));
      deferred.resolve({ cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart), detail: { didError: true, items: cart.items } });
      form.querySelector('[data-error]')?.replaceChildren(document.createTextNode(data.description || 'Could not add to bag'));
      return;
    }
    deferred.resolve({
      cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
      detail: { items: cart.items, sections: data.sections, didError: false, source: 'drift-product', itemCount: quantity },
    });
    button?.classList.add('is-added');
    setTimeout(() => button?.classList.remove('is-added'), 1800);
  } catch (err) {
    deferred.reject(err);
  } finally {
    button?.classList.remove('is-loading');
  }
});
