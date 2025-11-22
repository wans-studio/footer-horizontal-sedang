// ===========================
// Intersection Observer for Footer Animation
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready! Footer animation initialized.');
    
    const footer = document.getElementById('footer');
    
    // Create Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of footer is visible
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class when footer enters viewport
                entry.target.classList.add('footer-visible');
                
                // Optional: Unobserve after animation triggers once
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Start observing the footer
    if (footer) {
        observer.observe(footer);
    }
    
    // ===========================
    // Newsletter Form Handler
    // ===========================
    const newsletterForm = document.querySelector('footer button');
    const emailInput = document.querySelector('footer input[type="email"]');
    
    if (newsletterForm && emailInput) {
        newsletterForm.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Mohon masukkan alamat email Anda.');
                emailInput.focus();
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Mohon masukkan alamat email yang valid.');
                emailInput.focus();
                return;
            }
            
            // Success message
            alert(`Terima kasih! Email ${email} telah berhasil didaftarkan untuk newsletter kami.`);
            emailInput.value = '';
            
            // Add success animation
            newsletterForm.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                newsletterForm.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }, 2000);
        });
        
        // Allow Enter key to submit
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterForm.click();
            }
        });
    }
    
    // ===========================
    // Smooth Scroll for Internal Links
    // ===========================
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle non-empty hash links
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===========================
    // Add Ripple Effect on Social Icons Click
    // ===========================
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS dynamically
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===========================
    // Performance: Debounce Scroll Events
    // ===========================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            // Add any scroll-based functionality here
            const scrollPosition = window.scrollY;
            
            // Example: Add shadow to footer when scrolled
            if (scrollPosition > 100) {
                footer.style.boxShadow = '0 -5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                footer.style.boxShadow = 'none';
            }
        });
    });
    
    // ===========================
    // Console Welcome Message
    // ===========================
    console.log('%c🎉 Professional Footer Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cFeatures: Gradient Background, Hover Effects, Scroll Animations, Responsive Design', 'color: #764ba2; font-size: 12px;');
});