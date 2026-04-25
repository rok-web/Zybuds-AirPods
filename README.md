# Zybuds Shopify Theme

A premium, production-ready Shopify theme designed specifically for high-conversion product landing pages. Optimized for local delivery businesses with features like ₹99 advance payment, same-day delivery messaging, and social proof counters.

## ✨ Key Features

- **Premium Dark Aesthetic**: Sleek #080808 background with #e8c97a gold accents and Playfair Display typography.
- **Conversion-Focused Layout**: Built to replicate high-performing landing pages exactly.
- **₹99 Advance Payment System**: Integrated toggle to switch between Advance Payment (COD) and Full Payment.
- **Live Activity Social Proof**: Dynamic counters for "Viewers Now" and "Orders Today".
- **Notification Popups**: Cycling trust messages to increase urgency and credibility.
- **Fully Customizable**: Control city names, founder details, warranty duration, and contact info via the Shopify Theme Editor.
- **Mobile Optimized**: Custom sticky footer bar for mobile users with dynamic pricing updates.
- **WhatsApp Integration**: Floating WhatsApp button for instant customer support.

## 📁 File Structure

```text
zybuds-theme/
├── assets/
│   ├── zybuds-base.css      # Core styles, animations, and responsive layout
│   └── zybuds-main.js      # All interactive logic (counters, popups, toggles)
├── config/
│   ├── settings_schema.json # Theme Editor configuration
│   └── settings_data.json   # Default theme settings
├── layout/
│   └── theme.liquid         # Main layout with header, footer, and scripts
├── locales/
│   └── en.default.json      # English translations
├── sections/
│   ├── header.liquid        # Ticker + Navigation + Breadcrumb
│   └── product-page.liquid  # The main product landing page section
├── snippets/
│   ├── faq.liquid           # FAQ Accordion
│   ├── footer.liquid        # Site footer
│   ├── founder.liquid       # Founder message section
│   ├── live-activity.liquid # Live viewer/order counters
│   ├── product-image-gallery.liquid # Image viewer with fallback SVGs
│   ├── reviews.liquid       # Customer review cards and score
│   └── why99-box.liquid     # Explanation of the advance payment system
└── templates/
    ├── index.liquid         # Homepage redirect/landing
    └── product.liquid       # Product page template
```

## 🚀 Installation & Setup

1. **Upload to Shopify**:
   - Zip the `zybuds-theme` folder.
   - Go to **Online Store > Themes** in your Shopify Admin.
   - Click **Add Theme > Upload zip file**.

2. **Configure Product Data**:
   - For the **₹99 Advance** system to work perfectly with the Shopify Checkout, it is recommended to create a separate "Advance Payment" variant or a dedicated hidden product that costs ₹99.
   - Update the `advance_amount` in the Theme Editor to match your choice.

3. **Theme Customization**:
   - Go to **Customize** theme.
   - **Global Settings**: Set your city (e.g., Hyderabad), WhatsApp number, founder name, and warranty years.
   - **Product Page**: Use the "Product Page" section to add technical specs, customer reviews, and FAQ items.

## 🛠️ Customization Tips

- **Typography**: The theme uses Google Fonts (Playfair Display and DM Sans). You can change these in `layout/theme.liquid` if needed.
- **Brand Colors**: To change the gold accent, update the `--accent` variable in `assets/zybuds-base.css`.
- **Review Count**: The review count in the snippet defaults to "214" (fixing a typo from the original landing page). This can be changed in the section settings.

## 🤝 Support

For technical issues or feature requests, contact the development team at [support@zybuds.com](mailto:support@zybuds.com).