# Claude Chat Exporter

## 📄 Description

Application web complète permettant d'exporter vos conversations Claude en documents professionnels (PDF, DOCX, TXT, Markdown, HTML).

## ✨ Fonctionnalités

### Page d'accueil
- Présentation moderne et responsive
- Section Hero avec appel à l'action
- Démonstration des fonctionnalités
- FAQ interactive
- Navigation fluide

### Interface d'application
- **Import de lien Claude** : Collez l'URL de votre conversation
- **Validation automatique** : Détection du format Claude
- **Historique des liens** : Accès rapide aux conversations récentes
- **Éditeur riche** : Modification du contenu avant export
- **Aperçu PDF** : Visualisation en temps réel
- **Paramètres d'export** : Format, qualité, orientation

### Options d'édition
- Mise en forme texte (gras, italique, souligné)
- Titres hiérarchiques (H1, H2, H3)
- Listes à puces et numérotées
- Citations et blocs de code
- Choix du style (ebook, rapport, conversation, professionnel)
- Personnalisation police et taille

### Export
- Multiples formats : PDF, DOCX, TXT, Markdown, HTML
- Paramètres PDF avancés (A4/Letter, portrait/paysage)
- Qualité d'export ajustable
- Signets et table des matières
- Téléchargement direct
- Copie dans le presse-papiers
- Partage par email

### Historique
- Tableau des exports précédents
- Recherche et filtrage
- Re-téléchargement
- Suppression d'entrées

## 🏗️ Architecture

```
/project
│
├── /frontend
│   ├── /pages
│   │   └── index.html          # Page principale
│   ├── /styles
│   │   └── main.css            # Feuilles de style
│   ├── /services
│   │   └── app.js              # Logique applicative
│   ├── /components             # Composants UI
│   └── /assets                 # Ressources statiques
│
├── /backend
│   ├── /api                    # Routes API
│   ├── /extractors             # Extraction Claude
│   ├── /pdf                    # Génération PDF
│   ├── /storage                # Gestion fichiers
│   └── /utils                  # Utilitaires
│
├── /database                   # Schémas BDD
├── /exports                    # Fichiers générés
└── /temp                       # Fichiers temporaires
```

## 🚀 Technologies

### Frontend
- HTML5 sémantique
- CSS3 avec variables custom
- JavaScript ES6+
- LocalStorage pour la persistance

### Backend (à implémenter)
- Node.js + Express
- Puppeteer/Playwright pour l'extraction
- PDFKit ou jsPDF pour la génération PDF
- Système de stockage temporaire

## 💻 Installation

### 1. Cloner le repository
```bash
git clone <repository-url>
cd claude-chat-exporter
```

### 2. Ouvrir directement
L'application frontend peut être ouverte directement dans un navigateur :
```bash
open frontend/pages/index.html
```

### 3. Ou utiliser un serveur local
```bash
# Avec Python
cd frontend/pages
python -m http.server 8000

# Avec Node.js (npx)
npx serve frontend/pages
```

## 🎨 Thèmes

L'application supporte deux thèmes :
- **Clair** : Interface lumineuse et épurée
- **Sombre** : Mode dark pour le confort visuel

Le thème est sauvegardé localement et persiste entre les sessions.

## 🔒 Sécurité

- Aucune donnée n'est stockée sur serveur (version frontend)
- Les conversations sont traitées localement
- Suppression automatique des fichiers temporaires
- Support HTTPS recommandé pour la production

## 📱 Responsive Design

L'interface s'adapte à tous les écrans :
- Desktop (≥ 968px)
- Tablet (768px - 968px)
- Mobile (< 768px)

## 🛣️ Roadmap

### Version actuelle (Frontend)
- ✅ Page d'accueil complète
- ✅ Interface d'application fonctionnelle
- ✅ Éditeur de texte riche
- ✅ Aperçu PDF
- ✅ Système d'historique
- ✅ Thème clair/sombre

### À implémenter (Backend)
- [ ] Extracteur Claude réel (Puppeteer)
- [ ] API REST complète
- [ ] Authentification utilisateur
- [ ] Stockage cloud
- [ ] Génération PDF server-side
- [ ] Export vers Kindle/ePub
- [ ] Résumé automatique IA
- [ ] Traduction de conversations

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Committer les changements (`git commit -m 'Add some AmazingFeature'`)
4. Pusher vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est distribué sous licence MIT.

## 📞 Contact

Support : support@claudeexporter.com

---

**Note** : Cette version est une démonstration frontend. Pour une utilisation en production avec extraction réelle des conversations Claude, une implémentation backend avec Puppeteer/Playwright est nécessaire.
