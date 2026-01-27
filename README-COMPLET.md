# 🎯 Hype Tools - Suite de Productivité & Création

Une suite d'outils professionnels combinant gestion de tâches et création de contenu visuel pour réseaux sociaux.

## 🚀 Fonctionnalités

### 📋 Todo App Pro
Application complète de gestion de tâches avec:
- ✅ Gestion par priorité (Urgente, Moyenne, Basse)
- 📅 Dates d'échéance et rappels
- 🔔 Notifications push navigateur
- 🏷️ Tags et catégories
- 📝 Notes détaillées
- 🔍 Recherche et filtres avancés
- 📊 Statistiques en temps réel
- 💾 Sauvegarde automatique

### 🎬 B-Roll Generator
Créateur d'images professionnelles pour réseaux sociaux:
- 📱 Format vertical 9:16 (1080×1920)
- 🎨 Branding personnalisable et persistant
- 🖼️ Upload d'images d'arrière-plan
- ⚙️ Contrôles d'opacité et couleurs
- 💾 Export PNG haute qualité
- ⚡ Preview en temps réel
- 🎯 Optimisé pour TikTok, Instagram, Facebook

## 🎨 Design System

**Palette Hype:**
- 🔵 Bleu-vert principal: `#18636B`
- 💛 Jaune doré accent: `#F9C74C`
- 🌊 Bleu néon: `#43A6B0`
- 🌙 Mode sombre par défaut

## 🛠️ Technologies

- **Framework**: React 18 + TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Icônes**: Lucide React
- **Export Images**: html-to-image
- **PWA**: vite-plugin-pwa
- **Persistence**: localStorage

## 📦 Installation

```bash
# Cloner le repository
git clone [votre-repo]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour production
npm run build

# Prévisualiser le build
npm run preview

# Linter le code
npm run lint
```

## 🚦 Démarrage Rapide

### 1. Première Utilisation

**Todo App:**
1. Ouvrez l'application
2. Cliquez sur "Activer les notifications" (recommandé)
3. Ajoutez votre première tâche
4. Explorez les filtres et le tri

**B-Roll Generator:**
1. Naviguez vers "B-Roll Generator" dans la barre de navigation
2. Configurez vos paramètres de branding (une seule fois)
3. Entrez votre texte et uploadez une image
4. Cliquez sur "Exporter en PNG"

### 2. Navigation

La barre de navigation en haut permet de basculer entre:
- **Todo App**: Gérez vos tâches
- **B-Roll Generator**: Créez des visuels

## 📚 Documentation Détaillée

- **CLAUDE.md**: Guide technique pour développeurs
- **BROLL-GENERATOR.md**: Documentation complète du générateur B-Roll
- **Code comments**: Documentation inline dans le code

## 🎯 Cas d'Usage

### Pour Créateurs de Contenu
1. **Gestion quotidienne**: Utilisez Todo App pour planifier votre contenu
2. **Création visuelle**: Créez vos visuels TikTok/Instagram avec B-Roll
3. **Rappels**: Recevez des notifications pour vos deadlines
4. **Organisation**: Tags pour catégoriser par plateforme ou thème

### Pour Entrepreneurs
1. **Gestion de projets**: Tasks avec dates et priorités
2. **Communication visuelle**: Annonces et visuels professionnels
3. **Suivi**: Statistiques de productivité
4. **Branding cohérent**: Tous vos visuels avec votre identité

### Pour Professionnels
1. **To-Do professionnel**: Gestion de tâches avancée
2. **Présentations**: Créez des slides visuels rapidement
3. **Marketing**: Visuels pour réseaux sociaux
4. **Partage**: Exportez et partagez facilement

## 🔧 Configuration Avancée

### Notifications Push

Les notifications nécessitent:
- HTTPS (ou localhost pour dev)
- Permission accordée par l'utilisateur
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### PWA (Progressive Web App)

L'application peut être installée sur mobile/desktop:
1. Ouvrez l'app dans votre navigateur
2. Cherchez "Installer l'application" dans le menu
3. Suivez les instructions

### LocalStorage

Données sauvegardées localement:
- `todos-enhanced`: Toutes vos tâches
- `broll-settings`: Vos paramètres de branding
- `broll-content`: Dernier contenu B-Roll

**Backup**: Exportez vos données via les outils de développement du navigateur.

## 🎨 Personnalisation

### Thèmes

Actuellement en mode sombre uniquement. Pour ajouter un mode clair:
1. Dupliquez les variables CSS dans `index.css`
2. Ajoutez un toggle dans la navigation
3. Utilisez `localStorage` pour persister la préférence

### Couleurs

Les couleurs sont définies via CSS custom properties dans `index.css`:
```css
--hype-blue: 187 65% 26%;
--hype-yellow: 44 94% 64%;
```

## 🐛 Debugging

### Problèmes Courants

**Export B-Roll ne fonctionne pas:**
- Vérifiez que l'image est bien chargée
- Attendez que le preview s'affiche
- Essayez avec une image plus petite

**Notifications ne s'affichent pas:**
- Vérifiez les permissions du navigateur
- Assurez-vous d'être en HTTPS
- Redémarrez le navigateur si nécessaire

**Données perdues:**
- Vérifiez localStorage dans DevTools
- Ne videz pas le cache navigateur
- Utilisez le mode navigation privée avec précaution

## 🚀 Évolutions Futures

### Todo App
- [ ] Mode collaboratif
- [ ] Synchronisation cloud
- [ ] Intégration calendrier
- [ ] Statistiques avancées
- [ ] Thèmes personnalisables

### B-Roll Generator
- [ ] Bibliothèque de templates
- [ ] Historique des créations
- [ ] Export en batch
- [ ] Filtres d'image intégrés
- [ ] Animations pour stories
- [ ] Partage direct réseaux sociaux

### Plateforme
- [ ] Authentification utilisateur
- [ ] Stockage cloud
- [ ] API REST
- [ ] Application mobile native
- [ ] Desktop app (Electron)

## 📊 Performances

- ⚡ Build optimisé avec Vite
- 🎨 CSS moderne avec Tailwind v4
- 📦 Code splitting automatique
- 🖼️ Images optimisées en base64
- 💾 LocalStorage pour performance offline

## 🤝 Contribution

Contributions bienvenues! Pour contribuer:
1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changes (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

**Hype Technologies**
- Site: [bramablog.vercel.app](https://bramablog.vercel.app)
- Design: Palette Hype personnalisée

## 🙏 Remerciements

- React Team pour React 18
- Tailwind Labs pour Tailwind CSS
- Lucide pour les icônes
- Tous les contributeurs open-source

---

**Version**: 2.0.0
**Dernière mise à jour**: Janvier 2026
**Status**: Production Ready ✅

Made with 💙 by Hype Technologies
