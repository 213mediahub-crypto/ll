# Loro Coffee — Website Files
## Folder Structure

```
lorocoffee/
│
├── index.html                  ← Main HTML (all page sections)
│
└── assets/
    ├── css/
    │   └── styles.css          ← All styles (colours, layout, responsive)
    │
    ├── js/
    │   ├── main.js             ← Your custom JavaScript
    │   └── scrollreveal.min.js ← Keep this file (do not edit)
    │
    └── img/
        └── (all your images)   ← Copy all images from your old site here
```

---

## Quick Editing Guide

### Change a colour
Open `assets/css/styles.css` → scroll to **Section 00 — CSS VARIABLES**
Edit any `--color-*` value and it updates the whole site instantly.

### Edit nav links
Open `index.html` → find **NAVIGATION** comment block.
Edit `<li><a href="#section-id">Label</a></li>` lines inside `<ul class="nav__list">`.

### Edit hero text / buttons
Open `index.html` → find **HERO SECTION** comment block.
Edit `.hero__eyebrow`, `.hero__title`, `.hero__description`, `.hero__badges`.

### Edit contact details
Search `index.html` for `lorocoffeefarms@gmail.com` — update all instances.
Search for `+256` — update phone numbers.
Search for `wa.me` — update WhatsApp number.

### Add a new product card
Open `index.html` → find **PRODUCTS SECTION** comment block.
Copy one `<article class="product__card">` block and paste it.

### Change hero background photo
Open `assets/css/styles.css` → find **Section 04 — HERO**.
Change the URL inside `.hero__bg { background: ... url('../img/YOUR-IMAGE.jpeg') }`.

### Change the visual band photos (4 panels at bottom)
Open `assets/css/styles.css` → find **Section 12 — VISUAL BAND**.
Edit the `url()` for `.visual--farm`, `.visual--roasting`, `.visual--brewing`, `.visual--lifestyle`.

---

## Images to copy from your old site
Copy these files into `assets/img/`:

- headpic.png
- pp6.jpeg
- pp1.jpeg
- coffeeharvest.JPG
- newlorop1.png
- newloro22.png
- newloro33.png
- gallery1.jpg — gallery4.jpg
- farm1.jpg
- manu2.jpeg
- manu4.WEBP
- manu6.jpg
- newpic3.jpg
- steps-green-coffee.png
- steps-coffee-beans.png
- steps-ground-coffee.png

---

## External dependencies (loaded via CDN — no download needed)
- Google Fonts: Playfair Display + Outfit
- RemixIcons 2.5.0
- Font Awesome 6.5.1
