# ProxiSport


### BUTS

Répertorier et afficher sur une carte tous les espaces publics extérieurs où l'on peut pratiquer du sport tout en apportant une description pour chacun de ces espaces :
- le type de sport qu'il est possible de pratiquer,
- l'adresse,
- des images,
- des avis sur les installations présentes ou sur l'espace public lui-même.

Créer un profil utilisateur qui permet à ce dernier de :
- donner des avis pour chaque espace sportif,
- proposer d'autres lieux où faire du sport,
- sauvegarder ses lieux favoris,
- partager ses habitudes sportives et d'échanger sur celles des autres => créer une communauté.


### CONTEXTE D'UTILISATION

Pour les sportifs assidus ou temporaires en extérieur en France.

Avec un smartphone, une tablette ou un PC.

L'accès Internet est requis. 
- si pas d'Internet, afficher un message d'avertissement.


### TÂCHES

#### Page d'accueil
1 - Mettre en place 2 champs de recherche : 
* le premier affiche des suggestions de résultats pour la commune où l'utilisateur désire faire du sport => requête à faire en **AJAX** avec la méthode GET (pour lire les noms de communes qu'il y a dans l'*API* Google Maps).
* le second renseigne les filtres d'activités sportives choisies par l'utilisateur après qu'il ait cliqué sur un ou plusieurs boutons.
* puis la page d'accueil envoie ces données en méthode GET à la page "Map".

2 - Proposer deux liens pour la création et la connexion de compte utilisateur :
* si l'un des deux est cliqué, une requête **AJAX** en méthode GET est exécutée pour afficher un formulaire qui permet soit de s'inscrire, soit de se connecter.
* puis le formulaire est envoyé en POST à la page "User".

3 - Avertir l'utilisateur des conditions générales d'utilisation :
* le faire sous la forme d'un pop-up (plus ou moins) lorsque l'application est utilisée pour la première fois.
* puis laisser un lien en bas de page pour que ces conditions puissent être consultées plus tard.

#### Page Map
1 - Afficher la carte de la commune désirée :
* après avoir envoyé une requête en méthode GET à l'*API* Google Maps.

2 - Situer sur cette carte les coordonnées des espaces sportifs recherchés sous la forme de points/marqueurs :
* dans un premier temps, envoyer une requête en méthode GET à l'*API* Base Adresse Nationale (BAN).
* puis, avec les coordonnées obtenues, faire une correspondance avec les filtres utilisés par l'utilisateur.
* enfin styliser ces coordonnées avec les icônes "map-marker" de Fontawesome (donner un autre style aux lieux ajoutés par les utilisateurs).

3 - Montrer (requête **AJAX** en méthode GET) pour chaque espace sportif l'adresse, des images et les avis. Pour les avis :
* notation sur 5 étoiles liée à un commentaire
* faire 2 catégories => 1) évaluer les installations dédiées à la pratique sportive et 2) juger l'environnement où se trouvent ces installations.
* faire une notation moyenne de tous ces avis pour chaque catégorie.

4 - Si l'utilisateur détient un compte, il obtient le droit de :
* CRUD en **AJAX** de son avis => requêtes POST GET PUT DELETE.
* CRUD en **AJAX** de ses lieux favoris => requêtes POST GET PUT DELETE.
* ajouter de nouvelles images sur un espace sportif auquel il a déjà donné son avis.
* ajouter un nouvel espace sportif dans la base de données de l'application => requête à faire en **AJAX** avec la méthode POST.

#### Page User
1 - Afficher les détails du compte :
* requête **AJAX** avec la méthode GET.

2 - Modifier le compte :
* requête **AJAX** avec la méthode PUT.

3 - Supprimer le compte :
* requête **AJAX** avec la méthode DELETE.

***⚠️ Mettre de la PUBLICITÉ dans chaque page ⚠️***


### ÉQUIPE

6 étudiants débutant dans le milieu du développement web et mobile :
- Axel
- Nico
- Mohamed
- Mourad
- Yazid
- Yohan


### BUDGET

78j/hommes => rénumérés par les annonceurs de publicité.