// HEADER SHADOW
document.addEventListener('scroll', function () {
    let header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});


// MENU MOBILE
document.getElementById('burger-icon').addEventListener('click', function () {
    let menu = document.getElementById('fullscreen-menu');
    let burgerIcon = document.getElementById('burger-icon');

    menu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');

    if (!menu.classList.contains('hidden')) {
        burgerIcon.src = '/img/close-svgrepo-com.svg';
        window.scrollTo(0, 0);
    } else {
        burgerIcon.src = '/img/fi-rr-menu-burger.svg';
    }
});

// Close menu when clicking outside of it
document.addEventListener('click', function (event) {
    let menu = document.getElementById('fullscreen-menu');
    let burgerIcon = document.getElementById('burger-icon');

    if (!menu.classList.contains('hidden') && !menu.contains(event.target) && !burgerIcon.contains(event.target)) {
        menu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        burgerIcon.src = '/img/fi-rr-menu-burger.svg';
    }
});


// GESTION DU POPUP
document.addEventListener('click', function (event) {
    let menu = document.getElementById('fullscreen-menu');
    let burgerIcon = document.getElementById('burger-icon');

    if (!menu.classList.contains('hidden') && !menu.contains(event.target) && !burgerIcon.contains(event.target)) {
        menu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        burgerIcon.src = '/img/fi-rr-menu-burger.svg';
    }
});

// Show popup when waitlist button is clicked and close the menu
document.getElementById('waitlist-button').addEventListener('click', function (event) {
    let popupOverlay = document.getElementById('popup-overlay');
    let menu = document.getElementById('fullscreen-menu');
    let burgerIcon = document.getElementById('burger-icon');
    event.preventDefault();

    // Google stats
    gtag('event', 'Inscription_NL', {
        'event_name': '0'
    });

    // Show the popup overlay
    popupOverlay.classList.remove('hidden');

    // Close the menu
    menu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    burgerIcon.src = '/img/fi-rr-menu-burger.svg';
});


document.getElementById('waitlist-button2').addEventListener('click', function (event) {
    let popupOverlay = document.getElementById('popup-overlay');
    // Show the popup overlay
    popupOverlay.classList.remove('hidden');
});

document.getElementById('waitlist-button3').addEventListener('click', function (event) {
    let popupOverlay = document.getElementById('popup-overlay');
    // Show the popup overlay
    popupOverlay.classList.remove('hidden');
});

// Close popup when close icon is clicked
document.getElementById('close-popup').addEventListener('click', function () {
    let popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.add('hidden');
});

// Close popup when clicking outside of it
document.getElementById('popup-overlay').addEventListener('click', function (event) {
    if (event.target.id === 'popup-overlay') {
        let popupOverlay = document.getElementById('popup-overlay');
        popupOverlay.classList.add('hidden');
    }
});

// Envoi du formulaire dans le header & dans le footer
(function ($) { window.fnames = []; window.ftypes = []; fnames[0] = 'EMAIL'; ftypes[0] = 'email'; fnames[1] = 'FNAME'; ftypes[1] = 'text'; fnames[2] = 'LNAME'; ftypes[2] = 'text'; fnames[3] = 'ADDRESS'; ftypes[3] = 'address'; fnames[4] = 'PHONE'; ftypes[4] = 'phone'; fnames[5] = 'BIRTHDAY'; ftypes[5] = 'birthday'; }(jQuery)); let $mcj = jQuery.noConflict(true);

// Gestion da la banniere des cookies

function acceptCookies() {
    // Code pour accepter les cookies et masquer la bannière
    document.getElementById('cookie-banner').classList.remove('show');
    // Stocker le consentement de l'utilisateur (par exemple, dans un cookie ou dans le stockage local)
    document.cookie = "cookies_accepted=true; max-age=31536000; path=/";
}

// Vérifier si le cookie existe pour ne pas afficher la bannière si l'utilisateur a déjà accepté
function checkCookieConsent() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='))) {
        document.getElementById('cookie-banner').style.display = 'none';
    } else {
        document.getElementById('cookie-banner').classList.add('show');
    }
}

// Appeler la fonction pour vérifier le consentement lorsque la page est chargée
document.addEventListener('DOMContentLoaded', (event) => {
    checkCookieConsent();
});