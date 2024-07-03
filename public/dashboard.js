document.addEventListener('DOMContentLoaded', function() {




    const ignoreLink = document.querySelector('.alerte-regles-de-vie-cta-ignore');
       ignoreLink.addEventListener('click', function(event) {
         event.preventDefault();
         const alertDiv = document.querySelector('.alerte-regles-de-vie');
         const moodTrackerDiv = document.querySelector('.alerte-mood-tracker');
         alertDiv.classList.add('hidden');
         moodTrackerDiv.style.marginTop = '32px';
       });
         
   
         function copyCodeToClipboard() {
     const codeElement = document.querySelector('.popup-content-code-invitation');
     const code = codeElement.textContent;
     navigator.clipboard.writeText(code).then(() => {
       alert('Code copié dans le presse-papier');
     }).catch(err => {
       console.error('Erreur lors de la copie du code : ', err);
     });
   }
   
   function shareLink() {
     const codeElement = document.querySelector('.popup-content-code-invitation');
     const code = codeElement.textContent;
     const url = `${window.location.origin}?code=${code}`;
     navigator.clipboard.writeText(url).then(() => {
       alert('Lien de partage copié dans le presse-papier');
     }).catch(err => {
       console.error('Erreur lors de la copie du lien : ', err);
     });
   }
   
   function shareEmail() {
     const codeElement = document.querySelector('.popup-content-code-invitation');
     const code = codeElement.textContent;
     const subject = 'Invitation à rejoindre notre famille';
     const body = `Bonjour,\n\nVoici le code d'invitation pour rejoindre notre famille : ${code}\n\nCordialement,\n`;
     const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
     window.location.href = mailtoLink;
   }
   
   
   
   const email = sessionStorage.getItem('email');
     if (email) {
       fetch('/dashboard', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email })
       })
       .then(response => response.json())
       .then(data => {
         console.log(data);
         if (Array.isArray(data) && data.length > 0) {
           const familyMembersContainer = document.querySelector('.family-members');
           const user = data[0]; // Assumons que le premier utilisateur de la réponse est celui dont on veut afficher l'idFamille
           
           const idFamille = user.idFamille.toString();
           const lastSixDigits = idFamille.slice(-6);
           document.querySelector('.popup-content-code-invitation').textContent = lastSixDigits;
           
           data.forEach(user => {
             const memberDiv = document.createElement('div');
             memberDiv.classList.add('members');
             // Génére un nombre random de 2 chiffres pour l'id de l'image de profil
   
             const imageUrl = user.imgProfil;
   
             memberDiv.innerHTML = `
               <div class="image-profil" style="background-image: url('${imageUrl}');"></div>
               <p class="name-member">${user.prenom}</p>
             `;
   
               // Assurez-vous que le style de .image-profil est défini correctement dans votre CSS
   
             
             familyMembersContainer.insertBefore(memberDiv, document.getElementById('cta-invit-member'));
           });
         } else {
           console.log('Aucun membre de la famille trouvé.');
         }
       })
       .catch(error => console.error('Error:', error));
     } else {
       console.error('No email found in sessionStorage');
     }
   
   
   
   
           const firstName = sessionStorage.getItem('prenom');
           if (firstName) {
               document.getElementById('user-first-name').textContent = firstName;
           }
   
   
           const invitationPopup = document.getElementById('invitation-popup');
           const inviteButton = document.getElementById('cta-invit-member');
           const closeButton = document.getElementById('close-popup');
   
   
           inviteButton.addEventListener('click', function() {
               invitationPopup.classList.add('show');
               invitationPopup.classList.remove('hidden');
           });
   
           closeButton.addEventListener('click', function() {
               invitationPopup.classList.remove('show');
               // Ajoute un délai pour masquer complètement la popup après l'animation
               setTimeout(() => {
                   invitationPopup.classList.add('hidden');
               }, 300); // Durée de la transition CSS
           });
   
   
   
   
   
     });
   