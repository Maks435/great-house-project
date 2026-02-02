// Get DOM elements
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const menuLinks = document.querySelectorAll(".header__menu-link");
const header = document.querySelector(".header");

// Toggle menu function
function toggleMenu() {
  burger.classList.toggle("is-active");
  nav.classList.toggle("is-open");
  document.body.classList.toggle("no-scroll");
  header.classList.toggle("no-bg");
}

// Close menu function
function closeMenu() {
  burger.classList.remove("is-active");
  nav.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  header.classList.remove("no-bg");
}

// Add click event listener to burger button
burger.addEventListener("click", toggleMenu);

// Add click event listeners to all menu links
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});