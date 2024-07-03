function handleRegister(event) {
    event.preventDefault();
    const prenom = document.getElementById('prenom-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    // Validation simplifiée des champs de formulaire
    if (!prenom || !email || !password) {
        document.getElementById('message').innerText = 'Tous les champs sont obligatoires.';
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prenom, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Inscription réussie') {
            sessionStorage.setItem('prenom', data.user.prenom);  // Stocker le prénom dans sessionStorage
            sessionStorage.setItem('nom', data.user.nom);        // Stocker le nom dans sessionStorage
            sessionStorage.setItem('email', data.user.email);    // Stocker l'email dans sessionStorage
            window.location.href = '/family-setup';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    });
}

function handleCredentialResponse(response) {
    fetch('/register/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: response.credential })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Connexion réussie' || data.message === 'Inscription réussie avec Google') {
            sessionStorage.setItem('prenom', data.user.prenom);  // Stocker le prénom dans sessionStorage
            sessionStorage.setItem('nom', data.user.nom);        // Stocker le nom dans sessionStorage
            sessionStorage.setItem('email', data.user.email);    // Stocker l'email dans sessionStorage
            window.location.href = '/family-setup';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    });
}

function checkInputs() {
    const prenom = document.getElementById('prenom-input');
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
    const registerButton = document.getElementById('register-button');
    const passwordInstructions = document.getElementById('password-instructions');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (prenom.value && email.value && password.value.match(passwordRegex)) {
        registerButton.disabled = false;
        registerButton.style.backgroundColor = '#7059D7';
        registerButton.style.color = '#FFF';
        prenom.style.borderColor = '#52A5FF';
        email.style.borderColor = '#52A5FF';
        password.style.borderColor = '#52A5FF';
        passwordInstructions.style.color = '#52A5FF';
    } else {
        registerButton.disabled = true;
        registerButton.style.backgroundColor = '';
        registerButton.style.color = '';
        prenom.style.borderColor = '';
        email.style.borderColor = '';
        password.style.borderColor = '';
        passwordInstructions.style.color = password.value ? 'red' : '';
    }
}

document.getElementById('prenom-input').addEventListener('input', checkInputs);
document.getElementById('email-input').addEventListener('input', checkInputs);
document.getElementById('password-input').addEventListener('input', checkInputs);

if (!navigator.cookieEnabled) {
document.getElementById('message').innerText = 'Les cookies sont désactivés dans votre navigateur. Veuillez les activer pour utiliser l\'authentification Google.';
}

document.addEventListener('DOMContentLoaded', (event) => {
// Vérifiez si un script Google n'est pas chargé
const googleSignInButton = document.querySelector('.g_id_signin');
if (!googleSignInButton) {
  const messageDiv = document.createElement('div');
  messageDiv.style.color = 'red';
  messageDiv.innerText = 'Il semble qu\'un bloqueur de publicités ou un autre logiciel de blocage empêche certaines fonctionnalités de fonctionner correctement. Veuillez désactiver ces extensions pour ce site.';
  document.body.prepend(messageDiv);
}
});