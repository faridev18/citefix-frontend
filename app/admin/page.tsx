"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Bell,
} from "lucide-react"
import Link from "next/link"

// Données fictives pour l'administration
const adminData = {
  stats: {
    totalUsers: 2847,
    activeUsers: 1523,
    totalReports: 1248,
    pendingReports: 156,
    resolvedReports: 876,
    activeTechnicians: 12,
    averageResolutionTime: 3.5,
    userGrowth: 15.2,
    reportGrowth: 8.7,
  },
  recentActivity: [
    {
      id: "1",
      type: "user_registration",
      message: "Nouvel utilisateur inscrit: Marie Kouassi",
      timestamp: "2025-05-31T14:30:00Z",
      priority: "low",
    },
    {
      id: "2",
      type: "report_urgent",
      message: "Signalement urgent: Fuite de gaz Avenue de la République",
      timestamp: "2025-05-31T14:15:00Z",
      priority: "high",
    },
    {
      id: "3",
      type: "technician_assigned",
      message: "Technicien Jean Kouassi assigné à l'intervention #1247",
      timestamp: "2025-05-31T13:45:00Z",
      priority: "medium",
    },
    {
      id: "4",
      type: "report_resolved",
      message: "Signalement résolu: Lampadaire réparé Rue des Écoles",
      timestamp: "2025-05-31T13:20:00Z",
      priority: "low",
    },
  ],
  topCategories: [
    { category: "Voirie", count: 45, percentage: 36 },
    { category: "Éclairage", count: 32, percentage: 26 },
    { category: "Déchets", count: 28, percentage: 22 },
    { category: "Sécurité", count: 20, percentage: 16 },
  ],
  technicians: [
    {
      id: "1",
      name: "Jean Kouassi",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "En mission",
      activeReports: 8,
      completedToday: 3,
      efficiency: 92,
    },
    {
      id: "2",
      name: "Marie Adjovi",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Disponible",
      activeReports: 5,
      completedToday: 2,
      efficiency: 88,
    },
    {
      id: "3",
      name: "Paul Dossou",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "En mission",
      activeReports: 6,
      completedToday: 1,
      efficiency: 85,
    },
  ],
  alerts: [
    {
      id: "1",
      type: "system",
      message: "Maintenance programmée ce soir de 22h à 2h",
      severity: "info",
    },
    {
      id: "2",
      type: "performance",
      message: "Temps de réponse élevé détecté sur le secteur Akpakpa",
      severity: "warning",
    },
    {
      id: "3",
      type: "security",
      message: "Tentative de connexion suspecte détectée",
      severity: "error",
    },
  ],
}

// Fonction pour obtenir l'icône du type d'activité
const getActivityIcon = (type: string) => {
  switch (type) {
    case "user_registration":
      return <Users className="h-4 w-4 text-blue-500" />
    case "report_urgent":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "technician_assigned":
      return <Users className="h-4 w-4 text-purple-500" />
    case "report_resolved":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    default:
      return <Bell className="h-4 w-4 text-gray-500" />
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} min`
  } else if (diffInMinutes < 1440) {
    return `Il y a ${Math.floor(diffInMinutes / 60)}h`
  } else {
    return date.toLocaleDateString("fr-FR")
  }
}

export default function AdminPage() {
  const [data] = useState(adminData)

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Administration CitéFix</h1>
          <p className="text-muted-foreground">Tableau de bord administrateur</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/rapports">
              <FileText className="mr-2 h-4 w-4" />
              Rapports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/parametres">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
          </Button>
        </div>
      </div>

      {/* Alertes système */}
      {data.alerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Alertes système</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${
                  alert.severity === "error"
                    ? "border-l-red-500"
                    : alert.severity === "warning"
                      ? "border-l-yellow-500"
                      : "border-l-blue-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        alert.severity === "error"
                          ? "destructive"
                          : alert.severity === "warning"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm mt-2">{alert.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs totaux</p>
                <p className="text-3xl font-bold">{data.stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{data.stats.userGrowth}% ce mois
                </div>
              </div>
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Signalements</p>
                <p className="text-3xl font-bold">{data.stats.totalReports}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{data.stats.reportGrowth}% ce mois
                </div>
              </div>
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
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
                <p className="text-sm font-medium text-muted-foreground">Techniciens actifs</p>
                <p className="text-3xl font-bold">{data.stats.activeTechnicians}</p>
                <p className="text-xs text-muted-foreground mt-1">Sur le terrain</p>
              </div>
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente et gestion */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Événements et actions importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="shrink-0">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                    </div>
                    <Badge
                      variant={
                        activity.priority === "high"
                          ? "destructive"
                          : activity.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {activity.priority === "high" ? "Urgent" : activity.priority === "medium" ? "Moyen" : "Info"}
                    </Badge>
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
                {data.topCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.category}</span>
                      <span>
                        {category.count} signalements ({category.percentage}%)
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Équipe et actions rapides */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Équipe technique</CardTitle>
              <CardDescription>Statut des techniciens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.technicians.map((tech) => (
                  <div key={tech.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tech.avatar || "/placeholder.svg"} alt={tech.name} />
                          <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{tech.name}</p>
                          <Badge variant={tech.status === "Disponible" ? "secondary" : "default"} className="text-xs">
                            {tech.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="font-medium">{tech.activeReports}</p>
                        <p className="text-muted-foreground">Actifs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{tech.completedToday}</p>
                        <p className="text-muted-foreground">Terminés</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{tech.efficiency}%</p>
                        <p className="text-muted-foreground">Efficacité</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/techniciens">Gérer l'équipe</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Tableau de bord opérationnel
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
                  <FileText className="mr-2 h-4 w-4" />
                  Générer un rapport
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/interventions/planifier">
                  <Calendar className="mr-2 h-4 w-4" />
                  Planifier intervention
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/parametres">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres système
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Temps de réponse moyen</span>
                  <span className="text-green-600">1.2s</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Disponibilité</span>
                  <span className="text-green-600">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Satisfaction utilisateurs</span>
                  <span className="text-green-600">4.2/5</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
