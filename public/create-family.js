document.addEventListener('DOMContentLoaded', () => {
    const email = sessionStorage.getItem('email');
    if (!email) {
        window.location.href = '/login';
    } else {
        document.getElementById('user-email').value = email;
    }

    const familyNameInput = document.getElementById('familyname');
    const submitButton = document.querySelector('.create-family-cta-continue');

    familyNameInput.addEventListener('input', () => {
        if (familyNameInput.value.length >= 3) {
            familyNameInput.style.borderColor = '#52A5FF';
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#7059D7';
            submitButton.style.color = '#FFF';
        } else {
            familyNameInput.style.borderColor = '';
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '';
            submitButton.style.color = '';
        }
    });

    document.getElementById('create-family-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('/create-family', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                // Stocker le code d'invitation dans sessionStorage
                sessionStorage.setItem('invitationCode', result.invitationCode);
                window.location.href = '/family-invitation';
            } else {
                document.querySelector('.error-message').innerText = result.message;
                document.querySelector('.error-message').style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            document.querySelector('.error-message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
            document.querySelector('.error-message').style.display = 'block';
        }
    });
});