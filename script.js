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

    // 6. Custom Cursor implementation
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorDot.style.transform = `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%))`;
        cursorOutline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // 7. Waitlist Popup Notification Logic
    const aboutSection = document.getElementById('about');
    const waitlistPopup = document.getElementById('waitlist-popup');
    const closePopupBtn = waitlistPopup?.querySelector('.close-popup');
    
    let popupTriggered = false;

    if (aboutSection && waitlistPopup) {
        const popupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If they scroll to it and we haven't triggered it yet
                if (entry.isIntersecting && !popupTriggered) {
                    popupTriggered = true; 
                    waitlistPopup.classList.add('show');
                }
            });
        }, { threshold: 0.3 }); // Requires 30% of section visible

        popupObserver.observe(aboutSection);
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            waitlistPopup.classList.remove('show');
        });
    }

    // 8. Exit Intent Logic
    const exitPopup = document.getElementById('exit-popup');
    const closeExitBtn = exitPopup?.querySelector('.close-modal');
    
    let exitTriggered = false;

    if (exitPopup) {
        // Use mouseout for more reliable exit-intent detection across browsers
        document.addEventListener('mouseout', (e) => {
            // When mouse leaves the window completely toward the top address bar
            if (!e.relatedTarget && e.clientY < 20 && !exitTriggered) {
                const titles = [
                    "Before you go...", 
                    "Still thinking about it?", 
                    "A space built for women like you"
                ];
                const headerEl = exitPopup.querySelector('.exit-title');
                if (headerEl) {
                    headerEl.textContent = titles[Math.floor(Math.random() * titles.length)];
                }
                
                exitPopup.classList.add('show');
                exitTriggered = true;
            }
        });

        if (closeExitBtn) {
            closeExitBtn.addEventListener('click', () => {
                exitPopup.classList.remove('show');
            });
        }
        
        // Close modal if clicking outside of the content box
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('show');
            }
        });
    }

    // 9. Countdown Timer Logic
    const countDownDate = new Date("April 22, 2026 23:59:59").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const daysEl = document.getElementById("cd-days");
        const hoursEl = document.getElementById("cd-hours");
        const minsEl = document.getElementById("cd-mins");
        const secsEl = document.getElementById("cd-secs");
        
        if (daysEl && hoursEl && minsEl && secsEl) {
            if (distance < 0) {
                // If the countdown is over, optionally hide the timer
                const timerContainer = document.getElementById("toast-countdown");
                if (timerContainer) timerContainer.style.display = "none";
            } else {
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                daysEl.textContent = days < 10 ? "0" + days : days;
                hoursEl.textContent = hours < 10 ? "0" + hours : hours;
                minsEl.textContent = minutes < 10 ? "0" + minutes : minutes;
                secsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
            }
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 10. Scroll Arrow Hiding Logic
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                scrollArrow.classList.add('hidden');
            } else {
                scrollArrow.classList.remove('hidden');
            }
        });
    }
});
