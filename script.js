// ===== Custom Cursor =====
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .pillar-card, .summary-card, .feature-card, .timeline-content');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navigation Scroll Effect =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed nav
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation for stats
            if (entry.target.classList.contains('hero-stats')) {
                const counter = entry.target.querySelector('[data-count]');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter, parseInt(counter.dataset.count));
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.summary-card, .pillar-card, .feature-card, .timeline-item, .personality-card, .inspiration-card, .voice-examples').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Observe hero stats for counter animation
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// ===== Lemon Dude Speech Bubble =====
const lemonQuotes = [
    "Hydrate or diedrate, bestie 💅",
    "Your ex moved on but you still haven't tried our new mango series?",
    "POV: You're dehydrated and making bad decisions 🍵",
    "Touch grass? I AM the grass. Well, technically a fruit.",
    "Not me watching you scroll past without getting boba 👀",
    "Main character energy requires main character hydration",
    "The only green flag you need is our matcha 💚",
    "It's giving... dehydrated 💀",
    "Your skin is begging. I'm just saying.",
    "We're not regular boba. We're cool boba. 😎"
];

const quoteElement = document.getElementById('lemonQuote');
let currentQuoteIndex = 0;

function changeQuote() {
    if (quoteElement) {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % lemonQuotes.length;
            quoteElement.textContent = lemonQuotes[currentQuoteIndex];
            quoteElement.style.opacity = '1';
        }, 300);
    }
}

// Change quote every 4 seconds
setInterval(changeQuote, 4000);

// ===== Parallax Effect for Hero Lemons =====
const heroSection = document.querySelector('.hero');
const lemons = document.querySelectorAll('.lemon-float');

if (heroSection && lemons.length) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled < heroHeight) {
            lemons.forEach((lemon, index) => {
                const speed = 0.2 + (index * 0.1);
                lemon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
            });
        }
    });
}

// ===== Door Hover Effect =====
const door = document.querySelector('.door');
if (door) {
    door.addEventListener('click', () => {
        door.style.transform = 'rotateY(-90deg)';
        setTimeout(() => {
            door.style.transform = 'rotateY(0)';
        }, 1000);
    });
}

// ===== Pillar Cards Stagger Animation =====
const pillarCards = document.querySelectorAll('.pillar-card');
pillarCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Active Section Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Bubble Tea Animation (Easter Egg) =====
let clickCount = 0;
const logoIcon = document.querySelector('.logo-icon');

if (logoIcon) {
    logoIcon.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            createBubbleRain();
            clickCount = 0;
        }
    });
}

function createBubbleRain() {
    const colors = ['#FEDB00', '#002F6D', '#E30B5C', '#4CAF50'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.style.cssText = `
                position: fixed;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: -50px;
                z-index: 9999;
                pointer-events: none;
                animation: fallDown ${Math.random() * 2 + 2}s ease-in forwards;
            `;
            document.body.appendChild(bubble);

            setTimeout(() => bubble.remove(), 4000);
        }, i * 100);
    }
}

// Add keyframe animation for bubble rain
const style = document.createElement('style');
style.textContent = `
    @keyframes fallDown {
        to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');

    // Preload critical animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ===== Performance: Debounce scroll events =====
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Apply debounce to scroll handlers for better performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations are handled here
}, 16));
