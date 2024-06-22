// HEADER SHADOW
document.addEventListener('scroll', function () {
    let header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    }
});

// MENU MOBILE
let burgerIcon = document.getElementById('burger-icon');
if (burgerIcon) {
    burgerIcon.addEventListener('click', function () {
        let menu = document.getElementById('fullscreen-menu');
        if (menu) {
            menu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
            if (!menu.classList.contains('hidden')) {
                burgerIcon.src = '/img/close-svgrepo-com.svg';
                window.scrollTo(0, 0);
            } else {
                burgerIcon.src = '/img/fi-rr-menu-burger.svg';
            }
        }
    });
}

// Close menu when clicking outside of it
document.addEventListener('click', function (event) {
    let menu = document.getElementById('fullscreen-menu');
    let burgerIcon = document.getElementById('burger-icon');
    if (menu && burgerIcon) {
        if (!menu.classList.contains('hidden') && !menu.contains(event.target) && !burgerIcon.contains(event.target)) {
            menu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            burgerIcon.src = '/img/fi-rr-menu-burger.svg';
        }
    }
});

// GESTION DU POPUP
let popupOverlay = document.getElementById('popup-overlay');
if (popupOverlay) {
    document.addEventListener('click', function (event) {
        if (event.target.id === 'popup-overlay') {
            popupOverlay.classList.add('hidden');
        }
    });

    let closePopup = document.getElementById('close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            popupOverlay.classList.add('hidden');
        });
    }

    let waitlistButtons = ['waitlist-button', 'waitlist-button2', 'waitlist-button3'];
    waitlistButtons.forEach(function (id) {
        let button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                // Google stats
                gtag('event', 'Inscription_NL', {
                    'event_name': '0'
                });
                popupOverlay.classList.remove('hidden');
            });
        }
    });
}

// Gestion de la banniere des cookies
function acceptCookies() {
    document.getElementById('cookie-banner').classList.remove('show');
    document.cookie = "cookies_accepted=true; max-age=31536000; path=/";
}

function checkCookieConsent() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='))) {
        document.getElementById('cookie-banner').style.display = 'none';
    } else {
        document.getElementById('cookie-banner').classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    checkCookieConsent();
    const faqDivs = document.querySelectorAll('.faq-div-question');

    faqDivs.forEach(function (faqDiv) {
        faqDiv.addEventListener('click', function () {
            const faqReponse = faqDiv.querySelector('.faq-p-reponse');
            const faqIcon = faqDiv.querySelector('.faq-icon');

            faqReponse.classList.toggle('hidden');
            faqReponse.classList.toggle('block');
            faqIcon.classList.toggle('rotated');
        });
    });
});

