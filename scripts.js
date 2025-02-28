
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
            navbar.classList.add('bg-transparent');
        }
    });
    
    // Activity slider functionality
    const sliderTrack = document.getElementById('slider-track');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const indicators = document.querySelectorAll('#slider-indicators button');
    
    let currentIndex = 0;
    let isAnimating = false;
    let visibleSlides = getVisibleSlides();
    
    function getVisibleSlides() {
        if (window.innerWidth >= 1280) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Set initial slider item widths
    function updateSliderItemWidths() {
        visibleSlides = getVisibleSlides();
        const slideWidth = 100 / visibleSlides;
        
        const slideItems = document.querySelectorAll('#slider-track > div');
        slideItems.forEach(item => {
            item.style.flex = `0 0 ${slideWidth}%`;
        });
    }
    
    // Initialize slider
    updateSliderItemWidths();
    
    // Handle window resize for slider
    window.addEventListener('resize', function() {
        updateSliderItemWidths();
        
        // Re-calculate max index and update UI
        const maxIndex = document.querySelectorAll('#slider-track > div').length - visibleSlides;
        
        // Make sure current index is still valid
        if (currentIndex > maxIndex) {
            goToSlide(maxIndex);
        } else {
            updateSliderPosition();
        }
        
        // Update prev/next button states
        updateButtonStates();
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', function() {
        if (isAnimating || currentIndex === 0) return;
        goToSlide(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', function() {
        const maxIndex = document.querySelectorAll('#slider-track > div').length - visibleSlides;
        if (isAnimating || currentIndex >= maxIndex) return;
        goToSlide(currentIndex + 1);
    });
    
    // Indicator buttons
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            if (isAnimating) return;
            goToSlide(index);
        });
    });
    
    function goToSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = index;
        
        updateSliderPosition();
        updateIndicators();
        updateButtonStates();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function updateSliderPosition() {
        const translateValue = -currentIndex * (100 / visibleSlides);
        sliderTrack.style.transform = `translateX(${translateValue}%)`;
    }
    
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('w-6', 'bg-autism-purple');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.remove('w-6', 'bg-autism-purple');
                indicator.classList.add('bg-gray-300', 'w-2.5');
            }
        });
    }
    
    function updateButtonStates() {
        const maxIndex = document.querySelectorAll('#slider-track > div').length - visibleSlides;
        
        if (currentIndex === 0) {
            prevButton.classList.add('opacity-50', 'cursor-not-allowed');
            prevButton.classList.remove('opacity-100', 'hover:bg-gray-50');
        } else {
            prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
            prevButton.classList.add('opacity-100', 'hover:bg-gray-50');
        }
        
        if (currentIndex >= maxIndex) {
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
            nextButton.classList.remove('opacity-100', 'hover:bg-gray-50');
        } else {
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
            nextButton.classList.add('opacity-100', 'hover:bg-gray-50');
        }
    }
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image');
            const overlay = this.querySelector('.product-overlay');
            
            if (image) image.classList.add('scale-105');
            if (overlay) overlay.classList.add('bg-opacity-10');
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image');
            const overlay = this.querySelector('.product-overlay');
            
            if (image) image.classList.remove('scale-105');
            if (overlay) overlay.classList.remove('bg-opacity-10');
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        // Remove the class initially to prevent it from animating before observed
        el.classList.remove('animate-fade-in');
        observer.observe(el);
    });
});
