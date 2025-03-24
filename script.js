document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for logo link
    const logoLink = document.querySelector(".logo-link");
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            window.location.href = "#main"; // Reload the home page
        });
    }

    // Show hero section by default and hide others
    document.getElementById("hero").classList.add("visible");
    document.getElementById("hero").classList.remove("hidden");
    
    document.querySelectorAll("section:not(#hero)").forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("visible");
    });

    // Navigation link click event
    const navLinks = document.querySelectorAll("nav ul li a, .footer-nav a, .cta-buttons a:not(.cta-secondary[href*='.pdf'])");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Skip if the link is the "View Resume" button
            if (link.classList.contains("cta-secondary") && link.getAttribute("href").includes(".pdf")) {
                return; // Allow default behavior (open in new tab)
            }

            e.preventDefault(); // Prevent default anchor behavior
            const targetId = e.target.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            // // Hide all sections except the target section
            // document.querySelectorAll("section").forEach(section => {
            //     if (section.id !== targetId) {
            //         section.classList.add("hidden");
            //         section.classList.remove("visible");
            //     }
            // });

            // Show the target section with animation
            targetSection.classList.remove("hidden");
            setTimeout(() => {
                targetSection.classList.add("visible");
            }, 50); // Small delay for the animation to work properly

            // Scroll to the section
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Account for fixed header height
                behavior: "smooth"
            });
            
            // Close mobile menu if open
            if (document.querySelector("nav ul").classList.contains("active")) {
                toggleMobileMenu();
            }
        });
    });

// Mobile menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");
    
    function toggleMobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
    
    // hamburger.addEventListener("click", toggleMobileMenu);
    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileMenu);
    }
     // Close mobile menu when a link is clicked
     const mobileNavLinks = document.querySelectorAll("nav ul li a");
     mobileNavLinks.forEach(link => {
         link.addEventListener("click", () => {
             if (navMenu.classList.contains("active")) {
                 toggleMobileMenu();
             }
         });
     });

    // Form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!formValues.name || !formValues.email || !formValues.message) {
                alert("Please fill in all fields");
                return;
            }
            
            // Show success message
            alert("Thank you for your message! I'll get back to you soon.");
            contactForm.reset();
        });
    }

    // Add scroll event listener for header
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Add animation to skill bars
    const skillBars = document.querySelectorAll(".skill-level");
    const skillsSection = document.getElementById("skills");
    
    // Function to animate skill bars when skills section is visible
    function animateSkillBars() {
        if (skillsSection.classList.contains("visible")) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = "0";
                setTimeout(() => {
                    bar.style.transition = "width 1s ease-in-out";
                    bar.style.width = width;
                }, 300);
            });
        }
    }

    // Add observer for skills section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === "skills") {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Add click event to project cards for potential expansion
    const projectTitles = document.querySelectorAll(".project-title");
    projectTitles.forEach(title => {
        title.addEventListener("click", () => {
            const projectContent = title.nextElementSibling;
            projectContent.classList.toggle("expanded");
        });
    });
});

// Add CSS for mobile menu
document.head.insertAdjacentHTML("beforeend", `
<style>
@media (max-width: 768px) {
    nav ul {
        display: none;
        flex-direction: column;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
        align-items: center;
        gap: 1rem;
    }
    
    nav ul.active {
        display: flex;
    }
    
    .hamburger {
        display: block;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    header.scrolled {
        padding: 0.5rem 5%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    #hero {
        flex-direction: column;
        text-align: center;
        padding: 2rem 5%;
        gap: 2rem;
    }
    
    .hero-content {
        order: 2;
    }
    
    .hero-image {
        order: 1;
        width: 250px;
        height: 250px;
    }
    
    .about-highlights {
        flex-direction: column;
    }
    
    .experience-header {
        flex-direction: column;
        text-align: center;
    }
    
    .experience-details {
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
    }
    
    .projects-container {
        grid-template-columns: 1fr;
    }
    
    .project-card {
        flex-direction: column;
    }
    
    .contact-content {
        flex-direction: column;
    }
}
</style>
`);