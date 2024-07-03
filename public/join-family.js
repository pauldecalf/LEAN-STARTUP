document.addEventListener('DOMContentLoaded', () => {
    const email = sessionStorage.getItem('email');
    if (!email) {
        window.location.href = '/login';
        return;
    }

    const form = document.getElementById('join-family-form');
    const inputs = form.querySelectorAll('.family-codes input');
    const submitButton = form.querySelector('button');
    const errorDiv = document.querySelector('.family-code-error');

    inputs.forEach((input, idx) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
            const allFilled = Array.from(inputs).every(inp => inp.value.length === 1);
            if (allFilled) {
                inputs.forEach(inp => inp.style.borderColor = '#52A5FF');
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '#7059D7';
                submitButton.style.color = '#FFF';
            } else {
                inputs.forEach(inp => inp.style.borderColor = '');
                submitButton.disabled = true;
                submitButton.style.backgroundColor = '';
                submitButton.style.color = '';
            }
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const code = Array.from(inputs).map(input => input.value).join('');

        try {
            const response = await fetch('/join-family', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });

            const result = await response.json();
            if (response.ok) {
                window.location.href = '/choix-role';
            } else {
                errorDiv.style.display = 'block';
                errorDiv.querySelector('p').textContent = result.message;
            }
        } catch (error) {
            console.error('Error:', error);
            errorDiv.style.display = 'block';
            errorDiv.querySelector('p').textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
    });
});