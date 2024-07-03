document.addEventListener('DOMContentLoaded', () => {
    const firstName = sessionStorage.getItem('prenom');
    if (firstName) {
        document.getElementById('user-first-name').textContent = firstName;
    }
});