document.addEventListener('DOMContentLoaded', () => {
    const invitationCode = sessionStorage.getItem('invitationCode');
    if (invitationCode) {
        document.getElementById('invitationCode').textContent = invitationCode;
    }

    document.querySelector('.copy-code').addEventListener('click', () => {
        copyCodeToClipboard();
    });
});

function copyCodeToClipboard() {
    const code = document.getElementById('invitationCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code d\'invitation copié dans le presse-papiers');
    }, (err) => {
        console.error('Erreur lors de la copie du code : ', err);
    });
}