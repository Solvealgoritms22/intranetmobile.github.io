let currentIndex = 0;
let slidesData = [];
let carouselInterval;
let isCarouselActive = true;

document.addEventListener("DOMContentLoaded", function() {
    fetch('jsonslide.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(jsonData => {
            slidesData = jsonData.slides;
            setupCarousel();
            startCarousel();
            addClickHandler();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});


function setupCarousel() {
    updateSlideContent();
    createDots();
}

function createDots() {
    let dotsContainer = document.querySelector('.owl-dots');
    let numberOfDots = slidesData.length > 6 ? 6 : slidesData.length;

    for (let i = 0; i < numberOfDots; i++) {
        let dot = document.createElement('button');
        dot.className = 'owl-dot' + (i === 0 ? ' active' : '');
        dot.innerHTML = '<span></span>';
        dot.addEventListener('click', () => navigateToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Añadir un botón '+' si hay más de 6 slides
    if (slidesData.length > 6) {
        let moreDots = document.createElement('button');
        moreDots.className = 'owl-dot more-dots';
        moreDots.innerHTML = '+';
        // Opcional: Aquí puedes agregar un manejador de eventos para 'moreDots'
        dotsContainer.appendChild(moreDots);
    }
}


function navigateToSlide(index) {
    currentIndex = index;
    updateSlideContent();
    updateDots();
}

function updateDots() {
    let dots = document.querySelectorAll('.owl-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}


function startCarousel() {
    carouselInterval = setInterval(nextSlide, 6000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

function toggleCarousel() {
    if (isCarouselActive) {
        stopCarousel();
    } else {
        startCarousel();
    }
    isCarouselActive = !isCarouselActive;
}

function addClickHandler() {
    let carouselImage = document.querySelector('.carousel-background');
    if (carouselImage) {
        carouselImage.addEventListener('click', toggleCarousel);
    }
}

function updateSlideContent() {
    let carouselImage = document.querySelector('.carousel-background');
    let carouselContent = document.querySelector('.carousel-content h1');
    let carouselButton = document.querySelector('.carousel-content button');

    if (carouselImage && carouselContent && carouselButton) {
        let slide = slidesData[currentIndex];
        carouselImage.style.backgroundImage = `url(${slide.image})`;

        // Comprobar si el ancho de la pantalla está entre 280px y 600px
        if (window.matchMedia("(min-width: 280px) and (max-width: 600px)").matches) {
            displayTitle = slide.title.length > 70 ? slide.title.substring(0, 70) + '...' : slide.title;
        } else {
            displayTitle = slide.title;
        }
        carouselContent.textContent = displayTitle;

        if (slide.title.length > 70) {
            let tooltipText = slide.title.length > 48 
                ? slide.title.substring(0, 48) + '\n' + slide.title.substring(48) 
                : slide.title;
            carouselContent.setAttribute('data-tooltip', tooltipText);
            carouselContent.classList.add('has-tooltip');
            carouselContent.onclick = function() {
                this.classList.toggle('show-tooltip');
            };
        } else {
            carouselContent.removeAttribute('data-tooltip');
            carouselContent.classList.remove('has-tooltip');
            carouselContent.onclick = null;
        }

        carouselButton.textContent = slide.linkText;
        carouselButton.onclick = function() {
            window.open(slide.link, '_blank');
        };
    }
	updateDots(); // Actualiza los puntos
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesData.length;
    updateSlideContent();
}
