/* ================================================================
   LORO COFFEE — main.js
   Location: assets/js/main.js

   TABLE OF CONTENTS
   -----------------
   01. STICKY NAVIGATION  — adds .header--scrolled class on scroll
   02. NAV CTA BUTTON     — shows "Partner With Us" btn after scroll
   03. MOBILE DRAWER      — hamburger open / close / overlay
   04. SMOOTH SCROLL      — all anchor links scroll smoothly
   05. ACTIVE NAV LINK    — highlights current section in nav
   06. SCROLL REVEAL      — animates .reveal elements into view
   07. SCROLL-UP BUTTON   — shows/hides back-to-top arrow
================================================================ */


/* ================================================================
   01. STICKY NAVIGATION
   Adds a solid dark background to the header after the user
   scrolls past 60px. The CSS handles the visual transition.
================================================================ */
(function initStickyNav() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
})();


/* ================================================================
   02. NAV CTA BUTTON
   The "Partner With Us" button is hidden by default (CSS: display:none)
   and revealed after the user scrolls 400px into the page.
   To change the scroll threshold, edit the number 400 below.
================================================================ */
(function initNavCta() {
  const navCta = document.getElementById('nav-cta');
  if (!navCta) return;

  const THRESHOLD = 400; // px from top before CTA appears

  function toggleCta() {
    navCta.style.display = window.scrollY > THRESHOLD ? 'inline-block' : 'none';
  }

  window.addEventListener('scroll', toggleCta, { passive: true });
  toggleCta();
})();


/* ================================================================
   03. MOBILE DRAWER
   Opens and closes the slide-in nav drawer on mobile.
   Clicking the hamburger, close button, overlay, or any drawer
   link will toggle the drawer.
================================================================ */
(function initMobileDrawer() {
  const toggle  = document.getElementById('nav-toggle');
  const drawer  = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');
  const closeBtn= document.getElementById('nav-close');

  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);

  if (closeBtn)  closeBtn.addEventListener('click',  closeDrawer);
  if (overlay)   overlay.addEventListener('click',   closeDrawer);

  // Close drawer when any drawer link is clicked
  document.querySelectorAll('.nav__drawer-link').forEach(function(link) {
    link.addEventListener('click', closeDrawer);
  });
})();


/* ================================================================
   04. SMOOTH SCROLL
   Intercepts all <a href="#..."> clicks and scrolls smoothly to
   the target section, offset by the nav height so the section
   heading isn't hidden behind the fixed nav bar.

   To change the offset, edit NAV_OFFSET below (default: 76px).
================================================================ */
(function initSmoothScroll() {
  var NAV_OFFSET = 76; // should match --nav-height in CSS

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return; // skip bare # links

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ================================================================
   05. ACTIVE NAV LINK
   As the user scrolls, the nav link matching the current visible
   section gets the class "active-link".

   To add/remove sections from tracking, edit the SECTION_IDS array.
================================================================ */
(function initActiveLink() {
  var SECTION_IDS = ['home', 'about', 'products', 'process', 'testimonial', 'trade'];
  var NAV_OFFSET  = 100; // how many px from top triggers section as "active"

  var navLinks = document.querySelectorAll('.nav__link');

  function setActive() {
    var current = '';

    SECTION_IDS.forEach(function(id) {
      var section = document.getElementById(id);
      if (!section) return;
      if (window.scrollY >= section.offsetTop - NAV_OFFSET) {
        current = id;
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();


/* ================================================================
   06. SCROLL REVEAL
   Uses IntersectionObserver to add the class "visible" to any
   element with the class "reveal" when it enters the viewport.

   Threshold: 0.10 = element must be 10% visible to trigger.
   RootMargin: -36px bottom means it fires slightly before edge.

   To make an element reveal later (stagger), add these classes:
     .reveal--delay    → 0.12s delay
     .reveal--delay-1  → 0.18s delay
     .reveal--delay-2  → 0.26s delay
================================================================ */
(function initScrollReveal() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Fallback for old browsers that don't support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function(el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once only
      }
    });
  }, {
    threshold:  0.10,
    rootMargin: '0px 0px -36px 0px'
  });

  reveals.forEach(function(el) { observer.observe(el); });
})();


/* ================================================================
   07. SCROLL-UP BUTTON
   The back-to-top button (#scroll-up) becomes visible after the
   user scrolls 300px down the page.

   To change when it appears, edit SHOW_AFTER below.
================================================================ */
(function initScrollUp() {
  var scrollUpBtn = document.getElementById('scroll-up');
  if (!scrollUpBtn) return;

  var SHOW_AFTER = 300; // px from top before button appears

  function toggleScrollUp() {
    if (window.scrollY >= SHOW_AFTER) {
      scrollUpBtn.classList.add('scroll-up--visible');
    } else {
      scrollUpBtn.classList.remove('scroll-up--visible');
    }
  }

  window.addEventListener('scroll', toggleScrollUp, { passive: true });
  toggleScrollUp();
})();
