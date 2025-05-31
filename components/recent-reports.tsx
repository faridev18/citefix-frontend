"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, MessageSquare, ThumbsUp, AlertTriangle, Lightbulb, Trash2, Shield } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Données fictives pour les signalements récents
const recentReportsData = [
  {
    id: "1",
    title: "Lampadaire cassé devant l'école",
    category: "éclairage",
    description: "Le lampadaire ne fonctionne plus depuis 3 jours",
    location: "Rue des Écoles, Cotonou",
    status: "Validé",
    date: "2025-05-31",
    author: {
      name: "Fatou D.",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 3,
    confirmations: 5,
  },
  {
    id: "2",
    title: "Nid de poule dangereux",
    category: "voirie",
    description: "Un nid de poule profond qui cause des accidents",
    location: "Avenue de la Liberté, Cotonou",
    status: "Intervention en cours",
    date: "2025-05-30",
    author: {
      name: "Kofi A.",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 7,
    confirmations: 12,
  },
  {
    id: "3",
    title: "Dépôt sauvage de déchets",
    category: "déchets",
    description: "Accumulation de déchets sur le trottoir",
    location: "Marché Dantokpa, Cotonou",
    status: "Signalé",
    date: "2025-05-29",
    author: {
      name: "Ama K.",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 2,
    confirmations: 4,
  },
  {
    id: "4",
    title: "Éclairage public défaillant",
    category: "éclairage",
    description: "Toute la rue est plongée dans l'obscurité la nuit",
    location: "Quartier Zogbo, Cotonou",
    status: "Assigné",
    date: "2025-05-28",
    author: {
      name: "Sékou T.",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 5,
    confirmations: 8,
  },
]

// Fonction pour obtenir l'icône de la catégorie
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "voirie":
      return <AlertTriangle className="h-4 w-4" />
    case "éclairage":
      return <Lightbulb className="h-4 w-4" />
    case "déchets":
      return <Trash2 className="h-4 w-4" />
    case "sécurité":
      return <Shield className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
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

export default function RecentReports() {
  const [reports] = useState(recentReportsData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reports.map((report) => (
        <Link href={`/signalements/${report.id}`} key={report.id}>
          <Card className="h-full hover:border-primary/50 transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(report.category)}
                  {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                </Badge>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(report.status)}`} title={report.status} />
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{report.description}</p>
              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{report.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={report.author.image || "/placeholder.svg"} alt={report.author.name} />
                    <AvatarFallback>{report.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{report.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-4 flex justify-between border-t">
              <div className="flex items-center text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{report.comments}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>{report.confirmations}</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
