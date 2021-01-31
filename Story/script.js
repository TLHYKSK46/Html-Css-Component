const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".right-btn");
const previousButton = document.querySelector(".left-btn");
const buttons = document.querySelectorAll(".story-status");
const overlay = document.querySelector(".overlay");
const overlayImage = document.querySelector(".overlay-inner img");

const slides = [...carousel.children];
let slideWidth = slides[0].getBoundingClientRect().width;

function positionSlides(slides) {
  for (let index = 0; index < slides.length; index++) {
    slides[index].style.left = slideWidth * index + "px";
  }
}
positionSlides(slides);
nextButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(carousel, currentSlide, nextSlide);
  hideButton(nextSlide, slides);
});
previousButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const previousSlide = currentSlide.previousElementSibling;
  moveToSlide(carousel, currentSlide, previousSlide);
  hideButton(previousSlide, slides);
});
function moveToSlide(carousel, currentSlide, targetSlide) {
  const position = targetSlide.style.left;
  carousel.style.transform = `translateX(-${position})`;
  toggleActive(currentSlide, targetSlide);
}
function toggleActive(current, target) {
  current.classList.remove("active");
  target.classList.add("active");
}
function hideButton(targetSlide, slides) {
  if (targetSlide === slides[0]) {
    previousButton.classList.add("hide");
    nextButton.classList.remove("hide");
  } else if (targetSlide === slides[slides.length - 1]) {
    nextButton.classList.add("hide");
    previousButton.classList.remove("hide");
  } else {
    nextButton.classList.remove("hide");
    previousButton.classList.remove("hide");
  }
}
function findIndex(item, items) {
  for (let index = 0; index < items.length; index++) {
    if (item === items[index]) {
      return index;
    }
  }
}

function open(e) {
  overlay.style.display = "grid";
  overlay.classList.add("open");
  const src = e.currentTarget.querySelector("img").src;
  overlayImage.src = src;
}
function close() {
  overlay.classList.remove("open");
  overlay.style.display = "none";
}
buttons.forEach((button) => button.addEventListener("click", open));
overlay.addEventListener("click", close);
