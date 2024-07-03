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

// Gestion des réponses lors de l'inscription et de la connexion
document.addEventListener('DOMContentLoaded', (event) => {
    // Gestion du formulaire de connexion
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginForm = document.querySelector('.login-form-email');
    const messageElement = document.getElementById('message');
    const loginButton = document.getElementById('login-button');
    const passwordInstructions = document.getElementById('password-instructions');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateFields = () => {
        const isEmailValid = emailPattern.test(emailInput.value);
        const isPasswordValid = passwordInput.value.length >= 8;

        emailInput.style.borderColor = isEmailValid ? '#52A5FF' : 'red';
        passwordInput.style.borderColor = isPasswordValid ? '#52A5FF' : 'red';
        passwordInstructions.style.color = isPasswordValid ? '#52A5FF' : 'red';

        loginButton.disabled = !(isEmailValid && isPasswordValid);
        if (loginButton.disabled) {
            loginButton.style.background = 'grey';
            loginButton.style.color = 'white';
        } else {
            loginButton.style.background = '#7059D7';
            loginButton.style.color = '#FFF';
        }
    };

    if (emailInput && passwordInput && loginForm && loginButton) {
        emailInput.addEventListener('input', validateFields);
        passwordInput.addEventListener('input', validateFields);

        loginForm.onsubmit = async (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const result = await response.json();
                if (response.ok) {
                    messageElement.textContent = result.message;
                    localStorage.setItem('token', result.token);
                    window.location.href = '/family-setup';
                } else {
                    messageElement.textContent = result.message || 'Une erreur est survenue';
                }
            } catch (error) {
                console.error('Error:', error);
                messageElement.textContent = 'Une erreur est survenue';
            }
        };

        // Initial validation on page load
        validateFields();
    }

    // Gestion de la bannière des cookies
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        function acceptCookies() {
            cookieBanner.classList.remove('show');
            document.cookie = "cookies_accepted=true; max-age=31536000; path=/";
        }

        function checkCookieConsent() {
            if (document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='))) {
                cookieBanner.style.display = 'none';
            } else {
                cookieBanner.classList.add('show');
            }
        }

        checkCookieConsent();
    }


    // Autres scripts spécifiques à la page d'inscription ou d'autres pages
    const prenomInput = document.getElementById('prenom-input');
    const registerForm = document.querySelector('.register-form-email');

    if (prenomInput && registerForm) {
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

        registerForm.onsubmit = async (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;
            const prenom = prenomInput.value;

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
                    window.location.href = '/family-setup';
                } else {
                    messageElement.textContent = result.message || 'Une erreur est survenue';
                }
            } catch (error) {
                console.error('Error:', error);
                messageElement.textContent = 'Une erreur est survenue';
            }
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const familyNameInput = document.getElementById('familyname');
    const familyForm = document.getElementById('create-family-form');
    const copyButton = document.querySelector('.copy-code');
    const codeElement = document.querySelector('.invit-family-code');
  
    // Vérifiez si l'élément familyNameInput existe avant d'ajouter l'écouteur d'événements
    if (familyNameInput) {
      familyNameInput.addEventListener('input', function() {
        var input = this;
        var infoText = document.getElementById('info-text');
        var submitButton = document.querySelector('.cta-lg.create-family-cta-continue');
  
        if (input.value.length >= 3) {
          input.classList.add('valid');
          infoText.classList.add('valid');
          submitButton.classList.add('valid');
          submitButton.disabled = false;
        } else {
          input.classList.remove('valid');
          infoText.classList.remove('valid');
          submitButton.classList.remove('valid');
          submitButton.disabled = true;
        }
      });
    }
  
    // Vérifiez si l'élément familyForm existe avant d'ajouter l'écouteur d'événements
    if (familyForm) {
      familyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  
        var errorMessageDiv = document.querySelector('.error-message');
        var familyname = familyNameInput.value;
  
        fetch('/create-family', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: familyname })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = data.message;
            errorMessageDiv.style.color = '#52A5FF'; // Change la couleur du texte à bleu pour indiquer le succès
  
            // Redirection après un délai pour permettre à l'utilisateur de voir le message
            setTimeout(() => {
              window.location.href = '/family-invitation';
            }, 2000); // 2 secondes de délai
          } else {
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = 'Une erreur est survenue';
            errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
          }
        })
        .catch(error => {
          errorMessageDiv.style.display = 'block';
          errorMessageDiv.textContent = 'Une erreur est survenue';
          errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
        });
      });
    }
  
    // Vérifiez si les éléments copyButton et codeElement existent avant d'ajouter l'écouteur d'événements
    if (copyButton && codeElement) {
      copyButton.addEventListener('click', function() {
        const code = codeElement.textContent;
  
        // Try to use the Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(code).then(() => {
            // Optional: Provide feedback to the user
            alert('Code copié: ' + code);
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        } else {
          // Fallback method using a textarea
          const textArea = document.createElement('textarea');
          textArea.value = code;
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          document.body.removeChild(textArea);
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const emailShareButton = document.querySelector('.email-share-button');

  
    if (emailShareButton) {
      emailShareButton.addEventListener('click', function() {
        const subject = encodeURIComponent('Invitation à rejoindre notre famille');
        const body = encodeURIComponent(`Rejoignez notre famille sur cette application en utilisant le lien suivant : https://smoozy-app.com/loading`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const familyNameInput = document.getElementById('familyname');
    const familyForm = document.getElementById('create-family-form');
    
    if (familyForm) {
      familyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  
        var errorMessageDiv = document.querySelector('.error-message');
        var familyname = familyNameInput.value;
  
        fetch('/create-family', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: familyname })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Response data:', data); // Log pour vérifier la réponse
  
          if (data.message === 'Famille créée avec succès' && data.invitationCode) {
            // Redirection vers la page d'invitation avec le code d'invitation
            window.location.href = `/family-invitation?invitationCode=${data.invitationCode}`;
          } else {
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = data.message || 'Une erreur est survenue';
            errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
          }
        })
        .catch(error => {
          console.error('Error:', error); // Log pour vérifier l'erreur
          errorMessageDiv.style.display = 'block';
          errorMessageDiv.textContent = 'Une erreur est survenue';
          errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
        });
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const familyNameInput = document.getElementById('familyname');
    const familyForm = document.getElementById('create-family-form');
    const errorMessageDiv = document.querySelector('.error-message');

    if (familyForm) {
        familyForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Empêche l'envoi du formulaire par défaut

            const familyname = familyNameInput.value;
            const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké

            try {
                const response = await fetch('/create-family', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Ajoutez le token à l'en-tête
                    },
                    body: JSON.stringify({ nom: familyname })
                });

                const data = await response.json();
                console.log('Response data:', data); // Log pour vérifier la réponse

                if (data.message === 'Famille créée avec succès' && data.invitationCode) {
                    // Redirection vers la page d'invitation avec le code d'invitation
                    window.location.href = `/family-invitation?invitationCode=${data.invitationCode}`;
                } else {
                    errorMessageDiv.style.display = 'block';
                    errorMessageDiv.textContent = data.message || 'Une erreur est survenue';
                    errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
                }
            } catch (error) {
                console.error('Error:', error); // Log pour vérifier l'erreur
                errorMessageDiv.style.display = 'block';
                errorMessageDiv.textContent = 'Une erreur est survenue';
                errorMessageDiv.style.color = 'red'; // Change la couleur du texte à rouge pour indiquer une erreur
            }
        });
    }
});


  

  

  

  document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.family-codes input');
    const submitButton = document.querySelector('.cta-lg.cta-register-lock');
  
    inputs.forEach(input => {
      input.addEventListener('input', checkInputs);
    });
  
    function checkInputs() {
      let allFilled = true;
      inputs.forEach(input => {
        if (input.value === '') {
          allFilled = false;
          input.style.borderColor = ''; // Réinitialiser la bordure si le champ est vide
        } else {
          input.style.borderColor = '#52A5FF'; // Changer la couleur de la bordure si le champ contient un caractère
        }
      });
  
      if (allFilled) {
        submitButton.disabled = false;
        submitButton.style.background = '#7059D7';
        submitButton.style.color = 'var(--Color-Neutral-White-100, #FFF)';
      } else {
        submitButton.disabled = true;
        submitButton.style.background = '';
        submitButton.style.color = '';
      }
    }
  });
  