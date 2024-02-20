class Carousel {
    constructor(slides, parentElement) {
        this.slides = slides;
        this.parentElement = parentElement;
        this.index = 0;
        this.intervalId = null;
        this.render();
        this.startAutoSlide();
    }

render() {
    this.carouselElement = document.createElement('div');
    this.carouselElement.classList.add('carousel');

    // Création d'une nouvelle div pour contenir toutes les diapositives
    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('slides-container');

    this.slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.style.display = 'flex'; // Ajout de Flexbox
        slideElement.style.background = `url(${slide.background}) no-repeat center center/cover`; // Ajout de l'image de fond
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="Slide ${index + 1}" style="width: 50%;"> <!-- Image à gauche -->
            <div class="text-content" style="width: 50%;"> <!-- Texte à droite -->
                <h2>${slide.title}</h2>
                <h3>${slide.subtitle}</h3>
                <p>${slide.text}</p>
            </div>
        `;
        slidesContainer.appendChild(slideElement); // Ajout de la diapositive au conteneur de diapositives
    });

    this.carouselElement.appendChild(slidesContainer); // Ajout du conteneur de diapositives au carrousel

    // Ajout des boutons de navigation
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('prev-button');
    this.carouselElement.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('next-button');
    this.carouselElement.appendChild(nextButton);

    // Ajout de la pagination
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');
    this.slides.forEach((slide, index) => {
        const paginationDot = document.createElement('div');
        paginationDot.classList.add('pagination-dot');
        paginationDot.dataset.index = index;
        paginationContainer.appendChild(paginationDot);
    });
    this.carouselElement.appendChild(paginationContainer);

    this.parentElement.appendChild(this.carouselElement);
    this.slideElements = this.carouselElement.querySelectorAll('.slide');
    this.showSlide(this.index);

    // Ajout des écouteurs d'événements pour les boutons de navigation
    prevButton.addEventListener('click', () => this.prevSlide());
    nextButton.addEventListener('click', () => this.nextSlide());
    this.carouselElement.addEventListener('mouseover', () => this.stopAutoSlide());
    this.carouselElement.addEventListener('mouseout', () => this.startAutoSlide());
}
showSlide(i) {
    this.slideElements.forEach((slide, index) => {
        slide.style.display = (index === i) ? 'flex' : 'none';
        // Mise à jour de la pagination
        const paginationDots = this.carouselElement.querySelectorAll('.pagination-dot');
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === i);
        });
    });
    this.index = i;
}

    nextSlide() {
        this.showSlide((this.index + 1) % this.slideElements.length);
    }

    prevSlide() {
        this.showSlide((this.index - 1 + this.slideElements.length) % this.slideElements.length);
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => this.nextSlide(), 2000);
    }

    stopAutoSlide() {
        clearInterval(this.intervalId);
    }
}

const slides = [
    { image: 'assets/img/person-1.jpg.png', title: 'Incredible service', subtitle: 'John Doe', text: 'Project Manager', background: 'assets/img/background-1.jpg' },
    { image: 'assets/img/person-2.jpg.png', title: 'Amazing customer support', subtitle: 'Jane Doe', text: 'Product Manager', background: 'assets/img/background-2.jpg' },
    { image: 'assets/img/person-3.jpg.png', title: 'Great team', subtitle: 'Jim Doe', text: 'Developer', background: 'assets/img/background-3.jpg' },
];

const carousel = new Carousel(slides, document.body);