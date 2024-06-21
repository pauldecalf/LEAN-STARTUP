// HEADER SHADOW
document.addEventListener('scroll', function () {
    let header = document.getElementById('header');
    if (header) { // Vérification si l'élément existe
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    }
});

// MENU MOBILE
let burgerIcon = document.getElementById('burger-icon');
if (burgerIcon) { // Vérification si l'élément existe
    burgerIcon.addEventListener('click', function () {
        let menu = document.getElementById('fullscreen-menu');

        if (menu) { // Vérification si l'élément existe
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

    // Close menu when clicking outside of it
    document.addEventListener('click', function (event) {
        let menu = document.getElementById('fullscreen-menu');
        if (menu && !menu.classList.contains('hidden') && !menu.contains(event.target) && !burgerIcon.contains(event.target)) {
            menu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            burgerIcon.src = '/img/fi-rr-menu-burger.svg';
        }
    });
}

// GESTION DU POPUP
let waitlistButton = document.getElementById('waitlist-button');
if (waitlistButton) { // Vérification si l'élément existe
    waitlistButton.addEventListener('click', function (event) {
        let popupOverlay = document.getElementById('popup-overlay');
        let menu = document.getElementById('fullscreen-menu');
        let burgerIcon = document.getElementById('burger-icon');
        event.preventDefault();

        // Google stats
        gtag('event', 'Inscription_NL', {
            'event_name': '0'
        });

        // Show the popup overlay
        if (popupOverlay) { // Vérification si l'élément existe
            popupOverlay.classList.remove('hidden');
        }

        // Close the menu
        if (menu) {
            menu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        if (burgerIcon) {
            burgerIcon.src = '/img/fi-rr-menu-burger.svg';
        }
    });
}

// Ajout des vérifications pour les autres boutons waitlist
['waitlist-button2', 'waitlist-button3'].forEach(function(buttonId) {
    let button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function (event) {
            let popupOverlay = document.getElementById('popup-overlay');
            if (popupOverlay) {
                popupOverlay.classList.remove('hidden');
            }
        });
    }
});

// Close popup when close icon is clicked
let closePopupIcon = document.getElementById('close-popup');
if (closePopupIcon) {
    closePopupIcon.addEventListener('click', function () {
        let popupOverlay = document.getElementById('popup-overlay');
        if (popupOverlay) {
            popupOverlay.classList.add('hidden');
        }
    });
}

// Close popup when clicking outside of it
let popupOverlay = document.getElementById('popup-overlay');
if (popupOverlay) {
    popupOverlay.addEventListener('click', function (event) {
        if (event.target.id === 'popup-overlay') {
            popupOverlay.classList.add('hidden');
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

// Gestion de la bannière des cookies
function acceptCookies() {
    // Code pour accepter les cookies et masquer la bannière
    let cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
    // Stocker le consentement de l'utilisateur (par exemple, dans un cookie ou dans le stockage local)
    document.cookie = "cookies_accepted=true; max-age=31536000; path=/";
}

// Vérifier si le cookie existe pour ne pas afficher la bannière si l'utilisateur a déjà accepté
function checkCookieConsent() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='))) {
        let cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    } else {
        let cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) {
            cookieBanner.classList.add('show');
        }
    }
}

// Appeler la fonction pour vérifier le consentement lorsque la page est chargée
document.addEventListener('DOMContentLoaded', (event) => {
    checkCookieConsent();
});
