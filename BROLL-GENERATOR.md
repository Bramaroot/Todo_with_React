# 🎬 Générateur B-Roll - Documentation

## Vue d'ensemble

Le Générateur B-Roll est un outil professionnel pour créer rapidement des images verticales (9:16) optimisées pour les réseaux sociaux (TikTok, Instagram Stories, Facebook).

## Fonctionnalités

### 🎨 Contenu Personnalisable
- **Headline**: Texte principal (max 2 lignes, 60 caractères)
- **Subheadline**: Texte secondaire (1 ligne, 40 caractères)
- **Image d'arrière-plan**: Upload d'image personnalisée (format 9:16 recommandé)

### 👤 Branding Persistant
Les paramètres de branding sont sauvegardés automatiquement:
- Photo de profil (ronde, avec bordure colorée)
- Nom
- Poste/Fonction
- Couleur d'accent (8 presets + sélecteur personnalisé)
- Opacité de l'overlay (0-100%)
- Opacité de la bande inférieure (0-100%)

### 📐 Spécifications Techniques

**Format de sortie:**
- Dimensions: 1080 × 1920 pixels
- Format: PNG
- Ratio: 9:16 (vertical)
- Optimisé pour: TikTok, Instagram Stories, Facebook Stories

**Zones de l'image:**
1. **Arrière-plan**: Image uploadée + overlay sombre configurable
2. **Zone centrale**: Headline et subheadline avec texte contrasté
3. **Bande inférieure**: Photo de profil + Nom + Poste (fond semi-opaque)

### 💾 Sauvegarde Automatique

Tous les paramètres sont sauvegardés dans localStorage:
- `broll-settings`: Photo, nom, poste, couleurs, opacités
- `broll-content`: Headline, subheadline, image de fond

Les paramètres persistent entre les sessions pour une utilisation rapide.

### 📱 Responsive

- **Desktop**: Preview en temps réel à gauche, contrôles à droite
- **Tablet**: Layout adaptatif
- **Mobile**: Layout vertical avec preview et contrôles empilés

## Utilisation

### 1. Première Configuration

1. Cliquez sur "Paramètres Branding"
2. Uploadez votre photo de profil
3. Entrez votre nom et poste
4. Choisissez votre couleur d'accent
5. Ajustez les opacités selon vos préférences

Ces paramètres seront réutilisés automatiquement.

### 2. Création d'une Image

1. Entrez votre **Headline** (message principal)
2. Entrez votre **Subheadline** (message secondaire)
3. Uploadez une **image d'arrière-plan**
4. Prévisualisez en temps réel
5. Cliquez sur **"Exporter en PNG"**

### 3. Export

Le fichier PNG sera téléchargé automatiquement avec le nom:
```
broll-[timestamp].png
```

Vous recevrez une notification de succès.

## Conseils d'Utilisation

### Pour les Headlines
- **Courtes et percutantes**: Max 2 lignes
- **Lisibles**: Évitez les phrases trop longues
- **Accrocheurs**: Questions, affirmations fortes
- **Exemples**:
  - "Doublez Votre Productivité"
  - "Le Secret de la Réussite"
  - "Transformez Vos Idées"

### Pour les Images d'Arrière-Plan
- **Format vertical**: 9:16 idéal (1080×1920)
- **Haute résolution**: Minimum 1080px de largeur
- **Contraste**: Choisir des images qui contrastent avec le texte blanc
- **Sujet centré**: Le sujet principal au centre (zone centrale réservée au texte)
- **Formats supportés**: PNG, JPG, WEBP

### Choix de Couleur d'Accent
- **Hype Blue (#18636B)**: Professionnel, tech
- **Hype Yellow (#F9C74C)**: Énergique, optimiste
- **Personnalisé**: Utilisez votre couleur de marque

### Opacités Recommandées
- **Overlay**: 40-60% pour un bon contraste
- **Bande inférieure**: 80-90% pour une bonne lisibilité

## Cas d'Usage

### 1. Citations Motivationnelles
```
Headline: "Le Succès N'Est Pas un Accident"
Subheadline: "C'est du Travail Quotidien"
Background: Image inspirante
```

### 2. Annonces
```
Headline: "Nouveau Projet Disponible"
Subheadline: "Découvrez-le Maintenant"
Background: Image du projet
```

### 3. Témoignages
```
Headline: "Incroyable Résultat!"
Subheadline: "— Client Satisfait"
Background: Image du produit/service
```

### 4. Tips/Conseils
```
Headline: "Astuce du Jour"
Subheadline: "#Productivité"
Background: Image pertinente
```

## Workflow Recommandé

### Pour Créateurs de Contenu

**Préparation (une fois):**
1. Configurez vos paramètres de branding
2. Préparez une collection d'images d'arrière-plan
3. Notez vos couleurs de marque

**Création quotidienne (2 min/image):**
1. Entrez le texte
2. Sélectionnez l'image
3. Ajustez l'overlay si nécessaire
4. Exportez

**Batch Creation:**
- Créez plusieurs variations en changeant uniquement le texte
- Gardez la même image de fond pour cohérence
- Variez les couleurs d'accent pour différentes séries

## Limitations Actuelles

- Pas de templates pré-définis (à venir)
- Pas d'historique des créations (à venir)
- Pas de partage direct sur réseaux sociaux (à venir)
- Une seule police de caractère (Inter)

## Évolutions Futures

- [ ] Bibliothèque de templates
- [ ] Historique des créations avec thumbnails
- [ ] Export en batch (plusieurs images à la fois)
- [ ] Intégration avec l'app Todo (stats visuelles)
- [ ] Plus de polices et styles de texte
- [ ] Filtres d'image intégrés
- [ ] Animations pour stories
- [ ] Partage direct sur réseaux sociaux

## Support

Pour toute question ou suggestion d'amélioration, contactez l'équipe Hype Technologies.

---

**Version**: 1.0.0
**Dernière mise à jour**: Janvier 2026
**Compatibilité**: Chrome, Firefox, Safari, Edge (dernières versions)
