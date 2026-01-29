// ===================================
// MODERN ANIMATED PORTFOLIO
// JavaScript for Interactions & Animations
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Loading Screen
// ===================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// ===================================
// Navigation
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Typing Animation
// ===================================
const typingText = document.getElementById('typingText');
const texts = [
    'Graphic Designer',
    'Brand Identity Designer',
    'UI/UX Designer',
    'Creative Designer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
}

// Start typing animation
setTimeout(type, 1000);

// ===================================
// Hero Stats Counter Animation
// ===================================
const heroCounters = document.querySelectorAll('.counter-hero');

function animateHeroCounters() {
    heroCounters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Start hero counter animation after page load
setTimeout(animateHeroCounters, 500);

// ===================================
// Counter Animation
// ===================================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when in view
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about');
    if (!counterAnimated && aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (aboutPosition < screenPosition) {
            animateCounters();
            counterAnimated = true;
        }
    }
});

// ===================================
// Skills Progress Bars
// ===================================
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkills() {
    skillBars.forEach(bar => {
        const progressLine = bar.querySelector('.progress-line');
        const progress = progressLine.getAttribute('data-progress');

        if (!bar.classList.contains('visible')) {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (barPosition < screenPosition) {
                bar.classList.add('visible');
                progressLine.style.setProperty('--progress-width', progress + '%');
            }
        }
    });
}

window.addEventListener('scroll', animateSkills);

// ===================================
// Portfolio Filter
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hide');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// ===================================
// Contact Form
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (name && email && subject && message) {
        // Construct the email body with all form information
        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        // Create mailto link with recipient, subject, and body
        const mailtoLink = `mailto:nityasritammina04@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

        // Open the user's email client with pre-filled information
        window.location.href = mailtoLink;

        // Show success message
        setTimeout(() => {
            alert('Your email client has been opened with the message. Please click send to complete.');
            contactForm.reset();
        }, 500);
    } else {
        alert('Please fill in all fields.');
    }
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Parallax Effect for Hero Background
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// Add Fade In Animation
// ===================================
const fadeInElements = document.querySelectorAll('[data-aos]');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
}

// ===================================
// Prevent Default on Empty Links
// ===================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #64748b;');
