const slides = document.getElementsByClassName("carousel-item");
const slideNumbers = document.getElementsByClassName("slide-number");
let currentSlide = 0;
const totalSlides = slides.length;

window.onload = () => {
  setInterval(() => {
    showNextSlide();
  }, 4000);
};

const showSlideNumber = () => {
  slideNumbers[currentSlide].textContent = `${currentSlide + 1}`;
};

const hideAllSlides = () => {
  for (let slide of slides) {
    slide.classList.remove("carousel-item-visible");
  }
};

const showNextSlide = () => {
  hideAllSlides();

  if (currentSlide === totalSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides[currentSlide].classList.add("carousel-item-visible");

  showSlideNumber();
};

const showPrevSlide = () => {
  hideAllSlides();

  if (currentSlide === 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide--;
  }

  slides[currentSlide].classList.add("carousel-item-visible");

  showSlideNumber();
};

document.getElementById("next-slide").addEventListener("click", showNextSlide);
document.getElementById("prev-slide").addEventListener("click", showPrevSlide);
