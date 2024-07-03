document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('role-selection-form');
    const email = sessionStorage.getItem('email');

    if (!email) {
        window.location.href = '/login';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const selectedRole = document.querySelector('input[name="role"]:checked').value;

        try {
            const response = await fetch('/update-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, role: selectedRole })
            });

            if (response.ok) {
                window.location.href = '/success-register';
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});