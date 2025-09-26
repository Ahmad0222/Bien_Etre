/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SMOOTH SCROLL FOR NAVIGATION LINKS ====================*/
navLink.forEach(link => {
    link.addEventListener('click', function (e) {
        // Only prevent default for anchor links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Use the SAME offset calculation as scroll detection
                const offset = getHeaderOffset();

                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Let the scroll detection handle active state updates
            }
        }
    });
});


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

let swiperTestimonial = new Swiper(".testimonial__container", { loop: true, grabCursor: true, spaceBetween: 48, pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true }, breakpoints: { 568: { slidesPerView: 1 } } });

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

// Calculate consistent header offset based on screen size and CSS values
function getHeaderOffset() {
    let headerOffset = 64; // 4rem default header height in pixels
    if (window.innerWidth >= 769 && window.innerWidth <= 1023) {
        // Tablet: 5rem header + 1.2rem buffer = 80 + 19.2 ≈ 100px + 2px
        headerOffset = 102;
    } else if (window.innerWidth >= 768) {
        // Desktop: 5rem header + 1.5rem buffer = 80 + 24 = 104px + 2px
        headerOffset = 106;
    } else {
        // Mobile: 4rem header + 0.5rem buffer = 64 + 8 = 72px + 2px
        headerOffset = 74;
    }
    return headerOffset;
}

function scrollActive() {
    const scrollY = window.pageYOffset + 5;
    const headerOffset = getHeaderOffset();
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're at the bottom of the page
    const isAtBottom = (scrollY + windowHeight) >= (documentHeight - 50);
    let activeFound = false;

    sections.forEach((current, index) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - headerOffset;
        const sectionId = current.getAttribute('id')
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        // Special handling for the last section (contact) when at bottom of page
        const isLastSection = index === sections.length - 1;
        const isInSection = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
        const shouldActivateLastSection = isLastSection && isAtBottom;

        if (isInSection || shouldActivateLastSection) {
            // Remove active class from all links first
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active-link')
            })
            // Add active class immediately for better responsiveness
            if (navLink) {
                navLink.classList.add('active-link')
                activeFound = true;
            }
        }
    })

    // Fallback: if no section is active and we're at the top, activate home
    if (!activeFound && scrollY < 100) {
        const homeLink = document.querySelector('.nav__menu a[href*="home"]');
        if (homeLink) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active-link')
            })
            homeLink.classList.add('active-link');
        }
    }
}

// Throttle scroll events for better performance
let scrollTimer = null;
window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(scrollActive, 5); // Reduced delay for better responsiveness
});

// Recalculate active state on window resize
window.addEventListener('resize', scrollActive)

// Initialize active state on page load
document.addEventListener('DOMContentLoaded', scrollActive)