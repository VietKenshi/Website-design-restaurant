'use strict';

const preload = document.querySelector('[data-preload]');
const topbar = document.querySelector('.topbar');
const header = document.querySelector('.header');

window.addEventListener('load', function() {
    setTimeout(() => {
        preload.classList.add('loaded');
        document.body.classList.add('loaded');
        document.documentElement.classList.add('loaded');
    }, 5000);
});

let lastScrollY = 0;

const toggleHeaderOnScroll = function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 0) {
    topbar.classList.remove('is-hidden');
    header.classList.remove('is-hidden', 'nav-visible');
    header.style.top = '37px';
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY) {
    topbar.classList.add('is-hidden');
    header.classList.add('is-hidden');
    header.classList.remove('nav-visible');
  } else {
    topbar.classList.add('is-hidden');
    header.classList.remove('is-hidden');
    header.classList.add('nav-visible');
    header.style.top = '0';
  }

  if (currentScrollY < lastScrollY) {
    header.style.top = '0';
  }

  lastScrollY = currentScrollY;
};

window.addEventListener('scroll', toggleHeaderOnScroll, { passive: true });

/*-----Auto Slide------*/

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 13000);
}

window.addEventListener("load", autoSlide);

/*-----Motion Animation------*/

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector('.about-banner');
  if (!banner) return;

  const parallaxItems = document.querySelectorAll("[motion]");

  window.addEventListener("mousemove", function (event) {
    const rect = banner.getBoundingClientRect();

    // Check if mouse is inside the banner boundary
    const isInside = 
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInside) {
      // Smoothly reset if mouse is outside the figure
      resetParallax();
      return;
    }

    // Calculate mouse position relative to center (-1 to 1)
    let mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    let mouseY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      const speed = Number(parallaxItems[i].dataset.motionSpeed) || 10;
      
      const itemX = mouseX * speed;
      const itemY = mouseY * speed;

      parallaxItems[i].style.transform = `translate3d(${itemX}px, ${itemY}px, 0px)`;
    }
  });

  function resetParallax() {
    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      parallaxItems[i].style.transform = `translate3d(0px, 0px, 0px)`;
    }
  }
});