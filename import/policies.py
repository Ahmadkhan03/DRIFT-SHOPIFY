"""DRIFT policy texts for Shopify (Settings → Policies), adapted from driftpk.com.
Run to write policies/*.html, one file per Shopify policy."""
import os

WA = '<a href="https://wa.me/923711322476">+92 371 1322476</a>'
CONTACT = f"<h2>Contact</h2><p><strong>DRIFT</strong>, Faisalabad, Pakistan<br>WhatsApp / call: {WA}<br>Email: driftpk77@gmail.com</p>"

POLICIES = {
"shipping-policy": f"""
<p>We deliver to every city in Pakistan, with Cash on Delivery on every order. Delivery charges are shown at checkout before you place your order.</p>
<h2>How long it takes</h2>
<ul>
<li><strong>Order confirmation:</strong> we call or WhatsApp you to confirm every Cash on Delivery order, usually the same day.</li>
<li><strong>Dispatch:</strong> confirmed orders are packed and handed to our courier within 1–2 working days.</li>
<li><strong>Delivery:</strong> 2–4 working days for major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar) and 4–7 working days for other cities and remote areas.</li>
</ul>
<p>Working days are Monday to Saturday, excluding public holidays. During sales, Eid and new drops, dispatch can take a day or two longer. We'll keep you updated on WhatsApp.</p>
<h2>Order confirmation</h2>
<p>To keep delivery fast and fair for everyone, we confirm each Cash on Delivery order by phone or WhatsApp before it ships. If we can't reach you within 48 hours after a few tries, the order may be cancelled. You're always welcome to place it again.</p>
<h2>Cash on Delivery</h2>
<ul>
<li>Please keep the exact amount ready. The total is in your order confirmation.</li>
<li>Courier policy doesn't allow parcels to be opened before payment. Please check that the parcel is sealed and undamaged before you accept it.</li>
<li>If anything is wrong when you open it (wrong item, wrong size or damage), message us within 48 hours with your order number and photos, and we'll sort it out. An unboxing video helps us resolve issues faster.</li>
</ul>
<h2>Tracking your order</h2>
<p>Once your order ships, we'll share the courier tracking number. You can check your order any time on <a href="/pages/track-order">Track your order</a>.</p>
<h2>Refused or undelivered parcels</h2>
<p>If a parcel is refused at the door or returned because the address was incomplete or the phone was unreachable, the order is cancelled. Customers with repeated refused parcels may be asked to pay in advance for future orders.</p>
<h2>International orders</h2>
<p>We currently ship within Pakistan only.</p>
<h2>Payment</h2>
<p>You can pay with Cash on Delivery, or online by bank transfer or Easypaisa (our account details are shown after you place your order). Online orders ship once we verify the payment. Card payments through our payment partner, Safepay, are coming soon.</p>
{CONTACT}
""",
"refund-policy": f"""
<p>Wrong size? Swap it within 7 days of delivery. Got a faulty or wrong item? We'll fix it for free.</p>
<h2>Size exchanges</h2>
<p>You can exchange any full-price item for a different size within <strong>7 days of delivery</strong>, as long as:</p>
<ul>
<li>It's unworn, unwashed and free of perfume, makeup or stains.</li>
<li>All original tags are attached and it's in its original packaging.</li>
<li>The size you want is in stock. If it isn't, you can pick another item of the same or higher value (you pay the difference).</li>
</ul>
<p>For size exchanges, you send the item back to us and we pay to deliver the new size. The return courier charge is paid by you.</p>
<h2>Faulty, damaged or wrong items</h2>
<p>If your order arrives damaged, faulty, or isn't what you ordered, message us within <strong>48 hours of delivery</strong> with your order number and clear photos (an unboxing video helps). We'll arrange a free replacement, or a full refund if a replacement isn't available. We cover all delivery charges.</p>
<h2>Refunds</h2>
<ul>
<li>We don't offer refunds for change of mind. Size exchanges are available instead (see above).</li>
<li>Refunds apply to faulty, damaged or wrong items that can't be replaced, and to orders we cancel after you paid in advance.</li>
<li><strong>Paid online (bank transfer or Easypaisa):</strong> the refund goes back to the same account or wallet you paid from, within 7–10 working days of approval. Your bank may take a few extra days to show it.</li>
<li><strong>Paid with Cash on Delivery:</strong> refunds are sent by bank transfer, JazzCash or Easypaisa within 7–10 working days of approval.</li>
<li>You can choose store credit instead of a refund, which is issued straight away.</li>
<li>Original delivery charges are refunded only when the item was faulty, damaged or wrong.</li>
</ul>
<h2>Sale &amp; limited items</h2>
<p>Items bought on sale or marked <strong>Limited</strong> can be exchanged for a different size if available, but can't be refunded unless faulty.</p>
<h2>How to request an exchange</h2>
<ol>
<li>WhatsApp us on {WA} with your order number, the item, and the size you want.</li>
<li>We'll confirm and share the return address and instructions.</li>
<li>Pack the item securely with its tags and send it back via any courier.</li>
<li>Once we receive and check it (usually within 2 working days), we ship your new size.</li>
</ol>
<p>Your order number is in your order confirmation email, or find your order on <a href="/pages/track-order">Track your order</a>.</p>
<h2>Cancelling an order</h2>
<p>You can cancel any time before your order is shipped: just WhatsApp us your order number. If you paid in advance, you get a full refund to your original payment method. Once shipped, an order can't be cancelled, but you can exchange it after delivery as above.</p>
{CONTACT}
""",
"privacy-policy": f"""
<p>We only collect what we need to deliver your order and keep in touch if you ask us to. We never sell your data.</p>
<h2>Who we are</h2>
<p>This online store is operated by DRIFT, a clothing brand based in Faisalabad, Pakistan. In this policy, “we” and “us” mean DRIFT. You can contact us on WhatsApp at {WA}.</p>
<h2>What we collect</h2>
<ul>
<li><strong>Order details:</strong> your name, mobile number, email address, delivery address, the items you buy and any notes you add at checkout.</li>
<li><strong>Newsletter:</strong> your email address, if you choose to join.</li>
<li><strong>Messages:</strong> anything you send us on WhatsApp, email or social media.</li>
<li><strong>Basic technical data:</strong> like any website, our store platform records standard information such as IP address and browser type to keep the site secure and working, and uses cookies to keep your cart and measure our ads.</li>
</ul>
<p>We don't collect or store card details. If you pay online by bank transfer or Easypaisa, we only see the payment screenshot you send us and the details on our own account statement. Card payments through our licensed payment partner, Safepay, are coming soon. They'll be handled on Safepay's secure page under their own security standards (PCI DSS).</p>
<h2>How we use it</h2>
<ul>
<li>To process, confirm, deliver and support your orders, including calling or messaging you to confirm Cash on Delivery orders.</li>
<li>To handle exchanges, returns and refunds.</li>
<li>To send you news about drops and offers, only if you subscribed. Every email includes a way to unsubscribe.</li>
<li>To prevent fraud and fake orders, and to improve our website and products.</li>
</ul>
<h2>Who we share it with</h2>
<p>We share only what's needed, with services that help us run the store:</p>
<ul>
<li><strong>Courier partners</strong> (such as Digi Dokaan): your name, phone, address and the amount to collect, to deliver your order.</li>
<li><strong>Payment partner</strong> (Safepay, coming soon), for card payments: the amount, your order number and the details you enter on their secure payment page.</li>
<li><strong>Shopify</strong>, the platform that hosts our online store, processes order and customer data on our behalf.</li>
<li><strong>Advertising partners</strong> (Meta and Google), only to measure our ads, using cookies as described above.</li>
<li><strong>Authorities</strong>, only if required by Pakistani law.</li>
</ul>
<p>We never sell or rent your personal information.</p>
<h2>How long we keep it</h2>
<p>We keep order records for as long as needed for accounting, tax and customer support, typically up to 5 years. Newsletter emails are kept until you unsubscribe.</p>
<h2>Your choices</h2>
<ul>
<li>Ask us what information we hold about you, or ask us to correct it.</li>
<li>Ask us to delete your information, unless we need to keep it for legal or accounting reasons.</li>
<li>Unsubscribe from marketing emails at any time.</li>
</ul>
<p>To make a request, message us on WhatsApp from the number you used to order.</p>
<h2>Security</h2>
<p>Our store uses HTTPS encryption, and customer data is stored securely on Shopify, accessible only to authorised staff.</p>
{CONTACT}
<h2>Changes</h2>
<p>We may update this policy from time to time.</p>
""",
"terms-of-service": f"""
<p>These terms apply when you use this website and buy from DRIFT. By placing an order you agree to them.</p>
<h2>Orders</h2>
<ul>
<li>Placing an order is an offer to buy. We accept it when we confirm your order by phone or WhatsApp and dispatch it.</li>
<li>We may cancel an order if an item is out of stock, if we can't confirm it within 48 hours, if the details look fraudulent, or if there was a clear pricing error. If you paid in advance, you'll get a full refund.</li>
<li>We may limit quantities per customer, especially for limited drops.</li>
</ul>
<h2>Prices &amp; payment</h2>
<ul>
<li>All prices are in Pakistani Rupees (PKR) and include applicable taxes. Delivery charges are shown at checkout.</li>
<li>Prices and offers can change at any time, but the price you pay is the one shown when you placed your order.</li>
<li>For Cash on Delivery, please pay the full amount to the courier when your parcel arrives.</li>
<li>For online payment, send the order amount by bank transfer or Easypaisa to the account shown after you place your order, then share the payment screenshot on WhatsApp. Your order is confirmed once we verify the payment. Card payments through our licensed payment partner, Safepay, are coming soon.</li>
<li>Discount codes can't be combined, exchanged for cash, or applied to past orders.</li>
</ul>
<h2>Delivery, exchanges &amp; returns</h2>
<p>Delivery times and charges are explained in our <a href="/policies/shipping-policy">shipping policy</a>. Exchanges and refunds are covered by our <a href="/policies/refund-policy">returns &amp; refunds policy</a>, which forms part of these terms.</p>
<h2>Products</h2>
<ul>
<li>We try to show colours and details accurately, but screens vary and slight differences from photos are normal.</li>
<li>Measurements in our size guide are approximate and may vary by 1–2 cm.</li>
</ul>
<h2>Your order details</h2>
<p>Please make sure your phone number and address are correct. We're not responsible for delays or failed deliveries caused by incorrect details. Repeatedly refusing Cash on Delivery parcels may mean we ask for advance payment on future orders.</p>
<h2>Intellectual property</h2>
<p>The DRIFT name, logo, designs, graphics, photos and website content belong to DRIFT. You may not copy, reproduce or sell them without our written permission.</p>
<h2>Using this website</h2>
<p>Please don't misuse the site, for example by placing fake orders or interfering with how it works. We may block access for anyone who does.</p>
<h2>Liability</h2>
<p>We're responsible for delivering the products you order as described. We aren't liable for indirect losses, or for delays caused by events outside our control, such as courier disruptions, strikes, severe weather or internet outages. Nothing in these terms limits your rights under Pakistani consumer protection law.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of Pakistan, and disputes will be handled by the competent courts of Pakistan.</p>
{CONTACT}
""",
}

os.makedirs(os.path.join(os.path.dirname(__file__), "policies"), exist_ok=True)
for name, html in POLICIES.items():
    open(os.path.join(os.path.dirname(__file__), "policies", f"{name}.html"), "w", encoding="utf-8").write(html.strip() + "\n")
print("written:", list(POLICIES))
