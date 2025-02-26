document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    this.textContent = isDarkMode ? '☀️' : '🌙';
  });

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = '☀️';
  }
  
  // Initialize variables
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const mobileMenu = document.querySelector('.mobile-menu');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const loader = document.querySelector('.loader');
  
  // Handle page loader
  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hidden');
    }, 1500);
  });
  
  // Mobile menu toggle
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Scroll effects
  window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    
    // Navbar scroll effect
    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
      scrollTopBtn.classList.add('active');
    } else {
      navbar.classList.remove('scrolled');
      scrollTopBtn.classList.remove('active');
    }
    
    // Scroll animations
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate');
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const navbarHeight = 80;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        if (mobileMenu && mobileMenu.querySelector('i')) {
          mobileMenu.querySelector('i').classList.remove('fa-times');
          mobileMenu.querySelector('i').classList.add('fa-bars');
        }
      }
    });
  });
  
  // Typing animation for hero text
  function typeWriterEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
      const text = typingElement.textContent;
      typingElement.textContent = '';
      
      let i = 0;
      const speed = 80; // Typing speed in milliseconds
      
      function type() {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      // Start typing after a delay
      setTimeout(type, 1000);
    }
  }
  
  // Project hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Skill tag hover effects
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#5e17eb';
      this.style.color = 'white';
      this.style.transform = 'translateY(-5px)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '#f5f5f5';
      this.style.color = '#333';
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const nameInput = this.querySelector('input[type="text"]');
      const emailInput = this.querySelector('input[type="email"]');
      const messageInput = this.querySelector('textarea');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      // Validate inputs
      if (nameInput.value && emailInput.value && messageInput.value) {
        // Show sending state
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(function() {
          // Reset form
          contactForm.reset();
          // Show success message
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          
          // Reset button text after delay
          setTimeout(function() {
            submitBtn.textContent = originalText;
          }, 3000);
        }, 2000);
      }
    });
  }
  
  // Initialize animations
  typeWriterEffect();
  
  // Particle background effect for hero section
  function initParticleBackground() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    heroSection.appendChild(canvas);
    
    // Adjust canvas size
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 50;
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    // Animation function
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        ctx.fillStyle = `rgba(94, 23, 235, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', function() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    });
  }
  
  // Initialize particle background
  initParticleBackground();
  
  // Activate initial animations for elements above the fold
  setTimeout(function() {
    animateElements.forEach(element => {
      const position = element.getBoundingClientRect().top;
      if (position < window.innerHeight) {
        element.classList.add('animate');
      }
    });
  }, 500);
});
          $(document).ready(function() {
            // Loading animation
            setTimeout(function() {
              $(".loader").addClass("hidden");
            }, 1500);
            
            // Mobile menu toggle
            $(".mobile-menu").click(function() {
              $(".nav-links").toggleClass("active");
              $(this).find("i").toggleClass("fa-bars fa-times");
            });
            
            // Navbar scroll effect
            $(window).scroll(function() {
              if ($(this).scrollTop() > 50) {
                $(".navbar").addClass("scrolled");
                $(".scroll-top").addClass("active");
              } else {
                $(".navbar").removeClass("scrolled");
                $(".scroll-top").removeClass("active");
              }
              
              // Animate elements on scroll
              $(".animate-on-scroll").each(function() {
                var position = $(this).offset().top;
                var scrollPosition = $(window).scrollTop() + $(window).height() - 100;
                
                if (position < scrollPosition) {
                  $(this).addClass("animate");
                }
              });
            });
            
            // Smooth scrolling for anchor links
            $("a[href^='#']").on('click', function(e) {
              e.preventDefault();
              
              var target = this.hash;
              var $target = $(target);
              
              $('html, body').animate({
                'scrollTop': $target.offset().top - 80
              }, 800, 'swing');
              
              // Close mobile menu when link is clicked
              $(".nav-links").removeClass("active");
              $(".mobile-menu").find("i").removeClass("fa-times").addClass("fa-bars");
            });
            
            // Activate all animations on load for elements above the fold
            setTimeout(function() {
              var scrollPosition = $(window).scrollTop() + $(window).height();
              
              $(".animate-on-scroll").each(function() {
                var position = $(this).offset().top;
                
                if (position < scrollPosition) {
                  $(this).addClass("animate");
                }
              });
            }, 1600);
            
            // Project hover effect
            $(".project-card").hover(
              function() {
                $(this).find(".project-overlay").css("opacity", "1");
              },
              function() {
                $(this).find(".project-overlay").css("opacity", "0");
              }
            );
            
            // Contact form submission
            $(".contact-form").submit(function(e) {
              e.preventDefault();
              
              // Simulate form submission
              var $submitBtn = $(this).find("button[type='submit']");
              var originalText = $submitBtn.text();
              
              $submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
              
              setTimeout(function() {
                $(".contact-form")[0].reset();
                $submitBtn.html('<i class="fas fa-check"></i> Message Sent!');
                
                setTimeout(function() {
                  $submitBtn.text(originalText);
                }, 3000);
              }, 2000);
            });
            
            // Initialize skill bars animation
            $(".skill-progress").each(function() {
              var percent = $(this).data("percent");
              $(this).find(".skill-progress-bar").css("width", "0%");
              
              $(this).waypoint(function() {
                $(this.element).find(".skill-progress-bar").animate({
                  width: percent + "%"
                }, 1000);
                this.destroy();
              }, {
                offset: "90%"
              });
            });
          });