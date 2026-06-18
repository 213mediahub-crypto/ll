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
   03A. PROGRESS WIDGET
   - Updates ring progress
   - Detects current section
   - Toggles section popup
================================================================ */

(function initProgressWidget() {

  const progressRing = document.getElementById('progressRing');
  const currentSection = document.getElementById('currentSection');
  const widgetPopup = document.getElementById('widgetPopup');
  const progressCircle = document.querySelector('.progress-circle');

  if (
    !progressRing ||
    !currentSection ||
    !widgetPopup ||
    !progressCircle
  ) return;

  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  progressRing.style.strokeDasharray = circumference;
  progressRing.style.strokeDashoffset = circumference;

  function updateProgressWidget() {

    /* ==========================================
       PAGE SCROLL PROGRESS
    ========================================== */

    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percent =
      docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    const offset =
      circumference -
      (percent / 100) * circumference;

    progressRing.style.strokeDashoffset = offset;

    /* ==========================================
       CURRENT SECTION DETECTION
    ========================================== */

    const sections =
      document.querySelectorAll('section[id]');

    sections.forEach(section => {

      const top =
        section.offsetTop - 180;

      const bottom =
        top + section.offsetHeight;

      if (
        scrollTop >= top &&
        scrollTop < bottom
      ) {

        currentSection.textContent =
          section.dataset.title ||
          section.querySelector('.section__title')?.textContent ||
          section.id;

      }

    });

  }

  window.addEventListener(
    'scroll',
    updateProgressWidget,
    { passive: true }
  );

  updateProgressWidget();

  /* ==========================================
     POPUP TOGGLE
  ========================================== */

  progressCircle.addEventListener('click', () => {

    widgetPopup.classList.toggle('show');

  });

  /* ==========================================
     CLOSE POPUP WHEN CLICKING OUTSIDE
  ========================================== */

  document.addEventListener('click', (e) => {

    if (
      !progressCircle.contains(e.target) &&
      !widgetPopup.contains(e.target)
    ) {

      widgetPopup.classList.remove('show');

    }

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

// ================= TESTIMONIAL SLIDER =================

let sliderInterval;
let startX = 0;
let currentIndex = 0;
let isDragging = false;
let isMobile = window.innerWidth <= 600;

const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.querySelector(".testimonial-dots");

if (!track || !cards.length) {
  console.warn("Slider elements not found. Slider functionality will be disabled.");
}else {

let dots = [];

// ================= INIT =================
function initSlider(){

  if(!isMobile) return;

  dotsContainer.innerHTML = "";
  currentIndex = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if(i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });

    dotsContainer.appendChild(dot);
  });

  dots = document.querySelectorAll(".testimonial-dots span");

  updateSlider();
  startAutoSlide();
}

// ================= UPDATE =================
function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  if(dots[currentIndex]) dots[currentIndex].classList.add("active");
}

// ================= AUTO =================
function startAutoSlide() {
  clearInterval(sliderInterval);

  if (!isMobile) return;

  sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(sliderInterval);
}

// ================= TOUCH =================
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoSlide();
}, { passive: true });

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  let moveX = e.touches[0].clientX;
  let diff = moveX - startX;

  track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
}, { passive: true });

track.addEventListener("touchend", (e) => {
  handleSwipe(e.changedTouches[0].clientX);
});

// ================= MOUSE =================
track.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
  stopAutoSlide();
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let diff = e.clientX - startX;
  track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
});

track.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  handleSwipe(e.clientX);
});

track.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    updateSlider();
  }
});

// ================= SWIPE =================
function handleSwipe(endX){
  let diff = endX - startX;

  if (diff > 50 && currentIndex > 0) {
    currentIndex--;
  } else if (diff < -50 && currentIndex < cards.length - 1) {
    currentIndex++;
  }

  updateSlider();
  isDragging = false;
  startAutoSlide();
}

// ================= RESIZE =================
window.addEventListener("resize", () => {
  let newMobile = window.innerWidth <= 600;

  if(newMobile !== isMobile){
    isMobile = newMobile;

    if(isMobile){
      initSlider();
    } else {
      track.style.transform = "translateX(0)";
      clearInterval(sliderInterval);
      dotsContainer.innerHTML = "";
    }
  }
});

// INIT ON LOAD
if(isMobile){
  initSlider();
}
}
/* ================================================================
   07B. EXPORT DOCUMENTATION MODAL HANDLER
================================================================ */
(function initExportModal() {
  const readBtn = document.getElementById('readED');
  const modal = document.getElementById('exportsModal');
  const closeBtn = document.getElementById('closeExports');

  if (!readBtn || !modal || !closeBtn) return;

  // Open Document Modal
  readBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Stop background scrolling while reading
  });

  // Close via X button
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
  });

  // Close instantly when clicking anywhere outside the image card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
})();
