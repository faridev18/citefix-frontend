"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Lightbulb,
  Trash2,
  Shield,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Send,
} from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"

// Import dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-muted/30 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Chargement de la carte...</div>
    </div>
  ),
})

// Données fictives pour un signalement
const reportData = {
  id: "1",
  title: "Lampadaire cassé devant l'école",
  category: "éclairage",
  description:
    "Le lampadaire ne fonctionne plus depuis 3 jours, ce qui rend la zone dangereuse pour les enfants qui sortent de l'école en fin d'après-midi pendant la saison des pluies.",
  location: {
    address: "Rue des Écoles, Zogbo, Cotonou",
    coordinates: [2.4204, 6.3696], // [longitude, latitude]
  },
  photos: ["/signalement1.jpg", "/signalement2.jpg"],
  status_history: [
    {
      status: "Signalé",
      date: "2025-05-30T12:00:00Z",
      comment: "Signalement créé par l'utilisateur",
    },
    {
      status: "Validé",
      date: "2025-05-31T09:15:00Z",
      comment: "Validé par l'autorité locale",
    },
  ],
  current_status: "Validé",
  citizen: {
    name: "Fatou Diarra",
    image: "/placeholder.svg?height=40&width=40",
  },
  interventions: [],
  votes: {
    confirmations: 5,
    contestations: 0,
  },
  comments: [
    {
      author: {
        name: "Service Technique",
        image: "/placeholder.svg?height=40&width=40",
        role: "authority",
      },
      text: "Merci pour votre signalement. Une équipe sera envoyée pour vérifier le problème.",
      date: "2025-05-31T10:00:00Z",
      private: false,
    },
    {
      author: {
        name: "Kofi Mensah",
        image: "/placeholder.svg?height=40&width=40",
        role: "citizen",
      },
      text: "J'ai aussi remarqué ce problème. C'est vraiment dangereux pour les enfants.",
      date: "2025-05-31T14:30:00Z",
      private: false,
    },
  ],
  created_at: "2025-05-30T12:00:00Z",
}

// Fonction pour obtenir l'icône de la catégorie
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "voirie":
      return <AlertTriangle className="h-5 w-5" />
    case "éclairage":
      return <Lightbulb className="h-5 w-5" />
    case "déchets":
      return <Trash2 className="h-5 w-5" />
    case "sécurité":
      return <Shield className="h-5 w-5" />
    default:
      return <AlertTriangle className="h-5 w-5" />
  }
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

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function ReportDetailPage() {
  const params = useParams()
  const reportId = params.id
  const [report] = useState(reportData)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("details")

  // Gérer l'envoi d'un commentaire
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // Simuler l'ajout d'un commentaire
    alert("Commentaire ajouté avec succès !")
    setNewComment("")
  }

  // Calculer le pourcentage de progression
  const calculateProgress = () => {
    const statusOrder = ["Signalé", "Validé", "Assigné", "Intervention en cours", "Terminé", "Résolu"]
    const currentIndex = statusOrder.indexOf(report.current_status)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <a href="/carte" className="hover:text-primary">
              Carte des signalements
            </a>{" "}
            &gt; Signalement #{reportId}
          </div>
          <h1 className="text-3xl font-bold">{report.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            {getCategoryIcon(report.category)}
            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(report.current_status)}`} />
            {report.current_status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="photos" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="map">Carte</TabsTrigger>
                </TabsList>
                <TabsContent value="photos" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.photos.map((photo, index) => (
                      <div key={index} className="aspect-video relative rounded-md overflow-hidden border">
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index + 1} du signalement`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="map" className="h-[300px]">
                  <MapComponent
                    reports={[
                      {
                        id: report.id,
                        title: report.title,
                        category: report.category,
                        status: report.current_status,
                        location: report.location.coordinates,
                      },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Détails du signalement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{report.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Localisation</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{report.location.address}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Progression</h3>
                <Progress value={calculateProgress()} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Signalé</span>
                  <span>En cours</span>
                  <span>Résolu</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique des statuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.status_history.map((status, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(status.status)}`} />
                      {index < report.status_history.length - 1 && (
                        <div className="absolute top-4 left-1.5 w-1 h-full bg-muted-foreground/20" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{status.status}</h3>
                        <span className="text-xs text-muted-foreground">{formatDate(status.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{status.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {report.comments.map((comment, index) => (
                  <div key={index} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.author.image || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{comment.author.name}</h3>
                          {comment.author.role === "authority" && (
                            <Badge variant="outline" className="text-xs">
                              Autorité
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommentSubmit}>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Votre avatar" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Ajouter un commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button type="submit" className="ml-auto">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Signalé par</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={report.citizen.image || "/placeholder.svg"} alt={report.citizen.name} />
                    <AvatarFallback>{report.citizen.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{report.citizen.name}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date de création</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(report.created_at)}</span>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Votes</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span>{report.votes.confirmations} confirmations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    <span>{report.votes.contestations} contestations</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" variant="default">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Confirmer ce problème
              </Button>
              {report.current_status === "Résolu" && (
                <>
                  <Button className="w-full" variant="outline">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirmer la résolution
                  </Button>
                  <Button className="w-full" variant="outline">
                    <XCircle className="h-4 w-4 mr-2" />
                    Contester la résolution
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Signalements similaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <a key={i} href={`/signalements/${i + 1}`} className="block p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        Éclairage
                      </Badge>
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    </div>
                    <h3 className="font-medium text-sm">Lampadaire défectueux - Rue {i + 10}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">À {i * 100}m</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
