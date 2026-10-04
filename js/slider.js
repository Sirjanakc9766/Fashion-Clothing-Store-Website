// slider.js — small banner slider for the homepage hero.
// Auto-advances every 5 seconds; arrows and dots also work.

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
  restartAutoSlide();
}

function goToSlide(index) {
  showSlide(index);
  restartAutoSlide();
}

function restartAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dotsBox = document.getElementById("slider-dots");
  if (!slides.length || !dotsBox) return;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.onclick = () => goToSlide(i);
    dotsBox.appendChild(dot);
  });

  restartAutoSlide();
});