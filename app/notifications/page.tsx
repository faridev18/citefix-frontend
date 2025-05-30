"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
  User,
} from "lucide-react"

// Données fictives pour les notifications
const notificationsData = [
  {
    id: "1",
    type: "status_change",
    title: "Statut mis à jour",
    message: "Votre signalement 'Lampadaire cassé' est maintenant 'En cours d'intervention'",
    reportId: "1",
    reportTitle: "Lampadaire cassé devant l'école",
    date: "2025-05-31T14:30:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "comment",
    title: "Nouveau commentaire",
    message: "Un technicien a commenté votre signalement 'Nid de poule dangereux'",
    reportId: "2",
    reportTitle: "Nid de poule dangereux",
    date: "2025-05-31T10:15:00Z",
    read: false,
    priority: "medium",
    author: {
      name: "Service Technique",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    type: "resolution",
    title: "Problème résolu",
    message: "Votre signalement 'Dépôt sauvage de déchets' a été marqué comme résolu",
    reportId: "3",
    reportTitle: "Dépôt sauvage de déchets",
    date: "2025-05-30T16:45:00Z",
    read: true,
    priority: "high",
  },
  {
    id: "4",
    type: "validation",
    title: "Signalement validé",
    message: "Votre signalement 'Éclairage public défaillant' a été validé par les autorités",
    reportId: "4",
    reportTitle: "Éclairage public défaillant",
    date: "2025-05-30T09:20:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: "5",
    type: "system",
    title: "Mise à jour de l'application",
    message: "CitéFix a été mis à jour avec de nouvelles fonctionnalités",
    date: "2025-05-29T12:00:00Z",
    read: true,
    priority: "low",
  },
]

// Fonction pour obtenir l'icône du type de notification
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "status_change":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "comment":
      return <MessageSquare className="h-5 w-5 text-blue-500" />
    case "resolution":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "validation":
      return <CheckCircle2 className="h-5 w-5 text-blue-500" />
    case "system":
      return <Bell className="h-5 w-5 text-purple-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

// Fonction pour obtenir la couleur de la priorité
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "outline"
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [activeTab, setActiveTab] = useState("all")

  // Filtrer les notifications selon l'onglet actif
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  // Marquer comme lu/non lu
  const toggleReadStatus = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: !notif.read } : notif)))
  }

  // Supprimer une notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  // Marquer toutes comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  // Statistiques
  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    read: notifications.filter((n) => n.read).length,
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Restez informé de l'évolution de vos signalements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" asChild>
            <a href="/profil">
              <User className="mr-2 h-4 w-4" />
              Profil
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Paramètres de notification */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Préférences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-xs text-muted-foreground">Notifications par email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Push</label>
                    <p className="text-xs text-muted-foreground">Notifications push</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">SMS</label>
                    <p className="text-xs text-muted-foreground">Notifications SMS</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <hr />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Types de notifications</h4>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Changements de statut</label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Nouveaux commentaires</label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Résolutions</label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Mises à jour système</label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total</span>
                <Badge variant="outline">{stats.total}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Non lues</span>
                <Badge variant="destructive">{stats.unread}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Lues</span>
                <Badge variant="secondary">{stats.read}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des notifications */}
        <div className="lg:col-span-3">
          <Card>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
                  <TabsList>
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="unread">Non lues ({stats.unread})</TabsTrigger>
                    <TabsTrigger value="read">Lues</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>

              <TabsContent value={activeTab} className="mt-0">
                <CardContent>
                  <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border rounded-lg transition-colors ${
                            !notification.read ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{notification.title}</h3>
                                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                                    {notification.priority === "high"
                                      ? "Haute"
                                      : notification.priority === "medium"
                                        ? "Moyenne"
                                        : "Basse"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-3">{notification.message}</p>

                              {notification.reportId && (
                                <div className="mb-3">
                                  <a
                                    href={`/signalements/${notification.reportId}`}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    Voir le signalement: {notification.reportTitle}
                                  </a>
                                </div>
                              )}

                              {notification.author && (
                                <div className="flex items-center gap-2 mb-3">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={notification.author.avatar || "/placeholder.svg"}
                                      alt={notification.author.name}
                                    />
                                    <AvatarFallback>{notification.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{notification.author.name}</span>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => toggleReadStatus(notification.id)}>
                                  {notification.read ? (
                                    <>
                                      <MarkAsUnread className="mr-1 h-3 w-3" />
                                      Marquer non lu
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="mr-1 h-3 w-3" />
                                      Marquer lu
                                    </>
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="mr-1 h-3 w-3" />
                                  Supprimer
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Bell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-2">Aucune notification</h3>
                        <p className="text-muted-foreground">
                          {activeTab === "unread"
                            ? "Toutes vos notifications ont été lues."
                            : "Vous n'avez pas encore de notifications."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
