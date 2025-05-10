// ==========================================================================
//  Carousel JavaScript Functions
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let interval;
    
    // Funciones
    function showSlide(n) {
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Desactivar todos los indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar la diapositiva activa
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Iniciar carrusel automático
    function startCarousel() {
        interval = setInterval(nextSlide, 5000);
    }
    
    // Detener carrusel automático
    function stopCarousel() {
        clearInterval(interval);
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopCarousel();
        startCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopCarousel();
        startCarousel();
    });
    
    // Botones indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });
    
    // Pausar el carrusel al pasar el mouse
    const carouselContainer = document.querySelector('.carousel-container');
    
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
    
    // Touch events para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopCarousel();
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startCarousel();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Deslizamiento hacia la izquierda
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            // Deslizamiento hacia la derecha
            prevSlide();
        }
    }
    
    // Inicialización
    showSlide(0);
    startCarousel();
});