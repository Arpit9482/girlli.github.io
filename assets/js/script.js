"use strict";

/* Preload page removal and addition */

/* Preload page gets removed as soon as loaded is added to the div */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  setTimeout(() => {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  }, 1500);
});

/* Adding event Listener to multiple elements */

const addEventOnELements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/* Navbar */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnELements(navTogglers, "click", toggleNavbar);

/* HEADER */

const header = document.querySelector("[data-header]");
let lastScrollPos = 0;

const hideheader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideheader();
  } else {
    header.classList.remove("active");
  }
});

/* HERO SLIDER MOST IMPORTANT */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currSlidePos = 0;
let lastHeroSliderActive = heroSliderItems[0];

const updateSliders = function () {
  lastHeroSliderActive.classList.remove("active");
  heroSliderItems[currSlidePos].classList.add("active");
  lastHeroSliderActive = heroSliderItems[currSlidePos];
};

const slideNext = function () {
  if (currSlidePos >= heroSliderItems.length - 1) {
    currSlidePos = 0;
  } else {
    currSlidePos++;
  }

  updateSliders();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currSlidePos <= 0) {
    currSlidePos = heroSliderItems.length - 1;
  } else {
    currSlidePos--;
  }

  updateSliders();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/* Auto Slide */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnELements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnELements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/* About Section Parallex Effect */

const parallexItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reserve the numbers like 20->-20 , 5->-5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallexItems.length; i < len; i++) {
    x = x * Number(parallexItems[i].dataset.parallexSpeed);
    y = y * Number(parallexItems[i].dataset.parallexSpeed);
    parallexItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
