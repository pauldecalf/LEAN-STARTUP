document.addEventListener('DOMContentLoaded', function() {
    const ctaPopupSettings = document.getElementById('cta-popup-settings');
    const settingsPopup = document.getElementById('settings-popup');

    ctaPopupSettings.addEventListener('click', function() {
        settingsPopup.classList.add('show');
        settingsPopup.classList.remove('hidden');
    });
  });


function openCamera() {
    const imageInput = document.getElementById('image-input');
    imageInput.setAttribute('capture', 'environment'); // Force à ouvrir la caméra
    imageInput.click();
}

function openFileManager() {
    const imageInput = document.getElementById('image-input');
    imageInput.removeAttribute('capture'); // Permet de sélectionner des fichiers normalement
    imageInput.click();
}

function uploadImage() {
  const email = sessionStorage.getItem('email');
  const imageData = new FormData();
  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];

  imageData.append('image', file);
  imageData.append('email', email); // Ajouter l'email au FormData

  fetch('/upload-profile-image', {
    method: 'POST',
    body: imageData,
  })
  .then(response => response.json())
  .then(data => {
    // redirection vers la page suivante
    window.location.href = '/profil-onboarding-3';
  })
}

document.addEventListener('DOMContentLoaded', function() {
    const ctaPopupSettings = document.getElementById('cta-popup-settings');
    const settingsPopup = document.getElementById('settings-popup');
    const afterselectpicture = document.getElementById('after-select-picture');

    ctaPopupSettings.addEventListener('click', function() {
        settingsPopup.classList.add('show');
        settingsPopup.classList.remove('hidden');
    });

    // Gestion de la sélection de fichier
    document.getElementById('image-input').addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Assumer que `.profile-picture` est la classe de l'élément où l'image de profil doit être montrée
                const profilePicture = document.querySelector('.profile-picture');
                if (profilePicture) {
                    profilePicture.style.backgroundImage = `url(${e.target.result})`;
                }
            };
            reader.readAsDataURL(file);
        }
    });

document.getElementById('image-input').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {

            // Cacher le SVG par défaut
            const defaultSvg = document.getElementById('default-profile-svg');
            if (defaultSvg) {
                defaultSvg.style.display = 'none';
            }

            const profilePicture = document.querySelector('.profile-picture');
            // Assurez-vous que le div est vide et caché
            profilePicture.innerHTML = '';
            profilePicture.style.display = 'none';  // Réinitialise le style si nécessaire

            const newImg = document.createElement('img');
            newImg.src = e.target.result;
            newImg.alt = 'Image de profil';

            profilePicture.appendChild(newImg);

            // Rendre le div visible
            profilePicture.style.display = 'block';
            settingsPopup.classList.add('hidden');
            ctaPopupSettings.classList.add('hidden');
            afterselectpicture.classList.remove('hidden');
            
        };

        reader.readAsDataURL(file);
    }

});



});