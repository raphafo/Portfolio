/**
 * Portfolio JavaScript - Ingrid Raphaela
 * Gestion des interactions et animations du portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const headerToggle = document.querySelector('.header-toggle');
    const header = document.querySelector('.header');
    
    if (headerToggle) {
        headerToggle.addEventListener('click', function() {
            header.classList.toggle('header-show');
        });

        // Fermer le menu mobile quand on clique sur un lien
        const navLinks = document.querySelectorAll('.navmenu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('header-show');
            });
        });

        // Fermer le menu mobile quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && !headerToggle.contains(e.target)) {
                header.classList.remove('header-show');
            }
        });
    }

    // ========================================
    // Smooth Scrolling for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - (window.innerWidth <= 1199 ? 20 : 0);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
    
    function setActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(setActiveNav, 100));

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animation spéciale pour les éléments avec délai
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Skills Animation (Progress Bars)
    // ========================================
    const skillsSection = document.querySelector('.skills-animation');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animer chaque barre de progression avec un délai
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const value = bar.getAttribute('aria-valuenow');
                        bar.style.width = value + '%';
                        
                        // Ajouter l'effet shimmer
                        setTimeout(() => {
                            bar.classList.add('shimmer-effect');
                        }, 1000);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ========================================
    // Typing Animation Effect
    // ========================================
    const typed = document.querySelector('.typed');
    if (typed) {
        const words = ['Étudiante', 'Développeuse', 'Artisane du code'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typed.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typed.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Curseur clignotant
            typed.style.borderRight = '2px solid white';
            setTimeout(() => {
                typed.style.borderRight = '2px solid transparent';
            }, 500);

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        // Démarrer l'effet de frappe après un délai
        setTimeout(typeEffect, 1000);
    }

    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    const heroImage = document.querySelector('.hero img');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        if (heroImage) {
            const speed = scrolled * 0.5;
            heroImage.style.transform = `translateY(${speed}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ========================================
    // Interactive Hover Effects
    // ========================================
    
    // Cartes de projets
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(155, 89, 182, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.1)';
        });
    });

    // Items de résumé
    document.querySelectorAll('.resume-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(155, 89, 182, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.1)';
        });
    });

    // Items de contact
    document.querySelectorAll('.info-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(155, 89, 182, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.1)';
        });
    });

    // ========================================
    // Smooth Progress Bar Animation
    // ========================================
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.setProperty('--progress-width', value + '%');
    });

    // ========================================
    // Loading Animation
    // ========================================
    function showLoadingComplete() {
        document.body.classList.add('loaded');
        
        // Animer l'apparition des éléments de la hero section
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero h2, .hero p');
            heroElements.forEach((el, index) => {
                el.style.animationDelay = (index * 0.3) + 's';
                el.classList.add('fade-in-up');
            });
        }, 100);
    }

    // Déclencher l'animation de chargement complet
    window.addEventListener('load', showLoadingComplete);

    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #9b59b6 0%, #e8c5e8 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(155, 89, 182, 0.3);
    `;

    document.body.appendChild(scrollTopBtn);

    // Afficher/masquer le bouton selon la position de scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }, 100));

    // Action du bouton scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Effet hover pour le bouton
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.3)';
    });

    // ========================================
    // Counter Animation pour les statistiques
    // ========================================
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }

    // Observer pour déclencher les counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================================
    // Formulaire de Contact (si présent)
    // ========================================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de soumission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simuler l'envoi (remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = '#2ecc71';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // ========================================
    // Animation des badges de technologie
    // ========================================
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateY(10deg)';
            this.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.3)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = 'none';
        });

        // Animation d'apparition décalée
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(badge);
    });

    // ========================================
    // Gestion des liens externes
    // ========================================
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hostname === window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Ajouter une icône pour les liens externes
            const icon = document.createElement('i');
            icon.className = 'bi bi-box-arrow-up-right ms-1';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });

    // ========================================
    // Mode sombre/clair (optionnel)
    // ========================================
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 80px;
            width: 45px;
            height: 45px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 1000;
        `;

        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
            
            // Sauvegarder la préférence
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Charger la préférence sauvegardée
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        }
    }

    // Créer le toggle de thème (optionnel)
    // createThemeToggle();

    // ========================================
    // Preloader (si présent)
    // ========================================
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
    }

    // ========================================
    // Animation des icônes au scroll
    // ========================================
    const icons = document.querySelectorAll('.project-icon, .info-item .icon, .interests .fs-2');
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounceIn 1s ease';
                iconObserver.unobserve(entry.target);
            }
        });
    });

    icons.forEach(icon => {
        iconObserver.observe(icon);
    });

    // ========================================
    // Gestion des erreurs d'images
    // ========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image non trouvée:', this.src);
        });
    });

    // ========================================
    // Performance: Lazy loading pour les images non critiques
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ========================================
    // Initialisation finale
    // ========================================
    console.log('Portfolio chargé avec succès ! 🎉');
    
    // Déclencher l'animation initiale
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

});

// ========================================
// Fonctions utilitaires
// ========================================

/**
 * Fonction de throttle pour optimiser les performances
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Délai en millisecondes
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Fonction de debounce pour optimiser les performances
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai d'attente en millisecondes
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Fonction pour animer un élément avec une classe CSS
 * @param {Element} element - Élément à animer
 * @param {string} animationClass - Classe d'animation à ajouter
 */
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    }, { once: true });
}

/**
 * Fonction pour vérifier si un élément est visible dans le viewport
 * @param {Element} element - Élément à vérifier
 * @return {boolean} - True si l'élément est visible
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// Gestion des événements globaux
// ========================================

// Empêcher le zoom sur double-tap sur mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Gestion du redimensionnement de fenêtre
window.addEventListener('resize', debounce(() => {
    // Recalculer les positions si nécessaire
    setActiveNav();
}, 250));

// Gestion de la visibilité de la page
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page redevient visible - reprendre les animations si nécessaire
        console.log('Page visible');
    }
});