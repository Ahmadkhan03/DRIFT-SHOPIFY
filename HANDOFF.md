# DRIFT — handover notes

Read this first if you are a new Claude session (or a new developer) picking up DRIFT.
Last updated: 2026-10-25. **No secrets in this file — never add any.**

---

## 1. The situation in one paragraph

DRIFT is a Pakistani streetwear store (PKR, cash on delivery). It is **live today** on a
custom Next.js site hosted on Render (`www.driftpk.com`). The client has a paid Shopify
plan, so we rebuilt the same store on **Shopify** (free Horizon theme, heavily customised
to look like the current site). The Shopify store is built and password-protected.
**Handover to the client: week of 2026-11-02. Switch-over to Shopify: ~1–2 weeks after.**
Until then the Render site stays live and untouched.

---

## 2. Where everything is

| Thing | Location |
|---|---|
| Shopify theme code (this folder) | `F:\Claude Code\drift-shopify` → GitHub `Ahmadkhan03/DRIFT-SHOPIFY` (private) |
| Horizon upstream | git remote `horizon-upstream` = `Shopify/horizon` |
| Old live site code | `F:\Claude Code\drift` → GitHub `Ahmadkhan03/DRIFT-CLOTHING` (private) |
| Shopify store | `bk22nm-is.myshopify.com` · admin `admin.shopify.com/store/bk22nm-is` |
| Live theme | id `189654499482` "DRIFT (in progress)" — **published** |
| Old site hosting | Render free web service `drift-clothing.onrender.com` (UptimeRobot pings every 5 min) |
| Old site database | client's Supabase project (keys only in `drift/.env.local`, git-ignored) |
| Old site images | Cloudinary cloud `ravooe7r` (fetch from Supabase) |
| Domain / DNS | GoDaddy: `www` CNAME → `drift-clothing.onrender.com`, apex A → `216.24.57.1` |
| Meta Pixel / dataset | `2520234081805155` (business portfolio "Zee Closet") |
| WhatsApp | +92 327 9122476 |
| Vercel | paused until 2026-11-20 (image limit). Don't suggest a second Vercel account — it got blocked. |

---

## 3. Ground rules (from the user)

1. **Do not change `F:\Claude Code\drift` or the DRIFT-CLOTHING repo.** It is kept as-is
   to reuse for other clients. All Shopify work happens here in `drift-shopify`.
2. **Never ask for or type passwords.** The user logs in to Shopify / GitHub / anything
   in the browser pane themselves; Claude then clicks around in the admin.
3. **Never paste secrets** (API keys, tokens) in chat or commit them.
4. **Test orders must be cleaned up** afterwards (cancel, restock, archive).
5. Commit **and push** to GitHub after each milestone — the user wants everything both
   local and on GitHub.
6. The user is not a Shopify expert — explain admin steps plainly.

---

## 4. Working with the theme

The Shopify CLI login is per computer/user — on a new account, run any command below and
approve the device code in the browser.

```bash
# push local changes to the LIVE theme (it is published, so --allow-live is required)
npx --yes @shopify/cli@latest theme push --store bk22nm-is.myshopify.com --theme 189654499482 --allow-live --json

# check Liquid before pushing
npx --yes @shopify/cli@latest theme check

# pull edits the client made in the theme editor (do this BEFORE pushing once the client is editing)
npx --yes @shopify/cli@latest theme pull --store bk22nm-is.myshopify.com --theme 189654499482
```

### How the theme is built

All DRIFT code is prefixed `drift-` and sits on top of Horizon.

- `snippets/drift-styles.liquid` — rendered in `layout/theme.liquid` and
  `layout/password.liquid`. Loads the fonts (`DRIFT Display` = Archivo 62% stretch/900,
  `DRIFT Sans` = Inter Tight, `DRIFT Mono` = JetBrains Mono, all as theme assets) and the
  CSS/JS: `drift.css`, `drift-pages.css`, `drift-footer.css`, `drift.js`,
  `drift-product.js`, `drift-cart.js` (module), plus `drift-info.css/js` on pages and policies.
- `snippets/drift-img.liquid` — **every DRIFT image goes through this**. Builds a srcset with
  `&quality=90` (fixed blurry photos). Params: image, widths, sizes, alt, class, loading.
- `snippets/drift-product-card.liquid` — card with hover photo, New/Limited badge (from
  product tags), `-X%` sale tag (from compare-at price), colour count.
- **Men / women model photos:** a product image's alt text ends in `| men` or `| women`.
  Cards and the product page filter photos by it; links from Men/Women pages add `?fit=men`
  / `?fit=women`. Product page also groups photos by colour from alt text
  `"Product name - Colour | men"`. Keep this format when adding photos.
- **Size charts:** theme editor → Product template → DRIFT product → "Size chart" blocks.
  Each block: products it applies to, fit note, sizes `S, M, L`, rows like
  `Chest width: 24, 25, 26` (inches; page converts to cm).
- **Cart drawer:** `drift-cart.js` posts to `/cart/add.js` and fires Horizon's
  `CartLinesUpdateEvent`; `auto_open_cart_drawer` is on in `config/settings_data.json`.
- **Colours:** palette in `config/settings_data.json` — bone `#F4F1EC`, ink `#111010`,
  maroon `#5C0A14`, `#E9E3DA`, `#2A2727`; corner radius 0. Swatch colours by name in
  `snippets/drift-colour.liquid` (add new colour names there).

Sections: `drift-hero`, `drift-marquee`, `drift-product-rail`, `drift-split`,
`drift-lookbook` (3 shoppable dots per look), `drift-category-tiles`, `drift-editorial`,
`drift-drop` (countdown + waitlist, customers tagged `drop-waitlist`), `drift-values`,
`drift-collection` (category tabs, size filter, sort), `drift-product`, `drift-footer`,
`drift-info`, `drift-contact`, `drift-faq`, `drift-size-guide`, `drift-track`,
`drift-about`, `drift-search`, `drift-404`.

### Liquid gotchas we hit

- No filters inside a `for` tag — `assign` the list first.
- No comparisons inside `render` params — `assign` the boolean first.
- No filter chains inside `image_tag` params — `assign` first (broke the product page HTML).
- `richtext` settings can't hold tables.
- A page can only pick a template that exists in the **published** theme.

### `import/` folder

- `import/images/` — 25 site images (logo, hero, lookbook…), already uploaded to Shopify
  Files with the same names (`shopify://shop_images/...`).
- `import/policies/` — the 4 policy texts (+ `policies.py`), already pasted into Shopify.
- `import/drift-products.csv` — product import file (git-ignored; already imported).

---

## 5. What is done in the Shopify admin

- Store named DRIFT, currency PKR, money format `Rs {{amount_no_decimals}}`.
- 6 products / 25 variants / 96 images imported.
- Collections: Hoodies, Polo shirts, Trousers (by type); Men, Women (by tag);
  New arrivals (tag New OR Limited). Main menu: Men, Women, New, Shop all.
- Pages with templates: about, contact, faq, size-guide, track-order.
- Policies: refund, privacy, terms, shipping (no PayFast; "Safepay coming soon").
- Checkout: DRIFT logo + colours + fonts, **phone required**.
- Shipping: Pakistan "Free delivery" Rs 0.
- Payments: manual **Cash on Delivery** + manual "Pay online (Bank transfer / Easypaisa)"
  with the bank details in its instructions.
- Test order #1001 placed → cancelled, restocked, archived.
- Search, 404, account and password pages styled.

---

## 6. What's left

**Before handover (next week)**
- [ ] Owner's guide for the client: adding products (alt text `| men` / `| women`!),
      editing size charts, homepage slides, orders/COD flow, discounts.
- [ ] Optional cleanups (ask the user): delete page `/pages/contact-1` (duplicate) and the
      test customer "Test Order".

**Launch day checklist**
- [ ] Re-sync stock and prices from the live site (the old site's sale ends **Oct 29**).
- [ ] Connect the **Facebook & Instagram** sales channel using the **same** pixel/dataset
      `2520234081805155`; set up the catalogue.
- [ ] Connect `driftpk.com` in Shopify → Domains, then change the GoDaddy DNS records from
      Render to Shopify (Shopify shows the exact values).
- [ ] Remove the storefront password (Online Store → Preferences).
- [ ] Place a final real test order, check it, then cancel/restock/archive it.
- [ ] After the switch: Render, UptimeRobot and Cloudinary can be turned off (ask first).

**Security follow-up:** the Meta CAPI token was once pasted in chat — the user should
regenerate it in Meta Events Manager. Delete `drift/.env.render` if it still exists.

---

## 7. Starting a new Claude session

Open Claude Code in `F:\Claude Code` (or `F:\Claude Code\drift-shopify`) and say:

> Read drift-shopify/HANDOFF.md and continue with the DRIFT Shopify work.
