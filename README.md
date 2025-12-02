Dream Store — Static template for GitHub Pages
===============================================

This package contains a simple static storefront template tailored for selling digital FiveM scripts/services.
It supports:
- Product listing and detail pages
- Cart using localStorage (cart icon only + drawer)
- Support/Ticket form that can send a Discord webhook (configure below)
- RTL and LTR language toggle
- Responsive layout suitable for GitHub Pages

How to use
----------
1. Extract the files and push the folder to a GitHub repository.
2. Enable GitHub Pages (Settings -> Pages) and choose the branch (main) and folder (root).
3. Configure the webhook:
   - Open js/app.js and replace WEBHOOK_PLACEHOLDER with your webhook URL encoded in Base64.
   Example (browser console): btoa('https://discord.com/api/webhooks/...') -> copy the result into the file.
4. Replace assets (images) in the assets/ folder with your real product images.
5. Edit products array in js/app.js to add/remove real products.

File structure
--------------
/index.html
/products.html
/product.html
/support.html
/about.html
/terms.html
/css/styles.css
/js/app.js
/assets/*    (placeholders for images)
README.md
