"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
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

// Icône d'activité
const getActivityIcon = (type) => {
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

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`
  if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`
  return date.toLocaleDateString("fr-FR")
}

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        const res = await fetch("http://localhost:3001/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const d = await res.json()
        setData(d)
      } catch (err) {
        setData(null)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="container m-auto py-8">
        <p className="text-center text-lg">Chargement des statistiques...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container m-auto py-8">
        <p className="text-center text-red-500">Impossible de charger les statistiques.</p>
      </div>
    )
  }

  const stats = data.stats || {}
  const technicians = data.technicians || []
  const topCategories = data.topCategories || []
  const alerts = data.alerts || []
  const recentActivity = data.recentActivity || []
  const performance = data.performance || {}

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
              <MapPin className="mr-2 h-4 w-4" />
              Gestion des Signalements
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/utilisateurs">
              <Users className="mr-2 h-4 w-4" />
               Utilisateurs
            </Link>
          </Button>
        </div>
      </div>


      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs totaux</p>
                <p className="text-3xl font-bold">{stats.totalUsers?.toLocaleString?.() ?? 0}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{stats.userGrowth ?? 0}% ce mois
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
                <p className="text-3xl font-bold">{stats.totalReports ?? 0}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{stats.reportGrowth ?? 0}% ce mois
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
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingReports ?? 0}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Interventions</p>
                <p className="text-3xl font-bold">{stats.interventions ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Total interventions</p>
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
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
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
                        {activity.priority === "high"
                          ? "Urgent"
                          : activity.priority === "medium"
                            ? "Moyen"
                            : "Info"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">Aucune activité récente</div>
                )}
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
                {topCategories.length > 0 ? (
                  topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.category}</span>
                        <span>
                          {category.count} signalements ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">Aucune donnée de catégorie</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Équipe et actions rapides */}
        <div className="space-y-6">
          {/* Techniciens seulement si data dispo */}
          {technicians.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Équipe technique</CardTitle>
                <CardDescription>Statut des techniciens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicians.map((tech) => (
                    <div key={tech.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tech.avatar || "/placeholder.svg"} alt={tech.name} />
                          <AvatarFallback>{tech.name?.charAt(0) ?? ""}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{tech.name}</p>
                          <Badge variant={tech.status === "Disponible" ? "secondary" : "default"} className="text-xs">
                            {tech.status}
                          </Badge>
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
          )}

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* <Button className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Tableau de bord opérationnel
                </Link>
              </Button> */}
              {/* <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/techniciens">
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les techniciens
                </Link>
              </Button> */}
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/utilisateurs">
                  <Users className="mr-2 h-4 w-4" />
                  Utilisateurs
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/rapports">
                  <MapPin className="mr-2 h-4 w-4" />
                  Gestion des Signalements
                </Link>
              </Button>
              {/* <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/parametres">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres système
                </Link>
              </Button> */}
            </CardContent>
          </Card>

       
        </div>
      </div>
    </div>
  )
}
