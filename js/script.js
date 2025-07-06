document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Animate Sections and Skills on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars if they are in the revealed section
                if (entry.target.id === 'skills') {
                    const skillBars = document.querySelectorAll('.progress-fill');
                    skillBars.forEach(bar => {
                        bar.style.width = bar.dataset.progress;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const elementObserver = new IntersectionObserver(revealElement, {
        root: null,
        threshold: 0.1,
    });

    animatedElements.forEach(el => {
        elementObserver.observe(el);
    });
    
    // --- Active Nav Link Highlighting on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 90) { // Offset for sticky header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});