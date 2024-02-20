let index = 0;
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const carousel = document.querySelector('.carousel');

let intervalId;

function showSlide(i) {
    slides.forEach((slide, index) => {
        slide.style.display = index === i ? 'block' : 'none';
    });
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 2000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);
carousel.addEventListener('mouseover', stopAutoSlide);
carousel.addEventListener('mouseout', startAutoSlide);

startAutoSlide();
showSlide(index);