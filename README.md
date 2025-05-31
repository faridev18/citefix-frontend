# CitéFix - Application de Signalement Citoyen

## 📋 Description du Projet

CitéFix est une application web moderne permettant aux citoyens de signaler des problèmes urbains (éclairage, voirie, déchets, sécurité) aux autorités locales. L'application facilite la communication entre les citoyens et les services municipaux pour améliorer la qualité de vie urbaine.

## 🚀 Technologies Utilisées

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Base de données**: MongoDB (schéma NoSQL)
- **Authentification**: NextAuth.js (recommandé)
- **Géolocalisation**: API de géolocalisation native
- **Cartes**: Leaflet ou Google Maps (à implémenter)

## 📁 Structure du Projet

<pre>

app/
├── (auth)/
│   ├── connexion/          # Page de connexion
│   └── inscription/        # Page d'inscription
├── admin/                  # Interface d'administration
│   ├── page.tsx           # Dashboard admin
│   ├── techniciens/       # Gestion des techniciens
│   ├── rapports/          # Rapports et statistiques
│   ├── parametres/        # Paramètres système
│   └── utilisateurs/      # Gestion des utilisateurs
├── carte/                 # Carte interactive des signalements
├── signaler/              # Formulaire de signalement
├── signalements/          # Détails des signalements
├── mes-signalements/      # Signalements de l'utilisateur
├── interventions/         # Gestion des interventions
├── profil/                # Profil utilisateur
├── notifications/         # Centre de notifications
├── dashboard/             # Tableau de bord
├── statistiques/          # Statistiques publiques
├── recherche/             # Recherche de signalements
├── aide/                  # Centre d'aide
├── faq/                   # Questions fréquentes
├── a-propos/              # À propos de l'application
├── contact/               # Contact
├── confidentialite/       # Politique de confidentialité
├── conditions/            # Conditions d'utilisation
├── mentions-legales/      # Mentions légales
├── politique-cookies/     # Politique des cookies
├── parametres/            # Paramètres utilisateur
├── activite/              # Journal d'activité
├── changelog/             # Journal des modifications
└── success/               # Page de succès

components/
├── ui/                    # Composants shadcn/ui
├── header.tsx             # En-tête de l'application
├── footer.tsx             # Pied de page
├── map-component.tsx      # Composant de carte
├── recent-reports.tsx     # Signalements récents
├── stats-section.tsx      # Section statistiques
├── mode-toggle.tsx        # Basculeur de thème
└── theme-provider.tsx     # Fournisseur de thème
</pre>


## 🗄️ Schéma de Base de Données MongoDB

### Collections Principales

#### 1. Collection \`users\`
Stocke les informations des utilisateurs (citoyens, techniciens, administrateurs).

<pre>
{
  _id: ObjectId("..."),
  name: "Fatou Diarra",
  email: "fatou.diarra@email.com",
  phone: "+229 XX XX XX XX",
  password: "$2b$10$...", // Hash bcrypt
  avatar: "https://storage.citefix.bj/avatars/user_123.jpg",
  role: "citizen", // "citizen", "technician", "admin", "super_admin"
  status: "active", // "active", "inactive", "suspended", "pending"
  location: {
    address: "Cotonou, Bénin",
    coordinates: {
      type: "Point",
      coordinates: [2.4204, 6.3696] // [longitude, latitude]
    },
    zone: "centre-ville"
  },
  profile: {
    verified: true,
    verificationDate: ISODate("2024-02-15T10:00:00Z"),
    rating: 4.2,
    bio: "Citoyenne engagée pour l'amélioration de ma ville",
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      language: "fr",
      theme: "light"
    }
  },
  stats: {
    reportsCount: 12,
    confirmationsCount: 25,
    commentsCount: 18,
    helpfulVotes: 45
  },
  // Pour les techniciens
  technician: {
    specialties: ["éclairage", "électricité"],
    interventions: {
      total: 156,
      completed: 142,
      inProgress: 3,
      cancelled: 11
    },
    availability: "available", // "available", "busy", "offline"
    workingHours: {
      start: "08:00",
      end: "17:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    }
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: ISODate("2024-01-15T10:00:00Z"),
    loginAttempts: 0,
    lockedUntil: null
  },
  timestamps: {
    createdAt: ISODate("2024-01-15T10:00:00Z"),
    updatedAt: ISODate("2025-05-31T14:30:00Z"),
    lastActive: ISODate("2025-05-31T14:30:00Z")
  }
}
</pre>

#### 2. Collection \`reports\`
Stocke tous les signalements des citoyens.

<pre>
{
  _id: ObjectId("..."),
  title: "Lampadaire cassé devant l'école primaire",
  description: "Le lampadaire ne fonctionne plus depuis 3 jours, créant une zone d'ombre dangereuse pour les enfants qui sortent de l'école.",
  category: "éclairage", // "voirie", "éclairage", "déchets", "sécurité"
  priority: "high", // "low", "medium", "high", "urgent"
  status: "validated", // "reported", "validated", "assigned", "in_progress", "completed", "resolved", "rejected"
  
  location: {
    address: "Rue des Écoles, Zogbo, Cotonou",
    coordinates: {
      type: "Point",
      coordinates: [2.4204, 6.3696]
    },
    zone: "zogbo",
    landmark: "Devant l'École Primaire Publique"
  },
  
  citizen: {
    userId: ObjectId("..."),
    name: "Fatou Diarra",
    anonymous: false
  },
  
  media: [
    {
      type: "image",
      url: "https://storage.citefix.bj/reports/report_123_1.jpg",
      thumbnail: "https://storage.citefix.bj/reports/thumbs/report_123_1_thumb.jpg",
      uploadedAt: ISODate("2025-05-30T12:00:00Z")
    }
  ],
  
  engagement: {
    views: 156,
    confirmations: 12,
    contestations: 1,
    shares: 3,
    bookmarks: 8
  },
  
  assignment: {
    technicianId: ObjectId("..."),
    assignedAt: ISODate("2025-05-31T09:15:00Z"),
    assignedBy: ObjectId("..."),
    estimatedDuration: 120, // minutes
    notes: "Vérifier l'alimentation électrique avant le remplacement"
  },
  
  statusHistory: [
    {
      status: "reported",
      date: ISODate("2025-05-30T12:00:00Z"),
      comment: "Signalement créé par l'utilisateur",
      userId: ObjectId("...")
    },
    {
      status: "validated",
      date: ISODate("2025-05-31T09:15:00Z"),
      comment: "Validé par l'autorité locale",
      userId: ObjectId("...")
    }
  ],
  
  tags: ["urgence", "sécurité", "école"],
  
  timestamps: {
    createdAt: ISODate("2025-05-30T12:00:00Z"),
    updatedAt: ISODate("2025-05-31T09:15:00Z"),
    resolvedAt: null
  }
}
</pre>

#### 3. Collection \`interventions\`
Gère les interventions techniques pour résoudre les signalements.

<pre>
{
  _id: ObjectId("..."),
  reportId: ObjectId("..."),
  technicianId: ObjectId("..."),
  title: "Remplacement du lampadaire défectueux",
  description: "Intervention pour remplacer le lampadaire cassé devant l'école",
  
  status: "in_progress", // "scheduled", "assigned", "in_progress", "completed", "cancelled"
  priority: "high",
  
  scheduling: {
    scheduledDate: ISODate("2025-06-01T08:00:00Z"),
    estimatedDuration: 120, // minutes
    actualStartTime: ISODate("2025-06-01T08:15:00Z"),
    actualEndTime: null
  },
  
  materials: [
    {
      name: "Lampadaire LED 50W",
      quantity: 1,
      unit: "pièce",
      cost: 45000 // en FCFA
    },
    {
      name: "Câbles électriques",
      quantity: 5,
      unit: "mètres",
      cost: 2500
    }
  ],
  
  progress: {
    percentage: 60,
    currentStep: "Installation du nouveau lampadaire",
    steps: [
      {
        name: "Diagnostic",
        completed: true,
        completedAt: ISODate("2025-06-01T08:30:00Z")
      },
      {
        name: "Préparation du matériel",
        completed: true,
        completedAt: ISODate("2025-06-01T09:00:00Z")
      },
      {
        name: "Installation",
        completed: false,
        completedAt: null
      }
    ]
  },
  
  photos: [
    {
      type: "before",
      url: "https://storage.citefix.bj/interventions/int_123_before.jpg",
      takenAt: ISODate("2025-06-01T08:15:00Z")
    },
    {
      type: "progress",
      url: "https://storage.citefix.bj/interventions/int_123_progress.jpg",
      takenAt: ISODate("2025-06-01T10:30:00Z")
    }
  ],
  
  costs: {
    materials: 47500,
    labor: 15000,
    transport: 2500,
    total: 65000
  },
  
  notes: "Intervention en cours, alimentation électrique vérifiée et fonctionnelle",
  
  timestamps: {
    createdAt: ISODate("2025-05-31T09:15:00Z"),
    updatedAt: ISODate("2025-06-01T10:30:00Z")
  }
}
</pre>

#### 4. Collection \`comments\`
Commentaires des utilisateurs sur les signalements.

<pre>
{
  _id: ObjectId("..."),
  reportId: ObjectId("..."),
  userId: ObjectId("..."),
  content: "J'ai aussi remarqué ce problème. C'est vraiment dangereux pour les enfants qui sortent de l'école.",
  
  author: {
    name: "Kofi Mensah",
    role: "citizen",
    verified: true
  },
  
  visibility: "public", // "public", "private", "authority_only"
  
  engagement: {
    likes: 5,
    replies: 2
  },
  
  parentCommentId: null, // Pour les réponses
  
  moderation: {
    flagged: false,
    approved: true,
    moderatedBy: null,
    moderatedAt: null
  },
  
  timestamps: {
    createdAt: ISODate("2025-05-31T14:30:00Z"),
    updatedAt: ISODate("2025-05-31T14:30:00Z")
  }
}
</pre>

#### 5. Collection \`notifications\`
Système de notifications pour les utilisateurs.

<pre>
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  type: "status_change", // "status_change", "comment", "assignment", "resolution", "system"
  title: "Statut mis à jour",
  message: "Votre signalement 'Lampadaire cassé' est maintenant 'En cours d'intervention'",
  
  data: {
    reportId: ObjectId("..."),
    reportTitle: "Lampadaire cassé devant l'école",
    oldStatus: "validated",
    newStatus: "in_progress"
  },
  
  priority: "medium", // "low", "medium", "high"
  
  delivery: {
    channels: ["push", "email"],
    sent: {
      push: {
        sent: true,
        sentAt: ISODate("2025-05-31T14:30:00Z")
      },
      email: {
        sent: true,
        sentAt: ISODate("2025-05-31T14:31:00Z")
      },
      sms: {
        sent: false,
        reason: "User preference disabled"
      }
    }
  },
  
  read: false,
  readAt: null,
  
  timestamps: {
    createdAt: ISODate("2025-05-31T14:30:00Z"),
    scheduledFor: ISODate("2025-05-31T14:30:00Z")
  }
}
</pre>

#### 6. Collection \`votes\`
Votes de confirmation ou contestation des signalements.

<pre>
{
  _id: ObjectId("..."),
  reportId: ObjectId("..."),
  userId: ObjectId("..."),
  type: "confirmation", // "confirmation", "contestation"
  
  details: {
    reason: "J'ai constaté le même problème",
    evidence: "https://storage.citefix.bj/votes/vote_123_evidence.jpg"
  },
  
  location: {
    coordinates: {
      type: "Point",
      coordinates: [2.4205, 6.3697] // Position de l'utilisateur lors du vote
    },
    accuracy: 10 // mètres
  },
  
  timestamps: {
    createdAt: ISODate("2025-05-31T15:00:00Z")
  }
}
</pre>

#### 7. Collection \`categories\`
Catégories de signalements avec leurs configurations.

<pre>
{
  _id: ObjectId("..."),
  name: "éclairage",
  displayName: "Éclairage public",
  description: "Problèmes liés à l'éclairage public : lampadaires, panneaux lumineux, etc.",
  icon: "lightbulb",
  color: "#FFA500",
  
  subcategories: [
    {
      name: "lampadaire",
      displayName: "Lampadaires",
      description: "Lampadaires cassés, défectueux ou manquants"
    },
    {
      name: "panneau_lumineux",
      displayName: "Panneaux lumineux",
      description: "Panneaux de signalisation lumineux"
    }
  ],
  
  priority: {
    default: "medium",
    escalationRules: [
      {
        condition: "near_school",
        priority: "high"
      },
      {
        condition: "main_road",
        priority: "high"
      }
    ]
  },
  
  sla: {
    responseTime: 24, // heures
    resolutionTime: 72 // heures
  },
  
  active: true,
  
  timestamps: {
    createdAt: ISODate("2024-01-01T00:00:00Z"),
    updatedAt: ISODate("2024-01-01T00:00:00Z")
  }
}
</pre>

#### 8. Collection \`zones\`
Zones géographiques avec leurs responsables.

<pre>
{
  _id: ObjectId("..."),
  name: "centre-ville",
  displayName: "Centre-ville",
  description: "Zone du centre-ville de Cotonou",
  
  boundaries: {
    type: "Polygon",
    coordinates: [[
      [2.4100, 6.3600],
      [2.4300, 6.3600],
      [2.4300, 6.3800],
      [2.4100, 6.3800],
      [2.4100, 6.3600]
    ]]
  },
  
  responsibleAuthority: {
    name: "Mairie de Cotonou - Service Technique",
    contact: {
      email: "technique@mairie-cotonou.bj",
      phone: "+229 XX XX XX XX"
    }
  },
  
  technicians: [
    ObjectId("..."), // IDs des techniciens assignés à cette zone
    ObjectId("...")
  ],
  
  stats: {
    totalReports: 156,
    resolvedReports: 142,
    averageResolutionTime: 48 // heures
  },
  
  active: true,
  
  timestamps: {
    createdAt: ISODate("2024-01-01T00:00:00Z"),
    updatedAt: ISODate("2025-05-31T00:00:00Z")
  }
}
</pre>

#### 9. Collection \`analytics\`
Données analytiques pour les rapports et statistiques.

<pre>
{
  _id: ObjectId("..."),
  date: ISODate("2025-05-31T00:00:00Z"),
  type: "daily", // "daily", "weekly", "monthly"
  
  reports: {
    total: 45,
    byCategory: {
      "voirie": 18,
      "éclairage": 12,
      "déchets": 10,
      "sécurité": 5
    },
    byStatus: {
      "reported": 15,
      "validated": 12,
      "in_progress": 8,
      "resolved": 10
    },
    byZone: {
      "centre-ville": 20,
      "akpakpa": 15,
      "dantokpa": 10
    }
  },
  
  users: {
    active: 234,
    new: 12,
    returning: 222
  },
  
  interventions: {
    completed: 18,
    inProgress: 12,
    scheduled: 8
  },
  
  performance: {
    averageResponseTime: 18.5, // heures
    averageResolutionTime: 42.3, // heures
    satisfactionRate: 4.2 // sur 5
  },
  
  timestamps: {
    createdAt: ISODate("2025-06-01T00:00:00Z")
  }
}
</pre>

#### 10. Collection \`settings\`
Configuration globale de l'application.

<pre>
{
  _id: ObjectId("..."),
  key: "app_config",
  
  notifications: {
    emailTemplates: {
      "report_created": {
        subject: "Nouveau signalement créé",
        template: "report_created_template"
      }
    },
    pushSettings: {
      apiKey: "...",
      enabled: true
    }
  },
  
  sla: {
    defaultResponseTime: 24, // heures
    defaultResolutionTime: 72, // heures
    escalationRules: [
      {
        priority: "urgent",
        responseTime: 2,
        resolutionTime: 12
      }
    ]
  },
  
  moderation: {
    autoApproveComments: false,
    profanityFilter: true,
    requireVerificationForReports: false
  },
  
  features: {
    geoLocation: true,
    photoUpload: true,
    anonymousReports: true,
    publicVoting: true
  },
  
  timestamps: {
    createdAt: ISODate("2024-01-01T00:00:00Z"),
    updatedAt: ISODate("2025-05-31T00:00:00Z")
  }
}
</pre>

### Index Recommandés

<pre>
// Collection users
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1, "status": 1 })
db.users.createIndex({ "location.coordinates": "2dsphere" })

// Collection reports
db.reports.createIndex({ "location.coordinates": "2dsphere" })
db.reports.createIndex({ "status": 1, "createdAt": -1 })
db.reports.createIndex({ "category": 1, "priority": 1 })
db.reports.createIndex({ "citizen.userId": 1 })

// Collection interventions
db.interventions.createIndex({ "reportId": 1 })
db.interventions.createIndex({ "technicianId": 1, "status": 1 })
db.interventions.createIndex({ "scheduling.scheduledDate": 1 })

// Collection notifications
db.notifications.createIndex({ "userId": 1, "read": 1, "createdAt": -1 })
db.notifications.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 2592000 }) // 30 jours

// Collection comments
db.comments.createIndex({ "reportId": 1, "createdAt": -1 })
db.comments.createIndex({ "userId": 1 })

// Collection votes
db.votes.createIndex({ "reportId": 1, "userId": 1 }, { unique: true })

// Collection analytics
db.analytics.createIndex({ "date": 1, "type": 1 })
</pre>

## 🔗 Relations Entre Collections

- **users ↔ reports** : Un utilisateur peut créer plusieurs signalements
- **reports ↔ interventions** : Un signalement peut avoir une ou plusieurs interventions
- **reports ↔ comments** : Un signalement peut avoir plusieurs commentaires
- **reports ↔ votes** : Un signalement peut avoir plusieurs votes (confirmations/contestations)
- **users ↔ notifications** : Un utilisateur reçoit plusieurs notifications
- **reports ↔ categories** : Un signalement appartient à une catégorie
- **reports ↔ zones** : Un signalement est localisé dans une zone géographique

## 📊 Exemples de Requêtes Courantes

### 1. Trouver tous les signalements dans un rayon de 500m
<pre>
db.reports.find({
  "location.coordinates": {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [2.4204, 6.3696]
      },
      $maxDistance: 500
    }
  }
})
</pre>

### 2. Trouver tous les signalements d'un utilisateur
<pre>
db.reports.find({
  "citizen.userId": ObjectId("...")
})
</pre>

### 3. Trouver les interventions planifiées pour un technicien
<pre>
db.interventions.find({
  "technicianId": ObjectId("..."),
  "status": "scheduled",
  "scheduling.scheduledDate": {
    $gte: ISODate("2025-06-01T00:00:00Z"),
    $lt: ISODate("2025-06-02T00:00:00Z")
  }
})
</pre>

### 4. Statistiques par catégorie
<pre>
db.reports.aggregate([
  { $group: {
    _id: "$category",
    count: { $sum: 1 },
    resolved: {
      $sum: {
        $cond: [{ $eq: ["$status", "resolved"] }, 1, 0]
      }
    }
  }}
])
</pre>

### 5. Notifications non lues d'un utilisateur
<pre>
db.notifications.find({
  "userId": ObjectId("..."),
  "read": false
}).sort({ "createdAt": -1 })
</pre>

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- MongoDB 6.0+
- npm ou yarn

### Installation
</pre>bash
# Cloner le projet
git clone https://github.com/votre-username/citefix.git
cd citefix

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos configurations

# Démarrer en mode développement
npm run dev
</pre>

### Variables d'Environnement
</pre>env
# Base de données
MONGODB_URI=mongodb://localhost:27017/citefix
# ou pour MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/citefix

# Authentification
NEXTAUTH_SECRET=votre-secret-nextauth
NEXTAUTH_URL=http://localhost:3000

# Upload de fichiers
CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret

# Notifications
RESEND_API_KEY=votre-resend-api-key
PUSHER_APP_ID=votre-pusher-app-id
PUSHER_KEY=votre-pusher-key
PUSHER_SECRET=votre-pusher-secret

# Cartes
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre-google-maps-api-key
</pre>

## 📱 Fonctionnalités

### Pour les Citoyens
- ✅ Création de signalements avec photos et géolocalisation
- ✅ Suivi en temps réel du statut des signalements
- ✅ Système de votes (confirmation/contestation)
- ✅ Commentaires et discussions
- ✅ Notifications push et email
- ✅ Carte interactive des signalements
- ✅ Historique personnel des signalements

### Pour les Techniciens
- ✅ Dashboard des interventions assignées
- ✅ Planification et suivi des interventions
- ✅ Mise à jour du statut en temps réel
- ✅ Gestion des matériaux et coûts
- ✅ Photos avant/après intervention
- ✅ Rapport d'intervention détaillé

### Pour les Administrateurs
- ✅ Dashboard de supervision globale
- ✅ Gestion des utilisateurs et techniciens
- ✅ Statistiques et rapports détaillés
- ✅ Modération des contenus
- ✅ Configuration du système
- ✅ Gestion des zones géographiques

## 🔧 API Routes à Implémenter

### Authentification
- \`POST /api/auth/register\` - Inscription
- \`POST /api/auth/login\` - Connexion
- \`POST /api/auth/logout\` - Déconnexion
- \`GET /api/auth/me\` - Profil utilisateur

### Signalements
- \`GET /api/reports\` - Liste des signalements
- \`POST /api/reports\` - Créer un signalement
- \`GET /api/reports/[id]\` - Détails d'un signalement
- \`PUT /api/reports/[id]\` - Modifier un signalement
- \`DELETE /api/reports/[id]\` - Supprimer un signalement
- \`POST /api/reports/[id]/vote\` - Voter sur un signalement
- \`GET /api/reports/nearby\` - Signalements à proximité

### Interventions
- \`GET /api/interventions\` - Liste des interventions
- \`POST /api/interventions\` - Créer une intervention
- \`PUT /api/interventions/[id]\` - Modifier une intervention
- \`POST /api/interventions/[id]/progress\` - Mettre à jour le progrès

### Notifications
- \`GET /api/notifications\` - Notifications de l'utilisateur
- \`PUT /api/notifications/[id]/read\` - Marquer comme lu
- \`POST /api/notifications/send\` - Envoyer une notification

### Administration
- \`GET /api/admin/stats\` - Statistiques globales
- \`GET /api/admin/users\` - Gestion des utilisateurs
- \`PUT /api/admin/users/[id]\` - Modifier un utilisateur
- \`GET /api/admin/reports\` - Tous les signalements
- \`PUT /api/admin/reports/[id]/status\` - Changer le statut

## 🎨 Design System

### Couleurs Principales
- **Primary**: Bleu (#3B82F6)
- **Secondary**: Vert (#10B981)
- **Warning**: Orange (#F59E0B)
- **Danger**: Rouge (#EF4444)
- **Success**: Vert (#22C55E)

### Catégories de Signalements
- **Voirie**: Orange (#F97316)
- **Éclairage**: Jaune (#EAB308)
- **Déchets**: Vert (#16A34A)
- **Sécurité**: Rouge (#DC2626)

## 📈 Métriques et KPIs

### Métriques Utilisateur
- Nombre de signalements créés
- Taux de résolution des signalements
- Temps moyen de résolution
- Satisfaction utilisateur (notes)
- Engagement (votes, commentaires)

### Métriques Système
- Temps de réponse des API
- Disponibilité de l'application
- Utilisation des ressources
- Erreurs et exceptions

### Métriques Métier
- Signalements par catégorie
- Performance par zone géographique
- Efficacité des techniciens
- Coûts des interventions

## 🔒 Sécurité

### Authentification
- Hash des mots de passe avec bcrypt
- Sessions sécurisées avec NextAuth.js
- Authentification à deux facteurs (optionnel)
- Limitation des tentatives de connexion

### Autorisation
- Contrôle d'accès basé sur les rôles (RBAC)
- Validation des permissions pour chaque action
- Isolation des données par utilisateur

### Protection des Données
- Validation et sanitisation des entrées
- Protection contre les injections
- Chiffrement des données sensibles
- Conformité RGPD

## 🚀 Déploiement

### Environnements
- **Développement**: Local avec MongoDB local
- **Test**: Staging avec MongoDB Atlas
- **Production**: Vercel + MongoDB Atlas

### CI/CD
- Tests automatisés avec Jest
- Déploiement automatique sur Vercel
- Monitoring avec Sentry
- Sauvegarde automatique de la base de données

## 📞 Support et Contact

- **Email**: support@citefix.bj
- **Documentation**: https://docs.citefix.bj

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.

---

**CitéFix** - Améliorer la ville ensemble 🏙️
