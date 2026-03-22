/*=============== CHANGE BACKGROUND HEADER ===============*/
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  window.scrollY >= 50
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  window.scrollY >= 350
    ? scrollUpBtn.classList.add('show-scroll')
    : scrollUpBtn.classList.remove('show-scroll');
});

/*=============== NAV TOGGLE =================*/
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

/* Open / Close menu */
toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

/* Auto close menu on click */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
  });
});

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute('id');

    const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link?.classList.add('active-link');
    } else {
      link?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
  reset: false
});

sr.reveal('.home__content, .products__data, .steps__content, .footer__container');
sr.reveal('.home__image', { origin: 'bottom' });
sr.reveal('.products__card', { interval: 100 });
sr.reveal('.about__img, .testimonial__img', { origin: 'right' });
sr.reveal('.about__data, .testimonial__data', { origin: 'left' });

/*=============== ACCORDION ===============*/
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(button => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    panel.style.display =
      panel.style.display === "block" ? "none" : "block";
  });
});