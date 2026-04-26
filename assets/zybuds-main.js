/* ============================================================
   ZYBUDS — assets/zybuds-main.js
   Main JavaScript logic for the theme
   ============================================================ */

(function() {
  'use strict';

  // 1. POPUP NOTIFICATION CYCLING
  const initPopup = () => {
    const popup = document.getElementById('notifPopup');
    const textSpan = document.getElementById('notifText');
    if (!popup || !textSpan || !window.ZybudsSettings) return;

    const messages = window.ZybudsSettings.popupMessages.split('|');
    let index = 0;

    const showNextMessage = () => {
      // Get random orders count between 18 and 42 for dynamic {orders} tag
      const randomOrders = Math.floor(Math.random() * (42 - 18 + 1)) + 18;
      const msg = messages[index].replace('{orders}', randomOrders);
      
      textSpan.textContent = msg;
      popup.classList.add('show');

      setTimeout(() => {
        popup.classList.remove('show');
        index = (index + 1) % messages.length;
        setTimeout(showNextMessage, 4500); // 4.5s delay while hidden
      }, 3500); // 3.5s visibility
    };

    setTimeout(showNextMessage, 1500); // Initial delay
  };

  // 2. ANIMATED ACTIVITY COUNTERS
  const animateCounter = (el, start, end, duration) => {
    if (!el) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const initCounters = () => {
    const finalOrders = Math.floor(Math.random() * (42 - 18 + 1)) + 18;
    animateCounter(document.getElementById('viewCount'), 30, 47, 1800);
    animateCounter(document.getElementById('orderCount'), 10, finalOrders, 2200);

    // Fluctuate viewer count every ~8 seconds
    setInterval(() => {
      const el = document.getElementById('viewCount');
      if (!el) return;
      const curr = parseInt(el.textContent);
      const delta = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : -Math.floor(Math.random() * 2);
      const next = Math.max(38, Math.min(62, curr + delta));
      animateCounter(el, curr, next, 1000);
    }, 8000);

    // Increase daily viewed count every 6 seconds (social proof)
    setInterval(() => {
      const el = document.getElementById('dailyViewCount');
      if (!el) return;
      const curr = parseInt(el.textContent);
      const delta = Math.random() > 0.7 ? 1 : 0;
      if (delta > 0) el.textContent = curr + delta;
    }, 6000);
  };

  // 3. IMAGE SWITCHER (Shopify Images)
  window.switchToImage = (url, alt, el) => {
    const wrap = document.getElementById('productImgWrap');
    if (!wrap) return;

    wrap.style.opacity = '0';
    wrap.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      wrap.innerHTML = `<div class="product-placeholder"><img src="${url}" alt="${alt}" style="width:100%;max-width:340px;object-fit:contain;border-radius:12px;"></div>`;
      wrap.style.opacity = '1';
      wrap.style.transform = 'scale(1)';
    }, 200);

    document.querySelectorAll('.thumb2').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  // 4. IMAGE SWITCHER (SVG Fallbacks)
  const svgViews = {
    earbuds: `<svg class="earbuds-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><g transform="translate(50,80)"><ellipse cx="55" cy="110" rx="38" ry="52" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="55" cy="110" rx="28" ry="40" fill="#141414"/><circle cx="55" cy="110" r="16" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="110" r="8" fill="#1c1c1c"/><circle cx="55" cy="110" r="21" fill="none" stroke="#e8c97a" stroke-width="0.8" opacity="0.6"/></g><g transform="translate(155,80)"><ellipse cx="55" cy="110" rx="38" ry="52" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="55" cy="110" rx="28" ry="40" fill="#141414"/><circle cx="55" cy="110" r="16" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="110" r="8" fill="#1c1c1c"/><circle cx="55" cy="110" r="21" fill="none" stroke="#e8c97a" stroke-width="0.8" opacity="0.6"/></g><rect x="88" y="250" width="124" height="34" rx="17" fill="#181818" stroke="#282828" stroke-width="1.5"/><line x1="148" y1="260" x2="154" y2="260" stroke="#e8c97a" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    case: `<svg class="earbuds-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="80" width="200" height="140" rx="70" fill="#111" stroke="#222" stroke-width="2"/><rect x="50" y="80" width="200" height="70" rx="35" fill="#151515" stroke="#282828" stroke-width="1.5"/><ellipse cx="110" cy="130" rx="30" ry="42" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="1.5"/><circle cx="150" cy="200" r="5" fill="#e8c97a" opacity="0.8"/><text x="150" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#e8c97a" opacity="0.5" letter-spacing="4">ZYBUDS</text></svg>`,
    side: `<svg class="earbuds-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><ellipse cx="150" cy="170" rx="44" ry="62" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/><ellipse cx="150" cy="170" rx="32" ry="48" fill="#141414"/><circle cx="150" cy="170" r="18" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/><circle cx="150" cy="170" r="24" fill="none" stroke="#e8c97a" stroke-width="0.7" opacity="0.5"/></svg>`,
    cable: `<svg class="earbuds-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect x="128" y="60" width="44" height="60" rx="10" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="1.5"/><path d="M150 120 Q120 160 150 200 Q180 240 150 280" fill="none" stroke="#2a2a2a" stroke-width="6" stroke-linecap="round"/><text x="150" y="155" text-anchor="middle" font-size="10" fill="#e8c97a" opacity="0.5" font-family="monospace">USB-C</text></svg>`
  };

  window.switchView = (type, el) => {
    const wrap = document.getElementById('productImgWrap');
    if (!wrap) return;

    wrap.style.opacity = '0';
    wrap.style.transform = 'scale(0.92)';
    
    setTimeout(() => {
      wrap.innerHTML = `<div class="product-placeholder">${svgViews[type]}</div>`;
      wrap.style.opacity = '1';
      wrap.style.transform = 'scale(1)';
    }, 200);

    document.querySelectorAll('.thumb2').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  // 5. PAYMENT SELECTION LOGIC
  window.selectPayOption = (type, el) => {
    document.querySelectorAll('.pay-opt').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');

    const breakdown = document.getElementById('priceBreakdown');
    const orderBtn = document.getElementById('orderBtn');
    const mobOrderBtn = document.getElementById('mobOrderBtn');
    const settings = window.ZybudsSettings || {};
    const product = window.ShopifyProduct || {};

    const advanceAmount = parseInt(settings.advanceAmount) || 99;
    const fullPrice = (product.price ? product.price / 100 : 1400);
    const currencySymbol = product.currency || '₹';
    const remaining = Math.max(0, fullPrice - advanceAmount);

    if (type === 'full') {
      if (breakdown) {
        breakdown.innerHTML = `You are paying <strong>${currencySymbol}${fullPrice.toLocaleString('en-IN')} in full</strong> upfront. No additional payment needed on delivery.`;
      }
      if (orderBtn) {
        orderBtn.querySelector('span:first-child').textContent = `🛒 Confirm Order — Pay ${currencySymbol}${fullPrice.toLocaleString('en-IN')}`;
      }
      if (mobOrderBtn) {
        mobOrderBtn.textContent = `Pay ${currencySymbol}${fullPrice.toLocaleString('en-IN')} → Confirm`;
      }
    } else {
      if (breakdown) {
        breakdown.innerHTML = `Pay <strong>₹${advanceAmount} now</strong> to confirm → Remaining <strong>${currencySymbol}${remaining.toLocaleString('en-IN')} cash</strong> on delivery, after you check the product`;
      }
      if (orderBtn) {
        orderBtn.querySelector('span:first-child').textContent = `🛒 Confirm Order — Pay ₹${advanceAmount}`;
      }
      if (mobOrderBtn) {
        mobOrderBtn.textContent = `Pay ₹${advanceAmount} → Confirm`;
      }
    }
  };

  // 6. VARIANT SELECTION (COLOR PICKER)
  window.pickCol2 = (name, el) => {
    const nameEl = document.getElementById('col2Name');
    if (nameEl) nameEl.textContent = name;
    document.querySelectorAll('.col2').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  };

  // 7. FAQ ACCORDION
  window.toggleFaq2 = (el) => {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq2-item').forEach(f => f.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };

  // 8. ORDER BUTTON ACTION
  window.handleOrder = () => {
    const form = document.getElementById('ProductForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.classList.add('pulse-glow');
      setTimeout(() => form.classList.remove('pulse-glow'), 2000);
    }
  };

  // 9. SCROLL REVEAL INITIALIZATION
  const initReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  // 10. DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    initPopup();
    initCounters();
    initReveal();

    // Hide placeholders if video loaded
    document.querySelectorAll('.video-block video').forEach((vid, i) => {
      vid.addEventListener('loadeddata', () => {
        const ph = document.getElementById('vh' + (i + 1));
        if (ph) ph.style.display = 'none';
      });
    // Hover to play feature videos
    document.querySelectorAll('.feat2').forEach(feat => {
      const vid = feat.querySelector('video');
      if (vid) {
        feat.addEventListener('mouseenter', () => {
          vid.play().catch(() => {}); // Catch error if autoplay blocked
        });
        feat.addEventListener('mouseleave', () => {
          vid.pause();
        });
      }
    });
  });

})();
