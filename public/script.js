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

// Gestion des réponses lors de l'inscription de l'utilisateur
document.addEventListener('DOMContentLoaded', (event) => {
    const prenomInput = document.getElementById('prenom-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const passwordInstructions = document.getElementById('password-instructions');
    const registerButton = document.getElementById('register-button');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    const validateFields = () => {
        const isPrenomValid = prenomInput.value.length >= 3;
        const isEmailValid = emailPattern.test(emailInput.value);
        const isPasswordValid = passwordPattern.test(passwordInput.value);

        prenomInput.style.borderColor = isPrenomValid ? '#52A5FF' : 'grey';
        emailInput.style.borderColor = isEmailValid ? '#52A5FF' : 'red';
        passwordInput.style.borderColor = isPasswordValid ? '#52A5FF' : 'red';
        passwordInstructions.style.color = isPasswordValid ? '#52A5FF' : 'red';

        registerButton.disabled = !(isPrenomValid && isEmailValid && isPasswordValid);
        if (registerButton.disabled) {
            registerButton.style.background = 'grey';
            registerButton.style.color = 'white';
        } else {
            registerButton.style.background = '#7059D7';
            registerButton.style.color = '#FFF';
        }
    };

    prenomInput.addEventListener('input', validateFields);
    emailInput.addEventListener('input', validateFields);
    passwordInput.addEventListener('input', validateFields);

    document.querySelector('.register-form-email').onsubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const prenom = form.prenom.value;
        const messageElement = document.getElementById('message');

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, prenom }),
            });
            const result = await response.json();
            if (response.ok) {
                messageElement.textContent = result.message;
                localStorage.setItem('token', result.token);
                window.location.href = '/protected-page';
            } else {
                messageElement.textContent = result.message || 'Une erreur est survenue';
            }
        } catch (error) {
            console.error('Error:', error);
            messageElement.textContent = 'Une erreur est survenue';
        }
    };

    window.onload = function () {
        google.accounts.id.initialize({
            client_id: '152404122949-28cgi4vta9vreupt8m4armb4h0l886ck.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.querySelector('.g_id_signin'),
          { theme: 'outline', size: 'large' }
        );
        google.accounts.id.prompt();
    };

    async function handleCredentialResponse(response) {
        const responsePayload = decodeJwtResponse(response.credential);

        const data = {
            pseudo: responsePayload.name,
            email: responsePayload.email,
            googleId: response.credential,
            imgProfil: responsePayload.picture
        };

        console.log("Data sent to server:", data); // Debug log

        try {
            const res = await fetch('/register/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            const messageElement = document.getElementById('message');
            if (res.ok) {
                messageElement.textContent = result.message;
                localStorage.setItem('token', result.token); // Stocker le token
                window.location.href = '/protected-page'; // Rediriger vers une page protégée
            } else {
                messageElement.textContent = result.message || 'Une erreur est survenue lors de votre inscription avec Google';
            }
        } catch (error) {
            console.error('Error during Google registration:', error); // Debug log
            document.getElementById('message').textContent = 'Une erreur est survenue lors de votre inscription avec Google';
        }
    }

    function decodeJwtResponse(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
});
