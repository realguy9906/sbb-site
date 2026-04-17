// script.js for Sisters' Beginner Boxing

document.addEventListener("DOMContentLoaded", () => {
    // 1. Set Current Year in Footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = mobileNav.querySelectorAll("a");

    if(mobileBtn && mobileNav) {
        mobileBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("open");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("open");
            });
        });
    }

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if(question && answer) {
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                // Close all other accordion items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                    const otherAnswer = otherItem.querySelector(".faq-answer");
                    if(otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Open this item if it wasn't already active
                if (!isActive) {
                    item.classList.add("active");
                    // Set max height to the exact scroll height to allow smooth transition
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // 5. Scroll Animations (Fade Up / Reveal)
    
    // Initial animations for elements visible above the fold
    const triggerHeroAnimations = () => {
        const heroElements = document.querySelectorAll(".animate-fade-up, .animate-fade-in");
        heroElements.forEach(el => {
            el.classList.add("in-view");
        });
    };

    // Run hero animations shortly after load
    setTimeout(triggerHeroAnimations, 100);

    // Scroll reveal for sections further down the page
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        // The element becomes visible when it is 100px above the bottom of the viewport
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    // Trigger once on page load just in case some elements are already in view
    revealOnScroll(); 
});
