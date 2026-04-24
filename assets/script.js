/* ============================================================
   ZYBUDS — assets/script.js
   ============================================================ */

/* ── POPUP NOTIFICATION ON LOAD ── */
(function () {
  var popup = document.getElementById('notifPopup');
  if (!popup) return;

  var orderCountVal = Math.floor(Math.random() * (42 - 18 + 1)) + 18;
  var msgs = [
    '🔥 ' + orderCountVal + ' people ordered today',
    '📦 7 orders delivered this morning',
    '⚡ 3 people just viewed this product',
    '✅ 500+ orders completed in Hyderabad'
  ];
  var idx = 0;

  function showNotif() {
    popup.innerHTML = '<div class="notif-dot"></div> ' + msgs[idx];
    popup.classList.add('show');
    setTimeout(function () {
      popup.classList.remove('show');
      idx = (idx + 1) % msgs.length;
      setTimeout(showNotif, 4000);
    }, 3500);
  }

  setTimeout(showNotif, 1200);
})();


/* ── ANIMATED ACTIVITY COUNTERS ── */
function animateCounter(el, start, end, duration) {
  if (!el) return;
  var startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

window.addEventListener('load', function () {
  var finalOrders = Math.floor(Math.random() * (42 - 18 + 1)) + 18;
  animateCounter(document.getElementById('viewCount'), 30, 47, 1800);
  animateCounter(document.getElementById('orderCount'), 10, finalOrders, 2200);
});

/* Fluctuate viewer count every ~8 seconds */
setInterval(function () {
  var el = document.getElementById('viewCount');
  if (!el) return;
  var curr = parseInt(el.textContent);
  var delta = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : -Math.floor(Math.random() * 2);
  var next = Math.max(38, Math.min(62, curr + delta));
  animateCounter(el, curr, next, 1000);
}, 8000);

/* Increase daily viewed count every 5 seconds (only increases) */
setInterval(function () {
  var el = document.getElementById('dailyViewCount');
  if (!el) return;
  var curr = parseInt(el.textContent);
  var delta = Math.random() > 0.7 ? 1 : 0;
  if (delta > 0) el.textContent = curr + delta;
}, 5000);


/* ── SVG FALLBACK THUMBNAIL SWITCHER ── */
/* Used when no product images are set in Shopify */
var svgViews = {
  earbuds: '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="earbuds-svg"><g transform="translate(50,80)"><ellipse cx="55" cy="110" rx="38" ry="52" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="55" cy="110" rx="28" ry="40" fill="#141414"/><circle cx="55" cy="110" r="16" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="110" r="8" fill="#1c1c1c"/><ellipse cx="55" cy="65" rx="14" ry="28" fill="#222" stroke="#2e2e2e" stroke-width="1.5"/><circle cx="49" cy="108" r="1.5" fill="#333"/><circle cx="55" cy="105" r="1.5" fill="#333"/><circle cx="61" cy="108" r="1.5" fill="#333"/><circle cx="55" cy="113" r="1.5" fill="#333"/><circle cx="55" cy="110" r="21" fill="none" stroke="#e8c97a" stroke-width="0.8" opacity="0.6"/></g><g transform="translate(155,80)"><ellipse cx="55" cy="110" rx="38" ry="52" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="55" cy="110" rx="28" ry="40" fill="#141414"/><circle cx="55" cy="110" r="16" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="110" r="8" fill="#1c1c1c"/><ellipse cx="55" cy="65" rx="14" ry="28" fill="#222" stroke="#2e2e2e" stroke-width="1.5"/><circle cx="49" cy="108" r="1.5" fill="#333"/><circle cx="55" cy="105" r="1.5" fill="#333"/><circle cx="61" cy="108" r="1.5" fill="#333"/><circle cx="55" cy="113" r="1.5" fill="#333"/><circle cx="55" cy="110" r="21" fill="none" stroke="#e8c97a" stroke-width="0.8" opacity="0.6"/></g><rect x="88" y="250" width="124" height="34" rx="17" fill="#181818" stroke="#282828" stroke-width="1.5"/><line x1="148" y1="260" x2="154" y2="260" stroke="#e8c97a" stroke-width="1.5" stroke-linecap="round"/></svg>',
  case: '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="earbuds-svg"><rect x="50" y="80" width="200" height="140" rx="70" fill="#111" stroke="#222" stroke-width="2"/><rect x="50" y="80" width="200" height="70" rx="35" fill="#151515" stroke="#282828" stroke-width="1.5"/><ellipse cx="110" cy="130" rx="30" ry="42" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="1.5"/><circle cx="110" cy="130" r="12" fill="#181818"/><circle cx="110" cy="130" r="5" fill="#1f1f1f" stroke="#e8c97a" stroke-width="0.5"/><ellipse cx="190" cy="130" rx="30" ry="42" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="1.5"/><circle cx="190" cy="130" r="12" fill="#181818"/><circle cx="190" cy="130" r="5" fill="#1f1f1f" stroke="#e8c97a" stroke-width="0.5"/><circle cx="150" cy="200" r="5" fill="#e8c97a" opacity="0.8"/><rect x="136" y="207" width="28" height="7" rx="3.5" fill="#1a1a1a" stroke="#333" stroke-width="1"/><text x="150" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#e8c97a" opacity="0.5" letter-spacing="4">ZYBUDS</text></svg>',
  side: '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="earbuds-svg"><ellipse cx="150" cy="170" rx="44" ry="62" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="150" cy="170" rx="32" ry="48" fill="#141414"/><circle cx="150" cy="170" r="18" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="150" cy="170" r="9" fill="#1c1c1c"/><circle cx="150" cy="170" r="24" fill="none" stroke="#e8c97a" stroke-width="0.7" opacity="0.5"/><ellipse cx="150" cy="105" rx="16" ry="32" fill="#222" stroke="#2e2e2e" stroke-width="1.5"/><circle cx="143" cy="168" r="1.8" fill="#333"/><circle cx="150" cy="164" r="1.8" fill="#333"/><circle cx="157" cy="168" r="1.8" fill="#333"/><circle cx="150" cy="175" r="1.8" fill="#333"/></svg>',
  cable: '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="earbuds-svg"><rect x="128" y="60" width="44" height="60" rx="10" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="1.5"/><rect x="136" y="56" width="28" height="8" rx="2" fill="#111" stroke="#333" stroke-width="1"/><rect x="144" y="64" width="12" height="30" rx="2" fill="#e8c97a" opacity="0.3"/><path d="M150 120 Q120 160 150 200 Q180 240 150 280" fill="none" stroke="#2a2a2a" stroke-width="6" stroke-linecap="round"/><path d="M150 120 Q120 160 150 200 Q180 240 150 280" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/><rect x="136" y="276" width="28" height="14" rx="4" fill="#1a1a1a" stroke="#e8c97a" stroke-width="1"/><rect x="143" y="280" width="14" height="6" rx="1.5" fill="#111" stroke="#555" stroke-width="0.5"/><text x="150" y="155" text-anchor="middle" font-size="10" fill="#e8c97a" opacity="0.5" font-family="monospace">USB-C</text></svg>'
};

/* SVG view switcher — used when no real product images */
function switchView(type, el) {
  var wrap = document.getElementById('productImgWrap');
  if (!wrap) return;
  wrap.style.opacity = '0';
  wrap.style.transform = 'scale(0.92)';
  setTimeout(function () {
    wrap.innerHTML = '<div class="product-placeholder">' + svgViews[type] + '</div>';
    wrap.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    wrap.style.opacity = '1';
    wrap.style.transform = 'scale(1)';
  }, 200);
  document.querySelectorAll('.thumb2').forEach(function (t) { t.classList.remove('active'); });
  el.classList.add('active');
}

/* Real image switcher — used when product images exist in Shopify */
function switchToImage(url, alt, el) {
  var wrap = document.getElementById('productImgWrap');
  if (!wrap) return;
  wrap.style.opacity = '0';
  wrap.style.transform = 'scale(0.95)';
  setTimeout(function () {
    wrap.innerHTML = '<div class="product-placeholder"><img src="' + url + '" alt="' + alt + '" style="width:100%;max-width:340px;object-fit:contain;border-radius:12px;"></div>';
    wrap.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    wrap.style.opacity = '1';
    wrap.style.transform = 'scale(1)';
  }, 180);
  document.querySelectorAll('.thumb2').forEach(function (t) { t.classList.remove('active'); });
  el.classList.add('active');
}


/* ── COLOR / VARIANT PICKER ── */
function pickCol2(name, el) {
  var nameEl = document.getElementById('col2Name');
  if (nameEl) nameEl.textContent = name;
  document.querySelectorAll('.col2').forEach(function (c) { c.classList.remove('active'); });
  el.classList.add('active');
}


/* ── FAQ TOGGLE ── */
function toggleFaq2(el) {
  var item = el.parentElement;
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq2-item').forEach(function (f) { f.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}


/* ── PAYMENT OPTION TOGGLE ── */
var selectedPayment = 'advance';

function selectPayOption(type, el) {
  selectedPayment = type;
  document.querySelectorAll('.pay-opt').forEach(function (opt) { opt.classList.remove('active'); });
  el.classList.add('active');

  var breakdown = document.getElementById('priceBreakdown');
  var btn = document.getElementById('orderBtn');

  /* Use Shopify product data if available */
  var price = (window.ShopifyProduct && window.ShopifyProduct.price)
    ? (window.ShopifyProduct.price / 100)
    : 1400;
  var symbol = (window.ShopifyProduct && window.ShopifyProduct.currency) || '₹';
  var remaining = price - 99;

  if (type === 'full') {
    if (breakdown) breakdown.innerHTML = 'You are paying <strong>' + symbol + price.toLocaleString('en-IN') + ' in full</strong> upfront. No additional payment needed on delivery.';
    if (btn) btn.querySelector('span:first-child').textContent = '🛒 Confirm Order — Pay ' + symbol + price.toLocaleString('en-IN');
  } else {
    if (breakdown) breakdown.innerHTML = 'Pay <strong>₹99 now</strong> to confirm → Remaining <strong>' + symbol + remaining.toLocaleString('en-IN') + ' cash</strong> on delivery, after you check the product';
    if (btn) btn.querySelector('span:first-child').textContent = '🛒 Confirm Order — Pay ₹99';
  }
}


/* ── ORDER HANDLER ── */
/* 
  This handler is used for the nav button and mobile bar button which link
  outside the Shopify form. The main CTA button inside the form uses native
  Shopify cart/add — this JS handler is for secondary/nav triggers only.
*/
function handleOrder() {
  var amt = selectedPayment === 'full'
    ? (window.ShopifyProduct ? '₹' + (window.ShopifyProduct.price / 100).toLocaleString('en-IN') + ' (Full Amount)' : '₹1,400 (Full Amount)')
    : '₹99 (Advance)';
  alert('✅ Order Confirmed!\n\nPayment Mode: ' + amt + '\n\nOur team will call you within 30 minutes.\nSame-day delivery from Secunderabad to your door.\n\n📍 Zybuds — Suman Housing Colony, Secunderabad');
}


/* ── SCROLL REVEAL ── */
var obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('shown');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });


/* ── VIDEO PLACEHOLDER HIDE ── */
document.querySelectorAll('.video-block video').forEach(function (vid, i) {
  vid.addEventListener('loadeddata', function () {
    var ph = document.getElementById('vh' + (i + 1));
    if (ph) ph.style.display = 'none';
  });
});
