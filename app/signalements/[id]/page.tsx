"use client"

import { useEffect, useRef, useState } from "react"
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
  AlertTriangle, Lightbulb, Trash2, Shield, MapPin, ThumbsUp, ThumbsDown,
  Clock, CheckCircle2, XCircle, User, Send
} from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MiniMap from "@/components/minimap"


const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case "voirie": return <AlertTriangle className="h-5 w-5" />
    case "éclairage": return <Lightbulb className="h-5 w-5" />
    case "déchets": return <Trash2 className="h-5 w-5" />
    case "sécurité": return <Shield className="h-5 w-5" />
    default: return <AlertTriangle className="h-5 w-5" />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "Signalé": return "bg-yellow-500"
    case "Validé": return "bg-blue-500"
    case "Assigné": return "bg-purple-500"
    case "Intervention en cours": return "bg-orange-500"
    case "Terminé": return "bg-green-500"
    case "Résolu": return "bg-green-600"
    case "Rejeté": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const formatDate = (dateString) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
  }).format(date)
}

export default function ReportDetailPage() {
  const params = useParams()
  const reportId = params.id
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const leafletRef = useRef(null)

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("photos")
  const [voting, setVoting] = useState(false)

  const UPLOAD_BASE_URL = "http://localhost:3001"

  const getPhotoUrl = (photo) => {
    if (!photo) return "/placeholder.svg"
    if (photo.startsWith("http")) return photo
    if (photo.startsWith("/uploads/")) return UPLOAD_BASE_URL + photo
    if (photo.startsWith("data:")) return photo
    return photo // fallback
  }


  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    fetch(`http://localhost:3001/api/reports/${reportId}`, {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        setReport(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [reportId])

  // Affichage de la carte Leaflet
  useEffect(() => {
    if (!report || !report.location || !Array.isArray(report.location.coordinates)) return
    if (!mapRef.current) return

    // Format: [lng, lat]
    const [lng, lat] = report.location.coordinates
    const position = [lat, lng]

    if (!leafletRef.current) {
      leafletRef.current = L.map(mapRef.current).setView(position, 17)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(leafletRef.current)
    } else {
      leafletRef.current.setView(position, 17)
      if (markerRef.current) markerRef.current.setLatLng(position)
    }

    if (!markerRef.current) {
      markerRef.current = L.marker(position, {
        icon: L.divIcon({
          className: "",
          html: `<div style="background:#6366f1;width:20px;height:20px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px #0002"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(leafletRef.current)
    }

    return () => {
      // Cleanup quand on quitte la page ou change de report
      if (leafletRef.current) {
        leafletRef.current.remove()
        leafletRef.current = null
      }
      markerRef.current = null
    }
  }, [report])

  if (loading) return <div className="container m-auto py-8">Chargement...</div>
  if (!report) return <div className="container m-auto py-8">Aucun signalement trouvé</div>

  const statusOrder = ["Signalé", "Validé", "Assigné", "Intervention en cours", "Terminé", "Résolu"]
  const progressIndex = statusOrder.indexOf(report.status || report.current_status)
  const progressValue = progressIndex === -1 ? 0 : ((progressIndex + 1) / statusOrder.length) * 100

  // Pour les images : media peut être tableau d'URL ou objet { url }
  const mediaArray = Array.isArray(report.media)
    ? report.media.map(m => (typeof m === "string" ? m : m?.url))
    : []

  // VOTE
  const handleVote = async (type) => {
    setVoting(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      const res = await fetch(`http://localhost:3001/api/reports/${reportId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ type }),
      })
      const data = await res.json()
      if (!res.ok) {
        // Affiche le message de l’API s’il existe
        toast.error(data?.error || "Erreur lors du vote")
        setVoting(false)
        return
      }
      toast.success(type === "confirm" ? "Problème confirmé !" : "Contesté !")
      setReport(data)
    } catch {
      toast.error("Erreur lors du vote")
    }
    setVoting(false)
  }


  // Ajout de commentaire simulé (adapter en POST si API dispo)
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    toast.success("Commentaire ajouté (simulé)")
    setNewComment("")
  }





  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <a href="/carte" className="hover:text-primary">Carte des signalements</a>
            &gt; Signalement #{reportId}
          </div>
          <h1 className="text-3xl font-bold">{report.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            {getCategoryIcon(report.category)}
            {report.category && report.category.charAt(0).toUpperCase() + report.category.slice(1)}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status || report.current_status)}`} />
            {report.status || report.current_status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="map">Carte</TabsTrigger>
                </TabsList>
                <TabsContent value="photos" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaArray.length > 0 ? (
                      mediaArray.map((photo, idx) =>
                        photo ? (
                          <div key={idx} className="aspect-video relative rounded-md overflow-hidden border">
                            {/* Utilise le helper */}
                            <Image
                              src={getPhotoUrl(photo)}
                              alt={`Photo ${idx + 1}`}
                              fill
                              className="object-cover"
                            // loader ou crossOrigin si besoin pour certains cas
                            />
                          </div>

                        ) : null
                      )
                    ) : (
                      <div className="text-center text-muted-foreground">Aucune photo</div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="map" className="p-0">
                  <MiniMap coordinates={report.location.coordinates} />
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
                  <span>
                    {report.location?.address ||
                      (Array.isArray(report.location?.coordinates)
                        ? `Lat: ${report.location.coordinates[1]}, Lng: ${report.location.coordinates[0]}`
                        : "Non renseignée")}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Progression</h3>
                <Progress value={progressValue} className="h-2 mb-2" />
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
                {(report.statusHistory || []).map((status, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(status.status)}`} />
                      {idx < (report.statusHistory.length - 1) && (
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
                {(report.comments || []).map((comment, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.author?.image || "/placeholder.svg"} alt={comment.author?.name || "?"} />
                      <AvatarFallback>{comment.author?.name?.charAt(0) ?? "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{comment.author?.name ?? "Anonyme"}</h3>
                          {comment.author?.role === "authority" && (
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
              {/* Formulaire commentaire */}
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

        {/* ASIDE */}
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
                    <AvatarImage src={report.citizen?.image || "/placeholder.svg"} alt={report.citizen?.name} />
                    <AvatarFallback>{report.citizen?.name?.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                  <span>{report.citizen?.name ?? "Anonyme"}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date de création</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(report.timestamps?.createdAt || report.created_at)}</span>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Votes</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span>{report.engagement?.confirmations ?? 0} confirmations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    <span>{report.engagement?.contestations ?? 0} contestations</span>
                  </div>

                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" variant="default" disabled={voting}
                onClick={() => handleVote("confirm")}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Confirmer ce problème
              </Button>
              <Button className="w-full" variant="outline" disabled={voting}
                onClick={() => handleVote("contest")}>
                <ThumbsDown className="h-4 w-4 mr-2" />
                Contester ce problème
              </Button>
              {(report.status || report.current_status) === "Résolu" && (
                <>
                  <Button className="w-full" variant="outline" disabled>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirmer la résolution
                  </Button>
                  <Button className="w-full" variant="outline" disabled>
                    <XCircle className="h-4 w-4 mr-2" />
                    Contester la résolution
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
