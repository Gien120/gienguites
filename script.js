// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Typing animation
    const typed = new Typed('.auto-type', {
        strings: ['Frontend Developer', 'UI/UX Enthusiast', 'Web Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animate hamburger lines
        this.querySelector('.line:nth-child(1)').style.transform = this.classList.contains('active')
            ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
        this.querySelector('.line:nth-child(2)').style.opacity = this.classList.contains('active') ? '0' : '1';
        this.querySelector('.line:nth-child(3)').style.transform = this.classList.contains('active')
            ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelector('.line:nth-child(1)').style.transform = 'none';
            hamburger.querySelector('.line:nth-child(2)').style.opacity = '1';
            hamburger.querySelector('.line:nth-child(3)').style.transform = 'none';
        });
    });

    // Header shadow on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        header.style.boxShadow = window.scrollY > 50
            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px rgba(0, 0, 0, 0.05)';
    });

    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.querySelector('.line:nth-child(1)').style.transform = 'none';
                hamburger.querySelector('.line:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('.line:nth-child(3)').style.transform = 'none';
            }

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

    // Contact Popup functionality
    const contactTrigger = document.querySelector('.contact-trigger');
    const contactPopup = document.querySelector('.contact-popup');
    const closePopup = document.querySelector('.close-popup');

    const skillsLink = document.querySelector('a[href="#skills"]');
    const skillsPopup = document.querySelector('.skills-popup');
    const closeSkillsPopup = skillsPopup ? skillsPopup.querySelector('.close-popup') : null;

    if (skillsLink && skillsPopup && closeSkillsPopup) {
        // Open skills popup
        skillsLink.addEventListener('click', function (e) {
            e.preventDefault();
            skillsPopup.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Animate skill bars
            setTimeout(() => {
                const skillLevels = document.querySelectorAll('.skill-level');
                skillLevels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.width = width;
                    }, 100);
                });
            }, 300);
        });

        // Close skills popup
        closeSkillsPopup.addEventListener('click', function () {
            skillsPopup.classList.remove('active');
            document.body.style.overflow = '';
        });

        skillsPopup.addEventListener('click', function (e) {
            if (e.target === skillsPopup) {
                skillsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Escape key closes skills popup
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && skillsPopup.classList.contains('active')) {
                skillsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (contactTrigger && contactPopup && closePopup) {
        // Open contact popup
        contactTrigger.addEventListener('click', function () {
            contactPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close contact popup
        closePopup.addEventListener('click', function () {
            contactPopup.classList.remove('active');
            document.body.style.overflow = '';
        });

        contactPopup.addEventListener('click', function (e) {
            if (e.target === contactPopup) {
                contactPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Escape key closes contact popup
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
                contactPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
// Projects Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // ... keep your existing code ...

    // Projects Popup
    const projectsBtn = document.querySelector('.btn.secondary-btn');
    const projectsPopup = document.querySelector('.projects-popup');
    
    if (projectsBtn && projectsPopup) {
        const closeProjectsPopup = projectsPopup.querySelector('.close-popup');
        const projectItems = projectsPopup.querySelectorAll('.project-item');
        const nextProjectBtns = projectsPopup.querySelectorAll('.next-project-btn');
        
        // Open projects popup
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectsPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset to first project
            projectItems.forEach(item => item.style.display = 'none');
            projectItems[0].style.display = 'flex';
        });

        // Close projects popup
        closeProjectsPopup.addEventListener('click', function() {
            projectsPopup.classList.remove('active');
            document.body.style.overflow = '';
        });

        projectsPopup.addEventListener('click', function(e) {
            if (e.target === projectsPopup) {
                projectsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Next project functionality
        nextProjectBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentProject = this.closest('.project-item');
                const currentIndex = parseInt(currentProject.dataset.project);
                const totalProjects = projectItems.length;
                const nextIndex = currentIndex % totalProjects + 1;
                
                // Hide current project
                currentProject.style.display = 'none';
                
                // Show next project
                const nextProject = projectsPopup.querySelector(`.project-item[data-project="${nextIndex}"]`);
                nextProject.style.display = 'flex';
                
                // Update button text if it's the last project
                if (nextIndex === totalProjects) {
                    this.textContent = 'Back to First';
                } else {
                    this.textContent = 'Next Project';
                }
            });
        });

        // Escape key closes projects popup
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && projectsPopup.classList.contains('active')) {
                projectsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});