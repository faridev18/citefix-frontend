"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, MapPin, ThumbsUp, Eye, Edit, CheckCircle2, AlertTriangle, User, Activity } from "lucide-react"
import Link from "next/link"

// Données fictives pour l'activité
const activityData = [
  {
    id: "1",
    type: "report_created",
    title: "Nouveau signalement créé",
    description: "Lampadaire cassé devant l'école",
    timestamp: "2025-05-31T14:30:00Z",
    reportId: "1",
    location: "Rue des Écoles, Cotonou",
    status: "Signalé",
  },
  {
    id: "2",
    type: "comment_added",
    title: "Commentaire ajouté",
    description: "Merci pour ce signalement, nous allons intervenir rapidement",
    timestamp: "2025-05-31T10:15:00Z",
    reportId: "2",
    author: "Service Technique",
    authorAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    type: "status_changed",
    title: "Statut mis à jour",
    description: "Votre signalement 'Nid de poule dangereux' est maintenant 'En cours d'intervention'",
    timestamp: "2025-05-30T16:45:00Z",
    reportId: "2",
    oldStatus: "Validé",
    newStatus: "Intervention en cours",
  },
  {
    id: "4",
    type: "report_resolved",
    title: "Signalement résolu",
    description: "Le problème 'Dépôt sauvage de déchets' a été marqué comme résolu",
    timestamp: "2025-05-30T09:20:00Z",
    reportId: "3",
    location: "Marché Dantokpa, Cotonou",
  },
  {
    id: "5",
    type: "confirmation_received",
    title: "Confirmation reçue",
    description: "Un autre utilisateur a confirmé votre signalement",
    timestamp: "2025-05-29T18:30:00Z",
    reportId: "1",
    confirmedBy: "Kofi A.",
  },
  {
    id: "6",
    type: "profile_updated",
    title: "Profil mis à jour",
    description: "Vos informations de profil ont été modifiées",
    timestamp: "2025-05-29T12:00:00Z",
  },
  {
    id: "7",
    type: "report_liked",
    title: "Signalement apprécié",
    description: "Votre signalement a reçu une appréciation",
    timestamp: "2025-05-28T15:45:00Z",
    reportId: "4",
    likedBy: "Marie K.",
  },
  {
    id: "8",
    type: "report_viewed",
    title: "Signalement consulté",
    description: "Votre signalement a été consulté par les autorités",
    timestamp: "2025-05-28T11:20:00Z",
    reportId: "1",
    viewedBy: "Municipalité de Cotonou",
  },
]

// Fonction pour obtenir l'icône du type d'activité
const getActivityIcon = (type: string) => {
  switch (type) {
    case "report_created":
      return <MapPin className="h-4 w-4 text-blue-500" />
    case "comment_added":
      return <MessageSquare className="h-4 w-4 text-green-500" />
    case "status_changed":
      return <AlertTriangle className="h-4 w-4 text-orange-500" />
    case "report_resolved":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />
    case "confirmation_received":
      return <ThumbsUp className="h-4 w-4 text-purple-500" />
    case "profile_updated":
      return <User className="h-4 w-4 text-blue-500" />
    case "report_liked":
      return <ThumbsUp className="h-4 w-4 text-red-500" />
    case "report_viewed":
      return <Eye className="h-4 w-4 text-gray-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return "À l'instant"
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`
  }
}

export default function ActivitePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Filtrer les activités
  const filteredActivities = activityData.filter((activity) => {
    const matchesType = selectedType === "all" ? true : activity.type === selectedType

    if (selectedPeriod === "today") {
      const today = new Date()
      const activityDate = new Date(activity.timestamp)
      return matchesType && activityDate.toDateString() === today.toDateString()
    } else if (selectedPeriod === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return matchesType && new Date(activity.timestamp) >= weekAgo
    } else if (selectedPeriod === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return matchesType && new Date(activity.timestamp) >= monthAgo
    }

    return matchesType
  })

  // Statistiques d'activité
  const stats = {
    total: activityData.length,
    today: activityData.filter((a) => {
      const today = new Date()
      const activityDate = new Date(a.timestamp)
      return activityDate.toDateString() === today.toDateString()
    }).length,
    thisWeek: activityData.filter((a) => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(a.timestamp) >= weekAgo
    }).length,
    reports: activityData.filter((a) => a.type === "report_created").length,
    interactions: activityData.filter((a) =>
      ["comment_added", "confirmation_received", "report_liked"].includes(a.type),
    ).length,
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mon activité</h1>
          <p className="text-muted-foreground">Suivez toute votre activité sur CitéFix</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute période</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="report_created">Signalements</SelectItem>
              <SelectItem value="comment_added">Commentaires</SelectItem>
              <SelectItem value="status_changed">Changements statut</SelectItem>
              <SelectItem value="report_resolved">Résolutions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total activités</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.today}</div>
            <p className="text-sm text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.thisWeek}</div>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.reports}</div>
            <p className="text-sm text-muted-foreground">Signalements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.interactions}</div>
            <p className="text-sm text-muted-foreground">Interactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Chronologie</TabsTrigger>
          <TabsTrigger value="reports">Mes signalements</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chronologie d'activité</CardTitle>
              <CardDescription>
                {filteredActivities.length} activité(s){" "}
                {selectedPeriod !== "all" &&
                  `pour ${selectedPeriod === "today" ? "aujourd'hui" : selectedPeriod === "week" ? "cette semaine" : "ce mois"}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{activity.title}</h3>
                          <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{activity.description}</p>

                        {activity.reportId && (
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              Signalement #{activity.reportId}
                            </Badge>
                            {activity.location && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{activity.location}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {activity.author && (
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={activity.authorAvatar || "/placeholder.svg"} alt={activity.author} />
                              <AvatarFallback>{activity.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{activity.author}</span>
                          </div>
                        )}

                        {activity.oldStatus && activity.newStatus && (
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">{activity.oldStatus}</Badge>
                            <span>→</span>
                            <Badge variant="default">{activity.newStatus}</Badge>
                          </div>
                        )}

                        {activity.reportId && (
                          <div className="mt-3">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/signalements/${activity.reportId}`}>
                                <Eye className="mr-1 h-3 w-3" />
                                Voir le signalement
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Activity className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">Aucune activité trouvée</h3>
                    <p className="text-muted-foreground">
                      {selectedPeriod === "all"
                        ? "Vous n'avez pas encore d'activité enregistrée."
                        : "Aucune activité pour cette période."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des signalements</CardTitle>
              <CardDescription>Tous vos signalements créés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData
                  .filter((activity) => activity.type === "report_created")
                  .map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.description}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{activity.status}</Badge>
                            <span className="text-sm text-muted-foreground">{activity.location}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/signalements/${activity.reportId}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactions sociales</CardTitle>
              <CardDescription>Commentaires, confirmations et appréciations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData
                  .filter((activity) =>
                    ["comment_added", "confirmation_received", "report_liked"].includes(activity.type),
                  )
                  .map((activity) => (
                    <div key={activity.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
                          {activity.reportId && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/signalements/${activity.reportId}`}>Voir</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
