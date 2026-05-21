# Genbook
Voici une structure complète et logique pour un site web HTML permettant :

1. de coller un lien de conversation Claude,
2. d’extraire toute la discussion,
3. de la reformater proprement,
4. de générer un PDF,
5. puis de sauvegarder/exporter le fichier.

---

# Structure du site web

## 1. PAGE D’ACCUEIL

### Objectif

Présenter l’outil et son fonctionnement.

### Éléments

* Logo
* Nom de l’application
* Slogan
* Bouton “Commencer”
* Illustration explicative
* Présentation rapide des fonctionnalités

### Sections

* Hero section
* Fonctionnalités
* Comment ça marche
* FAQ
* Footer

---

# 2. PAGE / INTERFACE PRINCIPALE

## A. Barre supérieure (Header)

### Contenu

* Logo
* Nom de l’outil
* Menu navigation
* Bouton thème clair/sombre
* Profil utilisateur (optionnel)

---

# 3. ZONE D’IMPORT DU LIEN CLAUDE

## Bloc principal

### Champs

* Champ URL du chat Claude
* Bouton “Analyser”
* Bouton “Coller automatiquement”
* Historique des liens récents

### Vérifications

* Validation du lien
* Détection format Claude
* Vérification accessibilité conversation

### États UI

* Attente
* Analyse en cours
* Succès
* Erreur

---

# 4. MODULE D’EXTRACTION DE CONVERSATION

## Fonction

Lire la conversation complète.

### Ce module gère :

* Messages utilisateur
* Réponses Claude
* Horodatage
* Code blocks
* Images éventuelles
* Tableaux
* Titres
* Mise en page

### Affichage

* Timeline conversationnelle
* Bulles de discussion
* Pagination longue conversation
* Scroll intelligent

---

# 5. MODULE DE TRANSCRIPTION / FORMATAGE

## Objectif

Transformer la discussion en document lisible.

### Options de formatage

* Style ebook
* Style rapport
* Style brut
* Style conversation
* Style professionnel

### Paramètres utilisateur

* Taille police
* Police d’écriture
* Marges
* Couleurs
* En-têtes/pieds de page
* Numérotation pages

---

# 6. MODULE D’ÉDITION

## Fonction

Permettre de modifier le contenu avant export.

### Fonctionnalités

* Éditeur de texte riche
* Suppression de messages
* Renommage sections
* Ajout titre
* Ajout couverture PDF
* Réorganisation blocs

### Outils

* Gras
* Italique
* Titres
* Listes
* Citations
* Blocs code

---

# 7. APERÇU PDF

## Vue temps réel

### Affichage

* Simulation A4
* Pagination réelle
* Aperçu couverture
* Table des matières automatique

### Contrôles

* Zoom
* Mode lecture
* Plein écran
* Navigation pages

---

# 8. MODULE DE GÉNÉRATION PDF

## Fonction

Créer le fichier final.

### Paramètres PDF

* Format A4 / Letter
* Portrait / Paysage
* Compression
* Qualité images
* Insertion métadonnées

### Options avancées

* Signet PDF
* Liens cliquables
* Sommaire dynamique
* Export haute qualité

---

# 9. SAUVEGARDE & EXPORT

## Formats disponibles

* PDF
* DOCX
* TXT
* Markdown
* HTML

### Boutons

* Télécharger
* Sauvegarder localement
* Envoyer email
* Copier dans presse-papiers

---

# 10. HISTORIQUE DES EXPORTS

## Tableau historique

* Nom fichier
* Date
* Taille
* Type export
* Bouton re-téléchargement

### Fonctions

* Recherche
* Tri
* Suppression
* Duplication

---

# 11. ESPACE UTILISATEUR (OPTIONNEL)

## Fonctionnalités

* Connexion
* Création compte
* Sauvegarde cloud
* Synchronisation
* Historique personnel

---

# 12. PARAMÈTRES

## Réglages globaux

* Langue
* Thème
* Qualité PDF
* Taille max conversation
* Auto-sauvegarde

---

# 13. SYSTÈME BACKEND (LOGIQUE)

## Modules serveur nécessaires

### A. Extracteur Claude

Responsable de :

* lire la page,
* récupérer les messages,
* parser le HTML,
* nettoyer le contenu.

### B. Parser de conversation

Transforme les données brutes en structure exploitable.

### C. Générateur PDF

Transforme le contenu formaté en fichier téléchargeable.

### D. Gestionnaire de fichiers

* sauvegarde,
* suppression,
* stockage temporaire.

---

# 14. ARCHITECTURE DES DOSSIERS

```text
/project
│
├── /frontend
│   ├── /pages
│   ├── /components
│   ├── /styles
│   ├── /assets
│   └── /services
│
├── /backend
│   ├── /api
│   ├── /extractors
│   ├── /pdf
│   ├── /storage
│   └── /utils
│
├── /database
│
├── /exports
│
└── /temp
```

---

# 15. FLOW UTILISATEUR

## Parcours complet

### Étape 1

L’utilisateur colle un lien Claude.

### Étape 2

Le système analyse la conversation.

### Étape 3

Les messages sont extraits.

### Étape 4

Le contenu est reformatté.

### Étape 5

L’utilisateur modifie si besoin.

### Étape 6

Le PDF est généré.

### Étape 7

Le fichier est téléchargé/sauvegardé.

---

# 16. TECHNOLOGIES CONSEILLÉES

## Frontend

* HTML5
* CSS3
* JavaScript
* React (optionnel)

## Backend

* Node.js
* Express

## Extraction contenu

* Puppeteer
* Playwright
* Cheerio

## Génération PDF

* jsPDF
* PDFKit
* Puppeteer PDF

---

# 17. SÉCURITÉ IMPORTANTE

## Points critiques

* Protection des liens privés
* Suppression auto des conversations temporaires
* Chiffrement exports
* Limitation taille uploads
* Gestion erreurs extraction

---

# 18. DESIGN UI RECOMMANDÉ

## Style conseillé

* Minimaliste
* Moderne SaaS
* Interface type Notion/ChatGPT
* Responsive mobile + desktop

### Couleurs

* Blanc / noir / bleu
* Accent violet IA
* Mode sombre

---

# 19. BONUS POSSIBLES

## Fonctionnalités premium

* Résumé automatique IA
* Détection chapitres
* Création ebook automatique
* Traduction conversation
* Export Kindle/ePub
* OCR images du chat
* Fusion plusieurs conversations
