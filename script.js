/* ===================================
   JavaScript for Portfolio Website
   Handles: Navigation, Scroll effects, 
   Animations, Mobile menu
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Navigation Functionality
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navbar on scroll with style change
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active section highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavOnScroll = () => {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // ===================================
    // Back to Top Button
    // ===================================
    
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // Scroll Reveal Animations
    // ===================================
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal for performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add reveal-on-scroll class to elements
    const revealElements = document.querySelectorAll(
        '.about-card, .feature-card, .tech-category, .gallery-item, .team-member, ' +
        '.future-card, .challenges-block, .architecture-diagram'
    );
    
    revealElements.forEach(element => {
        element.classList.add('reveal-on-scroll');
        revealOnScroll.observe(element);
    });
    
    // ===================================
    // Dynamic Number Counter Animation
    // ===================================
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Animate hero stats when visible
    const heroStats = document.querySelector('.hero-stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number) && number > 0) {
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, number, 1500);
                        }, 300);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // ===================================
    // Add Hover Effects to Cards
    // ===================================
    
    const cards = document.querySelectorAll(
        '.about-card, .feature-card, .tech-category, .team-member, ' +
        '.future-card, .gallery-item'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
    
    // ===================================
    // Parallax Effect for Hero Orbs
    // ===================================
    
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.05;
            const x = (window.innerWidth / 2 - e.clientX) * speed;
            const y = (window.innerHeight / 2 - e.clientY) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ===================================
    // Smooth Scroll Behavior for All Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or "#demo"
            if (href === '#' || href === '#demo') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Add Animation Delays to Grid Items
    // ===================================
    
    const addStaggeredAnimation = (selector, baseDelay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * baseDelay}ms`;
        });
    };
    
    // Apply staggered animations
    addStaggeredAnimation('.feature-card', 150);
    addStaggeredAnimation('.tech-item', 50);
    addStaggeredAnimation('.team-member', 100);
    
    // ===================================
    // Image Gallery Modal (Optional Enhancement)
    // ===================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Placeholder for modal functionality
            // You can add a lightbox/modal here to display images in full size
            console.log('Gallery item clicked - implement modal if needed');
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
    });
    
    // ===================================
    // Form Validation (if you add a contact form)
    // ===================================
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    // Example form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea');
            
            if (!validateEmail(email.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (message.value.trim().length < 10) {
                alert('Please enter a message with at least 10 characters');
                return;
            }
            
            // Submit form or send via AJAX
            console.log('Form submitted successfully');
            contactForm.reset();
        });
    }
    
    // ===================================
    // Dark Mode Toggle (Optional Feature)
    // ===================================
    
    const createDarkModeToggle = () => {
        const darkModeBtn = document.createElement('button');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeBtn.className = 'dark-mode-toggle';
        darkModeBtn.setAttribute('aria-label', 'Toggle dark mode');
        
        // Add styles for the button
        darkModeBtn.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-accent);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            box-shadow: var(--shadow-md);
            z-index: 999;
            transition: var(--transition-base);
        `;
        
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeBtn.querySelector('i');
            
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        
        // Uncomment to enable dark mode toggle
        // document.body.appendChild(darkModeBtn);
    };
    
    // Call this if you want dark mode functionality
    // createDarkModeToggle();
    
    // ===================================
    // Performance: Lazy Load Images
    // ===================================
    
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    lazyLoadImages();
    
    // ===================================
    // Accessibility: Keyboard Navigation
    // ===================================
    
    // Add keyboard support for interactive elements
    document.querySelectorAll('.gallery-item, .team-member, .feature-card').forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // ===================================
    // Console Message
    // ===================================
    
    console.log('%c🚀 Portfolio Website Ready!', 'color: #0f4c75; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ by the team', 'color: #666; font-size: 14px;');
    console.log('%cGitHub Pages Ready ✓', 'color: #2ecc71; font-size: 14px;');
    
    // ===================================
    // Analytics & Tracking (Optional)
    // ===================================
    
    // Track button clicks
    const trackButtonClick = (buttonName) => {
        console.log(`Button clicked: ${buttonName}`);
        // Add Google Analytics or other tracking here
        // Example: gtag('event', 'click', { 'button_name': buttonName });
    };
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackButtonClick(buttonText);
        });
    });
    
    // ===================================
    // Page Load Performance
    // ===================================
    
    window.addEventListener('load', () => {
        // Log page load time
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Remove loading class if present
        document.body.classList.add('loaded');
    });
    
    // ===================================
    // Utility: Debounce Function
    // ===================================
    
    const debounce = (func, wait = 10, immediate = true) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    
    // Use debounce for scroll events for better performance
    const debouncedScrollHandler = debounce(() => {
        highlightNavOnScroll();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ===================================
    // Easter Egg: Konami Code
    // ===================================
    
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                           'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                           'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            console.log('%c🎉 KONAMI CODE ACTIVATED!', 'color: gold; font-size: 30px; font-weight: bold;');
            // Add fun effect here
            document.body.style.animation = 'rainbow 2s infinite';
        }
    });
    
    // ===================================
    // Responsive: Update Layout on Resize
    // ===================================
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-calculate positions or refresh layout if needed
            console.log('Window resized');
            
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }, 250);
    });
    
    // ===================================
    // Initialize Everything
    // ===================================
    
    console.log('All scripts initialized successfully! 🎯');
});

// ===================================
// Service Worker for PWA (Optional)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
