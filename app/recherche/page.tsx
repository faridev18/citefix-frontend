"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Lightbulb, Trash2, Shield, MapPin, Clock, User, Tag, Search } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

const getCategoryIcon = (category) => {
  switch ((category || "").toLowerCase()) {
    case "voirie": return <AlertTriangle className="h-4 w-4" />
    case "éclairage": return <Lightbulb className="h-4 w-4" />
    case "déchets": return <Trash2 className="h-4 w-4" />
    case "sécurité": return <Shield className="h-4 w-4" />
    default: return <AlertTriangle className="h-4 w-4" />
  }
}

  const getPhotoUrl = (photo, baseUrl = "http://localhost:3001") => {
    if (!photo || typeof photo !== "string") return "/placeholder.svg"
    if (photo.startsWith("http")) return photo
    if (photo.startsWith("/uploads/")) return baseUrl + photo
    if (photo.startsWith("data:")) return photo
    return "/placeholder.svg"
  }

const getStatusColor = (status) => {
  switch (status) {
    case "reported": return "bg-yellow-500"
    case "validated": return "bg-blue-500"
    case "assigned": return "bg-purple-500"
    case "in_progress": return "bg-orange-500"
    case "completed": return "bg-green-500"
    case "resolved": return "bg-green-600"
    case "rejected": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case "reported": return "Signalé"
    case "validated": return "Validé"
    case "assigned": return "Assigné"
    case "in_progress": return "Intervention en cours"
    case "completed": return "Terminé"
    case "resolved": return "Résolu"
    case "rejected": return "Rejeté"
    default: return status
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high": return "destructive"
    case "medium": return "default"
    case "low": return "secondary"
    default: return "outline"
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
}

export default function ReportList() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/reports/public")
        const data = await response.json()
        setReports(Array.isArray(data) ? data : [])
      } catch (error) {
        toast.error("Erreur lors du chargement des signalements")
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container m-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Liste des signalements</CardTitle>
          <CardDescription>
            {reports.length} signalement{reports.length !== 1 ? 's' : ''} trouvé{reports.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <Link href={`/signalements/${report._id}`} key={report._id}>
                  <div className="p-4 mb-5 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(report.category)}
                          {report.category?.charAt(0).toUpperCase() + report.category?.slice(1)}
                        </Badge>
                        <Badge variant={getPriorityColor(report.priority)}>
                          {report.priority === 'high' ? 'Haute' : 
                           report.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(report.status)}`} />
                        <Badge variant="secondary">
                          {getStatusLabel(report.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate">
                          {report.location?.coordinates 
                            ? `${report.location.coordinates[1].toFixed(6)}, ${report.location.coordinates[0].toFixed(6)}` 
                            : 'Localisation inconnue'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(report.timestamps.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{report.citizen?.name || "Anonyme"}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>
                            {report.engagement?.confirmations || 0} confirmation{report.engagement?.confirmations !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {report.media?.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {report.media.slice(0, 3).map((media, index) => (
                          <div key={index} className="w-16 h-16 rounded-md overflow-hidden border">
                            <img
                              src={getPhotoUrl(media.url)}
                              alt={`Media ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {report.media.length > 3 && (
                          <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center">
                            +{report.media.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Aucun signalement trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Aucun signalement n'a été enregistré pour le moment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}