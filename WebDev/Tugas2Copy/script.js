// FluffTowns Sanctuary JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
      const headerContent = document.querySelector('.header-content');
      const nav = document.querySelector('.main-nav');
      
      if (nav) {
        const mobileMenuDiv = document.createElement('div');
        mobileMenuDiv.className = 'mobile-menu';
        mobileMenuDiv.innerHTML = `
          <nav class="mobile-nav">
            <a href="index.html" class="nav-link">Home</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="adopt.html" class="nav-link">Adopt</a>
            <a href="donate.html" class="nav-link">Donate</a>
            <a href="contact.html" class="nav-link">Contact</a>
          </nav>
        `;
        headerContent.appendChild(mobileMenuDiv);
      }
    }
    
    const menu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && menu) {
      mobileMenuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menu.style.display = menu.classList.contains('active') ? 'block' : 'none';
        
        // Toggle menu button animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (menu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-content') && menu.classList.contains('active')) {
          menu.classList.remove('active');
          menu.style.display = 'none';
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
      
      // Close menu when clicking on a link
      document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('active');
          menu.style.display = 'none';
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        });
      });
    }
  }
  
  // Set Active Nav Link
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('active');
      
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth Scrolling
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Form Submission
  function setupForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = 'var(--fluff-moss)';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
          }, 2000);
        }, 1500);
      });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          this.reset();
          
          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
          }, 2000);
        }, 1500);
      });
    }
  }
  
  // Card Hover Effects
  function setupCardAnimations() {
    const cards = document.querySelectorAll('.animal-card, .staff-card, .step');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
      });
    });
  }
  
  // Scroll Animations
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }
  
  // Initialize everything
  function init() {
    setActiveNavLink();
    setupMobileMenu();
    setupSmoothScrolling();
    setupForms();
    setupCardAnimations();
    setupScrollAnimations();
    
    console.log('🐾 FluffTowns Sanctuary loaded successfully!');
  }
  
  init();
});