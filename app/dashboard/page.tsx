"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Calendar,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Données fictives pour le tableau de bord des autorités
const dashboardData = {
  stats: {
    totalReports: 1248,
    pendingReports: 156,
    resolvedReports: 876,
    averageResolutionTime: 3.5,
    activeUsers: 532,
    monthlyGrowth: 12.5,
  },
  recentReports: [
    {
      id: "1",
      title: "Lampadaire cassé devant l'école",
      category: "éclairage",
      location: "Rue des Écoles, Cotonou",
      status: "Signalé",
      priority: "Haute",
      date: "2025-05-31T14:30:00Z",
      citizen: "Fatou D.",
    },
    {
      id: "2",
      title: "Nid de poule dangereux",
      category: "voirie",
      location: "Avenue de la Liberté, Cotonou",
      status: "Validé",
      priority: "Haute",
      date: "2025-05-31T10:15:00Z",
      citizen: "Kofi A.",
    },
    {
      id: "3",
      title: "Dépôt sauvage de déchets",
      category: "déchets",
      location: "Marché Dantokpa, Cotonou",
      status: "Assigné",
      priority: "Moyenne",
      date: "2025-05-31T08:45:00Z",
      citizen: "Ama K.",
    },
  ],
  categoryStats: [
    { category: "Voirie", count: 45, percentage: 35 },
    { category: "Éclairage", count: 32, percentage: 25 },
    { category: "Déchets", count: 28, percentage: 22 },
    { category: "Sécurité", count: 23, percentage: 18 },
  ],
  technicians: [
    {
      id: "1",
      name: "Jean Kouassi",
      avatar: "/placeholder.svg?height=40&width=40",
      activeReports: 8,
      completedToday: 3,
      status: "En mission",
    },
    {
      id: "2",
      name: "Marie Adjovi",
      avatar: "/placeholder.svg?height=40&width=40",
      activeReports: 5,
      completedToday: 2,
      status: "Disponible",
    },
    {
      id: "3",
      name: "Paul Dossou",
      avatar: "/placeholder.svg?height=40&width=40",
      activeReports: 6,
      completedToday: 1,
      status: "En mission",
    },
  ],
}

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "Signalé":
      return "bg-yellow-500"
    case "Validé":
      return "bg-blue-500"
    case "Assigné":
      return "bg-purple-500"
    case "Intervention en cours":
      return "bg-orange-500"
    case "Terminé":
      return "bg-green-500"
    case "Résolu":
      return "bg-green-600"
    case "Rejeté":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur de la priorité
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Haute":
      return "destructive"
    case "Moyenne":
      return "default"
    case "Basse":
      return "secondary"
    default:
      return "outline"
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function DashboardPage() {
  const [data] = useState(dashboardData)
  const [selectedPeriod, setSelectedPeriod] = useState("7days")

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble des signalements et de l'activité</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Dernières 24h</SelectItem>
              <SelectItem value="7days">7 derniers jours</SelectItem>
              <SelectItem value="30days">30 derniers jours</SelectItem>
              <SelectItem value="90days">90 derniers jours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total signalements</p>
                <p className="text-3xl font-bold">{data.stats.totalReports}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{data.stats.monthlyGrowth}% ce mois
                </div>
              </div>
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{data.stats.pendingReports}</p>
                <p className="text-xs text-muted-foreground mt-1">Nécessitent une action</p>
              </div>
              <div className="rounded-full bg-yellow-100 w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Résolus</p>
                <p className="text-3xl font-bold text-green-600">{data.stats.resolvedReports}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((data.stats.resolvedReports / data.stats.totalReports) * 100)}% du total
                </p>
              </div>
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Temps moyen</p>
                <p className="text-3xl font-bold">{data.stats.averageResolutionTime}j</p>
                <p className="text-xs text-muted-foreground mt-1">Résolution</p>
              </div>
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signalements récents */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Signalements récents</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/signalements">
                    <Eye className="mr-2 h-4 w-4" />
                    Voir tout
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge variant={getPriorityColor(report.priority)}>{report.priority}</Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`} />
                      </div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{report.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Par {report.citizen}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(report.date)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/signalements/${report.id}`}>Voir</Link>
                      </Button>
                      <Button size="sm">Traiter</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>Distribution des signalements par type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.category}</span>
                      <span>{category.count} signalements</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Équipe et activité */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Équipe technique</CardTitle>
              <CardDescription>Statut des techniciens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.technicians.map((tech) => (
                  <div key={tech.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={tech.avatar || "/placeholder.svg"} alt={tech.name} />
                        <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{tech.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={tech.status === "Disponible" ? "secondary" : "default"} className="text-xs">
                            {tech.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{tech.activeReports} actifs</p>
                      <p className="text-muted-foreground">{tech.completedToday} terminés</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/admin/signalements/nouveau">
                  <MapPin className="mr-2 h-4 w-4" />
                  Créer un signalement
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/techniciens">
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les techniciens
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/rapports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Générer un rapport
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/parametres">
                  <Calendar className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Signalement validé", time: "Il y a 5 min", type: "validation" },
                  { action: "Technicien assigné", time: "Il y a 12 min", type: "assignment" },
                  { action: "Problème résolu", time: "Il y a 25 min", type: "resolution" },
                  { action: "Nouveau commentaire", time: "Il y a 1h", type: "comment" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "validation"
                          ? "bg-blue-500"
                          : activity.type === "assignment"
                            ? "bg-purple-500"
                            : activity.type === "resolution"
                              ? "bg-green-500"
                              : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
