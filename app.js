document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Transform hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
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
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonialTrack = document.getElementById('testimonial-track');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function updateSlider() {
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = dots.length - 1; // Loop to last slide
            }
            updateSlider();
        });
        
        nextButton.addEventListener('click', function() {
            if (currentSlide < dots.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop to first slide
            }
            updateSlider();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-advance testimonials every 5 seconds
    setInterval(function() {
        if (testimonialTrack) {
            if (currentSlide < dots.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }
    }, 5000);
    
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
    
    // Consultation Modal Functionality
    const modal = document.getElementById('consultation-modal');
    const contactBtns = document.querySelectorAll('.contact-btn');
    const closeBtn = document.querySelector('.close-modal');
    
// Enhanced modal functionality
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Force reflow to trigger animations
    modal.offsetWidth;
    
    modal.style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
}

function closeModal() {
    modal.style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    
    setTimeout(function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300); // Match the transition duration in CSS
}

    // Open modal
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Form submission handling
    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to your server
            // For now, we'll just show an alert and close the modal
            alert('Thank you for your consultation request! We will contact you soon.');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
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
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-slide-up');
    
    function checkInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('appear');
            }
        });
    }
    
    // Check elements on load
    checkInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkInView);
});
// Modal functionality
const modal = document.getElementById('consultation-modal');
const contactBtns = document.querySelectorAll('.contact-btn');
const closeBtn = document.querySelector('.close-modal');

// Open modal when any contact button is clicked
contactBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close modal when X is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling
const form = document.getElementById('consultation-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message and close the modal
        
        // Create a success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your consultation request! We will contact you soon.';
        
        // Replace the form with the success message
        form.parentNode.replaceChild(successMessage, form);
        
        // Close the modal after 3 seconds
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset the form and remove success message
            form.reset();
            successMessage.parentNode.replaceChild(form, successMessage);
        }, 3000);
    });
}