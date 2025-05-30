import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Plus, Bug, Zap, Shield, Star, Calendar, Download } from "lucide-react"

// Données fictives pour le changelog
const releases = [
  {
    version: "2.1.0",
    date: "2025-05-31",
    type: "major",
    title: "Nouvelles fonctionnalités et améliorations",
    description: "Cette version apporte de nombreuses améliorations demandées par la communauté",
    changes: [
      {
        type: "feature",
        title: "Recherche avancée",
        description: "Nouvelle page de recherche avec filtres détaillés pour trouver des signalements spécifiques",
      },
      {
        type: "feature",
        title: "Tableau de bord administrateur",
        description: "Interface complète pour la gestion des techniciens et la planification des interventions",
      },
      {
        type: "improvement",
        title: "Performance de la carte",
        description: "Amélioration des temps de chargement de la carte interactive de 40%",
      },
      {
        type: "improvement",
        title: "Notifications push",
        description: "Système de notifications push pour les mises à jour en temps réel",
      },
      {
        type: "fix",
        title: "Correction upload photos",
        description: "Résolution du problème d'upload de photos sur mobile",
      },
    ],
  },
  {
    version: "2.0.5",
    date: "2025-05-15",
    type: "patch",
    title: "Corrections et optimisations",
    description: "Corrections de bugs et améliorations de stabilité",
    changes: [
      {
        type: "fix",
        title: "Géolocalisation iOS",
        description: "Correction du problème de géolocalisation sur les appareils iOS",
      },
      {
        type: "fix",
        title: "Notifications email",
        description: "Résolution des problèmes d'envoi de notifications par email",
      },
      {
        type: "improvement",
        title: "Interface mobile",
        description: "Amélioration de l'interface utilisateur sur les petits écrans",
      },
      {
        type: "security",
        title: "Sécurité renforcée",
        description: "Mise à jour des dépendances de sécurité",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-04-20",
    type: "major",
    title: "Refonte majeure de CitéFix",
    description: "Version majeure avec une nouvelle interface et de nombreuses fonctionnalités",
    changes: [
      {
        type: "feature",
        title: "Nouvelle interface utilisateur",
        description: "Design moderne et responsive avec une meilleure expérience utilisateur",
      },
      {
        type: "feature",
        title: "Système de commentaires",
        description: "Possibilité de commenter et d'interagir sur les signalements",
      },
      {
        type: "feature",
        title: "Profils utilisateurs",
        description: "Pages de profil complètes avec historique et statistiques",
      },
      {
        type: "feature",
        title: "API publique",
        description: "API REST pour les développeurs tiers",
      },
      {
        type: "improvement",
        title: "Performance générale",
        description: "Amélioration significative des performances de l'application",
      },
    ],
  },
  {
    version: "1.5.2",
    date: "2025-03-10",
    type: "patch",
    title: "Améliorations de stabilité",
    description: "Corrections importantes et optimisations",
    changes: [
      {
        type: "fix",
        title: "Crash au démarrage",
        description: "Résolution du problème de crash lors du premier lancement",
      },
      {
        type: "fix",
        title: "Synchronisation données",
        description: "Amélioration de la synchronisation des données hors ligne",
      },
      {
        type: "improvement",
        title: "Temps de chargement",
        description: "Réduction des temps de chargement de 25%",
      },
    ],
  },
  {
    version: "1.5.0",
    date: "2025-02-15",
    type: "minor",
    title: "Nouvelles fonctionnalités",
    description: "Ajout de fonctionnalités demandées par les utilisateurs",
    changes: [
      {
        type: "feature",
        title: "Mode hors ligne",
        description: "Possibilité de créer des signalements sans connexion internet",
      },
      {
        type: "feature",
        title: "Partage de signalements",
        description: "Partage de signalements sur les réseaux sociaux",
      },
      {
        type: "improvement",
        title: "Qualité des photos",
        description: "Amélioration de la compression et qualité des photos",
      },
      {
        type: "fix",
        title: "Localisation précise",
        description: "Amélioration de la précision de la géolocalisation",
      },
    ],
  },
]

// Fonction pour obtenir l'icône du type de changement
const getChangeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus className="h-4 w-4 text-green-600" />
    case "improvement":
      return <Zap className="h-4 w-4 text-blue-600" />
    case "fix":
      return <Bug className="h-4 w-4 text-orange-600" />
    case "security":
      return <Shield className="h-4 w-4 text-red-600" />
    default:
      return <CheckCircle2 className="h-4 w-4 text-gray-600" />
  }
}

// Fonction pour obtenir la couleur du type de version
const getVersionBadge = (type: string) => {
  switch (type) {
    case "major":
      return <Badge className="bg-green-600">Majeure</Badge>
    case "minor":
      return <Badge variant="default">Mineure</Badge>
    case "patch":
      return <Badge variant="secondary">Correctif</Badge>
    default:
      return <Badge variant="outline">Release</Badge>
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function ChangelogPage() {
  return (
    <div className="container m-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Notes de version</h1>
          <p className="text-muted-foreground">Découvrez les dernières améliorations et nouveautés de CitéFix</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {releases.reduce((acc, release) => acc + release.changes.filter((c) => c.type === "feature").length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Nouvelles fonctionnalités</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {releases.reduce(
                  (acc, release) => acc + release.changes.filter((c) => c.type === "improvement").length,
                  0,
                )}
              </div>
              <p className="text-sm text-muted-foreground">Améliorations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {releases.reduce((acc, release) => acc + release.changes.filter((c) => c.type === "fix").length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Corrections</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{releases.length}</div>
              <p className="text-sm text-muted-foreground">Versions publiées</p>
            </CardContent>
          </Card>
        </div>

        {/* Versions */}
        <div className="space-y-8">
          {releases.map((release, index) => (
            <Card key={release.version} className={index === 0 ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">v{release.version}</h2>
                    {getVersionBadge(release.type)}
                    {index === 0 && <Badge variant="outline">Dernière version</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(release.date)}</span>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">{release.title}</CardTitle>
                  <CardDescription>{release.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {release.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex gap-3">
                      <div className="shrink-0 mt-0.5">{getChangeIcon(change.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{change.title}</h3>
                        <p className="text-sm text-muted-foreground">{change.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Restez informé des nouveautés</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Abonnez-vous à notre newsletter pour recevoir les annonces de nouvelles versions
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger l'app
                </Button>
                <Button>S'abonner aux mises à jour</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Légende */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Légende</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Nouvelle fonctionnalité</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Amélioration</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bug className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Correction de bug</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Sécurité</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
