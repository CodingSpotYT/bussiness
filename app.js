document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    initAnimations();
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.2 });
                gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
            } else {
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to current button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        gsap.to(item, { display: 'block', opacity: 1, duration: 0.3 });
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            gsap.to(item, { display: 'block', opacity: 1, duration: 0.3 });
                        } else {
                            gsap.to(item, { display: 'none', opacity: 0, duration: 0.3 });
                        }
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    let slideInterval;
    
    function updateSlider() {
        if (testimonialTrack && slides.length > 0) {
            gsap.to(testimonialTrack, {
                x: `-${currentSlide * 100}%`,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    function startSlider() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            startSlider();
        });
        
        nextButton.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
            startSlider();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = index;
            updateSlider();
            startSlider();
        });
    });
    
    // Start auto-advance
    if (testimonialTrack && slides.length > 0) {
        startSlider();
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
        testimonialTrack.addEventListener('mouseleave', startSlider);
    }
    
    // Pricing Toggle Functionality
    const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
    
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            const prices = document.querySelectorAll('.plan-price');
            const priceSpans = document.querySelectorAll('.plan-price span');
            
            if (this.checked) {
                // Monthly pricing
                prices[0].innerHTML = '$99<span>/month</span>';
                prices[1].innerHTML = '$199<span>/month</span>';
                prices[2].innerHTML = '$349<span>/month</span>';
            } else {
                // One-time pricing
                prices[0].innerHTML = '$999<span>/one-time</span>';
                prices[1].innerHTML = '$1,999<span>/one-time</span>';
                prices[2].innerHTML = '$3,499<span>/one-time</span>';
            }
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('consultation-modal');
    const contactBtns = document.querySelectorAll('.contact-btn');
    const closeBtn = document.querySelector('.close-modal');
    
    function openModal() {
        // Show the modal first with display block
        modal.classList.add('active');
        modal.style.display = 'block';
        
        // Then animate the opacity
        gsap.to(modal, { 
            opacity: 1,
            duration: 0.3
        });
        
        document.body.style.overflow = 'hidden';
        
        // Animate modal content
        gsap.from('.modal-content', {
            y: -50,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
        });
    }
    
    function closeModal() {
        modal.classList.remove('active');
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Open modal
    if (contactBtns.length > 0 && modal) {
        contactBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#contact') {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                }
            });
        });
    }
    
    // Close modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Form submission handling
    const form = document.getElementById('consultation-form');
    if (form && modal) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create a success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your consultation request! We will contact you soon.';
            
            // Animate form out and success message in
            gsap.to(form, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    form.style.display = 'none';
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.appendChild(successMessage);
                        gsap.from(successMessage, {
                            opacity: 0,
                            y: 20,
                            duration: 0.4
                        });
                        
                        // Close the modal after 3 seconds
                        setTimeout(() => {
                            closeModal();
                            // Reset the form and remove success message
                            form.reset();
                            form.style.display = 'block';
                            gsap.to(form, { opacity: 1, y: 0 });
                            if (successMessage.parentNode) {
                                successMessage.parentNode.removeChild(successMessage);
                            }
                        }, 3000);
                    }
                }
            });
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (backToTopButton) {
            if (window.scrollY > 300) {
                gsap.to(backToTopButton, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3
                });
            } else {
                gsap.to(backToTopButton, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.3
                });
            }
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

function initAnimations() {
    // Check if ScrollTrigger is available
    if (typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-text h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
        
        gsap.from('.hero-text p', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        
        gsap.from('.hero-btns', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: "power3.out"
        });
        
        gsap.from('.hero-image', {
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        
        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.2)"
            });
        });
        
        // Portfolio items animation
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: "power2.out"
            });
        });
        
        // Process steps animation
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power2.out"
            });
        });
        
        // Testimonial cards animation
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        // About section animation
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-hero',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-hero',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        // Pricing cards animation
        gsap.utils.toArray('.pricing-plan').forEach((plan, i) => {
            gsap.from(plan, {
                scrollTrigger: {
                    trigger: plan,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "back.out(1.2)"
            });
        });
        
        // CTA section animation
        gsap.from('.cta', {
            scrollTrigger: {
                trigger: '.cta',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    } else {
        console.warn("ScrollTrigger not available. Basic animations will still work.");
        
        // Basic animations without ScrollTrigger
        gsap.from('.hero-text h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
        
        gsap.from('.hero-text p', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        
        gsap.from('.hero-btns', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: "power3.out"
        });
        
        gsap.from('.hero-image', {
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
    }
}
