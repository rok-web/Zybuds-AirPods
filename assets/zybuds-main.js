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
    if (!popup || !textSpan || !window.ZybudsSettings || !window.ZybudsSettings.popupMessages) return;

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

    // Increase daily viewed count every 5 seconds (social proof)
    setInterval(() => {
      const el = document.getElementById('dailyViewCount');
      if (!el) return;
      const curr = parseInt(el.textContent);
      const delta = Math.floor(Math.random() * 2) + 1; // Increase by 1 or 2 views
      el.textContent = curr + delta;
    }, 5000);
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
      const payTypeInput = document.getElementById('paymentTypeInput');
      if (payTypeInput) payTypeInput.value = 'Full';
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
      const payTypeInput = document.getElementById('paymentTypeInput');
      if (payTypeInput) payTypeInput.value = 'Advance';
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

  // 8. ORDER BUTTON ACTION (Opens Shipping Details Modal directly)
  window.handleOrder = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    
    // If custom checkout is disabled, trigger EasySell's own button
    if (window.ZybudsSettings && window.ZybudsSettings.enableCustomCheckout === false) {
      // EasySell renders its own buy button somewhere on the page.
      // We find it and click it programmatically to open the popup.
      const easysellBtn = document.querySelector(
        '.easysell-buy-button, [data-easysell-button], .es-buy-button, #es-buy-button, [class*="easysell"][class*="btn"]:not(.easysell-popup-button-overwrite):not(#orderBtn):not(#mobOrderBtn):not(.nav-order), [class*="easysell"][class*="button"]:not(.easysell-popup-button-overwrite):not(#orderBtn):not(#mobOrderBtn):not(.nav-order)'
      );
      if (easysellBtn) {
        console.log('EasySell button found. Triggering popup.');
        easysellBtn.click();
      } else {
        // Fallback: click our own form button directly (EasySell hooks into button clicks with name="add")
        console.log('EasySell button not found. Clicking form submit button directly.');
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
          // Temporarily remove onclick to avoid infinite loop, then click
          const originalOnclick = orderBtn.onclick;
          orderBtn.onclick = null;
          orderBtn.click();
          orderBtn.onclick = originalOnclick;
        }
      }
      return;
    }
    
    const form = document.getElementById('ProductForm');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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

  // 10. RAZORPAY INTEGRATION WITH SHIPPING MODAL
  const initRazorpay = () => {
    const form = document.getElementById('ProductForm');
    
    // If custom checkout is disabled, EasySell handles everything.
    // We only add a safety net to stop native form navigation to /cart.
    if (window.ZybudsSettings && window.ZybudsSettings.enableCustomCheckout === false) {
      console.log('Custom Razorpay checkout is disabled. Bypassing interceptors.');
      if (form) {
        // Safety net — prevent bare form submission from navigating to /cart.
        // EasySell hooks in BEFORE this fires (via click, not submit), so this
        // only catches the edge case where no app intercepts it.
        form.addEventListener('submit', (e) => {
          e.preventDefault();
        }, { capture: false });
      }
      return;
    }

    const orderBtn = document.getElementById('orderBtn');
    if (!form) return;

    // Modal elements
    const overlay = document.getElementById('checkoutModalOverlay');
    const closeBtn = document.getElementById('checkoutCloseBtn');
    const submitBtn = document.getElementById('checkoutSubmitBtn');

    // Input fields inside modal
    const inputName = document.getElementById('shippingName');
    const inputPincode = document.getElementById('shippingPincode');
    const inputAddress = document.getElementById('shippingAddress');
    const inputPhone = document.getElementById('shippingPhone');
    const inputCity = document.getElementById('shippingCity');
    const inputLandmark = document.getElementById('shippingLandmark');
    const inputState = document.getElementById('shippingState');

    // Hidden properties in ProductForm
    const hiddenName = document.getElementById('hiddenShippingName');
    const hiddenPincode = document.getElementById('hiddenShippingPincode');
    const hiddenAddress = document.getElementById('hiddenShippingAddress');
    const hiddenPhone = document.getElementById('hiddenShippingPhone');
    const hiddenCity = document.getElementById('hiddenShippingCity');
    const hiddenLandmark = document.getElementById('hiddenShippingLandmark');
    const hiddenState = document.getElementById('hiddenShippingState');

    // Validate a single field
    const validateField = (input, isValid, errorId) => {
      const errorMsg = document.getElementById(errorId);
      if (!isValid) {
        input.classList.add('error');
        if (errorMsg) errorMsg.style.display = 'block';
        return false;
      } else {
        input.classList.remove('error');
        if (errorMsg) errorMsg.style.display = 'none';
        return true;
      }
    };

    // Auto-clear errors on input
    [inputName, inputPincode, inputAddress, inputPhone, inputCity, inputState].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errSpan = document.getElementById('error-' + input.id);
        if (errSpan) errSpan.style.display = 'none';
      });
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => {
          input.classList.remove('error');
          const errSpan = document.getElementById('error-' + input.id);
          if (errSpan) errSpan.style.display = 'none';
        });
      }
    });

    const openModal = () => {
      const product = window.ShopifyProduct || {};
      
      // Update Title & Variant inside modal
      const titleEl = document.getElementById('checkoutProductTitle');
      const variantEl = document.getElementById('checkoutProductVariant');
      const priceEl = document.getElementById('checkoutProductPrice');
      
      if (titleEl) titleEl.textContent = product.title || "Zybuds AirPods Pro 2";
      
      // Get selected color
      const colorNameEl = document.getElementById('col2Name');
      const selectedColor = colorNameEl ? colorNameEl.textContent : 'White';
      if (variantEl) variantEl.textContent = 'Color: ' + selectedColor;

      // Calculate displayed price based on Payment Option (Advance vs. Full)
      const payTypeInput = document.getElementById('paymentTypeInput');
      const payType = payTypeInput ? payTypeInput.value : 'Advance';
      let priceText = '₹99';
      let remainingAmount = 1400;
      if (payType === 'Full') {
        if (product.price) {
          const fullPrice = product.price / 100;
          priceText = (product.currency || '₹') + fullPrice.toLocaleString('en-IN');
          remainingAmount = fullPrice;
        } else {
          priceText = '₹1,400';
          remainingAmount = 1400;
        }
      } else {
        const adv = product.advanceAmount || 99;
        priceText = '₹' + adv;
        if (product.price) {
          const fullPrice = product.price / 100;
          remainingAmount = fullPrice - adv;
        } else {
          remainingAmount = 1400 - adv;
        }
      }

      if (priceEl) priceEl.textContent = priceText;
      if (submitBtn) submitBtn.textContent = 'COMPLETE ORDER - ' + priceText;

      // Update COD Remaining Amount in Modal
      const codRemEl = document.getElementById('codRemainingAmount');
      if (codRemEl) {
        codRemEl.textContent = '₹' + remainingAmount;
      }

      // Show overlay
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Event listeners to close modal
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    const triggerPaymentFlow = () => {
      const settings = window.ZybudsSettings || {};
      const product = window.ShopifyProduct || {};
      
      console.log('--- Razorpay Debug Info ---');
      console.log('Settings:', settings);
      console.log('Product:', product);

      if (typeof Razorpay === 'undefined') {
        alert('Razorpay system is not loaded yet. Please wait 2-3 seconds for the page to finish loading.');
        return;
      }

      const key = settings.razorpayKey || '';
      if (!key || key.includes('YourKeyHere') || key.length < 5) {
        alert('Missing Razorpay Key ID. Please go to Theme Settings > Payments (Razorpay) and enter your rzp_live_... or rzp_test_... key.');
        return;
      }

      // Calculate amount in Paise
      let amountInPaise = 9900;
      const payTypeInput = document.getElementById('paymentTypeInput');
      const payType = payTypeInput ? payTypeInput.value : 'Advance';
      
      if (payType === 'Full') {
        const fullPrice = product.price || 140000;
        amountInPaise = fullPrice;
      } else {
        const adv = parseInt(settings.advanceAmount) || 99;
        amountInPaise = adv * 100;
      }

      // ✅ CAPTURE VALUES NOW — before Razorpay opens (async callback cannot reliably read DOM)
      const capturedName     = inputName    ? inputName.value.trim()    : '';
      const capturedPincode  = inputPincode ? inputPincode.value.trim() : '';
      const capturedAddress  = inputAddress ? inputAddress.value.trim() : '';
      const capturedPhone    = inputPhone   ? inputPhone.value.trim()   : '';
      const capturedCity     = inputCity    ? inputCity.value.trim()    : '';
      const capturedLandmark = inputLandmark ? inputLandmark.value.trim() : '';
      const capturedState    = inputState   ? inputState.value          : '';
      const capturedPayType  = payTypeInput ? payTypeInput.value        : 'Advance';
      const capturedColor    = document.getElementById('col2Name') ? document.getElementById('col2Name').textContent.trim() : 'White';

      console.log('📦 Captured before Razorpay:', { capturedName, capturedPhone, capturedAddress, capturedCity, capturedState });

      const options = {
        "key": key.trim(),
        "amount": Math.round(amountInPaise),
        "currency": "INR",
        "name": "Zybuds",
        "description": "Order Payment - " + (product.title || "AirPods"),
        "image": "https://cdn.shopify.com/s/files/1/0861/2243/0742/files/logo_black.png",
        "prefill": {
          "name": capturedName,
          "contact": capturedPhone
        },
        "notes": {
          "Customer Name": capturedName.substring(0, 100),
          "Contact Phone": capturedPhone.substring(0, 100),
          "Pincode": capturedPincode.substring(0, 6),
          "Address": capturedAddress.substring(0, 200),
          "City": capturedCity.substring(0, 100),
          "Landmark": capturedLandmark.substring(0, 100),
          "State": capturedState.substring(0, 100),
          "Product": (product.title || "AirPods Pro 2").substring(0, 100),
          "Color": capturedColor.substring(0, 100)
        },
        "handler": function (response){
          console.log('Payment Successful:', response.razorpay_payment_id);
          form.dataset.paid = "true";
          
          if (submitBtn) {
            submitBtn.textContent = 'PROCESSING ORDER...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
          }

          // ── Step 1: Clear stale cart ──────────────────────────────────────
          fetch('/cart/clear.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
          })
          .then(() => {
            console.log('Cart cleared');

            const rzpPaymentId = response.razorpay_payment_id;
            const paidAmount   = '₹' + (amountInPaise / 100);

            const variantIdInput = form.querySelector('input[name="id"]');
            let variantId = variantIdInput
              ? variantIdInput.value
              : (window.ShopifyProduct ? window.ShopifyProduct.variantId : '');
            if (variantId) variantId = parseInt(variantId, 10);
            if (!variantId) throw new Error('No Variant ID found');

            // ── Step 2: Add item to cart with all shipping properties ─────
            console.log('Adding item, Variant:', variantId, 'Name:', capturedName);
            return fetch('/cart/add.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({
                items: [{
                  id: variantId,
                  quantity: 1,
                  properties: {
                    "Payment Type":       capturedPayType,
                    "Shipping Name":      capturedName,
                    "Shipping Pincode":   capturedPincode,
                    "Shipping Address":   capturedAddress,
                    "Shipping Phone":     capturedPhone,
                    "Shipping City":      capturedCity,
                    "Shipping Landmark":  capturedLandmark,
                    "Shipping State":     capturedState,
                    "Razorpay Payment ID": rzpPaymentId,
                    "Paid Amount":        paidAmount
                  }
                }]
              })
            }).then(addRes => ({
              addRes,
              rzpPaymentId,
              paidAmount,
              variantId
            }));
          })
          .then(({ addRes, rzpPaymentId, paidAmount, variantId }) => {
            if (!addRes || !addRes.ok) throw new Error('Shopify cart add failed');
            console.log('✅ Cart item added with properties');

            // ── Step 3: Create real Shopify order via serverless API ──────
            const apiUrl = (window.ZybudsSettings && window.ZybudsSettings.orderApiUrl)
              ? window.ZybudsSettings.orderApiUrl
              : 'https://zybuds-order-api.vercel.app/api/create-order';

            return fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerName:      capturedName,
                customerPhone:     capturedPhone,
                address:           capturedAddress,
                city:              capturedCity,
                pincode:           capturedPincode,
                state:             capturedState,
                landmark:          capturedLandmark,
                razorpayPaymentId: rzpPaymentId,
                paidAmount:        paidAmount,
                variantId:         variantId,
                productTitle:      (window.ShopifyProduct && window.ShopifyProduct.title) || 'AirPods Pro 2',
                paymentType:       capturedPayType
              })
            })
            .then(apiRes => apiRes.json())
            .then(apiData => {
              if (apiData && apiData.success && apiData.orderName) {
                console.log('✅ Shopify order created:', apiData.orderName);
                // Pass order number to success page
                window.location.href = '/cart?payment_success=true&order=' + encodeURIComponent(apiData.orderName) + '&rzp=' + encodeURIComponent(rzpPaymentId);
              } else {
                console.warn('Order API response:', apiData);
                // Still show success even if order creation had an issue
                window.location.href = '/cart?payment_success=true&rzp=' + encodeURIComponent(rzpPaymentId);
              }
            })
            .catch(apiErr => {
              console.error('Order API error (non-fatal):', apiErr);
              // Still show success page — payment was captured
              window.location.href = '/cart?payment_success=true&rzp=' + encodeURIComponent(rzpPaymentId);
            });
          })
          .catch(err => {
            console.error('AJAX order processing failed:', err);
            
            // Standard form fallback: populate hidden properties & submit
            let payIdInput = form.querySelector('input[name="properties[Razorpay Payment ID]"]');
            if (!payIdInput) {
              payIdInput = document.createElement('input');
              payIdInput.type = 'hidden';
              payIdInput.name = 'properties[Razorpay Payment ID]';
              form.appendChild(payIdInput);
            }
            payIdInput.value = response.razorpay_payment_id;
            
            let amtInput = form.querySelector('input[name="properties[Paid Amount]"]');
            if (!amtInput) {
              amtInput = document.createElement('input');
              amtInput.type = 'hidden';
              amtInput.name = 'properties[Paid Amount]';
              form.appendChild(amtInput);
            }
            amtInput.value = '₹' + (amountInPaise / 100);

            if (hiddenName) hiddenName.value = capturedName;
            if (hiddenPincode) hiddenPincode.value = capturedPincode;
            if (hiddenAddress) hiddenAddress.value = capturedAddress;
            if (hiddenPhone) hiddenPhone.value = capturedPhone;
            if (hiddenCity) hiddenCity.value = capturedCity;
            if (hiddenLandmark) hiddenLandmark.value = capturedLandmark;
            if (hiddenState) hiddenState.value = capturedState;

            form.submit();
          });
        },
        "theme": { "color": "#e8c97a" },
        "modal": {
          "ondismiss": function() { 
            console.log('Payment cancelled by user'); 
            // Re-open shipping modal if they cancel payment so they don't lose their data
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      };
      
      try {
        const rzp = new Razorpay(options);
        rzp.open();
      } catch(err) {
        console.error('Razorpay Initialization Failed:', err);
        alert('Could not start Razorpay: ' + err.message);
      }
    };

    const handleFormSubmitIntercept = (e) => {
      // If payment is already done, let the form submit normally
      if (form.dataset.paid === 'true') return;
      
      e.preventDefault();
      e.stopPropagation();
      
      openModal();
    };

    // Intercept checkout actions
    form.addEventListener('submit', handleFormSubmitIntercept);
    if (orderBtn) {
      orderBtn.addEventListener('click', handleFormSubmitIntercept);
    }

    // Modal Complete Order click handler
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        // Validate shipping fields
        const nameVal = inputName.value.trim();
        const pincodeVal = inputPincode.value.trim();
        const addressVal = inputAddress.value.trim();
        const phoneVal = inputPhone.value.trim();
        const cityVal = inputCity.value.trim();
        const landmarkVal = inputLandmark.value.trim();
        const stateVal = inputState.value;

        let isFormValid = true;

        isFormValid = validateField(inputName, nameVal.length > 0, 'error-shippingName') && isFormValid;
        isFormValid = validateField(inputPincode, /^[0-9]{6}$/.test(pincodeVal), 'error-shippingPincode') && isFormValid;
        isFormValid = validateField(inputAddress, addressVal.length > 0, 'error-shippingAddress') && isFormValid;
        isFormValid = validateField(inputPhone, /^[0-9]{10}$/.test(phoneVal), 'error-shippingPhone') && isFormValid;
        isFormValid = validateField(inputCity, cityVal.length > 0, 'error-shippingCity') && isFormValid;
        isFormValid = validateField(inputState, stateVal !== "", 'error-shippingState') && isFormValid;

        if (!isFormValid) {
          // Highlight first invalid input
          const firstErr = overlay.querySelector('.checkout-input.error');
          if (firstErr) firstErr.focus();
          return;
        }

        // Form is valid! Set hidden inputs in Shopify form
        if (hiddenName) hiddenName.value = nameVal;
        if (hiddenPincode) hiddenPincode.value = pincodeVal;
        if (hiddenAddress) hiddenAddress.value = addressVal;
        if (hiddenPhone) hiddenPhone.value = phoneVal;
        if (hiddenCity) hiddenCity.value = cityVal;
        if (hiddenLandmark) hiddenLandmark.value = landmarkVal;
        if (hiddenState) hiddenState.value = stateVal;

        // Close shipping modal and trigger payment flow
        closeModal();
        triggerPaymentFlow();
      });
    }
  };

  // 11. DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    initPopup();
    initCounters();
    initReveal();
    initRazorpay();

    // Hide placeholders if video loaded
    document.querySelectorAll('.video-block video').forEach((vid, i) => {
      vid.addEventListener('loadeddata', () => {
        const ph = document.getElementById('vh' + (i + 1));
        if (ph) ph.style.display = 'none';
      });
    });

    // Autoplay feature videos when scrolled into view — no controls, no hover needed
    const featObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target.querySelector('video');
        if (!vid) return;
        if (entry.isIntersecting) {
          vid.muted = true;
          vid.setAttribute('muted', '');
          vid.loop = true;
          vid.setAttribute('playsinline', '');
          vid.removeAttribute('controls');
          vid.play().catch(() => {});
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feat2').forEach(feat => {
      // Strip controls from all feature videos immediately
      const vid = feat.querySelector('video');
      if (vid) {
        vid.muted = true;
        vid.loop = true;
        vid.removeAttribute('controls');
      }
      featObs.observe(feat);
    });
  });

})();
