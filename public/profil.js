document.addEventListener('DOMContentLoaded', function() {
    const email = sessionStorage.getItem('email');
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    if (email) {
      fetch('/profil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
         const houseRulesDiv = document.getElementById('house-rules');
        const familyNameElement = document.getElementById('familyName');
        const prenomElement = document.getElementById('prenom');
        prenomElement.textContent = data.prenom;
  
        const imageProfil = document.getElementById('imageProfil');
        imageProfil.src = data.imageProfil;
         if (data && data.role) {
          // Capitalise la première lettre du rôle et combine avec le nom de la famille
          const roleFormatted = capitalizeFirstLetter(data.role);
          familyNameElement.textContent = `${roleFormatted} de la famille ${data.nomFamily}`;
  
          // Affiche la div house-rules uniquement si le rôle est 'Parent'
          if (data.role.toLowerCase() === 'parent') {
            houseRulesDiv.style.display = 'block';
          } else {
            houseRulesDiv.style.display = 'none';
          }
        } else {
          familyNameElement.textContent = 'Nom de la famille : Non trouvé';
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête:', error);
        document.getElementById('familyName').textContent = 'Erreur lors du chargement du nom de la famille.';
      });
    } else {
      console.error('Email non trouvé dans sessionStorage');
      document.getElementById('familyName').textContent = 'Email non trouvé dans sessionStorage.';
    }
  
  
  
  
          const ctaPopupSettings = document.getElementById('cta-popup-settings');
          const settingsPopup = document.getElementById('settings-popup');
  
          ctaPopupSettings.addEventListener('click', function() {
              settingsPopup.classList.add('show');
              settingsPopup.classList.remove('hidden');
          });
  
  
  
  
   // Fonction pour vérifier si la div est défilée tout en haut
    function isScrolledToTop(element) {
      return element.scrollTop === 0;
    }
  
    // Vérifiez si l'élément existe avant d'ajouter un écouteur d'événement
    if (settingsPopup) {
      // Variable pour surveiller le premier scroll vers le haut
      let firstScrollToTopDone = false;
  
      // Écouteur d'événement pour le défilement
      settingsPopup.addEventListener('scroll', function() {
        if (isScrolledToTop(settingsPopup)) {
          if (firstScrollToTopDone) {
            // Si le premier scroll vers le haut est déjà fait, fermez la div au deuxième scroll en haut
            settingsPopup.classList.remove('show');
            firstScrollToTopDone = false; // Réinitialisez la condition pour la prochaine fois
          } else {
            // Marquez que le premier scroll vers le haut est fait
            firstScrollToTopDone = true;
          }
        }
      });
    } else {
      console.log('L\'élément #settings-popup n\'a pas été trouvé dans le DOM.');
    }
  
    });