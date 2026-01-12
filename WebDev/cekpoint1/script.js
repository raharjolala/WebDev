// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const interactiveElements = document.querySelectorAll('a, button, .starlight-card, .tech-badge, .social-link, .nav-link, .starlight-btn, .profile-img, .skill-bar-container, .contact-item, .footer-logo, .hero-description, .section-title, .section-subtitle, .card-title, .skill-name, .skill-percentage, .starlight-btn-outline, .project-link, .info-item, .tech-icon, .soft-skill-item, .language-item');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 300, fill: "forwards"});
});

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorOutline.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
    });
});

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter on load
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.typed-text');
    const words = ["Software Engineering Student", "Web Developer", "UI/UX Designer", "Tech Enthusiast"];
    const wait = 2000;
    
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
    
    // Add cursor blinking animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.classList.toggle('blink');
        }, 500);
    }
});

// Interactive Stars
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(3)';
        this.style.opacity = '1';
        this.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
        
        setTimeout(() => {
            this.style.animation = 'twinkle 5s infinite';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 10px white';
        }, 500);
        
        createParticle(this.getBoundingClientRect().left + 5, this.getBoundingClientRect().top + 5);
    });
});

// Interactive Sparkles
const sparkles = document.querySelectorAll('.sparkle');
sparkles.forEach(sparkle => {
    sparkle.addEventListener('click', function() {
        const sparkleClone = this.cloneNode(true);
        sparkleClone.style.position = 'fixed';
        sparkleClone.style.animation = 'sparkleFloat 2s forwards';
        document.body.appendChild(sparkleClone);
        
        setTimeout(() => {
            sparkleClone.remove();
        }, 2000);
        
        createParticle(this.getBoundingClientRect().left + 10, this.getBoundingClientRect().top + 10);
    });
});

// Particle Creation
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'interactive-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = '1';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 2;
    const size = 5 + Math.random() * 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = 'var(--gradient-star)';
    
    let posX = x;
    let posY = y;
    let opacity = 1;
    
    const particleAnimation = setInterval(() => {
        posX += Math.cos(angle) * speed;
        posY += Math.sin(angle) * speed;
        opacity -= 0.02;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(particleAnimation);
            particle.remove();
        }
    }, 16);
}

// Interactive Background
document.addEventListener('click', (e) => {
    if (!e.target.closest('.star') && !e.target.closest('.sparkle') && !e.target.closest('.nav-link')) {
        createParticle(e.clientX, e.clientY);
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${e.clientX - 25}px`;
        ripple.style.top = `${e.clientY - 25}px`;
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.border = '2px solid var(--light-blue)';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'ripple 0.6s forwards';
        ripple.style.zIndex = '9996';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }
    .blink { opacity: 0; }
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update navbar active link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
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

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const elementPos = bar.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (elementPos < screenPos) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

// Initialize skill bars
document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = '0%';
});

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBalls);

// Interactive card effects
document.querySelectorAll('.starlight-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Interactive profile image
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('click', function() {
        const glow = this.querySelector('.profile-glow');
        if (glow) {
            glow.style.opacity = glow.style.opacity === '1' ? '0' : '1';
            
            if (glow.style.opacity === '1') {
                this.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, 0.8), 0 0 100px rgba(102, 178, 255, 0.6)';
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.boxShadow = '';
                this.style.transform = '';
            }
        }
    });
}

// Interactive skill percentage
document.querySelectorAll('.skill-percentage').forEach(percentage => {
    percentage.addEventListener('click', function() {
        const current = this.textContent;
        const percent = parseInt(current);
        let newPercent = percent;
        
        if (percent < 100) {
            newPercent = percent + 5;
            if (newPercent > 100) newPercent = 100;
        } else {
            newPercent = percent - 5;
        }
        
        this.textContent = newPercent + '%';
        const skillBar = this.closest('.skill-meter').querySelector('.skill-bar');
        skillBar.style.width = newPercent + '%';
        skillBar.setAttribute('data-width', newPercent);
        
        this.style.transform = 'scale(1.3)';
        this.style.color = '#FFD700';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        }, 300);
    });
});

// Tech icon orbit interaction
document.querySelectorAll('.tech-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// Tooltip for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const tooltip = this.getAttribute('data-tooltip');
        if (tooltip) {
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'social-tooltip';
            tooltipEl.textContent = tooltip;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.bottom = '-35px';
            tooltipEl.style.left = '50%';
            tooltipEl.style.transform = 'translateX(-50%)';
            tooltipEl.style.background = 'var(--dark-blue)';
            tooltipEl.style.color = 'white';
            tooltipEl.style.padding = '5px 10px';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.fontSize = '0.8rem';
            tooltipEl.style.whiteSpace = 'nowrap';
            tooltipEl.style.zIndex = '1000';
            this.appendChild(tooltipEl);
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.social-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Floating clouds animation
document.querySelectorAll('.cloud').forEach(cloud => {
    cloud.style.animationPlayState = 'running';
});

// Initialize on load
window.addEventListener('load', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
    
    // Trigger initial animations
    animateSkillBars();
    
    // Add typing effect
    setTimeout(() => {
        const txtElement = document.querySelector('.typed-text');
        if (txtElement && !txtElement.innerHTML.trim()) {
            const words = ["Software Engineering Student", "Web Developer", "UI/UX Designer", "Tech Enthusiast"];
            const wait = 2000;
            new TypeWriter(txtElement, words, wait);
        }
    }, 500);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close any open tooltips
    if (e.key === 'Escape') {
        document.querySelectorAll('.social-tooltip').forEach(tooltip => {
            tooltip.remove();
        });
    }
});

// In your script.js file, update the typewriter initialization:

document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.typed-text');
    const words = ["Software Engineering Student", "Web Developer", "UI/UX Designer", "Tech Enthusiast"];
    const wait = 2000;
    
    // Clear any existing content
    txtElement.innerHTML = '';
    
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
    
    // Add cursor blinking animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.classList.toggle('blink');
        }, 500);
    }
    
    // Add animation to Hello container
    const helloContainer = document.querySelector('.hello-container');
    if (helloContainer) {
        helloContainer.style.animation = 'helloFloat 2s ease-in-out infinite';
    }
});

// Add this CSS animation for the hello container
const helloAnimationStyle = document.createElement('style');
helloAnimationStyle.textContent = `
    @keyframes helloFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(helloAnimationStyle);

// Add tooltip functionality for floating icons
document.querySelectorAll('.floating-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const tooltip = this.getAttribute('data-tooltip');
        if (tooltip) {
            // Remove any existing tooltip
            const existingTooltip = this.querySelector('.floating-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            // Create new tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'floating-tooltip';
            tooltipEl.textContent = tooltip;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.bottom = '-35px';
            tooltipEl.style.left = '50%';
            tooltipEl.style.transform = 'translateX(-50%)';
            tooltipEl.style.background = 'var(--dark-blue)';
            tooltipEl.style.color = 'white';
            tooltipEl.style.padding = '5px 10px';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.fontSize = '0.8rem';
            tooltipEl.style.whiteSpace = 'nowrap';
            tooltipEl.style.zIndex = '1000';
            tooltipEl.style.fontFamily = "'Nunito', sans-serif";
            tooltipEl.style.fontWeight = '600';
            this.appendChild(tooltipEl);
        }
    });
    
    icon.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.floating-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Make floating icons clickable
document.querySelectorAll('.floating-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const tooltip = this.getAttribute('data-tooltip');
        if (tooltip) {
            // Add visual feedback on click
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.boxShadow = '0 0 30px rgba(102, 178, 255, 0.8)';
            
            // Create particle effect
            const rect = this.getBoundingClientRect();
            createParticle(rect.left + rect.width/2, rect.top + rect.height/2);
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 500);
        }
    });
});

// Randomize floating icon positions slightly on load
window.addEventListener('load', function() {
    document.querySelectorAll('.floating-icon').forEach(icon => {
        const randomX = Math.random() * 30 - 15; // -15 to 15
        const randomY = Math.random() * 30 - 15; // -15 to 15
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
});