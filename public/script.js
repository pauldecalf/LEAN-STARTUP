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

// Envoi du formulaire dans le header & dans le footer
(function ($) {
    window.fnames = [];
    window.ftypes = [];
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    fnames[1] = 'FNAME';
    ftypes[1] = 'text';
    fnames[2] = 'LNAME';
    ftypes[2] = 'text';
    fnames[3] = 'ADDRESS';
    ftypes[3] = 'address';
    fnames[4] = 'PHONE';
    ftypes[4] = 'phone';
    fnames[5] = 'BIRTHDAY';
    ftypes[5] = 'birthday';
}(jQuery));

let $mcj = jQuery.noConflict(true);

// Gestion da la banniere des cookies
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
});
