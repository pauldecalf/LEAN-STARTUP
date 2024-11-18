
# 🌈 Smoozy

Smoozy est une application web conçue pour améliorer la vie quotidienne des familles recomposées en facilitant la communication, l'organisation et la gestion des tâches.

## ✨ Fonctionnalités principales

- 🛠️ **Mise en place de règles de vie communes** : Établissez ensemble les "5 commandements du foyer" et les devoirs de chacun pour assurer une harmonie familiale.
- 🌟 **Mood tracker individuel et partagé** : Suivez les émotions de chaque membre de la famille grâce à un journal d’humeurs partagé.
- 👤 **Profils personnalisés** : Créez des profils amusants pour chaque membre avec leurs passions, loisirs et plats préférés pour mieux se connaître.
- 🎮 **Gamification du quotidien** : Transformez les corvées en une aventure ludique en gagnant des points pour chaque tâche accomplie et débloquez des récompenses.

## 💻 Technologies utilisées

- 🚀 **Backend** : NestJS pour une architecture backend modulable et performante.
- 🌐 **API** : Node.js avec Express pour gérer les requêtes et la logique métier.
- 🍃 **Base de données** : MongoDB pour le stockage des données utilisateurs et des configurations.
- 🔐 **Authentification** : JWT (JSON Web Tokens) pour sécuriser les sessions utilisateurs.
- 🎨 **Style** : Tailwind CSS pour un design moderne et responsive.

## 🚀 Installation et démarrage

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/pauldecalf/LEAN-STARTUP.git
   cd LEAN-STARTUP
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :

   Créez un fichier `.env` à la racine du projet et définissez les variables suivantes :

   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Lancer l'application** :

   ```bash
   npm run start:dev
   ```

   🌍 L'application sera accessible sur `http://localhost:3000`.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations ou signaler des problèmes, veuillez ouvrir une issue ou soumettre une pull request sur le dépôt GitHub.

## 👨‍💻 Auteur

Développé par [Paul Decalf](https://pauldecalf.fr/), développeur web freelance spécialisé en Symfony et PHP.

---

🔗 Pour plus d'informations, visitez le site officiel de Smoozy : [smoozy.pauldecalf.fr](https://smoozy.pauldecalf.fr/).
