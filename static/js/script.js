// Gatiman Castings LLP - Main JavaScript

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function() {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
    })();

    // DOM Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const tabletMenuBtn = document.getElementById('tablet-menu-btn');
    const tabletMenu = document.getElementById('tablet-menu');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Toggle Mobile Menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Toggle Tablet Menu
    if (tabletMenuBtn) {
        tabletMenuBtn.addEventListener('click', function() {
            tabletMenu.classList.toggle('hidden');
            // Change icon based on menu state
            const icon = tabletMenuBtn.querySelector('i');
            if (tabletMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            if (tabletMenu) tabletMenu.classList.add('hidden');
            
            // Reset hamburger icon
            const mobileIcon = mobileMenuBtn.querySelector('i');
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
            
            if (tabletMenuBtn) {
                const tabletIcon = tabletMenuBtn.querySelector('i');
                tabletIcon.classList.remove('fa-times');
                tabletIcon.classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
            backToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopBtn.classList.remove('visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
        
        // Reveal elements on scroll
        revealElements();
    });

    // Scroll to top when back to top button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just "#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = navbar.offsetHeight;
                
                // Calculate position to scroll to (element position - navbar height)
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle form submission with EmailJS
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data for EmailJS
            const templateParams = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_id', 'template_id', templateParams) // Replace with your actual service and template IDs
                .then(function(response) {
                    console.log('Email sent successfully!', response);
                    // Show success message
                    formStatus.classList.remove('hidden', 'error');
                    formStatus.classList.add('success');
                    formStatus.innerHTML = 'Your message has been sent successfully! We will get back to you soon.';
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    // Show error message
                    formStatus.classList.remove('hidden', 'success');
                    formStatus.classList.add('error');
                    formStatus.innerHTML = 'Failed to send your message. Please try again later or contact us directly via email.';
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Scroll to form status
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide status message after 5 seconds
                    setTimeout(() => {
                        formStatus.classList.add('hidden');
                    }, 5000);
                });
        });
    }

    // Fade in elements when they come into view
    function revealElements() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add fade-in class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initial reveal
    revealElements();

    // Add gear rotation effect to logo
    const logo = document.querySelector('nav img');
    if (logo) {
        logo.classList.add('gear-rotate');
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://pixabay.com/get/g59fba2ff30b426bb570d8c14e78cf6b34e4490f675fd706a01155b29ed364fa26f6495cb3c9da917d048b125722aed60042ec01130170992a4e9afb8c2be7018_1280.jpg',
        'https://pixabay.com/get/g1f88afad2b4bed9d85f1053cd6c17bc441b8adaa8aecfee67d757c4098584b4393a2dc6bafa67491f2936836dfc883c351c29a8d426458a6f3c8e8be85bad0d7_1280.jpg',
        'https://pixabay.com/get/g2be75dbddce178ba3f911a120c2dd5fcac867d9a5e4698ef630c23a4e2d59c1bd5f43d9257c1d4718ab0733c795364a11ca9af1cc28b282a03c130ac4752e5b4_1280.jpg',
        'https://pixabay.com/get/g1f5181e5f12a3aaa9aa26be157c324776c0cfb4defae9fc27129ebd982cba907574aff3f10c85735e0b2bc4a2e83c2e32cde75926ded5518cd1974c4e438c2d7_1280.jpg',
        'https://pixabay.com/get/g3e4fbf2e82d6dcc4867eddf8b6244716900871fe8be719746403cb31743a6933f887ca469239b56b7a3222285c7204ec8a7cda3b88846ce74d656beeedbd9546_1280.jpg',
        'https://pixabay.com/get/g0f7ec05e71aaff4076019c41fc319b9a28bd64b1a064ee4b7228cd820aea0af8deca614440349ec447b97bd417072451279892910fac30804458a6586fdf322b_1280.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading images
preloadImages();
